const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const conn = await db.getConnection();
    const servicios = await conn.query(`
      SELECT s.id_servicio, s.nombre, s.descripcion, s.precio, s.imagen_destacada,
             u.nombre AS profesional, u.apellido, u.telefono
      FROM Servicio s
      JOIN Profesional p ON s.id_profesional = p.id_profesional
      JOIN Usuario u ON u.id_usuario = p.id_profesional
      LIMIT 10
    `);
    conn.release();
    res.json(servicios);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener servicios' });
  }
});

module.exports = router;
