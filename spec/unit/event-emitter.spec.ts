import { 
  EventEmitter,
  EventEmitterAbstract
} from '../../src';

/**
 * EventEmitter
 */
describe('EventEmitter', () => {

  /**
   * emit()
   */
  describe('emit()', () => {
    it('should emit an event', (done) => {
      let eventEmitter = new EventEmitter();
      eventEmitter.subscribe('custom-event', (data) => {
        expect(data.val).toEqual(10);
        done();
      });
      eventEmitter.emit('custom-event', { val: 10 });
    });
  });


  /**
   * subscribe() & unsubscribe();
   */
  describe('subscribe() && unsubscribe()', () => {
    it('should subscribe and unsubscribe events', () => {
      let eventEmitter = new EventEmitter();
      let fnOne = () => {};
      eventEmitter.subscribe('test', fnOne);
      expect(eventEmitter['events']['test']).toBeDefined();
      expect(eventEmitter['events']['test'].length).toEqual(1);
      eventEmitter.unsubscribe('test', fnOne);
      expect(eventEmitter['events']['test'].length).toEqual(0);
    });
  });



  describe('extend EventEmitter', () => {
    it('should be able to extend EventEmitter', (done) => {
      class AppEvents extends EventEmitter {}
      const appEvents = new AppEvents();
      class Home {
        listen() {
          appEvents.subscribe('event-1', this.listener, { scope: this });
        }

        unsubscribe() {
          appEvents.unsubscribe('event-1', this.listener);
        }

        private listener(data) {
          const val = this.sayHi();
          expect(val).toEqual('Hi');
          this.unsubscribe();
          done();
        }

        private sayHi() { return 'Hi'; }
      }
      const home = new Home();
      home.listen();
      appEvents.emit('event-1', { val: 10 });
    });
  });
});



/**
 * EventEmitterAbstract
 */
describe('EventEmitterAbstract', () => {
  it('should extend EventEmitter and use events in another class', () => {
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
    expect(myClass.val).toEqual(10);
  });
});