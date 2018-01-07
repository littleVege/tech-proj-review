export default ($filter,Organization,$timeout) => {
    return {
        restrict: 'E',
        templateUrl: 'templates/components/org-select.html',
        replace:true,
        scope: {
            selectedOrg: '=?ngModel',
            useName:'=?',
            multiple:'=?',
            onChange:'&?'
        },
        link: ($scope, el) => {
            $scope.__status = {
                dropdownOpen:false
            };
            $scope.queryInfo = {rows:1000};
            let getOrgs = function () {
                Organization.getListByQuery($scope.queryInfo)
                    .then(function (data) {
                        let orgs = data[1];
                        $scope.orgsRaw = data[1];
                        orgs = _.groupBy(orgs,i=>i.initialism);
                        $scope.orgs = orgs;
                    });
            };
            getOrgs();

            $scope.selectArea = function (area) {
                $scope.queryInfo.area = area;
                getOrgs();
            }

            $scope.toggleDropdown = function () {
                $scope.__status.dropdownOpen = !$scope.__status.dropdownOpen;
            };

            $scope.selectOrg = function (org) {
                $scope._selectedOrg = org;
                $scope.selectedOrg = $scope.useName ? org.name : org.id;
                $scope.onChange && $scope.onChange();
                $scope.toggleDropdown();
            };

            $scope.cancelOrgSelect = function () {
                $scope._selectedOrg = null;
                $scope.selectedOrg = null;
                $timeout(function () {
                    $scope.onChange && $scope.onChange();
                },100);

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