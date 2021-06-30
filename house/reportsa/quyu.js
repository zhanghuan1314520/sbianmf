// house/market/index.js
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
        sdate: '开始日期',
        edate: '结束日期',
        qyname: '全部',
        bkname: '全部',
        route: "member",
        member: {},
        multiIndex: [],
        multiArray: [],
        objectMultiArray: [],
        islogin: 'no',
        fid: '',
        mid: 0,
        list_param: 1,
        city_id: 2,
        list: [],
        lazyLoad: !0,
        hidden: !0,
        tabTxt: [],
        tab: [!0, !0, !0, !0],
        filterMask: !0,
        search: !1,
        quYuBar2: 0,
        quYuBar3: 0,
        quYuBxBar2: "",
        quYuBxBar3: "",
        loadbarid: 0,
        quyuNav2: !1,
        quyuNav3: !0,
        filterArea: [],
        filterArea2: [],
        subCur: 0,
        filterPrices: [],
        priceData: "",
        inpVal: null,
        filterFxing: [],
        fxingData: [],
        pricesData: [],
        timeData: [],
        moreTag: [],
        moreCurName: "",
        moreCurName1: "",
        moreselected: [],
        tagData: [],
        total_page: 0,
        page_num: 1,
        listLock: 1,
        listHidden: !1,
        houseNo: !0,
        showAllData: !0,
        sortbtn: !1,
        sortcon: !0,
        sortData: [],
        longitude: 0,
        latitude: 0,
        speed: 0,
        accuracy: 0,
        searchCon: "请输入板块名、楼盘名",
        postParam: {},
        loadinghide: !0,
        countLock: 1,
        loadingCount: !0,
        dingwei: "",
        datalista: [],
        datalistall: [],
        xuequid: "",
        xuequname: "",
        barid: "",
        searchParam: {},
        diytitle:'',
        loaded:!0,
        total:0,

    },
    touchStart: function (e) {

        if (e.touches.length == 1) {
            this.setData({
                startX: e.touches[0].clientX
            });

            var moveLeft = 'box-shadow:5px 0px 10px #888888;z-index:1;';
            this.setData({
                moveLeft: moveLeft
            });
        }
    },
    touchMove: function (e) {
        if (e.touches.length == 1) {
            var moveX = e.touches[0].clientX;
            var diffX = this.data.startX - moveX;
            var moveLeft = '';
            if (diffX < 0) { //向右                
                moveLeft = 'box-shadow: 5px 0px 10px #888888;z-index:1;';
            } else if (diffX > 0) { //向左                
                moveLeft = 'box-shadow:5px 0px 10px #888888;z-index:1;';
            } else {
                moveLeft = '';
            }

            this.setData({
                moveLeft: moveLeft
            });
        }
    },
    touchEnd: function (e) {
        if (e.changedTouches.length == 1) {
            var endX = e.changedTouches[0].clientX;
            var diffX = this.data.startX - endX;

            var moveLeft = '';
            this.setData({
                moveLeft: moveLeft
            });

        }
    },

  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (dt) {

        console.log(dt)

        dt = dt || {};
        var d = this;
        d.data.searchParam.ftype = dt.ftype, d.data.searchParam.searchValue = dt.searchValue, d.data.searchParam.id = dt.xuequid;
        d.data.searchParam.title = dt.districtid
        d.data.searchParam.districtid = dt.districtid
        this.setData({
            options: d,
            mid: dt.mid,
            searchParam: d.data.searchParam
        });
        
         //分享锁粉
       
         var et = decodeURIComponent(dt.scene);
         if (!dt.id && et) {
             var n = a.str2Obj(et); //str2Obj --> e.requirejs("core"),
             dt.id = n.id, n.mid && (dt.mid = n.mid, e.setCache("usermid", n)); // setCache--> e = getApp()
         }   //        

        //接收搜索页参数

        var t = this,
            e = [];
        var dc = t.data.searchParam;
        console.log("测试接收：",dc);
        if ((wx.setNavigationBarTitle({
                title: "手边买房-杭州成交报告"
            }), e = [{
                name: "区域",
                navselected: !1
            }, {
                name: "时间",
                navselected: !1
            }, {
                name: "金额",
                navselected: !1
            }, {
                name: "面积",
                navselected: !1
            }]), t.setData({
                list_param: 1,
                tabTxt: e,
                city_id: 2,
                nameCur2: "不限",
                nameCur1: "区域",
                quYuBar2: 11,
                quYuBxBar2: 11
            }), console.log("listParam进入二手房", t.data.list_param), t.getQuYuData(0), t.filterTimeData(), t.filterPricesData(),
            t.filterFxingData(), t.filtermoreData(), t.sortConData()) { // 
            t.setData({
                searchCon: dc.title,
                tabTxt: t.data.tabTxt
            });
        } else {

            console.log(1111)

            if (dc) {
                if (dc.ftype == 1) { //搜索区域                  
                    t.data.postParam.keywords = "", t.data.postParam.districtid = dc.title,
                        t.data.postParam.sqid = "", t.data.postParam.lineid = "", t.data.postParam.stationid = "",
                        t.data.postParam.nearby = "", t.data.postParam.location = "", t.data.postParam.conmmunityid = "", t.data.postParam.xuequid = "";
                    t.data.tabTxt[0].newname = dc.title;
                    t.setData({
                        tabTxt: t.data.tabTxt,
                        postParam: t.data.postParam,
                        page_num: 1,
                        datalist: [],
                  
                        show: !1
                    });
                    t.filterData(t.data.postParam);

                } else if (dc.ftype == 2) { //搜索板块
                    t.data.postParam.keywords = "", t.data.postParam.districtid = "",
                        t.data.postParam.sqid = dc.title, t.data.postParam.lineid = "", t.data.postParam.stationid = "",
                        t.data.postParam.nearby = "", t.data.postParam.location = "", t.data.postParam.conmmunityid = "", t.data.postParam.xuequid = "";
                    t.data.tabTxt[0].newname = dc.title;
                    t.setData({
                        tabTxt: t.data.tabTxt,
                        postParam: t.data.postParam,
                        page_num: 1,
                        datalist: [],
          
                        show: !1
                    });
                    t.filterData(t.data.postParam);
                } else if (dc.ftype == 5) { //搜索板块
                    t.data.postParam.keywords = "", t.data.postParam.districtid = "",
                        t.data.postParam.sqid = dc.title, t.data.postParam.lineid = "", t.data.postParam.stationid = "",
                        t.data.postParam.nearby = "", t.data.postParam.location = "", t.data.postParam.conmmunityid = "", t.data.postParam.xuequid = dc.id, t.data.postParam.xuequname = dc.searchValue;
                    t.data.tabTxt[0].newname = dc.title;
                    t.setData({
                        tabTxt: t.data.tabTxt,
                        postParam: t.data.postParam,
                        page_num: 1,
                        datalist: [],
            
                        show: !1
                    });
                    t.filterData(t.data.postParam);
                } else { //搜索小区
                    t.data.postParam.keywords = "", t.data.postParam.districtid = "",
                        t.data.postParam.sqid = "", t.data.postParam.lineid = "", t.data.postParam.stationid = "",
                        t.data.postParam.nearby = "", t.data.postParam.location = "", t.data.postParam.conmmunityid = dc.id, t.data.postParam.xuequid = "";

                    t.setData({
                        searchCon: dc.title,
                        tabTxt: t.data.tabTxt,
                        postParam: t.data.postParam,
                        page_num: 1,
                        datalist: [],
            
                        show: !1
                    });

                    t.filterData(t.data.postParam);
                }
            } else {
                t.setData({
                    page_num: 1,
                    datalist: [],
         
                    show: !1
                })
                t.getData("");
            }
            wx.getLocation({
                type: "gcj02",
                altitude: !0,
                success: function (a) {
                    t.data.dingwei = 1, t.data.latitude = a.latitude, t.data.longitude = a.longitude,
                        t.data.speed = a.speed, t.data.accuracy = a.accuracy;
                },
                fail: function () {
                    t.data.dingwei = 2;
                },
                complete: function () {}
            });
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

        e.checkAuth();
        var t = this,
            a = wx.getSystemInfoSync();

        this.getInfo(), wx.getSetting({
            success: function (a) {
                var e = a.authSetting["scope.userInfo"];
                //console.log(t.data.objectMultiArray[1]);
                t.setData({
                    anum: e,
                });
            }
        });




    },
    getInfo: function () {
        var e = this;
        a.get("member", {
            mid: this.data.mid
        }, function (dt) {
            //console.log(dt);
            if (dt.needbind == 1) {                
                wx.redirectTo({
                    url: "/pages/member/bind/index"
                })               
                
            }

            1 == dt.isblack && wx.showModal({
                title: "无法访问",
                content: "系统升级中，不能访问！",
                success: function (a) {
                    a.confirm && e.close(), a.cancel && e.close();
                }
            }), e.setData({
                member: dt,
               // show: !0,
                iscycelbuy: dt.iscycelbuy,
                bargain: dt.bargain
            }), t.wxParse("wxParseData", "html", dt.copyright, e, "5");


        });

    },
 
 
    getDateTimes: function (dt) {
        var st = this;
        st.setData({
            sdate: dt.detail.value,
            maxTime: dt.detail.value,
            timeCurName: ""
        });
    },
    getDateTimee: function (dt) {
        var st = this;
        st.setData({
            edate: dt.detail.value,
            minTime: dt.detail.value,
            timeCurName: ""
        });

    },
    getDay: function (day) {
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
    //清除搜索楼盘
    delText: function () {
        var t = this;
        t.data.tabTxt[0].newname = "", t.data.tabTxt[1].newname = "", t.data.tabTxt[2].newname = "", t.data.tabTxt[3].newname = "", t.data.postParam.price = "", t.data.priceData = "", t.data.postParam.keywords = "", t.data.postParam.conmmunityid = "", t.data.postParam.districtid = "", t.data.postParam.sqid = "", t.data.postParam.buildage = "", t.data.postParam.xuequid = "", getApp().globalData.dtsearch = "";


        for (var e in t.data.moreData) {
            for (var d in t.data.moreData[e]) t.data.moreData[e][d].selected = !1;
            t.data.postParam[e] = "";
        }
        for (var d in t.data.tagData) t.data.tagData[d].selected = !1;
        t.data.postParam.tag = "";
        for (var d in t.data.moreData.buildage) t.data.moreData.buildage[d].selected = !1;

        t.setData({
            priceCurName: "",
            tabTxt: t.data.tabTxt,
            filnav: "",
            inpVal: "",
            minPrice: "",
            maxPrice: "",
            minTime: "",
            maxTime: "",
            valPrice: "",
            searchCon: '请输入板块名、楼盘名',
            postParam: t.data.postParam,
            moreData: t.data.moreData,
            moreTag: t.data.tagData,
            moreCurName: "",
            filnav: "",
            moreselected: [],
            page_num: 1,
            datalist: [],
       
            fxname: "",
            show: !1
        });

        for (var e in t.data.fxingData) t.data.fxingData[e].selected = !1;
        t.setData({
            filterFxing: t.data.fxingData
        }), t.data.postParam.broom = "";

        t.filterData(t.data.postParam);

    },
    doHandleMonth: function (month) {
        var m = month;
        if (month.toString().length == 1) {
            m = "0" + month;
        }
        return m;
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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
        wx.showNavigationBarLoading();
        var a = this;
      //  a.get_datafang()
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var that = this;

        console.log(that.data.loaded);

        if (that.data.loaded) {//全局标志位，方式请求未响应是多次触发
            
            console.log(that.data.datalist.length );
            console.log(that.data.total );
            if (that.data.datalist.length < that.data.total) {
                that.setData({
                  loaded: !1,
                  loading: true,//加载动画的显示
                })
                wx.showLoading({
                    title: '下一页加载中',
                })
              
                that.getData_topxiaoqu(that.data.postParam);
            }
        }


    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var st = this;

        st.setData({
            diytitle:'杭州二手房zui新成交报告!'
        });

        var t = null, at = null;
        return this.data.diytitle && (t = '/project/pages/reportsa/index', at = this.data.diytitle), 
        a.onShareAppMessage(t, at);    // onShareAppMessage -->  e.requirejs("core"),

      
    },
    close: function () {
        e.globalDataClose.flag = !0, wx.reLaunch({
            url: "/pages/message/auth/index"
        });
    },
 
    //区分跳转
    goReports: function (item) {
        var dt = item.currentTarget.dataset.cid;
        var t = this;
        switch (dt.datatype) {
            case "1":
                t.setData({
                    show: !1,
                    page_num: 1,
                    datalist: []
                })
                t.data.postParam.keywords = "", t.data.postParam.districtid = dt.title, t.data.postParam.sqid = "", t.data.postParam.location = "", //改动:e.sqid
                    t.data.postParam.stationid = "", t.data.postParam.conmmunityid = "", t.filterData(t.data.postParam);
                break;
            case "2":
                /****             
                if (t.data.member.needbind == 1) {
                    wx.navigateTo({
                        url: "/pages/member/bind/index"
                    });
                    return;
                }    ****/
                t.setData({
                    show: !1,
                    page_num: 1,
                    datalist: [],
                   // datalista: []
                })
                t.data.postParam.keywords = "", t.data.postParam.districtid = "", t.data.postParam.sqid = dt.title, t.data.postParam.location = "", //改动:e.sqid
                    t.data.postParam.stationid = "", t.data.postParam.conmmunityid = "", t.filterData(t.data.postParam);
                break;
            case "3":

                wx.navigateTo({
                    url: "/house/community/index?cid=" + dt.fid
                })
                break;
        }

    },
    getData: function (da) {
        var t = this,
            e = "exchange",
            d = {
                page:t.data.page_num,
                pcount: 15,
                sodo:'1'
            },
            r = Object.assign(d, da);
        //console.log(r);
        a.get("reports/get_prolist2021", r, function (a) {
            t.setData({
                show: !0,  
               // page_num: a.page, 
                datalista: a.datalista,
                datalistall: a.datalist,
                timewhere: a.timewhere
            });
            
            t.getData_topxiaoqu(da);

        });


    },

    getData_topxiaoqu: function (da) {
        var t = this,
            e = "exchange",
            d = {
                page: t.data.page_num,
                pcount: 15,
                sodo:'2'
            },
            r = Object.assign(d, da);
         
        //
        a.get("reports/get_prolist2021", r, function (e) {
            console.log(e);
            var aa = {
                loading: !1,
                show: !0, 
                loaded: !0,
                page_num: e.page,
                total: e.total,
                pagesize: e.pagesize,
                timewhere: e.timewhere 
            };

            //console.log(a.datalista);
            if (e.datalist_xiaoqu.length < 1) {
                //wx.showToast({
                    //title: '到底，没有数据了！'
                //})
                return;
            }
            //处理往上拉，加载数据
            console.log(aa);
            e.datalist_xiaoqu.length > 0 && (aa.page_num = t.data.page_num + 1, aa.datalist = t.data.datalist.concat(e.datalist_xiaoqu),
            e.datalist_xiaoqu.length < e.pagesize && (aa.loaded = !0)), t.setData(aa);
            wx.hideLoading();
        });


    },

    Reports_sort:function(dt) {//排序
        var t = this;
        var arr = dt.currentTarget.dataset.arr; 

        if(!t.data.member.nickname)
        {
          e.checkAuth();
        }
 
       if(t.data.member.viplevel!=2)
        {
            t.vipmsgbox("专业版(年卡)");
           return;
       }


        var  datalist=t.data.datalist;
        datalist = datalist.sort(t.sort_compare(arr));
        t.setData({
            datalist: datalist,
        })
        var  datalistall=t.data.datalistall;
        datalistall = datalistall.sort(t.sort_compare(arr));
        t.setData({
            datalistall: datalistall,
        })
    },
   sort_compare:function(arg) {//排序
        return function(a, b) {
            return   b[arg]-a[arg];
        }
    },
    imgError: function (a) {
        var t = {};
        t["list[" + a.target.dataset.index + "].imgurl"] = "/img/resources/default_house_list_404.png",
            this.setData(t);
    },
    imageError: function (a) {
        var t = {};
        t["item.imgurl"] = "/img/resources/default_house_list_404.png", this.setData(t);
    },
    filterData: function (a) {
        var t = this;
       console.log("filterData:")
        console.log(a);
        t.getData(a);
    },
    filterTabFn: function (a) {

        var t = this,
            e = [!0, !0, !0, !0],
            d = a.currentTarget.dataset.index,
            r = "";

        e[d] = !this.data.tab[d], r = this.data.tab[d] ? a.currentTarget.dataset.name : "",
            t.setData({
                tab: e,
                filterMask: e[d],
                filnav: r,
                search: !1
            });
    },
    filterMaskFn: function () {
        this.setData({
            tab: [!0, !0, !0, !0],
            filterMask: !0,
            search: !1,
            sortcon: !0,
            zindex: 10,
            filnav: ""
        });
    },
    quyuFn: function (a) {
        var t = this,
            e = a.currentTarget.dataset;
        //console.log("ddddddddddd:",e.barid);
        switch (console.log("quyuFn", a), +e.barid) {
            case 1:
                //区域选择
                //console.log(e.name);
                console.log("barid:", e.barid), t.getQuYuData(0), t.setData({
                    quyuNav3: !0,
                    nameCur1: e.name,
                    nameCur2: "不限",
                    nameCur11: "",
                    nameCur21: "",
                    nameCur31: "",
                    quYuBar2: 11,
                    quYuBxBar2: 11,
                    loadbarid: 0,
                    barid: e.barid
                });
                break;

            case 2:
                //地铁
                console.log("barid:", e.barid), t.getDiTieData(0), t.setData({
                    quyuNav3: !0,
                    nameCur1: e.name,
                    nameCur2: "不限",
                    nameCur11: "",
                    nameCur21: "",
                    nameCur31: "",
                    quYuBar2: 21,
                    quYuBxBar2: 21,
                    loadbarid: 0,
                    barid: e.barid
                });
                break;

            case 3:
                //附近
                console.log("barid:", e.barid), t.setData({
                    quyuNav3: !0,
                    nameCur1: e.name,
                    nameCur2: "不限",
                    nameCur11: "",
                    nameCur21: "",
                    nameCur31: "",
                    quYuBar2: 31,
                    quYuBxBar2: 31,
                    filterArea: [{
                        nearid: 1,
                        name: "1km内"
                    }, {
                        nearid: 2,
                        name: "2km内"
                    }, {
                        nearid: 3,
                        name: "3km内"
                    }],
                    barid: e.barid
                });
                break;
            case 4:
                //学区               
                console.log("barid:", e.barid), t.getXueYuData(0), t.setData({
                    quyuNav3: !0,
                    nameCur1: e.name,
                    nameCur2: "不限",
                    nameCur11: "",
                    nameCur21: "",
                    nameCur31: "",
                    quYuBar2: 41,
                    quYuBxBar2: 41,
                    loadbarid: 0,
                    barid: e.barid
                });
                break;
        }
    },
    quyuFn2: function (da) {

        var t = this,
            e = da.currentTarget.dataset;
        //console.log(e.barid);
        //console.log(t.data.list_param);

        if (t.data.member.usemembercard == 'no') {
            a.confirm("您还没有权限，联系客服开通！", function () {
                wx.redirectTo({
                    url: "/pages/member/membercard/index"
                });
            });
            return;
        }

        if (1 == t.data.list_param) switch (+e.barid) {
            case 11:
                t.data.postParam.keywords = "", t.data.postParam.lineid = "", t.data.postParam.stationid = "",
                    t.data.postParam.nearby = "", t.data.postParam.conmmunityid = "", t.data.postParam.districtid = e.districtid,
                    t.getQuYuData(e.districtid), t.setData({
                        quyuNav3: !1,
                        nameCur11: e.districtid,
                        nameCur21: "",
                        nameCur2: "",
                        nameCur3: "不限",
                        quyuId: e.districtid,
                        quyuName: e.name,
                        quYuBar3: 12,
                        quYuBxBar3: 12,
                        loadbarid: 12
                    });
                break;

            case 21:
                t.data.postParam.keywords = "", t.data.postParam.districtid = "", t.data.postParam.sqid = "",
                    t.data.postParam.nearby = "", t.data.postParam.conmmunityid = "", t.data.postParam.lineid = e.dtlineid,
                    t.getDiTieData(e.dtlineid), t.setData({
                        quyuNav3: !1,
                        nameCur21: e.dtlineid,
                        nameCur11: "",
                        nameCur2: "",
                        nameCur3: "不限",
                        quyuId: e.dtlineid,
                        quyuName: e.name,
                        quYuBar3: 22,
                        quYuBxBar3: 22,
                        loadbarid: 22
                    }), console.log("地铁2:", t.data.quyuId);
                break;

            case 31:
                t.data.tabTxt[0].newname = e.name, 1 == t.data.dingwei ? (t.setData({
                        quyuNav3: !0,
                        nameCur31: e.nearid,
                        nameCur2: "",
                        quyuName: e.name,
                        tabTxt: t.data.tabTxt,
                        tab: [!0, !0, !0, !0],
                        filterMask: !0,
                        search: !1,
                        quYuBar3: 32,
                        quYuBxBar3: 32,
                        loadbarid: 32,
                        searchCon: "请输入板块名、楼盘名",
                        datalist: [],
             
                        page_num: 1,
                        show: !1
                    }), t.data.postParam.keywords = "", t.data.postParam.districtid = "", t.data.postParam.sqid = "",
                    t.data.postParam.lineid = "", t.data.postParam.stationid = "", t.data.postParam.conmmunityid = "", t.data.postParam.xuequid = "",
                    t.data.postParam.nearby = e.nearid, t.data.postParam.location = t.data.longitude + "," + t.data.latitude,
                    t.filterData(t.data.postParam)) : (wx.showToast({
                    title: "定位失败,请授权位置信息",
                    icon: "none"
                }), t.setData({
                    nameCur31: e.nearid,
                    nameCur2: "",
                    tabTxt: t.data.tabTxt,
                    tab: [!0, !0, !0, !0],
                    filterMask: !0,
                    search: !1
                }));
                break;
            case 41:
                t.data.postParam.keywords = "", t.data.postParam.lineid = "", t.data.postParam.stationid = "",
                    t.data.postParam.nearby = "", t.data.postParam.conmmunityid = "", t.data.postParam.districtid = e.districtid,
                    t.getXueYuData(e.districtid), t.setData({
                        quyuNav3: !1,
                        nameCur11: e.districtid,
                        nameCur21: "",
                        nameCur2: "",
                        nameCur3: "不限",
                        quyuId: e.districtid,
                        quyuName: e.name,
                        quYuBar3: 42,
                        quYuBxBar3: 42,
                        loadbarid: 42
                    });
                break;


        }

        if (2 == t.data.list_param) switch (+e.barid) {
            case 11:
                t.data.postParam.keywords = "", t.data.postParam.lineid = "", t.data.postParam.stationid = "",
                    t.data.postParam.nearby = "", t.data.postParam.communityid = "", t.data.postParam.districtids = e.districtid,
                    t.getQuYuData(e.districtid), t.setData({
                        quyuNav3: !1,
                        nameCur11: e.districtid,
                        nameCur21: "",
                        nameCur2: "",
                        nameCur3: "不限",
                        quyuId: e.districtid,
                        quyuName: e.name,
                        quYuBar3: 12,
                        quYuBxBar3: 12,
                        loadbarid: 12
                    });
                break;

            case 21:
                t.data.postParam.keywords = "", t.data.postParam.districtids = "", t.data.postParam.sqids = "",
                    t.data.postParam.nearby = "", t.data.postParam.communityid = "", t.data.postParam.lineid = e.dtlineid,
                    t.getDiTieData(e.dtlineid), t.setData({
                        quyuNav3: !1,
                        nameCur21: e.dtlineid,
                        nameCur11: "",
                        nameCur2: "",
                        nameCur3: "不限",
                        quyuId: e.dtlineid,
                        quyuName: e.name,
                        quYuBar3: 22,
                        quYuBxBar3: 22,
                        loadbarid: 22
                    });
                break;

            case 31:
                t.data.tabTxt[0].newname = e.name, 1 == t.data.dingwei ? (t.setData({
                        quyuNav3: !0,
                        nameCur31: e.nearid,
                        nameCur2: "",
                        quyuName: e.name,
                        tabTxt: t.data.tabTxt,
                        tab: [!0, !0, !0, !0],
                        filterMask: !0,
                        search: !1,
                        quYuBar3: 32,
                        quYuBxBar3: 32,
                        loadbarid: 32,
                        searchCon: "请输入板块名、楼盘名",
                        list: []
                    }), t.data.postParam.keywords = "", t.data.postParam.districtids = "", t.data.postParam.sqids = "",
                    t.data.postParam.lineid = "", t.data.postParam.stationid = "", t.data.postParam.communityid = "",
                    t.data.postParam.nearby = e.nearid, t.data.postParam.location = t.data.longitude + "," + t.data.latitude,
                    t.filterData(t.data.postParam)) : (wx.showToast({
                    title: "定位失败,请授权位置信息",
                    icon: "none"
                }), t.setData({
                    nameCur31: e.nearid,
                    nameCur2: "",
                    tabTxt: t.data.tabTxt,
                    tab: [!0, !0, !0, !0],
                    filterMask: !0,
                    search: !1
                }));
        }
    },
    quyuFn3: function (da) {
        //console.log(a);
        var t = this,
            e = da.currentTarget.dataset;
        //console.log(e.barid);
        //console.log(t.data.list_param);

        if (t.data.member.usemembercard == 'no') {
            a.confirm("您还没有权限，联系客服开通！", function () {
                wx.redirectTo({
                    url: "/pages/member/membercard/index"
                });
            });
            return;
        }

        if (t.data.tabTxt[0].newname = e.name, 1 == t.data.list_param) switch (+e.barid) {
            case 12:
                t.setData({
                        nameCur3: e.sqid,
                        tabTxt: t.data.tabTxt,
                        tab: [!0, !0, !0, !0],
                        filterMask: !0,
                        search: !1,
                        loadbarid: 12,
                        shangquan: e.name,
                        searchCon: "请输入板块名、楼盘名",
                        datalist: [],
                   
                        page_num: 1,
                        show: !1
                    }), t.data.postParam.keywords = "", t.data.postParam.districtid = "", t.data.postParam.sqid = t.data.quyuName + ' ' + e.name, t.data.postParam.location = "", //改动:e.sqid
                    t.data.postParam.stationid = "", t.data.postParam.conmmunityid = "", t.filterData(t.data.postParam),
                    console.log("区域三级", t.data.postParam);

                break;

            case 22:
                t.setData({
                        nameCur3: e.sqid,
                        tabTxt: t.data.tabTxt,
                        tab: [!0, !0, !0, !0],
                        filterMask: !0,
                        search: !1,
                        loadbarid: 22,
                        searchCon: "请输入板块名、楼盘名",
                        datalist: [],
                 
                        page_num: 1,
                        show: !1

                    }), t.data.postParam.keywords = "", t.data.postParam.sqid = "", t.data.postParam.conmmunityid = "", t.data.postParam.location = "",
                    t.data.postParam.stationid = e.sqid, t.filterData(t.data.postParam), console.log("地铁三级", t.data.postParam);
            case 42:
                t.setData({
                        nameCur3: e.sqid,
                        tabTxt: t.data.tabTxt,
                        tab: [!0, !0, !0, !0],
                        filterMask: !0,
                        search: !1,
                        loadbarid: 12,
                        shangquan: e.name,
                        searchCon: "请输入板块名、楼盘名",
                        datalist: [],
                    
                        page_num: 1,
                        show: !1
                    }), t.data.postParam.conmmunityid = "", t.data.postParam.keywords = "", t.data.postParam.districtid = "", t.data.postParam.location = "", t.data.postParam.sqid = "", //
                    t.data.postParam.stationid = "", t.data.postParam.stationid = "", t.data.postParam.xuequid = e.sqid, t.data.postParam.xuequname = e.name, t.filterData(t.data.postParam),
                    console.log("区域三级", t.data.postParam);
                break;
        }


        if (2 == t.data.list_param) switch (+e.barid) {
            case 12:
                t.setData({
                        nameCur3: e.sqid,
                        tabTxt: t.data.tabTxt,
                        tab: [!0, !0, !0, !0],
                        filterMask: !0,
                        search: !1,
                        loadbarid: 12,
                        shangquan: e.name,
                        searchCon: "请输入板块名、楼盘名",
                        list: []
                    }), t.data.postParam.keywords = "", t.data.postParam.districtids = "", t.data.postParam.sqids = e.sqid, t.data.postParam.location = "",
                    t.data.postParam.stationid = "", t.data.postParam.communityid = "", t.filterData(t.data.postParam),
                    console.log("区域三级", t.data.postParam);
                break;

            case 22:
                t.setData({
                        nameCur3: e.sqid,
                        tabTxt: t.data.tabTxt,
                        tab: [!0, !0, !0, !0],
                        filterMask: !0,
                        search: !1,
                        loadbarid: 22,
                        searchCon: "请输入板块名、楼盘名",
                        list: []
                    }), t.data.postParam.keywords = "", t.data.postParam.sqids = "", t.data.postParam.communityid = "", t.data.postParam.location = "",
                    t.data.postParam.stationid = e.sqid, t.filterData(t.data.postParam), console.log("地铁三级", t.data.postParam);
        }
    },
    buxianFn2: function (a) {
        //console.log(a);
        var e = a.currentTarget.dataset;
        // console.log(e.barid);


        var t = this;
        t.data.tabTxt[0].newname = "", t.setData({
            nameCur2: a.currentTarget.dataset.name,
            tabTxt: t.data.tabTxt,
            filnav: "",
            tab: [!0, !0, !0, !0],
            filterMask: !0,
            search: !1,
            quyuNav3: !0,
            loadbarid: 0,
            nameCur3: "",
            nameCur11: "",
            nameCur21: "",
            nameCur31: "",
            searchCon: "请输入板块名、楼盘名",
            datalist: [],
        
            page_num: 1,
            show: !1
        }), 1 == t.data.list_param && (t.data.postParam.keywords = "", t.data.postParam.districtid = "",
            t.data.postParam.sqid = "", t.data.postParam.lineid = "", t.data.postParam.stationid = "", t.data.postParam.location = "",
            t.data.postParam.nearby = "", t.data.postParam.location = "", t.data.postParam.conmmunityid = "", t.data.postParam.xuequid = "",
            t.filterData(t.data.postParam), console.log("buxian2", t.data.postParam)), 2 == t.data.list_param && (t.data.postParam.keywords = "",
            t.data.postParam.districtids = "", t.data.postParam.sqids = "", t.data.postParam.lineid = "",
            t.data.postParam.stationid = "", t.data.postParam.nearby = "", t.data.postParam.location = "",
            t.data.postParam.communityid = "", t.filterData(t.data.postParam), console.log("buxian2", t.data.postParam));
    },
    buxianFn3: function (a) {
        var t = this,
            e = a.currentTarget.dataset;

        //console.log(e);
        //console.log(e.barid);
        //console.log(e.bxbarid);
        if (t.data.tabTxt[0].newname = t.data.quyuName, 1 == t.data.list_param) switch (+e.bxbarid) {
            case 12:
                //console.log(t.data.quyuId);
                t.setData({
                        nameCur3: a.currentTarget.dataset.name,
                        tabTxt: t.data.tabTxt,
                        tab: [!0, !0, !0, !0],
                        filterMask: !0,
                        search: !1,
                        loadbarid: 12,
                        searchCon: "请输入板块名、楼盘名",
                        datalist: [],
            
                        page_num: 1,
                        show: !1
                    }), t.data.postParam.keywords = "", t.data.postParam.sqid = "", t.data.postParam.conmmunityid = "", t.data.postParam.xuequid = "", t.data.postParam.location = "",
                    t.data.postParam.districtid = e.districtname, //改动：t.data.quyuId
                    console.log("区域不限3_1：", t.data.postParam),
                    t.filterData(t.data.postParam);
                break;

            case 22:
                t.setData({
                        nameCur3: a.currentTarget.dataset.name,
                        quyuSqId: "",
                        tabTxt: t.data.tabTxt,
                        tab: [!0, !0, !0, !0],
                        filterMask: !0,
                        search: !1,
                        loadbarid: 22,
                        datalist: [],
               
                    }), t.data.postParam.keywords = "", t.data.postParam.stationid = "", t.data.postParam.conmmunityid = "", t.data.postParam.location = "", t.data.postParam.xuequid = "",
                    t.data.postParam.lineid = t.data.quyuId, console.log("地铁不限3_1：", t.data.postParam),
                    t.filterData(t.data.postParam);
                break;
            case 42:
                //console.log(t.data.quyuId);
                t.setData({
                        nameCur3: a.currentTarget.dataset.name,
                        tabTxt: t.data.tabTxt,
                        tab: [!0, !0, !0, !0],
                        filterMask: !0,
                        search: !1,
                        loadbarid: 12,
                        searchCon: "请输入板块名、楼盘名",
                        datalist: [],
                  
                        page_num: 1,
                        show: !1
                    }), t.data.postParam.keywords = "", t.data.postParam.location = "", t.data.postParam.sqid = "", t.data.postParam.conmmunityid = "", t.data.postParam.xuequid = "", t.data.postParam.bxbarid = "42",
                    t.data.postParam.districtid = e.districtname, //改动：t.data.quyuId
                    console.log("区域不限3_1：", t.data.postParam),
                    t.filterData(t.data.postParam);
                break;
        }
        if (2 == t.data.list_param) switch (+e.bxbarid) {
            case 12:
                t.setData({
                        nameCur3: a.currentTarget.dataset.name,
                        tabTxt: t.data.tabTxt,
                        tab: [!0, !0, !0, !0],
                        filterMask: !0,
                        search: !1,
                        loadbarid: 12,
                        searchCon: "请输入板块名、楼盘名",
                        list: []
                    }), t.data.postParam.keywords = "", t.data.postParam.sqids = "", t.data.postParam.communityid = "", t.data.postParam.xuequid = "", t.data.postParam.location = "",
                    t.data.postParam.districtids = t.data.quyuId, console.log("区域不限3_2：", t.data.postParam),
                    t.filterData(t.data.postParam);
                break;

            case 22:
                t.setData({
                        nameCur3: a.currentTarget.dataset.name,
                        quyuSqId: "",
                        tabTxt: t.data.tabTxt,
                        tab: [!0, !0, !0, !0],
                        filterMask: !0,
                        search: !1,
                        loadbarid: 22,
                        list: []
                    }), t.data.postParam.keywords = "", t.data.postParam.stationid = "", t.data.postParam.communityid = "", t.data.postParam.xuequid = "", t.data.postParam.location = "",
                    t.data.postParam.lineid = t.data.quyuId, console.log("地铁不限3：", t.data.postParam),
                    t.filterData(t.data.postParam);
        }
    },
    //区域菜单
    getQuYuData: function (a) {
        var t = this,
            e = {};
        wx.request({
            url: "https://sbmf.ww2ss.com/app/ewei_shopv2_api.php?i=1&r=Business.get_business&comefrom=wxapp&openid=sns_wa_ohCG55a2b-B87ogIEY6guYd953sM&mid=&merchid=&authkey=&timestamp=1565593026780",
            method: "POST",
            data: e,
            header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            success: function (e) {
                if (200 == e.data.status) {
                    for (var d = [], r = 0; r < e.data.data.length; r++) d[e.data.data[r].id] = e.data.data[r].sqlist;
                    0 == a ? t.setData({
                        filterArea: e.data.data
                    }) : t.setData({
                        filterArea2: d[a]
                    });
                } else console.log("204");
            },
            fail: function (a) {
                console.log("error", a);
            },
            complete: function (a) {}
        });
    },
    //获得学区菜单
    getXueYuData: function (a) {
        var t = this,
            e = {};
        wx.request({
            url: "https://sbmf.ww2ss.com/app/ewei_shopv2_api.php?i=1&r=Business.get_xuequ&comefrom=wxapp&openid=sns_wa_ohCG55a2b-B87ogIEY6guYd953sM&mid=&merchid=&authkey=&timestamp=1565593026780",
            method: "POST",
            data: e,
            header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            success: function (e) {
                if (200 == e.data.status) {
                    for (var d = [], r = 0; r < e.data.data.length; r++) d[e.data.data[r].id] = e.data.data[r].sqlist;
                    0 == a ? t.setData({
                        filterArea: e.data.data
                    }) : t.setData({
                        filterArea2: d[a]
                    });
                } else console.log("204");
            },
            fail: function (a) {
                console.log("error", a);
            },
            complete: function (a) {}
        });
    },
    filterTimeData: function () {
        var a = this,
            t = a.data.city_id;
        a.data.timeData = [{
            code: "7",
            name: "近7天"
        }, {
            code: "15",
            name: "近15天"
        }, {
            code: "30",
            name: "本月"
        }, {
            code: "60",
            name: "上月"
        }, {
            code: "90",
            name: "近90天"
        }, {
            code: "180",
            name: "近180天"
        }, {
            code: "1",
            name: "2019年"
        }, {
            code: "2",
            name: "2018年"
        }, {
            code: "3",
            name: "2017年"
        }, {
            code: "4",
            name: "2016年"
        }], a.setData({
            filterTime: a.data.timeData
        });
    },
    filterPricesData: function () {
        var a = this,
            t = a.data.city_id;
        1 == a.data.list_param ? 1 == t || 9 == t ? a.data.pricesData = [{
            code: "0,200",
            name: "本周"
        }, {
            code: "200,250",
            name: "上周"
        }, {
            code: "250,300",
            name: "本月"
        }, {
            code: "300,400",
            name: "上月"
        }, {
            code: "400,500",
            name: "400-500万"
        }, {
            code: "500,600",
            name: "500-600万"
        }, {
            code: "600,800",
            name: "600-800万"
        }, {
            code: "800,1000",
            name: "800-1000万"
        }, {
            code: "1000,0",
            name: "1000万以上"
        }] : 2 == t || 8 == t || 5 == t || 20 == t || 7 == t || 18 == t || 19 == t ? a.data.pricesData = [{
            code: "0,50",
            name: "50万以下"
        }, {
            code: "50,80",
            name: "50-80万"
        }, {
            code: "80,100",
            name: "80-100万"
        }, {
            code: "100,120",
            name: "100-120万"
        }, {
            code: "120,150",
            name: "120-150万"
        }, {
            code: "150,200",
            name: "150-200万"
        }, {
            code: "200,300",
            name: "200-300万"
        }, {
            code: "300,500",
            name: "300-500万"
        }, {
            code: "500,800",
            name: "500-800万"
        }, {
            code: "800,20000",
            name: "800万以上"
        }] : 15 != t && 22 != t && 24 != t && 6 != t && 16 != t || (a.data.pricesData = [{
            code: "0,50",
            name: "50万以下"
        }, {
            code: "50,80",
            name: "50-80万"
        }, {
            code: "80,100",
            name: "80-100万"
        }, {
            code: "100,120",
            name: "100-120万"
        }, {
            code: "120,150",
            name: "120-150万"
        }, {
            code: "150,200",
            name: "150-200万"
        }, {
            code: "200,300",
            name: "200-300万"
        }, {
            code: "300,0",
            name: "300万以上"
        }]) : 2 == a.data.list_param && (1 == t || 2 == t || 5 == t || 7 == t || 8 == t || 9 == t ? a.data.pricesData = [{
            code: "0,1500",
            name: "1500元以下"
        }, {
            code: "1500,2500",
            name: "1500-2500元"
        }, {
            code: "2500,3500",
            name: "2500-3500元"
        }, {
            code: "3500,5000",
            name: "3500-5000元"
        }, {
            code: "5000,8000",
            name: "5000-8000元"
        }, {
            code: "8000,10000",
            name: "8000-10000元"
        }, {
            code: "10000,0",
            name: "10000元以上"
        }] : 16 != t && 24 != t && 20 != t && 22 != t && 15 != t && 6 != t && 19 != t && 18 != t || (a.data.pricesData = [{
            code: "0,1000",
            name: "1000元以下"
        }, {
            code: "1000,1500",
            name: "1000-1500元"
        }, {
            code: "1500,2000",
            name: "1500-2000元"
        }, {
            code: "2000,2500",
            name: "2000-2500元"
        }, {
            code: "2500,3000",
            name: "2500-3000元"
        }, {
            code: "3000,4000",
            name: "3000-4000元"
        }, {
            code: "4000,5000",
            name: "4000-5000元"
        }, {
            code: "5000,0",
            name: "5000元以上"
        }])), a.setData({
            filterPrices: a.data.pricesData
        });
    },
    filterTimeFn: function (a) {
        var t = this,
            e = a.currentTarget.dataset;
        t.data.timeData = e.code, t.setData({
            timeCurName: e.name,
            valTime: e.name,
            inpVal: "",
            minTime: "",
            maxTime: "",
            sdate: '开始日期',
            edate: '结束日期'
        }), t.data.postParam.time = t.data.timeData, console.log("日期", t.data.postParam);
    },
    filterPricesFn: function (a) {
        var t = this,
            e = a.currentTarget.dataset;
        t.data.priceData = e.code, t.setData({
            priceCurName: e.name,
            valPrice: e.name,
            inpVal: "",
            minPrice: "",
            maxPrice: ""
        }), t.data.postParam.price = t.data.priceData, console.log("价格", t.data.postParam);
    },
    timeMin: function (a) {
        this.setData({
            minPrice: a.detail.value,
            timeCurName: ""
        });
    },
    timeMax: function (a) {
        this.setData({
            maxPrice: a.detail.value,
            timeCurName: ""
        });
    },
    priceMin: function (a) {
        this.setData({
            minPrice: a.detail.value,
            priceCurName: ""
        });
    },
    priceMax: function (a) {
        this.setData({
            maxPrice: a.detail.value,
            priceCurName: ""
        });
    },
    emptyPriceFn: function (a) {
        var t = this;
        a.currentTarget.dataset;
        t.data.tabTxt[2].newname = "", t.setData({
            priceCurName: "",
            tabTxt: t.data.tabTxt,
            filnav: "",
            inpVal: "",
            minPrice: "",
            maxPrice: "",
            valPrice: ""
        }), t.data.postParam.price = "", t.data.priceData = "", console.log("价格清空", t.data.priceData);
    },
    emptyTimeFn: function (a) {
        var t = this;
        a.currentTarget.dataset;
        t.data.tabTxt[1].newname = "", t.setData({
            timeCurName: "",
            tabTxt: t.data.tabTxt,
            filnav: "",
            inpVal: "",
            minTime: "",
            maxTime: "",
            valTime: "",
            sdate: '开始日期',
            edate: '结束日期'
        }), t.data.postParam.time = "", t.data.timeData = "", console.log("时间清空", t.data.timeData);
    },
    timeConfirm: function (da) {
        var t = this

        if(!t.data.member.nickname)
        {
          e.checkAuth();
        }
 
       if(t.data.member.viplevel!=2)
        {
            t.vipmsgbox("专业版(年卡)");
           return;
       }

          var  e = da.currentTarget.dataset,
            d = e.valuemin, //parseInt(e.valuemin),
            r = e.valuemax; //parseInt(e.valuemax);
        //console.log(d,r);

       

        if (t.data.member.usemembercard == 'no') {
            a.confirm("您还没有权限，联系客服开通！", function () {
                wx.redirectTo({
                    url: "/pages/member/membercard/index"
                });
            });
            return;
        }
        1 == t.data.list_param && (d && !r && (t.data.tabTxt[1].newname = d + "万以上", t.data.timeData = d + ",99999999",
                t.data.postParam.time = t.data.timeData), r && !d && (t.data.tabTxt[1].newname = r + "万以下",
                t.data.timeData = "0," + r), d && r && (t.data.tabTxt[1].newname = d + "-" + r + "万",
                t.data.timeData = d + "," + r)), 2 == t.data.list_param && (d && !r && (t.data.tabTxt[1].newname = d + "元以上",
                    t.data.timeData = d + ",99999999", t.data.postParam.time = t.data.timeData),
                r && !d && (t.data.tabTxt[1].newname = r + "元以下", t.data.timeData = "0," + r),
                d && r && (t.data.tabTxt[1].newname = d + "-" + r + "元", t.data.timeData = d + "," + r)),
            d || r || (t.data.tabTxt[1].newname = t.data.valTime), "" == t.data.timeData && (t.data.tabTxt[1].newname = ""),
            t.setData({
                filnav: "",
                tabTxt: t.data.tabTxt,
                tab: [!0, !0, !0, !0],
                filterMask: !0,
                search: !1,
                datalist: [],
            
                page_num: 1,
                show: !1
            }), t.data.postParam.time = t.data.timeData, console.log("时间确定", t.data.timeData),
            t.filterData(t.data.postParam);
    },
    vipmsgbox: function(title) {

        wx.getSystemInfo({
            success: function (e) {
               console.log(e);
                //console.log(e.system);
                //console.log(e.system.substring(0, 3));
                if (e.system.substring(0, 3)!="iOS"){
            
                      wx.showModal({
                        title: '会员提醒',
                        content: "该功能限【"+title+"】使用，点确认马上开通会员权限。",
                        success: function (res) {
                          if (res.confirm) {
                            console.log('用户点击确定')
                    
                            wx.redirectTo({
                                url: "/pages/member/membercard/index"
                               })
                    
                    
                          } else if (res.cancel) {
                           
                            return; 
                          }
                        }
                      })

                       return; 
                  
                }else
                {
                    
                    wx.showModal({
                        title: '会员提醒',
                        content: "该功能限【"+title+"】使用，马上联系客服开通。",
                        success: function (res) {
                          if (res.confirm) {
                            console.log('用户点击确定')
                    
                            wx.redirectTo({
                                url: "/pages/webview/index?weburl=https://mp.weixin.qq.com/s/jr0k0wJssnfOcjNeipuZKw"
                               })
                    
                          } else if (res.cancel) {
                           
                            return; 
                          }
                        }
                      })
                   
                    return;
                }
              
                  
            }
        }) 
       
    },
    priceConfirm: function (da) {
        //console.log(a);
        var t = this,
            e = da.currentTarget.dataset,
            d = parseInt(e.valuemin),
            r = parseInt(e.valuemax);

        if (t.data.member.usemembercard == 'no') {
            a.confirm("您还没有权限，联系客服开通！", function () {
                wx.redirectTo({
                    url: "/pages/member/membercard/index"
                });
            });
            return;
        }

        1 == t.data.list_param && (d && !r && (t.data.tabTxt[1].newname = d + "万以上", t.data.priceData = d + ",99999999",
                t.data.postParam.price = t.data.priceData), r && !d && (t.data.tabTxt[1].newname = r + "万以下",
                t.data.priceData = "0," + r), d && r && (t.data.tabTxt[2].newname = d + "-" + r + "万",
                t.data.priceData = d + "," + r)), 2 == t.data.list_param && (d && !r && (t.data.tabTxt[2].newname = d + "元以上",
                    t.data.priceData = d + ",99999999", t.data.postParam.price = t.data.priceData),
                r && !d && (t.data.tabTxt[2].newname = r + "元以下", t.data.priceData = "0," + r),
                d && r && (t.data.tabTxt[2].newname = d + "-" + r + "元", t.data.priceData = d + "," + r)),
            d || r || (t.data.tabTxt[2].newname = t.data.valPrice), "" == t.data.priceData && (t.data.tabTxt[2].newname = ""),
            t.setData({
                filnav: "",
                tabTxt: t.data.tabTxt,
                tab: [!0, !0, !0, !0],
                filterMask: !0,
                search: !1,
                datalist: [],
           
                page_num: 1,
                show: !1
            }), t.data.postParam.price = t.data.priceData, console.log("价格确定", t.data.priceData),
            t.filterData(t.data.postParam);
    },
    filterFxingData: function () {
        var a = this;
        a.data.fxingData = [{
            broom: 1,
            selected: !1,
            name: "50平以下"
        }, {
            broom: 2,
            selected: !1,
            name: "51-70平"
        }, {
            broom: 3,
            selected: !1,
            name: "71-90平"
        }, {
            broom: 4,
            selected: !1,
            name: "91-120平"
        }, {
            broom: 5,
            selected: !1,
            name: "121-150平"
        }, {
            broom: 9,
            selected: !1,
            name: "151平以上"
        }], a.setData({
            filterFxing: a.data.fxingData
        });
    },
    filterFxingFn: function (a) {
        var t, e = this,
            d = a.currentTarget.dataset.index,
            r = [],
            s = [];
        e.data.fxingData[d].selected = !e.data.fxingData[d].selected, e.data.fxingData.forEach(function (a, t) {
            a.selected && (s.push(a.broom), r.push(a.name));
        }), t = s.join(), e.data.postParam.broom = t, e.setData({
            filterFxing: e.data.fxingData,
            fxname: r
        });
    },
    emptyFxingFn: function (a) {
        var t = this;
        a.currentTarget.dataset;
        t.data.tabTxt[3].newname = "", t.setData({
            tabTxt: t.data.tabTxt,
            filnav: "",
            fxname: ""
        });
        for (var e in t.data.fxingData) t.data.fxingData[e].selected = !1;
        t.setData({
            filterFxing: t.data.fxingData
        }), t.data.postParam.broom = "";
    },
    fxingConfirm: function (da) {
        var t = this,
            e = da.currentTarget.dataset.fxingname,
            d = [];

        if (t.data.member.usemembercard == 'no') {
            a.confirm("您还没有权限，联系客服开通！", function () {
                wx.redirectTo({
                    url: "/pages/member/membercard/index"
                });
            });
            return;
        }

        d.push(e), t.data.tabTxt[3].newname = e.length > 0 ? d : "", t.setData({
            filnav: "",
            tabTxt: t.data.tabTxt,
            tab: [!0, !0, !0, !0],
            filterMask: !0,
            search: !1,
            datalist: [],
       
            page_num: 1,
            show: !1
        }), console.log("房型 ", t.data.postParam), t.filterData(t.data.postParam);
    },
    filtermoreData: function (a) {
        //console.log("filtermoreData1:",a);
        var t = this,
            e = {
                cityid: t.data.city_id
            };
        /***
        wx.request({
            url: "https://appapi.5i5j.com/appapi/common/label",
            method: "POST",
            data: e,
            header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            success: function(a) {
                console.log("filtermoreData2:",a);
                1 == t.data.list_param && a.data.data.WEB_SALE_LABEL && (t.data.tagData = a.data.data.WEB_SALE_LABEL),
                    2 == t.data.list_param && a.data.data.WEB_RENT_LABEL && (t.data.tagData = a.data.data.WEB_RENT_LABEL),
                    t.data.tagData.forEach(function(a, t) {
                        a.selected = !1;
                    }), t.setData({
                        moreTag: t.data.tagData
                    });
            },
            fail: function(a) {
                console.log("error", a);
            },
            complete: function(a) {}
        }),***/

        1 == t.data.list_param && (t.data.moreData = {
            toilet: [{
                code: 1,
                selected: !1,
                name: "一卫"
            }, {
                code: 2,
                selected: !1,
                name: "两卫"
            }, {
                code: 3,
                selected: !1,
                name: "三卫"
            }, {
                code: 0,
                selected: !1,
                name: "三卫以上"
            }],
            buildarea: [{
                code: "0,50",
                selected: !1,
                name: "50㎡以下"
            }, {
                code: "50,70",
                selected: !1,
                name: "50-70㎡"
            }, {
                code: "70,90",
                selected: !1,
                name: "70-90㎡"
            }, {
                code: "90,110",
                selected: !1,
                name: "90-110㎡"
            }, {
                code: "110,130",
                selected: !1,
                name: "110-130㎡"
            }, {
                code: "130,150",
                selected: !1,
                name: "130-150㎡"
            }, {
                code: "150,200",
                selected: !1,
                name: "150-200㎡"
            }, {
                code: "200,1000",
                selected: !1,
                name: "200以上"
            }],
            heading: [{
                code: 10,
                selected: !1,
                name: "南北"
            }, {
                code: 3,
                selected: !1,
                name: "南"
            }, {
                code: 1,
                selected: !1,
                name: "东"
            }, {
                code: 2,
                selected: !1,
                name: "西"
            }, {
                code: 4,
                selected: !1,
                name: "北"
            }],
            buildage: [{
                code: 1,
                selected: !1,
                name: "5年以内"
            }, {
                code: 2,
                selected: !1,
                name: "10年以内"
            }, {
                code: 3,
                selected: !1,
                name: "15年以内"
            }, {
                code: 4,
                selected: !1,
                name: "20年以内"
            }, {
                code: 5,
                selected: !1,
                name: "20年以上"
            }],
            floortype: [{
                code: -1,
                selected: !1,
                name: "底层"
            }, {
                code: 1,
                selected: !1,
                name: "低楼层"
            }, {
                code: 2,
                selected: !1,
                name: "中楼层"
            }, {
                code: 3,
                selected: !1,
                name: "高楼层"
            }, {
                code: 999,
                selected: !1,
                name: "顶层"
            }],
            decoratetype: [{
                code: 3,
                selected: !1,
                name: "精装修"
            }, {
                code: 2,
                selected: !1,
                name: "普通装修"
            }, {
                code: 1,
                selected: !1,
                name: "毛坯房"
            }],
            housetype: [{
                code: 1,
                selected: !1,
                name: "普通住宅"
            }, {
                code: 2,
                selected: !1,
                name: "别墅"
            }, {
                code: 3,
                selected: !1,
                name: "其他"
            }]
        }), 2 == t.data.list_param && (t.data.moreData = {
            renttype: [{
                code: 1,
                selected: !1,
                name: "整租"
            }, {
                code: 2,
                selected: !1,
                name: "合租"
            }],
            buildarea: [{
                code: "0,50",
                selected: !1,
                name: "50㎡以下"
            }, {
                code: "50,70",
                selected: !1,
                name: "50-70㎡"
            }, {
                code: "70,90",
                selected: !1,
                name: "70-90㎡"
            }, {
                code: "90,110",
                selected: !1,
                name: "90-110㎡"
            }, {
                code: "110,130",
                selected: !1,
                name: "110-130㎡"
            }, {
                code: "130,150",
                selected: !1,
                name: "130-150㎡"
            }, {
                code: "150,200",
                selected: !1,
                name: "150-200㎡"
            }, {
                code: "200,1000",
                selected: !1,
                name: "200以上"
            }],
            heading: [{
                code: 10,
                selected: !1,
                name: "南北"
            }, {
                code: 3,
                selected: !1,
                name: "南"
            }, {
                code: 1,
                selected: !1,
                name: "东"
            }, {
                code: 2,
                selected: !1,
                name: "西"
            }, {
                code: 4,
                selected: !1,
                name: "北"
            }],
            decoratetype: [{
                code: 3,
                selected: !1,
                name: "精装修"
            }, {
                code: 2,
                selected: !1,
                name: "普通装修"
            }, {
                code: 1,
                selected: !1,
                name: "毛坯房"
            }],
            floortype: [{
                code: -1,
                selected: !1,
                name: "底层"
            }, {
                code: 1,
                selected: !1,
                name: "低楼层"
            }, {
                code: 2,
                selected: !1,
                name: "中楼层"
            }, {
                code: 3,
                selected: !1,
                name: "高楼层"
            }, {
                code: 999,
                selected: !1,
                name: "顶层"
            }],
            othertype: [{
                code: 1,
                selected: !1,
                name: "普通租房"
            }, {
                code: 3,
                selected: !1,
                name: "相寓"
            }]
        }), t.setData({
            moreData: t.data.moreData
        });
    },
    moreFn: function (a) {
        var t, e, d = this,
            r = a.currentTarget.dataset,
            s = r.index,
            i = r.valname,
            o = [];
        //console.log(r);
        switch (+r.moreid) {
            case 1:
                d.data.moreData[i][s].selected = !d.data.moreData[i][s].selected, d.data.moreData[i].forEach(function (a, t) {
                    a.selected && o.push(a.code);
                }), t = o.join(), d.data.postParam[i] = t, d.setData({
                    moreData: d.data.moreData,
                    moreselected: o
                });
                break;

            case 2:
                d.data.tagData[s].selected = !d.data.tagData[s].selected, d.data.tagData.forEach(function (a, t) {
                    a.selected && o.push(a.code);
                }), t = o.join(), d.data.postParam.tag = t, d.setData({
                    moreTag: d.data.tagData,
                    moreselected: o
                });
                break;

            case 3:
                e = d.data.moreData[i][s].code;
                if (d.data.moreData[i][s].selected == !d.data.moreData[i][s].selected) {
                    d.setData({
                        moreCurName: ""
                    });
                    d.data.moreData[i][s].selected = false;
                } else {

                    d.setData({
                        moreCurName: r.name,
                        moreselected: e
                    });
                    for (var j = 0; j < d.data.moreData[i].length; j++) {
                        if (!d.data.moreData[i][s].selected) {
                            d.data.moreData[i][j].selected = false;
                        }
                    }
                    if (d.data.moreData[i][s].selected) {
                        d.data.moreData[i][s].selected = false;
                        d.setData({
                            moreCurName: ""
                        });
                        d.data.postParam.buildage = "";
                    } else {
                        d.data.moreData[i][s].selected = true;
                        d.data.postParam.buildage = e;
                    }
                }
                break;
            case 4:
                e = d.data.moreData[i][s].code;
                if (d.data.moreData[i][s].selected == !d.data.moreData[i][s].selected) {

                    d.setData({
                        moreCurName1: ""
                    });
                    d.data.moreData[i][s].selected = false;
                } else {

                    d.setData({
                        moreCurName1: r.name,
                        moreselected: e
                    });
                    for (var j = 0; j < d.data.moreData[i].length; j++) {
                        if (!d.data.moreData[i][s].selected) {
                            d.data.moreData[i][j].selected = false;
                        }
                    }
                    if (d.data.moreData[i][s].selected) {
                        d.data.moreData[i][s].selected = false;
                        d.setData({
                            moreCurName1: ""
                        });
                        d.data.postParam.buildarea = "";
                    } else {

                        d.data.moreData[i][s].selected = true;
                        d.data.postParam.buildarea = e;
                    }
                }


                break;
        }
    },
    moreReset: function (a) {
        var t = this;
        for (var e in t.data.moreData) {
            for (var d in t.data.moreData[e]) t.data.moreData[e][d].selected = !1;
            t.data.postParam[e] = "";
        }
        for (var d in t.data.tagData) t.data.tagData[d].selected = !1;
        t.data.postParam.tag = "";
        for (var d in t.data.moreData.buildage) t.data.moreData.buildage[d].selected = !1;
        t.data.tabTxt[3].newname = "", t.setData({
            tabTxt: t.data.tabTxt,
            moreData: t.data.moreData,
            moreTag: t.data.tagData,
            moreCurName: "",
            filnav: "",
            moreselected: []
        }), t.data.postParam.buildage = "";
    },
    moreConfirm: function (a) {
        var t = this;
        0 == t.data.moreselected.length ? t.data.tabTxt[3].newname = "" : t.data.tabTxt[3].newname = " 更多",
            t.setData({
                filnav: "",
                tab: [!0, !0, !0, !0],
                tabTxt: t.data.tabTxt,
                filterMask: !0,
                search: !1,
                datalist: [],
    
                page_num: 1,
                show: !1
            }), t.filterData(t.data.postParam);
    },
    preventTouchMove: function () {},
    sortConData: function () {
        var a = this;
        1 == a.data.list_param && (a.data.sortData = [{
            id: "",
            name: "默认排序"
        }, {
            id: 1,
            name: "总价从低到高"
        }, {
            id: 2,
            name: "总价从高到低"
        }, {
            id: 3,
            name: "单价从低到高"
        }, {
            id: 4,
            name: "单价从高到低"
        }, {
            id: 5,
            name: "最新发布"
        }]), 2 == a.data.list_param && (a.data.sortData = [{
            id: "",
            name: "默认排序"
        }, {
            id: 1,
            name: "租金从低到高"
        }, {
            id: 2,
            name: "租金从高到低"
        }, {
            id: 3,
            name: "面积从小到大"
        }, {
            id: 4,
            name: "面积从大到小"
        }, {
            id: 5,
            name: "最新发布"
        }]), a.setData({
            sortlist: a.data.sortData
        });
    },
    sortbtnFn: function () {
        this.setData({
            sortcon: !1,
            filterMask: !1,
            zindex: 13
        });
    },
    sortlistFn: function (a) {
        var t = this,
            e = a.currentTarget.dataset;
        t.setData({
            sortcon: !0,
            filterMask: !0,
            zindex: 10,
            sortCurName: e.name,
            list: []
        }), t.data.postParam.psort = e.sortid, t.filterData(t.data.postParam);
    },
    loadMore: function (a) {
        var t = this;
        if (t.data.countLock = 2, t.data.total_page < t.data.page_num && (console.log("没有新数据"),
                t.setData({
                    showAllData: !1,
                    loadinghide: !0
                }), t.data.listLock = 2), 2 == t.data.listLock) return t.setData({
            loadinghide: !0
        }), !1;
        
        console.log("下一页");

        t.setData({
            loadinghide: !1
        }), t.getData_topxiaoqu(t.data.postParam);
    },
    toDetail: function (a) {
        var t = this,
            e = parseInt(a.currentTarget.dataset.index);

        var d = t.data.list[e].housesid,
            r = t.data.list[e].cityid;
        1 == t.data.list_param && wx.navigateTo({
            url: "/sale_detail/sale_detail?houseId=" + d + "&cityId=" + r
        }), 2 == t.data.list_param && wx.navigateTo({
            url: "/zufang_detail/zufang_detail?houseId=" + d + "&cityId=" + r
        });
    },
    toSearch: function (a) {
        var t = this,
            e = "";


        wx.navigateTo({
            url: "/project/pages/reportsa/search"
        });
    },
    delInp: function () {
        var a = this;
        a.data.tabTxt[0].newname = "", a.setData({
                searchCon: "请输入板块名、楼盘名",
                tabTxt: a.data.tabTxt
            }), a.data.postParam.districtid = "", a.data.postParam.sqid = "", a.data.postParam.conmmunityid = "",
            a.data.postParam.lineid = "", a.data.postParam.stationid = "", console.log(a.data.postParam),
            a.filterData(a.data.postParam);
    },
    tel: function (a) {
        var t = a.currentTarget.id;
        wx.makePhoneCall({
            phoneNumber: t,
            success: function () {
                console.log("拨打电话成功!");
            },
            fail: function () {
                console.log("拨打电话失败！");
            }
        });
    },
  
    onLazyLoad: function (a) {}
})