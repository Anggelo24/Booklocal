// routes/reportesContables.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const PDFDocument = require('pdfkit');

router.get('/:id_profesional', async (req, res) => {
  const { id_profesional } = req.params;
  let conn;

  try {
    conn = await db.getConnection();

    // Obtener datos de pagos del profesional
    const [pagos] = await conn.query(`
      SELECT r.fecha_reserva, s.nombre AS servicio, p.monto, p.metodo_pago
      FROM Reserva r
      JOIN Pago p ON r.id_reserva = p.id_reserva
      JOIN Servicio s ON r.id_servicio = s.id_servicio
      WHERE s.id_profesional = ?
      ORDER BY r.fecha_reserva DESC
    `, [id_profesional]);

    // Si no hay pagos
    if (pagos.length === 0) {
      return res.status(404).json({ error: 'No hay pagos para este profesional' });
    }

    // Crear PDF
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="reporte-contable.pdf"');

    doc.pipe(res);

    doc.fontSize(20).text('Resumen Contable del Profesional', { align: 'center' });
    doc.moveDown();

    pagos.forEach(pago => {
      doc.fontSize(12)
        .text(`Fecha: ${new Date(pago.fecha_reserva).toLocaleDateString()}`)
        .text(`Servicio: ${pago.servicio}`)
        .text(`Monto: $${pago.monto}`)
        .text(`Método de Pago: ${pago.metodo_pago}`)
        .moveDown();
    });

    doc.end();

  } catch (err) {
    console.error('Error generando PDF:', err);
    res.status(500).json({ error: 'Error al generar el PDF' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
