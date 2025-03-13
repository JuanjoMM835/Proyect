const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./bd'); // Importamos la conexión a la base de datos

const SECRETO_JWT = 'tu_secreto_super_seguro';

// Registro de usuario
router.post('/registro', async (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  try {
      const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);
      db.query('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
          [nombre, correo, contrasenaEncriptada],
          (err, resultado) => {
              if (err) {
                  console.error("Error en la base de datos:", err);
                  res.status(500).json({ error: 'Error al registrar usuario' });
                  return;
              }

              const token = jwt.sign({ id: resultado.insertId, correo }, SECRETO_JWT, { expiresIn: '1h' });
              res.json({ token });
          }
      );
  } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// Inicio de sesión
router.post('/inicio-sesion', async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        db.query('SELECT * FROM usuarios WHERE email = ?', [correo], async (err, filas) => {
            if (err || filas.length === 0) {
                res.status(401).json({ error: 'Credenciales inválidas' });
                return;
            }
            
            const usuario = filas[0];
            const contrasenaValida = await bcrypt.compare(contrasena, usuario.password);
            if (!contrasenaValida) {
                res.status(401).json({ error: 'Credenciales inválidas' });
                return;
            }
            
            const token = jwt.sign({ id: usuario.id, correo: usuario.email }, SECRETO_JWT, { expiresIn: '1h' });
            res.json({ token });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


router.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente 🚀');
});

// Exportar las rutas
module.exports = router;



