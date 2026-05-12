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