// newhouse/page/common/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchVal: "",
    showSync: !1,
    phIdx: 0,
    placeholder:"输入楼盘名称搜索"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  placeholder: function() {
    return this.isHideTips || 0 == this.placeholderList.length ? "输入楼盘名称搜索" : this.placeholderList[this.phIdx];
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