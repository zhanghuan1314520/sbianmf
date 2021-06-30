var t = getApp(), e = t.requirejs("core"), a = t.requirejs("foxui"), i = t.requirejs("biz/diypage");


Page({
    data: {
        list: [],
        idx: 0,
        idxs: 0,
        indicatorDots: !1,
        autoplay: !1,
        index: 0,
        modal: !1,
        page: 1,
        cate: "all",
        route: "member",
        show: !1,
        member: {},
        description:''
    },
    onLoad: function (e) {
        var a = this;
        console.log("i", i)
        t.getCache("isIpx") ? a.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : a.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), a.setData({
            options: e
        }), e.id && (i.id = e.id, i.page = e.page, a.setData({
            id: e.id
        })), a.get_list();
        a.getInfo();
    },
    onShow: function () {
        var t = this;
        wx.getSystemInfo({
            success: function (e) {
                //console.log(e);
                //console.log(e.system);
                //console.log(e.system.substring(0, 3));
                if (e.system.substring(0, 3) != "iOS") {
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
        }),i.get(this, "member", function (e) { 
           
        });
    },
    getInfo: function () {
        var t = this;
        t.setData({
            loading: !0
        }), e.get("member", {
        }, function (e) {
           
            t.setData({
                avatar:e.avatar,
                nickname:e.nickname,
                levelname:e.levelname
            })
        })
    },
    // 会员套餐选择
    chooseCampus: function (e) {
     
        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id;
        let  description = e.currentTarget.dataset.description;
        this.setData({
            idx: index,
            index: index,
            description:description
        });
    },
    get_list: function () {
        var t = this;
        t.setData({
            loading: !0
        }), e.get("membercard.getlist", {
            page: t.data.page,
            cate: t.data.cate
        }, function (e) {
           
            0 == e.error ? (t.setData({
                loading: !1,
                total: e.total,
                empty: !0,
                all_total: e.all_total,
                my_total: e.my_total,
            }), e.list.length > 0 && t.setData({
                page: t.data.page + 1,
                list: t.data.list.concat(e.list),
                description:e.list[0].description,
            }), e.list.length > e.pagesize && t.setData({
                loaded: !0,
                index: 0
            })) : a.toast(e.message, "loading");
        }, this.data.show);
    },
    onReachBottom: function () {
        this.data.loaded || this.data.list.length == this.data.total || this.get_list();
    },
    submit: function (t) {
        var i = t.currentTarget.dataset, r = this;
        console.error(i), -1 != i.startbuy && ("0" != i.stock ? e.post("membercard.order.create_order", {
            id: i.id
        }, function (t) {
            0 == t.error ? wx.navigateTo({
                url: "/pages/member/membercard/pay/index?order_id=" + t.order.order_id
            }) : a.toast(r, t.message);
        }) : a.toast(r, "库存不足"));
    },
    submit1: function (t) {
        var s = t.currentTarget.dataset,
            r = this; -
                1 != s.startbuy && ("0" != s.stock ? e.post("membercard.order.create_order", {
                    id: s.id
                }, function (t) {
                    0 == t.error ? wx.navigateTo({
                        url: "/pages/member/membercard/pay/index?order_id=" + t.order.order_id
                    }) : e.toast(r, t.message);
                }) : e.toast(r, "库存不足"));
    },
    coupon: function (t) {
        var i = this, r = t.currentTarget.dataset, o = i.data.index, s = i.data.list, n = i.data.options, d = {
            cate: n.cate
        }, c = {
            id: r.id,
            couponid: r.couponid
        };
        r.issend || (n.id && (d.id = n.id), e.post("membercard.get_month_coupon", c, function (t) {
            if (0 == t.error) {
                a.toast(i, "领取成功");
                for (var e in s[o].month_coupon) r.couponid == s[o].month_coupon[e].id && (s[o].month_coupon[e].isget_month_coupon = !0,
                    i.setData({
                        list: s
                    }));
            } else a.toast(i, t.message);
        }));
    },
    credit: function (t) {
        var i = this, r = t.currentTarget.dataset, o = i.data.list, s = i.data.index, n = (i.data.options.cate,
        {
            id: r.id
        });
        r.iscredit || e.post("membercard.get_month_point", n, function (t) {
            0 == t.error ? (a.toast(i, "领取成功"), o[s].isget_month_point = 1, i.setData({
                list: o
            })) : a.toast(i, t.message);
        });
    },
    imgYu: function (event) {
        //var src = event.currentTarget.dataset.src;//获取data-src
        //var imgList = event.currentTarget.dataset.list;//获取data-list
        var src = "https://sbmf.ww2ss.com/dfimages/logo.jpg";
        var imgArr = [];
        imgArr[0] = "https://sbmf.ww2ss.com/dfimages/logo.jpg";
        //图片预览
        wx.previewImage({
            index: src, // 当前显示图片的http链接
            urls: imgArr // 需要预览的图片http链接列表
        })
    },
    copyText: function (e) {
        wx.setClipboardData({
            data: e.currentTarget.dataset.text,
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        setTimeout(function () {
                            // 获取 chart 实例的方式
                            a.alert("手边买房微信号已复制,快去添加好友，拉群讨论吧！");
                        }, 100);

                    }
                })
            }
        })
    },
    // 版本选择
    taberTop: function (e) {
        console.log("11111111111", e);
        var t = this;
        let index = e.currentTarget.dataset.index;
        t.setData({
            idxs: index,
            list: [],
            page: 1
        })
        if (index == 1) {
            t.data.cate = "my";
        } else if (index == 0) {
            t.data.cate = "all";

        }else if (index == 3) {
            t.data.cate = "haohua";
        }
        t.get_list();
    }
});