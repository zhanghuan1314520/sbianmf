// newhouse/page/houses/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topDistance: 0,
        loupan: ["现房销售", "新盘首开", "闭眼摇"],
        floorIndex: 0,
        tagIndex: 0,
        houseData: [],
        tagList: [
            {name:"全部"},
            {name:"地铁房"},
            {name:"综合体"},
            {name:"学区规划"},
            {name:"3.5万以下"},
            {name:"非无房可参与"},
            {name:"红盘"},
            {name:"倒挂"}
        ],
        noData: "",
        params: {
            areaId: 0,
            developerId: 0,
            hourseAreaId: 0,
            keyword: "",
            matchId: 0,
            tabName: "",
            page: 1,
            pagesize: 10,
            priceRangeId: 0
        },
        existingHouseList: [],
        newSaleHouseList: [],
        closeEyeHouseList: [],
        isBootom: !1,
        placeholderList: [""],
        nav:[
            {url:"/images/img.jpg",g0:"西湖",name:'信达中心杭州壹',f0:5800},
            {url:"/images/img.jpg",g0:"西湖",name:'信达中心杭州壹',f0:5800},
            {url:"/images/img.jpg",g0:"西湖",name:'信达中心杭州壹',f0:5800},
            {url:"/images/img.jpg",g0:"西湖",name:'信达中心杭州壹',f0:5800}
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    single:function(){
        wx.navigateTo({
          url: '/newhouse/home/pages/houseDis',
        })
    },

    //顶部切换
    tap_nav:function(dt){
        console.log(dt)
        var index = dt.currentTarget.dataset.index
        this.setData({
          floorIndex:index
        })
      },
    //标签切换 
      tap_tag:function(dt){
        console.log(dt)
        var index = dt.currentTarget.dataset.index
        this.setData({
            tagIndex:index
        })
      },
      ac:function(e){
console.log(e)
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