export default ($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('projects',{
            url:'/org/project',
            templateUrl:'templates/projects/index.html',

        })
        .state('projects.unchecked',{
            url:'/list/unchecked',
            templateUrl:'templates/projects/project_list_unchecked.html',
            controller:'OrgProjectListCtrl'
        })
        .state('projects.checking',{
            url:'/list/checking',
            templateUrl:'templates/projects/project_list_checking.html',
            controller:'OrgProjectListCtrl'
        })
        .state('projects.checked',{
            url:'/list/checked',
            templateUrl:'templates/projects/project_list_checked.html',
            controller:'OrgProjectListCtrl'
        })
        .state('projectDetail',{
            url:'/org/project/detail/:projectId',
            templateUrl:'templates/projects/project_detail.html',
            controller:'OrgProjectDetailCtrl'
        })
}