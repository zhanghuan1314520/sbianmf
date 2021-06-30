var t = getApp(),
    e = t.requirejs("core");

t.requirejs("foxui");
Page({
    data: {
        icons: t.requirejs("icons"),
     
        loading: !1,
        loaded: !1,
      
        list: [],
        weburl: '',
      
        title:'',
        see: !1
    },
    onLoad: function(e) {
        var st = this;
        var weburl = decodeURIComponent(e.weburl);
        st.setData({
            weburl: weburl
        });
     
    },
     

    
     /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
      var st = this;
      console.log(st.data.list.title);
      return {
          title:'',
          path: '/pages/webview/index?weburl='+st.data.weburl,//
          success: function (res) {
              // 转发成功
              console.log("转发失败!!");
          },
          fail: function (res) {
              // 转发失败
              console.log("转发失败!!");
          }
      }
  },
   
     
});