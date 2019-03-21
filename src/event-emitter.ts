export interface iSubscribeOptions {
  uniqueId?: string;
  scope?: any;
}

interface iEventFunction {
  fn: Function | any;
  scope?: any;
}

/**
 * EventEmitter, emit and subscribe to events.
 * 
 * @export
 * @class EventEmitter
 */
export class EventEmitter {
  private events: { [key: string]: iEventFunction[] } = {};
  private scope: any;

  
  /**
   * Creates an instance of EventEmitter.
   * @param {*} [scope] The scope "this" will apply to
   * @memberof EventEmitter
   */
  constructor(scope?: any) {
    this.events = {};
    this.scope = (scope) ? scope : null;
  }


  /**
   * Generate a id
   * 
   * @private
   * @returns {string} 
   * @memberof EventEmitter
   */
  private generateId(): string {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5))
      .toUpperCase()
  }


  /**
   * Emit an event
   * 
   * @param {string} eventName 
   * @param {*} data 
   * @memberof EventEmitter
   */
  emit(eventName: string, data?: any) {
    const events = this.events[eventName];
    if(events) {
      for(let i = 0; i < events.length; i++) {
        let scope = (this.scope) ? this.scope : this;
        if(events[i].scope) {
          scope = events[i].scope;
        }
        events[i].fn.call(scope, data);
      }
    }
  }


  /**
   * Subscribe to an event
   * 
   * @param {string} eventName 
   * @param {Function} fn 
   * @memberof EventEmitter
   */
  subscribe(eventName: string, fn: Function, options?: iSubscribeOptions) {
    options = options || {};
    if(!this.events[eventName]) { this.events[eventName] = []; }
    fn['subscribeId'] = (options.uniqueId) 
      ? options.uniqueId : this.generateId();
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
   * Unsubscribe to an event
   * 
   * @param {string} eventName 
   * @param {Function} fn 
   * @memberof EventEmitter
   */
  unsubscribe(eventName: string, fn: Function) {
    if(fn instanceof Function && !fn['subscribeId']) { return; }
    if(this.events[eventName]) {
      for(let i = 0; i < this.events[eventName].length; i++) {
        if(this.events[eventName][i].fn['subscribeId'] === fn['subscribeId']) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  }
}


/**
 * An abstract class that can be extend to add the ability to emit and 
 * subscribe to custom events
 * 
 * @export
 * @abstract
 * @class EventEmitterAbstract
 */
export abstract class EventEmitterAbstract {
  protected event: EventEmitter = null;
  
  constructor() {
    this.event = new EventEmitter(this);
  }
}
