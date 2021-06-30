// dfpage/test.js
import * as echarts from '../../ec-canvas/echarts';

let chart = null;
var chartData = null;
let charts = null;
var chartDatas = null;
//每日成交柱状图
function getOption(aText, aSubtext, xData, sData) {
    var option = {
        tooltip: {
            trigger: 'axis',
            position: function position(pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                // var obj = {};
                // obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                if (pos[0] < size.viewSize[0] / 2) {
                    return pos;
                } else {
                    pos[0] = pos[0] - size.contentSize[0];
                    return pos;
                }
            },
            showContent: true,
            formatter: function(a) {
                var ltter = null;
                for (var i = 0; i < a.length; i++) {
                    ltter = a[i].name + '日：\n带看：' + a[i].data + '次\n均价：' + chartData.seriesData1[a[i].dataIndex] + '元'
                }
                return ltter
            }
        },
       
        calculable: true,
        grid: {
            borderWidth: 0,
            y: 50,
            y2: 40
        },
        xAxis: [{
            type: 'category',
            data: xData
        }],
        yAxis: [{
            type: 'value'

        }],
        series: [{
            type: 'line',
            name: true,
            itemStyle: {
                normal: {
                    color: function(params) {
                        var colorList = [
                            '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD',
                            '#39A5FD', '#39A5FD'
                        ];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}次'
                    }
                }
            },
            data: sData
        }]
    };

    return option;
}

function getOption1(aText, aSubtext, xData, sData) {
    var option = {
        tooltip: {
            trigger: 'axis',
            position: function position(pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                // var obj = {};
                // obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                if (pos[0] < size.viewSize[0] / 2) {
                    return pos;
                } else {
                    pos[0] = pos[0] - size.contentSize[0];
                    return pos;
                }
            },
            showContent: true,
            formatter: function(a) {
                var ltter = null;
                for (var i = 0; i < a.length; i++) {
                    ltter = a[i].name + '日：\n带看：' + a[i].data + '次\n均价：' + chartDatas.seriesData1[a[i].dataIndex] + '元'
                }
                return ltter
            }
        },
       
        calculable: true,
        grid: {
            borderWidth: 0,
            y: 50,
            y2: 40
        },
        xAxis: [{
            type: 'category',
            data: xData
        }],
        yAxis: [{
            type: 'value'

        }],
        series: [{
            type: 'line',
            name: true,
            itemStyle: {
                normal: {
                    color: function(params) {
                        var colorList = [
                            '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD',
                            '#39A5FD', '#39A5FD'
                        ];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}次'
                    }
                }
            },
            data: sData
        }]
    };

    return option;
}



