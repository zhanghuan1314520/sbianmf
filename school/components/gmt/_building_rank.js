
Component({
    properties: {
        building_ranking: {
            type: Object,
            default: function() {}
        },
        rankNum: {
            type: Number,
            default: 6
        },
        lotteryFlag: {
            type: Number,
            default: 0
        },
        isCorrect: {
            type: Boolean,
            default: !1
        },
        isPK: {
            type: Boolean,
            default: !0
        },
        skeletons: {
            type: Boolean,
            default: !1
        },
        isSearch: {
            type: [ String, Number ],
            default: 0
        }
        
    },
    data: {
        informations: {},
        is_load: !1,
        isShowPhoto:true,
        lotteryFlag:1
    },
    observers: {
       
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