export default ($filter) => {
    return {
        restrict: 'E',
        templateUrl: 'templates/components/org-select.html',
        replace:true,
        scope: {
            selectedOrg: '=ngModel',
            useName:'=?',
            multiple:'=?',
            onChange:'&?'
        },
        link: ($scope, el) => {
            $scope.__status = {
                dropdownOpen:false
            };
            $scope.toggleDropdown = function () {
                $scope.__status.dropdownOpen = !$scope.__status.dropdownOpen;
            };

            $scope.selectOrg = function (org) {
                $scope._selectedOrg = org;
                $scope.selectedOrg = $scope.useName ? org.name : org.id;
                $scope.onChange && $scope.onChange();
                $scope.toggleDropdown();
            }

            $scope.clearSelect = function () {
                $scope._selectedOrg = null;
                $scope.selectedOrg = null;
                $scope.onChange && $scope.onChange();
            }
        }
    }
}