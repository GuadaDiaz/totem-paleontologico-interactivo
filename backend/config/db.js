const { Pool } = require('pg');
require('dotenv').config(); // Para cargar las credenciales desde el archivo .env

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Exportamos el pool para usarlo en los controladores
module.exports = pool;