export default ($stateProvider) => {
    $stateProvider
        .state('expert',{
            url:'/sys/experts',
            templateUrl:'templates/experts/index.html'
        })
        .state('expert.list',{
            url:'/list',
            templateUrl:'templates/experts/expert_list.html',
            controller:'SysExpertListCtrl'
        })
}