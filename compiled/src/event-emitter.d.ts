export interface iSubscribeOptions {
    uniqueId?: string;
    scope?: any;
}
export declare class EventEmitter {
    private events;
    private scope;
    constructor(scope?: any);
    private generateId();
    emit(eventName: string, data?: any): void;
    subscribe(eventName: string, fn: Function, options?: iSubscribeOptions): void;
    unsubscribe(eventName: string, fn: Function): void;
}
export declare abstract class EventEmitterAbstract {
    protected event: EventEmitter;
    constructor();
}
