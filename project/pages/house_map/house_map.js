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
        navH: 0,
        lat: null,
        lng: null,
        initialLat: null,
        initialLng: null,
        buildingId: null,
        name: "",
        markers: [],
        includePoints: [],
        facilityCount: null,
        curTab: 1,
        curSubTab: 0,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(dt) {
 
        var st = this,i = dt.maplat,
            c = dt.maplng,
            u = dt.name,
            s = dt.houseid;
        //console.log(dt);
        if (st.setData({
                lat: 1 * i,
                lng: 1 * c,
                initialLat: 1 * i,
                initialLng: 1 * c,
                name: u,
                buildingId: s,
                curTab: dt.index ? parseInt(dt.index) : 1
            }), wx.getSystemInfo({
                success: function(ft) {
                    st.setData({
                        mapH: ft.windowHeight - st.data.navH - 215
                    });
                }
            }));


        a.get("dataApiMap/getDetailMap", {
            houseid: s,
            lng: c,
            lat: i
        }, function(dt) {            
            st.setData({
                buildingSurroundings: st.formatSurroundings(dt.data)
            });
        });

    },

    formatSurroundings: function(t) {
        var a = this,
            e = [],
            n = [],
            i = [];
 
        for (var c in t) ! function(c) {    
            var u = [],
                s = {
                    Count: 0
                },
                o = a.formatFacilityType(c),
                l = [];
            s.FacilityType = o, s.name = a.formatFacilityName(o), s.icon = a.formatFacilityIcon(o),
                t[c].forEach(function(t, e) {
                    t.name = a.formatFacilityClassName(t.BuildingSupportingType), t.icon = a.formatFacilityClassIcon(t.BuildingSupportingType),
                        t.emptyText = a.formatEmptyText(t.BuildingSupportingType), t.Items.length > 0 ? (s.Count += t.Items.length,
                            t.Items.forEach(function(e, n) {
                                e.Distance = a.formatDistance(e.Distance), e.WalkingTime = e.WalkingTime ? parseInt(e.WalkingTime / 60) : "",
                                    e.markerIcon = a.formatFacilityClassIcon(t.BuildingSupportingType), e.marker = a.getClassMarker(e, e.markerIcon),
                                    e.markerId = c + "-" + t.BuildingSupportingType + "-" + n, u.push(e.marker);
                            })) : !t.emptyText && l.push(e);
                }), n.push(u), t[c] = t[c].filter(function(t, a) {
                    return l.indexOf(a) < 0;
                }), e.push(t[c]), i.push(s);
        }(c);
 
        i.sort(a.compare("FacilityType"));
        var u = [{
                iconPath: "/dfimages/lou_bj.png",
                id: 0,
                latitude: 1 * this.data.lat,
                longitude: 1 * this.data.lng,
                width: 50,
                height: 50,
                callout: {
                    content: this.data.name,
                    color: "#ffffff",
                    fontSize: 11,
                    padding: 5,
                    bgColor: "#ff5d00",
                    borderRadius: 17,
                    display: "ALWAYS",
                    borderWidth: 1,
                    borderColor: "#ffffff"
                }
            }],
            s = u.concat(n[this.data.curTab - 1]);
        
        return this.setData({
            markers: s,
            initMarker: u,
            markerArr: n,
            includePoints: s,
            facilityCount: i
        }), e;
    },
    getClassMarker: function(t, a) {
        //console.log(t.Latitude);
        //console.log(a);
        return {
            iconPath: "https://sbmf.ww2ss.com/dfimages/map/" + a + ".png",
            id: t.Title,
            latitude: 1 * t.Latitude,
            longitude: 1 * t.Longitude,
            width: 40,
            height: 40,
            callout: {
                content: t.Title,
                color: "#ffffff",
                fontSize: 10,
                padding: 5,
                bgColor: "#366AB3",
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#ffffff"
            }
        };
    },
    formatFacilityType: function(t) {
        switch (t) {
            case "Business":
                return 1;
            case "Recreations":
                return 2;
            case "Traffics":
                return 3;
            case "Hospitals":
                return 4;
            case "Schools":
                return 5;
        }
    },
    formatFacilityName: function(t) {
        switch (1 * t) {
            case 1:
                return "商业";
            case 2:
                return "休闲";
            case 3:
                return "交通";
            case 4:
                return "医疗";
            case 5:
                return "学校";
        }
    },
    formatFacilityIcon: function(t) {
        switch (1 * t) {
            case 1:
                return "map_detail_1.png";

            case 2:
                return "map_detail_2.png";

            case 3:
                return "map_detail_3.png";

            case 4:
                return "map_detail_4.png";

            case 5:
                return "map_detail_5.png";
        }
    },
    formatFacilityClassIcon: function(t) {
        switch (1 * t) {
            case 1:
                return "map_1";

            case 2:
                return "map_2";

            case 3:
                return "map_3";

            case 4:
                return "map_4";

            case 5:
                return "map_5";

            case 6:
                return "map_6";

            case 7:
                return "map_7";

            case 8:
                return "map_8";

            case 9:
                return "map_9";

            case 10:
                return "map_9";

            case 11:
                return "map_10";

            case 12:
                return "map_10";

            case 13:
                return "map_10";

            case 14:
                return "map_10";
        }
    },
    formatFacilityClassName: function(t) {
        switch (1 * t) {
            case 1:
                return "商场";
            case 2:
                return "超市";
            case 3:
                return "娱乐";
            case 4:
                return "咖啡";
            case 5:
                return "足道";
            case 6:
                return "网咖";  
            case 7:
                return "地铁站";
            case 8:
                return "公交站";
            case 9:
                return "医院";
            case 10:
                return "诊所";
            case 11:
                return "幼儿园";
            case 12:
                return "小学";
            case 13:
                return "中学";
            case 14:
                return "大学";

        }
    },


    formatEmptyText: function(t) {
        switch (1 * t) {
            case 1:
                return "附近1公里范围内，暂无大型商超";
            case 2:
                return "附近1公里范围内，暂无超市地点";
            case 3:
                return "附近1公里范围暂无娱乐";
            case 4:
                return "附近1公里范围暂无咖啡店";
            case 5:
                return "附近1公里范围，暂无足道";
            case 6:
                return "附近1公里范围，暂无网咖";
            case 7:
                return "附近1公里范围内，无地铁站";
            case 8:
                return "附近1公里范围内，无公交站";
            case 9:
                return "附近1公里范围内，暂无医院";

            case 10:
                return "附近1公里范围内，暂无诊所";

            case 11:
                return "附近1公里范围内，暂无幼儿园";
            case 12:
                return "附近1公里范围内，暂无小学";
            case 13:
                return "附近1公里范围内，暂无中学";
            case 14:
                return "附近1公里范围内，暂无大学";

            default:
                return "";
        }
    },
    formatDistance: function(e) {
        return e ? e < 1e3 ? parseInt(e) + "m" : (e / 1e3).toFixed(1) + "km" : "";
    },
    compare: function(e) {
        return function(t, r) {
            var n = t[e],
                a = r[e];
            return n < a ? -1 : n > a ? 1 : 0;
        };
    },

    changeTab: function(t) {
        var a = t.currentTarget.dataset.index;
        console.log(this.data.curMarker);
        if (a !== this.data.curTab || this.data.curMarker) {
            var r = this.data.initMarker.concat(this.data.markerArr[a - 1]);
            this.setData({
                markers: r,
                includePoints: r,
                curTab: a,
                curSubTab: 0,
                curMarker: ""
            });
        }
    },
    changeSubTab: function(t) {
        var a = t.currentTarget.dataset.index;
        console.log(a);
        a !== this.data.curSubTab && this.setData({
            curSubTab: a
        });
    },
    changeMarker: function(t) {
        var a = t.currentTarget.dataset,
            r = a.curmarker,
            e = a.marker;
        if (e.callout.display = "ALWAYS", r !== this.data.curMarker) {
            var n = this.data.initMarker.concat(e);
            this.setData({
                markers: n,
                curMarker: r
            });
        }
    },
    initLocation: function() {
        var t = this.data,
            a = t.initialLat,
            r = t.initialLng;
        this.setData({
            lat: a,
            lng: r
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
})