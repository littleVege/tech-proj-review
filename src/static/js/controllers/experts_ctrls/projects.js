let expProjectsCtrl = ($scope,Project,Utils) => {
    $scope.queryInfo = {isSys:1};
    Utils.paginize($scope,function (page) {
        return Project.getListByQuery($scope.queryInfo,page)
    });
    $scope.pageChanged();

    $scope.search = function () {
        $scope.pageInfo.currentPage = 1;
        $scope.pageChanged();
    };

};

const reviewStepCtrl = ($scope,Project,ProjectExpertEvaluation,) => {

};

const projectDetailCtrl = () => {};


export {expProjectsCtrl}