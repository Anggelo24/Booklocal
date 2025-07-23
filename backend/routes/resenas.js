const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST /api/reseñas
router.post('/', async (req, res) => {
  try {
    const { id_reserva, id_cliente, calificacion, comentario } = req.body;

    if (!id_reserva || !id_cliente || !calificacion) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    await db.query(
      `INSERT INTO Reseña (id_reserva, id_cliente, calificacion, comentario, fecha)
       VALUES (?, ?, ?, ?, CURDATE())`,
      [id_reserva, id_cliente, calificacion, comentario || '']
    );

    res.status(201).json({ message: '✅ Reseña registrada correctamente' });
  } catch (err) {
    console.error('❌ Error al registrar reseña:', err);
    res.status(500).json({ error: 'Error al guardar la reseña' });
  }
});

module.exports = router;