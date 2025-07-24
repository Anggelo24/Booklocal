const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Ruta de login
router.post('/', async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  let conn;
  try {
    conn = await db.getConnection();

    // Buscar al usuario por correo
    const [usuario] = await conn.query('SELECT * FROM Usuario WHERE correo = ?', [correo]);

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Comparar contraseñas
    const match = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!match) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Usuario autenticado
    const { id_usuario, nombre, apellido, tipo_usuario } = usuario;

    res.json({
      message: 'Login exitoso',
      usuario: {
        id_usuario,
        nombre,
        apellido,
        correo,
        tipo_usuario
      }
    });

  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error interno al iniciar sesión' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
