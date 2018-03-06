const reviewListCtrl = ($scope,Project,$stateParams,$rootScope,Utils) => {
    $scope.queryInfo = {expertId:$rootScope.User.expert.id};
    $scope.setStatus = function (status) {
        $scope.queryInfo.evaluationStatus = status;
        $scope.pageInfo.currentPage = 1;
        $scope.pageChanged();
    }

    $scope.queryCate = function (cate) {
        if (cate) {
            $scope.queryInfo.categoryId = cate.id;
        } else {
            $scope.queryInfo.categoryId = null;
        }

        $scope.pageChanged();
    };

    Utils.paginize($scope,function (page) {
        return Project.queryListByExpertId($scope.queryInfo,page)
    });
    $scope.pageChanged();
};

const reviewDetailCtrl = ($scope,Project,ProjectExpertEvaluation,EvaluationTemplateCategory,ProjectExpertEvaluationDetail,Task,ProjectRelation,$stateParams) => {
    let projectId = $stateParams['projectId'];
    let expertId = $stateParams['expertId'];
    ProjectExpertEvaluation
        .getOneByQuery({projectId:projectId,expertId:expertId})
        .then(function (evalInfo) {
            $scope.info = evalInfo;
        });
    function setScore(items) {
        _.each(items,function (i) {
            let scoreItem = _.find($scope.evalDetail,e=>e.evaluationTemplateItemId == i.id);
            if (scoreItem) {
                i.score = scoreItem.evaluationScore;
            }
            if (i.children) {
                _.each(i.children,c=>{
                    let scoreItem = _.find($scope.evalDetail,ce=>ce.evaluationTemplateItemId == c.id);
                    if (scoreItem) {
                        c.score = scoreItem.evaluationScore;
                    }
                })
            }
        })

    }
    ProjectExpertEvaluationDetail
        .getListByQuery({projectId:projectId,expertId:expertId},1,100)
        .then(function (detail) {
            $scope.evalDetail = detail[1];
        })
        .then(function () {
            return Project.getOne(projectId)
        })
        .then(function (info) {
            $scope.projectInfo = info;
            return info.taskId;
        })
        .then(function (taskId) {
            return Task.getOne(taskId)
        })
        .then(function (task) {
            return task.evaluationTemplateCategoryId
        })
        .then(function (templateId) {
            return EvaluationTemplateCategory.getAllDetail(templateId)
        })
        .then(function (data) {
            $scope.templates = data[1];
            $scope.reformatedItems = $scope.templates.items;
            setScore($scope.reformatedItems);
        });
    ProjectRelation.getListByQuery({projectId:projectId,expertId:expertId})
        .then(function (data) {
            /*这个有点问题*/
            $scope.checkedProjects = data[1];
        });
};

