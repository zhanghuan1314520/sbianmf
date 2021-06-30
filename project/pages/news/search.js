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
        show: 0,
        cacheKEY: "",
        isStatic: false,
        search_input_value: '',
        searchValue: "",
        searchList: [],
        hotList: [],
        historyList: [],
        member: {},
        mid: 0
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
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2]; // -2 就是你上一页的数据 你上上页的数据就是-3 了以此类推！
        // 直接操作上一个页面的 index数据 之后返回 
        prevPage.setData({
            prevIndex: 1
        })
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
        var t = this,
            a = wx.getSystemInfoSync();
        this.getInfo(), t.searchlog(), wx.getSetting({
            success: function (a) {
                var e = a.authSetting["scope.userInfo"];
                //console.log(t.data.objectMultiArray[1]);
                t.setData({
                    anum: e,
                    show: !0
                });
            }
        });
    },
    getInfo: function () {
        var e = this;
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
                iscycelbuy: a.iscycelbuy,
                bargain: a.bargain
            }), t.wxParse("wxParseData", "html", a.copyright, e, "5");
        });
    },
    handleGoT: function(a) {
        var t = a.currentTarget.dataset.go;
        t ? wx.navigateTo({
            url: t
        }) : wx.showToast({
            title: "持续开发中..."
        });
    },
    searchlog: function () {
        var t = this;
        a.get("datafang/searchlog", {}, function (a) {
            1 == t.setData({
                historyList: a.listlog,
                hotList: a.listlogre
            });
        });
    },
    clearCache: function () {
        var t = this;
        a.get("datafang/deleteSearchlog", {}, function (a) {
            1 == t.setData({
                historyList: []
            });

            if (a.listlog == 'ok') {
                wx.showToast({
                    title: '搜索记录清除成功!',
                    duration: 3000
                })
            }
        });
    },
    delText: function () {
        var st = this;
        st.setData({
            searchValue: '',
            searchList: [],
            search_input_value: ''
        });
        st.searchlog();
    },
    searchInput: function (dt) {

        var st = this;
        var searchValue = dt.detail.value;

        if (!(/[\u4e00-\u9fa5]+/).test(searchValue)) {
            //console.log("请输入汉字");
            return;
        }
        st.setData({
            searchValue: searchValue,
            search_input_value: searchValue
        });


        switch (searchValue.length) {
            case 2:
                st.doSearchList(searchValue);
                break;
            case 3:
                st.doSearchList(searchValue);
                break;
            case 4:
                st.doSearchList(searchValue);
                break;
            case 5:
                st.doSearchList(searchValue);
            case 6:
                st.doSearchList(searchValue);
            case "end":
                break;
        }
    },
    doSearchList: function (dt) {
        var t = this;
        a.get("Business/get_searchHouse", {
            searchValue: dt
        }, function (a) {
            1 == t.setData({
                searchList: a.list
            });
        });
    },
    goHouse: function (dt) {
        var community = dt.currentTarget.dataset.communityid;
        var t = this;

        a.get("datafang/addsearch", {
            id: community.id,
            ftype: community.ftype,
            title: community.title
        }, function (a) { });
        if (community.id == '') {
            return;
        }

        wx.navigateTo({
            url: "/house/community/index?cid=" + community.id
        });
    },

    hotLinkFn: function (dt) {

        //console.log(dt);
        var dc = dt.currentTarget.dataset.communityid;
        var t = this;      
        getApp().globalData.dtsearch = dc;      
       wx.navigateTo({
         url: '/project/pages/news/news',
       })
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

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
                            a.alert("客服微信号已复制,去添加好友加群！");
                        }, 100);

                    }
                })
            }
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var st = this;
        return {
            title: '查房价的好工具!',
            path: '/house/searchHouse/index?mid=' + st.data.member.id,
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
    close: function () {
        e.globalDataClose.flag = !0, wx.reLaunch({
            url: "/pages/message/auth/index"
        });
    }
})