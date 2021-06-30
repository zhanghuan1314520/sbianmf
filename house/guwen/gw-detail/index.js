// dfpage/test/index.js
var e = getApp(),
    a = e.requirejs("core"),
    t = e.requirejs("wxParse/wxParse"),
    i = e.requirejs("biz/diypage"),
    o = e.requirejs("jquery");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userid: '',
        adid:'',
        houseid:'',
        isguanzhu:0,
        member: {},
        mid: 0,
        isIpx: e.globalData.isIpx,
        userinfo:{},
        loupanlist:{}

    },
    /**
       * 用户点击右上角分享
       */
    onShareAppMessage: function () {
        var st = this;
        var a = st.data.userid;
        var b = st.data.adid;
        var c = st.data.houseid;
     
        return {
            title: '',
            path: '/house/guwen/gw-detail/index?userid=' + a + '&adid=' + b + '&houseid=' + c,
            success: function (res) {
                // 转发成功
                console.log("转发失败!!");
            },
            fail: function (res) {
                // 转发失败
                console.log("转发失败!!");
            }
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (dt) {  
        //console.log(dt);
        var st=this;
        st.setData({
            userid: dt.userid,
            adid:dt.adid,
            houseid:dt.houseid
        });      
         
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        e.checkAuth();

        var t = this,
            a = wx.getSystemInfoSync();
        this.getInfo(), t.get_gwdetail(), wx.getSetting({
            success: function (a) {
                var e = a.authSetting["scope.userInfo"];
                t.setData({
                    anum: e
                });
            }
        });
    },
    getInfo: function () {
        var e = this;
        a.get("member", {
            mid: this.data.mid
        }, function (a) {
            //console.log(a);
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
            }), t.wxParse("wxParseData", "html", a.copyright, e, "5");
        });
    },
    get_gwdetail:function () {
        var t = this;

        a.get("DatafangcopyExt/gwdetail", {
            userid: t.data.userid,
            adid:t.data.adid,
            houseid:t.data.houseid
        }, function (a) {            
            t.setData({
                userinfo: a.detail,
                isguanzhu: a.isguanzhu,
                guanzhunum: a.guanzhunum,
                loupanlist: a.loupanlist
            })
        });
    },
    handleCall: function (t) {
        var a = t.currentTarget.dataset.phone;
        a && wx.makePhoneCall({
            phoneNumber: a
        });
    },
    _guanzhu: function (da) {
        e.checkAuth();
        var dt = this;
        var userid = da.currentTarget.dataset.userid;
        var adid = da.currentTarget.dataset.adid;
        var isguanzhu = da.currentTarget.dataset.isguanzhu;
        
        a.get("DatafangcopyExt/guanzhu", {
            userid: userid,
            adid: adid,
            isguanzhu: isguanzhu
        }, function (t) {
      
            dt.setData({
                "isguanzhu": t.isguanzhu,
                "guanzhunum": t.guanzhunum
            });
        });

    },
    _addZygw: function (dt) {
     
        wx.setClipboardData({
            data: dt.currentTarget.dataset.id,
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        setTimeout(function () {
                            // 获取 chart 实例的方式
                            a.alert("经纪人微信号已复制,去添加好友吧！");
                        }, 100);

                    }
                })
            }
        })
    },
    _goDetail: function (t) {       
        var a = t.currentTarget.dataset.houseid;
        wx.navigateTo({
            url: '/house/community/index?cid=' + a,
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },


})