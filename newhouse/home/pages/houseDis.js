// newhouse/home/pages/houseDis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: !1,
    // avatar: t.getStorageSync("user_avt"),
    scrolling: !1,
    isEnd: !1,
    isFirst: !1,
    startData: {
      clientX: "",
      clientY: ""
    },
    lotteryTimeStart: null,
    num: 0,
    top: getApp().globalData.navTop,
    navHeight: getApp().globalData.navHeight,
    statusBarHeight: getApp().globalData.statusBarHeight,
    isTop: 0,
    myScroll: "",
    bottomText: "",
    isHasSale: !1,
    begin: -1,
    latitude: 30.243646,
    longitude: 120.18219,
    polygons: [],
    ptlatitude: 30.243646,
    ptlongitude: 120.18219,
    markers: [[], [], [], []],
    marker: [],
    circles: [{
      latitude: 30.243646,
      longitude: 120.18219,
      color: "#d2d2d2",
      fillColor: "#cccccc50",
      radius: 1e3,
      strokeWidth: 1
    }, {
      latitude: 30.243646,
      longitude: 120.18219,
      color: "#d2d2d2",
      fillColor: "#cccccc50",
      radius: 2e3,
      strokeWidth: 1
    }],
    hourseTypeList: [],
    modelShow: !1,
    samePriceRecommendList: [],
    isFocus: !1,
    // formatDate: n.formatDate,
    // formatText: n.formatText,
    // formatChangeText: n.formatChangeText,
    // base64Encode: n.base64Encode,
    covers: {},
    pfsId: "",
    pageOriginData: {
      sellerList: [
        {avatar:"/images/img.jpg",name:"张学文"},
        {avatar:"/images/img.jpg",name:"李国伟"},
        {avatar:"/images/img.jpg",name:"大张伟"},
        {avatar:"/images/img.jpg",name:"赤果果"}
      ],
     hourseTypeList:[
      {image:"/images/img.jpg",name:"3房2厅2卫",area:89},
      {image:"/images/img.jpg",name:"3房2厅2卫",area:89},
      {image:"/images/img.jpg",name:"3房2厅2卫",area:89}
     ],
      estimateOpenDetail: {}
    },
    sigleInfo: [
      {name:"开发商",title:"绿城"},
      {name:"容积率",title:2.90},
      {name:"总户数",title:2700},
      {name:"绿化率",title:"30%"},
      {name:"楼层状况",title:"15-42F"},
      {name:"建筑面积",title:"56100m²"},
      {name:"物业公司",title:"绿城物业"}
    ],
    estimateOpenDetail: {
      estimateOpenTime: "预计开盘：",
      saleFloor: "销售楼栋：",
      openPrice: "开盘价格：",
      frozenMoney: "冻资要求：",
      decoration: "装修情况：",
      hourseTypeArea: "户型面积：",
      hourseNum: "房源套数："
    },
    swiperData: [],
    dotsStyles: {
      backgroundColor: "#BEC4CC",
      selectedBackgroundColor: "#1F6EFF",
      border: "1px #BEC4CC solid",
      selectedBorder: "none"
    },
    current: 0,
    mode: "round",
    newsList: [
      {title:"联发阳光城哈哈哈"}
    ],
    tagIndex: 0,
    postersData: null,
    demandIndex: 0,
    matingIndex: 0,
    searchVal: "",
    currentIndex: 0,
    navTag: ["开盘 | 2020.12.20", "未来科技城板块", "闭眼摇"],
    items: ["效果图", "位置图", "总平图", "户型图", "样板间"],
    maptype: [{
      icon: "https://cdn.lottery.okgoes.com/houseDetail_mapType_icon1.png",
      icon_active: "https://cdn.lottery.okgoes.com/houseDetail_mapType_icon1-active.png",
      name: "商业",
      color: "#FF9800"
    }, {
      icon: "https://cdn.lottery.okgoes.com/houseDetail_mapType_icon2.png",
      icon_active: "https://cdn.lottery.okgoes.com/houseDetail_mapType_icon2-active.png",
      name: "交通",
      color: "#B95DFF"
    }, {
      icon: "https://cdn.lottery.okgoes.com/houseDetail_mapType_icon3.png",
      icon_active: "https://cdn.lottery.okgoes.com/houseDetail_mapType_icon3-active.png",
      name: "教育",
      color: "#2B67FF"
    }, {
      icon: "https://cdn.lottery.okgoes.com/houseDetail_mapType_icon4.png",
      icon_active: "https://cdn.lottery.okgoes.com/houseDetail_mapType_icon4-active.png",
      name: "医疗",
      color: "#29E8BF"
    }],
    maptype_activeIndex: 0,
    List: [{
      id: 1,
      img: "https://cdn.lottery.okgoes.com/houseDetail_icon1.png",
      title: "摇号点评",
      url: "/newhouse/page/houses/floorRemark"
    }, {
      id: 2,
      img: "https://cdn.lottery.okgoes.com/houseDetail_icon2.png",
      title: "楼盘详情",
      url: "/newhouse/page/houses/floorDis"
    }, {
      id: 7,
      img: "https://cdn.lottery.okgoes.com/houseDetail_icon3.png",
      title: "下次推盘",
      url: "/newhouse/home/pages/pushThePlate"
    }, {
      id: 4,
      img: "https://cdn.lottery.okgoes.com/houseDetail_icon4.png",
      title: "历史中签率",
      url: "/newhouse/page/houses/suceessRate"
    }, {
      id: 5,
      img: "https://cdn.lottery.okgoes.com/houseDetail_icon5.png",
      title: "一房一价表",
      url: "/newhouse/page/houses/ahousePic"
    }, {
      id: 6,
      img: "https://cdn.lottery.okgoes.com/houseDetail_icon6.png",
      title: "公示方案",
      url: "/newhouse/page/houses/publicPlan"
    }, {
      id: 7,
      img: "https://cdn.lottery.okgoes.com/houseDetail_icon7.png",
      title: "开盘信息",
      url: "/newhouse/page/houses/openInformation"
    }, {
      id: 8,
      img: "https://cdn.lottery.okgoes.com/houseDetail_icon8.png",
      title: "摇号结果",
      url: "/newhouse/page/index/lotteryResults"
    }],
    sigleData: [{
      name: "选房顺序",
      title: ["第一位"]
    }, {
      name: "姓名",
      title: ["第八题", "叶良辰", "地阿斯"]
    }, {
      name: "身份证号",
      title: ["330823********2722", "330823********2722", "330823********2722"]
    }, {
      name: "摇号编码",
      title: ["SYF00353"]
    }],
    tableList: [],
    time: [{
      title: "取证公示",
      time: "05.19-05.21",
      over: !1
    }, {
      title: "登记",
      time: "05.19-05.21",
      over: !1
    }, {
      title: "补资料",
      time: "05.19-05.21",
      over: !1
    }, {
      title: "意向公示",
      time: "05.19-05.21",
      over: !1
    }, {
      title: "摇号",
      time: "05.19-05.21",
      over: !1
    }, {
      title: "选房",
      time: "05.19-05.21",
      over: !1
    }],
    timeTag: [{
      title: "公示方案",
      time: "",
      isShow: !1,
      url: "/pages/houses/publicPlan"
    }, {
      title: "一房一价",
      time: "",
      isShow: !1,
      url: "/pages/houses/ahousePic"
    }, {
      title: "意向登记",
      time: "",
      isShow: !1,
      url: "/home/pages/registration"
    }, {
      title: "摇号结果",
      time: "",
      isShow: !1,
      url: "/pages/index/searchResult"
    }],
    userId: -1,
    chatId: "",
    nav:[
      {title:"笕桥的热,翘起测试是是",authorName:"张文",g0:'2021.06.16',picture:"/images/img.jpg"},
      {title:"笕桥的热,翘起测试是是测试测试测试超市场笕桥的热",authorName:"张文",g0:'2021.06.16',picture:"/images/img.jpg"},
      {title:"笕桥的热,翘起测试是是测试测试测试超市场笕桥的热,翘起测试是是测",authorName:"张文",g0:'2021.06.16',picture:"/images/img.jpg"}
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tap_jump:function(dt){
    console.log(dt)
    wx.navigateTo({
      url: dt.currentTarget.dataset.url,
    })
  },
  //点评
  dianping:function(){
    wx.navigateTo({
      url: '/newhouse/page/houses/floorRemark',
    })
  },
  //置业顾问
  wxGetUserInfo:function(){
    wx.navigateTo({
      url: '/newhouse/page/common/counselor',
    })
  },
  // 户型图
  huxing:function(){
    wx.navigateTo({
      url: '/newhouse/page/houses/doorModelDetails',
    })
  },
  //轮播图手动切换
  tap_banner:function(e){
    console.log(e)
    var i = e.currentTarget.dataset.index;
    this.setData({
      currentIndex:i
    })
  },
  //地图切换
  tap_map:function(e){
    console.log(e)
    var i = e.currentTarget.dataset.index;
    this.setData({
      maptype_activeIndex:i
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