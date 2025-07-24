// routes/serviciosDisponibles.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const conn = await db.getConnection();
    const servicios = await conn.query(`
      SELECT DISTINCT nombre
      FROM Servicio
      WHERE estado_servicio = 'activo'
      ORDER BY nombre
    `);
    conn.release();
    res.json(servicios);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ error: 'Error al obtener servicios' });
  }
});

module.exports = router;
