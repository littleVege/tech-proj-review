import 'angular'
import 'angular-ui-router/release/angular-ui-router.min'
import 'angular-bootstrap'
import 'lodash/dist/lodash.min'
import 'ng-file-upload/ng-file-upload-all.min'
import controllers from './controllers'
import directives from './directives'
import services from './services'
import routesModule from './routes'
import config from './config'

let app = angular.module('tpr', [
    'ui.router','ui.bootstrap','ngFileUpload',
        controllers.name,
        directives.name,
        services.name,
        routesModule.name
    ])
    .run(function ($rootScope,Category) {
        // $rootScope.User = {
        //     userName:'admin',
        //     type:0
        // };
        // $rootScope.User = {
        //     userName:'expert1',
        //     type:1,
        //     expertId:2,
        //     expertName:'eee',
        //     token:'45D44B9087274EB08F1F1CE295630A15'
        // };
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
    })
    .filter('projectStatus',()=> {
        return (statusId)=> ['待提交','待评估','评估中','评估结束'][statusId]
    })
    .filter('category',($rootScope)=> {
        return (cid)=> {
            let found = _.find($rootScope.Categories,i=>i.id ==cid);
            if (found) {return found.categoryName} else {
                return '--'
            }
        }
    })
    .constant('Config',config);
