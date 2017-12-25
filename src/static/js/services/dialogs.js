/**
 * Created by caidi on 2017/4/7.
 */
export default ($uibModal,$q) => {
    return {
        alert:function (title, msg, type) {
            let defer = $q.defer();
            swal({
                title: title,
                text: msg,
                showConfirmButton: true,
                type: type || "info",
            },function (isConfirm) {
                return defer.resolve(isConfirm);
            });
            return defer.promise;
        },
        confirm:function (title, msg, btnOkText, btnCancelText,autoComfirm) {
            let defer = $q.defer();
            swal({
                    title:title,
                    text: msg,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: btnOkText,
                    cancelButtonText: btnCancelText,
                    closeOnConfirm: _.isUndefined(autoComfirm)?false:autoComfirm,
                    closeOnCancel: true
                },
                function(isConfirm){
                    if (isConfirm) {
                        defer.resolve(isConfirm);
                    }
                });
            return defer.promise;
        },
        success:function (msg,timer,type) {
            swal({
                title: msg,
                // text: msg,
                timer: timer || 2000,
                showConfirmButton: false,
                type:type || "success",
            })
        },
        info:function (msg,timer,type) {
            swal({
                title: msg,
                // text: msg,
                timer: timer || 2000,
                showConfirmButton: false,
                type: type || "success",
            })
        }
    }
}