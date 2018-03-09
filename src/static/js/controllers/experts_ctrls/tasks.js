let taskListCtrl = ($scope,$uibModal,Task,Utils,$rootScope) => {
    $scope.queryInfo = {expertId:$rootScope.User.expert.id};
    Utils.paginize($scope,function (page) {
        return Task.queryListByExpertId($scope.queryInfo,page)
    });
    $scope.pageChanged();

    $scope.search = function () {
        $scope.pageInfo.currentPage = 1;
        $scope.pageChanged();
    };


};
let taskDetailCtrl = ($scope,Task,Utils,$stateParams) => {
    Task.getOne($stateParams['taskId'])
        .then(function (data) {
            $scope.taskInfo = data;
        })
};
let taskGroupsCtrl = ($scope,Task,ProjectGroup,Utils,$stateParams) => {
    $scope.queryInfo = {expertId:$stateParams['expertId'],taskId:$stateParams['taskId']};
    Utils.paginize($scope,function (page) {
        return ProjectGroup.queryListByExpertId($scope.queryInfo,page)
    });
    $scope.pageChanged();
};
let taskProjectsCtrl = ($scope,Task,Project,Utils,$stateParams,$state) => {
    $scope.queryInfo = {expertId:$stateParams['expertId'],taskId:$stateParams['taskId']};
    $scope.setStatus = function (status) {
        $scope.queryInfo.evaluationStatus = status;
        $scope.pageInfo.currentPage = 1;
        $scope.pageChanged();
    }
    Utils.paginize($scope,function (page) {
        return Project.queryListByExpertId($scope.queryInfo,page)
    });
    $scope.pageChanged();
    $scope.fromLocation = window.location.hash;
};

export {taskListCtrl,taskDetailCtrl,taskGroupsCtrl,taskProjectsCtrl}