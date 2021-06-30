// dfpage/test.js
import * as echarts from '../../ec-canvas/echarts';

let chart = null;
var chartData = null;
let charts = null;
let charts_pie = null;
let charts_gp_pie = null;
let charts_gp_time = null;
var chartDatas = null;
var charts_tongbi = null;
var charts_hot_tongbi = null;
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
            start: 0,
            end: 100
        },
        {
            type: 'inside',
            start: 0,
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
                    color: '#366ab3', //折点颜色
                    lineStyle: {
                        color: '#366ab3' //折线颜色
                    },
                    label: {
                        show: false,
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
            symbol: 'none',//去掉折点
            axisLabel: {
                fontSize: 9
            },
            itemStyle: {
                normal: {
                    color: '#00b08d', //折点颜色
                    lineStyle: {
                        color: '#00b08d' //折线颜色
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

        //   toolbox: {
        //      feature: {
        //          dataZoom: {
        //              yAxisIndex: 'none'
        //         },
        //          restore: {},
        //          saveAsImage: {}
        //      }
        //  },
        // toolbox: {
        //    feature: {
        //         dataView: {
        //              show: true,
        //           readOnly: false
        //         },
        //magicType: {
        //             show: true,
        //type: ['bar', 'line']
        //       },
        //       restore: {
        //           show: true
        //        },
        //        saveAsImage: {
        //            show: true
        //      }
        //    }
        //   },
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
            type: 'bar',
            yAxisIndex: 0,
            axisLabel: {
                fontSize: 9
            },
            itemStyle: {
                normal: {
                    color: '#366ab3', //折点颜色
                    lineStyle: {
                        color: '#366ab3' //折线颜色
                    },
                    label: {
                        show: false,
                        position: 'top',
                        formatter: '{c}'
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
            symbol: 'none',//去掉折点
            axisLabel: {
                fontSize: 9
            },
            itemStyle: {
                normal: {
                    color: '#fa4b00', //折点颜色
                    lineStyle: {
                        color: '#fa4b00' //折线颜色
                    },

                    label: {
                        show: false,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            },
            data: activenum
        },
        {
            name: '成交均价',
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            symbol: 'none',//去掉折点
            axisLabel: {
                fontSize: 9
            },
            itemStyle: {
                normal: {
                    color: '#00b08d', //折点颜色
                    lineStyle: {
                        color: '#00b08d' //折线颜色
                    },

                    label: {
                        show: false,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            },
            data: activenum
        },
        ]

        ,
        extra: {
            lineStyle: 'curve'
        }
    };


    return option;
}

function getOption_tongbi(aText, aSubtext, xData, sData) {
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
            },

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
            name: '21年成交',
            type: 'bar',
            yAxisIndex: 0,
            axisLabel: {
                fontSize: 9
            },

            itemStyle: {
                normal: {
                    color: "#366ab3",

                    label: {
                        show: true,
                        position: 'inside',
                        formatter: '{c}'
                    }
                }
            },
            data: appregnum
        }, {
            name: '20年成交',
            type: 'bar',
            yAxisIndex: 0,
            axisLabel: {
                fontSize: 9
            },
            itemStyle: {
                normal: {
                    color: "#9abef1",

                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            },
            data: appregnum
        },
        {
            name: '21年均价',
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            axisLabel: {
                fontSize: 9
            },
            symbol: 'none',//去掉折点
            itemStyle: {
                normal: {
                    color: '#00b08d', //折点颜色
                    lineStyle: {
                        color: '#00b08d' //折线颜色
                    },

                    label: {
                        show: false,
                        position: 'top',
                        formatter: '{c}元'
                    }
                }
            },
            data: activenum
        }, {
            name: '20年均价',
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            symbol: 'none',//去掉折点
            axisLabel: {
                fontSize: 9
            },
            symbol: 'none',//去掉折点
            itemStyle: {
                normal: {
                    color: '#fa4b00', //折点颜色
                    lineStyle: {
                        color: '#fa4b00' //折线颜色
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

function getOption_pie(aText, aSubtext, xData, sData) {

    var option = {
        title: {
            text: aText,
            subtext: '数据来源：手边买房',
            left: 'center'
        },
        backgroundColor: "#ffffff",
        legend: {
            top: '59%',
            left: 'center'
        },
        series: [{
            label: {
                show: false,
                position: 'center'
            },
            type: 'pie',
            center: ['50%', '38%'],
            radius: ['20%', '40%'],
            data: [{
                value: 55,
                name: '89㎡-最高网签:--元/㎡'
            }, {
                value: 20,
                name: '122㎡-最高网签:--元/㎡'
            }, {
                value: 10,
                name: '139㎡-最高网签:--元/㎡'
            }, {
                value: 20,
                name: '93㎡-最高网签:--元/㎡'
            }]
        }]
    };


    return option;
}

var o = Object.assign || function (o) {
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
            onInit: function (canvas, width, height) {
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
            onInit: function (canvas, width, height) {
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
        }, ecLinets_tongbi: {
            onInit: function (canvas, width, height) {
                //初始化echarts元素，绑定到全局变量，方便更改数据
                charts_tongbi = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });
                canvas.setChart(charts_tongbi);

                //可以先不setOption，等数据加载好后赋值，
                //不过那样没setOption前，echats元素是一片空白，体验不好，所有我先set。
                var xData = [];
                var sData = [];
                var aText = '';
                var aSubtext = '';
                var option = getOption_tongbi(aText, aSubtext, xData, sData);
                charts_tongbi.setOption(option);
                return charts_tongbi;
            }
        }, ecLinets_hot_tongbi: {//热度对比
            onInit: function (canvas, width, height) {
                //初始化echarts元素，绑定到全局变量，方便更改数据
                charts_hot_tongbi = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });
                canvas.setChart(charts_hot_tongbi);

                //可以先不setOption，等数据加载好后赋值，
                //不过那样没setOption前，echats元素是一片空白，体验不好，所有我先set。
                var xData = [];
                var sData = [];
                var aText = '';
                var aSubtext = '';
                var option = getOption_tongbi(aText, aSubtext, xData, sData);
                charts_hot_tongbi.setOption(option);
                return charts_hot_tongbi;
            }
        },
        ecLinets_pie: {
            onInit: function (canvas, width, height) {
                //初始化echarts元素，绑定到全局变量，方便更改数据
                charts_pie = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });
                canvas.setChart(charts_pie);

                //可以先不setOption，等数据加载好后赋值，
                //不过那样没setOption前，echats元素是一片空白，体验不好，所有我先set。
                var xData = [];
                var sData = [];
                var aText = '小区成交面签占比分析';
                var aSubtext = '';
                var option = getOption_pie(aText, aSubtext, xData, sData);
                charts_pie.setOption(option);
                return charts_pie;
            }
        },
        ecLinets_gp_pie: {
            onInit: function (canvas, width, height) {
                //初始化echarts元素，绑定到全局变量，方便更改数据
                charts_gp_pie = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });
                canvas.setChart(charts_gp_pie);

                //可以先不setOption，等数据加载好后赋值，
                //不过那样没setOption前，echats元素是一片空白，体验不好，所有我先set。
                var xData = [];
                var sData = [];
                var aText = '小区挂牌面签占比分析';
                var aSubtext = '';
                var option = getOption_pie(aText, aSubtext, xData, sData);
                charts_gp_pie.setOption(option);
                return charts_gp_pie;
            }
        },  ecLinets_gp_time: {
            onInit: function (canvas, width, height) {
                //初始化echarts元素，绑定到全局变量，方便更改数据
                charts_gp_time = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });
                canvas.setChart(charts_gp_time);

                //可以先不setOption，等数据加载好后赋值，
                //不过那样没setOption前，echats元素是一片空白，体验不好，所有我先set。
                var xData = [];
                var sData = [];
                var aText = '小区挂牌时长占比分析';
                var aSubtext = '';
                var option = getOption_pie(aText, aSubtext, xData, sData);
                charts_gp_time.setOption(option);
                return charts_gp_time;
            }
        },
        cid: '',
        house: [],
        community: [],
        countArray: [],
        usalelog: [],
        deallist: [],
        zbpricelist: [],
        lppricelist: [],
        chuzhonglist: [],
        islogin: '',
        limits: !0,
        isShare: !1,
        member: {},
        mid: 0,
        isIpx: e.globalData.isIpx,
        see: !1,
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
        activeItem: 1,
        chart_activeItem: 1,
        chart_activeItem_year: 1,
        loading: 1,
        select_year: [],
        chart_activeItem_tongbi: 2020,
        chart_activeItem_tongbi_index: 0,
        select_year_hot: [],
        chart_activeItem_tongbi_hot: 2020,
        chart_activeItem_tongbi_hot_index: 0,
        chart_log_tongbi_title: '',
        chart_hot_tongbi_title: '',
        diytitle: '',
        qrcode_img:'https://sbmf.ww2ss.com/dfimages/2wm.png',//分享二维码
        puserinfo:[],
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
    onLoad: function (dt) {
        var st = this;
        //判断页面来源
        let pages = getCurrentPages()
        if (pages.length < 2) {
            st.setData({
                isShare: !0
            });
        }
       

        //分享锁粉
        var et = decodeURIComponent(dt.scene);
        if (!dt.cid && et) {
            var n = a.str2Obj(et); //str2Obj --> e.requirejs("core"),
            dt.cid = n.cid, n.mid && (dt.mid = n.mid, e.setCache("usermid", n)); // setCache--> e = getApp()
        }   // 

        st.setData({
            cid: dt.cid,
            mid: dt.mid

        });


        e.url(dt);
        console.log(dt)

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        e.checkAuth();
        var t = this,
            a = wx.getSystemInfoSync();
        this.pn_getlogin(), this.getInfo(), t.get_community(), wx.getSetting({
            success: function (a) {
                var e = a.authSetting["scope.userInfo"];
                t.setData({
                    anum: e
                });
            }
        }), m = wx.createMapContext("map");
    },
    getInfo: function () {
        var e = this;
        a.get("member", {
            mid: this.data.mid
        }, function (a) {

            1 == a.isblack && wx.showModal({
                title: "无法访问",
                content: "系统升级中，不能访问！",
                success: function (a) {
                    a.confirm && e.close(), a.cancel && e.close();
                }
            }), 0 != a.error ? wx.redirectTo({
                url: "/pages/message/auth/index"
            }) : e.setData({
                member: a,
                // show: !0,
                iscycelbuy: a.iscycelbuy,
                bargain: a.bargain
            }), t.wxParse("wxParseData", "html", a.copyright, e, "5");

            if (e.data.member.viplevel == 0) {
                e.setData({
                    chart_activeItem: 1,
                    chart_activeItem_year: 1
                })
            } else {
                e.setData({
                    chart_activeItem: 2,
                    chart_activeItem_year: 2
                })
            }

        });
    },
    get_community: function () {
        var t = this;
        a.get("datafang/islogin", {}, function (dt) {
            t.setData({
                islogin: dt.islogin
            })
            a.get("chatApi/get_community", {
                cid: t.data.cid
            }, function (a) {
                1 == t.setData({
                    community: a.community,
                    countArray: a.countArray,
                    deallist: a.deallist,
                    zbpricelist: a.zbpricelist,
                    lppricelist: a.lppricelist,
                    chuzhonglist: a.chuzhonglist,
                    ad: a.ad,
                    noList: a.noList,
                    // show:!0,
                });



                wx.setNavigationBarTitle({
                    title: "手边买房-" + a.community.communityName
                });

                var mapt = t.bMapTransQQMap(a.community.baidumaplng, a.community.baidumaplat);
                t.setData({
                    maplng: mapt.lng,
                    maplat: mapt.lat
                }), t.getMapSchool(mapt.lng, mapt.lat);

                t.get_community_chart();
                t.get_qrcode();
                t.get_community_log_chart();

                if (t.data.member.level > 1) {
                    t.get_community_tongbi_chart();
                    t.get_community_log_tongbi_chart();
                }

            });
        });




    },
    get_community_chart: function () {
        var t = this;

        1 == t.setData({

            show: !1
        });

        a.get("datafang/islogin", {}, function (dt) {
            t.setData({
                islogin: dt.islogin
            })
            a.get("chatApi/get_community_chart", {
                cid: t.data.cid,
                activeItem: t.data.chart_activeItem,
                chart_activeItem_year: t.data.chart_activeItem_year,
            }, function (a) {

                setTimeout(function () {

                    //带看走势图

                    var ymix = t.calMix(a.chartsDatas.seriesData2) - 5000;//成交均价最小值
                    var ymax = t.calMax(a.chartsDatas.seriesData1) + 5000;//挂牌均价最大值
                    var ymax_zhishu = t.calMax(a.chartsDatas.seriesData) * 2; //手边指数最大值

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
                        yAxis: [{
                            type: 'value',
                            scale: true,
                            min: 0,
                            max: ymax_zhishu,
                            splitNumber: 5,
                            boundaryGap: [0.2, 0.2],

                        },
                        {
                            type: 'value',
                            min: ymix,
                            max: ymax,
                            splitNumber: 5,
                            boundaryGap: [0.2, 0.2],
                            splitLine: {
                                show: false
                            },

                        }],
                        xAxis: {
                            data: a.chartsDatas.xAxisName
                        },

                        series: [{
                            name: a.chartsDatas.dlddata[0],
                            data: a.chartsDatas.seriesData
                        }, {
                            name: a.chartsDatas.dlddata[1],
                            data: a.chartsDatas.seriesData1
                        }, {
                            name: a.chartsDatas.dlddata[2],
                            data: a.chartsDatas.seriesData2
                        }]
                        ,
                        extra: {
                            lineStyle: 'curve'
                        }
                    });

                    //挂牌面积图圆饼图
                    var option = {
                        title: {
                            text: t.data.community.communityName + '挂牌面积占比分析',
                            subtext: '数据来源：手边买房',
                            left: 'center'
                        },
                        backgroundColor: "#ffffff",
                        legend: {
                            top: '59%',
                            left: 'center'
                        },
                        series: [{
                            label: {
                                show: false,
                                position: 'center'
                            },
                            type: 'pie',
                            center: ['50%', '38%'],
                            radius: ['20%', '40%'],
                            data: a.pei_data
                        }]
                    };
                 //   console.log(option)
                    charts_gp_pie.setOption(option);

                //挂牌时长圆饼图
                var option = {
                    title: {
                        text: t.data.community.communityName + '挂牌时长占比分析',
                        subtext: '数据来源：手边买房',
                        left: 'center'
                    },
                    backgroundColor: "#ffffff",
                    legend: {
                        top: '59%',
                        left: 'center'
                    },
                    series: [{
                        label: {
                            show: false,
                            position: 'center'
                        },
                        type: 'pie',
                        center: ['50%', '38%'],
                        radius: ['20%', '40%'],
                        data: a.pei_data_time
                    }]
                };
               // console.log(option)
               charts_gp_time.setOption(option);

            }, 1000);

                1 == t.setData({
                    show: !0,
                });

            });
        });


    }, get_community_log_chart: function () {
        var t = this;

        1 == t.setData({

            show: !1
        });

        a.get("datafang/islogin", {}, function (dt) {
            t.setData({
                islogin: dt.islogin
            })
            a.get("chatApi/get_community_log_chart", {
                cid: t.data.cid,
                activeItem: t.data.chart_activeItem,
                chart_activeItem_year: t.data.chart_activeItem_year,
            }, function (a) {

                setTimeout(function () {

                    //成交走势图
                    chartDatas = a.chartsDatas;

                    var ymix = t.calMix(a.chartsDatas.seriesData2) - 5000;//成交均价最小值
                    var ymax = t.calMax(a.chartsDatas.seriesData2) + 5000;//挂牌均价最大值
                    var ymax_zhishu = t.calMax(a.chartsDatas.seriesData2_count) * 2; //手边指数最大值

                    chart.setOption({
                        legend: {
                            data: a.chartsDatas.dlddata_log
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
                        yAxis: [{
                            type: 'value',
                            scale: true,
                            min: 0,
                            max: ymax_zhishu,
                            splitNumber: 5,
                            boundaryGap: [0.2, 0.2],

                        },
                        {
                            type: 'value',
                            min: ymix,
                            max: ymax,
                            splitNumber: 5,
                            boundaryGap: [0.2, 0.2],
                            splitLine: {
                                show: false
                            },

                        }],
                        xAxis: {
                            data: a.chartsDatas.xAxisName
                        },

                        series: [{
                            name: a.chartsDatas.dlddata_log[0],
                            data: a.chartsDatas.seriesData2_count  //成交套数
                        }, {
                            name: a.chartsDatas.dlddata_log[2],
                            data: a.chartsDatas.seriesData2
                        }]
                        ,
                        extra: {
                            lineStyle: 'curve'
                        }
                    });

                    var option = {
                        title: {
                            text: t.data.community.communityName + '签约面积占比',
                            subtext: '数据来源：手边买房',
                            left: 'center'
                        },
                        backgroundColor: "#ffffff",
                        legend: {
                            top: '59%',
                            left: 'center'
                        },
                        series: [{
                            label: {
                                show: false,
                                position: 'center'
                            },
                            type: 'pie',
                            center: ['50%', '38%'],
                            radius: ['20%', '40%'],
                            data: a.pei_data
                        }]
                    };
                    console.log(option)
                    charts_pie.setOption(option);




                }, 1000);

                1 == t.setData({
                    show: !0,
                });

            });
        });


    }, get_community_log_tongbi_chart: function () {
        var t = this;

        1 == t.setData({

            show: !1
        });

        a.get("datafang/islogin", {}, function (dt) {
            t.setData({
                islogin: dt.islogin
            })
            a.get("chatApi/get_community_log_tongbi_chart", {
                cid: t.data.cid,
                activeItem: t.data.chart_activeItem,
                chart_activeItem_year: t.data.chart_activeItem_tongbi,
            }, function (a) {
                1 == t.setData({

                    select_year: a.chartsDatas.select_year
                });


                setTimeout(function () {

                    //成交走势图
                    chartDatas = a.chartsDatas;



                    var ymix_price_last = t.calMix(a.chartsDatas.seriesData_pirce_last) - 5000;//成交均价最小值
                    var ymix_price = t.calMix(a.chartsDatas.seriesData_pirce) - 5000;//成交均价最小值
                    var ymix = 0;
                    if (ymix_price_last > ymix_price) {
                        ymix = ymix_price;
                    } else {
                        ymix = ymix_price_last;
                    }
                    var ymax = t.calMax(a.chartsDatas.seriesData_pirce) + 5000;//挂牌均价最大值
                    var ymax_zhishu = t.calMax(a.chartsDatas.seriesData) * 2; //手边指数最大值
                    var ymax_zhishu_last = t.calMax(a.chartsDatas.seriesData_last) * 2; //手边指数最大值
                    if (ymax_zhishu_last > ymax_zhishu) {
                        ymax_zhishu = ymax_zhishu_last;
                    }

                    charts_tongbi.setOption({
                        legend: {
                            data: a.chartsDatas.dlddata
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
                        yAxis: [{
                            type: 'value',
                            scale: true,
                            min: 0,
                            max: ymax_zhishu,
                            splitNumber: 5,
                            boundaryGap: [0.2, 0.2],

                        },
                        {
                            type: 'value',
                            min: ymix,
                            splitNumber: 5,
                            boundaryGap: [0.2, 0.2],
                            splitLine: {
                                show: false
                            },

                        }],
                        xAxis: {
                            data: a.chartsDatas.xAxisName
                        },

                        series: [{
                            name: a.chartsDatas.dlddata[0],
                            data: a.chartsDatas.seriesData,  //成交套数

                        }, {
                            name: a.chartsDatas.dlddata[1],
                            data: a.chartsDatas.seriesData_last,

                        }, {
                            name: a.chartsDatas.dlddata[2],
                            data: a.chartsDatas.seriesData_pirce
                        }, {
                            name: a.chartsDatas.dlddata[3],
                            data: a.chartsDatas.seriesData_pirce_last
                        }]
                        ,
                        extra: {
                            lineStyle: 'curve'
                        }
                    });


                }, 1000);

                1 == t.setData({
                    show: !0,
                    // chartDatas = a.chartsDatas;
                });

            });
        });


    },
    get_community_tongbi_chart: function () {
        var t = this;

        1 == t.setData({

            show: !1
        });

        a.get("datafang/islogin", {}, function (dt) {
            t.setData({
                islogin: dt.islogin
            })
            a.get("chatApi/get_community_tongbi_chart", {
                cid: t.data.cid,
                activeItem: t.data.chart_activeItem,
                chart_activeItem_year: t.data.chart_activeItem_tongbi_hot,
            }, function (a) {
                1 == t.setData({

                    select_year_hot: a.chartsDatas.select_year
                });


                setTimeout(function () {

                    //成交走势图
                    chartDatas = a.chartsDatas;



                    var ymix_price_last = t.calMix(a.chartsDatas.seriesData_pirce_last) - 5000;//成交均价最小值
                    var ymix_price = t.calMix(a.chartsDatas.seriesData_pirce) - 5000;//成交均价最小值
                    var ymix = 0;
                    if (ymix_price_last > ymix_price) {
                        ymix = ymix_price;
                    } else {
                        ymix = ymix_price_last;
                    }
                    var ymax = t.calMax(a.chartsDatas.seriesData_pirce) + 5000;//挂牌均价最大值
                    var ymax_zhishu = t.calMax(a.chartsDatas.seriesData) * 2; //手边指数最大值
                    var ymax_zhishu_last = t.calMax(a.chartsDatas.seriesData_last) * 2; //手边指数最大值
                    if (ymax_zhishu_last > ymax_zhishu) {
                        ymax_zhishu = ymax_zhishu_last;
                    }

                    charts_hot_tongbi.setOption({
                        legend: {
                            data: a.chartsDatas.dlddata
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
                        yAxis: [{
                            type: 'value',
                            scale: true,
                            min: 0,
                            max: ymax_zhishu,
                            splitNumber: 5,
                            boundaryGap: [0.2, 0.2],

                        },
                        {
                            type: 'value',
                            min: ymix,
                            splitNumber: 5,
                            boundaryGap: [0.2, 0.2],
                            splitLine: {
                                show: false
                            },

                        }],
                        xAxis: {
                            data: a.chartsDatas.xAxisName
                        },

                        series: [{
                            name: a.chartsDatas.dlddata[0],
                            data: a.chartsDatas.seriesData,  //成交套数

                        }, {
                            name: a.chartsDatas.dlddata[1],
                            data: a.chartsDatas.seriesData_last
                        }, {
                            name: a.chartsDatas.dlddata[2],
                            data: a.chartsDatas.seriesData_pirce
                        }, {
                            name: a.chartsDatas.dlddata[3],
                            data: a.chartsDatas.seriesData_pirce_last
                        }]
                        ,
                        extra: {
                            lineStyle: 'curve'
                        }
                    });


                }, 1000);

                1 == t.setData({
                    show: !0,
                });

            });
        });


    }, get_qrcode: function () {
        var t = this;

        1 == t.setData({

            show: !1
        });

        a.get("datafang/islogin", {}, function (dt) {
            t.setData({
                islogin: dt.islogin
            })
            a.get("poster/getimage", {
                pageurl:'house/community/index',
                scene: 'cid='+t.data.cid,
            }, function (a) {
                1 == t.setData({
                    qrcode_img: a.poster
                });
            });
        });


    },

    save_chart() {
        const ecComponent = this.selectComponent('#mychart_log_tongbi');

        // 先保存图片到临时的本地文件，然后存入系统相册
        ecComponent.canvasToTempFilePath({
            success: res => {
                console.log("tempFilePath:", res.tempFilePath)

                // 存入系统相册
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath || '',
                    success: res => {
                        wx.showToast({
                            title: '图表已经保存，请进入手机相册查看',
                            icon: "none"
                        })
                        console.log("success", res)
                    },
                    fail: res => {
                        console.log("fail", res)
                    }
                })
            },
            fail: res => console.log(res)
        });
    },
    getMapSchool: function (lng, lat) {
        var st = this;

        a.get("dataApiMap/getDetailMapSchoolPolys", {
            houseid: st.data.community.id,
            lng: st.data.maplng,
            lat: st.data.maplat
        }, function (t) {
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
                        content: st.data.community.communityName,
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

                a.polys.forEach(function (t) {
                    s.push(o({
                        points: t.map(function (o) {
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
            console.log(s)

        });

    },
    bMapTransQQMap: function (lng, lat) {

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
    favorite: function (da) {
        e.checkAuth();
        var dt = this;
        var b = da.currentTarget.dataset.isfavorite ? 0 : 1;
        a.get("member/favorite_xiaoqu/toggle", {
            cid: dt.data.cid,
            isfavorite: b
        }, function (t) {
            if (b) {
                dt.setData({
                    "countArray.isfavorite": 1
                })
                wx.showToast({
                    title: '加入自选成功',
                    icon: "none"
                })
            } else {
                dt.setData({
                    "countArray.isfavorite": 0
                });
                wx.showToast({
                    title: '取消自选成功',
                    icon: "none"
                })
            }




        });

    },

    hotLinkFn: function (dt) {
        var dc = dt.currentTarget.dataset.communityid;
        var t = this;
        var sd = {
            id: dc.id,
            title: dc.communityName
        }, r = Object.assign(sd);

        getApp().globalData.dtsearch = r;
        wx.navigateTo({
            url: "/house/market/index"
        });
    },
    goHouse: function goPage(dt) {
        var cid = dt.currentTarget.dataset.cid;
        if (cid == '') {
            return;
        }
        wx.navigateTo({
            url: "/house/house/house?cid=" + cid
        });
    },
    goCommunity: function goPage(dt) {
        var cid = dt.currentTarget.dataset.cid;
        if (cid == '') {
            return;
        }
        wx.navigateTo({
            url: "/house/community/index?cid=" + cid
        });
    },
    goPage: function goPage(dt) {
        var page = dt.currentTarget.dataset.page;
        wx.switchTab({
            //跳转到tabBar页面，并关闭其他所有tabBar页面
            url: "/" + page
        });
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
        wx.navigateTo({
            url: '/house/guwen/gw-add/index?cid=' + a,
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    },
    handleCall: function (t) {
        var a = t.currentTarget.dataset.phone;
        a && wx.makePhoneCall({
            phoneNumber: a
        });
    },
    handleGoT: function (a) {
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
    },
    imgYu: function (event) {

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
    copyText: function (e) {
        wx.setClipboardData({
            data: e.currentTarget.dataset.text,
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        setTimeout(function () {
                            // 获取 chart 实例的方式
                            a.alert("客服微信号已复制,去添加好友加群！");
                        }, 100);

                    }
                })
            }
        })
    },
    pn_getlogin: function () {
        var st = this;
        wx.login({
            success: function (aa) {
                a.post("wxapp/login", {
                    code: aa.code
                }, function (dt) {
                    st.setData({
                        puserinfo: dt
                    })

                });
            },
            fail: function () {
                a.alert("获取用户信息失败!");
            }
        });
    },
    pn_getPhoneNumber: function (e) {
        var msg = e.detail.errMsg, that = this;
        var encryptedDataStr = e.detail.encryptedData, iv = e.detail.iv, sessionID = that.data.puserinfo.session_key, pn_openid = that.data.puserinfo.openid;

        if (msg == 'getPhoneNumber:ok') {
            wx.checkSession({
                success: function () {
                    that.pn_deciyption(pn_openid, sessionID, encryptedDataStr, iv);
                },
                fail: function () {
                    wx.login({
                        success: function (aa) {
                            a.post("wxapp/login", {
                                code: aa.code
                            }, function (dt) {
                                dt.error ? a.alert("获取用户登录态失败:" + dt.message) : that.pn_deciyption(pn_openid, dt.session_key, e.detail.encryptedData, iv);
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
    pn_deciyption: function (pn_openid, sessionID, encryptedDataStr, iv) {
        var t=this;
        a.get("wxapp/authBindphone", {
            data: encryptedDataStr,
            iv: iv,
            sessionKey: sessionID,
            pn_openid: pn_openid
        }, function (dt) {
            //console.log(dt.phoneNumber); 
            !dt.error ? wx.navigateTo({
                url: '/house/community/index?cid='+t.data.cid
            }) : a.alert("网络异常，请重新获取！"); 
            
        });
    },
    pn_hotLink: function (e) {
        wx.navigateTo({
            url: '/project/pages/reportsa/index'
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var st = this;
        st.setData({
            diytitle: st.data.community.communityName + '最近6个月成交报告,大数据图表'
        });

        var t = null, at = null;
        return this.data.diytitle && (t = '/house/community/index?cid=' + st.data.cid, at = this.data.diytitle),
            a.onShareAppMessage(t, at);    // onShareAppMessage -->  e.requirejs("core"),


    },
    close: function () {
        e.globalDataClose.flag = !0, wx.reLaunch({
            url: "/pages/message/auth/index"
        });
    },
    handleSwitch: function (d) {
        var t = this;
        if (t.data.member.viplevel == 0) {
            t.vipmsgbox("专业版");
            return;
        }
        1 == t.setData({
            activeItem: d.currentTarget.dataset.text,
            deallist: [],
            show: !1
        });

        a.get("chatApi/get_community_deallist", {
            cid: t.data.cid,
            activeItem: this.data.activeItem
        }, function (a) {
            1 == t.setData({
                deallist: a.deallist,
                show: !0,
            });

        });
    },
    //图表切换功能 周报 月报 年报
    chartSwitch: function (d) {
        var t = this;
        if (t.data.member.viplevel == 0) {
            t.vipmsgbox("专业版");

            return;
        }
        1 == t.setData({
            chart_activeItem: d.currentTarget.dataset.text,

            show: !1
        });

        t.get_community_chart();
        t.get_community_log_chart();
    },
    vipmsgbox: function (title) {

        wx.getSystemInfo({
            success: function (e) {
                console.log(e);
                //console.log(e.system);
                //console.log(e.system.substring(0, 3));
                if (e.system.substring(0, 3) != "iOS") {

                    wx.showModal({
                        title: '会员提醒',
                        content: "该功能限【" + title + "】使用，点确认马上开通会员权限。",
                        success: function (res) {
                            if (res.confirm) {
                                console.log('用户点击确定')

                                wx.redirectTo({
                                    url: "/pages/member/membercard/index"
                                })


                            } else if (res.cancel) {
                                return;
                            }
                        }
                    })

                    return;

                } else {

                    wx.showModal({
                        title: '会员提醒',
                        content: "该功能限【" + title + "】使用，马上联系客服开通。",
                        success: function (res) {
                            if (res.confirm) {
                                console.log('用户点击确定')

                                wx.redirectTo({
                                    url: "/pages/webview/index?weburl=https://mp.weixin.qq.com/s/jr0k0wJssnfOcjNeipuZKw"
                                })

                            } else if (res.cancel) {

                                return;
                            }
                        }
                    })
                    return;
                }


            }
        })

    },
    //图表切换功能 周报 月报 年报
    chartSwitch_year: function (d) {
        var t = this;
        var chart_activeItem_year = d.currentTarget.dataset.text;
        if (t.data.member.viplevel == 0) {
            t.vipmsgbox("专业版");
            return;
        }
        if (t.data.member.viplevel != 2 && chart_activeItem_year == 3) {
            t.vipmsgbox("专业版(年卡)");
            return;
        }
        1 == t.setData({
            chart_activeItem_year: chart_activeItem_year,

            show: !1
        });

        t.get_community_chart();
        t.get_community_log_chart();
    },
    //图表切换功能 成交同比
    chartSwitch_tongbi: function (d) {
        var t = this;
        var chart_activeItem_tongbi = d.currentTarget.dataset.text;

        if (t.data.member.viplevel != 2) {
            t.vipmsgbox("专业版(年卡)");
            return;
        }

        1 == t.setData({
            chart_activeItem_tongbi: chart_activeItem_tongbi,
            chart_activeItem_tongbi_index: d.currentTarget.dataset.index,
            show: !1
        });
        t.get_community_log_tongbi_chart();

    }, //图表切换功能  热度同比
    chartSwitch_tongbi_hot: function (d) {
        var t = this;
        var chart_activeItem_tongbi_hot = d.currentTarget.dataset.text;

        if (t.data.member.viplevel != 2) {
            t.vipmsgbox("专业版(年卡)");
            return;
        }

        1 == t.setData({
            chart_activeItem_tongbi_hot: chart_activeItem_tongbi_hot,
            chart_activeItem_tongbi_hot_index: d.currentTarget.dataset.index,
            show: !1
        });
        t.get_community_tongbi_chart();

    },
    calMix: function (arr) {
        var min = arr[0];
        for (var i = 1; i < arr.length; i++) {
            var cur = parseInt(arr[i]);
            cur < min ? min = cur : null
        }
        var minint = Math.ceil(min / 10); // 向上取整
        var minval = minint * 10; // 最终设置的最小值
        return minval; // 输出最小值
    },
    calMax: function (arr) {
        var max = parseInt(arr[0]);
        for (var i = 1; i < arr.length; i++) {
            var cur = parseInt(arr[i]);
            cur > max ? max = cur : null
        }
        //var maxint = Math.ceil(max / 10); // 向上取整
        // var maxval = maxint * 10; // 最终设置的最小值
        console.log(max);
        console.log(arr);
        return max; // 输出最小值
    },
   
}) 