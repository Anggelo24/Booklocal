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
      ORDER BY s.id_servicio DESC;
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
  } catch (err) {
    console.error('❌ Error al consultar servicios:', err);
    res.status(500).json({ error: 'Error al obtener servicios' });
  } finally {
    if (conn) conn.release();
  }
});

router.get('/categoria/:id_categoria', async (req, res) => {
  const { id_categoria } = req.params;
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
      WHERE s.estado_servicio = 'activo' AND s.id_categoria = ?
      GROUP BY s.id_servicio
      ORDER BY s.id_servicio DESC;
    `, [id_categoria]);

    const parsedServicios = servicios.map((s) => {
      const result = {};
      for (let key in s) {
        result[key] = typeof s[key] === 'bigint' ? Number(s[key]) : s[key];
      }
      return result;
    });

    res.json(parsedServicios);
  } catch (err) {
    console.error('❌ Error al obtener servicios por categoría:', err);
    res.status(500).json({ error: 'Error al obtener servicios' });
  } finally {
    if (conn) conn.release();
  }
});

router.get('/filtrar', async (req, res) => {
  const { provincia, servicio, calificacion, precioMin = 0, precioMax = 999999 } = req.query;
  let conn;

  try {
    conn = await db.getConnection();

    const rows = await conn.query(`
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
        AND s.precio BETWEEN ? AND ?
        ${provincia ? 'AND p.provincia = ?' : ''}
      GROUP BY s.id_servicio
      HAVING calificacion_promedio >= ?
      ORDER BY s.id_servicio DESC;
    `,
      [
        precioMin,
        precioMax,
        ...(provincia ? [provincia] : []),
        ...(servicio ? [`%${servicio}%`, `%${servicio}%`] : []),
        calificacion ? Number(calificacion) : 0
      ]
    );

    const parsed = rows.map(row => {
      const result = {};
      for (let key in row) {
        result[key] = typeof row[key] === 'bigint' ? Number(row[key]) : row[key];
      }
      return result;
    });

    res.json(parsed);
  } catch (err) {
    console.error('❌ Error en filtro:', err);
    res.status(500).json({ error: 'Error al obtener servicios filtrados' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
