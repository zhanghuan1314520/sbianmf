// newhouse/page/index/lotteryTime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: !0,
    interval: 2e3,
    duration: 500,
    timeLIst: [],
    params: {
        keyword: "",
        page: 1,
        pagesize: 100
    },
    isBottom: !1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  xq:function(){
    wx.navigateTo({
      url: '/newhouse/home/pages/houseDis',
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