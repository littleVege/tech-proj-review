import * as expGroups from './groups'
import * as expTasks from './tasks'
import * as expProjects from './projects'
import * as expReview from './exp_review'
export default angular.module('tpr.controllers.expert',[])
    .controller('ExpGroupsCtrl',expGroups.groupListCtrl)
    .controller('ExpTaskListCtrl',expTasks.taskListCtrl)
    .controller('ExpTaskDetailCtrl',expTasks.taskDetailCtrl)
    .controller('ExpTaskProjectsCtrl',expTasks.taskProjectsCtrl)
    .controller('ExpTaskGroupsCtrl',expTasks.taskGroupsCtrl)
    .controller('ExpProjectListCtrl',expProjects.expProjectsCtrl)
    .controller('ExpReviewListCtrl',expReview.reviewListCtrl)
    .controller('ExpReviewEditCtrl',expReview.reviewEditCtrl)
