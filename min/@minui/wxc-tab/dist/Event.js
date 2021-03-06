Object.defineProperty(exports, "__esModule", {
    value: true
});

var ALL_EVENT = "__all__";

var EventProxy = function EventProxy() {
    if (!(this instanceof EventProxy)) {
        return new EventProxy();
    }
    this._callbacks = {};
    this._fired = {};
};

EventProxy.prototype.emit = function(eventname, data) {
    var list, ev, callback, i, l;
    var both = 2;
    var calls = this._callbacks;
    while (both--) {
        ev = both ? eventname : ALL_EVENT;
        list = calls[ev];
        if (list) {
            for (i = 0, l = list.length; i < l; i++) {
                callback = list[i];
                if (!callback) {
                    list.splice(i, 1);
                    i--;
                    l--;
                } else {
                    var args = [];
                    var start = both ? 1 : 0;
                    for (var j = start; j < arguments.length; j++) {
                        args.push(arguments[j]);
                    }
                    callback.apply(this, args);
                }
            }
        }
    }
    return this;
};

EventProxy.prototype.on = function(ev, callback) {
    // console.log('Add listener for %s', ev);
    this._callbacks[ev] = this._callbacks[ev] || [];
    this._callbacks[ev].push(callback);
    return this;
};

EventProxy.prototype.removeListener = function(eventname, callback) {
    var calls = this._callbacks;
    if (!eventname) {
        // debug('Remove all listeners');
        this._callbacks = {};
    } else {
        if (!callback) {
            // debug('Remove all listeners of %s', eventname);
            calls[eventname] = [];
        } else {
            var list = calls[eventname];
            if (list) {
                var l = list.length;
                for (var i = 0; i < l; i++) {
                    if (callback === list[i]) {
                        // debug('Remove a listener of %s', eventname);
                        list[i] = null;
                    }
                }
            }
        }
    }
    return this;
};

var ep = new EventProxy();

