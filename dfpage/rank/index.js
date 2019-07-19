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
    deallist: [],
    rankSwitch: '',
    islogin: 'no',
    limits: !0,
    currentTab: 0,
    sendList: [],
    tabs: [{
      title: "套数",
      group: "House",
      orderby: "d_cnt",
      content: ""
    }, {
      title: "学区",
      group: "House",
      orderby: "s_area",
      content: ""
    }, {
      title: "均价",
      group: "House",
      orderby: "s_tprice",
      content: ""
    }, {
      title: "库存",
      group: "TPrice",
      orderby: "d_cnt",
      content: ""
    }, {
      title: "需求",
      group: "Area",
      orderby: "d_cnt",
      content: ""
    }, {
      title: "区域",
      group: "District",
      orderby: "d_cnt",
      content: ""
    }, {
      title: "板块",
      group: "Plate",
      orderby: "d_cnt",
      content: ""
    }],
    params: {
      s_date: "",
      e_date: "",
      house_type_ids: "100,200",
      order_desc: "desc",
      topnum: 20
    },
    ArrayColumnList: [{
      //套数列
      columnList: [{
        label: "排行",
        width: 60,
        render: function render(value, index) {
          console.log();
        }
      }, {
        label: "楼盘",
        value: "n",
        width: 200,
        showOverflowTooltip: true
      }, {
        label: "区域",
        value: "district_name",
        width: 170,
        showOverflowTooltip: true
      }, {
        label: "套数",
        value: "d_cnt",
        width: 120
      }, {
        label: "成交金额",
        subLabel: "(万元)",
        value: "s_tprice",
        width: 120
      }, {
        label: "均价",
        subLabel: "(元/㎡)",
        value: "d_cnt",
        width: 120
      }]
    }, {
      //学区列
      columnList: [{
        label: "排行",
        width: 60,
        render: function render(value, index) {
          console.log();
        }
      }, {
        label: "重点学区",
        value: "n",
        width: 200,
        showOverflowTooltip: true
      }, {
        label: "区域",
        value: "district_name",
        width: 170,
        showOverflowTooltip: true
      }, {
        label: "套数",
        value: "d_cnt",
        width: 120
      }, {
        label: "成交金额",
        subLabel: "(万元)",
        value: "s_tprice",
        width: 120
      }, {
        label: "均价",
        subLabel: "(元/㎡)",
        value: "d_cnt",
        width: 120
      }]
    }, {
      //均价列
      columnList: [{
        label: "排行",
        width: 60,
        render: function render(value, index) {
          console.log();
        }
      }, {
        label: "楼盘",
        value: "n",
        width: 200,
        showOverflowTooltip: true
      }, {
        label: "区域",
        value: "district_name",
        width: 170,
        showOverflowTooltip: true
      }, {
        label: "套数",
        value: "d_cnt",
        width: 120
      }, {
        label: "成交金额",
        subLabel: "(万元)",
        value: "s_tprice",
        width: 120
      }, {
        label: "均价",
        subLabel: "(元/㎡)",
        value: "d_cnt",
        width: 120
      }]
    }, {
      //库存
      columnList: [{
        label: "排行",
        width: 60
      }, {
        label: "区域",
        value: "n",
        width: 200,
        showOverflowTooltip: true
      }, {
        label: "挂牌套数",
        value: "d_cnt",
        width: 120
      }, {
        label: "挂牌均价",
        subLabel: "(元/㎡)",
        value: "avg_price",
        width: 120
        }, {
          label: "总金额",
          subLabel: "(亿元)",
          value: "s_tprice",
          width: 120
        }, {
        label: "挂牌面积",
        subLabel: "(万㎡)",
        value: "s_area",
        width: 120
      }]
    }, {
      //带看
      columnList: [{
        label: "排行",
        width: 60
      }, { 
        label: "楼盘",
        value: "n",
        width: 200,
        showOverflowTooltip: true
      }, {
        label: "带看",
        value: "d_cnt",
        width: 120
      }, {
        label: "均价",
        subLabel: "(万元)",
        value: "s_tprice",
        width: 120
      }, {
        label: "套均面积",
        subLabel: "(㎡)",
        value: "avg_price",
        width: 120
      }, {
        label: "套均总价",
        subLabel: "(万元)",
        value: "s_area",
        width: 120
      }]
    }, {
      //区域成交
      columnList: [{
        label: "排行",
        width: 60
      }, {
        label: "区域",
        value: "n",
        width: 200,
        showOverflowTooltip: true
      }, {
        label: "成交套数",
        value: "d_cnt",
        width: 120
      }, {
        label: "成交金额",
        subLabel: "(万元)",
        value: "s_tprice",
        width: 120
      }, {
        label: "成交均价",
        subLabel: "(元/㎡)",
        value: "avg_price",
        width: 120
      }, {
        label: "成交面积",
        subLabel: "(㎡)",
        value: "s_area",
        width: 120
      }]
    }, {
      //板块成交
      columnList: [{
        label: "排行",
        width: 60
      }, {
        label: "板块",
        value: "n",
        width: 200,
        showOverflowTooltip: true
      }, {
        label: "成交套数",
        value: "d_cnt",
        width: 120
      }, {
        label: "成交金额",
        subLabel: "(万元)",
        value: "s_tprice",
        width: 120
      }, {
        label: "成交均价",
        subLabel: "(元/㎡)",
        value: "avg_price",
        width: 120
      }, {
        label: "成交面积",
        subLabel: "(㎡)",
        value: "s_area",
        width: 120
      }]
    }],
    //暂时没用---区域板块环线价格段面积段的详细楼盘列
    subColumnList: [{
      label: "排行",
      width: 60
    }, {
      label: "楼盘",
      value: "n",
      showOverflowTooltip: true,
      //超出范围隐藏
      width: 200
    }, {
      label: "区域",
      value: "district_name",
      showOverflowTooltip: true,
      //超出范围隐藏
      width: 170
    }, {
      label: "板块",
      value: "plate_name",
      showOverflowTooltip: true,
      //超出范围隐藏
      width: 170
    }, {
      label: "成交套数",
      value: "d_cnt",
      width: 120
    }, {
      label: "成交面积",
      subLabel: "(㎡)",
      value: "s_area",
      isShow: true,
      width: 120
    }, {
      label: "成交均价",
      subLabel: "(元/㎡)",
      value: "avg_price",
      width: 120
    }, {
      label: "成交金额",
      subLabel: "(万元)",
      value: "s_tprice",
      width: 120
    }],
    rankList: [],
    sdate: '2019-06-01',
    edate: '2019-07-31',
    onswitch: 0,
    islogin: 'no',
    show: 0

  },

  onClick: function(dt) {
    var st = this;
    var onswitch = dt.detail.key;
    
    st.setData({
      rankList: st.data.ArrayColumnList[onswitch].columnList,
      deallist: [],      
      onswitch: onswitch,
      show: 0
    });
    /***
    switch (onswitch) {
      case 0:
        console.log("套数");
        break;
      case 1:
        console.log("学区");
        break;
      case 2:
        console.log("均价");
        break;
      case 3:
        console.log("库存");
        break;
      case 4:
        console.log("带看");
        break;
      case 5:
        console.log("区域");
        break;
      case 6:
        console.log("板块");
        break;
    }***/
    st.listSwitch();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var st = this;
    st.setData({
      sdate: st.getDay(-15),
      edate: st.getDay(0),
      show: 0
    })
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
    this.getInfo(), t.listSwitch(), wx.getSetting({
      success: function(a) {
        var e = a.authSetting["scope.userInfo"];
        t.setData({
          anum: e,
          show: !0
        });
      }
    });
  },
  listSwitch: function() {
    var t = this;
    t.setData({
      rankList: t.data.ArrayColumnList[t.data.onswitch].columnList
    });

    a.get("datafang/islogin", {}, function(dt) {
      t.setData({
        islogin: dt.islogin
      })
    });


    a.get("datafang/get_rankSwitch", {
      sdate: t.data.sdate,
      edate: t.data.edate,
      onswitch: t.data.onswitch
    }, function(a) {
      if (a.islogin == 'no') {
        wx.showToast({
          title: 'vip会员才能查看!',
          duration: 3000
        })
        wx.navigateTo({
          url: "../../pages/member/membercard/index"
        });
      } else {
        1 == t.setData({
          deallist: a.list,
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
  getDateTimes: function(dt) {
    var st = this;
    if (st.data.islogin == 'no') {
      wx.showToast({
        title: 'vip会员才能查看!',
        duration: 3000
      })
      wx.navigateTo({
        url: "../../pages/member/membercard/index"
      });
    } else {
      if (dt.detail.value > st.data.edate) {
        wx.showToast({
          title: '日期错了!',
          duration: 3000
        })
        return;
      }
      st.setData({
        sdate: dt.detail.value,
        rankList: [],
        show: 0
      });
      st.listSwitch();
    }

  },
  getDateTimee: function(dt) {
    var st = this;
    if (st.data.islogin == 'no') {
      wx.showToast({
        title: 'vip会员才能查看!',
        duration: 3000
      })
      wx.navigateTo({
        url: "../../pages/member/membercard/index"
      });
    } else {
      if (dt.detail.value < st.data.sdate) {
        wx.showToast({
          title: '日期错了!',
          duration: 3000
        })
        return;
      }
      st.setData({
        edate: dt.detail.value,
        rankList: [],
        show: 0
      });

      st.listSwitch();
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  goCommunity: function goPage(dt) {
    var cid = dt.currentTarget.dataset.cid;
    if (cid == '') {
      return;
    }
    var st=this;
    //console.log(st.data.onswitch);
    if (st.data.onswitch == 0 || st.data.onswitch == 2 || st.data.onswitch == 4){ 
      wx.navigateTo({
        url: "../community/index?cid=" + cid
      });
    }else{
      return;
    }
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