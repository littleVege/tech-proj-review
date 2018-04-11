/**
 * Created by caidi on 2017/8/8.
 */
export default () => {
    return {
        paginize:function (scope, promiseFunc,initPage=1) {
            scope.pageInfo = {
                currentPage:initPage,
                numPage:initPage+1,
                isLoading:false,
                totalItems:10
            };
            scope.pageChanged = function () {
                promiseFunc(scope.pageInfo.currentPage)
                    .then(function (data) {
                        let list,count;
                        if (!data) {
                            list = [];
                            count = 0;
                        } else {
                            list = data[1];
                            count = data[0];
                        }
                        scope.pageInfo.totalItems = count;
                        scope.pageInfo.numPage = Math.ceil(scope.pageInfo.totalItems / 10);
                        scope.list = list;
                    })
                    .finally(()=>{
                        scope.pageInfo.isLoadding = false;
                    })
            }

            scope.resetPage = function () {
                scope.pageInfo.currentPage = 1;
                scope.pageChanged();
            }
        },
        searchnize:function (scope, promiseFunc) {
            scope.search = () => {

            }
        }
    }
}