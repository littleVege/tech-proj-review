let mailTmplListCtrl = ($scope,MailTemplate,User,Utils,$stateParams,$uibModal) => {
    $scope.queryInfo = {type:$stateParams['type']};
    Utils.paginize($scope,function (page) {
        return MailTemplate.getListByQuery($scope.queryInfo,page)
            .catch(e=>{
                console.log(e);
            });
    });
    $scope.pageChanged();

    $scope.editTmpl = function (info) {
        let $ps = $scope;
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            size:'lg',
            templateUrl: 'templates/mail-tmpl/edit-mail-tmpl.html',
            controller: function ($scope,$uibModalInstance) {
                $scope.updateInfo = _.cloneDeep(info) || {};
                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                };
                $scope.submitEdit = function () {
                    MailTemplate.upsetOne('id',$scope.updateInfo)
                        .then(function () {
                            $ps.pageChanged();
                            $scope.cancel();
                        })
                }
            }
        });
    };

    $scope.removeTmpl = function (info) {
        if (confirm('请确认是否要删除')) {
            MailTemplate.deleteOne(info.id)
                .then(function () {
                    alert('删除成功！');
                    $scope.pageChanged();
                })
        }
    }
};

export {mailTmplListCtrl}