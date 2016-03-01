//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－图片轮播控制器
myTeSeFengController.controller('SlideCtrl', ['$scope', '$ionicSlideBoxDelegate', '$http', function($scope, $ionicSlideBoxDelegate, $http) {



  $scope.myActiveSlide = 0;
  // //此事件对应的是pager-click属性，当显示图片是有对应数量的小圆点，这是小圆点的点击事件
  $scope.pageClick = function(index) {

    $scope.myActiveSlide = index;
  };

  // //当图片切换后，触发此事件，注意参数
  $scope.slideHasChanged = function($index) {};

  // var promise = HttpRequest.doGet('/data/slider.json', {
  //   't': Math.random()
  // });
  //  // 同步调用，获得承诺接口
  // promise.then(function(response) { // 调用承诺API获取数据 .resolve
  //
  //   response.bannerList.forEach(function(value) {
  //     value.Id = value.Id
  //     value.Title = encodeURI(encodeURI(value.Title));
  //     $scope.items.push(value);
  //
  //   });
  //   $ionicSlideBoxDelegate.update();
  // }, function(response) { // 处理错误 .reject
  //
  //   console.log('处理错误');
  // });


}])

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－首页控制器,这种写法为了防止压缩文件出错
myTeSeFengController.controller('HomeCtrl', ['$scope', '$timeout', '$ionicLoading', '$ionicBackdrop', '$ionicScrollDelegate', 'homepage', '$state','$http', function($scope, $timeout, $ionicLoading, $ionicBackdrop, $ionicScrollDelegate, homepage, $state,$http) {

  //
  // $http({
  //   method: 'POST',
  //   url: "https://api.weixin.qq.com/cgi-bin/token",
  //   params: {"grant_type":"client_credential","appid":"wx5f7a757b47a53e67","secret":"6ac0b3c60930eee5cb118435afb702ca",'Content-Type':'application/x-www-form-urlencoded',"Access-Control-Allow-Origin":"*"}
  // }).
  // success(function(data, status, headers, config) {
  //     console.log(data );
  // }).
  // error(function(data, status, headers, config) {
  //
  // });
  // $http.post('https://api.weixin.qq.com/cgi-bin/token',{"grant_type":"client_credential"},{"appid":"wx5f7a757b47a53e67"},{"secret":"6ac0b3c60930eee5cb118435afb702ca"},{'Content-Type':'application/x-www-form-urlencoded'}).success(function(data){
  // 		$scope.industries = data;
  // 	});

  //Logger.info("自定义数据"+$state.current.data.customData1);
  //图片轮播集合
  $scope.bannerList = [];


  //今日特色
  $scope.todayFeatures = [];


  $scope.homepage = homepage;


  $scope.scrollTop = function() {

    $ionicScrollDelegate.scrollTop(true);
  };
  $scope.getScrollPosition = function() {
    //monitor the scroll
    $scope.moveData = $ionicScrollDelegate.getScrollPosition().top;

    var oGoTop = document.getElementById('gotop');
    if ($scope.moveData >= 300) {

      oGoTop.style.display = "block";
    } else if ($scope.moveData < 300) {
      oGoTop.style.display = "none";
    }

  };





  $scope.shandong = [];



  //请求数据
  $scope.requestData = function() {
    // var promise = HttpRequest.doGet('/data/shandong.json', {
    //   't': Math.random()
    // }); // 同步调用，获得承诺接口
    // promise.then(function(response) { // 调用承诺API获取数据 .resolve
    //



    //图片轮播
    $scope.bannerList = $scope.homepage.responseObject.bannerList;


    //今日特色
    var nums = $scope.homepage.responseObject.todayFeatures.length / 3;
    if ($scope.homepage.responseObject.todayFeatures.length % 3 > 0) {
      nums += 1;
    }
    for (var i = 0, len = nums; i < len; i++) {
      $scope.todayFeatures.push($scope.homepage.responseObject.todayFeatures.slice(i * 3, i * 3 + 3));
    }


    $scope.shandong = $scope.homepage.responseObject.province;


    $scope.isLoadedLock = false;
    $scope.$broadcast('scroll.infiniteScrollComplete');
    // }, function(response) { // 处理错误 .reject
    //   console.log("title", "失败");
    //   $scope.isLoadedLock = false;
    //   $scope.$broadcast('scroll.infiniteScrollComplete');
    // });
  }
  $scope.requestData();

  //加载更多
  $scope.doMore = function() {

    if ($scope.isLoadedLock) return;
    $scope.isLoadedLock = true;
    $scope.requestData();
  };







  //一秒显示一个背景
  // $scope.action = function() {
  //   $ionicBackdrop.retain();
  //   $timeout(function() {
  //     $ionicBackdrop.release();
  //   }, 1000);
  // };
  // $scope.action();
}])



  //
  myTeSeFengController.controller('ShopCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })

myTeSeFengController.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

myTeSeFengController.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
