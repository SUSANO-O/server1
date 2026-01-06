const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configuración de la base de datos
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

// Ruta de prueba
app.get('/', async (req, res) => {
  try {
    const resDb = await pool.query('SELECT version()');
    res.json({
      status: 'Conectado',
      node_version: process.version,
      db_version: resDb.rows[0].version,
      data: 'API de textos funcionando correctamente',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Crear un nuevo texto
app.post('/api/textos', async (req, res) => {
  try {
    const { titulo, contenido } = req.body;

    if (!titulo || !contenido) {
      return res.status(400).json({ 
        error: 'Los campos titulo y contenido son requeridos' 
      });
    }

    const result = await pool.query(
      'INSERT INTO textos (titulo, contenido) VALUES ($1, $2) RETURNING *',
      [titulo, contenido]
    );

    res.status(201).json({
      message: 'Texto creado exitosamente',
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Obtener todos los textos
app.get('/api/textos', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM textos ORDER BY fecha_creacion DESC'
    );

    res.json({
      count: result.rows.length,
      data: result.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Obtener un texto por ID
app.get('/api/textos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM textos WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Texto no encontrado' });
    }

    res.json({
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Actualizar un texto
app.put('/api/textos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, contenido } = req.body;

    if (!titulo || !contenido) {
      return res.status(400).json({ 
        error: 'Los campos titulo y contenido son requeridos' 
      });
    }

    const result = await pool.query(
      'UPDATE textos SET titulo = $1, contenido = $2 WHERE id = $3 RETURNING *',
      [titulo, contenido, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Texto no encontrado' });
    }

    res.json({
      message: 'Texto actualizado exitosamente',
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Eliminar un texto
app.delete('/api/textos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM textos WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Texto no encontrado' });
    }

    res.json({
      message: 'Texto eliminado exitosamente',
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`App con Node 22 corriendo en http://localhost:${port}`);
});
