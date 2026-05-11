const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

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