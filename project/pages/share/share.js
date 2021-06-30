var t = getApp(),
    e = t.requirejs("core"),
     w = t.requirejs("wxParse/wxParse");

t.requirejs("foxui");
Page({
    data: {
        icons: t.requirejs("icons"),
        loading: !1,
        loaded: !1,
        broker:[],
        list: [],
        cid: '',
        isShow:1,
        title:'',
        see: !1,
        mid:0,
        member:[],
        show:0,
    },
    onLoad: function(a) {
        var st = this;
        
        console.log(a);
        var et = decodeURIComponent(a.scene);
        if (!a.id && et) {
            var n = e.str2Obj(et);//str2Obj --> e.requirejs("core"),
            a.id = n.id, a.mid && (a.mid = n.mid, t.setCache("usermid", n));// setCache--> e = getApp()
        }
        st.setData({
            cid: a.id,
            mid:a.mid
        });
        t.url(a), this.getList();
    },

    onShow: function () {
        //e.checkAuth();
        // console.log("aaaaaaaaaaaaaaaaaaaaa");
       
        var a = this;

        getApp().globalData.hasChatNoReader && wx.showTabBarRedDot({
            index: 2
        }); 

        this.getInfo();

    },
    getInfo: function () {
        var ts = this;
        //获得登录用户个人信息
        e.get("member", {
            mid: this.data.mid
        }, function (a) {
            // console.log(a);
            1 == a.isblack && wx.showModal({
                title: "无法访问",
                content: "系统升级中，不能访问！",
                success: function (a) {
                    a.confirm && e.close(), a.cancel && e.close();
                }
            }), ts.setData({
                member: a,
                show: !0,
            }), w.wxParse("wxParseData", "html", a.copyright, e, "5");
        });
    },

    getList: function() {
        var t = this;
        t.setData({
            loading: !0
        }), e.get("noticeApi/get_webview", {
           
            cid: t.data.cid
           
        }, function(e) {
            
            console.log(e)    
            var a = {
               
                broker:e.broker,
                list:e.list,
                show: !0,
                
            };
             t.setData(a);

             console.log(t.data.broker)    

        });
    },
    callBroker: function () {
        if (this.data.broker.mobile) {
            var t = this.data.broker.mobile,
                a = t.split(",");
            a[1] ? wx.showModal({
                title: "提示",
                content: "请在语音提示后拨分机号\r\n" + a[1].split("#")[0] + "﹟",
                success: function (t) {
                    t.confirm && wx.makePhoneCall({
                        phoneNumber: a[0]
                    });
                }
            }) : wx.makePhoneCall({
                phoneNumber: t
            });
        }
    },
    handleGoDetail: function (t) {
        var a = t.currentTarget.dataset.userid;
        var b = t.currentTarget.dataset.adid;
        var c = t.currentTarget.dataset.houseid;
        // wx.navigateTo({
        //     url: '/house/guwen/gw-detail/index?userid=' + a + '&adid=' + b + '&houseid=' + c,
        // })
        wx.navigateTo({
            url: '/project/pages/chat/chat?userid=' + a + '&adid=' + b,
        })
    },
    sharePoster: function() {
        console.log(111)
        wx.navigateTo({
            url: "/project/pages/news/poster/poster?id=" + this.data.cid
        });
    },
     /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
      var st = this;
     
      st.setData({
        diytitle:st.data.list.title
    });

      var t = null, at = null;
      return this.data.diytitle && (t = '/project/pages/share/share?id='+st.data.cid, at = this.data.diytitle), 
      e.onShareAppMessage(t, at);

     
  },
   
     
});