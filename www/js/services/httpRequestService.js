/**
  网络请求基类
  shipf  2016-01-20
*/
//angular.module('httpRequest.service', [])
  MYAPP.factory('HttpRequest', ['$http', '$q', function($http, $q) {
    return {
      doGet: function(url, parames) {

        parames = parames || {};
        // if(angular.isUndefined(url))
        // {
        //   Logger.info("url路径参数为空:");
        //
        //
        // }
        if (_.isEmpty(url)) {
          Logger.info("url路径参数为空");

        } else {
          Logger.info("请求路径为：" + url);

        }
        var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
        $http({
          method: 'GET',
          url: url,
          params: parames
        }).
        success(function(data, status, headers, config) {
          if (_.isEqual(data.resultCode, g_const_Success_Code)) {
            Logger.info("请求数据成功:" + JSON.stringify(data));
            deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了
          } else {
            Logger.info("请求数据失败，失败原因为:" + data.resultMessage);
          }
        }).
        error(function(data, status, headers, config) {
          Logger.error("响应数据失败:" + JSON.stringify(data));
          deferred.reject(data); // 声明执行失败，即服务器返回错误
        });
        return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
      }, // end query
      doPost: function(url, parames) {

        parames = parames || {};
        var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
        $http({
          method: 'POST',
          url: url,
          params: parames
        }).
        success(function(data, status, headers, config) {
          Logger.info("响应数据成功:" + JSON.stringify(data));

          deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了
        }).
        error(function(data, status, headers, config) {
          Logger.error("响应数据失败:" + JSON.stringify(data));
          deferred.reject(data); // 声明执行失败，即服务器返回错误
        });
        return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API

      }
    };
  }]);
