var t = getApp()
,e = t.requirejs("core"),
a = t.requirejs("core");

t.requirejs("foxui");
Page({
    data: {
        icons: t.requirejs("icons"),
        page: 1,
        loading: !1,
        loaded: !1,
        isedit: !1,
        isCheckAll: !1,
        checkObj: {},
        checkNum: 0,
        list: [],
        cid: '',
        nearby: 3,
        latitude: "",
        longitude: "",
        dtime: "5",
        dtype:"0",
        lshow: !1,
        diytitle:'',
    },
    onLoad: function(dt) {
        var st = this;
        st.setData({
            dtype: dt.dtype
        });

       //分享锁粉
       var et = decodeURIComponent(dt.scene);
        if (!dt.id && et) {
                 var n = a.str2Obj(et); //str2Obj --> e.requirejs("core"),
                 dt.id = n.id, n.mid && (dt.mid = n.mid, t.setCache("usermid", n)); // setCache--> e = getApp()
       }   // 

       t.url(dt);

       // t.url(e), this.getList();        

    },
    onShow: function () {
        var t=this;        
        wx.getLocation({
            type: "gcj02",
            altitude: !0,
            success: function (dw) {
                t.setData({
                    latitude: dw.latitude,
                    longitude: dw.longitude
                });
                t.getList();
            },
            fail: function () {
                t.data.dingwei = 2;
            },
            complete: function () { }
        });
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total;
        wx.showLoading({
            title: '玩命加载中',
        })
        var t = this;
        t.getList();
        wx.hideLoading();

        //this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    toDtype:function(dt){
        var t=this;
        var dc = dt.currentTarget.dataset.dtype;
        t.setData({
            dtype:dc,
            list: [],
            page: 1,
            lshow:!1
        });
        t.getList();
     
    },
    toDtime: function (dt) {
        var t = this;
        var dc = dt.currentTarget.dataset.dtime;
        t.setData({
            dtime: dc,
            list: [],
            page: 1,
            lshow: !1
        });
        t.getList();
       
    },
    toNearby: function (dt) {
        var t = this;
        var dc = dt.currentTarget.dataset.nearby;
        t.setData({
            nearby: dc,
            list: [],
            page: 1,
            lshow: !1
        });
        t.getList();
       
    },
    getList: function() {
        var t = this;
        t.setData({
            loading: !0
        }), e.get("reports/get_fanglookLog", {
            page: t.data.page,            
            latitude: t.data.latitude,
            longitude: t.data.longitude,
            dtime: t.data.dtime,
            dtype: t.data.dtype,
            nearby: t.data.nearby
        }, function(e) {
            var a = {
                loading: !1,
                loaded: !0,
                total: e.total,
                pagesize: e.pagesize,
                show: !0,
                lshow:!0
            };
            e.list.length > 0 && (a.page = t.data.page + 1, a.list = t.data.list.concat(e.list),
                e.list.length < e.pagesize && (a.loaded = !0)), t.setData(a);
        });
    },
    get_nearby: function() {
        var t = this;
        wx.getLocation({
            type: "gcj02",
            altitude: !0,
            success: function(dw) {
                a.get("Business/get_nearby", {
                    latitude: dw.latitude,
                    longitude: dw.longitude,
                    nearby: t.data.nearby
                }, function(a) {
                    t.setData({
                        datalist: a.datalist
                    });
                });
            },
            fail: function() {
                t.data.dingwei = 2;
            },
            complete: function() {}
        });
    },
    toSearch: function (a) {
        var t = this,
            e = "";
        "请输入板块名、楼盘名" != t.data.searchCon && (e = t.data.searchCon), 8 == getCurrentPages().length ? wx.redirectTo({
            url: "/house/market/search?cityId=" + t.data.city_id + "&searchInp=" + e + "&listParam=" + t.data.list_param + "&searchParam=2"
        }) : wx.navigateTo({
            url: "/house/market/search?cityId=" + t.data.city_id + "&searchInp=" + e + "&listParam=" + t.data.list_param + "&searchParam=2"
        });
    },
    handleGo_market: function(dt) {

        var pricetype = dt.currentTarget.dataset.pricetype;
        var t = this;
        var sd = {
                pricetype: pricetype,
                title:'',
                ftype:6
            },
            r = Object.assign(sd);
        getApp().globalData.dtsearch = r;

        wx.navigateTo({
            url: "/house/market/index"
        });
    },
    handleGoT: function (a) {
        var t = a.currentTarget.dataset.go;
        t ? wx.navigateTo({
            url: t
        }) : wx.showToast({
            title: "持续开发中..."
        });
    },
    toNearby_go: function (item) {
        var nearby = item.currentTarget.dataset.nearby;

        wx.navigateTo({
            url: '/house/looklog/fjindex?dtype=' + nearby,
        })
    },
    onShareAppMessage: function () {
        var st = this;

        st.setData({
            diytitle:'杭州最新降价房源查询'
        });

        var t = null, at = null;
        return this.data.diytitle && (t = '/dfpage/house/index', at = this.data.diytitle), 
        a.onShareAppMessage(t, at);    // onShareAppMessage -->  e.requirejs("core"),

      
    },

});