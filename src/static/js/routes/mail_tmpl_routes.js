export default ($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('sysMailTmpls',{
            url:'/sys/mail/tmpl',
            templateUrl:'templates/mail-tmpl/index.html',
            controller:'MailTmplListCtrl'
        })
}