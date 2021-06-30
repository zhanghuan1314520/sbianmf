var  e = getApp();

Page({
    data: {
        navConf: {
            title: "我的名片",
            isHome: !0,
            isBack: !0,
            isTitle: !0
        },
        statusH: e.globalData.statusH,
        isIpx: !!e.globalData.isIpx,
        data: {}
    },
    onLoad: function(e) {
        var n = this;
        console.log("options", e), this.id = e && e.id || 29, this.setData({
            url: t.api.zygw + "?action_name=wxGetShareImg&&id=" + this.id
        }), wx.setStorageSync("url", a.getCurrentPageUrlWithArgs()), t.islogin().then(function(t) {
            wx.removeStorageSync("url"), n.getData();
        });
    },
    onShow: function() {},
    _saveImg: function() {
        var a = t.api.zygw + "?action_name=wxGetShareImg&&id=" + this.id;
        console.log("上传图片1:",a);
        var e = this;
        wx.showToast({
            title: "保存中...",
            icon: "loading",
            duration: 2e3
        }), wx.getImageInfo({
            src: a,
            success: function(t) {
                console.log(t.path), e.savePhone(t.path);
            },
            fail: function(t) {
                console.log(t);
            },
            complete: function() {}
        });
    },
    savePhone: function(t) {
        wx.saveImageToPhotosAlbum({
            filePath: t,
            success: function(t) {
                console.log(t), e.toast("保存成功");
            },
            fail: function(t) {
                console.log(t);
            },
            complete: function() {
                wx.hideToast();
            }
        });
    },
    handleCall: function(t) {
        var a = t.currentTarget.dataset.phone;
        a && wx.makePhoneCall({
            phoneNumber: a
        });
    },
    _copy: function(t) {
        var a = t.currentTarget.dataset.wx;
        wx.setClipboardData({
            data: a,
            success: function(t) {
                e.toast("复制成功");
            }
        });
    },
    previewImage: function(t) {
        var a = t.currentTarget.dataset.url, e = [];
        e.push(a), wx.previewImage({
            current: a,
            urls: e
        });
    },
    handleGo: function(t) {
        var a = t.currentTarget.dataset.go;
        wx.navigateTo({
            url: a
        });
    },
    getData: function() {
        var a = this;
        wx.showLoading({
            title: "加载中"
        }), t.req.post(t.api.zygw, {
            action_name: "wxZygwDetail",
            id: a.id
        }).then(function(t) {
            var e = t.data;
            console.log("return", e), 0 == e.ret ? a.setData({
                data: e.data
            }) : wx.showToast({
                title: e.msg,
                icon: "success"
            });
        }, function(t) {
            console.log(t);
        }).then(function() {
            wx.hideLoading();
        });
    },
    hasData: function() {
        var t = 0 == this.data.list.length;
        this.setData({
            initIn: t
        });
    },
    onShareAppMessage: function(t) {
        var a = e.share();
        return a.title = "你好，我是[" + this.data.data.HouseName + "]楼盘置业顾问[" + this.data.data.UserName + "]", 
        a.path = "/pages/guwen/gw-detail/index?id=" + this.data.data.Id, e.wxShare(function(t) {
            setTimeout(function() {
                e.toast("+" + t.score + "积分");
            }, 2e3);
        }), a;
    }
});