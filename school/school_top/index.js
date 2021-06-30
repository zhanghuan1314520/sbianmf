var t = getApp(),
    e = t.requirejs("core");
var a=e;

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
        schoolList: [],
        cid: '',
        activeItem:"1",
        schooltitle:'',
        see: !1,
        index:1,
        ranking_types: {},
        markerlatitude: "",
        markerlongitude: "",
        sharetitle:'杭州学区房30强&最低门槛完全版（1季度）',
        types: [ {
                        value: "1",
                        text: "最优学区"
         }, {
                        value: "2",
                        text: "价格榜"
                    }, {
                        value: "3",
                        text: "成交榜"
         } ],
       type: "1",
       diytitle:'',
    },
    onLoad: function(e) {
        var st = this;
        st.setData({
            cid: e.cid
        });

        wx.showLoading({
            title: "加载中..."
        });
         
        //分享锁粉
        var dt=e;
        var et = decodeURIComponent(dt.scene);
        if (!dt.id && et) {
            var n = a.str2Obj(et); //str2Obj --> e.requirejs("core"),
            dt.id = n.id, n.mid && (dt.mid = n.mid, t.setCache("usermid", n)); // setCache--> e = getApp()
        }   
        t.url(dt);

        if (e.lat && e.lng) {
            wx.hideLoading(), st.setData({
                markerlatitude: e.lat,
                markerlongitude: e.lng,
                loading: !0
            }),t.url(e), this.getList();
        } else {

            wx.getLocation({
                type: "gcj02",
                success: function (td) {

                    console.log(td);

                    wx.hideLoading(), st.setData({
                        markerlatitude: td.latitude,
                        markerlongitude: td.longitude,
                        loading: !0
                    }),t.url(e), st.getList();
                }
            });
        }

        
    }
    ,
    handleSwitch: function(d) {
        var t = this;
 
        1 == t.setData({
            activeItem:  d.currentTarget.dataset.text,
            schoolList:[],
            page:1,
            loading: !1
        });

        this.getList();
       
    },
    getList: function() {

        console.log('111')

        var t = this;
        t.setData({
            loading: !0
        }), e.get("schoolApi/get_schoohot40", {
            activeItem:t.data.activeItem,
            latitude:t.data.markerlatitude,
            longitude:t.data.markerlongitude
           
        }, function(e) {
            
            var a = {
                loading: !1, 
                loaded: !0,
                schoolList: e.list,
                sharetitle:e.sharetitle,
                show: !0
            };
            t.setData(a)
        });
    },
     /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () { 
        var st = this;

        st.setData({
            diytitle:'杭州学区房30强&最低门槛完全版'
        });

        var t = null, at = null;
        return this.data.diytitle && (t = '/school/school_top/index', at = this.data.diytitle), 
        a.onShareAppMessage(t, at);    // onShareAppMessage -->  e.requirejs("core"),
 
    },
    goSee: function () {
        var st = this;
        st.setData({
            see: !0,
        })
    },
    closeSee: function () {
        var st = this;
        st.setData({
            see: !1,
        })
    },
});