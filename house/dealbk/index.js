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
        area: '',
        busines_scircle: ''
    },
    onLoad: function(e) {
        var st = this;
        st.setData({
            area: e.area,
            busines_scircle: e.busines_scircle
        });
        t.url(e), this.getList();
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
    getList: function() {
        var t = this;
        t.setData({
            loading: !0
        }), e.get("datafangcopy/get_fangbkchengjiaoLog", {
            page: t.data.page,
            area: t.data.area,
            busines_scircle: t.data.busines_scircle
        }, function(e) {
            
            if (e.islogin == 'no') {
                wx.redirectTo({
                    url: "../../pages/member/membercard/index"
                })
                return;
            }
            var a = {
                loading: !1,
                loaded: !0,
                total: e.total,
                pagesize: e.pagesize,
                show: !0
            };
            e.list.length > 0 && (a.page = t.data.page + 1, a.list = t.data.list.concat(e.list),
                e.list.length < e.pagesize && (a.loaded = !0)), t.setData(a);
        });
    },

});