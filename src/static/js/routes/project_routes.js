export default ($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('projects',{
            url:'/org/project',
            templateUrl:'templates/projects/index.html',

        })
        .state('projects.unchecked',{
            url:'/list/unchecked?categoryId&page&row&name',
            templateUrl:'templates/projects/project_list_unchecked.html',
            controller:'OrgProjectListCtrl',
            reloadOnSearch: false
        })
        .state('projects.checking',{
            url:'/list/checking?categoryId&page&row&name',
            templateUrl:'templates/projects/project_list_checking.html',
            controller:'OrgProjectListCtrl',
            reloadOnSearch: false
        })
        .state('projects.checked',{
            url:'/list/checked?categoryId&page&row&name',
            templateUrl:'templates/projects/project_list_checked.html',
            controller:'OrgProjectListCtrl',
            reloadOnSearch: false
        })
        .state('projectDetail',{
            url:'/org/project/detail/:projectId',
            templateUrl:'templates/projects/project_detail.html',
            controller:'OrgProjectDetailCtrl'
        })
}