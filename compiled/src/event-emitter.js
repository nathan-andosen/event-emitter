"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = (function () {
    function EventEmitter(scope) {
        this.events = {};
        this.events = {};
        this.scope = (scope) ? scope : null;
    }
    EventEmitter.prototype.generateId = function () {
        return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5))
            .toUpperCase();
    };
    EventEmitter.prototype.emit = function (eventName, data) {
        var events = this.events[eventName];
        if (events) {
            for (var i = 0; i < events.length; i++) {
                var scope = (this.scope) ? this.scope : this;
                if (events[i].scope) {
                    scope = events[i].scope;
                }
                events[i].fn.call(scope, data);
            }
        }
    };
    EventEmitter.prototype.subscribe = function (eventName, fn, options) {
        options = options || {};
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        fn['subscribeId'] = (options.uniqueId)
            ? options.uniqueId : this.generateId();
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
    EventEmitter.prototype.unsubscribe = function (eventName, fn) {
        if (fn instanceof Function && !fn['subscribeId']) {
            return;
        }
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i].fn['subscribeId'] === fn['subscribeId']) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
var EventEmitterAbstract = (function () {
    function EventEmitterAbstract() {
        this.event = null;
        this.event = new EventEmitter(this);
    }
    return EventEmitterAbstract;
}());
exports.EventEmitterAbstract = EventEmitterAbstract;
//# sourceMappingURL=event-emitter.js.map