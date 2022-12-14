import { io } from 'socket.io-client';
import { EventName } from '../../types';
import { useConstructor, useEventManager } from '../hooks';

interface IUpdateNotifierProps {
    eventName: EventName;
}

export function UpdateNotifier(props: IUpdateNotifierProps) {
    const { eventName } = props;
    const eventManager = useEventManager();
    useConstructor(async () => {
        await fetch('/api/socket');
        const socket = io();

        socket.on(eventName, () => {
            eventManager.emit(eventName);
        });
    });

    return null;
}
