import * as orgProjectCtrls from './org_project'

export default angular.module('tpr.controllers.org',[])
    .controller('OrgProjectListCtrl',orgProjectCtrls.orgProjectsCtrl)
    .controller('OrgProjectDetailCtrl',orgProjectCtrls.orgProjectDetailCtrl)