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

let relationProjectDetailCtrl = ($scope, WebProjsAll, Utils, $stateParams,$sce) => {
    let pid = $stateParams['pid'];
    WebProjsAll.getOne(pid)
        .then(project=>{
            $scope.item = project;
            $scope.currentProjectUrl = $sce.trustAsResourceUrl($scope.item.sourceUrl);
        });
};

export {relationProjectDetailCtrl,relationProjectListCtrl}