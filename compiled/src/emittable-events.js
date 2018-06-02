"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmittableEvents = (function () {
    function EmittableEvents() {
        this.events = {};
    }
    EmittableEvents.prototype.emit = function (eventName, data) {
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                this.events[eventName][i].call(null, data);
            }
        }
    };
    EmittableEvents.prototype.on = function (eventName, fn, uniqueId) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        fn['onId'] = (uniqueId) ? uniqueId :
            Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        if (uniqueId) {
            var foundFunc = false;
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i].onId === uniqueId) {
                    this.events[eventName][i] = fn;
                    foundFunc = true;
                    break;
                }
            }
            if (!foundFunc) {
                this.events[eventName].push(fn);
            }
        }
        else {
            this.events[eventName].push(fn);
        }
    };
    EmittableEvents.prototype.off = function (eventName, fn) {
        if (fn instanceof Function && !fn['onId']) {
            return;
        }
        var onId = (typeof fn === 'string') ? fn : fn['onId'];
        if (!onId) {
            return;
        }
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i]['onId'] === onId) {
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