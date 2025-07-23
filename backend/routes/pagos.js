const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/', async (req, res) => {
  const { id_reserva, monto, metodo_pago = 'paypal' } = req.body;

  let conn;
  try {
    conn = await pool.getConnection();

    // Validar existencia reserva
    const filasReserva = await conn.query(`
      SELECT s.id_profesional
      FROM Reserva r
      JOIN Servicio s ON r.id_servicio = s.id_servicio
      WHERE r.id_reserva = ?
    `, [id_reserva]);

    const reserva = filasReserva[0];
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });

    // Obtener cuenta bancaria profesional
    const filasCuenta = await conn.query(`
      SELECT id_cuenta
      FROM Cuenta_Bancaria_Profesional
      WHERE id_profesional = ?
      LIMIT 1
    `, [reserva.id_profesional]);

    const cuenta = filasCuenta[0];
    if (!cuenta || !cuenta.id_cuenta) return res.status(400).json({ error: 'Profesional no tiene cuenta registrada' });

    // Insertar pago
    await conn.query(`
      INSERT INTO Pago (id_reserva, monto, fecha_pago, metodo_pago, id_cuenta)
      VALUES (?, ?, CURDATE(), ?, ?)
    `, [id_reserva, monto, metodo_pago, cuenta.id_cuenta]);

    res.status(200).json({ message: 'Pago registrado exitosamente' });
  } catch (error) {
    console.error('❌ Error al registrar pago:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
