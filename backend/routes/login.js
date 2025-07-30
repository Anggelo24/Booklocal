const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    //generar token JWT
    const token = jwt.sign(
      { 
        id_usuario: usuario.id_usuario, 
        email: usuario.correo,
        tipo_usuario: usuario.tipo_usuario},
        process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Usuario autenticado
    const { id_usuario, nombre, apellido, tipo_usuario } = usuario;

    console.log('token:', token);
    
    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        id_usuario,
        nombre,
        apellido,
        correo,
        tipo_usuario}
    });
    
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error interno al iniciar sesión' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
