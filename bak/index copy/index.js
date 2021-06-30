import * as echarts from '../../ec-canvas/echarts';

let chart = null;
var chartData = null;
var tpchar = null;
var tpdanwei = '';
var tpdanwei1 = null;

function initChart(canvas, width, height, dpr) {
    chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // new
    });
    canvas.setChart(chart);

    var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          confine: true
        },
        legend: {
          data: []
        },
        grid: {
          y: "40",
          y2: "20",
          left: 20,
          right: 20,
          bottom: 15,
          top: 40,
          containLabel: true
        },
        animation: false,
        dataZoom: [{
                show: true,
                start: 20,
                end: 100
            },
            {
                type: 'inside',
                start: 20,
                end: 100
            },
        ],
    
        xAxis: [ {
          type: 'category',
          axisTick: { show: false },
          data: [],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
          
        ],
        yAxis: [
          {
            type: 'value',
        
        
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              color: '#666'
            }
          },
          {
              type: 'value',
              min:30000,
              splitNumber: 8,
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
        series: [
          {
            name: '热度',
            type: 'bar',
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            data: [],
            itemStyle: {
              // emphasis: {
              //   color: '#37a2da'
              // }
            }
          },
          {
            name: '正面',
            type: 'bar',
            yAxisIndex: 0,
            stack: '总量',
            label: {
              normal: {
                show: true
              }
            },
            data: [],
            itemStyle: {
              // emphasis: {
              //   color: '#32c5e9'
              // }
            }
          },
          {
            name: '负面',
            type: 'bar',
            yAxisIndex: 0,
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'left'
              }
            },
            data: [],
            itemStyle: {
              // emphasis: {
              //   color: '#67e0e3'
              // }
            }
          },
          {
            name: 'A',
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            data: []
          }
        ]
      };
  
    chart.setOption(option);
    return chart;
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
            onInit: initChart
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
        }]

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
                    yAxis: [
                       
                      ],
                    xAxis: {
                        data: a.chartsData.xAxisName
                    },
                    series: [{
                        name: a.chartsData.lddata[0],
                        data: a.chartsData.seriesData
                    }, {
                        name: a.chartsData.lddata[1],
                        type: 'line',
                        yAxisIndex: 1,
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
        var t = this;
        //console.log(dt);
        var xswitch = dt.currentTarget.dataset.xswitch;
        t.setData({
            xswitch: xswitch,
            show: !1,
        });
        a.get("datafangcopy/get_homechart2020", {
            xswitch: xswitch
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
                    yAxis: [
                      
                      ],
                    xAxis: {
                        name:a.chartsData.xAxisName,
                        data: a.chartsData.xAxisName,
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    series: [{
                        name: a.chartsData.lddata[0],
                        data: a.chartsData.seriesData,
                       
                    }, {
                        name: a.chartsData.lddata[1],
                        data: a.chartsData.seriesData1,
                        type: 'line',
                        yAxisIndex: 1,
                        format: function (val, name) {
                            return val.toFixed(2) + '套';
                        }

                    }, {
                        name: a.chartsData.lddata[2],
                        data: a.chartsData.seriesData2,
                        type: 'line',
                        yAxisIndex: 1,

                    }]
                });
            }, 200);
        });
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