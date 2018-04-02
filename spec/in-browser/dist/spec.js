/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


// Our webpack.unit.tests.config.js file uses this to require all unit test files
// so they can be tested in a browser for debugging

// require all test files
var testsContext = __webpack_require__(1);
testsContext.keys().forEach(testsContext);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./event-emitter.spec": 2
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 1;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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
var src_1 = __webpack_require__(3);
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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(4));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = (function () {
    function EventEmitter(scope) {
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
                events[i].call(this.scope, data);
            }
        }
    };
    EventEmitter.prototype.subscribe = function (eventName, fn) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        fn['subscribeId'] = this.generateId();
        this.events[eventName].push(fn);
    };
    EventEmitter.prototype.unsubscribe = function (eventName, fn) {
        if (!fn['subscribeId']) {
            return;
        }
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i]['subscribeId'] === fn['subscribeId']) {
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


/***/ })
/******/ ]);
//# sourceMappingURL=spec.js.map