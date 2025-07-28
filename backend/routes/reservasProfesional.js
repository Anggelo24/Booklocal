// routes/reservasProfesional.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/profesional/:id/reservas
router.get('/:id/reservas', async (req, res) => {
  const { id } = req.params;
  let conn;
  try {
    conn = await db.getConnection();
    const reservas = await conn.query(`
        SELECT 
            r.id_reserva, 
            u.nombre, 
            u.apellido, 
            u.correo, 
            DATE_FORMAT(r.fecha_reserva, '%Y-%m-%d') AS fecha_reserva,
            r.hora_reserva,
            r.estado
        FROM Reserva r
        JOIN Usuario u ON r.id_cliente = u.id_usuario
        JOIN Servicio s ON r.id_servicio = s.id_servicio
        WHERE s.id_profesional = ? AND r.estado = 'pendiente'
        ORDER BY r.fecha_reserva DESC
        `, [id]);

    res.json(reservas);
  } catch (err) {
    console.error('❌ Error al obtener reservas del profesional:', err);
    res.status(500).json({ error: 'Error al consultar reservas del profesional' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;