const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Ruta para registrar un nuevo usuario (cliente)
router.post('/', async (req, res) => {
  const {
    cedula,
    nombre,
    apellido,
    correo,
    telefono,
    contrasena,
    tipo_usuario = 'cliente' // por defecto cliente
  } = req.body;

  // Validación básica
  if (!cedula || !nombre || !apellido || !correo || !contrasena) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  let conn;
  try {
    conn = await db.getConnection();

    // Verifica si ya existe ese correo o cédula
    const [existe] = await conn.query(
      'SELECT * FROM Usuario WHERE correo = ? OR cedula = ?',
      [correo, cedula]
    );

    if (existe) {
      return res.status(409).json({ error: 'El correo o la cédula ya están registrados' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Insertar nuevo usuario
    await conn.query(
      `INSERT INTO Usuario 
        (cedula, nombre, apellido, correo, telefono, contrasena, tipo_usuario) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [cedula, nombre, apellido, correo, telefono || null, hashedPassword, tipo_usuario]
    );

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error('❌ Error al registrar usuario:', err);
    res.status(500).json({ error: 'Error interno al registrar' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
