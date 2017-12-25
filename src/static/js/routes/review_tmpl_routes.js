export default ($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('reviewTmpls',{
            url:'/sys/reviewTmpl/list',
            templateUrl:'templates/review-tmpl/review-tmpl-list.html',
            controller:'ReviewTmplListCtrl'
        })
        .state('reviewTmplDetail',{
            url:'/sys/reviewTmpl/detail?id',
            templateUrl:'templates/review-tmpl/review-tmpl-detail.html',
            controller:'ReviewTmplEditCtrl'
        })
        .state('reviewTmplEdit',{
            url:'/sys/reviewTmpl/edit?id',
            templateUrl:'templates/review-tmpl/review-tmpl-edit.html',
            controller:'ReviewTmplEditCtrl'
        })

}