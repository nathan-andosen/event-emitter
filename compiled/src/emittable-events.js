"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmittableEvents = (function () {
    function EmittableEvents() {
        this.events = {};
    }
    EmittableEvents.prototype.emit = function (eventName, data) {
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                var scope = (this.events[eventName][i].scope)
                    ? this.events[eventName][i].scope : null;
                this.events[eventName][i].fn.call(scope, data);
            }
        }
    };
    EmittableEvents.prototype.on = function (eventName, fn, options) {
        options = options || {};
        if (!this.events[eventName])
            this.events[eventName] = [];
        fn['onId'] = (options.uniqueId) ? options.uniqueId :
            Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        var eventFunction = {
            fn: fn,
            scope: options.scope
        };
        if (options.uniqueId) {
            var foundFunc = false;
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i].fn.onId === options.uniqueId) {
                    this.events[eventName][i] = eventFunction;
                    foundFunc = true;
                    break;
                }
            }
            if (!foundFunc)
                this.events[eventName].push(eventFunction);
        }
        else {
            this.events[eventName].push(eventFunction);
        }
    };
    EmittableEvents.prototype.off = function (eventName, fn) {
        if (fn instanceof Function && !fn['onId'])
            return;
        var onId = (typeof fn === 'string') ? fn : fn['onId'];
        if (!onId)
            return;
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i].fn.onId === onId) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    };
    EmittableEvents.prototype.offAll = function () {
        this.events = {};
    };
    return EmittableEvents;
}());
exports.EmittableEvents = EmittableEvents;
//# sourceMappingURL=emittable-events.js.map