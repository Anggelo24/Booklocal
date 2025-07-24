const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const { correo, cedula, nuevaContrasena } = req.body;

  if (!correo || !cedula || !nuevaContrasena) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  let conn;
  try {
    conn = await db.getConnection();
    const [usuario] = await conn.query(
      'SELECT * FROM Usuario WHERE correo = ? AND cedula = ?',
      [correo, cedula]
    );

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const hash = await bcrypt.hash(nuevaContrasena, 10);

    await conn.query(
      'UPDATE Usuario SET contrasena = ? WHERE id_usuario = ?',
      [hash, usuario.id_usuario]
    );

    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (err) {
    console.error('Error al actualizar contraseña:', err);
    res.status(500).json({ error: 'Error del servidor' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;