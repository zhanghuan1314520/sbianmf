/**
 * 该js文件是根据 mimc-webjs-sdk/demo/demo.html 修改而成
 */
import Base64 from './Base64.js';
import MIMCUser from './mimc-min.1.0.2_fix.js';

var user = null;
module.exports = {
	appId: '2882303761518360311',
	appKey: '5871836013311',
	appSecret: 'o2MkoZpmConfiQWCohMW2g==',
	appAccount: '',


	init: function (t) {

		var a = this;
	 
		if (t.globalData.userInfo.id&&!t.globalData.hasChatLogin) {
		 
			this.app = t, this.appAccount = t.globalData.userInfo.id, this.fetchMIMCToken(function (e) {
				var o = new MIMCUser(a.appId, a.appAccount, a._window());
				o.registerFetchToken(function () {
						return e;
					}), o.registerStatusChange(a.statusChange), o.registerServerAckHandler(a.serverAck),
					o.registerP2PMsgHandler(a.receiveP2PMsg), o.registerDisconnHandler(a.disconnect),
					o.login(), t.globalData.mimcUser = o, t.globalData.mimc = a;

			});
		}
	},
	fetchMIMCToken: function (t) {
		var o = getApp();

		var a = this;
		var _data = String(JSON.stringify({
			appId: a.appId || "",
			appKey: a.appKey || "",
			appSecret: a.appSecret || "",
			appAccount: a.appAccount
		}));
		return wx.request({
			"url": "https://mimc.chat.xiaomi.net/api/account/token",
			"method": "POST",
			"header": {
				"content-type": "application/json"
			},
			"data": _data,
			success: (p) => {
				//console.log("鉴权返回结果：", p.data);
				t && t(p.data);

			}
		})
	},
	statusChange: function (t, a, e, s) {
		var o = getApp();
		if (t) {
			console.log('登录成功'); //, o.globalData.hasChatLogin
			o.globalData.mimc.getContactList(), o.globalData.hasChatLogin = !0;
		} else console.log("login failed.errReason=" + e + ",errDesc=" + s + ",errType=" + a);
		return;
	},

	receiveP2PMsg: function (message) {
		getApp().globalData.mimc.getContactList();
	},
	getContactList: function (t) {
		var a = getApp();

		return wx.request({
			url: "https://mimc.chat.xiaomi.net/api/contact/v2",
			header: {
				token: a.globalData.mimcUser.getToken()
			},
			data: {
				msgExtraFlag: !0
			},
			complete: function () {
				wx.hideLoading();
			},
			success: function (e) {
				if (200 === e.statusCode) {

					var n = e.data.data && e.data.data.contacts || [],
						i = !1;
					n.forEach(function (t) {
						if (!t.lastMessage.msgExtra && t.lastMessage.fromAccount !== a.globalData.userInfo.id && !i) {
							var e = !1;
							try {
								t._payload = JSON.parse(Base64.decode(t.lastMessage.payload));

							} catch (t) {
								console.error("解析聊天内容体时失败: ", t), e = !0;
							}
							if (!e) {
								var n = t._payload.payload ? t._payload.payload.length : "";
								n % 4 == 0 && (t._payload.payload = t._payload.payload.replace(/==?$/, ""), n = t._payload.payload.length),
									n % 4 == 1 || /[^+a-zA-Z0-9/]/.test(t._payload.payload) || (console.log("来未读消息啦"),
										i = !0), i = !0;
							}
						}
					}), i && wx.showTabBarRedDot({
						index: 2
					}),a.globalData.hasChatNoReader = i, a.globalData.concatList = n, t && t(e.data);
				}
			}
		});
	},
	// 接收单聊消息回调
	disconnect: function () {
		console.log("mimc.js------------------disconnect");
		var t = getApp();
		
		t.globalData.hasChatLogin = !1,t.globalData.mimcUser.logout(), setTimeout(function () {
			t.globalData.mimc.init(t);
		}, 1e3);
	},
	logout: function () {
		console.log("mimc.js------------------logout");
		getApp().globalData.mimcUser.logout();
	},
	serverAck: function () {}, // 发送消息后，服务器接收到消息ack的回调
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
	}



};