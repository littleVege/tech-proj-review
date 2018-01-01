let filters = angular.module('tpr.filters',[]);
filters
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


;


export default filters;