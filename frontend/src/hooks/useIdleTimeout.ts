// frontend/src/hooks/useIdleTimeout.ts
import { useEffect, useRef } from 'react';

// Tipado formal: timeoutMs DEBE ser un número, onIdleCallback DEBE ser una función que no retorna nada (void)
export default function useIdleTimeout(timeoutMs: number, onIdleCallback: () => void) {
  // Tipamos la referencia para que acepte el ID del temporizador nativo del navegador
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const resetTimer = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            onIdleCallback(); 
        }, timeoutMs);
    };

    const events = ['touchstart', 'click', 'scroll'];

    events.forEach((event) => {
        window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        events.forEach((event) => {
            window.removeEventListener(event, resetTimer);
        });
    };
    }, [timeoutMs, onIdleCallback]); 
}