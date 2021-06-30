function a(a, e, t) {
  return e in a ? Object.defineProperty(a, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[e] = t, a;
}

var e = getApp();

Page({
  data: {
    showDialog: false,
    tabIndex: "1",
    loanTypeIndex:1, //0 按贷款总额 1 按房屋总价
    loanType: ["按贷款总额", "按房屋总价"],
    loanProportion: ["3成", "3.5成", "4成", "4.5成", "5成", "5.5成", "6成", "6.5成", "7成", "7.5成", "8成", "8.5成", "9成"],
    loanProportionIndex: 0,
    loanYears: ["30年", "29年", "28年", "27年", "26年", "25年", "24年", "23年", "22年", "21年", "20年", "19年", "18年", "17年", "16年", "15年", "14年", "13年", "12年", "11年", "10年", "9年", "8年", "7年", "6年", "5年"],
    loanYearsIndex: 0,
    loanYearsIndex2: 0,
    loanRateType: ["按最新LPR利率", "按旧版基准利率"],
    loanRateTypeIndex: 0,
    oldBusinessRate: [{
      name: "基准利率9折(4.41 %)",
      val: 4.41
    }, {
      name: "基准利率95折(4.665 %)",
      val: 4.665
    }, {
      name: "基准利率(4.9 %)",
      val: 4.9
    }, {
      name: "基准利率上浮5%(5.145%)",
      val: 5.145
    }, {
      name: "基准利率上浮10 % (5.39 %)",
      val: 5.39
    }, {
      name: "基准利率上浮15 % (5.635 %)",
      val: 5.635
    }, {
      name: "基准利率上浮20 % (5.88 %)",
      val: 5.88
    }, {
      name: "基准利率上浮25 % (6.125 %)",
      val: 6.125
    }, {
      name: "基准利率上浮30 % (6.37 %)",
      val: 6.37
    }, {
      name: "基准利率上浮35 % (6.615 %)",
      val: 6.615
    }, {
      name: "基准利率上浮40 % (6.86 %)",
      val: 6.86
    }],
    oldBusinessRateSel: [2],
    publishRate: [{
      name: "基准利率(3.25%)",
      val: 3.25
    }, {
      name: "基准利率上浮10%(3.575%)",
      val: 3.575
    }, {
      name: "基准利率上浮15%(3.7375%)",
      val: 3.7375
    }, {
      name: "基准利率上浮20%(3.9%)",
      val: 3.9
    }, {
      name: "基准利率上浮25%(4.0625%)",
      val: 4.0625
    }, {
      name: "基准利率上浮30%(4.225%)",
      val: 4.225
    }],
    publishRateSel: [0],
    showLoanToast: !1,
    toastType: "1",
    LPR: 4.65,
    baseRate: 0,
    finBusiRate: 4.65,
    horcePrice: "",
    money: "",
    publicMoney: "",
    showBusinessRate: !1,
    showPublicRate: !1,
    serviceLoanInfo: null
  },
  onLoad: function (a) {
    var t = this;
    var e=a.cid;
    t = 1 - this.data.loanProportion[this.data.loanProportionIndex].slice(0, -1) / 10;
    this.setData({
      horcePrice: e,
      money: this.MathHighAccuracyComputer(e, t)
    });



    // e.checkSession(function () {
      t.getLoanInfo();
    // });
  },
  onShareAppMessage: function () {
    return n.extractShareFn({
      util: n,
      app: e
    });
  },
  tabBarClick: function (a) {
    var e = a.target.dataset.i;
    e && this.setData({
      tabIndex: e
    });
  },
  changeLPRandBase: function (e) {
    var t = e.target.dataset.o;
    this.setData(a({}, t, e.detail.value));
    var n = this.MathHighAccuracyComputer(parseFloat(this.data.LPR || 0), this.data.baseRate / 100 || 0, "Plus");
    this.setData({
      finBusiRate: n
    });
  },
  inputFocus: function (a) {
    "0" === a.detail.value && this.setData({
      baseRate: ""
    });
  },
  inputBlur: function (a) {
    a.detail.value || this.setData({
      baseRate: 0
    });
  },
  horseInput: function (a) {
    var e = a.detail.value,
      t = 1 - this.data.loanProportion[this.data.loanProportionIndex].slice(0, -1) / 10;
    this.setData({
      horcePrice: e,
      money: this.MathHighAccuracyComputer(e, t)
    });
  },
  bindPickerChange: function (a) {
    var e = void 0,
      t = {};
    switch (a.currentTarget.dataset.t) {
      case "loantype":
        e = "loanTypeIndex";
        break;

      case "loanyears":
        e = "loanYearsIndex";
        break;

      case "loanratetype":
        e = "loanRateTypeIndex";
        break;

      case "loanProportion":
        var n = 1 - this.data.loanProportion[a.detail.value].slice(0, -1) / 10;
        t.money = this.MathHighAccuracyComputer(this.data.horcePrice, n), e = "loanProportionIndex";
        break;

      case "loanyears2":
        e = "loanYearsIndex2";
    }
    t[e] = ~~a.detail.value, this.setData(t);
  },
  chanegPublicMoney: function (e) {
    var t = e.target.dataset.o,
      n = e.detail.value;
    this.setData(a({}, t, n));
  },
  reset: function () {
    console.log("this.data",this.data)
    this.setData({
      loanTypeIndex: 1,
      loanProportionIndex: 0,
      loanYearsIndex: 0,
      loanRateTypeIndex: 0,
      publicLoanRateIndex: 0,
      oldBusinessRateSel: [2],
      publishRateSel: [0],
      LPR: this.data.serviceLoanInfo.LPRLendingRate,
      baseRate: 0,
      finBusiRate: this.data.serviceLoanInfo.LPRLendingRate
    });
  },


  wxToast: function (a) {
    wx.showToast({
        icon: "none",
        title: a,
        duration: 1500
    });
  },


  toReslovePage: function (a) {
    console.log("a", a)
    var e = this.formatToast(a);
    console.log("e", e)
    if (e) return this.wxToast(e);
    var t = a.detail.value,
      i = t.businessRate,
      s = t.money,
      o = (t.horcePrice, t.publicMoney),
      l = this.data,
      r = {
        money1: 0,
        rate1: 0,
        time1: 0,
        money2: 0,
        rate2: 0,
        time2: 0
      };
    console.log("l", l)
    console.log("r", r)
    "1" !== l.tabIndex && "3" !== l.tabIndex || (r.money1 = s, r.time1 = this.data.loanYears[this.data.loanYearsIndex].slice(0, -1),
      0 === this.data.loanRateTypeIndex ? r.rate1 = i : r.rate1 = this.data.oldBusinessRate[this.data.oldBusinessRateSel[0]].val),
      "2" === l.tabIndex && (r.money1 = s, r.time1 = this.data.loanYears[this.data.loanYearsIndex].slice(0, -1),
        r.rate1 = this.data.publishRate[this.data.publishRateSel[0]].val), "3" === l.tabIndex && (r.money2 = o,
          r.time2 = this.data.loanYears[this.data.loanYearsIndex2].slice(0, -1), r.rate2 = this.data.publishRate[this.data.publishRateSel[0]].val);
    var u = this.data.serviceLoanInfo,
      d = {};
    d.pageInfo = r,
      d.serviceLoanInfo = u,
      console.log("u",u)
      console.log("d",d)
      console.log("r",r)
      r = JSON.stringify(d), wx.navigateTo({
        url: "/house/house_cal/lanalyse?pageInfo=" + r
      });
  },
  formatToast: function (a) {
    var e = this.data,
      t = a.detail.value,
      n = t.businessRate,
      i = t.money,
      s = (t.horcePrice,
        t.publicMoney);
    if ("1" === e.tabIndex || "3" === e.tabIndex) {
      if (!i) return "请输入商贷总额";
      if (i && String(i).split(".").length > 2) return "商贷总额格式不正确";
      if (0 === e.loanRateTypeIndex && 0 == n) return "请输入LPR或基点";
    }
    if ("2" === e.tabIndex) {
      if (!i) return "请输入公积金贷款总额";
      if (~~i > 140) return "公积金贷款上限140万";
      if (i && String(i).split(".").length > 2) return "公积金贷款总额格式不正确";
    }
    if ("3" === e.tabIndex) {
      if (!i) return "请输入商贷总额";
      if (!s) return "请输入公积金贷款总额";
      if (s && String(s).split(".").length > 2) return "公积金贷款总额格式不正确";
      if (~~s > 140) return "公积金贷款上限140万";
    }
    return !1;
  },
  toHelp: function () {
    var a = JSON.stringify(this.data.serviceLoanInfo);
    console.log("a", a)
    wx.navigateTo({
      url: "/house/house_cal/help?serviceLoanInfo=" + a
    });
  },
  closeLoanToast: function () {
    this.setData({
      showLoanToast: !1
    });
  },

  showOldBusinessRate: function () {
    this.setData({
      showBusinessRate: !this.data.showBusinessRate
    });
  },
  getVal_OldBusiRate: function (a) {
    this.showOldBusinessRate();
    var e = {
      oldBusinessRateSel: a.detail.sel
    };
    a.detail.addSel && (e["oldBusinessRate[" + a.detail.sel[0] + "]"] = {
      name: a.detail.addSel + "%",
      val: a.detail.addSel
    }), this.setData(e);
  },
  changeShowpublicRate: function () {
    console.log("22",22)
    this.setData({
      showPublicRate: !this.data.showPublicRate
    });
  },
  getVal_publicRate: function (a) {
    this.changeShowpublicRate();
    var e = {
      publishRateSel: a.detail.sel
    };
    a.detail.addSel && (e["publishRate[" + a.detail.sel[0] + "]"] = {
      name: a.detail.addSel + "%",
      val: a.detail.addSel
    }), this.setData(e);
  },
  getLoanInfo: function () {
    var a = this;
    (function (e) {
      a.setData({
        serviceLoanInfo: {
          LendingRate: 100 * e.LendingRate || 4.9,
          LPRLendingRate: 100 * e.LPRLendingRate || 4.65,
          FundLendingRate: 100 * e.FundLendingRate || 3.25,
          RemarksList: e.RemarksList || []
        },
        LPR: 100 * e.LPRLendingRate || 4.65,
        finBusiRate: 100 * e.LPRLendingRate || 4.65
      }), a.initRate();
    });
  },
  initRate: function () {
    this.data.serviceLoanInfo;
    this.handleBusinessRate(), this.handlePublicRate();
  },
  handleBusinessRate: function () {
    var a = this,
      e = this.data.oldBusinessRate,
      t = [.9, .95, 1, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4],
      n = this.data.serviceLoanInfo.LendingRate;
    t.forEach(function (t, i) {
      var s = a.MathHighAccuracyComputer(t, n);
      e[i].name = e[i].name.replace(/\(\d*\.?(\d*)/g, "(" + s), e[i].val = s;
    }), this.setData({
      oldBusinessRate: e
    });
  },
  handlePublicRate: function () {
    var a = this,
      e = this.data.publishRate,
      t = [1, 1.1, 1.15, 1.2, 1.25, 1.3],
      n = this.data.serviceLoanInfo.FundLendingRate;
    t.forEach(function (t, i) {
      var s = a.MathHighAccuracyComputer(t, n);
      e[i].name = e[i].name.replace(/\(\d*\.?(\d*)/g, "(" + s), e[i].val = s;
    }), this.setData({
      publishRate: e
    });
  },
  MathHighAccuracyComputer: function (a, e) {
    var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Multiply",
      n = String(a).split(/\./),
      i = n[1] && n[1].length || 0,
      s = String(e).split(/\./),
      o = s[1] && s[1].length || 0;
    if ("Multiply" === t) return String(a).replace(".", "") * String(e).replace(".", "") / Math.pow(10, i + o);
    if ("Plus" === t) {
      var l = Math.max(i, o);
      return (Number(String(a).replace(".", "")) * (l === i ? 1 : Math.pow(10, l - i)) + Number(String(e).replace(".", "")) * (l === o ? 1 : Math.pow(10, l - o))) / Math.pow(10, l);
    }
  },
  showToast: function (e) {
    console.log("2222", e)
    var e = e.currentTarget.dataset.i;
    console.log("22221", e)
    this.setData({
      showLoanToast: !0,
      toastType: e
    });
  },
});