![Test Coverage-shield-badge-1](https://img.shields.io/badge/Test%20Coverage-100%25-brightgreen.svg)

# EventEmitter

Simple service used to emit and subscribe to events.

# How to use

``npm install @thenja/event-emitter``

## Installation

### Typescript

```javascript
import { EventEmitter } from '@thenja/event-emitter';
let eventEmitter = new EventEmitter();
```

### Javascript (browser)

```javascript
<script src="dist/event-emitter.min.js" type="text/javascript"></script>
var eventEmitter = new EventEmitter();
```

## Methods

|Method|Description|
|------|-----------|
|emit(eventName: string, data: any)|Emit the event to any subscribers|
|subscribe(eventName: string, fn: Function)|Subscribe to an event, the function will be called once the event is emitted|
|unsubscribe(eventName: string, fn: Function)|Unsubscribe from an event|

## Use cases & examples

### Use as a service

This will be handy if you need a publish and subscribe service for an entire application, you will probably create the EventEmitter class as a singleton for this.

```javascript
import { EventEmitter } from '@thenja/event-emitter';

let eventEmitter = new EventEmitter();
let fnOne = (data) => {
  console.log('custom-event fired with value: ' + data.val);
};
eventEmitter.subscribe('custom-event', fnOne);
eventEmitter.emit('custom-event', { val: 10 });
eventEmitter.unsubscribe('custom-event', fnOne);
```

### Use abstract class

A class that extends the EventEmitterAbstract class will basically have a
property (_this.event_) exposed which is just an instance of the EventEmitter class. Useful if you want to emit and listen to events inside of a class.

```javascript
import { EventEmitterAbstract } from '@thenja/event-emitter';

class MyClass extends EventEmitterAbstract {
  public val: number = 0;

  constructor() {
    super();
    this.event.subscribe('custom-event', this.listenForCustomEvent);
  }

  private listenForCustomEvent() {
    this.val = 10;
  }

  doSomething() {
    this.event.emit('custom-event', {});
  }
}

let myClass = new MyClass();
myClass.doSomething();
// Now myClass.val should equal 10
```

### Use the emittable events abstract class

This is useful if you have a service (normally a singleton) that is used throughout your application and you want to be able to emit events from the service.

```javascript
import { EmittableEvents } from '@thenja/event-emitter';

class UserService extends EmittableEvents {
  addUser(username: string) {
    // perform some functionality to add a user
    // ...
    // now emit an event
    this.emit('user-added', { username: username });
  }
}

// normally a service is a singleton used throughout an application
let userSrv = new UserService();
let userAdded = (data) => {
  // event is fired when a user is added
};
userSrv.on('user-added', userAdded);
userSrv.addUser('nathan');
userSrv.off('user-added', userAdded);
```


# Development

``npm run init`` - Setup the app for development (run once after cloning)

``npm run dev`` - Run this command when you want to work on this app. It will
compile typescript, run tests and watch for file changes.

## Distribution

``npm run build -- -v <version>`` - Create a distribution build of the app.

__-v (version)__ - _[Optional]_ Either "patch", "minor" or "major". Increase
the version number in the package.json file.

The build command creates a _/compiled_ directory which has all the javascript
compiled code and typescript definitions. As well, a _/dist_ directory is 
created that contains a minified javascript file.

## Testing

_Tests are automatically ran when you do a build._

``npm run test`` - Run the tests. The tests will be ran in a nodejs environment.
You can run the tests in a browser environment by opening the file 
_/spec/in-browser/SpecRunner.html_.


# License

MIT © [Nathan Anderson](https://github.com/nathan-andosen)