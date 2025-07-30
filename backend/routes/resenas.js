const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware de autenticación mejorado
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Error en autenticación:', err.message);
    return res.status(403).json({ success: false, error: 'Token inválido o expirado' });
  }
};

// Ruta para obtener reseñas del profesional
router.get('/profesional', authenticate, async (req, res) => {
  let conn;
  try {
     const idProfesional = req.user.id_usuario;
    conn = await db.getConnection();
    
    // Consulta SQL optimizada con manejo de errores
    const query = `
      SELECT 
    CONCAT(cliente.nombre, ' ', cliente.apellido) AS cliente_completo,
    reseña.comentario,
    DATE_FORMAT(reseña.fecha, '%d/%m/%Y') AS fecha_formateada,
    servicio.nombre AS servicio,
    reseña.calificacion
    FROM 
        reseña
    JOIN 
        reserva ON reseña.id_reserva = reserva.id_reserva
    JOIN 
        servicio ON reserva.id_servicio = servicio.id_servicio
    JOIN 
        profesional ON servicio.id_profesional = profesional.id_profesional
    JOIN 
        usuario AS cliente ON reseña.id_cliente = cliente.id_usuario
    WHERE 
        profesional.id_profesional = ?
    ORDER BY 
        reseña.fecha DESC;

    `;
    
    const rows = await conn.query(query,[idProfesional]);
    console.log(`Encontradas ${rows.length} reseñas para profesional ${req.user.id_usuario}`);

    res.json({
      success: true,
      count: rows.length,
      data: rows.map(item => ({
        calificacion: Number(item.calificacion) || 0,
        comentario: item.comentario || '',
        fecha: item.fecha_formateada || '',
        cliente: item.cliente_completo || 'Cliente anónimo',
        servicio: item.servicio
      }))
    });

  } catch (err) {
    console.error('Error en GET /profesional:', {
      message: err.message,
      sqlMessage: err.sqlMessage,
      stack: err.stack
    });
    
    res.status(500).json({
      success: false,
      error: 'Error al obtener reseñas',
      details: process.env.NODE_ENV === 'development' ? {
        message: err.message,
        sql: err.sql
      } : undefined
    });
  } finally {
    if (conn) await conn.release();
  }
});

module.exports = router;