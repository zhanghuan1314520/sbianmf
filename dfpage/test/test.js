import * as echarts from '../../ec-canvas/echarts';

let chart = null;
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    title: {
      x: 'center',
      text: 'ECharts例子个数统计',
      subtext: 'Rainbow bar example',
      link: 'http://echarts.baidu.com/doc/example.html'
    },
    tooltip: {
      trigger: 'item'
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    grid: {
      borderWidth: 0,
      y: 80,
      y2: 60
    },
    xAxis: [
      {
        type: 'category',

        data: ['Line', 'Bar', 'Scatter', 'K', 'Pie', 'Radar', 'Chord']
      }
    ],
    yAxis: [
      {
        type: 'value',

      }
    ],
    series: [
      {
        name: 'ECharts例子个数统计',
        type: 'bar',
        itemStyle: {
          normal: {
            color: function (params) {
              // build a color map as your need.
              var colorList = [
                '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD', '#39A5FD',
                '#39A5FD', '#39A5FD'
              ];
              return colorList[params.dataIndex]
            },
            label: {
              show: true,
              position: 'top',
              formatter: '{b}\n{c}'
            }
          }
        },
        data: [12, 21, 10, 4, 12, 5, 6],
        markPoint: {
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0)',
            formatter: function (params) {
              return '<img src="'
                + params.data.symbol.replace('image://', '')
                + '"/>';
            }
          },
          data: [
            { xAxis: 0, y: 350, name: 'Line', symbolSize: 20, symbol: 'image://../asset/ico/折线图.png' },
            { xAxis: 1, y: 350, name: 'Bar', symbolSize: 20, symbol: 'image://../asset/ico/柱状图.png' },
            { xAxis: 2, y: 350, name: 'Scatter', symbolSize: 20, symbol: 'image://../asset/ico/散点图.png' },
            { xAxis: 3, y: 350, name: 'K', symbolSize: 20, symbol: 'image://../asset/ico/K线图.png' },
            { xAxis: 4, y: 350, name: 'Pie', symbolSize: 20, symbol: 'image://../asset/ico/饼状图.png' },
            { xAxis: 5, y: 350, name: 'Radar', symbolSize: 20, symbol: 'image://../asset/ico/雷达图.png' },
            { xAxis: 6, y: 350, name: 'Chord', symbolSize: 20, symbol: 'image://../asset/ico/和弦图.png' },
          ]
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  }
});