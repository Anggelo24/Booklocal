// routes/provincias.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const conn = await db.getConnection();
    const provincias = await conn.query(`
      SELECT DISTINCT provincia
      FROM Profesional
      WHERE provincia IS NOT NULL
      ORDER BY provincia
    `);
    conn.release();
    res.json(provincias);
  } catch (error) {
    console.error('Error al obtener provincias:', error);
    res.status(500).json({ error: 'Error al obtener provincias' });
  }
});

module.exports = router;
