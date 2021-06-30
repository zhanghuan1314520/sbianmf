var m,t = getApp(),
    e = t.requirejs("core"),
    a = t.requirejs("core");
 

t.requirejs("foxui");
Page({
    data: {
        icons: t.requirejs("icons"),
        list: [],
        page: 1,
        loading: !1,
        loaded: !1,
        market:[],
        member:{},
        mid:0,
        chengjiao:[],
        diytitle:'',
    },
    onLoad: function (dt) {
        var st = this;
        //判断页面来源
        let pages = getCurrentPages()
        if (pages.length < 2) {
            st.setData({
                isShare: !0
            });
        }
        st.setData({
        
            mid: dt.mid

        });

         //分享锁粉
        var et = decodeURIComponent(dt.scene);
        if (!dt.id && et) {
            var n = a.str2Obj(et); //str2Obj --> e.requirejs("core"),
            dt.id = n.id, n.mid && (dt.mid = n.mid, t.setCache("usermid", n)); // setCache--> e = getApp()
        }   
        t.url(dt);

        console.log(dt)
    },
    onShow: function() {
       t.checkAuth()
        var ts = this,
            a = wx.getSystemInfoSync();

            1 == ts.setData({
                list: [],
                page: 1,
                loading: !1
            });

        this.pn_getlogin(),this.getInfo(), ts.get_list(),ts.get_market(), wx.getSetting({
            success: function(a) {
                var e = a.authSetting["scope.userInfo"];
                ts.setData({
                    anum: e
                });
            }
        }), m = wx.createMapContext("map");
    },
    
    getInfo: function() {
        var ts = this;
        e.get("member", {
            mid: this.data.mid
        }, function(a) {

            1 == a.isblack && wx.showModal({
                title: "无法访问",
                content: "系统升级中，不能访问！",
                success: function(a) {
                    a.confirm && e.close(), a.cancel && e.close();
                }
            }), 0 != a.error ? wx.redirectTo({
                url: "/pages/message/auth/index"
            }) : ts.setData({
                member: a,
                show: !0,
                iscycelbuy: a.iscycelbuy,
                bargain: a.bargain
            });
        });
    },
    pn_getlogin:function(){
        var st=this;
        wx.login({
            success: function (aa) {
                e.post("wxapp/login", {
                    code: aa.code
                }, function (dt) {                   
                    st.setData({
                        puserinfo:dt
                    })
                     
                });
            },
            fail: function () {
            a.alert("获取用户信息失败!");
            }
        });
    },
    pn_getPhoneNumber: function (ed) {

        var msg = ed.detail.errMsg,that = this;
        var encryptedDataStr = ed.detail.encryptedData,iv = ed.detail.iv,sessionID=that.data.puserinfo.session_key,pn_openid=that.data.puserinfo.openid;
     
        if (msg == 'getPhoneNumber:ok') {
            wx.checkSession({
                success: function () {                  
                    that.pn_deciyption(pn_openid,sessionID, encryptedDataStr, iv);
                },
                fail: function () {    
                    wx.login({
                            success: function (aa) {
                                e.post("wxapp/login", {
                                    code: aa.code
                                }, function (dt) {                          
                                    dt.error ? e.alert("获取用户登录态失败:" + dt.message) :that.pn_deciyption(pn_openid,dt.session_key,ed.detail.encryptedData,iv);
                                });
                            },
                            fail: function () {
                            e.alert("获取用户信息失败!");
                            }
                        });
                    }
                });        
        }
   
    },
    pn_deciyption: function (pn_openid,sessionID, encryptedDataStr, iv) {
        var ts=this;
        e.get("wxapp/authBindphone", {
            data: encryptedDataStr,
            iv: iv,
            sessionKey: sessionID,
            pn_openid:pn_openid
        }, function (dt) {                        
            //console.log(dt.phoneNumber); 
            if(!dt.error){ 
                ts.getInfo();
            }else{
                e.alert("网络异常，请重新获取！");
             }
           
        });
    },
    //刷新
    onRefresh(){
        //在当前页面显示导航条加载动画
        wx.showNavigationBarLoading(); 
        //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
        wx.showLoading({
          title: '刷新中...',
        })
        var ts=this;

        1 == ts.setData({
            list: [],
            page: 1,
            loading: !1
        });

        ts.get_list(),ts.get_market();
      },
   
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        //调用刷新时将执行的方法
    	this.onRefresh();
    },
    onReachBottom: function () {
        this.data.loaded || this.data.list.length == this.data.total;
        wx.showLoading({
            title: '玩命加载中',
        })
        var t = this;


        t.get_list();
        wx.hideLoading();

        //this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },

    handleSwitch: function (d) {
        var t = this;

        1 == t.setData({
          
            list: [],
            page: 1,
            loading: !1
        });

        this.get_list();

    },
    // 获取列表数据
    get_list: function () {
        var t = this;
        t.setData({
            loading: !0
        }), e.get("member.favorite_xiaoqu.get_list", {
            page: t.data.page
        }, function (e) {
            console.log("e", e)
            console.log("e2", e.list)
            console.log("长度", e.list.length)
            var a = {
                loading: !1,
                loaded: !0,
                total: e.total,
                pagesize: e.pagesize,
                show: !0
            };
            e.list.length > 0 && (a.page = t.data.page + 1, a.list = t.data.list.concat(e.list),
                e.list.length < e.pagesize && (a.loaded = !0)), t.setData(a);
             //隐藏loading 提示框
           wx.hideLoading();
           //隐藏导航条加载动画
           wx.hideNavigationBarLoading();
           //停止下拉刷新
           wx.stopPullDownRefresh();

        });
    },
    get_market: function () {
        var t = this;
        t.setData({
            loading: !0
        }), e.get("member.favorite_xiaoqu.get_market", {
            
        }, function (e) {
            console.log("market", e)
            console.log("market2", e.today)
            var a = {
                market: e.today,
                chengjiao: e.chengjiao
            };
           t.setData(a);
          
        });
    },
    add: function () {
        wx.navigateTo({
            url: '/pages/member/favorite_xiaoqu/favorite_xiaoqu',
        })
    },
    house: function () {
        wx.navigateTo({
            url: '/house/market/index',
        }) 
    },goxuequ: function () {
        wx.navigateTo({
            url: '/school/school_map/index',
        })
    },
    daily: function () {
        wx.navigateTo({
            url: '/house/dealday/index',
        })
    },
    house_list:function(e){
        console.log("e",e)
        var cid = e.currentTarget.dataset.cid;
        console.log("cid",cid)
        wx.navigateTo({
          url: '/house/community/index?cid='+cid
        // url: '/house/community/index'
        })
    },
    select:function(){
            wx.navigateTo({
                url: '/house/searchHouse/index',
            })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var st = this;

        st.setData({
            diytitle:'杭州学区地图查询房源每日成交报告'
        });

        var t = null, at = null;
        return this.data.diytitle && (t = "/dfpage/select/select", at = this.data.diytitle), 
        e.onShareAppMessage(t, at);

    },
});