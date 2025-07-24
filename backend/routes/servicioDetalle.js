// backend/routes/servicioDetalle.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let conn;
  try {
    conn = await db.getConnection();

    const [servicio] = await conn.query(`
    SELECT 
      s.*, 
      u.nombre AS profesional_nombre, 
      u.apellido, 
      u.telefono, 
      u.correo, 
      u.fecha_registro,
      p.foto_perfil,
      p.direccion_detallada
      FROM Servicio s
      JOIN Profesional p ON s.id_profesional = p.id_profesional
      JOIN Usuario u ON u.id_usuario = p.id_profesional
      WHERE s.id_servicio = ?
    `, [id]);

    if (!servicio) return res.status(404).json({ error: 'Servicio no encontrado' });

    const paquetes = await conn.query(`
      SELECT id_servicio AS id, nombre, precio, descripcion
      FROM Servicio
      WHERE id_profesional = ?
      ORDER BY nombre ASC
    `, [servicio.id_profesional]);

    const reseñas = await conn.query(`
      SELECT r.calificacion, r.comentario, r.fecha, u.nombre, u.apellido
      FROM Reseña r
      JOIN Reserva res ON r.id_reserva = res.id_reserva
      JOIN Usuario u ON r.id_cliente = u.id_usuario
      WHERE res.id_servicio = ?
    `, [id]);

    const promedio =
      reseñas.length > 0
        ? reseñas.reduce((sum, r) => sum + r.calificacion, 0) / reseñas.length
        : null;

    res.json({
      ...servicio,
      paquetes,
      reseñas,
      rating: promedio ? parseFloat(promedio.toFixed(1)) : null,
      total_reviews: reseñas.length,
      profesional: {
        name: `${servicio.profesional_nombre} ${servicio.apellido}`,
        photo: servicio.foto_perfil || '/images/pro1.jpg',
        direccion: servicio.direccion_detallada,
        joined: servicio.fecha_registro
          ? new Date(servicio.fecha_registro).toLocaleDateString('es-PA', {
              year: 'numeric',
              month: 'long'
            })
          : 'Fecha desconocida'
      }
    });

  } catch (err) {
    console.error('Error al obtener servicio:', err);
    res.status(500).json({ error: 'Error del servidor' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;