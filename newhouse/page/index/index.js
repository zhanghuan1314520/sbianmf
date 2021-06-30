// newhouse/page/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrolling: !1,
    show_openAd: !1,
    adBigConfig: {},
    placeholderList: [""],
    positionList: [{
      name: "热门楼盘",
      src: "https://cdn.lottery.okgoes.com/lottery13.png",
      size: 34,
      url: "/newhouse/home/pages/map?type=24",
      type: 24
    }, {
      name: "即将预售",
      src: "https://cdn.lottery.okgoes.com/lottery3.png",
      size: 48,
      url: "/newhouse/home/pages/map?type=3",
      type: 3
    }, {
      name: "正在公示",
      src: "https://cdn.lottery.okgoes.com/lottery4.png",
      size: 34,
      url: "/newhouse/page/hotList/hotList?type=31",
      type: 31
    }, {
      name: "正在登记",
      src: "https://cdn.lottery.okgoes.com/lottery5.png",
      size: 15,
      url: "/newhouse/page/hotList/hotList?type=32",
      type: 32
    }, {
      name: "摇号查询",
      src: "https://cdn.lottery.okgoes.com/lottery6.png",
      size: 0,
      url: "/newhouse/page/index/lotterySearch",
      type: 33
    }],
    headerCarousel: [],
    broadcastList: [],
    registeringList: [],
    background: ["color1", "color2", "color3"],
    indicatorDots: !0,
    autoplay: !0,
    interval: 2e3,
    duration: 500,
    items: ["12.21", "12.2", "12.3", "12.60", "12.11", "12.60", "12.11"],
    lotteryTimeSignList: [
      {timeSign:"06.20"},
      {timeSign:"06.21"},
      {timeSign:"06.22"},
      {timeSign:"06.23"},
      {timeSign:"06.24"},
      {timeSign:"06.25"},
      {timeSign:"06.26"}
    ],
    goodSellerList: [
      {avatar:"/images/img.jpg",name:"何冬雪",company:"滨江旭辉滨旭府"},
      {avatar:"/images/img.jpg",name:"何冬雪",company:"滨江旭辉滨旭府府府"},
      {avatar:"/images/img.jpg",name:"何冬雪",company:"前湾江上湾"},
      {avatar:"/images/img.jpg",name:"何冬雪",company:"滨江旭辉滨旭府"}
    ],
    lotteryCommentList: [
      {url:"/images/img.jpg",name:"信达中心杭州壹测试测试",remark:"期开盘的华润亚奥城以及万科日耀之城,可能第一批次供货量超过两千套,亚运三兄弟住宅加起来约"},
      {url:"/images/img.jpg",name:"信达中心杭州壹",remark:"期开盘的华润亚奥城以及万科日耀之城"},
      {url:"/images/img.jpg",name:"信达中心杭州壹",remark:"期开盘的华润亚奥城"}
    ],
    schoolBuildingList: [
      {name:"信达中心杭州壹"},
      {name:"信达中心杭州壹"},
      {name:"信达中心杭州壹"},
      {name:"信达中心杭州壹"},
      {name:"信达中心杭州壹"}
    ],
    sunshineCommentList: [],
    betterBulidingList: [],
    recommendBuildingList: [],
    focusBuildingList: [],
    schoolList: ["天空之城", "御滨府", "悦东方", "天空之城"],
    sunList: ["天空之城", "御滨府", "悦东方", "天空之城"],
    currentIndex: 0,
    adList: [{
      id: 6,
      img: "https://cdn.lottery.okgoes.com/logo.png",
      title: "广告位语"
    }, {
      id: 7,
      img: "https://cdn.lottery.okgoes.com/logo.png",
      title: "广告位语"
    }, {
      id: 8,
      img: "https://cdn.lottery.okgoes.com/logo.png",
      title: "广告位语"
    }, {
      id: 7,
      img: "https://cdn.lottery.okgoes.com/logo.png",
      title: "广告位语"
    }, {
      id: 8,
      img: "https://cdn.lottery.okgoes.com/logo.png",
      title: "广告位语"
    }],
    List: [{
      id: 1,
      img: "https://cdn.lottery.okgoes.com/index/icon1.png",
      title: "每日二手",
      url: "/newhouse/myPackageA/pages/daySecond"
    }, {
      id: 2,
      img: "https://cdn.lottery.okgoes.com/index/icon2.png",
      title: "高端人才",
      url: "/newhouse/page/index/talents"
    }, {
      id: 3,
      img: "https://cdn.lottery.okgoes.com/index/icon3.png",
      title: "学区分析",
      url: "./schoolDistrict"
    }, {
      id: 4,
      img: "https://cdn.lottery.okgoes.com/icon7.png",
      title: "摇号点评",
      url: "./remark"
    }, {
      id: 5,
      img: "https://cdn.lottery.okgoes.com/icon8.png",
      title: "线下讲座",
      url: "./activityList",
      auth: !0
    }],
    schoolIndex: 0,
    sunIndex: 0,
    sartTime: [{
      name: "99",
      value: "3day",
      checked: 0
    }, {
      name: "33",
      value: "1week",
      checked: 0
    }, {
      name: "#66",
      value: "1month",
      checked: 0
    }, {
      name: "777",
      value: "6month",
      checked: 0
    }],
    // formatDate: r.formatDate,
    // getMonth: r.getMonth,
    // getFloorLevelName: r.getFloorLevelName,
    // getSaleStatus: r.getSaleStatus,
    loupan: ["优质楼盘", "刚需推荐", "关注楼盘"],
    floorIndex: 0,
    title: "map",
    longitude: "120.119137",
    latitude: "30.330416",
    markerList: [],
    markers: [],
    polygons: [{
      points: [{
        longitude: 100.789761,
        latitude: 22.022137
      }, {
        longitude: 100.789833,
        latitude: 22.022136
      }, {
        longitude: 100.790838,
        latitude: 22.019582
      }, {
        longitude: 100.794509,
        latitude: 22.020163
      }, {
        longitude: 100.792928,
        latitude: 22.022182
      }, {
        longitude: 100.789761,
        latitude: 22.022137
      }],
      fillColor: "#55888888",
      strokeColor: "#22FF00",
      strokeWidth: 2,
      zIndex: 1
    }],
    houseData: [],
    dotsStyles: {
      backgroundColor: "rgba(255,255,255,0.4)",
      selectedBackgroundColor: "#FFF",
      border: "none",
      selectedBorder: "none"
    },
    info: [
      {url:"/images/img.jpg"},
      {url:"/images/img.jpg"},
      {url:"/images/img.jpg"}
    ],
    current: 0,
    mode: "round",
    params: {
      page: 1,
      pagesize: 10
    },
    params_1: {
      page: 1,
      pagesize: 10
    },
    params_2: {
      page: 1,
      pagesize: 10
    },
    params_3: {
      page: 1,
      pagesize: 10
    },
    isBottom_1: !1,
    isBottom_2: !1,
    isBottom_3: !1,
    timeLIst: [],
    // 新增
    nav:[
      {url:"/images/img.jpg",name:"信达中心杭州壹",g2:"上城区",price:36800,m0:"即将加推",g0:"2021-03-05"},
      {url:"/images/img.jpg",name:"信达中心杭州壹",g2:"上城区",price:36800,m0:"即将加推",g0:"2021-03-05"},
      {url:"/images/img.jpg",name:"信达中心杭州壹",g2:"上城区",price:36800,m0:"即将加推",g0:"2021-03-05"},
      {url:"/images/img.jpg",name:"信达中心杭州壹",g2:"上城区",price:36800,m0:"即将加推",g0:"2021-03-05"},
    ],
    nav1:[
      {url:"/images/img.jpg",name:"信达中心杭州壹",g2:"上城区",minPrice:36800,m1:"登记",g3:"03.05-06.20"},
      {url:"/images/img.jpg",name:"信达中心杭州壹",g2:"上城区",minPrice:36800,m1:"登记",g3:"03.05-06.20"},
      {url:"/images/img.jpg",name:"信达中心杭州壹",g2:"上城区",minPrice:36800,m1:"登记",g3:"03.05-06.20"},
      {url:"/images/img.jpg",name:"信达中心杭州壹",g2:"上城区",minPrice:36800,m1:"登记",g3:"03.05-06.20"},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //即将加推
  tap_jiatoi:function(){
    wx.navigateTo({
      url: '/newhouse/home/pages/map',
    })
  },
  //即将加推详情
  jump_houseDis:function(){
    wx.navigateTo({
      url: '/newhouse/home/pages/houseDis',
    })
  },
  //优秀置业顾问列表
  tap_guwen:function(){
    wx.navigateTo({
      url: '/newhouse/page/common/counselor',
    })
  },
//摇号时刻表列表
  lotteryTime:function(){
    wx.navigateTo({
      url: '/newhouse/page/index/lotteryTime',
    })
  },
  xq:function(){
    wx.navigateTo({
      url: '/newhouse/home/pages/houseDis',
    })
  },
  lotteryCommentList:function(){
    wx.navigateTo({
      url: '/newhouse/home/pages/houseDis',
    })
  },
  //摇号详情
  tap_yaohao:function(){
    wx.navigateTo({
      url: '/newhouse/home/pages/houseDis',
    })
  },
  //详情跳转
  membershipLevel_item:function(){
    wx.navigateTo({
      url: '/newhouse/home/pages/houseDis',
    })
  },
  
  search:function(){
    wx.navigateTo({
      url: '/newhouse/page/HM-search/HM-search',
    })
  },


  tap_jump:function(dt){
    console.log(dt)
    wx.navigateTo({
      url: dt.currentTarget.dataset.url,
    })
  },
  routeTo:function(dt){
    console.log(dt)
    wx.navigateTo({
      url: dt.currentTarget.dataset.url,
    })
  },
  //摇号时刻表点击切换
  tap_table:function(dt){
    console.log(dt)
    var index = dt.currentTarget.dataset.index
    this.setData({
      currentIndex:index
    })
  },
  //学区分析切换
  tap_xuequ:function(dt){
    console.log(dt)
    var index = dt.currentTarget.dataset.index
    this.setData({
      schoolIndex:index
    })
  },
  //tap_nav
  tap_nav:function(dt){
    console.log(dt)
    var index = dt.currentTarget.dataset.index
    this.setData({
      floorIndex:index
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