let reviewTmplListCtrl = ($scope,EvaluationTemplateCategory,Utils,$stateParams,$uibModal,$state) => {
    $scope.queryInfo = {type:$stateParams['type']};
    Utils.paginize($scope,function (page) {
        return EvaluationTemplateCategory.getListByQuery($scope.queryInfo,page);
    });
    $scope.pageChanged();

    $scope.removeTmpl = function (info) {
        if (confirm('请确认是否要删除')) {
            MailTemplate.deleteOne(info.id)
                .then(function () {
                    alert('删除成功！');
                    $scope.pageChanged();
                })
        }
    }

    $scope.createTmpl = function () {
        EvaluationTemplateCategory.createOne({name:`__初始模板${new Date().getTime()}`})
            .then(function (data) {
                let info = data[1];
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
    }


    $scope.editTmpl = function (info) {
        let $ps = $scope;
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            size:'lg',
            templateUrl: 'templates/review-tmpl/review-tmpl-item-edit-mdal.html',
            controller: function ($scope,$uibModalInstance) {
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
                    EvaluationTemplateCategory.removeAllItemById(info.id)
                        .then(function () {
                            $scope.cancel();
                        })
                }
                $scope.removeItemLv2 = function (item) {
                    item.status = 'delete';
                };
                $scope.submitEdit = function () {
                    EvaluationTemplateCategory.updateItem(templateId, $scope.updateInfo)
                        .then(function () {
                            // $ps.pageChanged();
                            $scope.cancel();
                        })
                }
            }
        });
    };

    $scope.editLevel = function (info) {

    }
};

export {reviewTmplListCtrl,reviewTmplEditCtrl}