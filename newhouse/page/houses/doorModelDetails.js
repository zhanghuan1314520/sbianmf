// newhouse/page/houses/doorModelDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: -1,
    blockIndex: 0,
    titList: [
      {title:"3室"},
      {title:"4室"},
      {title:"5室"}
    ],
    hourseTypeList: [
      {image:"/images/img.jpg",area:98,name:"三房两厅两卫"},
      {image:"/images/img.jpg",area:98,name:"三房两厅两卫"},
      {image:"/images/img.jpg",area:98,name:"三房两厅两卫"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tap_tag:function(e){
    console.log(e)
    var i = e.currentTarget.dataset.index;
    this.setData({
      blockIndex:i
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