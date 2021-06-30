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
        school:[],
        see: !1
    },
    onLoad: function(e) {
        var st = this;
        st.setData({
            cid: e.cid
        });
        t.url(e), this.getList();

        wx.setNavigationBarTitle({
            title: '手边买房-'+st.data.schooltitle  //修改title
          })

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
        }), e.get("schoolApi/get_xiaoqulist", {
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
                school:e.school,
                show: !0,
               
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
     /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var st = this;
        return {
            title: st.data.schooltitle+'划片小区成交简报',
            path: '/school/school_xiaoqu/index?mid=' + st.data.member.id+'&cid='+st.data.cid,
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
    closeSee: function () {
        var st = this;
        st.setData({
            see: !1,
        })
    },
});