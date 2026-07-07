import { useState, useEffect } from 'react';


interface FossilDetail {
    id: number;
    name: string;
    period: string;
    description: string;
}

interface FossilViewerProps {
    fossilId: number;
}

export default function FossilViewer({ fossilId }: FossilViewerProps) {
const [fossil, setFossil] = useState<FossilDetail | null>(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    const abortController = new AbortController();
    const fetchFossilData = async () => {
        setIsLoading(true);
        setError(null);
        try {
        // Fetching los datos
        const response = await fetch(`http://localhost:3000/api/fossils/${fossilId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status} - Destination unreachable.`);
        }

        const data = await response.json();
        setFossil(data);
        } catch (err: any) {
        console.error("Data ingestion failure:", err);
        setError(err.message);
        } finally {
        setIsLoading(false); 
        }
    };

    fetchFossilData();
    return () => {
        abortController.abort();
    };
    }, [fossilId]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-48 bg-gray-900 text-white font-mono">
            <p className="animate-pulse">Cargando dataset...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-900/50 border border-red-500 rounded text-red-200 font-mono text-sm">
            <p><strong>System Exception:</strong> {error}</p>
            </div>
        );
    }

    if (!fossil) return null;

    return (
        <div className="max-w-md mx-auto bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-2xl p-6 text-slate-100">
            <header className="border-b border-slate-700 pb-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
                Catálogo de exhibición del Museo
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight mt-1">{fossil.name}</h1>
            </header>
            
            <section className="space-y-3">
            <div>
                <h2 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Periodo Cronológico</h2>
                <p className="text-sm font-medium text-slate-200 mt-0.5">{fossil.period}</p>
            </div>
            
            <div>
                <h2 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Descripción Científica</h2>
                <p className="text-sm text-slate-300 leading-relaxed mt-1 font-sans">
                {fossil.description}
                </p>
            </div>
            </section>
        </div>
    );
}