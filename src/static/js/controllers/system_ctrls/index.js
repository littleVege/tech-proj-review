import * as groupCtrls from './sys_groups'
import * as orgCtrls from './sys_orgs'
import * as projectCtrls from './sys_projects'
import * as taskCtrls from './sys_tasks'
import * as mailTmplCtrls from './mail_tmpls'
import * as reviewTmplCtrls from './review_tmpls'
import * as settingCtrls from './sys_settings'
import * as expertCtrls from './sys_experts'
export default angular.module('tpr.controllers.sys',[])
    .controller('SysGroupListCtrl',groupCtrls.groupListCtrl)
    .controller('SysGroupDetailCtrl',groupCtrls.groupDetailCtrl)
    .controller('SysGroupEditCtrl',groupCtrls.groupEditCtrl)
    .controller('GroupExpertsCtrl',groupCtrls.groupDetailExpertsCtrl)
    .controller('GroupProjectsCtrl',groupCtrls.groupDetailProjectsCtrl)
    .controller('OrgListCtrl',orgCtrls.orgListCtrl)
    .controller('SysProjectsCtrl',projectCtrls.sysProjectsCtrl)
    .controller('SysProjectCollectCtrl',projectCtrls.sysProjectCollectCtrl)
    .controller('SysTaskListCtrl',taskCtrls.taskListCtrl)
    .controller('SysTaskDetailCtrl',taskCtrls.taskDetailCtrl)
    .controller('MailTmplListCtrl',mailTmplCtrls.mailTmplListCtrl)
    .controller('ReviewTmplListCtrl',reviewTmplCtrls.reviewTmplListCtrl)
    .controller('ReviewTmplEditCtrl',reviewTmplCtrls.reviewTmplEditCtrl)
    .controller('AccountCtrl',settingCtrls.accountCtrl)
    .controller('SysMOrgAccountCtrl',settingCtrls.orgAccountCtrl)
    .controller('SysMExpertAccountCtrl',settingCtrls.expertAccountCtrl)
    .controller('SysMSysAccountCtrl',settingCtrls.sysAccountCtrl)
    .controller('SysMLogCtrl',settingCtrls.logsCtrl)
    .controller('SysMSettingCtrl',settingCtrls.settingCtrl)
    .controller('SysExpertListCtrl',expertCtrls.expertListCtrl)
;
