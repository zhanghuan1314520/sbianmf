// newhouse/page/houses/ahousePic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    floorIndex: 0,
    pfsId: "",
    name: "",
    address: "",
    titList: [
      {floorName:1},
      {floorName:2},
      {floorName:3}
    ],
    res: [ "3#", "4#", "5#" ],
    oneHouseOnePrice: [],
    data: {
        src: "https://cdn.lottery.okgoes.com/fps/2021/3/e0322e12bf2d428aa2c1c027d18d9ddc.png"
    },
    blockIndex: 0,
    datas: [ {
        title: "1单元",
        id: 1
    }, {
        title: "2单元",
        id: 2
    }, {
        title: "3单元",
        id: 3
    } ],
    tableList: [ {
        floor: "17层",
        averagePrice: "12479元/㎡",
        totalPrice: "12479元/㎡",
        size: "12479元/㎡"
    }, {
        floor: "16层",
        averagePrice: "12479元/㎡",
        totalPrice: "12479元/㎡",
        size: "12479元/㎡"
    }, {
        floor: "15层",
        averagePrice: "12479元/㎡",
        totalPrice: "12479元/㎡",
        size: "12479元/㎡"
    }, {
        floor: "14层",
        averagePrice: "12479元/㎡",
        totalPrice: "12479元/㎡",
        size: "12479元/㎡"
    } ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  floorSelect: function(e) {
    // this.floorIndex = this.titList[e].floorName;
    console.log(e)
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