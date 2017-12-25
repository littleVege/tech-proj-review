export default ($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('sysProjs',{
            url:'/sys/project',
            templateUrl:'templates/sys-projects/sys-project-list.html',
            controller:'SysProjectsCtrl'
        })
        .state('sysProjsCollect',{
            url:'/sys/project/collect/:projectId',
            templateUrl:'templates/sys-projects/sys-review-collect.html',
            controller:'SysProjectCollectCtrl'
        })
}