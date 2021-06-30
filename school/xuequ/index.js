// dfpage/xuequ/index.js

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
        member: {},
        page_num:1,
        datalista: [],   
        datam:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (t) {
        t = t || {};
        var a = this;

        a.setData({
            mid: t.mid
        });
    },
    getInfo: function () {
        var e = this;
        //获得登录用户个人信息
        a.get("member", {
            mid: this.data.mid
        }, function (a) {
      
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
            }), t.wxParse("wxParseData", "html", a.copyright, e, "5");
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
        var a = this;

        this.getInfo(), a.get_xuexiao(), wx.getSystemInfo({
            success: function (e) {
                var t = e.windowWidth / 1.7;
                a.setData({
                    windowWidth: e.windowWidth,
                    windowHeight: e.windowHeight,
                    swiperheight: t
                });
            }
        });
    },

    tosubReports:function(){
        wx.navigateTo({
            url: '/project/pages/reportsa/index',
        })
    },
    tosubNearby: function () {
        wx.navigateTo({
            url: '../looklog/fjindex?dtype=0',
        })
    },
    tosubMarket: function () {
        wx.switchTab ({
            url: '/house/market/index',
        })
    },


    get_xuexiao:function(){
        var t = this;
        t.setData({
            loading: !0
        }), a.get("reports/get_xuexiao", {
            page: t.data.page_num,
        }, function (a) {
            t.setData({
                show: !0,
                page_num: a.page       
            });
            //console.log(a.datalista);
            if (a.datalist.length < 1) {
                wx.showToast({
                    title: '到底，没有数据了！'
                })
                return;
            }
            //处理往上拉，加载数据
            var data1 = t.data.datalist;
            if (data1 == null) {
                t.setData({
                    datalist: a.datalist,
                    page_num: a.page
                });
                return;
            }

            for (var i = 0; i < a.datalist.length; i++) {
                data1.push(a.datalist[i]);
            }
            t.setData({
                datalist: data1
            });
        });
    },
    //跳转报表
    toReports: function (item){
        var st=this;
        /***
        if (st.data.member.needbind==1){
            wx.navigateTo({
                url: "/pages/member/bind/index"
            });
            return;
        }****/

        var cid = item.currentTarget.dataset.cid;
        wx.navigateTo({
            url: "/project/pages/reportsa/index?ftype=5&searchValue=" + cid.schoolname + "&xuequid=" + cid.schoolid
        });
    },
    //跳转房源
    toHouse: function (item){  
        var dc = item.currentTarget.dataset.cid; 
        var t = this;
        t.data.datam.ftype = 4, t.data.datam.id = dc.schoolid, t.data.datam.title=dc.schoolname;
        getApp().globalData.dtsearch = t.data.datam;
        wx.navigateTo({
            url: "/house/market/index"
        });
    }
    
    ,
    /**
       * 页面上拉触底事件的处理函数
       */
    onReachBottom: function () {   
        wx.showLoading({
            title: '玩命加载中',
        })
        var t = this;
        //t.get_uupirceList();
        
        t.get_xuexiao();
        wx.hideLoading();
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
        wx.showNavigationBarLoading();
        var a = this;
        a.get_xuexiao();
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
    },

     

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        var st = this;
        st.setData({
            diytitle:'杭州学区房zui新成交数据'
        });
        var t = null, at = null;
        return this.data.diytitle && (t = '/dfpage/xuequ/index', at = this.data.diytitle), 
        a.onShareAppMessage(t, at);   // onShareAppMessage -->  e.requirejs("core"),

     
    }
})