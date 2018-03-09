let groupListCtrl = ($scope,ProjectGroup,Utils,$uibModal) => {
    $scope.queryInfo = {};
    Utils.paginize($scope,function (page) {
        return ProjectGroup.getListByQuery($scope.queryInfo,page)
    });
    $scope.pageChanged();

    $scope.search = function () {
        $scope.pageInfo.currentPage = 1;
        $scope.pageChanged();
    };

};

export {groupListCtrl}