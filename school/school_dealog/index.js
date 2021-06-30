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
        activeItem:1,
        schooltitle:'',
        see: !1
    },
    onLoad: function(e) {
        var st = this;
        st.setData({
            cid: e.cid
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
    handleSwitch: function(d) {
        var t = this;
 
        1 == t.setData({
            activeItem:  d.currentTarget.dataset.text,
            list:[],
            page:1,
            loading: !1
        });

        this.getList();
       
    },
    getList: function() {
        var t = this;
        t.setData({
            loading: !0
        }), e.get("datafangcopy/get_schoolfangLog", {
            page: t.data.page,
            cid: t.data.cid,
            activeItem:t.data.activeItem
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
                schooltitle:e.schooltitle, 
                show: !0,
                ad: e.ad
            };
            e.list.length > 0 && (a.page = t.data.page + 1, a.list = t.data.list.concat(e.list),
                e.list.length < e.pagesize && (a.loaded = !0)), t.setData(a);
        });
    },
    goSee: function () {
        var st = this;
        st.setData({
            see: !0,
        })
    },
    closeSee: function () {
        var st = this;
        st.setData({
            see: !1,
        })
    },
    imgYu: function (event) {

        var src = event.currentTarget.dataset.image;//获取data-src
        //var imgList = event.currentTarget.dataset.list;//获取data-list
        var src = src;
        var imgArr = [];
        imgArr[0] = src;
        //图片预览
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: imgArr // 需要预览的图片http链接列表
        })
    },
});