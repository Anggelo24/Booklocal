const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', async (req, res) => {
  try {
    console.log('📩 Datos recibidos:', req.body);
    const { id_servicio, id_cliente, fecha_reserva, hora_reserva } = req.body;

    // Verificación rápida de campos requeridos
    if (!id_servicio || !id_cliente || !fecha_reserva || !hora_reserva) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const result = await db.execute(
      `INSERT INTO Reserva (id_servicio, id_cliente, fecha_reserva, hora_reserva, estado, metodo_confirmacion)
       VALUES (?, ?, ?, ?, 'pendiente', 'automática')`,
      [id_servicio, id_cliente, fecha_reserva, hora_reserva]
    );

    res.status(201).json({ id_reserva: Number(result.insertId) });
  } catch (error) {
    console.error('❌ Error al crear reserva:', error.message || error);
    res.status(500).json({ error: 'Error interno al crear la reserva' });
  }
});

router.get('/:id/monto', async (req, res) => {
  const { id } = req.params;
  let conn;
  try {
    conn = await db.getConnection();

    const rows = await conn.query(
      `SELECT s.precio
       FROM Reserva r
       JOIN Servicio s ON r.id_servicio = s.id_servicio
       WHERE r.id_reserva = ?`,
      [id]
    );

    if (rows.length === 0) return res.status(404).json({ error: 'Reserva no encontrada' });

    res.json({ monto: Number(rows[0].precio) });

  } catch (err) {
    console.error('❌ Error al obtener monto:', err);
    res.status(500).json({ error: 'Error del servidor' });
  } finally {
    if (conn) conn.release();
  }
});


module.exports = router;
