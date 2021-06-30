var t = getApp(), e = t.requirejs("core"), a = t.requirejs("foxui");

Page({
    data: {
        list: [],
        indicatorDots: !1,
        autoplay: !1,
        current: 0,
        modal: !1
    },
    onLoad: function(e) {
        var a = this, i = {
            cate: e.cate
        };
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
        })), a.getlist(i);
    },
    swiperchange: function(t) {
        this.setData({
            current: t.detail.current
        });
    },
    getlist: function(t) {
        var a = this;
        console.log(t);
        e.get("membercard.detail", t, function(e) {
            if (0 == e.error) {
              console.log(e);
                if (t.id) for (var i in e.list) t.id == e.list[i].id && a.setData({
                    current: i
                });
                a.setData({
                    list: e.list
                });
            }
        });
    },
    submit: function(t) {
        var i = t.currentTarget.dataset, r = this;
        console.error(i), -1 != i.startbuy && ("0" != i.stock ? e.post("membercard.order.create_order", {
            id: i.id
        }, function(t) {
            0 == t.error ? wx.navigateTo({
                url: "/pages/member/membercard/pay/index?order_id=" + t.order.order_id
            }) : a.toast(r, t.message);
        }) : a.toast(r, "库存不足"));
    },
    coupon: function(t) {
        var i = this, r = t.currentTarget.dataset, o = i.data.current, s = i.data.list, n = i.data.options, d = {
            cate: n.cate
        }, c = {
            id: r.id,
            couponid: r.couponid
        };
        r.issend || (n.id && (d.id = n.id), e.post("membercard.get_month_coupon", c, function(t) {
            if (0 == t.error) {
                a.toast(i, "领取成功");
                for (var e in s[o].month_coupon) r.couponid == s[o].month_coupon[e].id && (s[o].month_coupon[e].isget_month_coupon = !0, 
                i.setData({
                    list: s
                }));
            } else a.toast(i, t.message);
        }));
    },
    credit: function(t) {
        var i = this, r = t.currentTarget.dataset, o = i.data.list, s = i.data.current, n = (i.data.options.cate, 
        {
            id: r.id
        });
        r.iscredit || e.post("membercard.get_month_point", n, function(t) {
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
            current: src, // 当前显示图片的http链接
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
});