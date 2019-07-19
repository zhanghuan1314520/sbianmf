// dfpage/market/index.js
/**
var a, e, i = getApp(),
  s = i.requirejs("core"),
  n = i.requirejs("wxParse/wxParse"),
  o = i.requirejs("biz/diypage"),
  r = i.requirejs("biz/diyform"),
  d = i.requirejs("biz/goodspicker"),
  c = (i.requirejs("foxui"),
    i.requirejs("jquery"));
***/
var e = getApp(),
  a = e.requirejs("core"),
  t = e.requirejs("wxParse/wxParse"),
  i = e.requirejs("biz/diypage"),
  o = e.requirejs("jquery");
var qthat;
var qlist = [];
Page({
  /**
   * 页面的初始数据 
   */

  data: { 
    datalist: [],
    upage: 1,
    loadMessage: '查看更多...',
    sdate: '2019-06-01',
    edate: '2019-07-31',
    qyname:'全部',
    bkname:'全部',
    route: "member",
    member: {}, 
    multiIndex: [],  
    multiArray: [],
    objectMultiArray:[],
    islogin:'no' 
  },
  bindMultiPickerChange: function(dt) {    
    var st = this;
    if (st.data.islogin == 'no') {
      wx.showToast({
        title: 'vip会员才能查看!',
        duration: 3000
      })
      wx.navigateTo({
        url: "../../pages/member/membercard/index"
      });
    }else{
      qthat.setData({
        "multiIndex[0]": dt.detail.value[0],
        "multiIndex[1]": dt.detail.value[1]
      })
      st.setData({
        qyname: st.data.multiArray[0][dt.detail.value[0]],
        bkname: st.data.multiArray[1][dt.detail.value[1]],
        upage: 1,
        datalist: []
      });
      st.get_uupirceList();
    }  
  },
  bindMultiPickerColumnChange: function(e) {
    switch (e.detail.column) {
      case 0:
        qlist = []
        for (var i = 0; i < qthat.data.objectMultiArray.length; i++) {
          if (qthat.data.objectMultiArray[i].parid == qthat.data.objectMultiArray[e.detail.value].regid) {
            qlist.push(qthat.data.objectMultiArray[i].regname)
          }
        }        
        qthat.setData({
          "multiArray[1]": qlist,
          "multiIndex[0]": e.detail.value,
          "multiIndex[1]": 0
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(t) {
    t = t || {};
    var d = this;
    e.checkAuth(), this.setData({
      options: d,
      sdate: d.getDay(-3),
      edate: d.getDay(0)
    });
    //获取区域、板块联动
    qthat = this;    
    a.get("datafang/get_business", {}, function (e) {        
      qthat.setData({
        multiArray: e.multiArray,
        objectMultiArray: e.objectMultiArray,
        "multiArray[1]": e.multiArray[1],
        "multiIndex[0]": 0,
        "multiIndex[1]": 0 
      });     
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    e.checkAuth();
    var t = this,
      a = wx.getSystemInfoSync();

    this.getInfo(), t.get_datafang(), t.get_uupirceList(), wx.getSetting({
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
      //console.log(a);
      //console.log(a.levelname);
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
 
  get_datafang: function() {
    var t = this;
    a.get("datafang/get_uupirce", {}, function(a) {
      1 == t.setData({
        upacount: a.upacount,
        unasale: a.unasale,
        upxcount: a.upxcount,
        upscount: a.upscount,
        upjunxprice: a.upjunxprice,
        upjunsprice: a.upjunsprice,
        islogin: a.islogin        
      });
    });
  },
  get_uupirceList: function() {
    var t = this;
    a.get("datafang/get_uupirceList", {
      upage: t.data.upage,
      sdate: t.data.sdate,
      edate: t.data.edate,
      qyname: t.data.qyname,
      bkname: t.data.bkname
    }, function(a) {
      if (a.datalist.length < 1) {
        wx.showToast({
          title: '到底，没有数据了！'
        })
        return; 
      }
      //处理往上拉，加载数据
      var data1 = t.data.datalist;
      if (data1 == null) {
        t.setData({
          datalist: a.datalist          
        });
        return;
      }
      for (var i = 0; i < a.datalist.length; i++) {
        data1.push(a.datalist[i]);
      } 
      t.setData({
        datalist: data1,
        upage: a.upage,
        upday:a.upday,
        upcount: a.upcount,
        upmax: a.upmax,
        upmin: a.upmin
      });
    });
  },
  //跳转到楼盘页 
  goHouse: function goHouse(item) {         
    var cid = item.currentTarget.dataset.cid.cid;
    if(cid==''){
      return;
    }
    wx.navigateTo({
      url: "../house/house?cid=" + cid
    });
  },
  dealMore: function goHouse(item) {
    console.log(item);
    var cid = item.currentTarget.dataset.cid.cid;
    if (cid == '') {
      return;
    }
    wx.navigateTo({
      url: "../dealog/index?cid=" + cid
    });
  },
  getDateTimes: function(dt) {
    var st=this;     
    if (st.data.islogin == 'no') {
      wx.showToast({
        title: 'vip会员才能查看!',
        duration: 3000
      })
      wx.navigateTo({
        url: "../../pages/member/membercard/index"
      });
    }else{   
      if (dt.detail.value>st.data.edate){
        wx.showToast({
          title: '日期错了!',
          duration: 3000
        })
        return;
      }
      st.setData({
        sdate: dt.detail.value,
        upage: 1,
        datalist: []
      });
      st.get_uupirceList();
    }

  }, getDateTimee: function (dt) {
    var st = this;
    if (st.data.islogin == 'no') {
      wx.showToast({
        title: 'vip会员才能查看!',
        duration: 3000
      })
      wx.navigateTo({
        url: "../../pages/member/membercard/index"
      });
    }else{     
      if (dt.detail.value<st.data.sdate) {
        wx.showToast({
          title: '日期错了!',
          duration: 3000
        })
        return;
      }
      st.setData({
        edate: dt.detail.value,
        upage:1,
        datalist: []
      });
      
      st.get_uupirceList();
    }
  },
  getDay: function(day) {
    var t = this;
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = t.doHandleMonth(tMonth + 1);
    tDate = t.doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
  },
  doHandleMonth: function(month) {
    var m = month;
    if (month.toString().length == 1) {
      m = "0" + month;
    }
    return m;
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
    wx.showNavigationBarLoading();
    var a = this;
    a.get_datafang()
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showLoading({
      title: '玩命加载中',
    })
    var t = this;
    t.get_uupirceList();
    wx.hideLoading();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})