const express = require('express');
const router = express.Router();
const db = require('../config/db');
const PDFDocument = require('pdfkit');
const axios = require('axios');

router.get('/:id_profesional', async (req, res) => {
  const { id_profesional } = req.params;
  let conn;

  try {
    conn = await db.getConnection();

    const pagos = await conn.query(`
      SELECT r.fecha_reserva, s.nombre AS servicio, p.monto, p.metodo_pago
      FROM Reserva r
      JOIN Pago p ON r.id_reserva = p.id_reserva
      JOIN Servicio s ON r.id_servicio = s.id_servicio
      WHERE s.id_profesional = ?
      ORDER BY r.fecha_reserva DESC
    `, [id_profesional]);

    if (pagos.length === 0) {
      return res.status(404).json({ error: 'No hay pagos para este profesional' });
    }

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="reporte-contable.pdf"');
    doc.pipe(res);

    // ✅ Cargar logo desde Cloudinary (o cualquier URL)
    const logoUrl = 'https://res.cloudinary.com/db3espoei/image/upload/v1753819153/imagen_2025-07-29_145843517-removebg-preview_jytj3x.png';
    try {
      const response = await axios.get(logoUrl, { responseType: 'arraybuffer' });
      const logoBuffer = Buffer.from(response.data, 'binary');
      doc.image(logoBuffer, 50, 40, { width: 100 });
    } catch (err) {
      console.warn('⚠️ No se pudo cargar el logo desde URL:', err.message);
    }

    // Título
    doc.fontSize(18).text('Reporte Contable Mensual', 0, 50, { align: 'center', fontWeight: 'bolder' });
    doc.fontSize(10).text(`Generado el ${new Date().toLocaleDateString()}`, { align: 'center' });
    doc.moveDown(4);

    // Tabla
    const tableTop = doc.y;
    const col1 = 50;
    const col2 = 130;
    const col3 = 300;
    const col4 = 430;
    const rowHeight = 20;

    doc.font('Helvetica-Bold');
    doc.text('Fecha', col1, tableTop);
    doc.text('Servicio', col2, tableTop);
    doc.text('Método', col3, tableTop);
    doc.text('Monto ($)', col4, tableTop);
    doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();
    doc.font('Helvetica');

    let y = tableTop + 20;
    let total = 0;

    pagos.forEach(pago => {
      if (y > 700) {
        doc.addPage();
        y = 50;
      }

      const fecha = new Date(pago.fecha_reserva).toLocaleDateString();
      const monto = parseFloat(pago.monto).toFixed(2);
      total += parseFloat(monto);

      doc.text(fecha, col1, y);
      doc.text(pago.servicio, col2, y);
      doc.text(pago.metodo_pago, col3, y);
      doc.text(`$${monto}`, col4, y);
      y += rowHeight;
    });

    doc.moveTo(50, y + 5).lineTo(550, y + 5).stroke();
    doc.font('Helvetica-Bold');
    doc.text('Total:', col3, y + 10);
    doc.text(`$${total.toFixed(2)}`, col4, y + 10);

    doc.end();

  } catch (err) {
    console.error('Error generando PDF:', err);
    res.status(500).json({ error: 'Error al generar el PDF' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
