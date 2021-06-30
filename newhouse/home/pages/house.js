// newhouse/home/pages/house.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {url:'/images/img.jpg',m1:"即将加推",name:"地铁万科未来天空之城",minPrice:39620,addr:"余杭区未来科技城"},
      {url:'/images/img.jpg',m1:"即将加推",name:"地铁万科未来天空之城",minPrice:39620,addr:"余杭区未来科技城"},
      {url:'/images/img.jpg',m1:"即将加推",name:"地铁万科未来天空之城",minPrice:39620,addr:"余杭区未来科技城"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  showRes: function showRes(t) {
    console.log(t);
    var a = t.saleStatus, s = t.pfsId, o = t.name;
    this.isQueryRes && 6 === a && e.navigateTo({
      url: "/pages/index/searchResult?pfsId=".concat(s, "&name=").concat(o)
    });
  },
  houseDetails: function houseDetails(t) {
    this.isToDetail ? e.navigateTo({
      url: "/home/pages/houseDis?pfsId=" + t.pfsId
    }) : this.$emit("getDetail", t);
  },
  showStatus: function showStatus(e) {
    var t = "";
    switch (e) {
      case 1:
        t = "即将预售";
        break;

      case 2:
        t = "正在公示";
        break;

      case 3:
        t = "正在登记";
        break;

      case 4:
        t = "正在摇号";
        break;

      case 5:
        t = "补交资料";
        break;

      case 6:
        t = this.isQueryRes ? "查看结果" : "已摇号";
        break;

      case 7:
        t = "在售";
        break;

      case 8:
        t = "售罄";
        break;

      case 9:
        t = "等待摇号";
        break;

      case 10:
        t = "待首开";
        break;

      case 11:
        t = "即将加推";
        break;

      default:
        t = "";
        break;
    }
    return t;
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