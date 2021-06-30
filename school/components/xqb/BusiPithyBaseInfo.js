
Component({
    properties: {
        items: {
            type: Object,
            default: function() {}
        },
        rankNum: {
            type: Number,
            default: 6
        },
        lotteryFlag: {
            type: Number,
            default: 0
        },
        isCorrect: {
            type: Boolean,
            default: !1
        },
        isPK: {
            type: Boolean,
            default: !0
        },
        skeletons: {
            type: Boolean,
            default: !1
        },
        isSearch: {
            type: [ String, Number ],
            default: 0
        }
        
    },
    data: {
        informations: {},
        is_load: !1,
        isShowPhoto:true,
        lotteryFlag:1
    },
    observers: {
       
    },
    lifetimes: {},
    methods: {
        load_data: function(e) {
            var n = this;
            
        },
       
    }
});