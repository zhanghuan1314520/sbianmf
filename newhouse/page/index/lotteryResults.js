// newhouse/page/index/lotteryResults.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableList: [{
      id: 1,
      houseType: "房源套数",
      num: 883,
      personnel: 44,
      noHouse: 839,
      hasHouse: 33
    }, {
      id: 2,
      houseType: "报名人数",
      num: 883,
      personnel: 44,
      noHouse: 839,
      hasHouse: 33
    }, {
      id: 3,
      houseType: "摇中概率",
      num: "19.31%",
      personnel:"19.31%",
      noHouse: "19.31%",
      hasHouse: "19.31%",
    }],
    result: {
      frontSort: 0,
      sort: 0,
      status: 1
    },
    params: {
      keyword: "",
      pfsId: ""
    },
    name: "绿城·桂冠东方"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  todetails:function(){
    wx.redirectTo({
      url:'/newhouse/home/pages/houseDis'
    })
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