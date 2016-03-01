(function() {
  var loadJs = function(src) {
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = src;
    oHead.appendChild(oScript);
  }
})();
