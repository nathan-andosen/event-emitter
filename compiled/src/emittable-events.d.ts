export interface iEmittableEventsOnOptions {
    uniqueId?: string;
    scope?: any;
}
export declare abstract class EmittableEvents {
    private events;
    protected emit(eventName: string, data?: any): void;
    on(eventName: string, fn: (data: any) => void, options?: iEmittableEventsOnOptions): void;
    off(eventName: string, fn: ((data: any) => void) | string): void;
    offAll(): void;
}
