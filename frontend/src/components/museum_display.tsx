// frontend/src/App.tsx
import { useState } from 'react';
import useIdleTimeout  from '../hooks/useIdleTimeout';
import Catalog from './catalog_view';
import FossilViewer from './fossil_viewer';

type AppState = 'idle' | 'catalog' | 'detail';

export default function App() {
    const [appState, setAppState] = useState<AppState>('idle');
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // The Watchdog: 15 segundos de inactividad resetean TODO al inicio
    useIdleTimeout(15000, () => {
        console.log("[Sistema] Purgando estado por inactividad.");
        setAppState('idle');
        setSelectedId(null);
    });

    // Funciones de Transición de Estado
    const handleStartInteraction = () => setAppState('catalog');

    const handleFossilSelection = (id: number) => {
        setSelectedId(id);
        setAppState('detail');
    };

    const handleBackToCatalog = () => {
        setSelectedId(null);
        setAppState('catalog');
    };

    // Renderizado Condicional
    if (appState === 'idle') {
        return (
            <div 
            className="flex h-screen items-center justify-center bg-slate-900 cursor-pointer"
            onClick={handleStartInteraction}
            >
                <h1 className="text-5xl md:text-7xl text-white font-extrabold animate-pulse text-center px-4">
                    Toca la pantalla {' '}
                    <span className="block text-2xl mt-4 text-emerald-400 font-normal tracking-widest uppercase">
                        para explorar la exhibición
                    </span>
                </h1>
            </div>
        );
    }

    if (appState === 'catalog') {
        return (
            <div className="h-screen bg-slate-900 overflow-y-auto">
                <Catalog onSelectFossil={handleFossilSelection} />
            </div>
        );
    }

    if (appState === 'detail' && selectedId !== null) {
        return (
            <div className="h-screen bg-slate-900 flex flex-col justify-end pb-12 relative">
                <FossilViewer fossilId={selectedId} />
                
                {/* Botón flotante para retroceder */}
                <button 
                    onClick={handleBackToCatalog}
                    className="absolute top-8 left-8 px-6 py-4 bg-slate-800 text-white rounded-lg font-bold border border-slate-600 active:bg-slate-700 shadow-2xl uppercase tracking-wider"
                >
                    ← Volver al Menú
                </button>
            </div>
        );
    }

  return null; // Fallback de seguridad
}