let relationProjectListCtrl = ($scope,WebProjsAll,Utils) => {
    $scope.queryInfo = {};
    $scope.setSource = function (source) {
        $scope.queryInfo.source = source;
        $scope.pageInfo.currentPage = 1;
        $scope.pageChanged();
    };
    Utils.paginize($scope,function (page) {
        return WebProjsAll.getListByQuery($scope.queryInfo,page)
    });
    $scope.pageChanged();
};

let reationProjectDetailCtrl = ($scope,WebProjsAll,Utils) => {

};

export {reationProjectDetailCtrl,relationProjectListCtrl}