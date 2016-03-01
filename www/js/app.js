
"use strict";
var MYAPP=angular.module('myApp', ['ionic', 'myApp.controllers', 'myApp.services','backModule']);

MYAPP.run(['$ionicPlatform', '$rootScope', '$location', '$log', '$window', '$ionicPopup', '$state', '$stateParams', function($ionicPlatform, $rootScope, $location, $log, $window, $ionicPopup, $state, $stateParams) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  var locationChangeStartOff = $rootScope.$on('$locationChangeStart', locationChangeStart);
  var locationChangeSuccessOff = $rootScope.$on('$locationChangeSuccess', locationChangeSuccess);

  var routeChangeStartOff = $rootScope.$on('$routeChangeStart', routeChangeStart);
  var routeChangeSuccessOff = $rootScope.$on('$routeChangeSuccess', routeChangeSuccess);

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  function locationChangeStart(event, newUrl) {

    //  var ret = $window.confirm('Are you sure to give it up? ');
    // if (ret) {
    //   locationChangeStartOff(); //Stop listening for location changes or you can do others
    //   //$location.path(newUrl);
    //   return;
    // }
    // $ionicPopup.show({
    //     title: '订单提交成功',
    //     subTitle: '立即去支付？',
    //     buttons: [{
    //       text: '取消',
    //       onTap: function() {
    //
    //       }
    //     }, {
    //       text: '<b>确认</b>',
    //       type: 'button-positive',
    //       onTap: function() {
    //
    //       }
    //     }]
    //   });
    // event.preventDefault();
    // return;
  }

  function locationChangeSuccess(event) {
    $log.log('locationChangeSuccess');
    $log.log(arguments);
  }

  function routeChangeStart(event) {
    $log.log('routeChangeStart');
    $log.log(arguments);
  }

  function routeChangeSuccess(event) {
    $log.log('routeChangeSuccess');
    $log.log(arguments);
  }
  // noncestr
  var createNonceStr = function() {
    return Math.random().toString(36).substr(2, 15);
  };

}])

MYAPP.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('left');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    // abstract: true 表明此状态不能被显性激活，只能被子状态隐性激活
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  // 首页
  .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      },
      // resolve 被使用来处理异步数据调用，以下是返回一个 promise -> homepage()
      resolve: {
        homepage: function($q, HttpRequest) {
          return HttpRequest.doGet(GLOBAL_HTTP_REQUEST_URL.HOME_PAGE_INFO, {
            't': Math.random()
          });
        }

      },
      data: {
        customData1: 44,
        customData2: "red"
      }
    })
    .state('tab.product', {
      url: '/product/:title/:id',
      // view 用在该状态下有多个 ui-view 的情况，可以对不同的 ui-view 使用特定的 template, controller, resolve data
      // 绝对 view 使用 '@' 符号来区别，比如 'foo@bar' 表明名为 'foo' 的 ui-view 使用了 'bar' 状态的模板(template)，相对 view 则无
      views: {
        'tab-home': {
          templateUrl: 'templates/product/product.html',
          controller: 'ProductCtrl'
        }
      }

    })
    //商品详情
    .state('tab.product_detail', {
      url: '/product_detail/:pid',
      views: {
        'tab-home': {
          templateUrl: 'templates/product/detail.html',
            controller: 'ProductDetailCtrl'
        }
      }
    })
    //购物车
    .state('tab.shop', {
      url: '/shop',
      views: {
        'tab-shop': {
          templateUrl: 'templates/shop.html',
          controller: 'ShopCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/shop/:chatId',
      views: {
        'tab-shop': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  //我的
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
