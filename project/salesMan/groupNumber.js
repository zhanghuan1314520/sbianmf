// dfpage/salesMan/groupNumber.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    ,
       imgYu: function (event) {
        //var src = event.currentTarget.dataset.src;//获取data-src
        //var imgList = event.currentTarget.dataset.list;//获取data-list
        var src = "https://sbmf.ww2ss.com/dfimages/logo.jpg";
        var imgArr = [];
        imgArr[0] = "https://sbmf.ww2ss.com/dfimages/logo.jpg";
        //图片预览
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: imgArr // 需要预览的图片http链接列表
        })
    },
    copyText: function (e) {
        wx.setClipboardData({
            data: e.currentTarget.dataset.text,
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        setTimeout(function () {
                            // 获取 chart 实例的方式
                            a.alert("客服微信号已复制,去添加好友加群！");
                        }, 100);

                    }
                })
            }
        })
    },
})