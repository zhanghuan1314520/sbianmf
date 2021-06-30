// newhouse/home/pages/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderList: [ "" ],
    flag: 0,
    text: "",
    lastX: 0,
    lastY: 0,
    istop: !1,
    houseData: [
      {url:'/images/img.jpg'}
    ],
    latitude: 30.243646,
    longitude: 120.18219,
    marker: [ {
        id: 0,
        latitude: 40.013305,
        longitude: 118.685713,
        iconPath: "",
        rotate: 0,
        width: 20,
        height: 20,
        title: "你在哪了",
        alpha: .6,
        callout: {
            content: "天空之城 ¥31,500",
            color: "#000000",
            fontSize: 14,
            borderRadius: 50,
            bgColor: "#fff",
            padding: "15",
            display: "ALWAYS",
            textAlign: "center"
        }
    } ],
    scale: 9,
    type: "",
    params: {
        keyword: "",
        page: 1,
        pagesize: 10
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