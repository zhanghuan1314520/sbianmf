
function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}
var e = getApp(), t = e.requirejs("core");
Page({
    data: {
        member:{},
        uname: "",
        mobile: "",
        wxname: "",
        qrcode:"",
    
        period:"1年",
        organization:"",
        cid:"",
        title:"",
        tempFilePaths: "",
        reasonIndex: 0,
        images: [],
        imgs: [],
        wxchat_img: "",
        uploads2: 1,
        other1:"",
        other1images: "",
        other1imgs: "",
        other2:"",
        other2images: "",
        other2imgs: "",
        cid:"",
        community:{},
        userinfo:{},
        show: !0,
        ad_type:'',
     

    },
    onLoad: function(a) {
        
        var st=this;
        
        var ad_type=a.ad_type;
        if(!ad_type)
        {
            ad_type="楼盘";
        }
       
        st.setData({
            cid:a.cid,
            ad_type:ad_type
        });
    },
    onShow: function() {
        this.getUserInfo(), this.getInfo();
    },
    getInfo: function () {
        var e = this;
        t.get("member", {}, function (a) {         
            1 == a.isblack && wx.showModal({
                title: "无法访问",
                content: "系统升级中，不能访问！",
                success: function (a) {
                    a.confirm && e.close(), a.cancel && e.close();
                }
            }), 0 != a.error ? wx.redirectTo({
                url: "/pages/message/auth/index"
            }) : e.setData({
                member: a,
                show: !0,
                iscycelbuy: a.iscycelbuy,
                bargain: a.bargain
            });
        });
    },
    getUserInfo: function () {
        var e = this;
        t.get("Guwen/get_guweninfo", {
            cid: e.data.cid,
            ad_type: e.data.ad_type
        }, function (a) {
            
            e.setData({
                uname: a.userinfo.uname,
                mobile: a.userinfo.mobile,
                wxname: a.userinfo.wxname, 
                organization: a.userinfo.organization,
                cid: a.community.id,
                title: a.community.title,
                imgs:a.userinfo.images,
                other1imgs: a.userinfo.other1imgs,
                other2imgs: a.userinfo.other2imgs
            })
             
        });
    },
    _input: function (dt) {
        var e = dt.currentTarget.dataset.name, o = dt.detail.value;
        this.setData(a({}, e, o));
    },
    postMsg: function (e) {
        var st=this;       
        var userinfo=e.detail.value;    
        console.log(st.data.period);


        if (userinfo.uname.length<2 || userinfo.organization.length<2 ||  userinfo.mobile.length<10 ||  userinfo.wxname.length<5){
            t.toast("以上都为必填！");
            return;
        } 
        
       /***
        console.log(st.data.imgs.length, st.data.imgs)
        
       if (st.data.imgs.length < 2){
            t.toast("二维码图片必须上传哦");
            return;
        }
        
        if (st.data.other1imgs.length < 2 && st.data.other2imgs.length < 2) {
            t.toast("名片和工牌2选1");
            return;
        }****/
  
        t.get("Guwen/get_guwenadd", {
            avatar: st.data.member.avatar,
            organization:userinfo.organization,
            uname: userinfo.uname,
            mobile:userinfo.mobile,
            wxname:userinfo.wxname,
            title:userinfo.title,
            period: st.data.period,
            cid:st.data.cid,
            imgs:st.data.imgs,
            other1imgs:st.data.other1imgs,
            ad_type:st.data.ad_type,
            other2imgs:st.data.other2imgs,
        }, function (a) {
            if (a.msg =="OK"){
                t.alert("已提交申请，请联系客服开通！");
                st.setData({
                    show: !1,
                })
            }else{
                t.alert(a.msg);
            }

        });
        
    },
    previewImage: function (t) {
        var a = t.currentTarget.dataset.url, e = [];
        "dingyue" == t.currentTarget.dataset.type ? e.push(a) : e = this.data.huxing.photos,
            wx.previewImage({
                current: a,
                urls: e
            });
    },
    copyText: function (e) {
        wx.setClipboardData({
            data: e.currentTarget.dataset.text,
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        setTimeout(function () {
                            // 获取 chart 实例的方式
                            a.alert("手边买房微信号已复制,快去添加好友，拉群讨论吧！");
                        }, 100);

                    }
                })
            }
        })
    },
    typeChange: function (a) {
        var periodd  = a.currentTarget.dataset.period;
        this.setData({
            period: periodd
        });
    },
    foucs4: function() {
        this.setData({
            focus4: !0
        });
    },
    upload: function (e) {
        //console.log(e);
        //console.log(t.data(e));
        var a = this, r = t.data(e), i = r.type, o = a.data.images, s = a.data.imgs, n = r.index;
        //console.log(i);
        t.upload(function (e) {   
            console.log(e);  
            if (i =="weixin_img") {     
                a.setData({
                    images: e.filename,
                    imgs: e.filename             
                });

               

            } else if (i == "other1_img"){
                a.setData({
                    other1images: e.filename,
                    other1imgs: e.filename
                });
           
            } else if (i == "other2_img"){
                a.setData({
                    other2images: e.filename,
                    other2imgs: e.filename
                });
 
            }
        }) ;
    },


    gwadd1: function (a) {
        wx.navigateTo({
            url: '/house/guwen/refund/index',
        })
    },
});