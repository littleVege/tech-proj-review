/**
 * Created by caidi on 2017/1/23.
 */
let ErrorMaker = function (name,code,defaultMessage) {
  return (function (name,code,defaultMessage) {
    let Err = function (message) {
      this.name = name;
      this.code = code;
      this.message = defaultMessage||message;
      this.stack = (new Error()).stack;
    };
    Err.prototype = Object.create(Error.prototype);
    Err.prototype.constructor = Err;
    return Err;
  })(name,code,defaultMessage);
};
let UnAuthError = ErrorMaker('UnAuthError',4011,'您的登录信息已过期，请重新登录！');
let NoTokenError = ErrorMaker('NoTokenError',-401,'手机号或密码错误');
let PasswordInvalidError = ErrorMaker('PasswordInvalidError',401,'请先登录');
let TimeoutError = ErrorMaker('TimeoutError',504,'请求超时，请稍后再试');
let ServerError = ErrorMaker('ServerError',500,'服务器开小差了！');
let NotFoundError = ErrorMaker('NotFoundError',404,'接口不存在，请检查');
let ErrorMap = {
  '4011':UnAuthError,
  '-401':NoTokenError,
  '401':PasswordInvalidError,
  '504':TimeoutError,
  '500':ServerError,
  '404':NotFoundError,
  '1011':ErrorMaker('NotInstallQQError',1011,'未检测到手机QQ客户端'),
  '1012':ErrorMaker('NotInstallWeChatError',1012,'未检测到微信客户端'),
  '1013':ErrorMaker('NotInstallWeiboError',1013,'未检测到微博客户端'),
  '1021':ErrorMaker('OAuthLoginError',1021,'第三方登录失败'),
  'def':ErrorMaker
};
export default ErrorMap
