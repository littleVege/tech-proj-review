import orgProjectRts from './project_routes'
import sysGroupRts from './gourp_routes'
import mailTmplRoutes from './mail_tmpl_routes'
import sysProjectViewRoutes from './sys_project_view_routes'
import taskRoutes from './task_routes'
import reviewRoutes from './review_routes'
import expertRoutes from './expert_routes'
import OrgRoutes from './org_routes'
import reviewTmplRts from './review_tmpl_routes'
import expTaskRoutes from './exp_task_routes'
import sysSettingRts from './sys_setting_routes'
import relationProjectRts from './relation_project_routes'


export default angular.module('tpr.routes',[])
    .config(orgProjectRts)
    .config(sysGroupRts)
    .config(mailTmplRoutes)
    .config(sysProjectViewRoutes)
    .config(taskRoutes)
    .config(expertRoutes)
    .config(reviewRoutes)
    .config(OrgRoutes)
    .config(reviewTmplRts)
    .config(expTaskRoutes)
    .config(sysSettingRts)
    .config(relationProjectRts)