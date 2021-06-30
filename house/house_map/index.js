function stt(t, a) {
    f.length >= _ && f.shift(), f.push({
        key: t,
        data: a
    });
}

function arr(t) {
    var a = null;
    return f.forEach(function (e) {
        e.key != t || (a = e.data);
    }), a;
}
var ot = Object.assign || function (o) {
        for (var t = 1; t < arguments.length; t++) {
            var a = arguments[t];
            for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && (o[e] = a[e]);
        }
        return o;
    },
    m, e = getApp(),
    a = e.requirejs("core"),
    t = e.requirejs("wxParse/wxParse"),
    i = e.requirejs("biz/diypage"),
    of = e.requirejs("jquery"),
    g = {
        primary: {
            fillColor: "#FF6A6A4c",
            strokeColor: "#FF6A6A66"
        },
        middle: {
            fillColor: "#2692DB4c",
            strokeColor: "#2692DB66"
        }
    },
    p = {
        primary: {
            fillColor: "#FF6A6A33",
            strokeColor: "#FF6A6A4c"
        },
        middle: {
            fillColor: "#2692DB33",
            strokeColor: "#2692DB4c"
        }
    },
    h = null,
    _ = 10;

Page({
    /**
     * 页面的初始数据
     */
    data: {
        isIpx: e.globalData.isIpx,
        show_map: !1,
        maplng: "",
        maplat: "",
        map_scale: 15,
        map_markers: [],
        map_polygons: [],
        markerlatitude: "",
        markerlongitude: "",
        districtstatus: "primary",
        xuequ_markers: [],
        xuequ_polys: [],
        datah: [],
        puserinfo:{},
        member:{},
        schoolid:0,
        listnum:0,
        show_xue:0,
        ad_data:[],
        search_input_value: '',
        searchValue: "",
        searchList: [],

    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (t) {      
        var st = this;
        wx.showLoading({
            title: "加载中..."
        }), e = wx.createMapContext("map");
        !t.districtstatus || "primary" != t.districtstatus && "middle" != t.districtstatus || (this.data.districtstatus = t.districtstatus,
            this.setData({
                districtstatus: t.districtstatus
            }));
        if (t.lat && t.lng) {
            wx.hideLoading(), st.setData({
                markerlatitude: t.lat,
                markerlongitude: t.lng,
                show_map: !0
            }), st.searchAddress(t.lat, t.lng);
        } else {
            wx.getLocation({
                type: "gcj02",
                success: function (t) {
                    wx.hideLoading(), st.setData({
                        markerlatitude: t.latitude,
                        markerlongitude: t.longitude,
                        show_map: !0
                    }), st.searchAddress(t.latitude, t.longitude);

                }
            });
        }

        st.get_school_map_ad();

    },
    bindtap_location: function() {
        var t = this;
        wx.getLocation({
            type: "gcj02",
            success: function(a) {
                t.setData({
                    latitude: a.latitude,
                    longitude: a.longitude,
                    markerlatitude: a.latitude,
                    markerlongitude: a.longitude
                }), t.searchAddress(a.latitude, a.longitude);
            },
            fail: function(t) {
                wx.showToast({
                    title: "卫星定位失败，请开启定位!",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    onShow: function () {
        var t = this,
            a = wx.getSystemInfoSync();
        this.pn_getlogin(),this.getInfo(), wx.getSetting({
            success: function (a) {
                var e = a.authSetting["scope.userInfo"];
                t.setData({
                    anum: e
                });
            }
        }), m = wx.createMapContext("map");


    },
    getInfo: function () {
        var st = this;
       
        a.get("member", {
            mid: this.data.mid
        }, function (a) {
           //console.log(a);
            1 == a.isblack && wx.showModal({
                title: "无法访问",
                content: "系统升级中，不能访问！",
                success: function (a) {
                    a.confirm && st.close(), a.cancel && st.close();
                }
            }), st.setData({
                member: a,
                show: !0,
            }), t.wxParse("wxParseData", "html", a.copyright, st, "5");
        });
 
    }, 

    get_school_map_ad: function() {
        var t = this;
        a.get("schoolApi/school_map_ad", {
           
        }, function(s) {

            1 == t.setData({
                ad_data:s.data
            });

            
        });
    },

    searchAddress: function (lat, lng) {
        var e = this; 
        wx.showLoading({ 
            title: "加载中..."
        }), console.log(lat, lng, "传入坐标获取详细地理位置"), h && (h.abort(), h = null), h = a.get("dataApiMap/getDetailMaphouselnglat", {
            lat: lat,
            lng: lng,
            school_type: e.data.districtstatus,
            version: 'v1'//线上版本，更新版本v1   
        }, function (t) {
            if (0 == t.error) {  
                var xuequid; 
                for (var arr = [], i = t.data.length - 1; i >= 0; i--) null != t.data[i].xuequ && arr.push({
                    id: t.data[i].id, 
                    is_need_polys: !1,
                    school_type: e.data.districtstatus
                }) && (xuequid = t.data[i].id);
                wx.hideLoading(), e.school_marks(t); 
                 e.load_xuqu_house(xuequid)
            }
        })

    },

    onPointTap: function (dt) {
        var cid = null;
        console.log(dt)
        if (dt.markerId.indexOf("t") == 0) {
            cid = dt.markerId.replace("t", "");
            wx.navigateTo({
                url: "/house/community/index?cid=" + cid
            });
        }else
        {
            cid = dt.markerId
            
            this.load_xuqu_house(cid)
        }
        return;
    },
    open_details: function(t) {
      
        var st = this;
        var cid=st.data.schoolid

        wx.navigateTo({
            url: "/school/school_details/index?cid=" + cid
        });
    },
    load_xuqu_house: function (sid) {

        var st = this;
        st.setData({
            schoolid:sid,
            show_xue:0
        });
        
        a.get("dataApiMap/getDetailMapSchoolchengjiaocode", {
            school_id: sid,
            school_type: st.data.districtstatus
        }, function (t) {
            console.log(t.data);

            st.setData({
                datah: t.data,
                show_xue:1
            });
        });
    },
    school_marks: function (dt) {
        var t = dt.data, ht = dt.dataHouse, a = this.data.districtstatus,
            e = [],
            s = [];
      
       this.setData({
                listnum:ht.length,
                ad:dt.ad
            })
        for (var o = ht.length - 1; o >= 0; o--) {
            var r = ht[o];
            e.push({
                id: "t" + r.fid,
                title: r.community,
                latitude: r.maplat,
                longitude: r.maplng,
                width: 1,
                height: 1,
                iconPath: "../dfimages/map/cztb.png",
                callout: {
                    color: "#ffffff",
                    fontSize: "12",
                    bgColor: "#663399",
                    content: r.title,
                    display: "ALWAYS",
                    padding: 5,
                    borderRadius: 5
                }
            })
        }

        e.push({
            id: "dw",
            latitude: this.data.markerlatitude,
            longitude: this.data.markerlongitude,
            width: 40,
            height: 40,
            zIndex: 999,
            iconPath: "../dfimages/map/focus.png",

        });
        for (var o = t.length - 1; o >= 0; o--) {
            var r = t[o],
                n = null != r.xuequ;
            if ("primary" == a ? e.push({
                    id:  r.id,//(n ? "x" : "f") + r.id
                    latitude: r.lat,
                    longitude: r.lng,
                    width: 38,
                    height: 38,
                    iconPath: n ? "../dfimages/map/xqxxtb.png" : "../dfimages/map/xxtb.png",
                    callout: {
                        color: "#ffffff",
                        fontSize: "14",
                        bgColor: "#3785ea",
                        content: r.title,
                        display: "ALWAYS",
                        padding: 5,
                        borderRadius: 5
                    }
                }) : e.push({
                    id: r.id,// (n ? "x" : "f") +r.id
                    latitude: r.lat,
                    longitude: r.lng,
                    width: 38,
                    height: 38,
                    iconPath: n ? "../dfimages/map/xqcztb.png" : "../dfimages/map/cztb.png",
                    callout: {
                        color: "#ffffff",
                        fontSize: "14",
                        bgColor: "#3785ea",
                        content: r.title,
                        display: "ALWAYS",
                        padding: 5,
                        borderRadius: 5
                    }
                }), n)
                for (var d = r.xuequ.length - 1; d >= 0; d--) s.push(ot({}, g[a], {
                    points: r.xuequ[d].map(function (t) {
                        return {
                            longitude: t[0],
                            latitude: t[1]
                        };
                    })
                }));
        }
        //console.log(e);//console.log(s);


        this.data.xuequ_markers = e, this.data.xuequ_polys = s,
            this.setData({
                map_markers: e,
                map_polygons: s
            });
    },
    bindtap_regionchange: function (t) {
        var st = this;

        return "update" != t.causedBy && ("begin" != t.type && (console.log("视野发生变化", t),
            void m.getCenterLocation({
                success: function (t) {
                    for (var e = st.data.map_markers.length - 1; e >= 0; e--)
                        if ("dw" == st.data.map_markers[e].id) {
                            st.data.map_markers[e].latitude = t.latitude, st.data.map_markers[e].longitude = t.longitude;
                            break;
                        }
                    st.data.markerlatitude = t.latitude, st.data.markerlongitude = t.longitude, st.data.map_polygons = [],
                        st.setData({
                            map_markers: st.data.map_markers,
                            map_polygons: []
                        }), st.searchAddress(t.latitude, t.longitude);
                },
                fail: function (t) {
                    console.error(t);
                }
            })));

    },
    bindtap_switch_school_type: function () {
        "primary" == this.data.districtstatus ? this.data.districtstatus = "middle" : this.data.districtstatus = "primary",
            this.setData({
                xuequ_polys: [],
                map_polygons: [],
                xqxx_auto_cover: !1,
                districtstatus: this.data.districtstatus
            }), this.searchAddress(this.data.markerlatitude, this.data.markerlongitude);
    },
    pn_getlogin:function(){
        var st=this;
        wx.login({
            success: function (aa) {
                a.post("wxapp/login", {
                    code: aa.code
                }, function (dt) {                   
                    st.setData({
                        puserinfo:dt
                    })
                     
                });
            },
            fail: function () {
            a.alert("获取用户信息失败!");
            }
        });
    },
    pn_getPhoneNumber: function (e) {
        var msg = e.detail.errMsg,that = this;
        var encryptedDataStr = e.detail.encryptedData,iv = e.detail.iv,sessionID=that.data.puserinfo.session_key,pn_openid=that.data.puserinfo.openid;
     
        if (msg == 'getPhoneNumber:ok') {
            wx.checkSession({
                success: function () {                  
                    that.pn_deciyption(pn_openid,sessionID, encryptedDataStr, iv);
                },
                fail: function () {    
                    wx.login({
                            success: function (aa) {
                                a.post("wxapp/login", {
                                    code: aa.code
                                }, function (dt) {                          
                                    dt.error ? a.alert("获取用户登录态失败:" + dt.message) :that.pn_deciyption(pn_openid,dt.session_key,e.detail.encryptedData,iv);
                                });
                            },
                            fail: function () {
                            a.alert("获取用户信息失败!");
                            }
                        });
                    }
                });        
        }
   
    },
    pn_deciyption: function (pn_openid,sessionID, encryptedDataStr, iv) {
  
        a.get("wxapp/authBindphone", {
            data: encryptedDataStr,
            iv: iv,
            sessionKey: sessionID,
            pn_openid:pn_openid
        }, function (dt) {                        
            //console.log(dt.phoneNumber); 
            !dt.error?wx.navigateTo({
                url: '/project/pages/reportsa/index'
            }):a.alert("网络异常，请重新获取！");   
        });
    },
    pn_hotLink:function(e){
        wx.navigateTo({
            url: '/project/pages/reportsa/index'
        })
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
    hotLinkFn: function (dt) {
        var st = this;
        console.log(dt);
        var community = dt.currentTarget.dataset.communityid;

        var maplat = community.maplat;
        var maplng = community.maplng;

        wx.hideLoading(), st.setData({
            markerlatitude: maplat,
            markerlongitude:maplng,
            show_map: !0,
            searchList:[]
        }), st.searchAddress(maplat,maplng);

    },
    handleGoT: function (a) {
        var t = a.currentTarget.dataset.go;
        t ? wx.navigateTo({
            url: t
        }) : wx.showToast({
            title: "持续开发中..."
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var a = this;
        return {
            title: "杭州学区地图查询房源每日成交报告!",
            path: "/school/school_map/index?lat=" + a.data.markerlatitude + "&lng=" + a.data.markerlongitude + "&districtstatus=" + a.data.districtstatus,
            success: function (t) {
                console.log(t);
            },
            fail: function (t) {}
        };
    },
    imgYu: function (event) {
        var src = event.currentTarget.dataset.image; //获取data-src
        //var imgList = event.currentTarget.dataset.list;//获取data-list
        var src = src;
        var imgArr = [];
        imgArr[0] = src;
        //图片预览
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: imgArr // 需要预览的图片http链接列表
        })
    },
     //打开规则提示
     showRule: function () {
        this.setData({
            isRuleTrue: true
        })
    },
    //关闭规则提示
    hideRule: function () {
        this.setData({
            isRuleTrue: false
        })
    },
})