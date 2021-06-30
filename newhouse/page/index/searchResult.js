// newhouse/page/index/searchResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad: !1,
    name: "绿城·桂冠东方",
    active: -1,
    floorIndex: 0,
    res: ["摇号结果", "意向登记表"],
    showTableList: [{
      houseType: "房源套数",
      num: 255,
      personnel: 51,
      noHouse: 128,
      hasHouse: 76
    }, {
      houseType: "报名人数",
      num: 255,
      personnel: 51,
      noHouse: 128,
      hasHouse: 76
    }, {
      houseType: "摇中概率",
      num: 255,
      personnel: 51,
      noHouse: 128,
      hasHouse: 76
    }],
    tableList1: [{
      houseType: "房源套数",
      num: 255,
      personnel: 51,
      noHouse: 128,
      hasHouse: 76
    }, {
      houseType: "报名人数",
      num: 255,
      personnel: 51,
      noHouse: 128,
      hasHouse: 76
    }, {
      houseType: "摇中概率",
      num: 255,
      personnel: 51,
      noHouse: 128,
      hasHouse: 76
    }],
    sigleData: [],
    sigleData2: [],
    sigleDataLabel: {
      sort: "选房顺序",
      name: "姓名",
      idCardNum: "身份证号",
      lotteryNum: "摇号编码"
    },
    sigleDataLabel2: {
      sort: 1,
      name: "姓名",
      idCardNum: "身份证号",
      lotteryNum: "摇号编码",
      status: "状态"
    },
    column: {},
    isBootom: !1,
    params: {
      keyword: "",
      pfsId: "",
      page: 1,
      pagesize: 10
    },
    nav: [
      {
        id: 1,
        list: [
          {
            sort: 1,
            name: "张帅",
            idCardNum: "330326199305300727",
            lotteryNum: "YFC00976",
            status: "状态"
          },
        ]
      },
      {
        id: 2,
        list: [
          {
            sort: 2,
            name: "张帅",
            idCardNum: "330326199305300727",
            lotteryNum: "YFC00976",
            status: "状态"
          },
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getanswer:function(){
    wx.navigateTo({
      url: '/newhouse/page/index/lotteryResults',
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