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
      showContent: true,
      formatter: function(a) {
        var ltter = null;
        for (var i = 0; i < a.length; i++) {
          ltter = a[i].name + '日：\n带看：' + a[i].data + '次\n均价：' + chartData.seriesData1[a[i].dataIndex] + '元'
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
    gotolist:[],
    islogin: 'no',
    limits: !0,
    isShare: !1
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
  goto: function (dt) {
    var cid = dt.currentTarget.dataset.cid;
    console.log(cid);
    wx.navigateTo({
      appId:"wxcfd8224218167d98",
      url: "/pages/esf/esf_details",
      success: function () {
        console.log('跳转到news页面成功')// success              
      },
      fail: function () {
        console.log('跳转到news页面失败');
      }
    })
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
    this.getInfo(), t.get_house(), wx.getSetting({
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
  get_house: function() {
    var t = this;
    a.get("datafang/islogin", {}, function(dt) {
      if (dt.islogin == 'no') {
        wx.showToast({
          title: 'vip会员才能查看!',
          duration: 3000
        })
        wx.navigateTo({
          url: "../../pages/member/membercard/index"
        });
        return;
      } else {
        a.get("datafang/get_house", {
          cid: t.data.cid
        }, function(a) {
          if (a.islogin == 'no') {
            wx.showToast({
              title: 'vip会员才能查看!',
              duration: 3000
            })
            wx.navigateTo({
              url: "../../pages/member/membercard/index"
            });
          } else {
            1 == t.setData({
              house: a.house,
              community: a.community,
              countArray: a.countArray,
              usalelog: a.usalelog,
              deallist: a.deallist,
              gotolist: a.gotolist,
              islogin: a.islogin
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
          }
        });
      }
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
  goPage: function goPage(dt) {
    var page = dt.currentTarget.dataset.page;
    wx.switchTab({
      //跳转到tabBar页面，并关闭其他所有tabBar页面
      url: "/" + page
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