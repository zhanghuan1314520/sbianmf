// dfpage/test.js
import * as echarts from '../../ec-canvas/echarts';

let chart = null;
var chartData = null;
let charts = null;
var chartDatas = null;

//最近七月成交柱状表
function getOption(aText, aSubtext, xData, sData) {
    function calMax(arr) {
        var max = arr[0];
        for (var i = 1; i < arr.length; i++) { // 求出一组数组中的最大值
            if (max < arr[i]) {
                max = arr[i];
            }
        }
        var maxint = Math.ceil(max / 10); // 向上取整
        var maxval = maxint * 10; // 最终设置的最大值
        return maxval; // 输出最大值
    }
    var appregnum = [210, 110, 330, 110, 180, 330, 290];
    var activenum = [31000, 31600, 33000, 30100, 31200, 35003, 29000];
    var maxappreg = calMax(appregnum); //注册Y轴值
    var maxactive = calMax(activenum); //活跃Y轴值
    var interval_left = maxappreg / 5; //左轴间隔
    var interval_right = maxactive / 5; //右轴间隔



    var option = {
        //1、 格式化提示信息
        legend: {
            data: ['成交', '均价'],
            textStyle: {
                fontSize: 12, //字体大小

            },
        },
        tooltip: {
            trigger: 'axis',
            showContent: true,
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

        },
        grid: {
            y: "40",
            y2: "20",
            bottom: 60
        },

       
        animation: false,
        dataZoom: [{
            show: true,
            start: 80,
            end: 100
        },
        {
            type: 'inside',
            start: 80,
            end: 100
        },
        ],
        xAxis: [{
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            }
        },],
        yAxis: [{
            type: 'value',
            scale: true,
            min: 0,
            splitNumber: 5,
            boundaryGap: [0.2, 0.2],
            axisLabel: {
                margin: 2,
                formatter: function (value, index) {
                    if (value >= 1000 && value < 10000) {
                        value = value / 1000 + "千";
                    } else if (value >= 10000 && value < 100000) {
                        value = value / 10000 + "万";
                    }
                    return value;
                }
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                fontSize: 9
            }
        },
        {
            type: 'value',
            min: 0,
            splitNumber: 5,
            boundaryGap: [0.2, 0.2],
            splitLine: {
                show: false
            },
            axisLabel: {
                margin: 2,
                formatter: function (value, index) {
                    if (value >= 1000 && value < 10000) {
                        value = value / 1000 + "千";
                    } else if (value >= 10000 && value < 100000) {
                        value = value / 10000 + "万";
                    }
                    return value;
                }
            },
            axisLabel: {
                fontSize: 9
            }
        }
        ],
        series: [{
            name: '成交',
            type: 'bar',
            yAxisIndex: 0,
            axisLabel: {
                fontSize: 9
            },
            itemStyle: {
                normal: {
                    color: '#39A5FD', //折点颜色
                    lineStyle: {
                        color: '#39A5FD' //折线颜色
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}套'
                    }
                }
            },
            data: appregnum
        },
        {
            name: '均价',
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            axisLabel: {
                fontSize: 9
            },
            itemStyle: {
                normal: {
                    color: '#e70059', //折点颜色
                    lineStyle: {
                        color: '#e70059' //折线颜色
                    },

                    label: {
                        show: false,
                        position: 'top',
                        formatter: '{c}元'
                    }
                }
            },
            data: activenum
        },
        ]


    };


    return option;
}

