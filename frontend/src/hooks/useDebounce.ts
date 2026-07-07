// frontend/src/hooks/useDebounce.ts
import { useRef, useEffect, useCallback } from 'react';

export function useDebounce<T extends (...args: any[]) => void>(
    callback: T,
    delayMs: number
    ) {
    // We use a ref to store the timer ID without causing re-renders
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debouncedFunction = useCallback(
        (...args: Parameters<T>) => {
            // If the user taps again, we destroy the previous pending timer
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        
            // We set a new timer. The callback only fires if the user stops tapping for 'delayMs'
            timerRef.current = setTimeout(() => {
                callback(...args);
            }, delayMs);
        },[callback, delayMs]
    );

    // Formal Memory Leak Prevention: Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    return debouncedFunction;
}