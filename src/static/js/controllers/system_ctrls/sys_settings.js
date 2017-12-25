let accountCtrl = ($scope,$uibModal,User) => {
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
}
let orgAccountCtrl = ($scope,User,Utils) => {
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
let expertAccountCtrl = ($scope,User,Utils) => {
    $scope.queryInfo = {roleId:2};
    Utils.paginize($scope,function (page) {
        return User.getListByQuery({},page);
    });
    $scope.pageChanged();
};
let sysAccountCtrl = ($scope,User,Utils) => {
    $scope.queryInfo = {roleId:3};
    Utils.paginize($scope,function (page) {
        return User.getListByQuery({},page);
    });
    $scope.pageChanged();
};
let logsCtrl = ($scope) => {

};

let settingCtrl = ($scope) => {

};

export {accountCtrl,orgAccountCtrl,expertAccountCtrl,sysAccountCtrl,logsCtrl,settingCtrl}