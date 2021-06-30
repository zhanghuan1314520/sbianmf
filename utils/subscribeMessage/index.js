var e = require("../../config.js"),
    t = require("../utils/core.js"),
    n = function (n, o, i) {
        return new Promise(function (r, u) {
            wx.requestSubscribeMessage ? wx.requestSubscribeMessage({
                tmplIds: [n],
                success: function (n) {
                    if (Object.keys(n).filter(function (e) {
                            return "accept" === n[e];
                        }).length) return a.get("chatApi/subscription", {
                        MessageType: o,
                        SourceId: i
                    }, function (t) {
                        console.log(t);
                    }).then(function () {
                        r(), s("订阅成功");
                    });


                    u(), setTimeout(function () {
                        wx.showModal({
                            title: "提示",
                            content: "订阅消息，及时获得提问通知。请先点击订阅消息，然后勾选提示。",
                            confirmText: "去订阅",
                            success: function (e) {
                                e.confirm && wx.openSetting();
                            }
                        });
                    }, 300);
                },
                fail: function (e) {
                    setTimeout(function () {
                        wx.showModal({
                            title: "提示",
                            content: "订阅消息，及时获得回复通知。请先点击订阅消息，然后勾选提示。",
                            confirmText: "去订阅",
                            success: function (e) {
                                e.confirm && wx.openSetting();
                            }
                        });
                    }, 300), u();
                }
            }) : (s("微信暂不支持此版本订阅，或请升级微信版本试试！"), u());
        });
    },
    s = function (e) {
        return wx.showToast({
            icon: "none",
            title: e,
            duration: 2e3
        });
    };

module.exports = {
    getTemplateMessageId: function (e, t) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            i = getApp();
        return new Promise(function (r, u) {
            var a = i.globalData.templateIds && i.globalData.templateIds[t];
            if (!a) return i.getTemplateIds().then(function () {
                var u = i.globalData.templateIds && i.globalData.templateIds[t];
                u || s("系统出错,请稍后再试"), r(n(u, e, o));
            });
            r(n(a, e, o));
        });
    }
};