import expertCtrls from './experts_ctrls'
import orgCtrls from './org_ctrls'
import sysCtrls from './system_ctrls'
import * as relationProjectCtrls  from './relation_project_ctrls'

let controllers = angular.module('tpr.controllers',[
    expertCtrls.name,
    orgCtrls.name,
    sysCtrls.name
])
.controller('RelationProjectListCtrl',relationProjectCtrls.relationProjectListCtrl)
.controller('RelationProjectDetailCtrl',relationProjectCtrls.relationProjectDetailCtrl)
;

export default controllers;