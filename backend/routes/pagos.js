const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { id_reserva, monto, metodo_pago = 'paypal' } = req.body;

  let conn;
  try {
    conn = await pool.getConnection();

    // 1) Validar existencia reserva y obtener info relacionada para el email
    const [reservaData] = await conn.query(`
      SELECT 
        r.fecha_reserva, r.hora_reserva, 
        s.nombre AS nombre_servicio, s.precio,
        p.provincia, p.direccion_detallada,
        u.nombre AS nombre_cliente, u.apellido AS apellido_cliente, u.correo AS correo_cliente,
        prof.correo AS correo_profesional, prof.nombre AS nombre_profesional,
        cbp.paypal_email
      FROM Reserva r
      JOIN Servicio s ON r.id_servicio = s.id_servicio
      JOIN Profesional p ON s.id_profesional = p.id_profesional
      JOIN Usuario u ON r.id_cliente = u.id_usuario
      JOIN Usuario prof ON p.id_profesional = prof.id_usuario
      JOIN Cuenta_Bancaria_Profesional cbp ON p.id_profesional = cbp.id_profesional
      WHERE r.id_reserva = ?
      LIMIT 1
    `, [id_reserva]);

    if (!reservaData) return res.status(404).json({ error: 'Reserva no encontrada' });
    if (!reservaData.paypal_email) return res.status(400).json({ error: 'Profesional no tiene PayPal registrado' });

    // 2) Obtener cuenta bancaria profesional
    const [cuentaData] = await conn.query(`
      SELECT id_cuenta
      FROM Cuenta_Bancaria_Profesional
      WHERE id_profesional = (
        SELECT id_profesional FROM Servicio WHERE id_servicio = (
          SELECT id_servicio FROM Reserva WHERE id_reserva = ?
        )
      )
      LIMIT 1
    `, [id_reserva]);

    if (!cuentaData || !cuentaData.id_cuenta) return res.status(400).json({ error: 'Profesional no tiene cuenta registrada' });

    // 3) Insertar pago
    await conn.query(`
      INSERT INTO Pago (id_reserva, monto, fecha_pago, metodo_pago, id_cuenta)
      VALUES (?, ?, CURDATE(), ?, ?)
    `, [id_reserva, monto, metodo_pago, cuentaData.id_cuenta]);

    // 4) Preparar transporter nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // o el host SMTP que uses
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // correo emisor desde .env
        pass: process.env.EMAIL_PASS, // password o app password
      }
    });

    // 5) Email al profesional
    const emailHtmlProfesional = `
      <h2>Factura de pago</h2>
      <p>Estimado(a) ${reservaData.nombre_profesional},</p>
      <p>Se ha registrado un pago por un servicio prestado.</p>

      <h3>Detalles del Pago</h3>
      <ul>
        <li><strong>Servicio:</strong> ${reservaData.nombre_servicio}</li>
        <li><strong>Monto:</strong> $${monto.toFixed(2)}</li>
        <li><strong>Fecha de pago:</strong> ${new Date().toLocaleDateString()}</li>
        <li><strong>Método de pago:</strong> ${metodo_pago}</li>
      </ul>

      <h3>Detalles de la Reserva</h3>
      <ul>
        <li><strong>Fecha reserva:</strong> ${new Date(reservaData.fecha_reserva).toLocaleDateString()}</li>
        <li><strong>Hora reserva:</strong> ${reservaData.hora_reserva}</li>
        <li><strong>Dirección del servicio:</strong> ${reservaData.direccion_detallada}, ${reservaData.provincia}</li>
      </ul>

      <h3>Cliente</h3>
      <p>${reservaData.nombre_cliente} ${reservaData.apellido_cliente} - ${reservaData.correo_cliente}</p>

      <p>Gracias por usar nuestra plataforma.</p>
    `;

        try {
          await transporter.sendMail({
            from: `"BookLocal" <${process.env.EMAIL_USER}>`,
            to: reservaData.correo_profesional,
            subject: `Factura de Pago - Servicio ${reservaData.nombre_servicio}`,
            html: emailHtmlProfesional,
          });
          console.log('Correo enviado al profesional:', reservaData.correo_profesional);
      } catch (err) {
          console.error('Error enviando correo al profesional:', err);
      }
      
    // 6) Email al cliente
    const emailHtmlCliente = `
      <h2>Confirmación de Pago</h2>
      <p>Estimado(a) ${reservaData.nombre_cliente} ${reservaData.apellido_cliente},</p>
      <p>Hemos recibido el pago por el servicio: <strong>${reservaData.nombre_servicio}</strong>.</p>

      <h3>Detalles del Pago</h3>
      <ul>
        <li><strong>Monto pagado:</strong> $${monto.toFixed(2)}</li>
        <li><strong>Fecha de pago:</strong> ${new Date().toLocaleDateString()}</li>
        <li><strong>Método de pago:</strong> ${metodo_pago}</li>
      </ul>

      <h3>Detalles de la Reserva</h3>
      <ul>
        <li><strong>Fecha reserva:</strong> ${new Date(reservaData.fecha_reserva).toLocaleDateString()}</li>
        <li><strong>Hora reserva:</strong> ${reservaData.hora_reserva}</li>
        <li><strong>Dirección del servicio:</strong> ${reservaData.direccion_detallada}, ${reservaData.provincia}</li>
        <li><strong>Correo del profesional:</strong> ${reservaData.correo_profesional}</li>
      </ul>

      <p>Gracias por confiar en nuestra plataforma.</p>
    `;

    await transporter.sendMail({
      from: `"BookLocal" <${process.env.EMAIL_USER}>`,
      to: reservaData.correo_cliente,
      subject: `Confirmación de Pago - Servicio ${reservaData.nombre_servicio}`,
      html: emailHtmlCliente,
    });

    res.status(200).json({ message: 'Pago registrado y correos enviados exitosamente' });

  } catch (error) {
    console.error('❌ Error al registrar pago y enviar correos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
