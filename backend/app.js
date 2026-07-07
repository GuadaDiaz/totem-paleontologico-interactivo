const express = require('express');
const cors = require('cors'); 
const fossilRoutes = require('./routes/fossil');
const pool = require('./config/db'); 
require('dotenv').config();

const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// Middleware de Seguridad (CORS)
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
}));

// Middleware de Parseo
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Montaje de Rutas
app.use('/api/fossils', fossilRoutes);

// Inicialización Condicional
const startServer = async () => {
    try {
        // Ping a PostgreSQL
        const res = await pool.query('SELECT NOW()');
        console.log(`[Database] Conexión a PostgreSQL establecida: ${res.rows[0].now}`);
        
        // Si la BD responde, levantamos el servidor HTTP
        app.listen(PORT, () => {
            console.log(`[Server] Sistema del museo operando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('[Fatal Error] Imposible conectar a la base de datos. Verifica tu archivo .env y si el servicio de Postgres está encendido en Windows.', error.message);
        process.exit(1); 
    }
};

startServer();