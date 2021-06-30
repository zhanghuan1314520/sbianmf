Component({
  properties: {
      hasSlot: {
          type: Boolean,
          value: !1
      },
      toastType: {
          type: String,
          value: "1"
      },
      serviceLoanInfo: {
          type: Object,
          value: {}
      }
  },
  data: {},
  methods: {
      emit: function() {
          this.triggerEvent("close");
      },
      prevent: function() {}
  }
});