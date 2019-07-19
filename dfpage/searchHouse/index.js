var e = getApp(),
  a = e.requirejs("core"),
  t = e.requirejs("wxParse/wxParse"),
  i = e.requirejs("biz/diypage"),
  o = e.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 0,
    cacheKEY: "",
    isStatic: false,
    search_input_value: '',
    searchValue: "",
    searchList: [],
    hotList: [],
    historyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    e.checkAuth();
    var t = this,
      a = wx.getSystemInfoSync();
    this.getInfo(), t.searchlog(), wx.getSetting({
      success: function(a) {
        var e = a.authSetting["scope.userInfo"];
        //console.log(t.data.objectMultiArray[1]);
        t.setData({
          anum: e,
          show: !0
        });
      }
    });
  },
  getInfo: function() {
    var e = this;
    a.get("member", {}, function(a) {
      1 == a.isblack && wx.showModal({
        title: "无法访问",
        content: "您在商城的黑名单中，无权访问！",
        success: function(a) {
          a.confirm && e.close(), a.cancel && e.close();
        }
      }), 0 != a.error ? wx.redirectTo({
        url: "/pages/message/auth/index"
      }) : e.setData({
        member: a,
        show: !0,
        iscycelbuy: a.iscycelbuy,
        bargain: a.bargain
      }), t.wxParse("wxParseData", "html", a.copyright, e, "5");
    });
  },
  searchlog: function() {
    var t = this;
    a.get("datafang/searchlog", {}, function(a) {
      1 == t.setData({
        historyList: a.listlog,
        hotList: a.listlogre
      });
    });
  },
  clearCache: function() {
    var t = this;
    a.get("datafang/deleteSearchlog", {}, function(a) {
      1 == t.setData({
        historyList: []
      });

      if (a.listlog == 'ok') {
        wx.showToast({
          title: '搜索记录清除成功!',
          duration: 3000
        })
      }
    });
  },
  delText: function() {
    var st = this;
    st.setData({
      searchValue: '',
      searchList: [],
      search_input_value: ''
    });
    st.searchlog();
  },
  searchInput: function(dt) {

    var st = this;
    var searchValue = dt.detail.value;

    if (!(/[\u4e00-\u9fa5]+/).test(searchValue)) {
      //console.log("请输入汉字");
      return;
    }
    st.setData({
      searchValue: searchValue,
      search_input_value: searchValue
    });


    switch (searchValue.length) {
      case 2:
        st.doSearchList(searchValue);
        break;
      case 3:
        st.doSearchList(searchValue);
        break;
      case 4:
        st.doSearchList(searchValue);
        break;
      case 5:
        st.doSearchList(searchValue);
      case 6:
        st.doSearchList(searchValue);
      case "end":
        break;
    }
  },
  doSearchList: function(dt) {
    var t = this;
    a.get("datafang/get_searchHouse", {
      searchValue: dt
    }, function(a) {
      1 == t.setData({
        searchList: a.list
      });
    });
  },
  goHouse: function(dt) {
    var community = dt.currentTarget.dataset.communityid;
    var t = this;
  
    a.get("datafang/addsearch", {
      id: community.id,
      ftype: community.ftype,
      title: community.title
    }, function(a) {});
    if (community.id == '') {
      return;
    }
    
    wx.navigateTo({
      url: "../community/index?cid=" + community.id
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})