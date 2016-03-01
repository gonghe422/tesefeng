/*自定义返回指令**/

;
(function() {
  "use strict";
  var backModule = angular.module('backModule', []);
  backModule.directive('back', ['$ionicActionSheet', '$document', '$timeout', '$window', '$compile', '$state', '$location',
    function($ionicActionSheet, $document, $timeout, $window, $compile, $state, $location) {
      return {
        restrict: 'AE',
        templateUrl: 'templates/customDirectiveHtml/back.html',
        replace: true,
        scope: {
          backUrl: "@backUrl", //单向绑定跳转的路径，可选
          backTitle: "@backTitle", //单向绑定,标题内容，可选
          backIsShare: "@backIsShare" //是否显示分享按钮，默认显示
        },
        link: function(scope, element, attrs) {
          //自定义返回url，默认是返回上一页面
          var backUrl = "";


          if (attrs.backUrl) {
            backUrl = attrs.backUrl;
          }


          if (attrs.backTitle) {
            angular.element(element.children()[1]).html(attrs.backTitle);
          }

          //分享按钮
          if (attrs.backIsShare) {
            if (attrs.backIsShare === "false") {
              angular.element(element.children()[2]).css("display", "none");

            }
          }
          angular.element(element.children()[2]).bind("click", function() {
            scope.sharePanel();

          });
          angular.element(element.children()[0]).bind("click", function() {
            scope.$window = $window;
            if (_.isEmpty(backUrl)) {
              $window.history.back();
            } else {
              $location.path(backUrl)
            }
          });

          //
          scope.sharePanel = function() {
            // 显示操作表
            $ionicActionSheet.show({
              buttons: [{
                text: '<b>分享到微信</b>'
              }, {
                text: '<b>分享到朋友圈</b>'
              }, {
                text: '<b>分享到QQ好友</b>'
              }, {
                text: '<b>分享到QQ空间</b>'
              }, {
                text: '<b>分享到腾讯微博</b>'
              }, {
                text: '<b>分享到新浪微博</b>'
              }],
              titleText: '分享',
              cancelText: '取消',
              buttonClicked: function(index) {
                return true;
              }
            });
          }


        }
      };
    }
  ]);
})();
