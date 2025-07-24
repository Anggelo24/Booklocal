const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', async (req, res) => {
  const { id_reportante, id_profesional_reportado, motivo } = req.body;
  if (!id_reportante || !id_profesional_reportado || !motivo) {
    return res.status(400).json({ error: 'Datos incompletos para reporte.' });
  }

  let conn;
  try {
    conn = await db.getConnection();
    await conn.query(`
      INSERT INTO Reporte (id_reportante, id_profesional_reportado, motivo)
      VALUES (?, ?, ?)`,
      [id_reportante, id_profesional_reportado, motivo]
    );

    res.status(201).json({ message: 'Reporte enviado correctamente.' });
  } catch (err) {
    console.error('Error al registrar reporte:', err);
    res.status(500).json({ error: 'Error del servidor al procesar reporte.' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
