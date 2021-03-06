var t = getApp(),
    a = t.requirejs("core"),
    d = t.requirejs("wxParse/wxParse"),
    e = t.requirejs("foxui"),i = t.requirejs("biz/diypage"), s = t.requirejs("jquery");;

Page({
    data: {
        page: 1,
        cate: "all",
        list: [],
        route: "member",
        show:!1,
    },
    onLoad: function(t) {
        var a = this;
        a.setData({
            options: t,
            cate: t.cate || ""
        }), "true" == t.hasmembercard && a.setData({
            cate: "my"
        }), a.get_list();

       
    },
    onShow: function () {
      
        var t = this;
        wx.getSystemInfo({
            success: function (e) {
                //console.log(e);
                //console.log(e.system);
                //console.log(e.system.substring(0, 3));
                if (e.system.substring(0, 3)!="iOS"){
                    t.setData({
                        show: !0
                    });
                }
                var a = e.windowWidth / 1.7;
                t.setData({
                    windowWidth: e.windowWidth,
                    windowHeight: e.windowHeight,
                    swiperheight: a
                });
            }
        }), i.get(this, "member", function (e) { });
    },
    tab: function(t) {
        var a = this;
        a.setData({
            cate: t.currentTarget.dataset.cate,
            list: [],
            page: 1
        }), a.get_list();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.get_list();
    },
    get_list: function() {
        var t = this;
        t.setData({
            loading: !0
        }), a.get("membercard.getlist", {
            page: t.data.page,
            cate: t.data.cate
        }, function(e) {
         
            0 == e.error ? (t.setData({
                loading: !1,
                total: e.total,
                empty: !0,
                all_total: e.all_total,
                my_total: e.my_total
            }), e.list.length > 0 && t.setData({
                page: t.data.page + 1,
                list: t.data.list.concat(e.list)
            }), e.list.length > e.pagesize && t.setData({
                loaded: !0
            })) : a.toast(e.message, "loading");
        }, this.data.show);
    },
    submit: function(t) {
        var s = t.currentTarget.dataset,
            r = this; -
        1 != s.startbuy && ("0" != s.stock ? a.post("membercard.order.create_order", {
            id: s.id
        }, function(t) {
            0 == t.error ? wx.navigateTo({
                url: "/pages/member/membercard/pay/index?order_id=" + t.order.order_id
            }) : e.toast(r, t.message);
        }) : e.toast(r, "????????????"));
    },
    imgYu: function (event) {
        //var src = event.currentTarget.dataset.src;//??????data-src
        //var imgList = event.currentTarget.dataset.list;//??????data-list
        var src = "https://sbmf.ww2ss.com/dfimages/logo.jpg";
        var imgArr = [];
        imgArr[0] = "https://sbmf.ww2ss.com/dfimages/logo.jpg";
        //????????????
        wx.previewImage({
            current: src, // ?????????????????????http??????
            urls: imgArr // ?????????????????????http????????????
        })
    },
     /**
     * ???????????????????????????
     */
    onShareAppMessage: function () { 
        var st = this;
        return {
            title: '???????????????????????????',
            path: '/pages/member/membercard/index?mid=' + st.data.member.id,
            success: function (res) {
                // ????????????
                console.log("????????????!!");
            },
            fail: function (res) {
                // ????????????
                console.log("????????????!!");
            }
        }
    },
    copyText: function (e) {
        wx.setClipboardData({
            data: e.currentTarget.dataset.text,
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        setTimeout(function () {
                            // ?????? chart ???????????????
                            a.alert("??????????????????????????????,???????????????????????????????????????");
                        }, 100);

                    }
                })
            }
        })
    },
});