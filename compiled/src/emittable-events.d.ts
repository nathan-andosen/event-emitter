export declare abstract class EmittableEvents {
    private events;
    protected emit(eventName: string, data?: any): void;
    on(eventName: string, fn: (data: any) => void, uniqueId?: string): void;
    off(eventName: string, fn: ((data: any) => void) | string): void;
    offAll(): void;
}
