const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();

    const servicios = await conn.query(`
      SELECT 
        s.id_servicio,
        s.descripcion,
        s.precio,
        s.imagen_destacada,
        s.id_categoria,
        c.nombre AS categoria_nombre,
        c.icono AS categoria_icono,
        u.nombre AS profesional,
        u.apellido,
        u.telefono,
        p.provincia,
        IFNULL(ROUND(AVG(r.calificacion), 1), 5.0) AS calificacion_promedio,
        COUNT(r.id_reseña) AS total_reviews
      FROM Servicio s
      JOIN Profesional p ON s.id_profesional = p.id_profesional
      JOIN Usuario u ON p.id_profesional = u.id_usuario
      LEFT JOIN Categoria c ON s.id_categoria = c.id_categoria
      LEFT JOIN Reserva res ON res.id_servicio = s.id_servicio
      LEFT JOIN Reseña r ON r.id_reserva = res.id_reserva
      WHERE s.estado_servicio = 'activo'
      GROUP BY s.id_servicio
      ORDER BY s.id_servicio DESC
      LIMIT 12;
    `);

    console.log('✅ Servicios consultados:', servicios.length);
const parsedServicios = servicios.map((s) => {
  const result = {};
  for (let key in s) {
    const value = s[key];
    result[key] = typeof value === 'bigint' ? Number(value) : value;
  }
  return result;
});

res.json(parsedServicios);

res.json(parsedServicios);
  } catch (err) {
    console.error('❌ Error al consultar servicios:', err);
    res.status(500).json({ error: 'Error al obtener servicios' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
