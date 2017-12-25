import api from './api_factory'
import category from './category-svr'
import evaluationTemplateCategory from './evaluation-template-category-svr'
import file from './file-svr'
import importBatch from './import-batch-svr'
import mailTemplate from './mail-template-svr'
import organization from './organization-svr'
import project from './project-svr'
import projectExpertEvaluation from './project-expert-evaluation-svr'
import projectExpertEvaluationDetail from './project-expert-evaluation-detail-svr'
import projectFile from './project-file-svr'
import projectGroup from './project-group-svr'
import projectGroupExpert from './project-group-expert-svr'
import projectKeyword from './project-keyword-svr'
import projectRelation from './project-relation-svr'
import projectRelationList from './project-relation-list-svr'
import task from './task-svr'
import tdProjectKeyword from './td-project-keyword-svr'
import user from './user-svr'
import webProjsAll from './web-projs-all-svr'
import expert from './expert-svr'

import utils from './util_svr'
import dialogs from './dialogs'


let services = angular.module('tpr.services',[]);
services
   .service('Category', category)
   .service('EvaluationTemplateCategory', evaluationTemplateCategory)
   .service('File', file)
   .service('ImportBatch', importBatch)
   .service('MailTemplate', mailTemplate)
   .service('Organization', organization)
   .service('Project', project)
   .service('ProjectExpertEvaluation', projectExpertEvaluation)
   .service('ProjectExpertEvaluationDetail', projectExpertEvaluationDetail)
   .service('ProjectFile', projectFile)
   .service('ProjectGroup', projectGroup)
   .service('ProjectGroupExpert', projectGroupExpert)
   .service('ProjectKeyword', projectKeyword)
   .service('ProjectRelation', projectRelation)
   .service('ProjectRelationList', projectRelationList)
   .service('Task', task)
   .service('TdProjectKeyword', tdProjectKeyword)
   .service('User', user)
   .service('WebProjsAll', webProjsAll)
   .service('Utils', utils)
   .service('Api', api)
   .service('dialogs', dialogs)
   .service('Expert', expert)
;

export default services;