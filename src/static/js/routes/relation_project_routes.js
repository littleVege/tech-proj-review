export default ($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('relationProjects',{
            url:'/relation-project/list',
            templateUrl:'templates/relation_projects/relation_project_list.html',
            controller:'RelationProjectListCtrl'
        })
}