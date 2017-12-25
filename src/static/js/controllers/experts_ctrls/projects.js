let expProjectsCtrl = ($scope,Project,Utils) => {
    $scope.queryInfo = {};
    Utils.paginize($scope,function (page) {
        return Project.getListByQuery($scope.queryInfo,page)
    });
    $scope.pageChanged();
};

const reviewStepCtrl = ($scope,Project,ProjectExpertEvaluation,) => {

};

const projectDetailCtrl = () => {};


export {expProjectsCtrl}