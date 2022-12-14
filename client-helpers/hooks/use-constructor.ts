import { useEffect, useRef } from 'react';

export function useConstructor(callback: Function) {
    const executionStatusRef = useRef(false);
    useEffect(() => {
        if (executionStatusRef.current) {
            return;
        }
        executionStatusRef.current = true;
        callback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}