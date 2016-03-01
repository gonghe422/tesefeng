/*自定义指令**/

(function() {
  "use strict";

  var customDirectiveModule = angular.module('customDirectiveModule', []);


  //app已经在其他文件中指定，如var app = angular.module("starter",["ionic"])
  customDirectiveModule.directive('hideTabs', function($rootScope) {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {
        scope.$on('$ionicView.beforeEnter', function() {
          scope.$watch(attributes.hideTabs, function(value) {
            $rootScope.hideTabs = value;
          });
        });

        scope.$on('$ionicView.beforeLeave', function() {
          $rootScope.hideTabs = false;
        });
      }
    };
  });
  customDirectiveModule.directive('expander', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/customDirectiveHtml/feature.html',
      replace: true,
      scope: {
        mytitle: '=etitle',
        mydata: '=data'
      }
    }
  });
  //特色自定空件
  customDirectiveModule.directive("feature", function() {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'templates/customDirectiveHtml/feature.html',
      link: function(scope, element, attrs) {
        // var html = '';
        // angular.forEach(scope[attrs.rows], function(row, index) {
        // 	html+='	<div class="all_goods"  >';
        //   html += '<h1 >'+row.name+'</h1>';
        // 	html+='<div class="all_goods_imgs"><ul >';
        //   if ('subrows' in row) {
        //     angular.forEach(row.subrows, function(subrow, index) {
        // 			html+='<li >';
        //       html += '<img image-lazy-src='{{subitem.ImgUrl}}' image-lazy-loader="ios" lazy-scroll-resize="true" /></a>';
        //       html+='</li>';
        // 	  });
        //   }
        // 	html+='</ul></div>';
        // 	html+="</div>";
        // });
        //
        // element.replaceWith(html)
      }
    }



  });

})();
