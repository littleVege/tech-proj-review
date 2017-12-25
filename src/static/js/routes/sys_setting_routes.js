export default ($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('sysManager', {
            url: '/sys/manager',
            templateUrl: 'templates/sys-manager/index.html'
        })
        .state('sysManager.account', {
            url: '/account',
            templateUrl: 'templates/sys-manager/account_list.html',
            controller:'AccountCtrl'
        })
        .state('sysManager.account.org', {
            url: '/org',
            templateUrl: 'templates/sys-manager/account_list_org.html',
            controller:'SysMOrgAccountCtrl'
        })
        .state('sysManager.account.expert', {
            url: '/expert',
            templateUrl: 'templates/sys-manager/account_list_expert.html',
            controller:'SysMExpertAccountCtrl'
        })
        .state('sysManager.account.sys', {
            url: '/sys',
            templateUrl: 'templates/sys-manager/account_list_sys.html',
            controller:'SysMSysAccountCtrl'
        })
        .state('sysManager.log', {
            url: '/log',
            templateUrl: 'templates/sys-manager/logs.html',
            controller:'SysMLogCtrl'
        })
        .state('sysManager.settings', {
            url: '/settings',
            templateUrl: 'templates/sys-manager/settings.html',
            controller:'SysMSettingCtrl'
        })
};