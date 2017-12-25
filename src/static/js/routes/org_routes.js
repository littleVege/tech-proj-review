export default ($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('org',{
            url:'/sys/org',
            templateUrl:'templates/organization/index.html'
        })
        .state('org.list',{
            url:'/list',
            templateUrl:'templates/organization/org_list.html',
            controller:'OrgListCtrl'
        })
        .state('org.accounts',{
            url:'/accounts',
            templateUrl:'templates/organization/org_account_list.html'
        })
}