let filters = angular.module('tpr.filters',[]);
filters
    .filter('projectStatus',()=> {
        return (statusId)=> ['','待提交','待评估','评估中','评估结束'][statusId]
    })
    .filter('expProjectStatus',()=> {
        return (statusId)=> ['','待审核','待审核','正在评估','评估结束'][statusId]
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
    .filter('area',()=>{
        return (aid) => {
            return ['其他','长三角','珠三角','京津冀','东部','西部','中部'][aid]
        }
    })
    .filter('role',()=>{
        return (roleId) => {
            return ['机构账号','专家账号','管理账号'][roleId]
        }
    })
    .filter('gender',()=>{
        return (genderId) => {
            if (_.isNull(genderId) || _.isUndefined(genderId)) {
                return '--'
            } else {
                return ['女','男'][genderId];
            }

        }
    })
    .filter('age',()=>{
        return (birthday) => {
            if (_.isNull(birthday) || _.isUndefined(birthday)) {
                return '--'
            }
            if (_.isNumber(birthday)) {
                return new Date().getFullYear()-new Date(birthday).getFullYear();
            } else {
                return new Date().getFullYear()-birthday.getFullYear();
            }

        }
    })
    .filter('evaluationStatus',()=>{
        return (statusId) => {
            if (_.isNull(statusId) || _.isUndefined(statusId)) {
                return '待评估'
            }
            if (_.isNumber(statusId)) {
                if(statusId == 1) {
                    return '已评估'
                } else {
                    return '待评估'
                }
            }
        }
    })

;


export default filters;