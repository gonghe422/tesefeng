angular.module('myApp.controllers', ['httpRequest.service', 'ionicLazyLoad', 'pasvaz.bindonce', 'customDirectiveModule'])


//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－图片轮播控制器
.controller('SlideCtrl', ['$scope', '$ionicSlideBoxDelegate', '$http', 'HttpRequest', function($scope, $ionicSlideBoxDelegate, $http, HttpRequest) {

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
.controller('HomeCtrl', ['$scope', '$timeout', '$ionicLoading', '$ionicBackdrop', 'HttpRequest', '$ionicScrollDelegate', 'homepage', function($scope, $timeout, $ionicLoading, $ionicBackdrop, HttpRequest, $ionicScrollDelegate, homepage) {


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



    //是否加载更多
    $scope.hasMore = true;
    //加载更多是否锁定
    $scope.isLoadedLock = false;


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
  //商品列表
  .controller('ProductCtrl', ['$rootScope','$scope', '$timeout', '$ionicLoading', '$ionicBackdrop', '$stateParams', 'HttpRequest', '$ionicScrollDelegate', function($rootScope,$scope, $timeout, $ionicLoading, $ionicBackdrop, $stateParams, HttpRequest, $ionicScrollDelegate) {

    console.log("$rootScope.$state", $rootScope.$state);
    console.log("$rootScope.$stateParams", $rootScope.$stateParams);

    // 启动正在加载的弹出框
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });


    $scope.title = $stateParams.title;


    $timeout(function() {
      $ionicLoading.hide();

    }, 2000);
  }])
  //
  .controller('ShopCtrl', function($scope, Chats) {
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

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

(function () {
	"use strict";
	/**
	 * Bindonce - Zero watches binding for AngularJs
	 * @version v0.3.3
	 * @link https://github.com/Pasvaz/bindonce
	 * @author Pasquale Vazzana <pasqualevazzana@gmail.com>
	 * @license MIT License, http://www.opensource.org/licenses/MIT
	 */

	var bindonceModule = angular.module('pasvaz.bindonce', []);

	bindonceModule.directive('bindonce', function ()
	{
		var toBoolean = function (value)
		{
			if (value && value.length !== 0)
			{
				var v = angular.lowercase("" + value);
				value = !(v === 'f' || v === '0' || v === 'false' || v === 'no' || v === 'n' || v === '[]');
			}
			else
			{
				value = false;
			}
			return value;
		};

		var msie = parseInt((/msie (\d+)/.exec(angular.lowercase(navigator.userAgent)) || [])[1], 10);
		if (isNaN(msie))
		{
			msie = parseInt((/trident\/.*; rv:(\d+)/.exec(angular.lowercase(navigator.userAgent)) || [])[1], 10);
		}

		var bindonceDirective =
		{
			restrict: "AM",
			controller: ['$scope', '$element', '$attrs', '$interpolate', function ($scope, $element, $attrs, $interpolate)
			{
				var showHideBinder = function (elm, attr, value)
				{
					var show = (attr === 'show') ? '' : 'none';
					var hide = (attr === 'hide') ? '' : 'none';
					elm.css('display', toBoolean(value) ? show : hide);
				};
				var classBinder = function (elm, value)
				{
					if (angular.isObject(value) && !angular.isArray(value))
					{
						var results = [];
						angular.forEach(value, function (value, index)
						{
							if (value) results.push(index);
						});
						value = results;
					}
					if (value)
					{
						elm.addClass(angular.isArray(value) ? value.join(' ') : value);
					}
				};
				var transclude = function (transcluder, scope)
				{
					transcluder.transclude(scope, function (clone)
					{
						var parent = transcluder.element.parent();
						var afterNode = transcluder.element && transcluder.element[transcluder.element.length - 1];
						var parentNode = parent && parent[0] || afterNode && afterNode.parentNode;
						var afterNextSibling = (afterNode && afterNode.nextSibling) || null;
						angular.forEach(clone, function (node)
						{
							parentNode.insertBefore(node, afterNextSibling);
						});
					});
				};

				var ctrl =
				{
					watcherRemover: undefined,
					binders: [],
					group: $attrs.boName,
					element: $element,
					ran: false,

					addBinder: function (binder)
					{
						this.binders.push(binder);

						// In case of late binding (when using the directive bo-name/bo-parent)
						// it happens only when you use nested bindonce, if the bo-children
						// are not dom children the linking can follow another order
						if (this.ran)
						{
							this.runBinders();
						}
					},

					setupWatcher: function (bindonceValue)
					{
						var that = this;
						this.watcherRemover = $scope.$watch(bindonceValue, function (newValue)
						{
							if (newValue === undefined) return;
							that.removeWatcher();
							that.checkBindonce(newValue);
						}, true);
					},

					checkBindonce: function (value)
					{
						var that = this, promise = (value.$promise) ? value.$promise.then : value.then;
						// since Angular 1.2 promises are no longer
						// undefined until they don't get resolved
						if (typeof promise === 'function')
						{
							promise(function ()
							{
								that.runBinders();
							});
						}
						else
						{
							that.runBinders();
						}
					},

					removeWatcher: function ()
					{
						if (this.watcherRemover !== undefined)
						{
							this.watcherRemover();
							this.watcherRemover = undefined;
						}
					},

					runBinders: function ()
					{
						while (this.binders.length > 0)
						{
							var binder = this.binders.shift();
							if (this.group && this.group != binder.group) continue;
							var value = binder.scope.$eval((binder.interpolate) ? $interpolate(binder.value) : binder.value);
							switch (binder.attr)
							{
								case 'boIf':
									if (toBoolean(value))
									{
										transclude(binder, binder.scope.$new());
									}
									break;
								case 'boSwitch':
									var selectedTranscludes, switchCtrl = binder.controller[0];
									if ((selectedTranscludes = switchCtrl.cases['!' + value] || switchCtrl.cases['?']))
									{
										binder.scope.$eval(binder.attrs.change);
										angular.forEach(selectedTranscludes, function (selectedTransclude)
										{
											transclude(selectedTransclude, binder.scope.$new());
										});
									}
									break;
								case 'boSwitchWhen':
									var ctrl = binder.controller[0];
									ctrl.cases['!' + binder.attrs.boSwitchWhen] = (ctrl.cases['!' + binder.attrs.boSwitchWhen] || []);
									ctrl.cases['!' + binder.attrs.boSwitchWhen].push({ transclude: binder.transclude, element: binder.element });
									break;
								case 'boSwitchDefault':
									var ctrl = binder.controller[0];
									ctrl.cases['?'] = (ctrl.cases['?'] || []);
									ctrl.cases['?'].push({ transclude: binder.transclude, element: binder.element });
									break;
								case 'hide':
								case 'show':
									showHideBinder(binder.element, binder.attr, value);
									break;
								case 'class':
									classBinder(binder.element, value);
									break;
								case 'text':
									binder.element.text(value);
									break;
								case 'html':
									binder.element.html(value);
									break;
								case 'style':
									binder.element.css(value);
									break;
								case 'disabled':
									binder.element.prop('disabled', value);
									break;
								case 'src':
									binder.element.attr(binder.attr, value);
									if (msie) binder.element.prop('src', value);
									break;
								case 'attr':
									angular.forEach(binder.attrs, function (attrValue, attrKey)
									{
										var newAttr, newValue;
										if (attrKey.match(/^boAttr./) && binder.attrs[attrKey])
										{
											newAttr = attrKey.replace(/^boAttr/, '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
											newValue = binder.scope.$eval(binder.attrs[attrKey]);
											binder.element.attr(newAttr, newValue);
										}
									});
									break;
								case 'href':
								case 'alt':
								case 'title':
								case 'id':
								case 'value':
									binder.element.attr(binder.attr, value);
									break;
							}
						}
						this.ran = true;
					}
				};

				angular.extend(this, ctrl);
			}],

			link: function (scope, elm, attrs, bindonceController)
			{
				var value = attrs.bindonce && scope.$eval(attrs.bindonce);
				if (value !== undefined)
				{
					bindonceController.checkBindonce(value);
				}
				else
				{
					bindonceController.setupWatcher(attrs.bindonce);
					elm.bind("$destroy", bindonceController.removeWatcher);
				}
			}
		};

		return bindonceDirective;
	});

	angular.forEach(
	[
		{ directiveName: 'boShow', attribute: 'show' },
		{ directiveName: 'boHide', attribute: 'hide' },
		{ directiveName: 'boClass', attribute: 'class' },
		{ directiveName: 'boText', attribute: 'text' },
		{ directiveName: 'boBind', attribute: 'text' },
		{ directiveName: 'boHtml', attribute: 'html' },
		{ directiveName: 'boSrcI', attribute: 'src', interpolate: true },
		{ directiveName: 'boSrc', attribute: 'src' },
		{ directiveName: 'boHrefI', attribute: 'href', interpolate: true },
		{ directiveName: 'boHref', attribute: 'href' },
		{ directiveName: 'boAlt', attribute: 'alt' },
		{ directiveName: 'boTitle', attribute: 'title' },
		{ directiveName: 'boId', attribute: 'id' },
		{ directiveName: 'boStyle', attribute: 'style' },
		{ directiveName: 'boDisabled', attribute: 'disabled' },
		{ directiveName: 'boValue', attribute: 'value' },
		{ directiveName: 'boAttr', attribute: 'attr' },

		{ directiveName: 'boIf', transclude: 'element', terminal: true, priority: 1000 },
		{ directiveName: 'boSwitch', require: 'boSwitch', controller: function () { this.cases = {}; } },
		{ directiveName: 'boSwitchWhen', transclude: 'element', priority: 800, require: '^boSwitch' },
		{ directiveName: 'boSwitchDefault', transclude: 'element', priority: 800, require: '^boSwitch' }
	],
	function (boDirective)
	{
		var childPriority = 200;
		return bindonceModule.directive(boDirective.directiveName, function ()
		{
			var bindonceDirective =
			{
				priority: boDirective.priority || childPriority,
				transclude: boDirective.transclude || false,
				terminal: boDirective.terminal || false,
				require: ['^bindonce'].concat(boDirective.require || []),
				controller: boDirective.controller,
				compile: function (tElement, tAttrs, transclude)
				{
					return function (scope, elm, attrs, controllers)
					{
						var bindonceController = controllers[0];
						var name = attrs.boParent;
						if (name && bindonceController.group !== name)
						{
							var element = bindonceController.element.parent();
							bindonceController = undefined;
							var parentValue;

							while (element[0].nodeType !== 9 && element.length)
							{
								if ((parentValue = element.data('$bindonceController'))
									&& parentValue.group === name)
								{
									bindonceController = parentValue;
									break;
								}
								element = element.parent();
							}
							if (!bindonceController)
							{
								throw new Error("No bindonce controller: " + name);
							}
						}

						bindonceController.addBinder(
						{
							element: elm,
							attr: boDirective.attribute || boDirective.directiveName,
							attrs: attrs,
							value: attrs[boDirective.directiveName],
							interpolate: boDirective.interpolate,
							group: name,
							transclude: transclude,
							controller: controllers.slice(1),
							scope: scope
						});
					};
				}
			};

			return bindonceDirective;
		});
	})
})();

!function(){"use strict";var e=angular.module("pasvaz.bindonce",[]);e.directive("bindonce",function(){var e=function(e){if(e&&0!==e.length){var t=angular.lowercase(""+e);e=!("f"===t||"0"===t||"false"===t||"no"===t||"n"===t||"[]"===t)}else e=!1;return e},t=parseInt((/msie (\d+)/.exec(angular.lowercase(navigator.userAgent))||[])[1],10);isNaN(t)&&(t=parseInt((/trident\/.*; rv:(\d+)/.exec(angular.lowercase(navigator.userAgent))||[])[1],10));var r={restrict:"AM",controller:["$scope","$element","$attrs","$interpolate",function(r,a,i,n){var c=function(t,r,a){var i="show"===r?"":"none",n="hide"===r?"":"none";t.css("display",e(a)?i:n)},o=function(e,t){if(angular.isObject(t)&&!angular.isArray(t)){var r=[];angular.forEach(t,function(e,t){e&&r.push(t)}),t=r}t&&e.addClass(angular.isArray(t)?t.join(" "):t)},s=function(e,t){e.transclude(t,function(t){var r=e.element.parent(),a=e.element&&e.element[e.element.length-1],i=r&&r[0]||a&&a.parentNode,n=a&&a.nextSibling||null;angular.forEach(t,function(e){i.insertBefore(e,n)})})},l={watcherRemover:void 0,binders:[],group:i.boName,element:a,ran:!1,addBinder:function(e){this.binders.push(e),this.ran&&this.runBinders()},setupWatcher:function(e){var t=this;this.watcherRemover=r.$watch(e,function(e){void 0!==e&&(t.removeWatcher(),t.checkBindonce(e))},!0)},checkBindonce:function(e){var t=this,r=e.$promise?e.$promise.then:e.then;"function"==typeof r?r(function(){t.runBinders()}):t.runBinders()},removeWatcher:function(){void 0!==this.watcherRemover&&(this.watcherRemover(),this.watcherRemover=void 0)},runBinders:function(){for(;this.binders.length>0;){var r=this.binders.shift();if(!this.group||this.group==r.group){var a=r.scope.$eval(r.interpolate?n(r.value):r.value);switch(r.attr){case"boIf":e(a)&&s(r,r.scope.$new());break;case"boSwitch":var i,l=r.controller[0];(i=l.cases["!"+a]||l.cases["?"])&&(r.scope.$eval(r.attrs.change),angular.forEach(i,function(e){s(e,r.scope.$new())}));break;case"boSwitchWhen":var u=r.controller[0];u.cases["!"+r.attrs.boSwitchWhen]=u.cases["!"+r.attrs.boSwitchWhen]||[],u.cases["!"+r.attrs.boSwitchWhen].push({transclude:r.transclude,element:r.element});break;case"boSwitchDefault":var u=r.controller[0];u.cases["?"]=u.cases["?"]||[],u.cases["?"].push({transclude:r.transclude,element:r.element});break;case"hide":case"show":c(r.element,r.attr,a);break;case"class":o(r.element,a);break;case"text":r.element.text(a);break;case"html":r.element.html(a);break;case"style":r.element.css(a);break;case"disabled":r.element.prop("disabled",a);break;case"src":r.element.attr(r.attr,a),t&&r.element.prop("src",a);break;case"attr":angular.forEach(r.attrs,function(e,t){var a,i;t.match(/^boAttr./)&&r.attrs[t]&&(a=t.replace(/^boAttr/,"").replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),i=r.scope.$eval(r.attrs[t]),r.element.attr(a,i))});break;case"href":case"alt":case"title":case"id":case"value":r.element.attr(r.attr,a)}}}this.ran=!0}};angular.extend(this,l)}],link:function(e,t,r,a){var i=r.bindonce&&e.$eval(r.bindonce);void 0!==i?a.checkBindonce(i):(a.setupWatcher(r.bindonce),t.bind("$destroy",a.removeWatcher))}};return r}),angular.forEach([{directiveName:"boShow",attribute:"show"},{directiveName:"boHide",attribute:"hide"},{directiveName:"boClass",attribute:"class"},{directiveName:"boText",attribute:"text"},{directiveName:"boBind",attribute:"text"},{directiveName:"boHtml",attribute:"html"},{directiveName:"boSrcI",attribute:"src",interpolate:!0},{directiveName:"boSrc",attribute:"src"},{directiveName:"boHrefI",attribute:"href",interpolate:!0},{directiveName:"boHref",attribute:"href"},{directiveName:"boAlt",attribute:"alt"},{directiveName:"boTitle",attribute:"title"},{directiveName:"boId",attribute:"id"},{directiveName:"boStyle",attribute:"style"},{directiveName:"boDisabled",attribute:"disabled"},{directiveName:"boValue",attribute:"value"},{directiveName:"boAttr",attribute:"attr"},{directiveName:"boIf",transclude:"element",terminal:!0,priority:1e3},{directiveName:"boSwitch",require:"boSwitch",controller:function(){this.cases={}}},{directiveName:"boSwitchWhen",transclude:"element",priority:800,require:"^boSwitch"},{directiveName:"boSwitchDefault",transclude:"element",priority:800,require:"^boSwitch"}],function(t){var r=200;return e.directive(t.directiveName,function(){var e={priority:t.priority||r,transclude:t.transclude||!1,terminal:t.terminal||!1,require:["^bindonce"].concat(t.require||[]),controller:t.controller,compile:function(e,r,a){return function(e,r,i,n){var c=n[0],o=i.boParent;if(o&&c.group!==o){var s=c.element.parent();c=void 0;for(var l;9!==s[0].nodeType&&s.length;){if((l=s.data("$bindonceController"))&&l.group===o){c=l;break}s=s.parent()}if(!c)throw new Error("No bindonce controller: "+o)}c.addBinder({element:r,attr:t.attribute||t.directiveName,attrs:i,value:i[t.directiveName],interpolate:t.interpolate,group:o,transclude:a,controller:n.slice(1),scope:e})}}};return e})})}();
/*自定义指令**/

(function() {
  "use strict";

  var customDirectiveModule = angular.module('customDirectiveModule', []);
  customDirectiveModule.directive('expander', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/customDirectiveHtml/feature.html',
      replace: true,
      scope: {
        mytitle: '=etitle',
        mydata:'=data'
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

/**
 * Created by PAVEI on 30/09/2014.
 * Updated by Ross Martin on 12/05/2014
 * Updated by Davide Pastore on 04/14/2015
 * Updated by Michel Vidailhet on 05/12/2015
 * Updated by Rene Korss on 11/25/2015
 */

angular.module('ionicLazyLoad', []);

angular.module('ionicLazyLoad')

.directive('lazyScroll', ['$rootScope',
    function($rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, $element) {
                var origEvent = $scope.$onScroll;
                $scope.$onScroll = function () {
                    $rootScope.$broadcast('lazyScrollEvent');

                    if(typeof origEvent === 'function'){
                      origEvent();
                    }
                };
            }
        };
}])

.directive('imageLazySrc', ['$document', '$timeout', '$ionicScrollDelegate', '$compile',
    function ($document, $timeout, $ionicScrollDelegate, $compile) {
        return {
            restrict: 'A',
            scope: {
                lazyScrollResize: "@lazyScrollResize",
                imageLazyBackgroundImage: "@imageLazyBackgroundImage",
                imageLazySrc: "@"
            },
            link: function ($scope, $element, $attributes) {
                if (!$attributes.imageLazyDistanceFromBottomToLoad) {
                    $attributes.imageLazyDistanceFromBottomToLoad = 0;
                }
                if (!$attributes.imageLazyDistanceFromRightToLoad) {
                    $attributes.imageLazyDistanceFromRightToLoad = 0;
                }


                 //alert(angular.element('#aa').html());
                var loader;
                if ($attributes.imageLazyLoader) {
                    loader = $compile('<div class="image-loader-container"><ion-spinner class="image-loader" icon="' + $attributes.imageLazyLoader + '"></ion-spinner></div>')($scope);
                    $element.after(loader);
                }

                $scope.$watch('imageLazySrc', function (oldV, newV) {
                    if(loader)
                        loader.remove();
                    if ($attributes.imageLazyLoader) {
                        loader = $compile('<div class="image-loader-container"><ion-spinner class="image-loader" icon="' + $attributes.imageLazyLoader + '"></ion-spinner></div>')($scope);
                        $element.after(loader);
                    }
                    var deregistration = $scope.$on('lazyScrollEvent', function () {
                        //    console.log('scroll');
                            if (isInView()) {
                                loadImage();
                                deregistration();
                            }
                        }
                    );
                    $timeout(function () {
                        if (isInView()) {
                            loadImage();
                            deregistration();
                        }
                    }, 500);
                });
                var deregistration = $scope.$on('lazyScrollEvent', function () {
                       // console.log('scroll');
                        if (isInView()) {
                            loadImage();
                            deregistration();
                        }
                    }
                );

                function loadImage() {
                    //Bind "load" event
                    $element.bind("load", function (e) {
                        if ($attributes.imageLazyLoader) {
                            loader.remove();
                        }
                        if ($scope.lazyScrollResize == "true") {
                            //Call the resize to recalculate the size of the screen
                            $ionicScrollDelegate.resize();
                        }
                        $element.unbind("load");
                    });

                    if ($scope.imageLazyBackgroundImage == "true") {
                        var bgImg = new Image();
                        bgImg.onload = function () {
                            if ($attributes.imageLazyLoader) {
                                loader.remove();
                            }
                            $element[0].style.backgroundImage = 'url(' + $attributes.imageLazySrc + ')'; // set style attribute on element (it will load image)
                            if ($scope.lazyScrollResize == "true") {
                                //Call the resize to recalculate the size of the screen
                                $ionicScrollDelegate.resize();
                            }
                        };
                        bgImg.src = $attributes.imageLazySrc;
                    } else {
                        $element[0].src = $attributes.imageLazySrc; // set src attribute on element (it will load image)
                    }
                }

                function isInView() {
                    var clientHeight = $document[0].documentElement.clientHeight;
                    var clientWidth = $document[0].documentElement.clientWidth;
                    var imageRect = $element[0].getBoundingClientRect();
                    return (imageRect.top >= 0 && imageRect.top <= clientHeight + parseInt($attributes.imageLazyDistanceFromBottomToLoad))
                        && (imageRect.left >= 0 && imageRect.left <= clientWidth + parseInt($attributes.imageLazyDistanceFromRightToLoad));
                }

                // bind listener
                // listenerRemover = scrollAndResizeListener.bindListener(isInView);

                // unbind event listeners if element was destroyed
                // it happens when you change view, etc
                $element.on('$destroy', function () {
                    deregistration();
                });

                // explicitly call scroll listener (because, some images are in viewport already and we haven't scrolled yet)
                $timeout(function () {
                    if (isInView()) {
                        loadImage();
                        deregistration();
                    }
                }, 500);
            }
        };
    }]);


/**
  网络请求基类
  shipf  2016-01-20
*/
angular.module('httpRequest.service', [])
  .factory('HttpRequest', ['$http', '$q', function($http, $q) {
    return {
      doGet: function(url, parames) {

        parames = parames || {};
        if(angular.isUndefined(url))
        {
          console.log("url路径参数为空");
        }
        var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
        $http({
          method: 'GET',
          url: url,
          params: parames
        }).
        success(function(data, status, headers, config) {
          Logger.info("响应数据成功:"+JSON.stringify(data));
          deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了
        }).
        error(function(data, status, headers, config) {
          Logger.error("响应数据失败:"+JSON.stringify(data));
          deferred.reject(data); // 声明执行失败，即服务器返回错误
        });
        return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
      }, // end query
      doPost: function(url,parames) {

        parames = parames || {};
        var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
        $http({
          method: 'POST',
          url: url,
          params: parames
        }).
        success(function(data, status, headers, config) {
          Logger.info("响应数据成功:"+JSON.stringify(data));

          deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了
        }).
        error(function(data, status, headers, config) {
          Logger.error("响应数据失败:"+JSON.stringify(data));
          deferred.reject(data); // 声明执行失败，即服务器返回错误
        });
        return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API

      }
    };
  }]);

angular.module('myApp.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

(function() {
  var loadJs = function(src) {
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = src;
    oHead.appendChild(oScript);
  }
})();

/*
js调试组件，使用闭包
*/
;
(function() {
  var logger = function(level, object, viewType) {
    this.level = level;
    this.object = object;
    this.viewType = viewType;
  }
  logger.LEVEL_DEBUG = 0;
  logger.LEVEL_DEBUG_TITLE = "bug";


  logger.LEVEL_INFO = 1;
  logger.LEVEL_INFO_TITLE = "消息";


  logger.LEVEL_WARN = 2;
  logger.LEVEL_WARN_TITLE = "警告";


  logger.LEVEL_ERROR = 3;
  logger.LEVEL_ERROR_TITLE = "错误";


  logger.LEVEL_FATAL = 4;
  logger.LEVEL_FATAL_TITLE = "失败";


  logger.VIEW_TYPE_ALERT = 0;


  logger.VIEW_TYPE_APPEND = 1;


  logger.prototype = {
    setLevel: function(level) {
      this.level = level;
    },
    setObject: function(o) {
      if (typeof o == 'string') {
        this.object = document.getElementById(o);
      } else {
        this.object = o;
      }
    },
    setViewType: function(type) {
      this.viewType = type;
    },
    log: function(s) {
      this.message(100, s);
    },
    debug: function(s) {
      this.message(logger.LEVEL_DEBUG, s);
    },
    info: function(s) {
      this.message(logger.LEVEL_INFO, s);
    },
    warn: function(s) {
      this.message(logger.LEVEL_WARN, s);
    },
    error: function(s) {
      this.message(logger.LEVEL_ERROR, s);
    },
    fatal: function(s) {
      this.message(logger.LEVEL_FATAL, s);
    },
    message: function(level, s) {

      if (g_const_IsDebug === 1) {
        if (level >= this.level) {
          // if (this.object != null) {
          //   this.object.innerHTML = s;
          // } else if (this.viewType == logger.VIEW_TYPE_ALERT) {
          //   alert(s);
          // } else {
          //   document.body.appendChild(document.createTextNode(s));
          //   document.body.appendChild(document.createElement("br"));
          // }
          switch (level) {
            case logger.LEVEL_DEBUG:
              console.log(logger.LEVEL_DEBUG_TITLE, s);
              break;
            case logger.LEVEL_INFO:
              console.log(logger.LEVEL_INFO_TITLE, s);
              break;
            case logger.LEVEL_WARN:
              console.log(logger.LEVEL_WARN_TITLE, s);
              break;
            case logger.LEVEL_ERROR:
              console.log(logger.LEVEL_ERROR_TITLE, s);
              break;
            case logger.LEVEL_FATAL:
              console.log(logger.LEVEL_FATAL_TITLE, s);
              break;
            default:
              console.log(logger.LEVEL_DEBUG_TITLE, s);

              break;

          }

        }
      }
    }
  };
  if (typeof window.Logger === 'undefined' || window.Logger === null)
    window.Logger = new logger(logger.LEVEL_DEBUG, null, logger.VIEW_TYPE_APPEND);
})();

// 怎么使用呢？
//
// 这个js组件往window对象注册了Logger对象，我们可以用Logger.log/Logger.debug/Logger.info/Logger.warn/Logger.error/Logger.fatal来输出不同的调试信息。
//
// 示例代码如下：
// 1
// 2
//
// Logger.debug(new Date());
// Logger.debug(new Date().addHours(3));


/*debug调试**/
var g_const_IsDebug=1;

/*常数(枚举)定义*/



/*用户类型*/
var g_const_buyerType = {
    /*注册会员*/"REGMEMBER": "4497469400050002",
    /*内购会员*/"SELFMEMBER": "4497469400050001"
};

/*成功码*/
var g_const_Success_Code = 1;
/*失败码**/
var g_const_Fail_Code=0;


/*内部错误码*/
var g_const_Error_Code = {
    "UnLogin": "999",
    "NoAddress": "1000",
};


/*内部接口成功码*/
var g_const_Success_Code_IN = 0;

/*是否被收藏*/
var g_const_collectionProduct = {
    /*已收藏*/"YES": 1,
    /*未收藏*/"NO": 0
};

/*是否需要api_token*/
var g_const_api_token = {
    /*需要发送*/"Wanted": "1",
    /*不需要发送*/"Unwanted": ""
};
/*是否*/
var g_const_YesOrNo = {
    /*是*/"YES": 1,
    /*否*/"NO": 0
}
var g_const_seconds = 1000;
var g_const_minutes = g_const_seconds * 60;
var g_const_hours = g_const_minutes * 60;
var g_const_days = g_const_hours * 24;
var g_const_years = g_const_days * 365;
/*模板替换正则*/
var g_const_regex_template = /(?:\{\{)([a-zA-z][^\s\}]+)(?:\}\})/g;

/*LocalStorage名称定义*/
var g_const_localStorage = {
    /*购物车精简版*/
    "Cart": "Cart",
    /*立即购买商品列表*/
    "ImmediatelyBuy": "ImmediatelyBuy",
    /*订单确认(提交的购物列表)*/
    "OrderConfirm": "OrderConfirm",
    /*订单确认(提交的购物价格)*/
    "OrderPrice": "OrderPrice",
    /*立即购买的商品属性*/
    "GoodsInfo": "GoodsInfo",
    /*订单类型*/
    "OrderType": "OrderType",
    /*发票*/
    "FaPiao": "FaPiao",
    /*发票内容*/
    "FaPiaoNR": "FaPiaoNR",
    /*优惠券*/
    "CouponCodes": "CouponCodes",
    /*返回地址*/
    "BackURL": "BackURL",
    /*返回地址列表*/
    "BackURLList": "BackURLList",
    /*指定配置的返回地址*/
    "PageUrlConfig": "PageUrlConfig",
    /*页面路径*/
    "PagePathList": "PagePathList",
    /*购物车完整版*/
    "CartFull": "CartFull",
    /*浏览历史*/
    "History": "History",
    /*新注册用户标志*/
    "IsnewReg": "IsnewReg",
    /*优惠头条信息*/
    "CartSalesAdv": "CartSalesAdv",

    ///*来源和时间*/
    //"ScrollTime": "[]",

    /*地址三级联动的缓存*/
    "StoreDistrict": "StoreDistrict",
    //"JSAPI_Ticket": "JSAPI_Ticket",
    //"JSAPI_Access_token": "JSAPI_Access_token",
    "OrderAddress": "OrderAddress",
    /*限时抢购提醒商品缓存*/
    "FlashActive": "FlashActive",
    /*推广来源ID*/
    "OrderFrom": "OrderFrom",
    /*推广来源参数*/
    "OrderFromParam": "OrderFromParam",
    /*扫码购产品ID*/
    "SMG_ProductID": "SMG_ProductID",
    /*登陆会员信息*/
    "Member": "Member"//{Member:{"phone":"","uid":"","accounttype":0}}
};
/*账号绑定类型*/
var g_const_accounttype = {
    /*微信*/
    WeiXin: 13,
    /*微博*/
    WeiBo: 12,
    /*QQ*/
    QQ: 11,
    /*支付宝*/
    AliPay: 15,
    /*微公社*/
    ICHSY: 14
}

/*LocalStorage名称定义-- 结束*/

/*优惠卷状态[0：未使用；1：已使用；2：已过期]*/
var g_Coupon_Status = {
    /*未使用*/
    "CanUse": "0",
    /*已使用*/
    "Used": "1",
    /*已过期*/
    "Expired": "2"
};


/*订单类型定义*/
var g_order_Type = {
    /*试用订单*/
    "Try": "449715200003",
    /*闪购订单*/
    "Quick": "449715200004",
    /*普通订单*/
    "Common": "449715200005",
    /*内购订单*/
    "Inner": "449715200007",
    /*扫码购订单*/
    "QRCode": "449715200010",
};
/*订单类型定义-- 结束*/

/*订单来源定义*/
var g_order_Souce = {
    /*微信订单*/
    "Weixin": "449715190006",
    /*扫码购订单*/
    "QRCode": "449715190007",
};
/*订单类型定义-- 结束*/


/*支付类型定义*/
var g_pay_Type = {
    /*在线支付*/
    "Online": "449716200001",
    /*支付宝*/
    "Alipay": "449746280003",
    /*货到付*/
    "Getpay": "449716200002",
    /*微信支付*/
    "WXpay": "449746280005",
    GetPayTypeText: function (PayType) {
        switch (PayType) {
            case g_pay_Type.Alipay:
                return "支付宝";
            case g_pay_Type.WXpay:
                return "微信支付";
            case g_pay_Type.Online:
                return "在线支付";
            case g_pay_Type.Getpay:
                return "货到付款";
            default:
                return "";
        }
    }
};
/*支付类型定义-- 结束*/

/*发票类型*/
var g_const_bill_Type = {
    /*普通发票*/
    "Normal": "449746310001",
    /*增值税发票*/
    "ZengZhi": "449746310002",
    /*不开发票*/
    "NotNeed": "0"
};
/*默认产品图片*/
var g_goods_Pic = "http://wap-family.syserver.ichsy.com/cfamily/resources/cfamily/zzz_js/monthSales_bg.png";
/*默认品牌特惠图片*/
var g_brand_Pic = "http://wap-family.syserver.ichsy.com/cfamily/resources/cfamily/zzz_js/bg.png";
/*栏目类型*/
var g_const_columnType = {
    /*轮播广告*/
    "swipeSlide": "4497471600010001",
    /*导航*/
    "Navigation": "4497471600010004",
    /*两栏广告*/
    "TwoADs": "4497471600010003",
    /*闪购*/
    "FastBuy": "4497471600010011",
    /*通屏广告(一栏广告)*/
    "CommonAD": "4497471600010002",
    /*一栏推荐*/
    "RecommendONE": "4497471600010005",
    /*右两栏推荐*/
    "RecommendRightTwo": "4497471600010006",
    /*左两栏推荐*/
    "RecommendLeftTwo": "4497471600010007",
    /*商品推荐*/
    "RecommendProduct": "4497471600010008",
    /*两栏多行推荐(热门市场)*/
    "RecommendHot": "4497471600010009",
    /*TV直播*/
    "TVLive": "4497471600010010"
};
/*‘显示更多’链接类型*/
var g_const_showmoreLinktype = {
    /*超链接*/
    "URL": "4497471600020001",
    /*关键字搜索*/
    "KeyWordSearch": "4497471600020002",
    /*商品分类*/
    "ProductType": "4497471600020003",
    /*商品详情*/
    "ProductDetail": "4497471600020004"
};
/*是否显示更多*/
var g_const_isShowmore = {
    /*是*/
    "YES": "449746250001",
    /*否*/
    "NO": "449746250002",
    /*未知*/
    "Unknown": ""
};
/*阶梯价类型*/
var g_const_event_product_sortType = {
    /*时间(分钟)*/
    "Time": "4497473400010001",
    /*销量*/
    "SaleCount": "4497473400010002",
    /*活动商品*/
    "Other": ""
};
/*是否阶梯价*/
var g_const_event_product_priceIs = g_const_isShowmore;

/*订单状态编号
4497153900010001	下单成功-未付款
4497153900010002	下单成功-未发货
4497153900010003	已发货（待收货）
4497153900010004	已收货(目前系统中  已收货 就是 交易成功)
4497153900010005	交易成功
4497153900010006	交易失败(交易关闭)
*/
var g_const_orderStatus = {
    "DFK": "4497153900010001",
    "DFH": "4497153900010002",
    "DSH": "4497153900010003",
    "YSH": "4497153900010004",
    "JYCG": "4497153900010005",
    "JYSB": "4497153900010006"
};

var g_const_mobilecz_orderStatus = {
    "DZF": "DZF",//待付款
    "ZFCG": "ZFCG",//支付成功
    "DCZ": "DCZ",//待充值
    "CZCG": "CZCG",//充值成功
    "CZSB": "CZSB"//充值失败
};

/*支付宝支付地址*/
var g_Alipay_url = "http://wap-family.syserver.ichsy.com/cfamily/payOrder/";
/*TV购物排序*/
var g_const_tvlive_sort = {
    /*正序*/
    "ASC": "0",
    /*倒序*/
    "DESC": "1"
}
;
/*商品状态*/
var g_const_productStatus = {
    /*上架*/"Common": "4497153900060002",
    /*售罄*/"SaleOver": "4497471600050002"
};
/*最大历史记录数量*/
var g_const_MaxHistoryCount = 50;

/*活动类型类型*/
var g_const_ActivityType = {
    /*今日新品*/
    "Todaynew": "467703130008000100040001",
    /*品牌特惠*/
    "BrandPreference": "467703130008000100030001",
    /*海外购*/
    "ImportProduct": "467703130008000100090001",
};
/*活动类型类型*/
var g_const_ActivityName = {
    /*今日新品*/
    "Todaynew": "今日新品",
    /*品牌特惠*/
    "BrandPreference": "品牌特惠",
    /*海外购*/
    "ImportProduct": "海外购",
};
/*最大历史记录数量*/
var g_const_MaxScroll = 1000;

/*我的优惠卷查询类型类型*/
var g_const_couponLocation = {
    /*0代表未使用优惠券，*/
    "NoUse": "0",
    /*1代表历史优惠券*/
    "Used": "1",
};

/*跳转页面集合*/
var g_const_PageURL = {
    /*首页*/
    "Index": "/index.html",
    /*普通登录页*/
    "Login": "/Account/login.html",
    /*授权登陆发起页*/
    "OauthLogin": "/Account/OauthLogin.aspx",
    /*分类页*/
    "Category": "/Category.html",
    /*购物车*/
    "Cart": "/cart.html",

    /*查询页*/
    "Search": "/Search.html",

    /*注册页*/
    "Reg": "/Account/Register.html",
    /*手机登录页*/
    "PhoneLogin": "/Account/login_m.html",

    /*设定推荐人*/
    "Recom": "/Order/OrderRecom.html",
    /*支付成功页*/
    "OrderSuccess": "/Order/OrderSuccess.html",
    /*支付失败页*/
    "OrderFail": "/Order/OrderFail.html",
    /*订单确认页*/
    "OrderConfirm": "/order/OrderConfirm.html",
    /*订单确认前置页*/
    "PreOrderConfirm": "/order/PreOrderConfirm.html",
    /*商品列表*/
    "Product_List": "/Product_List.html",
    /*商品详情*/
    "Product_Detail": "/Product_Detail.html",

    /*意见与反馈入口*/
    "Feedback_Index": "/Feedback_Index.html",
    /*提交意见与反馈*/
    "Feedback": "/Feedback.html",
    /*品牌特惠列表页*/
    "BrandPreferenceList": "/Sale/BrandPreferenceList.html",
    /*品牌特惠详情页*/
    "BrandPreferenceDetail": "/Sale/BrandPreferenceDetail.html",
    /*优惠卷页*/
    "Coupon_you": "/Coupon_you.html",
    /*编辑优惠券页*/
    "CouponCodes": "/Order/CouponCodes.html",
    /*微公社*/
    "Ichsy": "/Ichsy.html",



    /*账户中心*/
    "AccountIndex": "/Account/index.html",
    /*手机充值*/
    "MobileCZ": "/order/CZ.html",
    /*我的手机充值订单支付*/
    "MyMobileCZOrder_pay": "/order/CZ_Pay.html",
    /*手机充值列表*/
    "MobileCZList": "/Account/MyMobileCZ_Order_List.html",

    /*我的账户中心*/
    "MyAccount": "/Account/MyAccount.html",
    /*我的收藏*/
    "MyCollection": "/Account/MyCollection.html",
    /*我的浏览历史*/
    "MyViewHistory": "/Account/MyViewHistory.html",
    /*我的优惠券页*/
    "MyCoupon": "/Account/MyCoupon.html",
    /*兑换优惠券页*/
    "MyCoupon_DH": "/Account/MyCoupon_DH.html",


    /*我的订单*/
    "MyOrder_List": "/Account/MyOrder_List.html",
    /*我的订单--订单详情*/
    "MyOrder_detail": "/Account/MyOrder_detail.html",
    /*我的订单--订单物流*/
    "MyOrder_List_ckwl": "/Account/MyOrder_List_ckwl.html",
    /*我的订单--订单支付*/
    "MyOrder_pay": "/order/MyOrder_pay.html",
    /*编辑收货地址*/
    "AddressEdit": "/Account/AddressEdit.html",
    /*收货地址列表*/
    "AddressList": "/Account/AddressList.html",
    /*重置密码*/
    "ResetPassword": "/Account/ResetPassword.html",
    /*发票*/
    "fapiao": "/Order/fapiao.html",
    /*惠家有软件许可及服务协议*/
    "xieyi": "/xy.html",
    /*优惠卷使用说明*/
    "shiyongshuoming": "/Coupon_shuoming.html",


    /*领取返现特权-操作*/
    "Lqfxtq_Op": "/LQFX/LQ/Step.html",
    /*领取返现特权-结果*/
    "Lqfxtq_Rs": "/LQFX/Down/Result.html",
    /*扫码购引导页面*/
    "SMG_Index": "/smg/index.html",

};


/*对话框消息提示语**/
var g_const_Message_Tips={
   "ok":"确定",
   "cancel":"取消",
   "back":"返回"
};




/*接口提示信息集合 1 接口返回  9-接口返回错误 8-系统返回错误 7-页面提示错误*/
var g_const_API_Message = {
    "1": "操作成功",
    "934105101": "您还没有注册哦，请注册后再登录",
    "934105102": "账户号码和密码不匹配",
    "8801": "验证码错误",
    "8802": "验证码已过期或者不存在，请重新获取验证码",
    "8803": "验证码发送太频繁，请1小时后再试",
    "8804": "验证码请求太频繁，请稍后再试",
    "8805": "验证码输入错误次数过多，请重新获取验证码",
    "8806": "当日发送验证码已达上限，请明日再试",
    "8901": "您已是注册用户，请直接登录",
    "8902": "您已是注册用户",
    "8903": "图片验证码错误",
    "8904": "请输入图片验证码",
    "7001": "亲，堵车了，请稍后重试哦~",
    "7002": "注册成功.",
    "7003": "密码修改成功.",
    "7801": "已发送短信验证码",
    "7802": "请填写验证码",
    "7901": "请填写手机号码",
    "7902": "请填写正确的手机号码",
    "7903": "请输入密码",
    "7904": "请输入6-16位字符且不能包含空格",
    "100001": "您还没有登录或者已经超时",
    "100002": "系统繁忙,同步购物车失败,请稍后重试.",
    "100003": "收藏添加成功",
    "100004": "删除收藏成功",
    "100005": "地址信息保存成功",
    "100006": "默认地址设定成功",
    "100007": "请填写收货人姓名",
    "100009": "请选择区",
    "100010": "请填写详细地址",
    "100011": "收货人姓名请输入2-10个汉字",
    "100012": "详细地址字数需控制在5-40之间哦",
    "100013": "请输入优惠码",
    "100014": "您目前还没有优惠券.",
    "100015": "您还没有选择要使用的优惠券",
    "100016": "请您输入优惠券兑换码",
    "100017": "优惠券兑换成功",
    "100018": "请您选择发票类型和发票抬头",
    "100019": "请您填写公司名称",
    "100020": "已收到您的建议",
    "100021": "没有更多的猜你喜欢了",
    "100022": "读取猜你喜欢时系统繁忙,请稍后再试",
    "100023": "请填写登录手机号",
    "100024": "请填写登录密码",
    "100025": "登录成功",
    "100026": "没有更多数据了",
    "100027": "请选择要删除的商品",
    "100028": "您已取消本次微信支付，请选择其他方式支付.",
    "100029": "亲，堵车了，请稍后哦~",//"网络连接失败，请重新尝试.",
    "100030": "请填写收货人信息",
    "100031": "请选择支付类型",
    "100032": "推荐人手机号不能为空",
    "100033": "上级设定成功",
    "100034": "密码不能为空",
    "100035": "密码设定成功",
    "100036": "对不起,您选择的商品无货,请您重新选择.",
    "100037": "活动配置有误",
    "100038": "最多保留收货地址数量:",
    "100039": "已达到限购数量，看看其他的商品吧~",
    "100040": "为了保证账户安全，请尽快去“个人中心”设置密码哦~",
    "100041": "请选择省",
    "100042": "请选择市",
    "100043": "数据加载中",
    "100044": "密码格式为6-16不包含空格的字符",
    "100045": "推荐人手机号不能是本人",
    "100046": "已有上级，不能再次添加",
    "108903": "验证码已发至您的手机，马上就能享受返现特权啦！",
    "108904": "只差一步就能享受返现特权啦！",
    "107901": "请输入手机号",
    "107902": "请输入11位有效手机号",
    "107802": "请输入验证码",
    "106001": "海外购商品需要您的身份证！",
    "106002": "已有身份证信息不能删除！",
    "106003": "请您核对身份证信息！",
};

var g_const_BackUrlList = [];

/*页面跳转配置*/
var g_const_PagePathList = [];

/*跳转页面集合*/
var g_const_Phone = {
    /*售后电话*/
    "sh": "400-867-8210",
}

/*验证码倒计时*/
var g_const_ValidCodeTime = 59;
/*产品购买状态*/
var g_const_buyStatus = {
    /*允许购买*/
    YES: 1,
    /*活动未开始*/
    ActNotStart: 2,
    /*活动已结束*/
    ActIsEnd: 3,
    /*活动进行中,但是不可购买*/
    No: 4,
    /*其他状态*/
    Other: 5
};
/*微信分享类型*/
var g_const_wx_share_type = {
    /*音乐*/
    music: "music",
    /*视频*/
    video: "video",
    /*链接*/
    link: "link"
};
/*微信JSAPI接口*/
var g_const_wx_jsapi = {
    /*分享到朋友圈*/
    onMenuShareTimeline: "onMenuShareTimeline",
    /*分享给朋友*/
    onMenuShareAppMessage: "onMenuShareAppMessage",
    /*分享到QQ*/
    onMenuShareQQ: "onMenuShareQQ",
    /*分享到腾讯微博*/
    onMenuShareWeibo: "onMenuShareWeibo",
    /*分享到QQ空间*/
    onMenuShareQZone: "onMenuShareQZone"
};
/*微信JSAPI全部分享方法*/
var g_const_wx_AllShare = g_const_wx_jsapi.onMenuShareAppMessage + "," + g_const_wx_jsapi.onMenuShareQQ + "," + g_const_wx_jsapi.onMenuShareQZone + "," + g_const_wx_jsapi.onMenuShareTimeline + "," + g_const_wx_jsapi.onMenuShareWeibo;
/*品牌专题内容广告位置*/
var g_const_brandLocation = {
    /*头部*/
    Header: 1,
    /*尾部*/
    Footer: 2
};
/*商品状态*/
var g_const_EventProductType = {
    /*闪购*/"Flash": "20150701001",
    /*特价*/"Event": "20150701002"
};
/*订单渠道ID*/
var g_const_ChannelID = "449747430003";
//是否分享
var g_const_shareFlag = {
    YES: "449747110002",
    NO: "449747110001"
};
//分享默认值
var g_const_Share = {
    DefaultTitle: "惠家有购物商城",
    DefaultDesc: "惠家有购物商城",
    DefaultImage: g_goods_Pic
};
//展示平台
var g_const_viewType = {
    //客户端
    APP: "4497471600100001",
    //微信商城
    WXSHOP: "4497471600100002"
};
/*成功码*/
var g_const_Exchange_Code_ZHY = [
    ["30", "摇一摇1,摇一摇2,摇一摇3,摇一摇4,摇一摇5,摇一摇6,摇一摇7,摇一摇8"],
    ["20", "yaoyiyao1"],
    ["10", "yaoyiyao2"]
];

/*扫描购更新时间*/
var g_const_SMG_ChangeDate = "2015-11-23 12:00:00";

var g_const_OrderConfirmRefer = ["product_detail", "cart", "preorderconfirm"];

var g_const_Merchant_Group_Android = "betagroup";
var g_const_Merchant_Group_Ios = "igroup";
var g_const_Merchant_MT = "mt";


/*短信类型*/
var g_const_SMSType = [
    ["saveaddress", "1"],
    ["phonelogin", "2"],
    ["bindmobileandmobilereg", "3"],
    ["phoneregister", "4"],
    ["passwordreset", "5"],
    ["lqfxtq", "6"],
    ["freeusesq", "7"],
    ["couponcodeexchange_jygw", "9"],
    ["couponcodeexchange_xzq", "10"],
    ["couponcodeexchange_xzqsd", "11"],
    ["couponcodeexchange_xzqjs", "12"],
    ["couponcodeexchange_anmyzw", "13"],
    ["couponcodeexchange_ahmyz", "13"],
    ["couponcodeexchange_wy", "8"],
    ["couponcodeexchange_wyt8", "8"],
    ["couponcodeexchange_wyapp", "14"],
    ["couponcodeexchange_wyt8app", "14"],
];
/*短信图片验证码开[1]关[0]*/
var g_const_SMSPic_Flag = 1;
/*引导页 商户号，金额，兑换码，唯一兑换标志（对卡券有效）*/
var g_Exchange_Guide = [
    ["jygw", "客户端\"优惠券\"中输入<br>\"100\"立获100元购物红包", "1", ""],
    ["wy", "下载app 后输入<br>\"摇啊摇\"兑换30元优惠券", "0", "/Act151118/img/guide_yyy_2.png"],
    ["wyt8", "下载app 后输入<br>\"摇啊摇\"兑换30元优惠券", "0", "/Act151118/img/guide_yyy_2.png"],
    ["wyapp", "30元优惠券仅在app使用", "0", "/Act151118/img/guide_yyy_1.png"],
    ["wyt8app", "30元优惠券仅在app使用", "0", "/Act151118/img/guide_yyy_1.png"],
    ["xzq", "客户端“优惠券”中输入<br>\"惠买惠花\"立获30元红包", "1", "/img/w_img/guide_xzq.png"],
    ["xzqsd", "客户端“优惠券”中输入<br>\"惠买惠花\"立获30元红包", "1", "/img/w_img/guide_xzq.png"],
    ["xzqjs", "客户端“优惠券”中输入<br>\"惠买惠花\"立获30元红包", "1", "/img/w_img/guide_xzq.png"],
    ["anmyzw", "客户端“优惠券”中输入<br>\"领红包\"立获30元红包", "1", "/img/w_img/guide_anmyzw.png"],
    ["ahmyz", "客户端“优惠券”中输入<br>\"领红包\"立获30元红包", "1", "/img/w_img/guide_anmyzw.png"],
    ["adks", "", "1", ""],
    ["hjysms", "下载APP 输入<br>\"大礼包\"领取组合购物红包", "1", ""],
];
/*商户活动链接域名*/
var g_merchant_Act_Host = "http://tj.ichsy.com";



var GLOBAL_HTTP_REQUEST_API_KEY="tesefeng";
//请求接口全局配置文件
var token="sfsdfdsfsfsfs",platform="mobile",version="1.0.0"
var URL_UCAR_TEST_LINK="http://api.beta-ucar.ichsy.com/";
var GLOBAL_HTTP_REQUEST_URL=
{
   /***
	 * 首页
	 */
	 HOME_PAGE_INFO : URL_UCAR_TEST_LINK + "home/gethomepageinfo",
	/***
	 * 本接口用于APP应用首页轮询订单状态变化
	 */
	 GET_STATE_CHANGE : URL_UCAR_TEST_LINK + "driving/getstatechange",

	/***
	 * 系统配置接口
	 */
	 GET_START_PAGE : URL_UCAR_TEST_LINK + "config/getstartpage",

	/***
	 * 获取更多热门活动
	 */
	 GET_MORE_HOT_ACTIVITY : URL_UCAR_TEST_LINK + "home/getmorehotactivity",
	/***
	 * 本接口用于APP应用首页更多热门试驾列表
	 */
	 GET_MORE_HOT_DRIVE : URL_UCAR_TEST_LINK + "home/getmorehotdrive",

	/***
	 * 升级接口
	 */

	 GET_APP_UPDATE : URL_UCAR_TEST_LINK + "user/versionappmsg",

	/***
	 * 获取热门品牌更多
	 */
	 GET_BRANDLIST_INOF : URL_UCAR_TEST_LINK + "brand/getbrandlistinfo",
	/***
	 * 获取品牌下面的车系信息
	 */
	 GETC_CARLIST_INFO : URL_UCAR_TEST_LINK + "brand/getcarlistinfo",

	/**
	 * 综述页面
	 */

	 GET_CAR_SERIESDETIALS : URL_UCAR_TEST_LINK + "series/getcarseriesdetails",

	/***
	 * 获取车型报价
	 */
	 GET_CARPRICEINFO : URL_UCAR_TEST_LINK + "style/getcarpriceinfo",

	/***
	 * 获取预约试驾
	 */
	 GET_TEST_DRIVER_INFO : URL_UCAR_TEST_LINK + "driving/gettestdriverinfo",
	/***
	 * 成功试驾评论
	 */
	 EVALUATETESTR : URL_UCAR_TEST_LINK + "driving/evaluatetestcarorder",

	/***
	 * 取消订单提示框接口
	 */
	 GET_PROMPT : URL_UCAR_TEST_LINK + "driving/getprompt",
	/***
	 * 取消订单
	 */
	 Operate_Order : URL_UCAR_TEST_LINK + "driving/operateorder",

	/***
	 * 提交预约试驾接口
	 */
	 UPDATE_TEST_DRIVER_INFO : URL_UCAR_TEST_LINK + "driving/uploadtestdriverinfo",

	/***
	 * 提交邀请好友
	 */
	 UPLOAD_CHOOSE_CAR_INFO : URL_UCAR_TEST_LINK + "friend/uploadchoosecarsinfo",

	/***
	 * 1.13 获取可用支付类型
	 */
	 GET_PAY_TYPE : URL_UCAR_TEST_LINK + "/driving/getPayType",

	/***
	 * 1.14 提交支付选项
	 */

	 PAY_FOR_ORDER : URL_UCAR_TEST_LINK + "/user/payfororder",

	/***
	 * 收藏接口
	 */
	 UPLOADCOLLECTINFO : URL_UCAR_TEST_LINK + "user/uploadcollectinfo",

	/***
	 * 提交开始试驾接口 http://api.ucar.ichsy.cn/driver/startdriver
	 */
	 STARTTESTDRIVER : URL_UCAR_TEST_LINK + "driver/startdriver",
	/***
	 * 1.8 获取购车界面数据
	 */
	 GET_FREE_CAR_INFO : URL_UCAR_TEST_LINK + "free/getfreecarinfo",
	/***
	 * getUserAppealInfo
	 */
	 GET_USER_APPEARINFO : URL_UCAR_TEST_LINK + "driving/getuserappealinfo",
	/***
	 * 用于提供试驾模式里面未开始订单页面进入的乘客问题页面提交信息
	 */
	 UPLOAD_USER_APPEARINFO : URL_UCAR_TEST_LINK + "driving/uploaduserappealinfo"


};
