import 'angular'
import 'angular-sanitize/angular-sanitize.min'
import 'angular-ui-router/release/angular-ui-router.min'
import 'angular-bootstrap'
import 'lodash/dist/lodash.min'
import 'ng-file-upload/ng-file-upload-all.min'
import controllers from './controllers'
import directives from './directives'
import services from './services'
import routesModule from './routes'
import config from './config'
import filters from './filters'

let app = angular.module('tpr', [
    'ui.router','ui.bootstrap','ngFileUpload','ngSanitize',
        controllers.name,
        directives.name,
        services.name,
        routesModule.name,
        filters.name
    ])
    .run(function ($rootScope,Category,Project,dialogs,$state) {
        if (localStorage.__tpr_user) {
            $rootScope.User = JSON.parse(localStorage.__tpr_user);
        } else {
            alert('请先登录！');
            window.location.href='login.html';
        }

        $rootScope.logout = function () {
            localStorage.__tpr_user = undefined;
            window.location.href='login.html'
        };
        Category.getListByQuery({},1,1000)
            .then(function (data) {
                $rootScope.Categories = data[1];
                console.log(data[1]);
            });

        $rootScope.ProjectStatus = [
            {id:1,name:'待提交'},
            {id:2,name:'待评估'},
            {id:3,name:'评估中'},
            {id:4,name:'评估结束'}
        ];

        $rootScope.orgNature = [
            {id:1,name:'国家部门'},
            {id:2,name:'地方科技厅（委、局）'},
            {id:3,name:'高校院所'},
            {id:4,name:'企业'},
            {id:5,name:'其他'}
        ]

        $rootScope.areas = [
            {id:1,name:'长三角'},
            {id:2,name:'珠三角'},
            {id:3,name:'京津冀'},
            {id:4,name:'东部'},
            {id:5,name:'西部'},
            {id:6,name:'中部'},
            {id:0,name:'其他'},
        ];

        $rootScope.goBack = function () {
            history.back();
        }

        $rootScope.projectSendBack = function(project) {
            dialogs.confirm('是否要退回项目',`请确认将退回项目${project.name}`,'确定','取消',true)
                .then(function (confirm) {
                    if (confirm) {
                        Project.updateOne(project.id,{projectStatus:1})
                            .then(function () {
                                dialogs.success('项目已退回');
                                $state.reload();
                            })
                    }
                })
        }

        switch ($rootScope.User.roleId) {
            case 1:
                $state.go('projects.unchecked');
                break;
            case 2:
                $state.go('expTaskList');
                break;
            case 3:
                $state.go('sysProjs');
                break;
        }
    })
    .filter('projectStatus',()=> {
        return (statusId)=> ['','待提交','待评估','评估中','评估结束'][statusId]
    })
    .filter('orgType',()=> {
        return (statusId)=> ['','国家部门','地方科技厅（委、局）','高校院所','企业','其他'][statusId]
    })
    .filter('category',($rootScope)=> {
        return (cid)=> {
            let found = _.find($rootScope.Categories,i=>i.id ==cid);
            if (found) {return found.categoryName} else {
                return '--'
            }
        }
    })
    .config(function (uibPaginationConfig) {
        uibPaginationConfig.maxSize = 5;
        uibPaginationConfig.previousText = '上一页';
        uibPaginationConfig.nextText = '下一页';
    })
    .constant('Config',config)
    .factory('skipReload', [
        '$state',
        '$rootScope',
        function ($state, $rootScope) {
            return function () {
                var lastRoute = $state.current;
                var un = $rootScope.$on('$stateChangeSuccess', function () {
                    $state.current = lastRoute;
                    un();
                });
            };
        }
    ]);
