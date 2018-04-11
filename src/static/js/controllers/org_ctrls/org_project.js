let orgProjectsCtrl = ($scope,Project,Utils,$uibModal,dialogs,$state,$rootScope,$location,$stateParams) => {

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
            .then(data=>{
                $location.search('page', page);
                // $state.transitionTo($state.current.name, _.merge(_.clone($scope.queryInfo),{page:page}), { reload: false, notify: false,location: 'replace' });
                return data;
            })
    },$stateParams['page'] ?+$stateParams['page']:1 );

    $scope.pageChanged();

    $scope.queryCate = function (cate) {
        if (cate) {
            $scope.queryInfo.categoryId = cate.id;
        } else {
            $scope.queryInfo.categoryId = null;
        }

        $scope.resetPage();
    };

    $scope.queryStatus = function (status) {
        if (!_.isNull(status)) {
            $scope.queryInfo.projectStatus = status;
        } else {
            $scope.queryInfo.projectStatus = null;
        }
        $scope.resetPage();

    };

    $scope.search = function () {
        $scope.pageInfo.currentPage = 1;
        $scope.resetPage();
    };

    $scope.editProject = function (project) {
        let $ps = $scope;
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/projects/project_edit_mdal.html',
            controller: function ($scope,$uibModalInstance,File) {
                $scope.updateInfo = project?_.cloneDeep(project):{orgId:$rootScope.User.organization.id};
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
                    });
                    _.remove(fileIds,i=>!i);
                    $scope.updateInfo.fileIds = fileIds.join(',');
                    swal({
                        title: "请稍候...",
                        text: "系统正在匹配相关内容，需等待10秒",
                        icon: "info",
                        showCancelButton: false,
                        showConfirmButton: false
                    });
                    return Project.upsetOne('id',$scope.updateInfo)
                        .then(function () {
                            dialogs.success('项目信息编辑成功!');
                        })
                        .catch(e=>{
                            dialogs.info(e.message,2000,'error');
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
    };

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
    };

    $scope.uploadMass = function () {
        let $ps = $scope;
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/projects/upload_file_mass.html',
            controller: function ($scope, $uibModalInstance) {
                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                };
                $scope.submitEdit = function (notify) {};

            }
        });
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

    $scope.goBack = function () {
        $state.go('groupEdit.step2');
    }
};

export {
    orgProjectsCtrl,
    orgProjectDetailCtrl

}