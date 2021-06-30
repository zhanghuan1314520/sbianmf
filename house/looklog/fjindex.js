var t = getApp(),
    e = t.requirejs("core");

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
        lshow: !1
    },
    onLoad: function(e) {
        var st = this;
        st.setData({
            dtype: e.dtype
        });
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
    onShareAppMessage: function () {
        var st = this;
        return {
            title: '附近3公里带看zui多!',
            path: '/house/looklog/fjindex',
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
});