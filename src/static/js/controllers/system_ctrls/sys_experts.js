let expertListCtrl = ($scope,Expert,Utils,$uibModal) => {
    $scope.queryInfo = {};
    Utils.paginize($scope, function (page) {
        return Expert.getListByQuery($scope.queryInfo, page)
    });
    $scope.pageChanged();
};

export {expertListCtrl}