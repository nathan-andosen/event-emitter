export interface iEmittableEventsOnOptions {
  uniqueId?: string;
  scope?: any;
}

interface iEventFunction {
  fn: Function | any;
  scope?: any;
}

/**
 * A class that will add the ability to emit events for listening
 *
 * @export
 * @abstract
 * @class EmittableEvents
 */
export abstract class EmittableEvents {
  // our subscribed functions listening to emitted events
  private events: { [key: string]: iEventFunction[] } = {};


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
        let scope = (this.events[eventName][i].scope) 
          ? this.events[eventName][i].scope : null;
        this.events[eventName][i].fn.call(scope, data);
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
  on(eventName: string, fn: (data: any) => void, 
  options?: iEmittableEventsOnOptions) {
    options = options || {};
    if(!this.events[eventName]) this.events[eventName] = [];
    fn['onId'] = (options.uniqueId) ? options.uniqueId : 
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    let eventFunction: iEventFunction = {
      fn: fn,
      scope: options.scope 
    };
    if(options.uniqueId) {
      // does the function already exist that is listening to this event
      let foundFunc = false;
      for(let i = 0; i < this.events[eventName].length; i++) {
        if(this.events[eventName][i].fn.onId === options.uniqueId) {
          this.events[eventName][i] = eventFunction;
          foundFunc = true;
          break;
        }
      }
      if(!foundFunc) this.events[eventName].push(eventFunction);
    } else {
      this.events[eventName].push(eventFunction);
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
    if(fn instanceof Function && !fn['onId']) return;
    let onId = (typeof fn === 'string') ? fn : fn['onId'];
    if(!onId) return;
    if(this.events[eventName]) {
      for(let i = 0; i < this.events[eventName].length; i++) {
        if(this.events[eventName][i].fn.onId === onId) {
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