const reviewEditCtrl = ($scope,Project,EvaluationTemplateCategory,dialogs,Utils, $state,
                        ProjectExpertEvaluation,ProjectExpertEvaluationDetail,ProjectRelationList,
                        Task,$stateParams,ProjectRelation,$uibModal,$rootScope) => {
    let projectId = $stateParams['projectId'];
    let expertId = $stateParams['expertId'];
    let from = $stateParams['from'];

    let doQueryExpEval = function () {
        return ProjectExpertEvaluation
            .getOneByQuery({projectId:projectId,expertId:expertId})
            .then(function (evalInfo) {
                $scope.updateInfo = evalInfo;
            });
    }
    doQueryExpEval()
        .then(function (evalInfo) {
            $scope.updateInfo['expertId'] = +expertId;
            $scope.updateInfo['projectId'] = +projectId;
        });


    function setScore(items) {
        _.each(items,function (i) {
            let scoreItem = _.find($scope.evalDetail,e=>e.evaluationTemplateItemId == i.id);
            if (scoreItem) {
                i.score = scoreItem.evaluationScore;
            }
            if (i.children) {
                _.each(i.children,c=>{
                    let scoreItem = _.find($scope.evalDetail,ce=>ce.evaluationTemplateItemId == c.id);
                    if (scoreItem) {
                        c.score = scoreItem.evaluationScore;
                    }
                })
            }
        })

    }

    $scope._checkVal = function (val,maxVal) {
        if (val && val > maxVal) {
            dialogs.success(`输入分数不能超过${maxVal}`,1000,'error');
            return false;
        } else {
            return true;
        }
    }
    $scope.checkVal = function (item) {
        let flag = $scope._checkVal(item.score,item.maxScore);
        if (!flag) {
            item.score = null;
        }
        $scope.sumVals();
    };


    $scope.sumVals = function () {
        $scope.updateInfo.evaluationScore = _.reduce($scope.reformatedItems,function (r,i) {
            if (i.score) r+=i.score;
            if (i.children) {
                _.each(i.children,c=>{
                    if (c.score) r+=c.score;
                })
            }
            return r;
        },0)
    };

    ProjectExpertEvaluationDetail
        .getListByQuery({projectId:projectId,expertId:expertId},1,100)
        .then(function (detail) {
            $scope.evalDetail = detail[1];
        })
        .then(function () {
            return Project.getOne(projectId)
        })
        .then(function (info) {
            $scope.projectInfo = info;
            return info.taskId;
        })
        .then(function (taskId) {
            return Task.getOne(taskId)
        })
        .then(function (task) {
            return task.evaluationTemplateCategoryId
        })
        .then(function (templateId) {
            return EvaluationTemplateCategory.getAllDetail(templateId)
        })
        .then(function (data) {
            $scope.templates = data[1];
            $scope.reformatedItems = $scope.templates.items;
            setScore($scope.reformatedItems);
        });


    const getEvalDetailContent = function () {
        let hasScoreItems = _.reduce($scope.reformatedItems,(r,i)=> {
            let scoredItems = _.filter(i.children,c=>_.isNumber(c.score));
            r = _.concat(r,scoredItems);
            if (_.isNumber(i.score)) {
                r.push(i);
            }
            return r;
        },[]);

        let content = _.map(hasScoreItems,i=>{
            return {
                evaluationScore:i.score,
                evaluationTemplateItemId:i.id,
                expertId:+expertId,
                projectId:+projectId
            }
        });
        return content;

    };

    const sumTotalScore = function (detail) {
        return _.sumBy(detail,i=>i.evaluationScore);
    };

    const submitStepOne = function () {
        let detail = getEvalDetailContent();
        $scope.updateInfo.evaluationScore = sumTotalScore(detail);
        return ProjectExpertEvaluation.setEvaluation($scope.updateInfo,detail,expertId)
            .catch(function (e) {
                dialogs.success(e.message,2000,'error');
            })
    }

    $scope.submitStepOne = () => {
        submitStepOne().then(()=>{
            dialogs.success('内容保存成功');
        })
    };

    $scope.submitAndToStepTwo = () => {
        submitStepOne().then(()=>doQueryExpEval()).then(()=>{
            $state.go('reviewEdit.step2');
        })
    };

    /////////////step2
    $scope.relationListQueryInfo = {projectId:projectId};

    ProjectRelation.getListByQuery({projectId:projectId,expertId:expertId})
        .then(function (data) {
            /*这个有点问题*/
            $scope.checkedProjects = data[1];
        })
        .then(function () {
            Utils.paginize($scope,function (page) {
                return ProjectRelationList.getListByQuery($scope.relationListQueryInfo,page)
                    .then(function(data) {
                        if(data && data[1]) {
                            _.each(data[1],i=>{
                                let found = _.find($scope.checkedProjects,p=>p.relateProjectId === i.relateProjectId);
                                if (found) i.checked = true;
                            });
                        }
                        return data;
                    })
                    .catch(e=>console.log(e));
            });
            $scope.pageChanged();
        })



    $scope.removeDup = function (i) {
        dialogs.confirm('是否要删除此重复项目','','好的','取消',true)
            .then(isConfirm=>{
                if (isConfirm) {
                    ProjectRelation.deleteOne(i.id)
                        .then(function () {
                            _.remove($scope.checkedProjects,cp=>cp.id === i.id);
                            console.log('内容已删除');
                        })
                }
            })
    }

    const submitStepTwo = function () {
        return ProjectExpertEvaluation.updateOne($scope.updateInfo.id,{
            dupSuggestion:$scope.updateInfo.dupSuggestion
        })
    }

    $scope.submitStepTwo = function () {
        submitStepTwo()
            .then(function () {
                dialogs.success('内容保存成功');
            })
    };

    $scope.submitAndPublish = function () {
        return ProjectExpertEvaluation.updateOne($scope.updateInfo.id,{
                dupSuggestion:$scope.updateInfo.dupSuggestion,
                evaluationStatus:1
            })
            .then(function() {
                $scope.goBack();
            })
    };
    $scope.checkedProjects = [];
    $scope.editDupProject = function (projectInfo) {
        let $ps = $scope;
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/exp-review/edit_dup_project_mdal.html',
            controller: function ($scope,$uibModalInstance) {
                $scope.updateInfo = _.cloneDeep(projectInfo) || {};
                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                };
                $scope.submitEdit = function () {
                    ProjectRelation.upsetOne('id',$scope.updateInfo)
                        .then(function () {
                            _.merge(projectInfo,$scope.updateInfo);
                            $scope.cancel();
                        })
                }
            }
        });
    };
    $scope.afterAddDup = function (projectInfo) {
        let $ps = $scope;
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/exp-review/after_add_dup_project_mdal.html',
            controller: function ($scope,$uibModalInstance) {
                $scope.updateInfo = {
                    projectId:projectId,
                    expertId:$rootScope.User.expert.id,
                    relateProjectId:projectInfo.relateProjectId,
                    dataSource:'internal',
                    projectSource:projectInfo.webProjsAll.source,
                    relateProjectName:projectInfo.webProjsAll.title,
                    relateProjectUrl:projectInfo.webProjsAll.sourceUrl,
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                };
                $scope.submitEdit = function () {
                    ProjectRelation.upsetOne('id',$scope.updateInfo)
                        .then(function (info) {
                            projectInfo.checked = true;
                            $ps.checkedProjects.push(info);
                            $scope.cancel();
                        })
                }
            }
        });
    }

    $scope.goBack = function () {
        if ($stateParams['from']) {
            window.location.hash = $stateParams['from'];
        } else {
            $state.go('review');
        }

    }
};

export {reviewListCtrl,reviewEditCtrl,reviewDetailCtrl}