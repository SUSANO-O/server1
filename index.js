const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuración de la base de datos
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const resDb = await pool.query('SELECT version()');
    res.json({
      status: 'Conectado',
      node_version: process.version,
      db_version: resDb.rows[0].version,
      data: 'Hello World espere y vea como funciona pilas y colas',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`App con Node 22 corriendo en http://localhost:${port}`);
});
