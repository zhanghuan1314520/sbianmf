
Component({
    properties: {
        isShowPhoto: {
            type: Boolean,
            default: !1
        },
        name: {
            type: String,
            default: "分享"
        },
        bottom: {
            type: Number,
            default: 184
        },
        right: {
            type: Number,
            default: 30
        },
        iconfont: {
            type: String,
            default: "iconfenxiang"
        },
        animate: {
            type: String,
            default: "around"
        }
    },
    data: {
        informations: {},
        is_load: !1,
        isShowPhoto:true
    },
    observers: {
        school_id: function(o) {
            o > 0 && 0 == this.data.is_load && (this.data.is_load = !0, this.load_data(o));
        }
    },
    lifetimes: {},
    methods: {
        load_data: function(e) {
            var n = this;
            t.request({
                url: o.school_module_informations + e,
                method: "GET",
                success: function(o) {
                    n.setData({
                        informations: o.data.list
                    });
                },
                fail: function(o) {
                    console.log(o);
                }
            });
        },
        binttap_goto_information_page: function() {
            wx.switchTab({
                url: "/pages/information/information"
            });
        },
        bindtap_goto_webcontent: function(o) {
            var t = o.currentTarget.dataset.url;
            console.log(t), t && wx.navigateTo({
                url: "/pages/webcontent/webcontent?href=" + encodeURIComponent(t)
            });
        }
    }
});