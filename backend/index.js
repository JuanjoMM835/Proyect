const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno

const app = express();

// Configuración de CORS
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
  exposedHeaders: ['Authorization']
}));

// Middleware para JSON
app.use(express.json());

// Conexión a la base de datos
const db = require('./bd'); // Asegúrate de que el archivo se llame 'db.js'

// Rutas
const rutas = require('./rutas');
app.use('/api', rutas);

// Iniciar servidor
const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
