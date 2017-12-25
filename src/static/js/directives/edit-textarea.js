/**
 * Created by caidi on 2017/8/9.
 */
export default ($filter,Common,$uibModal) => {
    return {
        restrict: 'E',
        templateUrl: 'templates/components/edit-textarea.html',
        replace:true,
        scope: {
            inputContent: '=ngModel',
            limit:'=?',
            infoMsg:'@?',
        },
        link: ($scope, el) => {
            $scope.onBlur = function () {
                if ($scope.inputContent > $scope.limit) {

                }
            };
        }
    }
}

