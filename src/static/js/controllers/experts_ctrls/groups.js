let groupListCtrl = ($scope,ProjectGroup,Utils,$uibModal) => {
    $scope.queryInfo = {};
    Utils.paginize($scope,function (page) {
        return ProjectGroup.getListByQuery($scope.queryInfo,page)
    });
    $scope.pageChanged();
};

export {groupListCtrl}