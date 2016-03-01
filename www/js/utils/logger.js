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
