//index.js
//获取应用实例

var e = getApp(),
  a = e.requirejs("core"),
  base64Instance = require("../../../utils/chat/Base64.js"),
  ut = require("../../../utils/formatTime/index.js"),
  rr = require("../../../utils/chat/chat.js");
Page({
  data: {
    navH: e.globalData.navH,
    isIpx: e.globalData.isIpx,
    contentH: e.globalData.screenHeight - e.globalData.navH,
    brokerCardStatus: 1,
    chatHandlerStatus: 0,
    canLoadMore: !1,
    loadingMore: !1,
    messageList: [],
    limit: 10,
    user: null,
    commonList: null,

    chuser: null,
    userid: "",
    target: "",
    sendtext: '',
    userInfo: null,
    userInfoTo: null,
    houseInfo: null,
    broker: null,
    houseid: 0,
    communityId:0
  },


  onUnload: function () {
    
    //console.log("chat.js-------onUnload/");
    //this.data.chuser.logout();
    if(getApp().globalData.userInfo.id){
    this.data.chuser.registerServerAckHandler(e.globalData.mimc.serverAck), this.data.chuser.registerP2PMsgHandler(e.globalData.mimc.receiveP2PMsg);
    }
  },

  onLoad: function (dt) {
    e.checkAuth();
    var st = this;
    console.log(dt.userid, dt.adid, dt.houseid,dt.cid);
    this.getChatuserInfo(dt.userid, function (d) {
      console.log(d);
      st.setData({
        houseid: dt.houseid,
        communityId: dt.cid,
        chuser: e.globalData.mimcUser,
        userInfo: d.user,
        userInfoTo: d.touser,
        broker: d.broker,
        commonList: d.user.organization == '' ? rr.common_user : rr.common_broker,
      }), e.globalData.hasChatLogin ? st.init() : st.observe(e.globalData, "hasChatLogin", function (t) {
        t && st.setData({
          chuser: o.globalData.mimcUser
        }, function () {
          //console.log("chat.js hasChatLogin",e.globalData.hasChatLogin);
          st.init();
        });
      });
    });

  },
  getCommunityInfo: function () {
    var st=this,i = this.data.communityId;
    i && a.get("chatApi/chatCommunityInfo", {
      cid: this.data.communityId
    }, function (t) { 

      var n='楼盘',i = st.data.userInfo.avatar,
        r = st.data.userInfoTo.avatar,
        s = st.data.userInfoTo.nickname,
        l = st.data.userInfo.nickname,
        c = st.data.userInfo.organization,
        u = st.data.userInfoTo.organization,
        d = st.data.messageList || [],
        m = new Date().getTime();

      d.push({
        sequence: "temp_seq_" + m,
        ts: m,
        fromAccount: st.data.userInfo.msgid,
        toAccount: st.data.userInfoTo.msgid,
        bizType: "COMMUNITY",
        loading: !0,
        _payLoad: {
          timestamp: m,
          content: n,
          avatarUrl: i,
          houseTitle: t.data.title.substring(0, 10)+'...',
          houseModel: t.data.model,
          houseSale: t.data.sale,
          houseArea: t.data.area,
          houseImage: t.data.house_img,
          houseId: t.data.cid,
          time: st.formatChatTime(m, d.length > 0 ? d[d.length - 1].ts : null)
        }
      }), st.setData({
        messageList: d,
        inputContent: "",
        chatHandlerStatus: 0,
        keyBoardH: 0
      }, function () {
        st.scrollPageToBottom(), n = encodeURIComponent(n), st.sendMsg({
          msg: n,
          bizType: "COMMUNITY",
          avatarUrl: i,
          targetAvatarUrl: r,
          targetName: s,
          userName: l,
          buildingName: c,
          targetBuildingName: u,
          toUser: st.data.userInfoTo.msgid,
          fromUser: st.data.userInfo.msgid,

          houseTitle: t.data.title.substring(0, 10)+'...',
          houseModel: t.data.model,
          houseSale: t.data.sale,
          houseArea: t.data.area,
          houseImage: t.data.house_img,
          houseId: t.data.cid,
        });
      });
      
    })
  },
  getHouseInfo: function () {
    var st=this,i = this.data.houseid;
    i && a.get("chatApi/chatHouseInfo", {
      cid: this.data.houseid
    }, function (t) {
       var n='房源',i = st.data.userInfo.avatar,
        r = st.data.userInfoTo.avatar,
        s = st.data.userInfoTo.nickname,
        l = st.data.userInfo.nickname,
        c = st.data.userInfo.organization,
        u = st.data.userInfoTo.organization,
        d = st.data.messageList || [],
        m = new Date().getTime();

      d.push({
        sequence: "temp_seq_" + m,
        ts: m,
        fromAccount: st.data.userInfo.msgid,
        toAccount: st.data.userInfoTo.msgid,
        bizType: "HOME",
        loading: !0,
        _payLoad: {
          timestamp: m,
          content: n,
          avatarUrl: i,
          houseTitle: t.data.title.substring(0, 10)+'...',
          houseModel: t.data.model,
          houseSale: t.data.sale,
          houseArea: t.data.area,
          houseImage: t.data.house_img.replace("x-oss-process=style/", "").split('||')[0],
          houseId: t.data.cid,
          time: st.formatChatTime(m, d.length > 0 ? d[d.length - 1].ts : null)
        }
      }), st.setData({
        messageList: d,
        inputContent: "",
        chatHandlerStatus: 0,
        keyBoardH: 0
      }, function () {
        st.scrollPageToBottom(), n = encodeURIComponent(n), st.sendMsg({
          msg: n,
          bizType: "HOME",
          avatarUrl: i,
          targetAvatarUrl: r,
          targetName: s,
          userName: l,
          buildingName: c,
          targetBuildingName: u,
          toUser: st.data.userInfoTo.msgid,
          fromUser: st.data.userInfo.msgid,

          houseTitle: t.data.title.substring(0, 10)+'...',
          houseModel: t.data.model,
          houseSale: t.data.sale,
          houseArea: t.data.area,
          houseImage: t.data.house_img.replace("x-oss-process=style/", "").split('||')[0],
          houseId: t.data.cid,
        });
      });
      
    })
  },
  init: function () {
    var t = this;
    //chuser = e.globalData.mimcUser;
    t.data.chuser.registerServerAckHandler(t.serverAck),
      t.data.chuser.registerP2PMsgHandler(t.receiveP2PMsg), t.getRecordMsg(), t.getHouseInfo(),t.getCommunityInfo();
  },

  getRecordMsg: function (st) {
    var a = this;

    console.log("读取历史聊天记录"),
      wx.showLoading({
        title: "加载中.."
      }), st = st || {}, wx.request({
        url: "https://mimc.chat.xiaomi.net/api/msg/p2p/queryOnCount/",
        method: "POST",
        header: {
          token: a.data.chuser.getToken()
        },
        data: {
          fromAccount: this.data.userInfo.msgid,
          toAccount: this.data.userInfoTo.msgid,
          utcToTime: st.utcToTime || new Date().getTime(),
          count: this.data.limit
        },
        complete: function () {
          wx.hideLoading();
        },
        success: function (t) {
          console.log(t);
          200 === t.statusCode && a.getRecordMsg_extra(t.data, st);
        }
      });
  },
  getRecordMsg_extra(i, st) {
    console.log(i);
    var a = this;
    if (wx.hideLoading(), 200 === i.code && i.data) {
      var r = i.data.messages || [],
        s = {},
        l = !1;
      var c = r.map(function (t, e) {
        //console.log(decodeURIComponent(base64Instance.decode(t.payload)));
        return t._payLoad = JSON.parse(base64Instance.decode(t.payload)),
          t._payLoad.content = decodeURIComponent(base64Instance.decode(t._payLoad.payload)), t._payLoad.time = a.formatChatTime(1 * t._payLoad.timestamp || t.ts, e > 0 ? r[e - 1].ts : null),
          "READ" !== t.extra && t.toAccount === getApp().globalData.userInfo.id && (console.log("进行了extra更新"),
            s[t.sequence] = 'READ', !l && (l = !0)), t;
      });

      l && wx.request({
          url: "https://mimc.chat.xiaomi.net/api/msg/p2p/extra/multiupdate",
          method: "POST",
          header: {
            token: a.data.chuser.getToken()
          },
          data: {
            fromAccount: this.data.userInfoTo.msgid,
            toAccount: this.data.userInfo.msgid,
            sequenceExtraMap: s
          },
          success: function (t) {
            e.globalData.mimc.getContactList();
          }
        }),
        a.setData({
          canLoadMore: r.length === a.data.limit,
          loadingMore: !1,
          messageList: c.concat(a.data.messageList || [])
        }, function () {
          st.notNeedScrollToBottom ? wx.pageScrollTo({
            scrollTop: a.data.canLoadMore ? 50 : 0
          }) : (a.scrollPageToBottom(), a.setData({
            messageListInit: !0
          }));
        });
    } else a.setData({
      chatHandlerStatus: 2
    });
  },
  sendCommonMsg: function (t) {
    var a = t.currentTarget.dataset.index,
      e = this.data.commonList[a];
    this.setData({
      inputContent: e
    });
    this.sendMessage();
  },
  sendMessage: function (t) {
    var a = this,
      n = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null) || this.data.inputContent;

    if ("" !== a.trim(n)) {
      var i = this.data.userInfo.avatar,
        r = this.data.userInfoTo.avatar,
        s = this.data.userInfoTo.nickname,
        l = this.data.userInfo.nickname,
        c = this.data.userInfo.organization,
        u = this.data.userInfoTo.organization,
        d = this.data.messageList || [],
        m = new Date().getTime();

      d.push({
        sequence: "temp_seq_" + m,
        ts: m,
        fromAccount: this.data.userInfo.msgid,
        toAccount: this.data.userInfoTo.msgid,
        bizType: "TEXT",
        loading: !0,
        _payLoad: {
          timestamp: m,
          content: n,
          avatarUrl: i,
          time: this.formatChatTime(m, d.length > 0 ? d[d.length - 1].ts : null)
        }
      }), this.setData({
        messageList: d,
        inputContent: "",
        chatHandlerStatus: 0,
        keyBoardH: 0
      }, function () {
        a.scrollPageToBottom(), n = encodeURIComponent(n), this.sendMsg({
          msg: n,
          bizType: "TEXT",
          avatarUrl: i,
          targetAvatarUrl: r,
          targetName: s,
          userName: l,
          buildingName: c,
          targetBuildingName: u,
          toUser: a.data.userInfoTo.msgid,
          fromUser: a.data.userInfo.msgid
        });
      });
    } else this.setData({
      inputContent: "",
      keyBoardH: 0
    });
  },
  sendMsg: function (t) {

    if (t.msg) {
      var n = t.fromUser,
        i = t.toUser,
        c = t.msg,
        r = base64Instance.encode(c),
        s = new Date().getTime(),
        l = t.bizType || "TEXT",
        g = String(JSON.stringify({
          avatarUrl: t.avatarUrl || "",
          userName: t.userName || "",
          targetAvatarUrl: t.targetAvatarUrl || "",
          targetName: t.targetName || "",
          buildingName: t.buildingName || "",
          targetBuildingName: t.targetBuildingName || "",

          houseTitle: t.houseTitle || "",
          houseModel: t.houseModel || "",
          houseSale: t.houseSale || "",
          houseArea: t.houseArea || "",
          houseImage: t.houseImage || "",
          houseId: t.houseId || "",

          msgId: (t.bizType || "TEXT") + "_" + s,
          timestamp: s,
          payload: r
        }));
      this.data.chuser.sendMessage(i, g, t.bizType);
      //chuser.sendMessage(i, g);
    }

  },

  receiveP2PMsg: function (message) {

    var st = this;
    var a = message.getSequence(),
      i = message.getFromAccount(),
      r = this.data.userInfo.msgid,
      s = message.getBizType(),
      l = message.getTimeStamp(),
      c = message.getPayload();

    if (i === this.data.userInfoTo.msgid) {
      wx.request({
        url: "https://mimc.chat.xiaomi.net/api/msg/p2p/extra/update",
        method: "POST",
        header: {
          token: e.globalData.mimcUser.getToken()
        },
        data: {
          sequence: a,
          fromAccount: i,
          toAccount: r,
          extra: "READ"
        },
        success: function (t) {

        }
      });
      var u = this.data.messageList,
        d = {
          sequence: a,
          payload: c,
          ts: l,
          fromAccount: i,
          toAccount: r,
          bizType: s,
          extra: "READ"
        };
      d._payLoad = JSON.parse(c), d._payLoad.content = decodeURIComponent(base64Instance.decode(d._payLoad.payload)), d._payLoad.time = this.formatChatTime(d._payLoad.timestamp, 1 * u[u.length - 1].ts);
      u.push(d), this.setData({
        messageList: u
      }, function () {
        this.scrollPageToBottom();
      });
      e.globalData.mimc.getContactList();
    }
    // return;
  },
  // 接收单聊消息回调
  disconnect: function () {
    //console.log("chat.js---------disconnect"),
    this.data.chuser.logout(), this.data.chuser.login();
  },
  logout: function () {
    //console.log("chat.js---------logout");
    this.data.chuser.logout();
  },
  // 发送消息后，服务器接收到消息ack的回调
  serverAck: function (t, a, es, n) {

    for (var i = this.data.messageList, r = i.length - 1; r >= 0; r--)
      if (i[r].loading) {
        var s = {};
        s["messageList[" + r + "].loading"] = !1, this.setData(s);
      }
    e.globalData.mimc.getContactList();
  },

  getChatuserInfo: function (userid, n) {
    console.log("userid:",userid);
    a.get("chatApi/chatUserinfo", {
      userid: userid
    }, function (t) {
      n(t.data)
    })

  },
  chooseImageFromAlbum: function () {

    var st = this;
    a.upload(function (t) {
      var n = t.url,
        i = st.data.userInfo.avatar,
        r = st.data.userInfoTo.avatar,
        s = st.data.userInfoTo.nickname,
        l = st.data.userInfo.nickname,
        c = st.data.userInfo.organization,
        u = st.data.userInfoTo.organization,
        d = st.data.messageList || [],
        m = new Date().getTime();

      d.push({
        sequence: "temp_seq_" + m,
        ts: m,
        fromAccount: st.data.userInfo.msgid,
        toAccount: st.data.userInfoTo.msgid,
        bizType: "IMAGE",
        loading: !0,
        _payLoad: {
          timestamp: m,
          content: n,
          avatarUrl: i,
          time: st.formatChatTime(m, d.length > 0 ? d[d.length - 1].ts : null)
        }
      }), st.setData({
        messageList: d,
        inputContent: "",
        chatHandlerStatus: 0,
        keyBoardH: 0
      }, function () {
        st.scrollPageToBottom(), n = encodeURIComponent(n), st.sendMsg({
          msg: n,
          bizType: "IMAGE",
          avatarUrl: i,
          targetAvatarUrl: r,
          targetName: s,
          userName: l,
          buildingName: c,
          targetBuildingName: u,
          toUser: st.data.userInfoTo.msgid,
          fromUser: st.data.userInfo.msgid
        });
      });


    });
  },
  chooseImageFromCamera: function () {
    var st = this;
    a.uploadCamera(function (t) {
      var n = t.url,
        i = st.data.userInfo.avatar,
        r = st.data.userInfoTo.avatar,
        s = st.data.userInfoTo.nickname,
        l = st.data.userInfo.nickname,
        c = st.data.userInfo.organization,
        u = st.data.userInfoTo.organization,
        d = st.data.messageList || [],
        m = new Date().getTime();

      d.push({
        sequence: "temp_seq_" + m,
        ts: m,
        fromAccount: st.data.userInfo.msgid,
        toAccount: st.data.userInfoTo.msgid,
        bizType: "IMAGE",
        loading: !0,
        _payLoad: {
          timestamp: m,
          content: n,
          avatarUrl: i,
          time: st.formatChatTime(m, d.length > 0 ? d[d.length - 1].ts : null)
        }
      }), st.setData({
        messageList: d,
        inputContent: "",
        chatHandlerStatus: 0,
        keyBoardH: 0
      }, function () {
        st.scrollPageToBottom(), n = encodeURIComponent(n), st.sendMsg({
          msg: n,
          bizType: "IMAGE",
          avatarUrl: i,
          targetAvatarUrl: r,
          targetName: s,
          userName: l,
          buildingName: c,
          targetBuildingName: u,
          toUser: st.data.userInfoTo.msgid,
          fromUser: st.data.userInfo.msgid
        });
      });


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
copyWechat: function () {
  this.promisify(wx.setClipboardData)({
      data: this.data.broker.wxname
  }).then(function () {
      wx.showToast({
          title: "微信号已复制"
      });
  });
},
  checkImage: function (t) {
    var a = t.currentTarget.dataset.url;
    "" !== a ? wx.previewImage({
      urls: [a]
    }) : e.wxToast("啊哦，图片找不到了哦～");
  },
  promisify: function (e) {
    return function (t) {
      return new Promise(function (r, n) {
        t = Object.assign({
          success: r,
          fail: n
        }, t), e(t);
      });
    };
  },
  toggleChatHandler: function (t) {
    var a = parseInt(t.currentTarget.dataset.type),
      e = this.data.chatHandlerStatus;
    this.setData({
      chatHandlerStatus: a == e ? 0 : a,
      keyBoardH: 0
    });
  },
  onFocus: function (t) {
    this.setData({
      chatHandlerStatus: 0,
      keyBoardH: t.detail.height
    });
  },
  onBlur: function (t) {
    this.setData({
      keyBoardH: 0
    });
  },
  inputing: function (t) {
    this.setData({
      inputContent: t.detail.value
    });
  },

  formatChatTime: function (t, a) {
    var o = new Date(),
      n = o.getFullYear(),
      i = o.getMonth() + 1,
      r = o.getDate();
    if (a && Math.abs(a - t) < 6e4) return "";
    var s = new Date(t),
      l = s.getFullYear(),
      c = s.getMonth() + 1,
      u = s.getDate(),
      d = s.getHours(),
      m = s.getMinutes(),
      g = r - u,
      h = ut.fixPrefixion(d) + ":" + ut.fixPrefixion(m),
      f = ut.fixPrefixion(c) + "." + ut.fixPrefixion(u);
    return n == l ? r == u && i == c ? "" + h : r != u ? i == c ? 1 == g ? "昨天 " + h : f + " " + h : ut.getMaxDate(c) + r - u < 2 ? "昨天" + h : f + " " + h : f + " " + h : f + " " + h;
  },
  trim: function (e) {
    return "string" != typeof e ? "" : e.replace(/^\s+|\s+$/gm, "");
  },
  scrollPageToBottom: function () {
    wx.pageScrollTo({
      scrollTop: 1e5,
      duration: 0
    });
  },
  handleGoT: function(a) {
    var t = a.currentTarget.dataset.go;
    t ? wx.navigateTo({
        url: t
    }) : wx.showToast({
        title: "持续开发中..."
    });
},
  //划动屏幕
  onPageScroll: function (t) {
    var a = this.data,
      e = a.loadingMore,
      o = a.canLoadMore;
    !e && o && t.scrollTop < 25 && this.data.messageListInit && (this.setData({
      loadingMore: !0
    }), this.getRecordMsg({
      utcToTime: this.data.messageList[0].ts,
      notNeedScrollToBottom: !0
    }));
  },
  toggleBrokerStatus: function () {
    var t = this.data.brokerCardStatus;
    this.setData({
      brokerCardStatus: !t
    });
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
  _window: function () {
    // 默认
    var _window = {
      navigator: {
        userAgent: "mimc-uniapp/1.0",
        appName: "xiaomi",
        appVersion: "1.0"
      }
    }
    return _window
  },
})