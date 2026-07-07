
const pool = require('../config/db');

// Función asíncrona para obtener un fósil por su ID
const getFossilById = async (req, res) => {
  const { id } = req.params; 

  try {
    // Consulta parametrizada para evitar SQL Injection (Inyección SQL)
    const query = 'SELECT * FROM fossils WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Fósil no encontrado en el catálogo.' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error en la base de datos:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

const getAllFossils = async (req, res) => {
  try {
    const query = 'SELECT id, name, period, image_url FROM fossils ORDER BY name ASC';
    const result = await pool.query(query);

    // Retornamos un array de objetos JSON
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener el catálogo:', error);
    return res.status(500).json({ error: 'Error interno del servidor al consultar el catálogo.' });
  }
};

module.exports = {
  getAllFossils,
  getFossilById,
};