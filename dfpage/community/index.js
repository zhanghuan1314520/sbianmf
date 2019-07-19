// dfpage/test.js
import * as echarts from '../../ec-canvas/echarts';

let chart = null;
var chartData = null;
let charts = null;
var chartDatas = null;
//最近七月成交柱状表
function getOption(aText, aSubtext, xData, sData) {
  var option = {

    tooltip: {
      trigger: 'axis',
      showContent: true,
      formatter: function(a) {
        var ltter = null;
        for (var i = 0; i < a.length; i++) {
          ltter = a[i].name + '月：\n成交：' + a[i].data + '套\n均价：' + chartData.seriesData1[a[i].dataIndex] + '元'
        }
        return ltter
      }
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
            formatter: '{c}套'
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
      showContent: true,
      formatter: function(a) {
        var ltter = null;
        for (var i = 0; i < a.length; i++) {
          ltter = a[i].name + '日：\n带看：' + a[i].data + '次\n均价：' + chartDatas.seriesData1[a[i].dataIndex] + '元'
        }
        return ltter
      }
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
    zbpricelist:[],
    lppricelist:[],
    islogin: '',
    limits: !0,
    isShare: !1
  },
  to() {
    wx.navigateToMiniProgram({
      appId: 'wx628f3daad858165e',
      extraData: {
        company_name: 'kuadu'			//传参数
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
    var st = this;
    //判断页面来源
    let pages = getCurrentPages()
    if (pages.length < 2) {
      st.setData({
        isShare: !0
      });
    }
    st.setData({
      cid: dt.cid
    });

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
    this.getInfo(), t.get_community(), wx.getSetting({
      success: function(a) {
        var e = a.authSetting["scope.userInfo"];
        t.setData({
          anum: e
        });
      }
    });
  },
  getInfo: function() {
    var e = this;
    a.get("member", {}, function(a) {

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
        iscycelbuy: a.iscycelbuy,
        bargain: a.bargain
      }), t.wxParse("wxParseData", "html", a.copyright, e, "5");
    });
  },
  get_community: function() {
    var t = this;
    a.get("datafang/islogin", {}, function(dt) {
      t.setData({
        islogin: dt.islogin
      })
      a.get("datafang/get_community", {
        cid: t.data.cid
      }, function(a) {
        1 == t.setData({
          community: a.community,
          countArray: a.countArray,
          deallist: a.deallist,
          zbpricelist: a.zbpricelist,
          lppricelist: a.lppricelist
        });

        setTimeout(function () {  
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
        }, 1000);

      });
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
  goHouse: function goPage(dt) {
    var cid = dt.currentTarget.dataset.cid;
    if (cid == '') {
      return;
    }
    wx.navigateTo({
      url: "../house/house?cid=" + cid
    });
  },
  goCommunity: function goPage(dt) {
    var cid = dt.currentTarget.dataset.cid;
    if (cid == '') {
      return;
    }
    wx.navigateTo({
      url: "../community/index?cid=" + cid
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

  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})