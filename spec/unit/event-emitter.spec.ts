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