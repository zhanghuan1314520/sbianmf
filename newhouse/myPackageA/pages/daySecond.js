// newhouse/myPackageA/pages/daySecond.js
// 1、引入依赖脚本
import * as echarts from '../../../ec-canvas/echarts';

let chart = null;

// 2、进行初始化数据
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56'
        }
      }
    },
    legend: {
      data: ['成交量', '均价']
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100
    },
    xAxis: [
      {
        type: 'category',
        barCategoryGap:["5%"],
        data:["06.07","06.07","06.07","06.07","06.07"],
      },
      {
        type: 'category',
        boundaryGap: true,
        data:[],
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        name: '成交量',
        max: 500,
        min: 0,
        boundaryGap: ['20%']
      },
      {
        type: 'value',
        scale: true,
        name: '均价',
        max: 4,
        min: 0,
        boundaryGap: ["20%","20%"]
      }
    ],
    series: [
      {
        name: '均价',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data:[2,4,5,3,1],
      },
      {
        name: '成交量',
        type: 'line',
        data:[100,300,500,200,80]
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    scrollLeft: 0,
    data: {
      src: "https://cdn.lottery.okgoes.com/8.png"
    },
    cWidth: "",
    cHeight: "",
    pixelRatio: 1,
    textarea: "",
    time: [],
    currentIndex: 0,
    info: {},
    list: [],
    categories: [],
    canvaRing: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})