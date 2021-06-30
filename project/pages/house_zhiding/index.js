
var e = getApp(),
a = e.requirejs("core");
Page({
    data: {
        check:null,
        communityName:'',
        cid:'',
        fid:'',
        puserinfo:{},
        member: {},
        mobile:null,
        cname:null,
        building_name:null,
        unit_name:null,
        house_name:null
    },
    radioChange: function (c) { 
        var a = this;
        a.setData({
            check: c.detail.value
        });     
        // console.log(c.detail.value); 
    },
    onLoad: function (dt) {
//   console.log(dt.cid);
//         console.log(dt.communityName);      
        var st=this;
        st.setData({
            cid:dt.cid,
            communityName:dt.communityName,
            fid:dt.fid
        }),a.get("zhiDing/zhiDingRead", {
            cid: dt.cid
        }, function(tt) {
         
            var t=tt.data;
             st.setData({           
                cname: t.cname,
                building_name: t.building_name,
                unit_name: t.unit_name,
                house_name: t.house_name,
                mobile: t.cmobile,
                check: t.cflag
             });
        });
    },
    onShow: function() {
        e.checkAuth();
        var t = this,
            a = wx.getSystemInfoSync();
            this.pn_getlogin(),this.getInfo(), wx.getSetting({
            success: function(a) {
                var e = a.authSetting["scope.userInfo"];
                t.setData({
                    anum: e
                });
            }
        });
    },
    getInfo: function() {
        var e = this;
        a.get("member", {
            mid: this.data.mid
        }, function(a) {
            // console.log(a);
            1 == a.isblack && wx.showModal({
                title: "无法访问",
                content: "系统升级中，不能访问！",
                success: function(a) {
                    a.confirm && e.close(), a.cancel && e.close();
                }
            }), e.setData({
                member: a,
                show: !0,
            });
        });
    },
    handleInputCname: function (c) {
        var a = this;
        a.setData({
            cname: c.detail.value
        });
 
    },
    handleInputbuilding_name: function (c) {
        var a = this;
        a.setData({
            building_name: c.detail.value
        });
       
    },
    handleInputunit_name: function (c) {
        var a = this;
        a.setData({
            unit_name: c.detail.value
        });
        
    },
    handleInputhouse_name: function (c) {
        var a = this;
        a.setData({
            house_name: c.detail.value
        });
 
    },
    submit: function () {
        var st=this.data;
        var fid=st.fid,cid=st.cid,communityName=st.communityName,cname=st.cname,building_name=st.building_name,unit_name=st.unit_name,house_name=st.house_name,mobile=st.mobile,check=st.check; 
     
        return !building_name?void wx.showToast({
            title: "请输入楼幢！",
            icon: "none",
            duration: 2e3
        }):!unit_name?void wx.showToast({
            title: "请输入单元！",
            icon: "none",
            duration: 2e3
        }):!house_name?void wx.showToast({
            title: "请输入房号！",
            icon: "none",
            duration: 2e3
        }):!cname?void wx.showToast({
            title: "请输入称呼！",
            icon: "none",
            duration: 2e3
        }):!mobile?void wx.showToast({
            title: "请选择微信手机号！",
            icon: "none",
            duration: 2e3
        }):check==null?void wx.showToast({
            title: "是否同意买家或者经纪人与你直接联系！",
            icon: "none",
            duration: 2e3
        }):a.get("zhiDing/zhiDingSubmit", {
            cid: cid,
            fid: fid,
            communityName: communityName,
            cname: cname,
            building_name: building_name,
            unit_name: unit_name,
            house_name: house_name,
            mobile: mobile,
            check: check
        }, function(t) {        
            console.log(t.data);    
            t.data=='201'?wx.showToast({
                title: "房源信息提交成功，等待客服审核！",
                icon: "none",
                duration: 2e3
            }):t.data=='202'?wx.showToast({
                title: "房源信息修改成功，等待客服审核！",
                icon: "none",
                duration: 2e3
            }):wx.showToast({
                title: "房源信息提交异常，等待客服审核！",
                icon: "none",
                duration: 2e3
            });
        });
        
    },
    pn_getlogin:function(){
        var st=this;
        wx.login({
            success: function (aa) {
                a.post("wxapp/login", {
                    code: aa.code
                }, function (dt) {                   
                    st.setData({
                        puserinfo:dt
                    })
                     
                });
            },
            fail: function () {
            a.alert("获取用户信息失败!");
            }
        });
    },
    pn_getPhoneNumber: function (e) {
        var msg = e.detail.errMsg,that = this;
        var encryptedDataStr = e.detail.encryptedData,iv = e.detail.iv,sessionID=that.data.puserinfo.session_key,pn_openid=that.data.puserinfo.openid;
     
        if (msg == 'getPhoneNumber:ok') {
            wx.checkSession({
                success: function () {                  
                    that.pn_deciyption(pn_openid,sessionID, encryptedDataStr, iv);
                },
                fail: function () {    
                    wx.login({
                            success: function (aa) {
                                a.post("wxapp/login", {
                                    code: aa.code
                                }, function (dt) {                          
                                    dt.error ? a.alert("获取用户登录态失败:" + dt.message) :that.pn_deciyption(pn_openid,dt.session_key,e.detail.encryptedData,iv);
                                });
                            }, 
                            fail: function () {
                            a.alert("获取用户信息失败!");
                            }
                        });
                    }
                });        
        }
   
    },
    pn_deciyption: function (pn_openid,sessionID, encryptedDataStr, iv) {  
        var st=this;
        a.get("wxapp/authBindphone", {
            data: encryptedDataStr,
            iv: iv,
            sessionKey: sessionID,
            pn_openid:pn_openid
        }, function (dt) {                        
            console.log(dt.phoneNumber); 
            !dt.error?st.setData({
                mobile: dt.phoneNumber
            }):a.alert("网络异常，请重新获取！");   
        });
    },

    onReady: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {}
})