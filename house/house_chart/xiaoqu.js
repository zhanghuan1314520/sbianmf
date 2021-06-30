import * as echarts from '../../ec-canvas/echarts';

let chart = null;
var chartData = null;
var tpchar = null;
var tpdanwei = '';
var tpdanwei1 = null;
//每日成交柱状图
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

        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        toolbox: {
            feature: {
                dataView: {
                    show: true,
                    readOnly: false
                },
                magicType: {
                    show: true,
                    type: ['bar', 'line']
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
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
                    color: function (params) {
                        var colorList = [
                            '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD',
                            '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD'
                        ];
                        return colorList[params.dataIndex]
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
        page: 1,
        notice_type: "",
        ecLine: {
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
        member: {},
        xswitch: 3,
        mid: 0,
        show: !1,
        dingwei: 1,
        latitude: "",
        longitude: "",
        speed: "",
        accuracy: "",
        nearby: 1,
        brokerCardWidth: 0,
        showTip: 0,
        topic: 1,
        zhidinglist: {},
        chengjiao: {},
        xqlist: [{
            id: "95",
            title: "学军小学(求智)",
            ftype: "4",
            loanCount: ""
        }, {
            id: "90",
            title: "(求是)星洲小学",
            ftype: "4",
            loanCount: ""
        }, {
            id: "60",
            title: "文三小学",
            ftype: "4",
            loanCount: ""
        }, {
            id: "11",
            title: "胜利小学",
            ftype: "4",
            loanCount: ""
        }, {
            id: "2001",
            title: "竞舟二小",
            ftype: "4",
            loanCount: ""
        }, {
            id: "228",
            title: "采荷二小",
            ftype: "4",
            loanCount: ""
        }, {
            id: "2000",
            title: "行知二小",
            ftype: "4",
            loanCount: ""
        }, {
            id: "4",
            title: "保俶塔小学",
            ftype: "4",
            loanCount: ""
        }, {
            id: "46",
            title: "竞舟小学",
            ftype: "4",
            loanCount: ""
        }, {
            id: "141",
            title: "卖鱼桥小学（文澜校区）",
            ftype: "4",
            loanCount: ""
        }, {
            id: "221",
            title: "学军紫金港",
            ftype: "4",
            loanCount: ""
        }, {
            id: "99",
            title: "求是小学",
            ftype: "4",
            loanCount: ""
        }, {
            id: "71",
            title: "文新小学",
            ftype: "4",
            loanCount: ""
        }, {
            id: "3",
            title: "江南实验",
            ftype: "4",
            loanCount: ""
        }, {
            id: "49",
            title: "卖鱼桥小学",
            ftype: "4",
            loanCount: ""
        }, {
            id: "17",
            title: "天长小学",
            ftype: "4",
            loanCount: ""
        }],
        showModal: false,
        num:0,
        datalist: [],
        datalista:{},
        title: "",
        max_clookb:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (t) {
        t = t || {};
        var a = this;
        a.setData({
            mid: t.mid,
            title: t.title
        });
        this.getnav();
    },
    getInfo: function () {
        var e = this;
        //获得登录用户个人信息
        a.get("member", {
            mid: this.data.mid
        }, function (a) {
            // console.log(a);
            1 == a.isblack && wx.showModal({
                title: "无法访问",
                content: "系统升级中，不能访问！",
                success: function (a) {
                    a.confirm && e.close(), a.cancel && e.close();
                }
            }), e.setData({
                member: a,
                show: !0,
            }), t.wxParse("wxParseData", "html", a.copyright, e, "5");
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //e.checkAuth();
        // console.log("aaaaaaaaaaaaaaaaaaaaa");
        var a = this;
        getApp().globalData.hasChatNoReader && wx.showTabBarRedDot({
            index: 2
        });
        this.getInfo(), a.get_datafang(), wx.getSystemInfo({
            success: function (e) {
                //console.log(e);
                var t = e.windowWidth / 1.7;
                var brokerCardWidth = e.windowWidth >= 460 || e.windowWidth <= 375 ? 276 : Math.round(276 * e.windowWidth / 375);
                a.setData({
                    windowWidth: e.windowWidth,
                    windowHeight: e.windowHeight,
                    swiperheight: t,
                    brokerCardWidth: brokerCardWidth
                });
            }
        });

    },
    get_datafang: function () {
        var t = this;
        a.get("chatApi/get_market", {}, function (a) {
            console.log("111111111", a)
            chartData = a.chartsData;
            tpchar = a.chartsData.tpchar;
            tpdanwei = a.chartsData.tpdanwei;
            tpdanwei1 = a.chartsData.tpdanwei1;
            //console.log(a.ad);
            1 == t.setData({
                show: !0,
                topic: 1,
                anum: a.anum,
                ahtmj: a.ahtmj,
                anum2: a.anum2,
                ahtmj2: a.ahtmj2,
                anum3: a.anum3,
                ahtmj3: a.ahtmj3,
                scount: a.scount,
                jcount: a.jcount,
                zcount: a.zcount,
                jcprice: a.jcprice,
                zcprice: a.zcprice,
                acount: a.acount,
                lookjcount: a.lookjcount,
                lookzcount: a.lookzcount,
                lookcount15: a.lookcount15,
                prejcount: a.prejcount,
                prezcount: a.prezcount,
                tjsum: a.tjsum,
                xswitch: 3,
                today: a.today,
                adtoutiao: a.adtoutiao,
                ad: a.ad,
                toplist: a.toplist,
                chengjiao: a.chengjiao,
                xqlist: a.xqlist
            });

            setTimeout(function () {
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
            }, 1000);
        });
    },
    // 获取数据
    getnav: function () {
        var t = this;
        t.setData({
            loading: !1,
            show: !1,
        }), a.get("house_chart.get_prolist_xiaoqu", {
            sqid: t.data.title
        }, function (e) {
            console.log("data值1", e)
            var max_clookb=t.calMax(e.datalist)

            var  datalist=e.datalist;
            datalist = datalist.sort(t.sort_compare('clookb'));

            t.setData({
                datalist: datalist,
                datalista:e.datalista,
                max_clookb:max_clookb
            })
           

        });
    },
    prolist_qu: function (e) { 
        console.log("eeee",e)
       var cid = e.currentTarget.dataset.cid;
       console.log("cid",cid)
        wx.navigateTo({
            url: '/house/community/index?cid='+cid,
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () { },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () { },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading();
        var a = this;
        a.get_datafang()
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        //setTimeout(function () {
        // 获取 chart 实例的方式
        //    console.log(chart)
        //}, 2000);
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        var st = this;
        return {
            title: '查房价的好工具！',
            path: '/dfpage/index/index?mid=' + st.data.member.id,
            success: function (res) {
                // 转发成功
                console.log("转发失败!!");
            },
            fail: function (res) {
                // 转发失败
                console.log("转发失败!!");
            }
        }
    },
    /**
     * 弹窗
     */
    showDialogBtn: function () {
        this.setData({
            showModal: true
        })
    },
    /**
     * 弹出框蒙层截断touchmove事件
     */
    preventTouchMove: function () {
    },
    /**
     * 隐藏模态对话框
     */
    hideModal: function () {
        this.setData({
            showModal: false
        });
    },
    /**
     * 对话框取消按钮点击事件
     */
    onCancel: function () {
        this.hideModal();
    },
    /**
     * 对话框确认按钮点击事件
     */
    onConfirm: function () {
        this.hideModal();
    },
    Reports_sort:function(dt) {//排序
        var t = this;
        var arr = dt.currentTarget.dataset.arr; 

        if(!t.data.member.nickname)
        {
          e.checkAuth();
        }
 
       if(t.data.member.viplevel!=2)
        {
            t.vipmsgbox("专业版(年卡)");
           return;
       }


        var  datalist=t.data.datalist;
        datalist = datalist.sort(t.sort_compare(arr));
        t.setData({
            datalist: datalist,
        })
        var  datalistall=t.data.datalistall;
        datalistall = datalistall.sort(t.sort_compare(arr));
        t.setData({
            datalistall: datalistall,
        })
    },
   sort_compare:function(arg) {//排序
        return function(a, b) {
            return   b[arg]-a[arg];
        }
    },
    calMax:function(arr) {
        var max =parseInt(arr[0]['clookb']) ;
        for(var i = 1; i < arr.length; i++) {
            var cur = parseInt(arr[i]['clookb']);
            cur > max ? max = cur : null
         }
      //var maxint = Math.ceil(max / 10); // 向上取整
       // var maxval = maxint * 10; // 最终设置的最小值
       console.log(max);
       console.log(arr);
        return max; // 输出最小值
    },
    selectNav: function (e) {
        // console.log("111",e)
        t = this;
        var index = e.currentTarget.dataset.index;
        console.log("index", index)
    }
})