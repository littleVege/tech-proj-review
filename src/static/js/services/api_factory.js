/**
 * Created by caidi on 2017/1/9.
 */

import errors from '../excption'

let apiSvr = function ($q, $http, $rootScope, Config) {

    let checkAndProvideAuth = function (conf, deferred) {
        conf.params = conf.params || {};
        if (!conf.noNeedAuth) {
            // let user = $localStorage.user;
            // if (!user || !user.userId || !user.token) {
            //   deferred.reject(new errors['-401']);
            //   return;
            // }

            // if (!conf.headers.common) {conf.headers.common = {}}
            conf.params['X-RHINO-AUTH-TOKEN'] = $rootScope.User.token;
        }
        conf.params['t'] = new Date().getTime();
    };

    let handleError = (deferred) => {
        return function (resp) {
            let error;
            switch (resp.status) {
                case 504:
                case 408:
                    error = new errors['504'];
                    break;
                case 500:
                    error = new errors['500'];
                    break;
                case 404:
                    error = new errors['404'];
                    break;
                default:
                    error = errors.def(resp.statusText, resp.status, 'HTTP-ERROR');
            }
            deferred.reject(error);
        }
    };

    let handleSuccess = function (deferred) {
        return function (resp) {
            resp = resp.data;
            if (resp.code && resp.info) {

            }
            if (resp.code != 200) {
                let err = new Error(resp.errorMessage || resp.info);
                if (resp.code == 401) {
                    return $rootScope.$emit('token-unauthorized');
                } else {
                    return deferred.reject(err);
                }

            }
            deferred.resolve([resp.count, resp.data]);

        }
    };

    let translateData = function (data) {
        _.each(data, function (i, key) {
            if (_.isDate(i)) {
                data[key] = i.getTime();
            }
        })
    };

    return {
        /**
         * 发送Post请求,请求都以Form形式发送
         * @param {String} url url相对路径
         * @param {Object} form 发送内容
         * @param {Object} httpConfig 其他配置
         */
        post: function (url, form, httpConfig) {
            httpConfig = httpConfig || {};
            let deferred = $q.defer();
            let prefix = httpConfig.baseURL || Config.apiBaseURL;
            let conf = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data:form,
                url:prefix + url,
                method:'POST',
                transformRequest: function (obj) {
                    let str = [];
                    for (let p in obj) {
                        if (!_.isUndefined(obj[p]) && !_.isNull(obj[p])) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                    }
                    return str.join("&");
                }
            };
            conf = _.merge(conf, httpConfig);
            checkAndProvideAuth(conf, deferred);
            translateData(form);
            $http.post(prefix + url, form, conf).then(handleSuccess(deferred), handleError(deferred))
            return deferred.promise;
        },

        file: function (url, data, httpConfig) {
            httpConfig = httpConfig || {};
            let deferred = $q.defer();
            let prefix = httpConfig.baseURL || Config.apiBaseURL;
            let conf = _.merge({'Content-Type': undefined}, httpConfig);
            checkAndProvideAuth(conf, deferred);
            translateData(form);
            $http(conf).then(handleSuccess(deferred), handleError(deferred));
            return deferred.promise;
        },
        /**
         * GET,请求都以params形式发送
         * @param {String} url url相对路径
         * @param {Object} params 发送内容
         * @param {Object} httpConfig 其他配置
         */
        get: function (url, params, httpConfig) {
            httpConfig = httpConfig || {};
            let deferred = $q.defer();
            let prefix = httpConfig.baseURL || Config.apiBaseURL;
            let conf = _.merge({
                params: params,
                responseType:'text',
                url:prefix + url,
                method:'GET'
                }, httpConfig);
            checkAndProvideAuth(conf, deferred);
            translateData(params);
            $http(conf)
                .then(handleSuccess(deferred), handleError(deferred));
            return deferred.promise;
        },
        jsonp: function (url, params, httpConfig) {
            httpConfig = httpConfig || {};
            var deferred = $q.defer();
            let prefix = httpConfig.baseURL || Config.apiBaseURL;
            $http.jsonp(prefix + url, {
                params: params
            })
                .then(function (resp) {
                    deferred.resolve(resp);
                }, function (resp) {
                    deferred.reject(msg);
                });
            return deferred.promise;
        }
    }
};

export default apiSvr;
