let expertListCtrl = ($scope,Expert,Utils,$uibModal) => {
    $scope.queryInfo = {};
    $scope.search = function () {
        $scope.pageInfo.currentPage = 1;
        $scope.pageChanged();
    };

    Utils.paginize($scope, function (page) {
        return Expert.getListByQuery($scope.queryInfo, page)
    });
    $scope.pageChanged();
};

export {expertListCtrl}