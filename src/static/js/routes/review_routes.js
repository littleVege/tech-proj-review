export default ($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('review',{
            url:'/experts/review',
            templateUrl:'templates/exp-review/experts_review_projects.html',
            controller:'ExpReviewListCtrl'
        })
        .state('reviewEdit',{
            url:'/experts/review/edit?projectId&expertId&from',
            templateUrl:'templates/exp-review/review_edit.html',
            controller:'ExpReviewEditCtrl'
        })
        .state('reviewEdit.step1',{
            url:'/step1',
            templateUrl:'templates/exp-review/review_edit_step1.html'
        })
        .state('reviewEdit.step2',{
            url:'/step2',
            templateUrl:'templates/exp-review/review_edit_step2.html'
        })
        .state('reviewDetail',{
            url:'/experts/review/detail/:projectId?expertId',
            templateUrl:'templates/exp-review/review_detail.html',
            controller:'ExpReviewDetailCtrl'
        })

}