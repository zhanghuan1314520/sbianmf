var e = function(e) {
    return e < 10 ? "0" + e : e;
}, t = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3, n = new Date(), a = e.getMonth() + 1, i = e.getDate();
    return n.getMonth() - e.getMonth() > 0 ? r(a) - i + n.getDate() > t : n.getDate() - i > t;
}, r = function(e) {
    switch (e = e || new Date().getMonth + 1) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return 31;

      case 4:
      case 5:
      case 6:
      case 9:
      case 11:
        return 30;

      case 2:
        return n() ? 29 : 28;
    }
}, n = function(e) {
    return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
};

module.exports = {
    formatQuestionCreateTime: function(e) {
        var t = e, r = new Date().getTime();
        return (e = new Date(e).getTime()) >= r - 36e5 && (t = (t = Math.floor((r - e) / 6e4)) <= 0 ? 1 : t, 
        t += "分钟前"), e < r - 36e5 && e >= r - 864e5 && (t = Math.floor((r - e) / 36e5) + "小时前"), 
        e < r - 864e5 && e >= r - 2592e5 && (t = Math.floor((r - e) / 864e5) + "天前"), t;
    },
    formatRegisterTimeInDetail: function(e) {
        return "string" != typeof e ? "" : e.substr(0, 16).replace(/-/g, ".");
    },
    formatPreSaleTime: function(e) {
        return e ? e.substr(5, 2) + "月" : "";
    },
    formatTimeToTill: function(n) {
        var a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1] ? new Date(n) : new Date(n.replace(/-/g, "/")), i = new Date(), o = a.getFullYear(), s = a.getMonth() + 1, c = a.getDate(), u = (i - a) / 1e3;
        if (u < 60) return "刚刚";
        if (i.getFullYear() !== o) return o + "." + e(s) + "." + e(c);
        if (t(a)) return e(s) + "." + e(c);
        if (u / 60 / 60 / 24 >= 1) return (i.getMonth() + 1 == s ? i.getDate() - c : r(s) - c + i.getDate()) + "天前";
        return u / 60 < 60 ? parseInt(u / 60) + "分钟前" : parseInt(u / 3600) + "小时前";
    },
    fixPrefixion: e,
    getMaxDate: r,
    formatMessageTime: function(e) {
        if (!e) return "";
        var t = e.replace(/-/g, "/"), n = new Date(), a = n.getFullYear(), i = n.getMonth() + 1, o = n.getDate(), s = new Date(t), c = s.getFullYear(), u = s.getMonth() + 1, g = s.getDate(), l = o - g;
        return a == c ? o == g && i == u ? e.slice(11, 16) : o != g ? i == u ? 1 == l ? "昨天" + e.slice(11, 16) : e.slice(5, 16) : r(u) + o - g < 2 ? "昨天" + e.slice(11, 16) : e.slice(5, 16) : e.slice(5, 16) : e.slice(0, -3);
    }
};