// dfpage/test/index.js
var e = getApp(),
      a = e.requirejs("core"),
      t = e.requirejs("wxParse/wxParse"),
      i = e.requirejs("biz/diypage"),
      o = e.requirejs("jquery");
Page({

      /**
       * 页面的初始数据
       */
      data: {
            userid: '',
            adid: '',
            houseid: '',
            isguanzhu: 0,
            member: {},
            mid: 0,
            isIpx: e.globalData.isIpx,
            userinfo: {},

            page: 1,
            pagesize: 10,
            list: [],
             

      },
      /**
         * 用户点击右上角分享
         */
      onShareAppMessage: function () {
            var st = this;
            var a = st.data.userid;
            var b = st.data.adid;
            var c = st.data.houseid;

            return {
                  title: '',
                  path: '/house/guwen/gw-detail/index?userid=' + a + '&adid=' + b + '&houseid=' + c,
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
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (dt) {
            //console.log(dt);
            var st = this;
            st.setData({
                  houseid: dt.houseid
            });

      },

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function () {

      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {
            e.checkAuth();

            var t = this,
                  a = wx.getSystemInfoSync();
            this.getInfo(), t.get_gwlistdetail(), wx.getSetting({
                  success: function (a) {
                        var e = a.authSetting["scope.userInfo"];
                        t.setData({
                              anum: e
                        });
                  }
            });
      },
      getInfo: function () {
            var e = this;
            a.get("member", {
                  mid: this.data.mid
            }, function (a) {
                  //console.log(a);
                  1 == a.isblack && wx.showModal({
                        title: "无法访问",
                        content: "系统升级中，不能访问！",
                        success: function (a) {
                              a.confirm && e.close(), a.cancel && e.close();
                        }
                  }), 0 != a.error ? wx.redirectTo({
                        url: "/pages/message/auth/index"
                  }) : e.setData({
                        member: a,
                        show: !0,
                        iscycelbuy: a.iscycelbuy,
                        bargain: a.bargain
                  }), t.wxParse("wxParseData", "html", a.copyright, e, "5");
            });
      },
      get_gwlistdetail: function () {
            var t = this;
            //console.log(t.data.page);
            a.get("chatApi/gwlistdetail", {
                  houseid: t.data.houseid,
                  page: t.data.page,
            }, function (e) {
                  // t.setData({
                   //     infoList: a.list
                  //})
                  console.log(e);
                  var a = {
                        loading: !1,
                        loaded: !0,
                        total: e.total,
                        pagesize: e.pagesize,
                        show: !0
                  };
                  e.list.length > 0 && (a.page = t.data.page + 1, a.list = t.data.list.concat(e.list),
                        e.list.length < e.pagesize && (a.loaded = !0)), t.setData(a);
            });
      },

      onReachBottom: function () {
           // console.log(11111);
            this.data.loaded || this.data.list.length == this.data.total;
            wx.showLoading({
                  title: '玩命加载中',
            })
            var t = this;
            t.get_gwlistdetail();
            wx.hideLoading();
      },
      onPullDownRefresh: function () {
            wx.stopPullDownRefresh();
      },
      handleGo: function (a) {
            var t = a.currentTarget.dataset.go;
            t ? wx.navigateTo({
                  url: t
            }) : wx.showToast({
                  title: "持续开发中..."
            });
      },
      handleCall: function (t) {
            var a = t.currentTarget.dataset.phone;
            a && wx.makePhoneCall({
                  phoneNumber: a
            });
      },
      _addZygw: function (dt) {

            wx.setClipboardData({
                  data: dt.currentTarget.dataset.id,
                  success: function (res) {
                        wx.getClipboardData({
                              success: function (res) {
                                    setTimeout(function () {
                                          // 获取 chart 实例的方式
                                          a.alert("经纪人微信号已复制,去添加好友吧！");
                                    }, 100);

                              }
                        })
                  }
            })
      },
      _tabs: function (a) {
            var t = a.currentTarget.dataset.index;
            this.setData({
                  tab: t,
                  page: 1,
                  list: []
            });

            console.log(t);
      },


      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: function () {
      },

      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload: function () {

      },

    

 

})