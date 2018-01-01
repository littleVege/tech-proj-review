let orgProjectsCtrl = ($scope,Project,Utils,$uibModal,dialogs,$state,$rootScope) => {
    console.log($state.current);
    switch ($state.current.name.split('.')[1]) {
        case 'unchecked':
            $scope.queryInfo = {projectStatus:1};
            break;
        case 'checking':
            $scope.queryInfo = {projectStatus:2};
            break;
        case 'checked':
            $scope.queryInfo = {projectStatus:4};
            break;
    }
    $scope.queryInfo.orgId = $rootScope.User.organization.id;
    // $scope.queryInfo.isSys = 0;
    Utils.paginize($scope,function (page) {
        return Project.getListByQuery($scope.queryInfo,page)
    });

    $scope.pageChanged();

    $scope.queryCate = function (cate) {
        if (cate) {
            $scope.queryInfo.categoryId = cate.id;
        } else {
            $scope.queryInfo.categoryId = null;
        }

        $scope.pageChanged();
    };

    $scope.queryStatus = function (status) {
        if (!_.isNull(status)) {
            $scope.queryInfo.projectStatus = status;
        } else {
            $scope.queryInfo.projectStatus = null;
        }
        $scope.pageChanged();

    };

    $scope.search = function () {
        $scope.pageInfo.currentPage = 1;
        $scope.pageChanged();
    }

    $scope.editProject = function (project) {
        let $ps = $scope;
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/projects/project_edit_mdal.html',
            controller: function ($scope,$uibModalInstance) {
                $scope.updateInfo = project?_.cloneDeep(project):{};
                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                };
                $scope.removeTask = function (item) {
                    if (confirm('确认要删除此数据？')) {
                        Project.deleteOne(item.id)
                            .then(()=>alert('删除成功'));
                    }
                };
                $scope.submitEdit = function (notify) {
                    let files = $scope.files || [];
                    let fileIds = _.map(files,function (i) {
                        return i.id;
                    })
                    $scope.updateInfo.fileIds = fileIds.join(',');
                    return Project.upsetOne('id',$scope.updateInfo)
                        .then(function () {
                            if (notify) {
                                dialogs.success('项目信息编辑成功!');
                            }
                        })

                };
                $scope.submitAndPublish = function () {
                    $scope.updateInfo.projectStatus = 2;
                    return $scope.submitEdit()
                        .then(function () {
                            $ps.pageChanged();
                            $scope.cancel();
                        })
                }
            }
        });
    }

    $scope.publish = function (project) {
        dialogs.confirm('是否要提交次项目','','好的','取消',true)
            .then(function (ifconfirm) {
                if (ifconfirm) {
                    Project.updateOne(project.id,{projectStatus:2})
                        .then(function () {
                            $scope.pageChanged();
                        })
                }
            })
    }

};


let orgProjectDetailCtrl = ($scope,$stateParams,Project,ProjectExpertEvaluation) => {
    let projectId = $stateParams['projectId'];
    Project.getOne(projectId)
        .then(function (data) {
            $scope.projectInfo = data;
        });
    ProjectExpertEvaluation.getListByQuery({projectId:projectId})
        .then(function (data) {
            $scope.reviews = data[1];
        });
};

export {
    orgProjectsCtrl,
    orgProjectDetailCtrl

}