exports.default = ep;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkV2ZW50LmpzIl0sIm5hbWVzIjpbIkFMTF9FVkVOVCIsIkV2ZW50UHJveHkiLCJfY2FsbGJhY2tzIiwiX2ZpcmVkIiwicHJvdG90eXBlIiwiZW1pdCIsImV2ZW50bmFtZSIsImRhdGEiLCJsaXN0IiwiZXYiLCJjYWxsYmFjayIsImkiLCJsIiwiYm90aCIsImNhbGxzIiwibGVuZ3RoIiwic3BsaWNlIiwiYXJncyIsInN0YXJ0IiwiaiIsImFyZ3VtZW50cyIsInB1c2giLCJhcHBseSIsIm9uIiwicmVtb3ZlTGlzdGVuZXIiLCJlcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNQSxZQUFZLFNBQWxCOztBQUVBLElBQU1DLGFBQWEsU0FBYkEsVUFBYSxHQUFZO0FBQzdCLE1BQUksRUFBRSxnQkFBZ0JBLFVBQWxCLENBQUosRUFBbUM7QUFDakMsV0FBTyxJQUFJQSxVQUFKLEVBQVA7QUFDRDtBQUNELE9BQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxPQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNELENBTkQ7O0FBUUFGLFdBQVdHLFNBQVgsQ0FBcUJDLElBQXJCLEdBQTRCLFVBQVVDLFNBQVYsRUFBcUJDLElBQXJCLEVBQTJCO0FBQ3JELE1BQUlDLElBQUosRUFBVUMsRUFBVixFQUFjQyxRQUFkLEVBQXdCQyxDQUF4QixFQUEyQkMsQ0FBM0I7QUFDQSxNQUFJQyxPQUFPLENBQVg7QUFDQSxNQUFJQyxRQUFRLEtBQUtaLFVBQWpCO0FBQ0EsU0FBT1csTUFBUCxFQUFlO0FBQ2JKLFNBQUtJLE9BQU9QLFNBQVAsR0FBbUJOLFNBQXhCO0FBQ0FRLFdBQU9NLE1BQU1MLEVBQU4sQ0FBUDtBQUNBLFFBQUlELElBQUosRUFBVTtBQUNSLFdBQUtHLElBQUksQ0FBSixFQUFPQyxJQUFJSixLQUFLTyxNQUFyQixFQUE2QkosSUFBSUMsQ0FBakMsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3ZDRCxtQkFBV0YsS0FBS0csQ0FBTCxDQUFYO0FBQ0EsWUFBSSxDQUFDRCxRQUFMLEVBQWU7QUFDYkYsZUFBS1EsTUFBTCxDQUFZTCxDQUFaLEVBQWUsQ0FBZjtBQUNBQTtBQUNBQztBQUNELFNBSkQsTUFJTztBQUNMLGNBQUlLLE9BQU8sRUFBWDtBQUNBLGNBQUlDLFFBQVFMLE9BQU8sQ0FBUCxHQUFXLENBQXZCO0FBQ0EsZUFBSyxJQUFJTSxJQUFJRCxLQUFiLEVBQW9CQyxJQUFJQyxVQUFVTCxNQUFsQyxFQUEwQ0ksR0FBMUMsRUFBK0M7QUFDN0NGLGlCQUFLSSxJQUFMLENBQVVELFVBQVVELENBQVYsQ0FBVjtBQUNEO0FBQ0RULG1CQUFTWSxLQUFULENBQWUsSUFBZixFQUFxQkwsSUFBckI7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUNELFNBQU8sSUFBUDtBQUNELENBMUJEOztBQTRCQWhCLFdBQVdHLFNBQVgsQ0FBcUJtQixFQUFyQixHQUEwQixVQUFVZCxFQUFWLEVBQWNDLFFBQWQsRUFBd0I7QUFDaEQ7QUFDQSxPQUFLUixVQUFMLENBQWdCTyxFQUFoQixJQUFzQixLQUFLUCxVQUFMLENBQWdCTyxFQUFoQixLQUF1QixFQUE3QztBQUNBLE9BQUtQLFVBQUwsQ0FBZ0JPLEVBQWhCLEVBQW9CWSxJQUFwQixDQUF5QlgsUUFBekI7QUFDQSxTQUFPLElBQVA7QUFDRCxDQUxEOztBQU9BVCxXQUFXRyxTQUFYLENBQXFCb0IsY0FBckIsR0FBc0MsVUFBVWxCLFNBQVYsRUFBcUJJLFFBQXJCLEVBQStCO0FBQ25FLE1BQUlJLFFBQVEsS0FBS1osVUFBakI7QUFDQSxNQUFJLENBQUNJLFNBQUwsRUFBZ0I7QUFDZDtBQUNBLFNBQUtKLFVBQUwsR0FBa0IsRUFBbEI7QUFDRCxHQUhELE1BR087QUFDTCxRQUFJLENBQUNRLFFBQUwsRUFBZTtBQUNiO0FBQ0FJLFlBQU1SLFNBQU4sSUFBbUIsRUFBbkI7QUFDRCxLQUhELE1BR087QUFDTCxVQUFJRSxPQUFPTSxNQUFNUixTQUFOLENBQVg7QUFDQSxVQUFJRSxJQUFKLEVBQVU7QUFDUixZQUFJSSxJQUFJSixLQUFLTyxNQUFiO0FBQ0EsYUFBSyxJQUFJSixJQUFJLENBQWIsRUFBZ0JBLElBQUlDLENBQXBCLEVBQXVCRCxHQUF2QixFQUE0QjtBQUMxQixjQUFJRCxhQUFhRixLQUFLRyxDQUFMLENBQWpCLEVBQTBCO0FBQ3hCO0FBQ0FILGlCQUFLRyxDQUFMLElBQVUsSUFBVjtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBQ0Y7QUFDRCxTQUFPLElBQVA7QUFDRCxDQXZCRDs7QUF5QkEsSUFBTWMsS0FBSyxJQUFJeEIsVUFBSixFQUFYOztrQkFFZXdCLEUiLCJmaWxlIjoiRXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBTExfRVZFTlQgPSAnX19hbGxfXyc7XG5cbmNvbnN0IEV2ZW50UHJveHkgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBFdmVudFByb3h5KSkge1xuICAgIHJldHVybiBuZXcgRXZlbnRQcm94eSgpO1xuICB9XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICB0aGlzLl9maXJlZCA9IHt9O1xufTtcblxuRXZlbnRQcm94eS5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChldmVudG5hbWUsIGRhdGEpIHtcbiAgdmFyIGxpc3QsIGV2LCBjYWxsYmFjaywgaSwgbDtcbiAgdmFyIGJvdGggPSAyO1xuICB2YXIgY2FsbHMgPSB0aGlzLl9jYWxsYmFja3M7XG4gIHdoaWxlIChib3RoLS0pIHtcbiAgICBldiA9IGJvdGggPyBldmVudG5hbWUgOiBBTExfRVZFTlQ7XG4gICAgbGlzdCA9IGNhbGxzW2V2XTtcbiAgICBpZiAobGlzdCkge1xuICAgICAgZm9yIChpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGNhbGxiYWNrID0gbGlzdFtpXTtcbiAgICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICAgIGxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGktLTtcbiAgICAgICAgICBsLS07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICB2YXIgc3RhcnQgPSBib3RoID8gMSA6IDA7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IHN0YXJ0OyBqIDwgYXJndW1lbnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2pdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudFByb3h5LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldiwgY2FsbGJhY2spIHtcbiAgLy8gY29uc29sZS5sb2coJ0FkZCBsaXN0ZW5lciBmb3IgJXMnLCBldik7XG4gIHRoaXMuX2NhbGxiYWNrc1tldl0gPSB0aGlzLl9jYWxsYmFja3NbZXZdIHx8IFtdO1xuICB0aGlzLl9jYWxsYmFja3NbZXZdLnB1c2goY2FsbGJhY2spO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50UHJveHkucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50bmFtZSwgY2FsbGJhY2spIHtcbiAgdmFyIGNhbGxzID0gdGhpcy5fY2FsbGJhY2tzO1xuICBpZiAoIWV2ZW50bmFtZSkge1xuICAgIC8vIGRlYnVnKCdSZW1vdmUgYWxsIGxpc3RlbmVycycpO1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICB9IGVsc2Uge1xuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgIC8vIGRlYnVnKCdSZW1vdmUgYWxsIGxpc3RlbmVycyBvZiAlcycsIGV2ZW50bmFtZSk7XG4gICAgICBjYWxsc1tldmVudG5hbWVdID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBsaXN0ID0gY2FsbHNbZXZlbnRuYW1lXTtcbiAgICAgIGlmIChsaXN0KSB7XG4gICAgICAgIHZhciBsID0gbGlzdC5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrID09PSBsaXN0W2ldKSB7XG4gICAgICAgICAgICAvLyBkZWJ1ZygnUmVtb3ZlIGEgbGlzdGVuZXIgb2YgJXMnLCBldmVudG5hbWUpO1xuICAgICAgICAgICAgbGlzdFtpXSA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuY29uc3QgZXAgPSBuZXcgRXZlbnRQcm94eSgpO1xuXG5leHBvcnQgZGVmYXVsdCBlcDsiXX0=