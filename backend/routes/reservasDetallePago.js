// backend/routes/reservas.js (o crea uno nuevo reservasDetallePago.js si quieres)
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/:id/detalle-pago', async (req, res) => {
  console.log(`🔍 Buscando detalle de pago para reserva ${req.params.id}`);
  const { id } = req.params;
  let conn;
  try {
    conn = await pool.getConnection();

    const rows = await conn.query(`
      SELECT s.precio AS monto, c.paypal_email
      FROM Reserva r
      JOIN Servicio s ON r.id_servicio = s.id_servicio
      JOIN Cuenta_Bancaria_Profesional c ON c.id_profesional = s.id_profesional
      WHERE r.id_reserva = ?
    `, [id]);

    if (rows.length === 0) return res.status(404).json({ error: 'Reserva no encontrada' });

    res.json({ monto: Number(rows[0].monto), paypal_email: rows[0].paypal_email });
  } catch (err) {
    console.error('Error en detalle pago:', err);
    res.status(500).json({ error: 'Error del servidor' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
