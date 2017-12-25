/**
 * Created by caidi on 2017/4/10.
 */
export default ($timeout) => {
    return {
        restrict: 'A',
        scope:{
            errorCheck:'@',
            errorMsg:'@?',
        },
        require:"ngModel",
        link: ($scope,$el,$attr,ngModelCtr) => {
           // let $errorContainer = $('<div class="form-group"></div>');
            let $errorSpan = $('<span class="help-block"></span>');
            let $ele = $($el[0]);
            let $errorContainer =  $ele.parent();
            $errorContainer.append($errorSpan);

            //$ele.parent().append($errorContainer);
           // $errorContainer.append($ele).append($errorSpan);
            // $errorSpan.text($scope.errorMsg);
            $ele.on('blur',function () {
                let val = $ele.val();
                let reg;
                let maxVal = 1*10000*10000;
                let minVal = 0;
                if (/^(int|float|number)(\:\d+)?$/.test($scope.errorCheck)) {
                    let check = $scope.errorCheck.match(/^(int|float|number)(\:\d+)?$/);
                    $scope.errorCheck = check[1];
                    if (!check[3] && check[2]) {
                        maxVal = parseFloat(check[2].replace(':',''));
                    }
                    if (check[3]) {
                        maxVal = parseFloat(check[3].replace('-',''));
                        minVal = parseFloat(check[2].replace(':',''));
                    }
                }

                switch ($attr.errorCheck) {
                    case 'int':
                        reg = function (val) {
                            if (!/^-?[0-9]*$/.test(val)) {
                                $scope.errorMsg = '请输入整数！';
                                return false;
                            }
                            if (parseInt(val)< minVal || parseInt(val)>maxVal) {
                                $scope.errorMsg = `输入值不得大于${maxVal}!`
                                return false;
                            }
                            return true;
                        };

                        break;
                    case 'number':
                    case 'float':
                        reg = function (val) {
                            return /^((?:\d*\.)?\d+)$/.test(val) && parseFloat(val)>= minVal && parseFloat(val)<=maxVal;
                        };
                        $scope.errorMsg = '请输入数字！';
                        break;
                    case 'text':
                        reg = function (val) {
                            return true
                        };
                        break;
                    case 'chinese':
                        reg = function (val) {
                            return /^[u4E00-u9FA5]+$/.test(val) == false;
                        };
                        $scope.errorMsg = '请输入中文！';
                        break;
                    case 'english':
                        reg = function (val) {
                            return  /^[A-Za-z\s\.\,]+$/.test(val);
                        };
                        $scope.errorMsg = '请输入英文！';
                        break;
                    case 'tel':
                        reg = function (val) {
                            return  /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(val);
                        };
                        $scope.errorMsg = '请输入座机号码！';
                        break;
                    case 'phone':
                        reg = function (val) {
                            return  /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(val) || /^(?:13\d|15\d|18\d|17\d)\d{5}(\d{3}|\*{3})$/.test(val);
                        };
                        $scope.errorMsg = '请输入电话号码！';
                        break;
                    case 'cellPhone':
                        // reg = /^\b\d{3}[-.]?\d{3}[-.]?\d{4}\b$/;
                        reg = function (val) {
                            return  /^(?:13\d|15\d|18\d|17\d)\d{5}(\d{3}|\*{3})$/.test(val);
                        };
                        $scope.errorMsg = '请输入电话号码！';
                        break;
                    case 'email':
                        reg = function (val) {
                            return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/gm.test(val);
                        }
                        $scope.errorMsg = '请输入Email！';
                        break;
                    case 'postcode':
                        reg = function (val) {
                            return /^[0-9]{6}$/.test(val);
                        }
                        $scope.errorMsg = '请输入正确的邮编！';
                        break;
                    case 'idnumber':
                        reg = function (val) {
                            let e = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
                            return e.test(val);
                        }
                        $scope.errorMsg = '请输入正确的身份证号！';
                }
                if (!reg(val)) {
                    $errorContainer.addClass('has-error');
                    ngModelCtr.$setViewValue('');
                    $errorSpan.html($scope.errorMsg).show()
                } else {
                    $errorContainer.removeClass('has-error');
                    $errorSpan.html('').hide();
                }
                setTimeout(()=>{
                    if($ele[0].hasAttribute("disabled")){
                        ngModelCtr.$setViewValue('');
                        $ele[0].value = "";
                        $errorContainer.removeClass('has-error');
                        $errorSpan.html('').hide();
                    }
                },100);
            });
        }
    }
}