function getOption1(aText, aSubtext, xData, sData) {
    function calMax(arr) {
        var max = arr[0];
        for (var i = 1; i < arr.length; i++) { // 求出一组数组中的最大值
            if (max < arr[i]) {
                max = arr[i];
            }
        }
        var maxint = Math.ceil(max / 10); // 向上取整
        var maxval = maxint * 10; // 最终设置的最大值
        return maxval; // 输出最大值
    }
    var appregnum = [210, 110, 330, 110, 180, 330, 290];
    var activenum = [31000, 31600, 33000, 30100, 31200, 35003, 29000];
    var maxappreg = calMax(appregnum); //注册Y轴值
    var maxactive = calMax(activenum); //活跃Y轴值
    var interval_left = maxappreg / 5; //左轴间隔
    var interval_right = maxactive / 5; //右轴间隔



    var option = {
        //1、 格式化提示信息
        legend: {
            data: ['成交', '均价'],
            textStyle: {
                fontSize: 12, //字体大小

            },
        },
        tooltip: {
            trigger: 'axis',
            showContent: true,
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

        },
        grid: {
            y: "40",
            y2: "20",
            bottom: 60
        },

      
        animation: false,
        dataZoom: [{
            show: true,
            start: 80,
            end: 100
        },
        {
            type: 'inside',
            start: 80,
            end: 100
        },
        ],
        xAxis: [{
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            }
        },],
        yAxis: [{
            type: 'value',
            scale: true,
            min: 0,
            splitNumber: 5,
            boundaryGap: [0.2, 0.2],
            axisLabel: {
                margin: 2,
                formatter: function (value, index) {
                    if (value >= 1000 && value < 10000) {
                        value = value / 1000 + "千";
                    } else if (value >= 10000 && value < 100000) {
                        value = value / 10000 + "万";
                    }
                    return value;
                }
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                fontSize: 9
            }
        },
        {
            type: 'value',
            min: 0,
            splitNumber: 5,
            boundaryGap: [0.2, 0.2],
            splitLine: {
                show: false
            },
            axisLabel: {
                margin: 2,
                formatter: function (value, index) {
                    if (value >= 1000 && value < 10000) {
                        value = value / 1000 + "千";
                    } else if (value >= 10000 && value < 100000) {
                        value = value / 10000 + "万";
                    }
                    return value;
                }
            },
            axisLabel: {
                fontSize: 9
            }
        }
        ],
        series: [{
            name: '带看次数',
            type: 'line',
            yAxisIndex: 0,
            axisLabel: {
                fontSize: 9
            },
            itemStyle: {
                normal: {
                    color: '#39A5FD', //折点颜色
                    lineStyle: {
                        color: '#39A5FD' //折线颜色
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}次'
                    }
                }
            },
            data: appregnum
        },
        {
            name: '带看均价',
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            axisLabel: {
                fontSize: 9
            },
            itemStyle: {
                normal: {
                    color: '#e70059', //折点颜色
                    lineStyle: {
                        color: '#e70059' //折线颜色
                    },

                    label: {
                        show: false,
                        position: 'top',
                        formatter: '{c}次'
                    }
                }
            },
            data: activenum
        },
        ]


    };


    return option;
}

