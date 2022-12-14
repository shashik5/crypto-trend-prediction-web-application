import { useEffect } from 'react';
import { EventName } from '../../types';
import { useEventManager } from './use-event-manager';

export function useUpdateNotifier(callback: Function) {
    const eventManager = useEventManager();
    useEffect(() => {
        eventManager.on(EventName.newUpdateAvailable, callback);
        return () => { eventManager.off(EventName.newUpdateAvailable, callback); };
    }, [callback, eventManager]);
}