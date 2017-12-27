let accountCtrl = ($scope,$uibModal,User,$state,Utils) => {
    $scope.changePassword = function (user) {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/sys-manager/reset_password.html',
            controller: function ($scope,$uibModalInstance) {
                $scope.user = user;
                $scope.updateInfo = {};
                $scope.dismissModal = function () {
                    $uibModalInstance.dismiss();
                };
                $scope.finishOne = function () {
                    let promise;
                    $scope.updateInfo.newPassword = _.trim($scope.updateInfo.newPassword);
                    $scope.updateInfo.repeatNewPassword = _.trim($scope.updateInfo.repeatNewPassword);

                    if ($scope.updateInfo.newPassword !== $scope.updateInfo.repeatNewPassword) {
                        return swal('新密码验证错误！')
                    }
                    promise = User.updateOne(user.id,{
                        password:$scope.updateInfo.newPassword
                    });
                    promise.then(function (data) {
                        $uibModalInstance.close(data);
                    });
                }

            },
            backdrop: 'static'
        });
    };
    switch ($state.current.name.split('.')[2]) {
        case 'org':
            $scope.queryInfo = {roleId:1};
            break;
        case 'expert':
            $scope.queryInfo = {roleId:2};
            break;
        case 'sys':
            $scope.queryInfo = {roleId:3};
            break;
    }
    $scope.queryInfo = {roleId:1};
    Utils.paginize($scope,function (page) {
        return User.getListByQuery($scope.queryInfo,page);
    });
    $scope.setType = function (type) {
        $scope.queryInfo.type = type;
        $scope.pageInfo.currentPage = 1;
        $scope.pageChanged();
    }
    $scope.pageChanged();
};
let logsCtrl = ($scope) => {

};

let settingCtrl = ($scope) => {

};

export {accountCtrl,logsCtrl,settingCtrl}