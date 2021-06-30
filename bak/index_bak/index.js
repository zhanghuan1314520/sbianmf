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
        }, ],
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
                                '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3',
                                '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3', '#366ab3'
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
        active: 0, //tab点击切换 active
        nav: [],
        list: [],
        notice_type: "",
        datalist: [],
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
        datalist: [],
        brokerCardWidth: 0,
        showTip: 0,
        topic:1,
        zhidinglist:{},
        chengjiao:{},
        xqlist_top:[],
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
        },  {
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
        chart_activeItem:1,
        chart_activeItem_year:1,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (t) {
       
        t = t || {};
        var a = this;

        a.setData({
            mid: t.mid
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
        this.getInfo(), a.get_datafang(),a.get_zhidinglist(),a.get_nearby(),wx.getSystemInfo({
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
     

    get_nearby: function () {
        var t = this;
        wx.getLocation({
            type: "gcj02",
            altitude: !0,
            success: function (dw) {
                e.globalData.latitude = dw.latitude, e.globalData.longitude = dw.longitude;

                a.get("Business/get_nearby", {
                    latitude: dw.latitude,
                    longitude: dw.longitude,
                    nearby: t.data.nearby
                }, function (a) {
                    t.setData({
                        datalist: a.datalist
                    });
                });
            },
            fail: function () {
                t.data.dingwei = 2;
            },
            complete: function () {}
        });

    },
    hotLinkFn: function (dt) {
        var dc = dt.currentTarget.dataset.communityid;
        var t = this;
        getApp().globalData.dtsearch = dc;
        wx.navigateTo({
            url: "/house/market/index"
        });
    },
    hotLinkXuequ: function (dt) {
       console.log(dt);
        var t = this,
          dc = dt.currentTarget.dataset.index;
        var schoolcode=dc.schoolcode;
        wx.navigateTo({
            url: "/school/school_details/index?cid=" + schoolcode
        });

       // getApp().globalData.dtsearch = dc;
       /// wx.switchTab({
       //     url: "/house/market/index"
      //  });



    },
    hotLinkTopic: function (dt) {
        var t = this,
            dc = dt.currentTarget.dataset.index;
      
        wx.showLoading({
            title: "加载中.."
          }),a.get("chatApi/get_topList", {
            tipcType:dc
        }, function (a) {
            wx.hideLoading(),t.setData({
                topic: dc,
                toplist: a.data
            });
        });
       

    },
    get_datafang: function () {
        var t = this;
        a.get("chatApi/get_market", {}, function (a) {
            chartData = a.chartsData;
            tpchar = a.chartsData.tpchar;
            tpdanwei = a.chartsData.tpdanwei;
            tpdanwei1 = a.chartsData.tpdanwei1;
            //console.log(a.ad);
            1 == t.setData({
                show: !0,
                topic:1,
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
                chengjiao:a.chengjiao,
                xqlist:a.xqlist,
                xqlist_top:a.xqlist_top 
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
    get_zhidinglist:function(){
        var t = this;
        a.get("zhiDing/zhiDingList",
         {}, 
        function (a) {
            t.setData({
                zhidinglist:a.data
            })
            // console.log(a.data)
        });
    },
    
    get_homechart: function (dt) {
        var t=this;
        a.get("datafangcopy/get_homechart2020", {
            xswitch: t.data.xswitch,
            activeItem:t.data.chart_activeItem,
            chart_activeItem_year:t.data.chart_activeItem_year,
        }, function (a) {
            chartData = a.chartsData;
            tpchar = a.chartsData.tpchar;
            tpdanwei = a.chartsData.tpdanwei;
            tpdanwei1 = a.chartsData.tpdanwei1;

            t.setData({
                show: !0,
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
                    series: [{
                        name: a.chartsData.lddata[0],
                        data: a.chartsData.seriesData,
                        itemStyle: {
                            normal: {
                                label: {
                                    formatter: a.chartsData.tpdanwei1
                                }
                            }
                        }
                    }, {
                        name: a.chartsData.lddata[1],
                        data: a.chartsData.seriesData1,

                    }]
                });
            }, 200);
        });
    },
    xswitch:function(dt) {
        var t = this;
        //console.log(dt);
        var xswitch = dt.currentTarget.dataset.xswitch;
        t.setData({
            xswitch: xswitch,
            show: !1,
        });
        t.get_homechart();
    },
     //图表切换功能 周报 月报 年报
     chartSwitch: function(d) {
        var t = this;
       // if(t.data.member.viplevel==0)
       // {
       //     t.vipmsgbox("专业版");

      //      return;
      //  }
        1 == t.setData({
            chart_activeItem:  d.currentTarget.dataset.text,
          
            show:!1
        });
        
        t.get_homechart();
    },
     //图表切换功能 周报 月报 年报
     chartSwitch_year: function(d) {
        var t = this;
        var chart_activeItem_year=d.currentTarget.dataset.text;
       // if(t.data.member.viplevel==0)
      //  {   
      //      t.vipmsgbox("专业版");
      //      return;
      //  }
      //  if(t.data.member.viplevel!=2&&chart_activeItem_year==3)
      //  {
      //      t.vipmsgbox("专业版(年卡)");
      //      return;
      //  }
        1 == t.setData({
            chart_activeItem_year:chart_activeItem_year,
          
            show:!1
        });
        
        t.get_homechart();
    },
    toReports: function () {
        wx.navigateTo({
            url: '/house/rank/index',
        })
    },
    toXuequ: function () {
        wx.navigateTo({
            url: '/school/xuequ/index',
        })
    },
    handleGoDetail: function (t) {
        var a = t.currentTarget.dataset.userid;
        var b = t.currentTarget.dataset.adid;
        var c = t.currentTarget.dataset.houseid;
        // wx.navigateTo({
        //     url: '/house/guwen/gw-detail/index?userid=' + a + '&adid=' + b + '&houseid=' + c,
        // })
        wx.navigateTo({
            url: '/project/pages/chat/chat?userid=' + a + '&adid=' + b,
        })
    },
    goToAd: function (dt) {
        var src = dt.currentTarget.dataset.adurl;
        //console.log(dt);
        //console.log(src);
        wx.navigateTo({
            url: '../' + src,
        })
    },
    toNearby: function (item) {
        var nearby = item.currentTarget.dataset.nearby;

        wx.navigateTo({
            url: '/house/looklog/fjindex?dtype=' + nearby,
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

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
    imgYu: function (event) {
        //var src = event.currentTarget.dataset.src;//获取data-src
        //var imgList = event.currentTarget.dataset.list;//获取data-list
        var src = "https://sbmf.ww2ss.com/dfimages/logo.jpg";
        var imgArr = [];
        imgArr[0] = "https://sbmf.ww2ss.com/dfimages/logo.jpg";
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
                            a.alert("手边买房微信号已复制,快去添加好友，拉群讨论吧！");
                        }, 100);

                    }
                })
            }
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        var st = this;
        return {
            title: '杭州查房价的好工具！',
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
    close: function () {
        e.globalDataClose.flag = !0, wx.reLaunch({
            url: "/pages/message/auth/index"
        });
    },
    calcBrokerCardWidth: function () {
        var t = getApp().globalData.deviceWidth;
        return t >= 460 || t <= 375 ? 276 : Math.round(276 * t / 375);
    },
    fangmore: function () {
        wx.navigateTo({
            url: "/house/market/index"
        });
    },
    toSearch: function (a) {
        var t = this,
            e = "";
        "请输入板块名、楼盘名" != t.data.searchCon && (e = t.data.searchCon), 8 == getCurrentPages().length ? wx.redirectTo({
            url: "/house/market/search?cityId=" + t.data.city_id + "&searchInp=" + e + "&listParam=" + t.data.list_param + "&searchParam=2"
        }) : wx.navigateTo({
            url: "/house/market/search?cityId=" + t.data.city_id + "&searchInp=" + e + "&listParam=" + t.data.list_param + "&searchParam=2"
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
    handleGoTab: function (a) {
        wx.navigateTo({
            url: "/house/searchHouse/index"
        }); 
    },
    zhiding_refresh:function(dt){
        var cid = dt.currentTarget.dataset.cid;       
        a.get("zhiDing/zhiDingRefresh", {
            cid:cid
        }, 
        function (dt) {            
            dt.data==1?a.toast("刷新成功！"):a.toast("刷新异常！");
        });
        
    },
     // 获取新闻标题列表
     getnav: function () {
        var t = this;
        t.setData({
            loading: !0
        }), a.get("noticeApi/get_indexlist", {
            notice_type: t.data.notice_type
        }, function (e) {
            console.log("data值", e)
            var a = {
                loading: !1,
                loaded: !0,
                list: e.data,
                nav: e.notice_type,
            };
            t.setData(a);
        });
    },
    // 点击切换选中
    changeNav(e) {
        console.log("e", e)
        let notice_type = e.currentTarget.dataset.id;
        console.log(notice_type)
        let index = e.currentTarget.dataset.index;
        this.setData({
            active: index,
            notice_type: notice_type
        })
        this.getnav();
    },
    // 跳转分享页面
    notice_share: function (e) {
        console.log("2",e)
        let id = e.currentTarget.dataset.id;
        let name = encodeURIComponent(e.currentTarget.dataset.name);
        wx.navigateTo({
            url: "/project/pages/share/share?id=" + id+"&name="+name
        })
    },
     // 跳转爆文复合页
    notice_more:function(){
        wx.navigateTo({
            url: "/project/pages/news/news"
        })
    },  // 跳转学区top30
    go_linkxiaoqu_top:function(){
        wx.navigateTo({
            url: "/school/school_map/index"
        })
    },
})