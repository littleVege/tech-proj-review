export default ($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('relationProjects',{
            url:'/relation-project/list',
            templateUrl:'templates/relation_projects/relation_project_list.html',
            controller:'RelationProjectListCtrl'
        })
        .state('relationProjectDetail',{
            url:'/relation-project/detail?pid',
            templateUrl:'templates/relation_projects/relation_project_detail.html',
            controller:'RelationProjectDetailCtrl'
        })
}