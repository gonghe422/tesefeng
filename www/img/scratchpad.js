/*
 * 这是一张 JavaScript 代码草稿纸。
 *
 * 输入一些 JavaScript，然后可点击右键或从“执行”菜单中选择：
 * 1. 运行 对选中的文本求值(eval) (Cmd-R)；
 * 2. 查看 对返回值使用对象查看器 (Cmd-I)；
 * 3. 显示 在选中内容后面以注释的形式插入返回的结果。 (Cmd-L)
 */
var utils = (function() {

        var me = {};

        //判断当前浏览器是否支持sqlite数据库
        me.isUseDatabase = window.openDatabase ? true : false;
  
        me.is=function(){
          if me.isUseDatabase()
            {
              console.log("yes");
            }
          else
            console.log("error");
        };
       return me;
})();


alert(utils.isUseDatabase);
