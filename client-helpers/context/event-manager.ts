import { createContext } from 'react';
import { EventManager } from '../../utils/event-manager';
import { EventName } from '../../types';

export const EventManagerContext = createContext(new EventManager<EventName>());