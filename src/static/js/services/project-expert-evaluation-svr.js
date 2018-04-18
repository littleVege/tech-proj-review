export default (Api) => {
    return {
        /**
         * 依照查询条件查询一条projectExpertEvaluation记录
         * @param params {object} 查询条件
         * @return {promise}
         */
        getOneByQuery:function(params) {
            params = params || {};
            params['page'] = 1;
            params['rows'] = 1;
            return Api.get('/projectExpertEvaluation/select',params)
                .then((data)=> data[1]?data[1][0] || {} : {})
                .then(data=>{
                    if (data && data.evaluationSuggestion){
                        data.evaluationSuggestion = decodeURIComponent(data.evaluationSuggestion);
                    }
                    return data;
                })
        },
        /**
         * 查询projectExpertEvaluation列表
         * @param params {object} 查询条件
         * @param page {number} 页数
         * @param rows {number} 每页条目数
         * @return {promise}
         */
        getListByQuery:function(params,page,rows) {
            params = params || {};
            params['page'] = page || 1;
            params['rows'] = rows || 10;
            return Api.get('/projectExpertEvaluation/select',params)
                .then(data=>{
                    if (data[1]){
                        _.each(data[1],i=>{
                            i.evaluationSuggestion = decodeURIComponent(i.evaluationSuggestion);
                        })
                    }
                    return data;
                })
        },
        /**
         * 获取一条projectExpertEvaluation记录
         * @param id {number} 用于判断唯一值的ID
         * @return promise
         */
        getOne:function(id) {
            return Api.get(`/projectExpertEvaluation/select/${id}`)
                .then((data)=> data[1])
                .then(data=>{
                    if (data && data.evaluationSuggestion){
                        data.evaluationSuggestion = decodeURIComponent(data.evaluationSuggestion);
                    }
                    return data;
                })
        },
        /**
         * 更新一条projectExpertEvaluation记录
         * @param id {number} 用于判断唯一值的ID
         * @param updateInfo {object} 提交信息
         * @return promise
         */
        updateOne:function(id,updateInfo) {
            return Api.post(`/projectExpertEvaluation/update/${id}`,updateInfo)
                .then((data)=> data[1])
        },
        /**
         * 删除一条projectExpertEvaluation记录
         * @param id {number} 用于判断唯一值的ID
         * @return promise
         */
        deleteOne:function(id) {
            return Api.get(`/projectExpertEvaluation/delete/${id}`)
                .then((data)=> data[1])
        },
        /**
         * 创建一条projectExpertEvaluation记录
         * @param updateInfo {object} 提交信息
         * @return promise
         */
        createOne:function(updateInfo) {
            return Api.post(`/projectExpertEvaluation/insert`,updateInfo)
                .then((data)=> data[1])
        },
        /**
         * 更新或创建一条projectExpertEvaluation记录
         * @param pkey {string} 用于判断唯一值的键名
         * @param updateInfo {object} 提交信息
         * @return promise
         */
        upsetOne:function(pkey,updateInfo) {
            if (updateInfo[pkey]) {
                return this.updateOne(updateInfo[pkey],updateInfo);
            } else {
                return this.createOne(updateInfo)
                    .then(data=> {
                        updateInfo[pkey] = data[pkey];
                        return data;
                    });
            }
        },
        setEvaluation:function (main,detailContent,expertId) {
            return Api.post('/projectExpertEvaluation/upsert',{
                expertId:expertId,
                data:JSON.stringify({
                    evaluation: main,
                    details: detailContent
                })
            })
        }

    }

}