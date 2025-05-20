const mysql = require('mysql2');
require('dotenv').config(); // 👈 Asegúrate de cargar las variables de entorno

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // 👈 Incluye el puerto
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error conectando a la base de datos:', err);
    return;
  }
  console.log('✅ Conectado a la base de datos MySQL');
});

module.exports = connection;
