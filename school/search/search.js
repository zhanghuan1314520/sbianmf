var e = getApp(),
    a = e.requirejs("core"),
    t = e.requirejs("wxParse/wxParse"),
    i = e.requirejs("biz/diypage"),
    o = e.requirejs("jquery");
Page({
    data: {
        city: "",
        district: "",
        storage: [],
        inputValue: "",
        search_results: [],
        show_history: !1
    },
    blur_input: function() {},
    focus_input: function(t) {
        var a = "" == this.data.inputValue && this.data.storage.length > 0;
        this.setData({
            show_history: a
        });
    },
    bindKeyInput: function(t) {
        var a = this;
        t.detail.value ? (a.setData({
            inputValue: t.detail.value
        }), a.searchInput()) : a.setData({
            inputValue: ""
        });
    },
    searchInput: function() {
        var s = this;
        void 0 != t && t.abort(), s.data.inputValue && (t = e.request({
            url: a.search_where_url,
            data: {
                city: s.data.city,
                q: s.data.inputValue
            },
            success: function(t) {
                1 == t.data.status ? s.setData({
                    search_results: []
                }) : s.setData({
                    search_results: t.data.results
                });
            },
            fail: function(t) {}
        }));
    },
    clear_input: function() {
        this.setData({
            inputValue: "",
            search_results: [],
            show_history: !1
        });
    },
    reLaunchIndex: function(t) {
        var a = "primary";
        2 == t.type && (a = "middle"), wx.reLaunch({
            url: "../index/index?lat=" + t.lat + "&lng=" + t.lng + "&districtstatus=" + a
        });
    },
    bindtap_hots_item: function(t) {
        this.reLaunchIndex({
            lat: t.currentTarget.dataset.lat,
            lng: t.currentTarget.dataset.lng,
            type: t.currentTarget.dataset.type
        });
    },
    bindtap_history_item: function(t) {
        var a = t.currentTarget.dataset;
        this.reLaunchIndex({
            lat: a.lat,
            lng: a.lng,
            type: a.type
        });
    },
    bindtap_chooseItem: function(t) {
        var a = t.currentTarget.dataset, e = a.value.map(function(t) {
            return t[1];
        }).join("");
        this.setData({
            inputValue: e,
            search_results: ""
        }), e && (this.add_search_history({
            id: e,
            lat: a.lat,
            lng: a.lng,
            type: a.type,
            city: this.data.city
        }), this.reLaunchIndex({
            lat: a.lat,
            lng: a.lng,
            type: a.type
        }));
    },
    load_city_hot_schools: function(t) {
        var s = this;
        e.request({
            url: a.hots,
            data: {
                city: s.data.city,
                district: s.data.district
            },
            success: function(t) {
                s.setData({
                    hots: t.data.list
                });
            }
        });
    },
    load_search_history: function() {
        var t = this;
        wx.getStorage({
            key: "search_history",
            success: function(a) {
                t.setData({
                    storage: a.data
                });
            }
        });
    },
    add_search_history: function(t) {
        var a = this, e = a.data.storage ? a.data.storage : [], s = !1;
        e.forEach(function(a) {
            a.id == t.id && (s = !0);
        }), 0 == s && (e.length > 20 && e.pop(), e.unshift(t), a.setData({
            storage: e
        }), wx.setStorage({
            key: "search_history",
            data: e
        }));
    },
    clean_search_history: function() {
        var t = this;
        wx.removeStorageSync("search_history"), t.setData({
            storage: []
        });
    },
    onLoad: function(t) {
        var a = this, e = t.city ? t.city : "南京", i = t.district;
        a.data.city = e, a.data.district = i || "", a.setData({
            height: s.globalData.windowHeight
        }), s.get_auth_api().then(function() {
            a.load_city_hot_schools(e), a.load_search_history();
        });
    }
});