var ot = Object.assign || function (ot) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && (ot[e] = a[e]);
    }
    return ot;
},
    m,e = getApp(),
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
        school: [],
        avatar_list: [],
        chuzhonglist: [], //对口初中
        houseList: [],//划片小区
        HouseList_total:0,
        fujingschool:[],//附近学校
        countArray: [],
        usalelog: [],
        deallist: [],
        zbpricelist: [],
        lppricelist: [],
        islogin: '',
        limits: !0,
        isShare: !1,
        member: {},
        mid: 0,
        isIpx: e.globalData.isIpx,
        see:!1,
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
        map_polylines: [],
        markerlatitude: "",
        markerlongitude: "",
        toView:"",
        default_school_image:"https://sbmf.ww2ss.com/dfimages/school.jpg",
        activeItem:1,
        loading:!1,
        uploadimgs:[],
        uploadimages:[],
        diytitle:'',

    },
    bindtap_set_scroll_into_view: function(o) {
        this.setData({
            toView: o.currentTarget.dataset.toview
        });
    },
    to() {
        wx.navigateToMiniProgram({
            appId: 'wx628f3daad858165e',
            extraData: {
                company_name: 'kuadu' //传参数
            },
            success(res) {
                // 打开成功
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(dt) {
        var st = this,e = wx.getSystemInfoSync();
        //判断页面来源
        let pages = getCurrentPages()
        if (pages.length < 2) {
            st.setData({
                isShare: !0
            });
        }
        st.setData({
            cid: dt.cid,
            mid: dt.mid,
            windowheight: e.windowHeight

        });

            //分享锁粉
        var et = decodeURIComponent(dt.scene);
        if (!dt.id && et) {
            var n = a.str2Obj(et); //str2Obj --> e.requirejs("core"),
            dt.id = n.id, n.mid && (dt.mid = n.mid, e.setCache("usermid", n)); // setCache--> e = getApp()
        }   // 
        e.url(dt);
      

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        e.checkAuth();
        var t = this,
            a = wx.getSystemInfoSync();
        this.pn_getlogin(),this.getInfo(), t.get_community(), wx.getSetting({
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
            }), 0 != a.error ? wx.redirectTo({
                url: "/pages/message/auth/index"
            }) : e.setData({
                member: a,
                //show: !0,
                iscycelbuy: a.iscycelbuy,
                bargain: a.bargain
            }), t.wxParse("wxParseData", "html", a.copyright, e, "5");

            console.log(e.data.member);   

        });
    },
  
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
        
        a.get("schoolApi/get_deallist", {
            cid: t.data.cid,
            activeItem: this.data.activeItem
        }, function(a) {
            1 == t.setData({ 
                deallist: a.deallist,
                loading:!1
            });

        });
    },
    get_community: function() {
        var t = this;
        a.get("datafang/islogin", {}, function(dt) {
            t.setData({
                islogin: dt.islogin
            })
            a.get("schoolApi/get_details", {
                cid: t.data.cid
            }, function(a) {

                1 == t.setData({
                    school: a.community,
                    houseList:a.HouseList,
                    HouseList_total:a.HouseList_total,
                    countArray: a.countArray,
                   // deallist: a.deallist,
                   // zbpricelist: a.zbpricelist,
                   // lppricelist: a.lppricelist,
                  //  ad:a.ad,
                   // noList: a.noList,
                    avatar_list:a.avatar_list,
                    chuzhonglist:a.chuzhonglist,
                    fujingschool:a.fujingschool,
                    show: !0
                });
 
               var mapt = t.bMapTransQQMap(a.community.lng, a.community.lat);
                t.setData({
                    maplng: mapt.lng,
                    maplat: mapt.lat
                }),  t.getMapSchool();

            });
        });
    
        t.get_details_tudata();

    },

    get_details_tudata: function() {
        var t = this;
        a.get("datafang/islogin", {}, function(dt) {
            t.setData({
                islogin: dt.islogin
            })
            a.get("schoolApi/get_details_tudata", {
                cid: t.data.cid
            }, function(a) {

                1 == t.setData({
                   // school: a.community,
                 //   houseList:a.HouseList,
                 //   HouseList_total:a.HouseList_total,
                  //  countArray: a.countArray,
                    deallist: a.deallist,
                    zbpricelist: a.zbpricelist,
                    lppricelist: a.lppricelist,
                    ad:a.ad,
                    noList: a.noList,
                  //  avatar_list:a.avatar_list,
                  //  chuzhonglist:a.chuzhonglist,
                  //  fujingschool:a.fujingschool,
                   // show: !0
                });


                setTimeout(function() {

                    //成交走势图
                    chartData = a.chartsData;
                    chart.setOption({
                        legend: {
                            data: a.chartsData.lddata
                        },
                        dataZoom: [{
                            show: true,
                            start: a.chartsData.dataz[0],
                            end: a.chartsData.dataz[1]
                        },
                        {
                            type: 'inside',
                            start: a.chartsData.dataz[0],
                            end: a.chartsData.dataz[1]
                        },
                        ],
                        xAxis: {
                            data: a.chartsData.xAxisName
                        },
                        xAxis: {
                            data: a.chartsData.xAxisName
                        },
                        series: [{
                            name: a.chartsData.lddata[0],
                            data: a.chartsData.seriesData
                        }, {
                            name: a.chartsData.lddata[1],
                            data: a.chartsData.seriesData1
                        }]
                    });
                    //带看走势图
                    chartDatas = a.chartsDatas;
                    charts.setOption({
                        legend: {
                            data: a.chartsDatas.lddata
                        },
                        dataZoom: [{
                            show: true,
                            start: a.chartsDatas.ddataz[0],
                            end: a.chartsDatas.ddataz[1]
                        },
                        {
                            type: 'inside',
                            start: a.chartsDatas.ddataz[0],
                            end: a.chartsDatas.ddataz[1]
                        },
                        ],
                        xAxis: {
                            data: a.chartsDatas.xAxisName
                        },
                        xAxis: {
                            data: a.chartsDatas.xAxisName
                        },
                        series: [{
                            name: a.chartsDatas.dlddata[0],
                            data: a.chartsDatas.seriesData
                        }, {
                                name: a.chartsDatas.dlddata[1],
                                data: a.chartsDatas.seriesData1
                        }]
                    });
                }, 1000);
               

            });
        });


    }, 
    jumpMapUrl: function() {
        var st = this;
        wx.openLocation({
            latitude: parseFloat(this.data.school.lat),
            longitude: parseFloat(this.data.school.lng),
            name: this.data.school.title,
            address: this.data.school.address || ""
        });
    },
    getMapSchool: function () {
        var st = this;

            var a = st.data.school;

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
                    longitude: a.lng,
                    latitude: a.lat,
                    width: 28,
                    height: 28,
                    iconPath: "/dfimages/match_icon_location_yell@3x.png",
                    callout: {
                        content: st.data.school.title,
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
                    s.push(ot({
                        points: t.map(function(o) {
                            return {
                                longitude: o[0],
                                latitude: o[1]
                            };
                        })
                    }, c[a.xuequ_type]));
                })
                st.setData({
                    map_scale: 13,
                    map_markers: e,
                    map_polygons: s
                })

            };



    },
    create_school_polygon: function(e, r, n) {
        for (var l = [], a = n.length - 1; a >= 0; a--) r ? l.push(o({}, i[e], {
            points: n[a].map(function(e) {
                return {
                    longitude: e[0],
                    latitude: e[1]
                };
            })
        })) : l.push(o({}, o[e], {
            points: n[a].map(function(e) {
                return {
                    longitude: e[0],
                    latitude: e[1]
                };
            })
        }));
        return l;
    },
    create_school_polyline: function(e, r) {
        for (var i = [], o = r.length - 1; o >= 0; o--) i.push(o({}, n[e], {
            points: r[o].map(function(e) {
                return {
                    longitude: e[0],
                    latitude: e[1]
                };
            })
        }));
        return i;
    },
    bMapTransQQMap: function  (lng, lat) {

        let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
        let x = lng - 0.0065;
        let y = lat - 0.006;
        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
        let lngs = z * Math.cos(theta);
        let lats = z * Math.sin(theta);
        //console.log(lngs, lats);
        return {
            lng: lngs,
            lat: lats
        }
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

    hotLinkFn: function (dt) {
    
        var t = this;

        var dc={
            id: t.data.school.id,
            title: t.data.school.title,
            xuequ_type: t.data.school.xuequ_type,
            ftype: "5",
            loanCount: ""
        };    
        console.log(dc);
        getApp().globalData.dtsearch = dc;
        wx.navigateTo({
            url: "/house/market/index"
        }); 

      
    },
    toschool_housesearch: function () {//跳转学区小区更多成交
        var t = this;
        var cid = t.data.school.schoolcode
        //console.log(sd)
         wx.navigateTo({
            url: "../school_dealog/index?cid=" + cid
        });
    },
  
    goHouse: function goPage(dt) {
        var cid = dt.currentTarget.dataset.cid;
        if (cid == '') {
            return;
        }
        wx.navigateTo({
            url: "/house/house/house/house?cid=" + cid
        });
    },
    gotoCommunity: function (dt) {
        var cid = dt.currentTarget.dataset.communityid;
        if (cid == '') {
            return;
        }
        wx.navigateTo({
            url: "../../house/community/index?cid=" + cid
        });
    },
    goCommunity: function goPage(dt) {
        var cid = dt.currentTarget.dataset.cid;
        if (cid == '') {
            return;
        }
        wx.navigateTo({
            url: "../../house/community/index?cid=" + cid
        });
    },
    goPage: function goPage(dt) {
        var page = dt.currentTarget.dataset.page;
        wx.switchTab({
            //跳转到tabBar页面，并关闭其他所有tabBar页面
            url: "/" + page
        });
    },
    goSee:function(){
        var st=this;
        st.setData({
            see:!0,
        })
    },
    closeSee:function(){
        var st = this;
        st.setData({
            see: !1,
        })
    },
    handleGoT: function (a) {
        var t = a.currentTarget.dataset.go;
        t ? wx.navigateTo({
            url: t
        }) : wx.showToast({
            title: "持续开发中..."
        });
    },
    handleGo: function (t) {
        var a = t.currentTarget.dataset.cid;
        var ad_type="学区"
        wx.navigateTo({
            url: '/house/guwen/gw-add/index?cid=' + a+"&ad_type="+ad_type,
        })
    },
    prevImg: function(t) {
        var a = t.currentTarget.dataset.url,
            e = (t.currentTarget.dataset.index, this.data.home_pics);
        wx.previewImage({
            current: a,
            urls: e
        });
    },
    bindtap_goto_album: function (t) { //上传图片

      
        //wx.navigateTo({
          ///  url: '/dfpage/school/img-add/index?cid=' + cid,
       // })
       var st=this;
       var cid = st.data.cid;
      var n = st.data.uploadimages,s=st.data.uploadimgs;

       a.upload(function (e) {   
            console.log(e);  
            n.push(e.filename), s.push(e.url), st.setData({
                uploadimages: n,
                uploadimgs: s
            });
               
            a.get("schoolApi/imgadd", {
                uploadimages:st.data.uploadimages,
                cid:cid,
            }, function (a) {
                if (a.msg =="OK"){
                    wx.navigateTo({
                         url: '/school/msgbox/index?cid=' + cid,
                    })
                }else{
                    a.alert(a.msg);
                }
    
            });


        }) ;
        
        console.log(e);  

    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    handleCall: function (t) {
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
    handleGoDetail: function (t) {
        var a = t.currentTarget.dataset.userid;
        var b = t.currentTarget.dataset.adid;
        var c = t.currentTarget.dataset.houseid;
        wx.navigateTo({
            url: '/house/guwen/gw-detail/index?userid=' + a + '&adid=' + b + '&houseid=' + c,
        })
    }, go_to_school_map: function (t) {
        var t=this;
      
        wx.navigateTo({
            url: '/school/school_map/index?lat='+t.data.school.lat+'&lng='+t.data.school.lng,
        })
    },
    imgYu: function(event) {

        var src = event.currentTarget.dataset.image;//获取data-src
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        var st = this;
   
        st.setData({
            diytitle:st.data.school.title+'学区房月度成交简报'
        });

        var t = null, at = null;
        return this.data.diytitle && (t = '/school/school_details/index?cid=' + st.data.cid, at = this.data.diytitle), 
        a.onShareAppMessage(t, at);   // onShareAppMessage -->  e.requirejs("core"),
     

    },
    close: function() {
        e.globalDataClose.flag = !0, wx.reLaunch({
            url: "/pages/message/auth/index"
        });
    }
})