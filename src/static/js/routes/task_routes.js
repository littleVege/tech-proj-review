export default ($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('taskList',{
            url:'/sys/task/list',
            templateUrl:'templates/sys-tasks/sys-tasks-list.html',
            controller:'SysTaskListCtrl'
        })
        .state('taskDetail',{
            url:'/list/unalloted?taskId',
            templateUrl:'templates/sys-tasks/sys-tasks-detail.html',
            controller:'SysTaskDetailCtrl'
        })
}