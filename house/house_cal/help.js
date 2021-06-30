var a = getApp();

Page({
    data: {
        // navH: a.globalData.navH
        serviceLoanInfo:""
    },
    onLoad: function(a) {
        console.log("aaa",a)
        var n = JSON.parse(a.serviceLoanInfo);
        this.setData({
            serviceLoanInfo: n
        });
    },
    back: function() {
        wx.navigateBack();
    }
});