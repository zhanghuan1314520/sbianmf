var e = getApp(),
    a = e.requirejs("core"),
    base64Instance = require("../../utils/chat/Base64.js"),
    ut = require("../../utils/formatTime/index.js"),

    that;

Page({
    data: {
        navH: e.globalData.navH,
        concatList: null,
        pageNo: 1,
        limit: 20,
        allow: !0,
        stationMessage: null,
        userInfo: null,
        show: !1,
    },

    onLoad: function (t) {
        var st = this;
        st.getChatuserForm();
        // a.get("chatApi/getAccessToken", {}, function (r) {
        //     console.log(r);
        // });

    },
    onShow: function (a) {
        wx.hideTabBarRedDot({
            index: 2
        });
    },
    getChatuserForm: function () {
        var st = this;

        a.get("chatApi/chatUserForm", {}, function (ut) {
            console.log(ut.data);
            st.setData({
                show: !0
            }), st.setData({              
                userInfo: ut.data.user,
                concatList: st.fomartConcatList(e.globalData.concatList)
            }, function () {
                st.observe(e.globalData, "concatList", function (se) {
                    st.setData({
                        show: !0,
                        concatList: st.fomartConcatList(e.globalData.concatList)
                    });
                });
            }); //, st.init(ut.data)


        });
    },
    init: function (dt) {
        //console.log(e.globalData.userInfo);

        this.getContactList();
    },

    ringMe: function (t) {
        wx.requestSubscribeMessage({
            tmplIds: ['crEtxdGFqt4uiVghpVoAZ03zTTWY5gZAOBm2JP2WCyU'], // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
            success(res) {
                console.log(res);
                console.log('已授权接收订阅消息')
            }
        });
    },

    getTemplateMessageId: function () {

        // var e = this,
        //     s = a.globalData.templateIds && a.globalData.templateIds.CustomerConsultationNoticeId;
        var e = this,
            s = 'crEtxdGFqt4uiVghpVoAZ03zTTWY5gZAOBm2JP2WCyU' && a.globalData.templateIds.CustomerConsultationNoticeId;
        if (!s) return a.getTemplateIds().then(function () {
            var s = a.globalData.templateIds && a.globalData.templateIds.CustomerConsultationNoticeId;
            if (s) return t.wxToast("系统出错,请稍后再试");
            e.postMessage(s);
        });
        this.postMessage(s);
    },
    postMessage: function (dt) {
        wx.requestSubscribeMessage ? wx.requestSubscribeMessage({
            tmplIds: ['crEtxdGFqt4uiVghpVoAZ03zTTWY5gZAOBm2JP2WCyU'],
            success: function (dt) {
                console.log("success: ", dt), a.get("chatApi/subscription", {
                    MessageType: 6,
                    SourceId: 'onvhnwl6ioOW6sMcigFSkGeaXGdo'
                }, function (t) {
                    console.log(t);
                    wx.showToast({
                        icon: "none",
                        title: '订阅成功！',
                        duration: 2e3
                    });
                })
                setTimeout(function () {
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
                console.log("err: ", e);
                setTimeout(function () {
                    wx.showModal({
                        title: "提示",
                        content: "订阅消息，及时获得回复通知。请先点击订阅消息，然后勾选提示。",
                        confirmText: "去订阅",
                        success: function (e) {
                            e.confirm && wx.openSetting();
                        }
                    });
                }, 300)
            }
        }) : a.toast("请升级微信版本，确保订阅成功");
    },


    getContactList: function (t) {
        console.log("读取消息列表！！！！！！！");
        var o = this;
        wx.request({
            url: "https://mimc.chat.xiaomi.net/api/contact/v2",
            header: {
                token: e.globalData.mimcUser.getToken()
            },
            data: {
                msgExtraFlag: !0
            },
            complete: function () {
                wx.hideLoading(), o.setData({
                    show: !1,
                });
            },
            success: function (e) {
                if (200 === e.statusCode) {
                    o.setData({
                        userInfo: o.data.userInfo,
                        concatList: o.fomartConcatList(e.data.data.contacts)
                    });
                }
            }
        });
    },


    fomartConcatList: function (e) {
        var a = this;
        //console.log(e);
        // console.log("测试中",a.data.userInfo.msgid);

        return e.map(function (e) {
        
            e.time = a.formatChatTime(parseInt(e.timestamp));
            try {
                e._payload = JSON.parse(base64Instance.decode(e.lastMessage.payload));
            } catch (e) {
                return console.error("解析聊天内容体时失败: ", e), {
                    _payload: {
                        isFiltered: !0
                    }
                };
            }
            var t = e._payload.payload ? e._payload.payload.length : "";
            t % 4 == 0 && (e._payload.payload = e._payload.payload.replace(/==?$/, ""), t = e._payload.payload.length);
            try {
                e._payload.payload = decodeURIComponent(base64Instance.decode(e._payload.payload));
            } catch (e) {
                console.error("解析聊天内容时失败: ", e);
            }

            return e._payload.type = e._payload.msgId.indexOf("TEXT") > -1 ? 1 : 2, e._payload.targetName = decodeURIComponent(e._payload.targetName),
                e._payload.userName = decodeURIComponent(e._payload.userName), e._payload.targetBuildingName = e._payload.targetBuildingName ? "-" + decodeURIComponent(e._payload.targetBuildingName) : "",
                e._payload.buildingName = e._payload.buildingName ? "-" + decodeURIComponent(e._payload.buildingName) : "",
                e;

        }).filter(function (e) {
            return !e._payload.isFiltered;
        });

    },


    fomartConcatList_bak_1: function () {
        var t = this,
            e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).map(function (e) {
                e.time = t.formatChatTime(parseInt(e.timestamp));
                try {
                    e._payload = JSON.parse(base64Instance.decode(e.lastMessage.payload));
                } catch (t) {
                    return console.error("解析聊天内容体时失败: ", t), {
                        _payload: {
                            isFiltered: !0
                        }
                    };
                }
                var a = e._payload.payload ? e._payload.payload.length : "";
                a % 4 == 0 && (e._payload.content = e._payload.payload.replace(/==?$/, ""), a = e._payload.payload.length);
                try {
                    e._payload.payload = decodeURIComponent(base64Instance.decode(e._payload.payload));
                } catch (t) {
                    console.error("解析聊天内容时失败: ", t);
                }
                return e._payload.type = e._payload.msgId.indexOf("TEXT") > -1 ? 1 : 2, e._payload.targetName = decodeURIComponent(e._payload.targetName),
                    e._payload.userName = decodeURIComponent(e._payload.userName), e._payload.targetBuildingName = e._payload.targetBuildingName ? decodeURIComponent(e._payload.targetBuildingName) : "",
                    e._payload.buildingName = e._payload.buildingName ? decodeURIComponent(e._payload.buildingName) : "",
                    e.lastMessage.msgExtra || e.lastMessage.fromAccount == getApp().globalData.userInfo.id || t.setData({
                        "navMenuList[0].hasNewMessage": !0
                    }), e;
            }).filter(function (t) {
                return !t._payload.isFiltered;
            });
        return this.resetRingMeData(e);
    },
    resetRingMeData_bak_1: function (t) {
        var e = this,
            n = t || this.data.concatList;
        if (n) {
            if (n.map(function (t) {
                    if (t.lastMessage) {
                        var n = getApp().globalData.userInfo.id === t.lastMessage.fromAccount;

                    }
                }), t) return t;
            this.setData({
                concatList: n
            });
        }
    },
    formatChatTime: function (e, t) {
        var o = new Date(),
            n = o.getFullYear(),
            i = o.getMonth() + 1,
            s = o.getDate();
        if (t && Math.abs(t - e) < 6e4) return "";
        var r = new Date(e),
            l = r.getFullYear(),
            c = r.getMonth() + 1,
            g = r.getDate(),
            d = r.getHours(),
            u = r.getMinutes(),
            p = s - g,
            m = ut.fixPrefixion(d) + ":" + ut.fixPrefixion(u),
            f = ut.fixPrefixion(c) + "." + ut.fixPrefixion(g);
        return n == l ? s == g && i == c ? "" + m : s != g ? i == c ? 1 == p ? "昨天 " + m : f + " " + m : ut.getMaxDate(c) + s - g < 2 ? "昨天" + m : f + " " + m : f + " " + m : f + " " + m;
    },
    formatArticleTime: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return t = t.replace(/-/g, "/"), t = e(t), (t = t.replace(/\//g, ".")).split(" ")[0] || "";
    },
    observe: function (e, t, r) {
        var n = e[t];
        Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !0,
            set: function (e) {
                n = e, r && r(e, n);
            },
            get: function () {
                return n;
            }
        });
    },
    goChat: function (e) {
        var t = e.currentTarget.dataset.id;

        wx.navigateTo({
            url: "/project/pages/chat/chat?userid=" + t
        });
    },
});