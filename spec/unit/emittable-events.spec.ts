import { EmittableEvents } from '../../src/emittable-events';


class MyClass extends EmittableEvents {
  fireEvent(name: string, data: any) {
    this.emit(name, data);
  }
}


describe('Emittable Events', () => {

  /**
   * on()
   */
  describe('on()', () => {
    it('should listen to events', () => {
      let fired = false;
      let myClass = new MyClass();
      let listener = (data) => {
        expect(data.test).toEqual(1);
        fired = true;
      };
      myClass.on('testing', listener);
      myClass.fireEvent('testing', {test: 1});
      expect(fired).toEqual(true);
      expect(listener['onId']).toBeDefined();
    });

    it('should use unique id', () => {
      let fired = false;
      let myClass = new MyClass();
      let listener = (data) => {
        expect(data.test).toEqual(2);
        fired = true;
      };
      myClass.on('testing', listener, 'myUniqueId');
      myClass.fireEvent('testing', {test: 2});
      expect(fired).toEqual(true);
      expect(listener['onId']).toEqual('myUniqueId');
    });

    it('should only fire event once via unique id', () => {
      let fired = 0;
      let myClass = new MyClass();
      let listener = (data) => {
        fired++;
      };
      let listenerTwo = (data) => {
        fired++;
      };
      myClass.on('testing', listener, 'myUniqueId');
      myClass.on('testing', listenerTwo, 'myUniqueId');
      myClass.fireEvent('testing', null);
      expect(fired).toEqual(1);
      expect(listener['onId']).toEqual('myUniqueId');
    });
  });



  /**
   * off()
   */
  describe('off()', () => {
    it('should stop listening to events', () => {
      let fired = 0;
      let myClass = new MyClass();
      let listener = (data) => {
        expect(data.test).toEqual(1);
        fired++;
      };
      myClass.on('testing', listener);
      myClass.fireEvent('testing', {test: 1});
      expect(fired).toEqual(1);
      myClass.off('testing', listener);
      myClass.fireEvent('testing', {test: 1});
      expect(fired).toEqual(1);
    });

    it('should handle function being passed in with no onId', () => {
      let fired = 0;
      let myClass = new MyClass();
      let listener = (data) => {
        expect(data.test).toEqual(1);
        fired++;
      };
      myClass.off('testing', listener);
      myClass.fireEvent('testing', {test: 1});
      expect(fired).toEqual(0);
    });

    it('should handle string being passed in', () => {
      let fired = 0;
      let myClass = new MyClass();
      let listener = (data) => {
        expect(data.test).toEqual(1);
        fired++;
      };
      myClass.on('testing', listener, 'myId');
      myClass.fireEvent('testing', {test: 1});
      expect(fired).toEqual(1);
      myClass.off('testing', 'myId');
      myClass.fireEvent('testing', {test: 1});
      expect(fired).toEqual(1);
    });
  });




  /**
   * offAll()
   */
  describe('offAll()', () => {
    it('should stop listening to all events', () => {
      let fired = 0;
      let myClass = new MyClass();
      let listener = (data) => {
        fired++;
      };
      let listenerTwo = (data) => {
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