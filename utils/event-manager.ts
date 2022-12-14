
export class EventManager<T = string> {

    private eventsMap = new Map<T, Function[]>();

    on = (eventName: T, handler: Function) => {
        if (!this.isHandlerExists(eventName, handler)) {
            const handlers = this.eventsMap.get(eventName) || [];
            this.eventsMap.set(eventName, [...handlers, handler]);
        }
        return this;
    };

    emit = (eventName: T, ...args: any[]) => {
        if (!this.eventsMap.has(eventName)) {
            return false;
        }
        this.eventsMap
            .get(eventName)?.forEach((handler: Function) => setTimeout(() => handler(...args), 0));
        return true;
    };

    off = (eventName: T, handler: Function) => {
        if (this.isHandlerExists(eventName, handler)) {
            const handlers = this.eventsMap.get(eventName) ?? [];
            this.eventsMap.set(eventName, handlers.filter(h => h !== handler));
        }
        return this;
    };

    private isHandlerExists(eventName: T, handler: Function) {
        const handlers = this.eventsMap.get(eventName);
        return !!handlers && handlers.includes(handler);
    }
}

export function getEventManager<T = string>() {
    return new EventManager<T>();
}
