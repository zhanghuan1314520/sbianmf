
function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}
var e = getApp(), t = e.requirejs("core");
Page({
    data: {
        member:{},
        status: !0,

    },
    onLoad: function(a) {
        
        var st=this;
        
        st.setData({
            cid:a.cid
        });
    },
    onShow: function() {
        this.getUserInfo(), this.getInfo();
    },
    getInfo: function () {
        var e = this;
        t.get("member", {}, function (a) {         
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
            });
        });
    },
  
    _input: function (dt) {
        var e = dt.currentTarget.dataset.name, o = dt.detail.value;
        this.setData(a({}, e, o));
    },

    previewImage: function (t) {
        var a = t.currentTarget.dataset.url, e = [];
        "dingyue" == t.currentTarget.dataset.type ? e.push(a) : e = this.data.huxing.photos,
            wx.previewImage({
                current: a,
                urls: e
            });
    },
    copyText: function (e) {
        wx.setClipboardData({
            data: e.currentTarget.dataset.text,
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        setTimeout(function () {
                            // 获取 chart 实例的方式
                            a.alert("手边买房微信号已复制,快去添加好友，拉群讨论吧！");
                        }, 100);

                    }
                })
            }
        })
    },
    typeChange: function (a) {
        var periodd  = a.currentTarget.dataset.period;
        this.setData({
            period: periodd
        });
    },
    foucs4: function() {
        this.setData({
            focus4: !0
        });
    },
    jumpServiceUrl: function() {
        this.acRedirectUrlHandler("https://mp.weixin.qq.com/s/Rcy5gvUtIFWo2nL2Xjv2xg"), 
        e.redirectTo({
            url: "/subPackages/webView/webView"
        });
    }
});