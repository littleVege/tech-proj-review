let groupListCtrl = ($scope,ProjectGroup,Utils,$uibModal) => {
    $scope.queryInfo = {};
    Utils.paginize($scope,function (page) {
        return ProjectGroup.getListByQuery($scope.queryInfo,page)
    });
    $scope.pageChanged();

    $scope.editGroup = function (groupInfo) {
        let $ps = $scope;
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/sys-tasks/edit-group-modal.html',
            controller: function ($scope,$uibModalInstance,ProjectGroup) {
                $scope.updateInfo = _.cloneDeep(groupInfo) || {};
                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                };
                $scope.submitEdit = function () {
                    ProjectGroup.upsetOne('id',$scope.updateInfo)
                        .then(function () {
                            $ps.pageChanged();
                            $scope.cancel();
                        })
                }
            }
        });
    }

    $scope.removeGroup = function (groupInfo) {
        if (confirm('请确认是否要删除')) {
            ProjectGroup.deleteOne(groupInfo.id)
                .then(function () {
                    alert('删除成功！');
                    $scope.pageChanged();
                })
        }
    }
};

let groupDetailCtrl = ($scope,$stateParams,ProjectGroup,Utils,Project) => {
    let groupId = $stateParams['groupId'];
    ProjectGroup.getOne(groupId)
        .then(function (data) {
            $scope.groupInfo = data;
        });
};

let groupDetailExpertsCtrl = ($scope,$stateParams,Utils,Expert) => {
    let groupId = $stateParams['groupId'];
    Utils.paginize($scope,function (page) {
        return Expert.queryListByGroupId(groupId,page);
    });

    $scope.pageChanged();
};
let groupDetailProjectsCtrl = ($scope,$stateParams,Utils,Project) => {
    let groupId = $stateParams['groupId'];
    Utils.paginize($scope,function (page) {
        return Project.getListByQuery({groupId:groupId},page);
    });

    $scope.pageChanged();
};

