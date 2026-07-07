// frontend/src/components/Catalog.tsx
import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface FossilSummary { 
    id: number; 
    name: string; 
    period: string;
    image_url: string; 
}
interface CatalogProps { onSelectFossil: (id: number) => void; }

export default function Catalog({ onSelectFossil }: CatalogProps) {
    const [fossils, setFossils] = useState<FossilSummary[]>([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [isFetchingCatalog, setIsFetchingCatalog] = useState(true);

    useEffect(() => {
        const fetchCatalog = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/fossils/');
            if (!response.ok) throw new Error('Data ingestion failed.');
            const data = await response.json();
            setFossils(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsFetchingCatalog(false);
        }
        };
        fetchCatalog();
    }, []);

    const debouncedSelection = useDebounce((id: number) => {
        onSelectFossil(id);
        setIsLoading(false);
    }, 300);

    const handleFossilClick = (id: number) => {
        setIsLoading(true);
        debouncedSelection(id);
    };

    if (isFetchingCatalog) return <div className="text-white text-center py-20 font-mono animate-pulse">Iniciando sistema...</div>;

    // Efecto glass
    return (
        <div className="min-h-screen relative flex flex-col p-12">
        {/* GLOBAL BACKGROUND */}
        <div className="absolute inset-0 bg-[url('/museum-bg.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay z-0 pointer-events-none"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/90 via-slate-900/60 to-slate-900/90 z-0 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
            <header className="mb-12 border-l-4 border-emerald-500 pl-6">
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400 uppercase tracking-widest drop-shadow-lg">
                Catálogo Patrimonial
            </h2>
            <p className="text-slate-300 mt-3 text-xl font-light">Toque un espécimen para desplegar la planimetría tridimensional y datos de registro.</p>
            </header>
            
            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {fossils.map((fossil) => (
                <button
                key={fossil.id}
                disabled={isLoading}
                onClick={() => handleFossilClick(fossil.id)}
                // GLASSMORPHISM
                className={`group relative overflow-hidden rounded-3xl transition-all duration-500 text-left border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
                    ${isLoading ? 'opacity-40 cursor-wait' : 'bg-slate-800/40 backdrop-blur-md hover:bg-slate-700/60 hover:-translate-y-2 hover:shadow-emerald-500/20 hover:border-emerald-500/50'}`
                }
                >
                <div className="h-64 w-full relative overflow-hidden bg-black/50">
                    {fossil.image_url ? (
                    <img 
                        src={`http://localhost:3000${fossil.image_url}`} 
                        alt={fossil.name} 
                        className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                    ) : (
                    <div className="flex items-center justify-center w-full h-full text-slate-500 font-mono">ASSET MISSING</div>
                    )}
                    {/* Gradiente interno para la imagen de los fósiles */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                </div>

                <div className="p-8 relative z-10">
                    <h3 className="text-3xl font-extrabold text-white group-hover:text-emerald-300 transition-colors duration-300 drop-shadow-md">
                        {fossil.name}
                    </h3>
                    <div className="flex items-center mt-3 space-x-3">
                        <span className="h-px w-8 bg-emerald-500"></span>
                        <p className="text-slate-300 font-mono text-sm uppercase tracking-widest">
                            {fossil.period}
                        </p>
                    </div>
                </div>
                </button>
            ))}
            </div>
        </div>
        </div>
    );
}