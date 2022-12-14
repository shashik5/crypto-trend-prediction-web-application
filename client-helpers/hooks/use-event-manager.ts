import { useContext } from 'react';
import { EventManagerContext } from '../context';

export function useEventManager() {
    return useContext(EventManagerContext);
}