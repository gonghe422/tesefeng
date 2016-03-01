"use strict";

//商品列表
myTeSeFengController.controller('ProductCtrl', ['$rootScope', '$scope', '$timeout', '$ionicLoading', '$ionicBackdrop', '$stateParams', 'HttpRequest', '$ionicScrollDelegate', '$location', '$state', '$ionicHistory', '$window', function($rootScope, $scope, $timeout, $ionicLoading, $ionicBackdrop, $stateParams, HttpRequest, $ionicScrollDelegate, $location, $state, $ionicHistory, $window) {


  //地址查找
  Logger.info("来自路径:" + $location.absUrl());
  $scope.$window = $window;
  $scope.goBack = function() {
    //$state.go($location.absUrl());
    //  $ionicHistory.goBack();

    //切换到状态 : projectList
    //$state.go("projectList");


    //$ionicHistory.goBack();
    $window.history.back();
    //alert(111);

  }

  // http://qiaole.sinaapp.com?#name=cccccc

  $location.host();
  // qiaole.sinaapp.com

  $location.port();
  // 80

  $location.protocol();
  // http

  $location.url();
  // ?#name=cccccc

  // 获取url参数
  $location.search().name;
  // or
  $location.search()['name'];

  $scope.title = $stateParams.title;
  //是否加载更多
  $scope.hasMore = true;
  //加载更多是否锁定
  $scope.isLoadedLock = false;
  $scope.currentPageIndex = 1;
  $scope.pageSize = 10;
  console.log("$rootScope.$state", $rootScope.$state);
  console.log("$rootScope.$stateParams", $rootScope.$stateParams);

  $scope.productList = [];
  // 启动正在加载的弹出框
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });


  //请求数据
  $scope.requestData = function() {


    if ($scope.currentPageIndex >= 5) {

      // $ionicLoading.show({
      //   content: '加载完毕',
      //   animation: 'fade-in',
      //   showBackdrop: true,
      //   maxWidth: 200,
      //   showDelay: 0
      // });
      //  $ionicLoading.hide();
      $scope.hasMore = false;
      $scope.isLoadedLock = false;
      return;
    }
    // 请求商品
    var promise = HttpRequest.doGet(GLOBAL_HTTP_REQUEST_URL.GET_PRODUCT_LIST, {
      't': Math.random(),
      'id': $stateParams.id
    });
    // 同步调用，获得承诺接口
    promise.then(function(response) { // 调用承诺API获取数据 .resolve
      angular.forEach(response.responseObject.productList, function(row, index) {
        $scope.productList.push(row);

      });
      $scope.currentPageIndex++;
      $scope.isLoadedLock = false;
      $scope.$broadcast('scroll.infiniteScrollComplete');
      $ionicLoading.hide();
    }, function(response) { // 处理错误 .reject
      $scope.isLoadedLock = false;
      $scope.$broadcast('scroll.infiniteScrollComplete');
      $ionicLoading.hide();
    });



  }
  $scope.requestData();

  //加载更多
  $scope.doMore = function() {

    if ($scope.isLoadedLock) return;
    $scope.isLoadedLock = true;
    $scope.requestData();
  };

}]);


//商品详情
myTeSeFengController.controller('ProductDetailCtrl', ['$rootScope', '$scope', '$timeout', '$ionicLoading', '$ionicBackdrop', '$stateParams', 'HttpRequest', '$ionicScrollDelegate', '$location', '$state', '$ionicHistory', '$window', function($rootScope, $scope, $timeout, $ionicLoading, $ionicBackdrop, $stateParams, HttpRequest, $ionicScrollDelegate, $location, $state, $ionicHistory, $window) {

  // $scope.$window = $window;
  // $scope.goBack = function() {
  //   $window.history.back();
  // }


}]);
