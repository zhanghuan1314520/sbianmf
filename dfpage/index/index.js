import * as echarts from '../../ec-canvas/echarts';

let chart = null;
var chartData = null;
var tpchar = null;
var tpdanwei = '';
var tpdanwei1 = null;
//每日成交柱状图
function getOption(aText, aSubtext, xData, sData) {
    var option = {
        title: {
            x: 'center',
            text: aText,
            subtext: aSubtext,
            textStyle: {
                fontSize: 16
            },
            padding: [10, 5, 0, 5]
        },
        tooltip: {
            trigger: 'axis',
            showContent: true,
            formatter: function(a) {
                var ltter = null;
                for (var i = 0; i < a.length; i++) {
                    ltter = a[i].name + '日：\n' + tpchar + '：' + a[i].data + tpdanwei + '\n均价：' + chartData.seriesData1[a[i].dataIndex] + '元'
                    //console.log(tpdanwei);
                    //console.log(tpdanwei1);
                    //console.log(a[i].dataIndex);
                    //console.log(a[i].data); 
                    //console.log(a[i].name);
                    //console.log(chartData.seriesData1[a[i].dataIndex]);
                }
                return ltter
            }
            /***
            function (params) {
              // do some thing
              //chartData
              console.log(params);
              return "名称：" + params.dataIndex
            }***/
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: true,
                    readOnly: false
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: false
                }
            }
        },
        calculable: true,
        grid: {
            borderWidth: 0,
            y: 70,
            y2: 60
        },
        xAxis: [{
            type: 'category',
            data: xData
        }],
        yAxis: [{
            type: 'value'

        }],
        series: [{
            type: 'bar',
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
                        formatter: function(params) {
                            return params.data + tpdanwei;
                        }

                    }
                }
            },
            data: sData
        }]
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
        ecLine: {
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
        xswitch: 3,
        mid:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(t) {
        t = t || {};
        var a = this;
      
        a.setData({
            mid: t.mid
        });
    },
    getInfo: function() {
        var e = this;
        //获得登录用户个人信息，包括是否充值会员 
        a.get("member", {
            mid:this.data.mid
        }, function(a) {
            1 == a.isblack && wx.showModal({
                title: "无法访问",
                content: "您在商城的黑名单中，无权访问！",
                success: function(a) {
                    a.confirm && e.close(), a.cancel && e.close();
                }
            }), 0 != a.error ? wx.redirectTo({
                url: "/pages/message/auth/index"
            }) : e.setData({
                member: a,
                show: !0,
            }), t.wxParse("wxParseData", "html", a.copyright, e, "5");
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        e.checkAuth();
        var a = this;
        this.getInfo(), a.get_datafang(), wx.getSystemInfo({
            success: function(e) {
                var t = e.windowWidth / 1.7;
                a.setData({
                    windowWidth: e.windowWidth,
                    windowHeight: e.windowHeight,
                    swiperheight: t
                });
            }
        });
    },
    get_datafang: function() {
        var t = this;
        a.get("datafang/get_market", {}, function(a) {
            chartData = a.chartsData;
            tpchar = a.chartsData.tpchar;
            tpdanwei = a.chartsData.tpdanwei;
            tpdanwei1 = a.chartsData.tpdanwei1;

            1 == t.setData({
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
                xswitch: 3
            });
            setTimeout(function() {
                chart.setOption({
                    title: {
                        text: a.chartsData.chartsText,
                        subtext: a.chartsData.chartsSubtext
                    },
                    xAxis: {
                        data: a.chartsData.xAxisName
                    },
                    series: [{
                        data: a.chartsData.seriesData
                    }]
                });
            }, 1000);
        });
    },

    get_homechart: function(dt) {
        var t = this;
        //console.log(dt);
        var xswitch = dt.currentTarget.dataset.xswitch;
        t.setData({
            xswitch: xswitch
        });
        a.get("datafang/get_homechart", {
            xswitch: xswitch
        }, function(a) {
            chartData = a.chartsData;
            tpchar = a.chartsData.tpchar;
            tpdanwei = a.chartsData.tpdanwei;
            tpdanwei1 = a.chartsData.tpdanwei1;
            chart.setOption({
                title: {
                    text: a.chartsData.chartsText,
                    subtext: a.chartsData.chartsSubtext
                },
                xAxis: {
                    data: a.chartsData.xAxisName
                },
                series: [{
                    data: a.chartsData.seriesData
                }]
            });

        });
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

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
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
        setTimeout(function() {
            // 获取 chart 实例的方式
            console.log(chart)
        }, 2000);
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        var st=this;       
        //console.log("-------------------");
        console.log(st.data.member.id);
        console.log('/dfpage/index / index ? mid =' + st.data.member.id);
        return {
            title: '手边买房',
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
})