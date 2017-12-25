/**
 * Created by caidi on 2017/8/9.
 */

export default ($filter,$timeout,$localStorage) => {
    return {
        restrict: 'E',
        templateUrl: 'templates/components/editable-table.html',
        replace: true,
        scope: {
            options:'='
        },
        link: ($scope, el) => {
            $scope.heads = $scope.options.heads;
            $scope.rows = [];
            $scope._org = $localStorage.user.organization;

            $scope.formatVal = function (val, head) {
                if (!val) {
                    return null;
                }
                switch (head.type) {
                    case 'int':
                        return $filter('number')(Number(val), 0);
                    case 'float':
                        return $filter('number')(Number(val), 2);
                    case 'date':
                        return $filter('date')(val, 'yyyy年MM月dd日');
                    case 'datetime':
                        return $filter('date')(val, 'yyyy-mm-dd HH:mm');
                    case 'country':
                        if (head.country.useName) {
                            return val;
                        } else {
                            return $filter('country')(val);
                        }

                    case 'text':
                    default:
                        return val;
                }
            };

            $scope.toggleEditRow = function (row) {
                if (row._editing) {
                    if(row.id<0) {
                        $scope.submitAdd(row);
                    } else {
                        $scope.submitEdit(row);
                    }
                } else {
                    row._editing = true;
                    $scope.currentEditRow = _.clone(row);
                }
            };

            $scope.submitEdit=function (row) {
                if (!$scope.options.onUpdatePromise) return;
                swal({
                        title: "确认提交?",
                        text: "请确认是否保存此条目！",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        closeOnConfirm: false,
                        closeOnCancel: true
                    },
                    function(isConfirm){
                        if (isConfirm) {
                            swal({
                                text: "数据提交中，请稍候！",
                                type: "info",
                                showConfirmButton: false
                            });
                            $scope.options.onUpdatePromise($scope.currentEditRow)
                                .then(function () {
                                    _.merge(row,$scope.currentEditRow);
                                    row._editing = false;
                                    $scope.currentEditRow = undefined;
                                    swal({
                                        title: "修改成功！",
                                        type: "success",
                                        timer: 1000,
                                        showConfirmButton: false
                                    });
                                })
                                .catch(function (e) {
                                    swal({
                                        title: "修改失败！",
                                        text: "错误提示："+e.message,
                                        type: "error",
                                        timer: 1500,
                                        showConfirmButton: false
                                    });
                                })
                        }
                    });
            };

            $scope.submitAdd = function (row) {
                if (!$scope.options.onCreatePromise) return;
                swal({
                        title: "确认提交?",
                        text: "请确认是否保存此条目！",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        closeOnConfirm: false,
                        closeOnCancel: true
                    },
                    function(isConfirm) {
                        if (isConfirm) {
                            swal({
                                text: "数据提交中，请稍候！",
                                type: "info",
                                showConfirmButton: false
                            });
                            delete $scope.currentEditRow.id;
                            $scope.options.onCreatePromise($scope.currentEditRow)
                                .then(function (data) {
                                    _.merge(row,data);
                                    row.orgName = $scope._org.orgName;
                                    row._editing = false;
                                    $scope.currentEditRow = undefined;
                                    swal({
                                        title: "创建成功！",
                                        type: "success",
                                        timer: 1000,
                                        showConfirmButton: false
                                    });
                                })
                                .catch(function (e) {
                                    swal({
                                        title: "创建失败！",
                                        text: "错误提示："+e.message,
                                        type: "error",
                                        timer: 1500,
                                        showConfirmButton: false
                                    });
                                });
                        }
                    });
            };

            $scope.deleteRow = function (row) {
                if (!$scope.options.onDeletePromise) return;
                swal({
                        title: "确认提交?",
                        text: "请确认是否保存此条目！",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "好的",
                        cancelButtonText: "取消",
                        closeOnConfirm: false,
                        closeOnCancel: true
                    },
                    function(isConfirm){
                        if (isConfirm) {
                            swal({
                                text: "删除中，请稍候！",
                                type: "info",
                                showConfirmButton: false
                            });
                            $scope.options.onDeletePromise(row)
                                .then(function () {
                                    _.remove($scope.rows,function (i) {
                                        return i.id == row.id
                                    });
                                    swal({
                                        title: "条目已删除！",
                                        type: "success",
                                        timer: 1000,
                                        showConfirmButton: false
                                    });
                                })
                                .catch(function (e) {
                                    swal({
                                        title: "删除失败！",
                                        text: "错误提示："+e.message,
                                        type: "error",
                                        timer: 1500,
                                        showConfirmButton: false
                                    });
                                })
                        }
                    });
            };

            $scope.correctInputType = function (head, type) {
                return !head.isReadonly && head.type === type
            };

            $scope.addRow = function () {
                let addedRow = {_editing:true,id:-1,orgId:$scope._org.orgId,updateTime:new Date().getTime(),createTime:new Date().getTime(),orgName:$scope._org.orgName};
                $scope.editRow = addedRow;
                $scope.currentEditRow = _.clone(addedRow);
                $scope.rows.unshift(addedRow);
            };

            $scope.cancelEditRow = function (row) {
                swal({
                        title: "确认提交?",
                        text: "请确认是否保存此条目！",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "放弃更改",
                        cancelButtonText: "取消",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            $timeout(function () {
                                row._editing = false;
                                $scope.currentEditRow = undefined;
                                if (row.id < 0) {
                                    _.remove($scope.rows,function (i) {
                                        return i.id < 0;
                                    });
                                }
                            },0);

                        }
                    });

            };

            $scope.options.getListPromise()
                .then(function (rows) {
                    if (rows && rows[1]) {
                        $scope.rows = rows[1];
                    }

                })
        }
    }
}