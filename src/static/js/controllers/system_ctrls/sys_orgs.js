let orgListCtrl = ($scope,Organization,User,Utils,$uibModal) => {
    $scope.queryInfo = {};
    Utils.paginize($scope,function (page) {
        return Organization.getListByQuery($scope.queryInfo,page);
    });
    $scope.pageChanged();

    $scope.editOrg = function (orgInfo) {
        let $ps = $scope;
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/organization/org_edit_modal.html',
            controller: function ($scope,$uibModalInstance) {
                $scope.updateInfo = _.cloneDeep(orgInfo) || {};
                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                };
                $scope.submitEdit = function () {
                    Organization.upsetOne('id',$scope.updateInfo)
                        .then(function () {
                            $ps.pageChanged();
                            $scope.cancel();
                        })
                }
            }
        });
    };
    $scope.createOrg = function () {
        let $ps = $scope;
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/organization/org_edit_modal.html',
            controller: function ($scope,$uibModalInstance) {
                $scope.updateInfo =  {};
                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                };
                $scope.submitEdit = function () {
                    Organization.upsetOne('id',$scope.updateInfo)
                        .then(function () {
                            $ps.pageChanged();
                            $scope.cancel();
                        })
                }
            }
        });
    }

    $scope.removeOrg = function (orgInfo) {
        if (confirm('请确认是否要删除')) {
            ProjectGroup.deleteOne(orgInfo.id)
                .then(function () {
                    alert('删除成功！');
                    $scope.pageChanged();
                })
        }
    }
};
export {
    orgListCtrl
}