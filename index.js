const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Requerido para Render
  }
});

// Ruta para probar la base de datos
app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ msg: "Conectado a la DB con éxito", time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middlewares
app.use(cors());
app.use(express.json());

// Puerto (Usa el que da la nube o el 3000 local)
const PORT = process.env.PORT || 3000;

// Ruta base
app.get('/status', (req, res) => {
    res.json({
        msg: "Mundo Tilin API está en línea",
        status: "OK",
        author: "Tu Nombre" 
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get('/create-table', async (req, res) => {
  try {

    await pool.query(`
      CREATE TABLE IF NOT EXISTS test_users (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    res.json({
      msg: 'Tabla creada correctamente'
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
});

app.get('/insert-user', async (req, res) => {
  try {

    await pool.query(`
      INSERT INTO test_users(nombre)
      VALUES ('Alex')
    `);

    res.json({
      msg: 'Usuario insertado correctamente'
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
});

app.get('/users', async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT * FROM test_users
    `);

    res.json(result.rows);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
});