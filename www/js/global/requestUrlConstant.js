var GLOBAL_HTTP_REQUEST_API_KEY = "tesefeng";
//请求接口全局配置文件
var token = "sfsdfdsfsfsfs",
  platform = "mobile",
  version = "1.0.0"
var API_URL = "data/";
var GLOBAL_HTTP_REQUEST_URL = {
  /***
   * 首页
   */
  HOME_PAGE_INFO: API_URL + "shandong.json",
  /***
   * 获取商品列表
   */
  GET_PRODUCT_LIST: API_URL + "product.json",
  /***
   * 系统配置接口
   */
  GET_START_PAGE: API_URL + "config/getstartpage",

  /***
   * 获取更多热门活动
   */
  GET_MORE_HOT_ACTIVITY: API_URL + "home/getmorehotactivity",
  /***
   * 本接口用于APP应用首页更多热门试驾列表
   */
  GET_MORE_HOT_DRIVE: API_URL + "home/getmorehotdrive",

  /***
   * 升级接口
   */

  GET_APP_UPDATE: API_URL + "user/versionappmsg",

  /***
   * 获取热门品牌更多
   */
  GET_BRANDLIST_INOF: API_URL + "brand/getbrandlistinfo",
  /***
   * 获取品牌下面的车系信息
   */
  GETC_CARLIST_INFO: API_URL + "brand/getcarlistinfo",

  /**
   * 综述页面
   */

  GET_CAR_SERIESDETIALS: API_URL + "series/getcarseriesdetails",

  /***
   * 获取车型报价
   */
  GET_CARPRICEINFO: API_URL + "style/getcarpriceinfo",

  /***
   * 获取预约试驾
   */
  GET_TEST_DRIVER_INFO: API_URL + "driving/gettestdriverinfo",
  /***
   * 成功试驾评论
   */
  EVALUATETESTR: API_URL + "driving/evaluatetestcarorder",

  /***
   * 取消订单提示框接口
   */
  GET_PROMPT: API_URL + "driving/getprompt",
  /***
   * 取消订单
   */
  Operate_Order: API_URL + "driving/operateorder",

  /***
   * 提交预约试驾接口
   */
  UPDATE_TEST_DRIVER_INFO: API_URL + "driving/uploadtestdriverinfo",

  /***
   * 提交邀请好友
   */
  UPLOAD_CHOOSE_CAR_INFO: API_URL + "friend/uploadchoosecarsinfo",

  /***
   * 1.13 获取可用支付类型
   */
  GET_PAY_TYPE: API_URL + "/driving/getPayType",

  /***
   * 1.14 提交支付选项
   */

  PAY_FOR_ORDER: API_URL + "/user/payfororder",

  /***
   * 收藏接口
   */
  UPLOADCOLLECTINFO: API_URL + "user/uploadcollectinfo",

  /***
   * 提交开始试驾接口 http://api.ucar.ichsy.cn/driver/startdriver
   */
  STARTTESTDRIVER: API_URL + "driver/startdriver",
  /***
   * 1.8 获取购车界面数据
   */
  GET_FREE_CAR_INFO: API_URL + "free/getfreecarinfo",
  /***
   * getUserAppealInfo
   */
  GET_USER_APPEARINFO: API_URL + "driving/getuserappealinfo",
  /***
   * 用于提供试驾模式里面未开始订单页面进入的乘客问题页面提交信息
   */
  UPLOAD_USER_APPEARINFO: API_URL + "driving/uploaduserappealinfo"


};