let groupEditCtrl = ($scope,$stateParams,Task,ProjectGroup,Utils,Project,$uibModal,$state,Expert) => {
    let taskId = $stateParams['taskId'];
    let groupId = $stateParams['groupId'];
    $scope.taskId = taskId;
    $scope.groupId = groupId;
    Task.getOne(taskId)
        .then(function (data) {
            $scope.taskInfo = data;
        });

    if (groupId) {
        ProjectGroup.getOne(groupId)
            .then(function (data) {
                $scope.groupInfo = data;
            })
            .then(function () {
                $scope.loadGroupProjects();
                $scope.loadGroupExperts();
            })


    } else {
        $scope.groupInfo = {
            taskId:taskId
        };
    }

    $scope.loadGroupProjects = function () {
        return Project.getListByQuery({groupId:$scope.groupInfo.id,projectStatus:2},1,500)
            .then(function (data) {
                $scope.groupProjects = data[1];
            })
    };

    $scope.loadGroupExperts = function () {
        return Expert.queryListByGroupId($scope.groupInfo.id,1,500)
            .then(function (data) {
                $scope.groupExperts = data[1];
            })
    };

    $scope.submitStepOne = function () {
        ProjectGroup.upsetOne('id',$scope.groupInfo)
            .then(function (data) {
                let params = _.clone($stateParams);
                if (_.isObject(data)) {
                    params['grouId'] = data.id;
                } else {
                    params['groupId'] = $scope.groupInfo.id
                }
                $scope.loadGroupProjects()
                    .then(function () {
                        $state.go('groupEdit.step2',params);
                    });
            })
    }

    $scope.submitStepTwo = function () {
        $scope.loadGroupExperts()
            .then(function () {
                $state.go('groupEdit.step3');
            })
    };


    $scope.showProjectSelectPanel = function () {
        let $ps = $scope;
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/sys-group/select-project-modal.html',
            size:'lg',
            controller: function ($scope,$uibModalInstance,Project,$q,Utils) {
                $scope.queryInfo = {};
                $scope.selectedProjects = {};
                $scope.pCount = 0;
                Utils.paginize($scope,function (page) {
                    return Project.getListByQuery($scope.queryInfo,page)
                        .then(function (data) {
                            $scope.allChecked = false;
                            _.each(data[1],function (i) {
                                if ($scope.selectedProjects[i.id]) i.selected = true;
                            })
                            return data;
                        })
                });
                $scope.pageChanged();
                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                };
                $scope.submitEdit = function () {
                    $q.all(
                        _.map($scope.selectedProjects,i=>{
                            return Project.updateOne(i.id,{taskId:$stateParams['taskId'],groupId:$stateParams['groupId']})
                        })
                    )
                    .then(function () {
                        $ps.loadGroupProjects();
                        $scope.cancel();
                    })
                };
                $scope.toggleSelect = function (item) {
                    item.selected = !item.selected;
                    if (item.selected) {
                        $scope.selectedProjects[item.id] = item;
                    } else {
                        $scope.selectedProjects[item.id] = undefined;
                    }
                }
                $scope.toggleSelectAll = function () {
                    _.each($scope.list,function (i) {
                        i.selected = true;
                        if (i.checked) {
                            $scope.selectedProjects[i.id] = i;
                        }
                    })
                }
                $scope.toggleRemoveAll = function (checkedStatus) {
                    _.each($scope.list,function (i) {
                        i.selected = checkedStatus;
                        if (i.checked) {
                            $scope.selectedProjects[i.id] = undefined;
                        }
                    })
                }
                $scope.toggleCheckAll = function (checkedStatus) {
                    _.each($scope.list,function (i) {
                        i.checked = checkedStatus;
                    })
                };
                $scope.getCount = function () {
                    return _.toArray($scope.selectedProjects).length;
                }
            }
        });
    };
    $scope.showExpertSelectPanel = function () {
        let $ps = $scope;
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/sys-group/select-experts-modal.html',
            size:'lg',
            controller: function ($scope,$uibModalInstance,Expert,ProjectGroupExpert,$q) {
                $scope.queryInfo = {};
                $scope.selectedExperts = {};
                $scope.pCount = 0;
                Utils.paginize($scope,function (page) {
                    return Expert.getListByQuery($scope.queryInfo,page)
                        .then(function (data) {
                            $scope.allChecked = false;
                            _.each(data[1],function (i) {
                                if ($scope.selectedExperts[i.id]) i.selected = true;
                            });
                            return data;
                        });
                })
                $scope.pageChanged();

                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                };
                $scope.submitEdit = function () {
                    $q.all(
                        _.map($scope.selectedExperts,i=>{
                            return ProjectGroupExpert.upsetOne('id',{expertId:i.id,groupId:$stateParams['groupId']})
                        })
                    )
                    .then(function () {
                        $ps.loadGroupExperts();
                        $scope.cancel();
                    })
                }


                $scope.toggleSelect = function (item) {
                    item.selected = !item.selected;
                    if (item.selected) {
                        $scope.selectedExperts[item.id] = item;
                    } else {
                        $scope.selectedExperts[item.id] = undefined;
                    }
                }
                $scope.toggleSelectAll = function () {
                    _.each($scope.list,function (i) {
                        i.selected = true;
                        if (i.checked) {
                            $scope.selectedExperts[i.id] = i;
                        }
                    })
                }
                $scope.toggleRemoveAll = function (checkedStatus) {
                    _.each($scope.list,function (i) {
                        i.selected = checkedStatus;
                        if (i.checked) {
                            $scope.selectedExperts[i.id] = undefined;
                        }
                    })
                }
                $scope.toggleCheckAll = function (checkedStatus) {
                    _.each($scope.list,function (i) {
                        i.checked = checkedStatus;
                    })
                };
                $scope.getCount = function () {
                    return _.toArray($scope.selectedExperts).length;
                }
            }
        });
    }
};
export {
    groupListCtrl,
    groupDetailCtrl,
    groupEditCtrl,
    groupDetailExpertsCtrl,
    groupDetailProjectsCtrl
}