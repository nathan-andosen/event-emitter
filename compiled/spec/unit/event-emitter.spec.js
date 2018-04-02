"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../../src");
describe('EventEmitter', function () {
    describe('emit()', function () {
        it('should emit an event', function (done) {
            var eventEmitter = new src_1.EventEmitter();
            eventEmitter.subscribe('custom-event', function (data) {
                expect(data.val).toEqual(10);
                done();
            });
            eventEmitter.emit('custom-event', { val: 10 });
        });
    });
    describe('subscribe() && unsubscribe()', function () {
        it('should subscribe and unsubscribe events', function () {
            var eventEmitter = new src_1.EventEmitter();
            var fnOne = function () { };
            eventEmitter.subscribe('test', fnOne);
            expect(eventEmitter['events']['test']).toBeDefined();
            expect(eventEmitter['events']['test'].length).toEqual(1);
            eventEmitter.unsubscribe('test', fnOne);
            expect(eventEmitter['events']['test'].length).toEqual(0);
        });
    });
});
describe('EventEmitterAbstract', function () {
    it('should extend EventEmitter and use events in another class', function () {
        var MyClass = (function (_super) {
            __extends(MyClass, _super);
            function MyClass() {
                var _this = _super.call(this) || this;
                _this.val = 0;
                _this.event.subscribe('custom-event', _this.listenForCustomEvent);
                return _this;
            }
            MyClass.prototype.listenForCustomEvent = function () {
                this.val = 10;
            };
            MyClass.prototype.doSomething = function () {
                this.event.emit('custom-event', {});
            };
            return MyClass;
        }(src_1.EventEmitterAbstract));
        var myClass = new MyClass();
        myClass.doSomething();
        expect(myClass.val).toEqual(10);
    });
});
//# sourceMappingURL=event-emitter.spec.js.map