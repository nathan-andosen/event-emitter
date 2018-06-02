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
var emittable_events_1 = require("../../src/emittable-events");
var MyClass = (function (_super) {
    __extends(MyClass, _super);
    function MyClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyClass.prototype.fireEvent = function (name, data) {
        this.emit(name, data);
    };
    return MyClass;
}(emittable_events_1.EmittableEvents));
describe('Emittable Events', function () {
    describe('on()', function () {
        it('should listen to events', function () {
            var fired = false;
            var myClass = new MyClass();
            var listener = function (data) {
                expect(data.test).toEqual(1);
                fired = true;
            };
            myClass.on('testing', listener);
            myClass.fireEvent('testing', { test: 1 });
            expect(fired).toEqual(true);
            expect(listener['onId']).toBeDefined();
        });
        it('should use unique id', function () {
            var fired = false;
            var myClass = new MyClass();
            var listener = function (data) {
                expect(data.test).toEqual(2);
                fired = true;
            };
            myClass.on('testing', listener, 'myUniqueId');
            myClass.fireEvent('testing', { test: 2 });
            expect(fired).toEqual(true);
            expect(listener['onId']).toEqual('myUniqueId');
        });
        it('should only fire event once via unique id', function () {
            var fired = 0;
            var myClass = new MyClass();
            var listener = function (data) {
                fired++;
            };
            var listenerTwo = function (data) {
                fired++;
            };
            myClass.on('testing', listener, 'myUniqueId');
            myClass.on('testing', listenerTwo, 'myUniqueId');
            myClass.fireEvent('testing', null);
            expect(fired).toEqual(1);
            expect(listener['onId']).toEqual('myUniqueId');
        });
    });
    describe('off()', function () {
        it('should stop listening to events', function () {
            var fired = 0;
            var myClass = new MyClass();
            var listener = function (data) {
                expect(data.test).toEqual(1);
                fired++;
            };
            myClass.on('testing', listener);
            myClass.fireEvent('testing', { test: 1 });
            expect(fired).toEqual(1);
            myClass.off('testing', listener);
            myClass.fireEvent('testing', { test: 1 });
            expect(fired).toEqual(1);
        });
        it('should handle function being passed in with no onId', function () {
            var fired = 0;
            var myClass = new MyClass();
            var listener = function (data) {
                expect(data.test).toEqual(1);
                fired++;
            };
            myClass.off('testing', listener);
            myClass.fireEvent('testing', { test: 1 });
            expect(fired).toEqual(0);
        });
        it('should handle string being passed in', function () {
            var fired = 0;
            var myClass = new MyClass();
            var listener = function (data) {
                expect(data.test).toEqual(1);
                fired++;
            };
            myClass.on('testing', listener, 'myId');
            myClass.fireEvent('testing', { test: 1 });
            expect(fired).toEqual(1);
            myClass.off('testing', 'myId');
            myClass.fireEvent('testing', { test: 1 });
            expect(fired).toEqual(1);
        });
    });
    describe('offAll()', function () {
        it('should stop listening to all events', function () {
            var fired = 0;
            var myClass = new MyClass();
            var listener = function (data) {
                fired++;
            };
            var listenerTwo = function (data) {
                fired++;
            };
            myClass.on('listener', listener);
            myClass.on('listenerTwo', listenerTwo);
            myClass.fireEvent('listener', null);
            myClass.fireEvent('listenerTwo', null);
            expect(fired).toEqual(2);
            myClass.offAll();
            myClass.fireEvent('listener', null);
            myClass.fireEvent('listenerTwo', null);
            expect(fired).toEqual(2);
        });
    });
});
//# sourceMappingURL=emittable-events.spec.js.map