var e = getApp(), t = e.requirejs("core"), a = e.requirejs("wxParse/wxParse"), i = e.requirejs("biz/diypage"), s = e.requirejs("jquery");
var m= e.requirejs("core");
Page({
    data: {
        route: "member",
        icons: e.requirejs("icons"),
        member: {},
        diypages: {},
        audios: {},
        audiosObj: {},
        modelShow: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        swiperheight: 0,
        iscycelbuy: !1,
        bargain: !1,
        result: {}
    },
    onLoad: function(t) {
        this.setData({
            options: t
        });

        var et = decodeURIComponent(t.scene);
        if (!t.id && et) {
            var n = m.str2Obj(et); //str2Obj --> e.requirejs("core"),
            t.id = n.id, n.mid && (t.mid = n.mid, e.setCache("usermid", n)); // setCache--> e = getApp()
        } 
        e.url(t);

    },
    getInfo: function() {
        var e = this;
        t.get("member", {}, function(t) {      
                
            1 == t.isblack && wx.showModal({
                title: "无法访问",
                content: "系统升级中，不能访问！",
                success: function(t) {
                    t.confirm && e.close(), t.cancel && e.close();
                }
            }), e.setData({
                member: t,
                show: !0,
                customer: t.customer,
                customercolor: t.customercolor || "",
                phone: t.phone,
                phonecolor: t.phonecolor || "",
                phonenumber: t.phonenumber || "",
                iscycelbuy: t.iscycelbuy,
                bargain: t.bargain
            }), a.wxParse("wxParseData", "html", t.copyright, e, "5");
        });
    },
    onShow: function() {
        //e.checkAuth();
        var t = this;
        
        getApp().globalData.hasChatNoReader && wx.showTabBarRedDot({
            index: 2
        });
        this.getInfo(), wx.getSystemInfo({
            success: function(e) {
                var a = e.windowWidth / 1.7;
                t.setData({
                    windowWidth: e.windowWidth,
                    windowHeight: e.windowHeight,
                    swiperheight: a
                });
            }
        }), t.setData({
            imgUrl: e.globalData.approot
        }), i.get(this, "member", function(e) {});
    },
    tiaozhuan:function(){
        e.checkAuth();
    },
    qudaao:function(){
        t.get("datafang/islogin", {}, function (dt) {
            //t.alert(dt.islogin);
            if (dt.islogin =='no') {
                return void t.alert("不能申请代理");
            } else {              
                wx.redirectTo({
                    url: "/pages/transfer/commission/index"
                });
                
            }
        });

    },
    onShareAppMessage: function() {
        return t.onShareAppMessage();
    },
    imagesHeight: function(e) {
        var t = e.detail.width, a = e.detail.height, i = e.target.dataset.type, s = this;
        wx.getSystemInfo({
            success: function(e) {
                s.data.result[i] = e.windowWidth / t * a, (!s.data[i] || s.data[i] && result[i] < s.data[i]) && s.setData({
                    result: s.data.result
                });
            }
        });
    },
    cancelclick: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    confirmclick: function() {
        wx.openSetting({
            success: function(e) {}
        });
    },
    phone: function() {
        var e = this.data.phonenumber + "";
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    play: function(e) {
        var t = e.target.dataset.id, a = this.data.audiosObj[t] || !1;
        if (!a) {
            a = wx.createInnerAudioContext("audio_" + t);
            var i = this.data.audiosObj;
            i[t] = a, this.setData({
                audiosObj: i
            });
        }
        var s = this;
        a.onPlay(function() {
            var e = setInterval(function() {
                var i = a.currentTime / a.duration * 100 + "%", r = Math.floor(Math.ceil(a.currentTime) / 60), n = (Math.ceil(a.currentTime) % 60 / 100).toFixed(2).slice(-2), o = Math.ceil(a.currentTime);
                r < 10 && (r = "0" + r);
                var u = r + ":" + n, c = s.data.audios;
                c[t].audiowidth = i, c[t].Time = e, c[t].audiotime = u, c[t].seconds = o, s.setData({
                    audios: c
                });
            }, 1e3);
        });
        var r = e.currentTarget.dataset.audio, n = e.currentTarget.dataset.time, o = e.currentTarget.dataset.pausestop, u = e.currentTarget.dataset.loopplay;
        0 == u && a.onEnded(function(e) {
            c[t].status = !1, s.setData({
                audios: c
            });
        });
        var c = s.data.audios;
        c[t] || (c[t] = {}), a.paused && 0 == n ? (a.src = r, a.play(), 1 == u && (a.loop = !0), 
        c[t].status = !0, s.pauseOther(t)) : a.paused && n > 0 ? (a.play(), 0 == o ? a.seek(n) : a.seek(0), 
        c[t].status = !0, s.pauseOther(t)) : (a.pause(), c[t].status = !1), s.setData({
            audios: c
        });
    },
    pauseOther: function(e) {
        var t = this;
        s.each(this.data.audiosObj, function(a, i) {
            if (a != e) {
                i.pause();
                var s = t.data.audios;
                s[a] && (s[a].status = !1, t.setData({
                    audios: s
                }));
            }
        });
    },
    onHide: function() {
        this.pauseOther();
    },
    onUnload: function() {
        this.pauseOther();
    },
    navigate: function(e) {
        var t = e.currentTarget.dataset.url, a = e.currentTarget.dataset.phone, i = e.currentTarget.dataset.appid, s = e.currentTarget.dataset.appurl;
        t && wx.navigateTo({
            url: t,
            fail: function() {
                wx.switchTab({
                    url: t
                });
            }
        }), a && wx.makePhoneCall({
            phoneNumber: a
        }), i && wx.navigateToMiniProgram({
            appId: i,
            path: s
        });
    },
    close: function() {
        e.globalDataClose.flag = !0, wx.reLaunch({
            url: "/pages/message/auth/index"
        });
    },
    requestGetPhone: function(a, i) {
        t.post("wxapp/getmobile", {
            encryptedData: a.detail.encryptedData,
            iv: a.detail.iv,
            sessionkey: i
        }, function(a) {
            if ("" == a) return wx.login({
                success: function(a) {
                    t.post("wxapp/login", {
                        code: a.code
                    }, function(a) {
                        a.error ? t.alert("获取用户登录态失败:" + a.message) : e.setCache("login_session_key", a.session_key);
                    });
                },
                fail: function() {
                    t.alert("获取用户手机号信息失败!");
                },
                complete: function() {
                    wx.hideLoading();
                }
            }), void t.alert("手机号走丢了！请重新获取。");
            wx.hideLoading(), wx.navigateTo({
                url: "/pages/member/bind/new_index?mobile=" + a
            });
        });
    },
    getPhoneNumber: function(a) {
        var i = this;
        a.detail.iv && (wx.showLoading({
            title: "加载中"
        }), wx.checkSession({
            success: function() {
                var t = e.getCache("login_session_key");
                console.log("sessionKey:" + t), i.requestGetPhone(a, t);
            },
            fail: function() {
                wx.login({
                    success: function(n) {
                        t.post("wxapp/login", {
                            code: n.code
                        }, function(n) {
                            n.error ? t.alert("获取用户登录态失败:" + n.message) : (e.setCache("login_session_key", n.session_key), 
                            i.requestGetPhone(a, n.session_key));
                        });
                    },
                    fail: function() {
                        t.alert("获取用户手机号信息失败!");
                    },
                    complete: function() {
                        wx.hideLoading();
                    }
                });
            }
        }));
    }
});