var e = getApp(),
    t = require("./../../../utils/core.js"),
    chat= require("./../../../utils/chat/mimc.js");

Page({
    data: {
        close: 0,
        text: "",
        imgUrl: "",
        hasUserInfo: false,
        canIUseGetUserProfile: false,
    },
    onLoad: function(t) {
        this.setData({
            close: '',
            text: '',
            imgUrl: e.globalData.approot
        });

        if (wx.getUserProfile) {
            this.setData({
              canIUseGetUserProfile: true
            })
          }
    

    },
    onShow: function() {
        var t = e.getCache("sysset").shopname;
        wx.setNavigationBarTitle({
            title: t || "提示"
        });

    },
    bind: function() {
        var e = this,
            t = setInterval(function() {
                wx.getSetting({
                    success: function(n) {
                        var a = n.authSetting["scope.userInfo"];
                        a && (wx.reLaunch({
                            url: "/dfpage/index/index"
                        }), clearInterval(t), e.setData({
                            userInfo: a
                        }));
                    }
                });
            }, 1e3);
    },
    getUserProfile: function(a) {
     
        console.log(a);

        let code = '';
        wx.showLoading({
            title: "加载中..."
        }),wx.login({
            success: function(a) {
              console.log('wx.login');    
                console.log(a)
                code=a.code
               
            },//
            fail: function() {
                wx.hideLoading(),t.alert("获取用户信息失败!");
            }
        });


        var a = e.getCache("routeData"),
        i = a.url,
        s = a.params,
        o = "";
        console.log(s)       
     
        Object.keys(s).forEach(function(e) {
            o += e + "=" + s[e] + "&";
        });

        var c = "/" + i + "?" + (s = o.substring(0, o.length - 1));


        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (n) => {
                console.log(n);
              this.setData({
                hasUserInfo: true
              })


          t.post("wxapp/login", {
            code: code
        }, function(a) {
          console.log('xapp/login');    
          console.log(a);
            a.error ? t.alert("获取用户登录态失败:" + a.message) : t.get("wxapp/auth", {
                data: n.encryptedData,
                iv: n.iv,
                sessionKey: a.session_key,
                openId:a.openid//n.encryptedData中无值，新版本，传入参数
            }, function(t) {
             
              console.log('xapp/auth');    
                console.log(t);
                //n.detail.userInfo
                wx.hideLoading(), 1 == t.isblack && wx.showModal({
                        title: "无法访问",
                        content: "系统升级中，不能访问！",
                        success: function(t) {
                            t.confirm && e.close(), t.cancel && e.close();
                        }
                    }), getApp().globalData.userInfo=t,n.userInfo.openid = t.openId, n.userInfo.id = t.id, n.userInfo.uniacid = t.uniacid,
                    e.setCache("userinfo", t), e.setCache("userinfo_openid", n.userInfo.openid),
                    e.setCache("userinfo_id", t.id), e.getSet(),chat.init(e);
                    console.log("auth:启动聊天"); wx.reLaunch({
                        url: c
                    });
            });
        });


            },
            fail: function() {
                wx.hideLoading(),t.alert("获取用户信息失败!");
            }
          })

      
    },
    bindGetUserInfo: function(n) {
     

        var a = e.getCache("routeData"),
            i = a.url,
            s = a.params,
            o = "";       
         
        Object.keys(s).forEach(function(e) {
            o += e + "=" + s[e] + "&";
        });
    
        var c = "/" + i + "?" + (s = o.substring(0, o.length - 1));
     
        wx.showLoading({
            title: "加载中..."
        }),wx.login({
            success: function(a) {
                t.post("wxapp/login", {
                    code: a.code
                }, function(a) {
                    a.error ? t.alert("获取用户登录态失败:" + a.message) : t.get("wxapp/auth", {
                        data: n.detail.encryptedData,
                        iv: n.detail.iv,
                        sessionKey: a.session_key
                    }, function(t) {
                        console.log(n);
                        console.log(t);
                        //n.detail.userInfo
                        wx.hideLoading(), 1 == t.isblack && wx.showModal({
                                title: "无法访问",
                                content: "系统升级中，不能访问！",
                                success: function(t) {
                                    t.confirm && e.close(), t.cancel && e.close();
                                }
                            }), getApp().globalData.userInfo=t,n.detail.userInfo.openid = t.openId, n.detail.userInfo.id = t.id, n.detail.userInfo.uniacid = t.uniacid,
                            e.setCache("userinfo", t), e.setCache("userinfo_openid", n.detail.userInfo.openid),
                            e.setCache("userinfo_id", t.id), e.getSet(),chat.init(e);
                            console.log("auth:启动聊天"); wx.reLaunch({
                                url: c
                            });
                    });
                });
            },
            fail: function() {
                wx.hideLoading(),t.alert("获取用户信息失败!");
            }
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading();


        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
    },
});