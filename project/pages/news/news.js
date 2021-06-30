var t = getApp(),
    e = t.requirejs("core");

t.requirejs("foxui");
Page({
    data: {
        icons: t.requirejs("icons"),
        active: 0,
        nav: [],
        list: [],
        notice_type: "",
        page: 1,
        loading: !1,
        loaded: !1
    },
    onLoad: function (e) {
        console.log("4444444",this.data)
        var st = this;
        t.url(e)
        this.get_list();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total;
        wx.showLoading({
          title: '玩命加载中',
        })
        var t = this;
        t.get_list();
        wx.hideLoading();
  
        //this.data.loaded || this.data.list.length == this.data.total || this.getList();
      },
      onPullDownRefresh: function() {
          wx.stopPullDownRefresh();
      },
    handleSwitch: function (d) {
        var t = this;

        1 == t.setData({
            activeItem: d.currentTarget.dataset.text,
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
        }), e.get("noticeApi/get_list", {
            page: t.data.page,
            notice_type: t.data.notice_type
        }, function (e) {
            console.log("址", e)
            console.log("长度",e.list.length)
            var a = {
                loading: !1,
                loaded: !0,
                total: e.total,
                pagesize: e.pagesize,
                show: !0,
                nav: e.notice_type
            };
            e.list.length > 0 && (a.page = t.data.page + 1, a.list = t.data.list.concat(e.list), 
            e.list.length < e.pagesize && (a.loaded = !0)), t.setData(a);
        });
    },
    // 点击切换选中
    changeNav(e) {
        console.log("e", e)
        let notice_type = e.currentTarget.dataset.id;
        console.log(notice_type)
        let index = e.currentTarget.dataset.index;
        this.setData({
            active: index,
            page:1,
            notice_type: notice_type,
            list:[]
        })
        this.get_list();
    },
    // 跳转分享页面
    noticeApi_get_share: function (e) {
        console.log("2", e)
        let id = e.currentTarget.dataset.id;
        let name = encodeURIComponent(e.currentTarget.dataset.name);
        wx.navigateTo({
            url: "/project/pages/share/share?id=" + id + "&name=" + name
        })
    },
    toDetail: function(a) {
        var t = this,
            e = parseInt(a.currentTarget.dataset.index);

        var d = t.data.list[e].housesid,
            r = t.data.list[e].cityid;
        1 == t.data.list_param && wx.navigateTo({
            url: "../sale_detail/sale_detail?houseId=" + d + "&cityId=" + r
        }), 2 == t.data.list_param && wx.navigateTo({
            url: "../zufang_detail/zufang_detail?houseId=" + d + "&cityId=" + r
        });
    },
    toSearch: function(a) {
        var t = this,
            e = "";
        "请输入板块名、楼盘名" != t.data.searchCon && (e = t.data.searchCon), 8 == getCurrentPages().length ? wx.redirectTo({
            url: "search?cityId=" + t.data.city_id + "&searchInp=" + e + "&listParam=" + t.data.list_param + "&searchParam=2"
        }) : wx.navigateTo({
            url: "search?cityId=" + t.data.city_id + "&searchInp=" + e + "&listParam=" + t.data.list_param + "&searchParam=2"
        });
    },
    delInp: function() {
        var a = this;
        a.data.tabTxt[0].newname = "", a.setData({
                searchCon: "请输入板块名、楼盘名",
                tabTxt: a.data.tabTxt
            }), a.data.postParam.districtid = "", a.data.postParam.sqid = "", a.data.postParam.conmmunityid = "",
            a.data.postParam.lineid = "", a.data.postParam.stationid = "", console.log(a.data.postParam),
            a.filterData(a.data.postParam);
    },
});