

getApp();

Component({
    properties: {
        flag: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        visibility: !1
    },
    observers: {
        flag: function(t) {
            this.setData({
                visibility: t
            });
        }
    },
    lifetimes: {},
    ready: function() {},
    methods: {
        preventTouchMove: function() {},
        conceal: function() {
            this.setData({
                visibility: !1
            });
        },
        bindtap_goto_authentication: function(i) {
            return t.save_user_info(function() {
                wx.navigateTo({
                    url: "/pages/house/authentication/authentication?backtype=redirect"
                });
            }), !1;
        }
    }
});