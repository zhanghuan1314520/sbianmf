var t = getApp(),
    a = t.requirejs("core");

Component({
    properties: {
        dataApi: {
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
        lotteryFlag:1,
        IS_IOS:1
    },
    observers: {
       
    },
    ready: function() {
        this.load_data();
     },
    lifetimes: {},
    methods: {
        load_data: function(e) {
            var n = this;
            wx.getSystemInfo({
                success: function (e) {
                   console.log(e);
                    //console.log(e.system);
                    //console.log(e.system.substring(0, 3));
                    if (e.system.substring(0, 3)!="iOS"){
                        n.setData({
                            IS_IOS: !1
                        }
                    )}else
                    {
                        n.setData({
                                IS_IOS: !0
                            });
                    }
                  
                    console.log(n.data.IS_IOS)
                }
            })
        },
        copyText: function(e) {
            wx.setClipboardData({
                data: e.currentTarget.dataset.text,
                success: function(res) {
                    wx.getClipboardData({
                        success: function(res) {
                            setTimeout(function() {
                                // 获取 chart 实例的方式
                                a.alert("客服微信号已复制,去添加好友！");
                            }, 100);
    
                        }
                    })
                }
            })
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