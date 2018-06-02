/**
 * A class that will add the ability to emit events for listening
 *
 * @export
 * @abstract
 * @class EmittableEvents
 */
export abstract class EmittableEvents {
  // our subscribed functions listening to emitted events
  private events: { [key: string]: any[] } = {};


  /**
   * Emit an event from the service
   *
   * @private
   * @param {string} eventName
   * @param {*} [data]
   * @memberof ServiceWithEvents
   */
  protected emit(eventName: string, data?: any) {
    if(this.events[eventName]) {
      for(let i = 0; i < this.events[eventName].length; i++) {
        this.events[eventName][i].call(null, data);
      }
    }
  }


  /**
   * Listen to events the service will emit
   *
   * @param {string} eventName
   * @param {(data: any) => void} fn
   * @param {string} [uniqueId] 
   * @memberof EmittableEvents
   */
  on(eventName: string, fn: (data: any) => void, uniqueId?: string) {
    if(!this.events[eventName]) { this.events[eventName] = []; }
    fn['onId'] = (uniqueId) ? uniqueId : 
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    if(uniqueId) {
      // does the function already exist that is listening to this event
      let foundFunc = false;
      for(let i = 0; i < this.events[eventName].length; i++) {
        if(this.events[eventName][i].onId === uniqueId) {
          this.events[eventName][i] = fn;
          foundFunc = true;
          break;
        }
      }
      if(!foundFunc) {
        this.events[eventName].push(fn);
      }
    } else {
      this.events[eventName].push(fn);
    }
  }


  /**
   * Stop listening to events the service can emit
   *
   * @param {string} eventName
   * @param {(data: any) => void} fn
   * @returns
   * @memberof ServiceWithEvents
   */
  off(eventName: string, fn: ((data: any) => void) | string) {
    if(fn instanceof Function && !fn['onId']) {
      return;
    }
    let onId = (typeof fn === 'string') ? fn : fn['onId'];
    if(!onId) { return; }
    if(this.events[eventName]) {
      for(let i = 0; i < this.events[eventName].length; i++) {
        if(this.events[eventName][i]['onId'] === onId) {
          this.events[eventName].splice(i, 1); break;
        }
      }
    }
  }


  /**
   * Stop listening to all events
   *
   * @memberof EmittableEvents
   */
  offAll() {
    this.events = {};
  }
}