var o = Object.assign || function(o) {
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
    c = {
        primary: {
            fillColor: "#FF52004C",
            strokeColor: "#FF500021"
        },
        middle: {
            fillColor: "#2692DB4c",
            strokeColor: "#2692DB66"
        }
    };

Page({
    /**
     * 页面的初始数据
     */
    data: {
        ecLinet: {
            onInit: function(canvas, width, height) {
                //初始化echarts元素，绑定到全局变量，方便更改数据
                chart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });
                canvas.setChart(chart);

                //可以先不setOption，等数据加载好后赋值，
                //不过那样没setOption前，echats元素是一片空白，体验不好，所有我先set。
                var xData = [];
                var sData = [];
                var aText = '';
                var aSubtext = '';
                var option = getOption(aText, aSubtext, xData, sData);
                chart.setOption(option);
                return chart;
            }
        },
        ecLinets: {
            onInit: function(canvas, width, height) {
                //初始化echarts元素，绑定到全局变量，方便更改数据
                charts = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });
                canvas.setChart(charts);

                //可以先不setOption，等数据加载好后赋值，
                //不过那样没setOption前，echats元素是一片空白，体验不好，所有我先set。
                var xData = [];
                var sData = [];
                var aText = '';
                var aSubtext = '';
                var option = getOption1(aText, aSubtext, xData, sData);
                charts.setOption(option);
                return charts;
            }
        },
        cid: '',
        house: [],
        community: [],
        countArray: [],
        usalelog: [],
        deallist: [],
        gotolist: [],
        islogin: 'no',
        limits: !0,
        isShare: !1,
        fxshow: !0,
        member: {},
        mid: 0,
        jigou: 0,
        isIpx: e.globalData.isIpx,
        see: !1,
        swiperCurrent: 0,
        mapImageUrl: '',
        mapFacility: [{
            title: "商业",
            mtype: "1"
        }, {
            title: "休闲",
            mtype: "2"
        }, {
            title: "交通",
            mtype: "3"
        }, {
            title: "医疗",
            mtype: "4"
        }, {
            title: "学校",
            mtype: "5"
        }],
        maplng: 0,
        maplat: 0,
        map_scale: 14,
        map_markers: [],
        map_polygons: [],
        markerlatitude: "",
        markerlongitude: "",
        puserinfo:{},
        activeItem:1,
        chuzhonglist:[],
        diytitle:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(dt) {
        var st = this;
        //console.log('load:'+dt.cid);
        st.setData({
            cid: dt.cid,
            jigou: dt.jigou,
            mid: dt.mid
        });

         //分享锁粉
         var et = decodeURIComponent(dt.scene);
         if (!dt.id && et) {
             var n = a.str2Obj(et); //str2Obj --> e.requirejs("core"),
             dt.id = n.id, n.mid && (dt.mid = n.mid, e.setCache("usermid", n)); // setCache--> e = getApp()
         }   // 
         e.url(dt);
         
        //判断页面来源
        let pages = getCurrentPages()
        if (pages.length < 2) {
            st.setData({
                isShare: !0
            });
        }

        let prevPage = pages[pages.length - 2];

        // -2 就是你上一页的数据 你上上页的数据就是-3 了以此类推！
        // 直接操作上一个页面的 index数据 之后返回 
        prevPage.setData({
            prevIndex: 2
        })

        //console.log(pages);
    },
    goto: function(dt) {
        var cid = dt.currentTarget.dataset.cid;
        //console.log(cid);
        wx.navigateTo({
            appId: "wxcfd8224218167d98",
            url: "/pages/esf/esf_details",
            success: function() {
                console.log('跳转到news页面成功') // success              
            },
            fail: function() {
                console.log('跳转到news页面失败');
            }
        })
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        e.checkAuth();

        var t = this,
            a = wx.getSystemInfoSync();
            this.pn_getlogin(),this.getInfo(), t.get_house(), wx.getSetting({
            success: function(a) {
                var e = a.authSetting["scope.userInfo"];
                t.setData({
                    anum: e
                });
            }
        }), m = wx.createMapContext("map");
    },
    getInfo: function() {
        var e = this;
        a.get("member", {
            mid: this.data.mid
        }, function(a) {
            
            1 == a.isblack && wx.showModal({
                title: "无法访问",
                content: "系统升级中，不能访问！",
                success: function(a) {
                    a.confirm && e.close(), a.cancel && e.close();
                }
            }), e.setData({
                member: a,
                show: !0,
            }), t.wxParse("wxParseData", "html", a.copyright, e, "5");
        });
    },
    get_house: function() {
        var t = this;
        //console.log('load:'+t.data.cid);
        a.get("chatApi/get_house", {
            cid: t.data.cid,
            jigou: t.data.jigou
        }, function(a) {
            var arrimg = a.house.house_img.replace("x-oss-process=style/", "").substring(0, a.house.house_img.length - 2).split('||'); //?x-oss-process=style/
            // console.log(a.countArray);
            t.setData({
                house: a.house,
                community: a.community,
                countArray: a.countArray,
                usalelog: a.usalelog,
                deallist: a.deallist,               
                islogin: a.islogin,
                ad: a.ad,
                noList: a.noList,
                home_pics: arrimg,
                chuzhonglist:a.chuzhonglist,
                 //gotolist: a.gotolist, 
            });

            setTimeout(function() {
               
                chartData = a.chartsData;
                chart.setOption({
                    xAxis: {
                        data: a.chartsData.xAxisName
                    },
                    series: [{
                        data: a.chartsData.seriesData
                    }]
                });
                
                chartDatas = a.chartsDatas;
                charts.setOption({
                    xAxis: {
                        data: a.chartsDatas.xAxisName
                    },
                    series: [{
                        data: a.chartsDatas.seriesData
                    }]
                });

            }, 1500);
            //t.getMapImage(a.community.baidumaplng, a.community.baidumaplat);
            var mapt = t.bMapTransQQMap(a.community.baidumaplng, a.community.baidumaplat);
      
            t.setData({
                maplng: mapt.lng,
                maplat: mapt.lat
            }), t.getMapSchool(mapt.lng, mapt.lat);

            //t.getMapImage(mapt.lng, mapt.lat);

        });

    },
    getMapSchool: function(lng, lat) {
        var st = this;
         
        a.get("dataApiMap/getDetailMapSchoolPolys", {
            houseid: st.data.house.fid,
            lng: st.data.maplng,
            lat: st.data.maplat
        }, function(t) {

            var a = t.data;

            if (a.xuequ_type) {
                var e = [{
                        id: a.id,
                        longitude: a.lng,
                        latitude: a.lat,
                        width: 28,
                        height: 28,
                        iconPath: "primary" == a.xuequ_type ? "https://sbmf.ww2ss.com/dfimages/map/xxtb.png" : "https://sbmf.ww2ss.com/dfimages/map/cztb.png",
                        callout: {
                            content: a.title,
                            color: "#ffffff",
                            fontSize: 11,
                            padding: 5,
                            bgColor: "#fb5e5e",
                            borderRadius: 17,
                            display: "ALWAYS",
                            borderWidth: 1,
                            borderColor: "#ffffff"
                        }
                    }, {
                        id: a.id,
                        longitude: lng,
                        latitude: lat,
                        width: 28,
                        height: 28,
                        iconPath: "/dfimages/match_icon_location_yell@3x.png",
                        callout: {
                            content: st.data.house.community,
                            color: "#ffffff",
                            fontSize: 11,
                            padding: 5,
                            bgColor: "#3785ea",
                            borderRadius: 17,
                            display: "ALWAYS",
                            borderWidth: 1,
                            borderColor: "#ffffff"
                        }
                    }],
                    s = [];

                a.polys.forEach(function(t) {
                    s.push(o({
                        points: t.map(function(o) {
                            return {
                                longitude: o[0],
                                latitude: o[1]
                            };
                        })
                    }, c[a.xuequ_type]));
                }), st.setData({
                    map_scale: 13,
                    map_markers: e,
                    map_polygons: s
                })
                
            };

        });

    },
    getMapSchool1: function(lng, lat) {
        var st = this;
        a.get("dataApiMap/getDetailMapSchoolPolys", {
            houseid: st.data.house.fid,
            lng: st.data.maplng,
            lat: st.data.maplat
        }, function(t) {

            var a = t.data;
            /***
            if (a.xuequ_type) {
                var e = [{
                        id: a.id,
                        longitude: a.lng,
                        latitude: a.lat,
                        width: 28,
                        height: 28,
                        iconPath: "primary" == a.xuequ_type ? "https://sbmf.ww2ss.com/dfimages/map/xxtb.png" : "https://sbmf.ww2ss.com/dfimages/map/cztb.png"
                    }, {
                        id: a.id,
                        longitude: lng,
                        latitude: lat,
                        width: 28,
                        height: 28,
                        iconPath: "/dfimages/match_icon_location_yell@3x.png",
                        callout: {
                            content: st.data.house.community,
                            color: "#ffffff",
                            fontSize: 11,
                            padding: 5,
                            bgColor: "#3785ea",
                            borderRadius: 17,
                            display: "ALWAYS",
                            borderWidth: 1,
                            borderColor: "#ffffff"
                        }
                    }],
                    s = [];

                a.polys.forEach(function(t) {
                    s.push(o({
                        points: t.map(function(o) {
                            return {
                                longitude: o[0],
                                latitude: o[1]
                            };
                        })
                    }, c[a.xuequ_type]));
                }), st.setData({
                    map_scale: 13,
                    map_markers: e,
                    map_polygons: s
                })
            };
            ****/
        });

    },
    getMapImage: function(lng, lat) {
        var i = this.data.maplat,
            a = this.data.maplng,
            r = "https://apis.map.qq.com/ws/staticmap/v2/?center=" + i + "," + a + "&zoom=15&size=690*320&maptype=roadmap&markers=size:large|color:orange|" + i + "," + a + "&key=FLNBZ-J3GKX-UC74A-7K3XU-QOEX2-XGBRC";

        this.setData({
            "mapImageUrl": r
        });
    },
    bindtap_regionchange: function(t) {
        var st = this;

        return "update" != t.causedBy && ("begin" != t.type && (console.log("视野发生变化", t),
            void m.getCenterLocation({
                success: function(t) {
                    console.log(t.longitude, t.latitude);

                    for (var e = st.data.map_markers.length - 1; e >= 0; e--)
                        if ("dw" == st.data.map_markers[e].id) {
                            st.data.map_markers[e].latitude = t.latitude, st.data.map_markers[e].longitude = t.longitude;
                            break;
                        }
                    st.data.markerlatitude = t.latitude, st.data.markerlongitude = t.longitude, st.data.map_polygons = [],
                        st.setData({
                            map_markers: st.data.map_markers,
                            polys: []
                        });
                },
                fail: function(t) {
                    console.error(t);
                }
            })));

    },

    swiperChange: function(t) {
        "touch" == t.detail.source && this.setData({
            swiperCurrent: t.detail.current
        });
    },
    bMapTransQQMap: function (lng, lat) {

        let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
        let x = lng - 0.0065;
        let y = lat - 0.006;
        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
        let lngs = z * Math.cos(theta);
        let lats = z * Math.sin(theta);
        console.log(lngs, lats);
        return {
            lng: lngs,
            lat: lats
        } 
    },

    prevImg: function(t) {
        var a = t.currentTarget.dataset.url,
            e = (t.currentTarget.dataset.index, this.data.home_pics);
        wx.previewImage({
            current: a,
            urls: e
        });
    },
    favorite: function(da) {
        e.checkAuth();
        var dt = this;
        var b = da.currentTarget.dataset.isfavorite ? 0 : 1;
        a.get("member/favorite/toggle", {
            cid: dt.data.cid,
            isfavorite: b
        }, function(t) {
            b ? dt.setData({
                "countArray.isfavorite": 1
            }) : dt.setData({
                "countArray.isfavorite": 0
            });
        });

    },
    handleCall: function(t) {
        var a = t.currentTarget.dataset.phone;
        a && wx.makePhoneCall({
            phoneNumber: a
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
    handleGo: function(t) {
        var a = t.currentTarget.dataset.cid;
        wx.navigateTo({
            url: '/house/guwen/gw-add/index?cid=' + a,
        })
    },
    handleGoDetail: function(t) {
        var a = t.currentTarget.dataset.userid;
        var b = t.currentTarget.dataset.adid;
        var c = t.currentTarget.dataset.houseid;
        var e = t.currentTarget.dataset.title;
        var c = t.currentTarget.dataset.houseid;
        var c = t.currentTarget.dataset.houseid;
        var c = t.currentTarget.dataset.houseid;
        wx.navigateTo({
            url: '/house/guwen/gw-detail/index?userid=' + a + '&adid=' + b + '&houseid=' + c,
        })
    },
    goPage: function goPage(dt) {
        var page = dt.currentTarget.dataset.page;
        wx.switchTab({
            //跳转到tabBar页面，并关闭其他所有tabBar页面
            url: "/" + page
        });
    },
    hotLinkFn: function(dt) {

        var dc = dt.currentTarget.dataset.communityid;
        var t = this;
        var sd = {
                id: dc.fid,
                title: dc.community
            },
            r = Object.assign(sd);

        getApp().globalData.dtsearch = r;

        wx.navigateTo({
            url: "/house/market/index"
        });
    },
    goSee: function() {
        var st = this;
        st.setData({
            see: !0,
        })
    },
    closeSee: function() {
        var st = this;
        st.setData({
            see: !1,
        })
    },
    imgYu: function(event) {

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
    copyText: function(e) {
        wx.setClipboardData({
            data: e.currentTarget.dataset.text,
            success: function(res) {
                wx.getClipboardData({
                    success: function(res) {
                        setTimeout(function() {
                            // 获取 chart 实例的方式
                            a.alert("客服微信号已复制,去添加好友加群！");
                        }, 100);

                    }
                })
            }
        })
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
    pn_getPhoneNumber_fangdong: function (e) {
        var msg = e.detail.errMsg,that = this;
        // var encryptedDataStr = e.detail.encryptedData,iv = e.detail.iv,sessionID=that.data.puserinfo.session_key,pn_openid=that.data.puserinfo.openid;

        // if(that.data.member.needbind==1){
        //     console.log(that.data.member.needbind);
        //     a.get("zhiDing/zhiDingFangDongMebile", {
        //         cid: that.data.house.cid
        //     }, function (dt) {                   
        //         // console.log(dt.data);
        //         dt.data && wx.makePhoneCall({
        //             phoneNumber: dt.data
        //       });      
        //     });
        // }else{
            a.get("zhiDing/zhiDingFangDongMebile", {
                cid: that.data.house.cid
            }, function (dt) {                   
                 
                dt.data && wx.makePhoneCall({
                    phoneNumber: dt.data
              });      
            });
        // }

        // if (msg == 'getPhoneNumber:ok') {
        //     wx.checkSession({
        //         success: function () {                  
        //             that.pn_deciyption(pn_openid,sessionID, encryptedDataStr, iv);
        //         },
        //         fail: function () {    
        //             wx.login({
        //                     success: function (aa) {
        //                         a.post("wxapp/login", {
        //                             code: aa.code
        //                         }, function (dt) {                          
        //                             dt.error ? a.alert("获取用户登录态失败:" + dt.message) :that.pn_deciyption(pn_openid,dt.session_key,e.detail.encryptedData,iv);
        //                         });
        //                     }, 
        //                     fail: function () {
        //                     a.alert("获取用户信息失败!");
        //                     }
        //                 });
        //             }
        //         });        
        // }
   
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
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        var st = this;
        console.log("st.data.cid:" + st.data.cid);
  
        st.setData({
            diytitle:st.data.house.title
        });

        var t = null, at = null;
        return this.data.diytitle && (t = '/house/house/house?cid=' + st.data.cid, at = this.data.diytitle), 
        a.onShareAppMessage(t, at);   // onShareAppMessage -->  e.requirejs("core"),

    },
    close: function() {
        e.globalDataClose.flag = !0, wx.reLaunch({
            url: "/pages/message/auth/index"
        });
    },
        /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},
    handleSwitch: function(d) {
        var t = this;
        if(t.data.member.viplevel==0)
        {
            setTimeout(function() {
                // 获取 chart 实例的方式
                a.alert("该功能限【专业版】使用，联系客服开通！");
            }, 100);
            return;
        }
        1 == t.setData({
            activeItem:  d.currentTarget.dataset.text,
            deallist:[],
            loading:1
        });
        
        a.get("chatApi/get_house_deallist", {
            cid: t.data.cid,
            activeItem: this.data.activeItem
        }, function(a) {
            1 == t.setData({ 
                deallist: a.deallist,
                loading:!1
            });

        });
    },
    
})