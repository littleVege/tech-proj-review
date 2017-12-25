export default () => {
    return {
        init: function (scope, onSubmit) {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'templates/projects/project_edit_mdal.html',
                controller: function ($scope,$uibModalInstance) {
                    $scope.updateInfo = project?_.cloneDeep(project):{};
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                }
            });
        }
    }
}