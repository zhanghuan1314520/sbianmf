Component({
  properties: {
      selOption: {
          type: Array,
          value: []
      },
      value: {
          type: Array,
          value: [ 0 ]
      },
      showSelf: {
          type: Boolean,
          value: !0
      },
      title: {
          type: String,
          value: "自定义利率"
      }
  },
  data: {
      showComponent: !1,
      selected: null
  },
  attached: function() {
      var e = this;
      setTimeout(function() {
          e.setData({
              showComponent: !0
          });
      }, 0);
  },
  methods: {
      changeOption: function(e) {
          this.setData({
              selected: e.detail.value
          });
      },
      cancelClick: function() {
          this.triggerEvent("close");
      },
      sureClick: function(e, t) {
          this.triggerEvent("sureClick", {
              sel: this.data.selected || this.data.value,
              addSel: t
          });
      },
      addNewOption: function(e) {
          var t = e.detail.value.new;
          t && (this.setData({
              selected: [ this.data.selOption.length ]
          }), this.sureClick(e, t));
      }
  }
});