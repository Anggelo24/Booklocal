const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Login route with JWT token generation
router.post('/', async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  let conn;
  try {
    conn = await db.getConnection();

    // Find user by email
    const [usuario] = await conn.query('SELECT * FROM Usuario WHERE correo = ?', [correo]);

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Compare passwords
    const match = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!match) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generate JWT token
    const tokenPayload = {
      id_usuario: usuario.id_usuario,
      correo: usuario.correo,
      tipo_usuario: usuario.tipo_usuario,
      nombre: usuario.nombre
    };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET || 'your-secret-key', // Make sure to set JWT_SECRET in your .env file
      { expiresIn: '24h' }
    );

    // User authenticated successfully
    const { id_usuario, nombre, apellido, tipo_usuario } = usuario;

    res.json({
      message: 'Login exitoso',
      usuario: {
        id_usuario,
        nombre,
        apellido,
        correo,
        tipo_usuario
      },
      token: token
    });

  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error interno al iniciar sesión' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;