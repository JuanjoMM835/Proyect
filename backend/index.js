const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const rutas = require('./rutas'); // Importamos las rutas
app.use('/api', rutas); // Prefijo para las rutas

const PORT = 5006;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
