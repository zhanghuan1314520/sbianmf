// newhouse/page/common/area.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        h: [0, 0, 0, 0],
        show: !1,
        priceShow: !1,
        sizeShow: !1,
        devShow: !1,
        titleData: ["区域", "价格", "面积", "开发商"],
        isdown: null,
        active: 0,
        p_active: 0,
        actives: 0,
        p_actives: 0,
        activess: 0,
        area: [],
        region: [
            {name:"萧山区"}
        ],
        regionData: [
            {name:"滨江区政府"}
        ],
        price:[
            {name:"单价"}
        ],
        ids: [],
        unitPrice: [],
        totalPrice: [],
        regionPrice: [
            {name:"10000-2000元"}
        ],
        size: [{
            name: "50㎡以下",
            id: 1,
            checked: !1
        }, {
            name: "50㎡以下",
            id: 2,
            checked: !1
        }, {
            name: "50㎡以下",
            id: 3,
            checked: !1
        }, {
            name: "50㎡以下",
            id: 4,
            checked: !1
        }],
        developer: [],
        form: {
            areaId: 0,
            developerId: 0,
            hourseAreaId: 0,
            keyword: "",
            matchId: 0,
            tabName: "",
            page: 1,
            pagesize: 10,
            priceRangeId: 0
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    // tap_selet:function(t){
        // console.log(t)
        // var i = t.currentTarget.dataset.index
        // this.setData({
        //     isdown:i
        // })
        tap_selet: function(i, t, s) {
            this.isdown = null;
            this.pageScrollTo({
                scrollTop: i.target.offsetTop - this.topDistance - 10,
                duration: 500
            }), 0 == s ? (this.priceShow = !1, this.sizeShow = !1, this.devShow = !1, this.show = !this.show, 
            this.show && (this.isdown = s), this.region = this.area[0].children, this.regionData = this.region[0].children || []) : 1 == s ? (this.show = !1, 
            this.sizeShow = !1, this.devShow = !1, this.priceShow = !this.priceShow, this.priceShow && (this.isdown = s), 
            this.regionPrice = this.price[0].children || []) : 2 == s ? (this.show = !1, this.priceShow = !1, 
            this.devShow = !1, this.sizeShow = !this.sizeShow, this.sizeShow && (this.isdown = s)) : 3 == s && (this.show = !1, 
            this.priceShow = !1, this.sizeShow = !1, this.devShow = !this.devShow, this.devShow && (this.isdown = s));
        },
    // },
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