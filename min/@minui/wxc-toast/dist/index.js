Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = Component({
    behaviors: [],
    properties: {
        isShow: {
            type: Boolean,
            value: false,
            observer: function observer(isShow) {
                if (isShow) {
                    if (!getApp().globalData) {
                        Object.assign(getApp(), {
                            globalData: {}
                        });
                    }
                    var globalData = getApp().globalData;
                    var zIndex = (globalData._zIndex || 1e3) + 1;
                    globalData._zIndex = zIndex;
                    this.setData({
                        zIndex: zIndex
                    });
                }
            }
        },
        text: {
            type: String,
            value: ""
        },
        icon: {
            type: String,
            value: ""
        },
        iconColor: {
            type: String,
            value: ""
        },
        src: {
            type: String,
            value: ""
        },
        duration: {
            type: Number,
            value: 2e3
        }
    },
    data: {
        zIndex: 1e3
    },
    methods: {
        show: function show(message) {
            var _this = this;
            var text = this.data.text;
            if (message && typeof message === "string") {
                text = message;
            }
            var duration = this.data.duration;
            clearTimeout(this._timer);
            this.setData({
                text: text,
                isShow: true
            });
            if (duration > 0 && duration !== Infinity) {
                this._timer = setTimeout(function() {
                    _this.hide();
                    _this.triggerEvent("success", {}, {});
                }, duration);
            }
        },
        hide: function hide() {
            this._timer = clearTimeout(this._timer);
            this.setData({
                isShow: false
            });
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4YyJdLCJuYW1lcyI6WyJiZWhhdmlvcnMiLCJwcm9wZXJ0aWVzIiwiaXNTaG93IiwidHlwZSIsIkJvb2xlYW4iLCJ2YWx1ZSIsIm9ic2VydmVyIiwiZ2V0QXBwIiwiZ2xvYmFsRGF0YSIsIk9iamVjdCIsImFzc2lnbiIsInpJbmRleCIsIl96SW5kZXgiLCJzZXREYXRhIiwidGV4dCIsIlN0cmluZyIsImljb24iLCJpY29uQ29sb3IiLCJzcmMiLCJkdXJhdGlvbiIsIk51bWJlciIsImRhdGEiLCJtZXRob2RzIiwic2hvdyIsIm1lc3NhZ2UiLCJjbGVhclRpbWVvdXQiLCJfdGltZXIiLCJJbmZpbml0eSIsInNldFRpbWVvdXQiLCJoaWRlIiwidHJpZ2dlckV2ZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFNRUEsYUFBVyxFO0FBQ1hDLGNBQVk7QUFDVkMsWUFBUTtBQUNOQyxZQUFNQyxPQURBO0FBRU5DLGFBQU8sS0FGRDtBQUdOQyxjQUhNLG9CQUdHSixNQUhILEVBR1c7QUFDZixZQUFJQSxNQUFKLEVBQVk7QUFDVixjQUFJLENBQUNLLFNBQVNDLFVBQWQsRUFBMEI7QUFDeEJDLG1CQUFPQyxNQUFQLENBQWNILFFBQWQsRUFBd0IsRUFBQ0MsWUFBWSxFQUFiLEVBQXhCO0FBQ0Q7QUFDRCxjQUFJQSxhQUFhRCxTQUFTQyxVQUExQjtBQUNBLGNBQUlHLFNBQVMsQ0FBQ0gsV0FBV0ksT0FBWCxJQUFzQixJQUF2QixJQUErQixDQUE1QztBQUNBSixxQkFBV0ksT0FBWCxHQUFxQkQsTUFBckI7QUFDQSxlQUFLRSxPQUFMLENBQWE7QUFDWEYsb0JBQVFBO0FBREcsV0FBYjtBQUdEO0FBQ0Y7QUFmSyxLQURFO0FBa0JWRyxVQUFNO0FBQ0pYLFlBQU1ZLE1BREY7QUFFSlYsYUFBTztBQUZILEtBbEJJO0FBc0JWVyxVQUFNO0FBQ0piLFlBQU1ZLE1BREY7QUFFSlYsYUFBTztBQUZILEtBdEJJO0FBMEJWWSxlQUFXO0FBQ1RkLFlBQU1ZLE1BREc7QUFFVFYsYUFBTztBQUZFLEtBMUJEO0FBOEJWYSxTQUFLO0FBQ0hmLFlBQU1ZLE1BREg7QUFFSFYsYUFBTztBQUZKLEtBOUJLO0FBa0NWYyxjQUFVO0FBQ1JoQixZQUFNaUIsTUFERTtBQUVSZixhQUFPO0FBRkM7QUFsQ0EsRztBQXVDWmdCLFFBQU07QUFDSlYsWUFBUTtBQURKLEc7QUFHTlcsV0FBUztBQUNQQyxRQURPLGdCQUNGQyxPQURFLEVBQ087QUFBQTs7QUFDWixVQUFJVixPQUFPLEtBQUtPLElBQUwsQ0FBVVAsSUFBckI7QUFDQSxVQUFJVSxXQUFXLE9BQU9BLE9BQVAsS0FBbUIsUUFBbEMsRUFBNEM7QUFDeENWLGVBQU9VLE9BQVA7QUFDSDtBQUNELFVBQUlMLFdBQVcsS0FBS0UsSUFBTCxDQUFVRixRQUF6Qjs7QUFFQU0sbUJBQWEsS0FBS0MsTUFBbEI7QUFDQSxXQUFLYixPQUFMLENBQWE7QUFDWEMsY0FBTUEsSUFESztBQUVYWixnQkFBUTtBQUZHLE9BQWI7O0FBS0EsVUFBSWlCLFdBQVcsQ0FBWCxJQUFnQkEsYUFBYVEsUUFBakMsRUFBMkM7QUFDekMsYUFBS0QsTUFBTCxHQUFjRSxXQUFXLFlBQU07QUFDN0IsZ0JBQUtDLElBQUw7QUFDQSxnQkFBS0MsWUFBTCxDQUFrQixTQUFsQixFQUE2QixFQUE3QixFQUFpQyxFQUFqQztBQUNELFNBSGEsRUFHWFgsUUFIVyxDQUFkO0FBSUQ7QUFDRixLQXBCTTtBQXNCUFUsUUF0Qk8sa0JBc0JBO0FBQ0wsV0FBS0gsTUFBTCxHQUFjRCxhQUFhLEtBQUtDLE1BQWxCLENBQWQ7O0FBRUEsV0FBS2IsT0FBTCxDQUFhLEVBQUVYLFFBQVEsS0FBVixFQUFiO0FBQ0Q7QUExQk0iLCJmaWxlIjoiaW5kZXgud3hjIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtaWNvbic6ICdAbWludWkvd3hjLWljb24nXG4gICAgfVxuICB9LFxuICBiZWhhdmlvcnM6IFtdLFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgaXNTaG93OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IGZhbHNlLFxuICAgICAgb2JzZXJ2ZXIoaXNTaG93KSB7XG4gICAgICAgIGlmIChpc1Nob3cpIHtcbiAgICAgICAgICBpZiAoIWdldEFwcCgpLmdsb2JhbERhdGEpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZ2V0QXBwKCksIHtnbG9iYWxEYXRhOiB7fX0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBnbG9iYWxEYXRhID0gZ2V0QXBwKCkuZ2xvYmFsRGF0YVxuICAgICAgICAgIGxldCB6SW5kZXggPSAoZ2xvYmFsRGF0YS5fekluZGV4IHx8IDEwMDApICsgMVxuICAgICAgICAgIGdsb2JhbERhdGEuX3pJbmRleCA9IHpJbmRleFxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICB6SW5kZXg6IHpJbmRleFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHRleHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnJ1xuICAgIH0sXG4gICAgaWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcnXG4gICAgfSxcbiAgICBpY29uQ29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnJ1xuICAgIH0sXG4gICAgc3JjOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJydcbiAgICB9LFxuICAgIGR1cmF0aW9uOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICB2YWx1ZTogMjAwMFxuICAgIH1cbiAgfSxcbiAgZGF0YToge1xuICAgIHpJbmRleDogMTAwMFxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc2hvdyhtZXNzYWdlKSB7XG4gICAgICBsZXQgdGV4dCA9IHRoaXMuZGF0YS50ZXh0O1xuICAgICAgaWYgKG1lc3NhZ2UgJiYgdHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGV4dCA9IG1lc3NhZ2U7XG4gICAgICB9XG4gICAgICBsZXQgZHVyYXRpb24gPSB0aGlzLmRhdGEuZHVyYXRpb25cblxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgaXNTaG93OiB0cnVlXG4gICAgICB9KVxuXG4gICAgICBpZiAoZHVyYXRpb24gPiAwICYmIGR1cmF0aW9uICE9PSBJbmZpbml0eSkge1xuICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaGlkZSgpXG4gICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ3N1Y2Nlc3MnLCB7fSwge30pXG4gICAgICAgIH0sIGR1cmF0aW9uKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBoaWRlKCkge1xuICAgICAgdGhpcy5fdGltZXIgPSBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpXG5cbiAgICAgIHRoaXMuc2V0RGF0YSh7IGlzU2hvdzogZmFsc2UgfSlcbiAgICB9XG4gIH1cbn0iXX0=