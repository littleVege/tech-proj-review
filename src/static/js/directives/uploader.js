/**
 * Created by caidi on 2017/8/23.
 */
export default ($q,$timeout,Upload,Config,$rootScope) => {
    return {
        restrict: 'E',
        templateUrl:'templates/components/uploader.html',
        scope:{
            fileLocation:'=ngModel',
            multiple:'=?',
            title:'@',
            afterUploaded:'&?',
            afterDeleted:'&?',
            disableUpload:'=?',
            accept:'@?'
        },
        link: ($scope,$ele,attr) => {
            function uploadFile(file) {
                return Upload.upload({
                    url: Config.apiBaseURL+'/file/upload',
                    data: {
                        file: file,
                        'X-RHINO-AUTH-TOKEN':$rootScope.User.token
                    },
                    method: 'POST'
                }).then(function (resp) {
                    return resp.data;
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    file.progress = progressPercentage;
                });
            }

            $scope.uploadFiles = function (files) {
                let promise;
                if (files && files.length) {
                    files[0].progress = 0;
                    if ($scope.multiple) {
                        if (!$scope.fileLocation || !_.isArray($scope.fileLocation)) {
                            $scope.fileLocation = [];
                        }
                        $scope.fileLocation.push(files[0]);
                    } else {
                        $scope.fileLocation = files[0];
                    }

                    promise = uploadFile(files[0]);
                    promise.then(function (data) {
                        // files[0].fileWebLoation = data.data.fileUrl;
                        files[0].id = data.data[0];
                        $scope.afterUploaded && $scope.afterUploaded();
                    })
                }

            };

            $scope.removeUploadedFile = function (file) {
                if ($scope.multiple) {
                    _.each($scope.fileLocation,function (i) {
                        if (i === file) {
                            file.deleted = true;
                        }
                    })
                } else {
                    $scope.fileLocation.deleted = true;
                }
                $scope.afterDeleted && $scope.afterDeleted();
            }

        }
    }
};