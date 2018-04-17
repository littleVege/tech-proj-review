let reviewTmplListCtrl = ($scope,EvaluationTemplateCategory,Utils,$stateParams,$uibModal,$state) => {
    $scope.queryInfo = {type:$stateParams['type']};
    Utils.paginize($scope,function (page) {
        return EvaluationTemplateCategory.getListByQuery($scope.queryInfo,page);
    });
    $scope.pageChanged();

    $scope.search = function () {
        $scope.pageInfo.currentPage = 1;
        $scope.pageChanged();
    };


    $scope.removeTmpl = function (info) {
        if (confirm('请确认是否要删除')) {
            MailTemplate.deleteOne(info.id)
                .then(function () {
                    alert('删除成功！');
                    $scope.pageChanged();
                })
        }
    };

    $scope.createTmpl = function () {
        EvaluationTemplateCategory.createOne({name:`__初始模板${new Date().getTime()}`})
            .then(function (data) {
                let info = data;
                $state.go('reviewTmplEdit',{id:info.id});
            })
    }
};

let reviewTmplEditCtrl = ($scope,EvaluationTemplateCategory,$stateParams,$uibModal,dialogs) => {
    let templateId = $stateParams['id'];
    EvaluationTemplateCategory.getAllDetail(templateId)
        .then(function (data) {
            $scope.updateInfo = data[1];
            $scope.reformatedItems = $scope.updateInfo.items;
        });

    let submit = function () {
        return EvaluationTemplateCategory.updateOne(templateId,$scope.updateInfo.category)
    };

    $scope.submit = function () {
        submit().then(function () {
            dialogs.success('保存成功！');
        })
    };
    $scope.submitAndGoBack = function () {
        submit().then(function () {
            dialogs.success('保存成功！');
        }).then(function () {
            history.back();
        })
    };

    $scope.refreshItems = function () {
        EvaluationTemplateCategory.getAllDetail(templateId)
            .then(function (data) {
                $scope.updateInfo.items = data[1].items;
                $scope.updateInfo.level = data[1].level;
                $scope.reformatedItems = $scope.updateInfo.items;
            });
    };

    $scope.lastVal = 100;


    $scope.editTmpl = function (info) {
        let $ps = $scope;
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            size:'lg',
            templateUrl: 'templates/review-tmpl/review-tmpl-item-edit-mdal.html',
            controller: function ($scope,$uibModalInstance) {

                $scope.validVal = (val,checkSumVal)=> {
                    let lastVal = checkSumVal || $ps.lastVal;
                    if (lastVal-val <0) {
                        dialogs.info('输入分数必须小于'+lastVal,2000,'warning');
                        return false;
                    }
                };
                $scope.updateInfo = _.cloneDeep(info) || {};
                if ($scope.updateInfo.id) {
                    $scope.updateInfo.status = 'update';
                } else {
                    $scope.updateInfo.status = 'create';
                }
                _.each($scope.updateInfo.children,function (i) {
                    i.status = 'fine';
                });
                _.each($scope.updateInfo.children,function (i) {
                    i.parent = undefined;
                });
                $scope.setDirty = function (item) {
                    if (item.status !== 'create') item.status = 'update';
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                };
                $scope.addItem = function () {
                    if(!$scope.updateInfo.children) {
                        $scope.updateInfo.children = [];
                    }
                    $scope.updateInfo.children.push({status:'create'});
                };
                $scope.removeItemLv1 = function () {
                    dialogs.confirm('是否要删除此大项?','','确定','取消',true)
                        .then(function (confirm) {
                            if (confirm) {
                                EvaluationTemplateCategory.removeAllItemById(info.id)
                                    .then(function () {
                                        $ps.refreshItems();
                                        $scope.cancel();
                                    })
                            }
                        });

                }
                $scope.removeItemLv2 = function (item) {
                    item.status = 'delete';
                };
                $scope.submitEdit = function () {
                    EvaluationTemplateCategory.updateItem(templateId, $scope.updateInfo)
                        .then(function () {
                            $ps.refreshItems();
                            $scope.cancel();
                        })
                }
            }
        });
    };

    $scope.editLevel = function (info) {
        let $ps = $scope;
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            size:'sm',
            templateUrl: 'templates/review-tmpl/review-tmpl-level-edit-mdal.html',
            controller: function ($scope,$uibModalInstance,EvaluationTemplateLevel) {
                $scope.updateInfo = _.clone(info) || {categoryId:templateId};
                $scope.levelOptions = {
                    A:{name:'A',value:'A'},
                    B:{name:'B',value:'B'},
                    C:{name:'C',value:'C'},
                    D:{name:'D',value:'D'}
                };
                _.each($ps.updateInfo.level,i=>{
                    if ($scope.levelOptions[i.evaluationLevel]) {
                        $scope.levelOptions[i.evaluationLevel] = undefined;
                    }
                });
                if (info && info.evaluationLevel) {
                    $scope.levelOptions[info.evaluationLevel] = {name:info.evaluationLevel,value:info.evaluationLevel};
                }

                $scope.cancel = function () {
                    $uibModalInstance.dismiss();

                };
                $scope.submitEdit = function () {
                    EvaluationTemplateLevel.upsetOne('id', $scope.updateInfo)
                        .then(function () {
                            $ps.refreshItems();
                            $scope.cancel();
                        });
                }

                $scope.removeLevelItem = function () {
                    dialogs.confirm('是否要删除此项?','','确定','取消',true)
                        .then(function (confirm) {
                            if (confirm) {
                                EvaluationTemplateLevel.deleteOne(info.id)
                                    .then(function () {
                                        $ps.refreshItems();
                                        $scope.cancel();
                                    })
                            }
                        });

                }
            }
        });
    }
};

export {reviewTmplListCtrl,reviewTmplEditCtrl}