// newhouse/page/hotList/hotList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderList: [ "" ],
    info: [
      {picture:"/images/img.jpg"},
      {picture:"/images/img.jpg"},
      {picture:"/images/img.jpg"},
      {picture:"/images/img.jpg"}
    ],
    mode: "round",
    current: 0,
    dotsStyles: {
        backgroundColor: "rgba(255,255,255,0.4)",
        selectedBackgroundColor: "#FFF",
        border: "none",
        selectedBorder: "none"
    },
    loading: !1,
    collection: "opendb-mall-goods",
    field: "goods_thumb,name,goods_tip,tag,goods_price,comment_count,month_sell_count,shop_name",
    formData: {
        status: "loading"
    },
    tipShow: !1,
    data: [],
    // getFloorLevelName: a.getFloorLevelName,
    // getSaleStatus: a.getSaleStatus,
    background: [ "color1", "color2", "color3" ],
    indicatorDots: !0,
    autoplay: !0,
    interval: 2e3,
    duration: 500,
    listType: "",
    isBottom: !1,
    params: {
        keyword: "",
        page: 1,
        pagesize: 10
    },
    houseData: []
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
  img:function(){
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