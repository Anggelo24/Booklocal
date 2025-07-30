const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware de autenticación mejorado
const authenticate = (req, res, next) => {
  try {
    console.log('Headers recibidos:', req.headers);
    
    // Obtener el token de más fuentes
    const token = req.headers.authorization?.split(' ')[1] || 
                 req.headers['x-access-token'] || 
                 req.cookies?.token || 
                 req.query?.token;

    if (!token) {
      console.error('Token no recibido en:', {
        headers: req.headers,
        cookies: req.cookies,
        query: req.query
      });
      return res.status(401).json({ 
        success: false,
        error: 'Acceso denegado. Token no proporcionado.' 
      });
    }

    // Verificación más detallada del token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Error verificando token:', {
          error: err.message,
          token: token.substring(0, 10) + '...'
        });
        return res.status(403).json({ 
          success: false,
          error: 'Token inválido o expirado',
          details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
      }
      
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error('Error en middleware:', err);
    return res.status(500).json({ 
      success: false,
      error: 'Error interno de autenticación'
    });
  }
};

// Obtener servicios del profesional logueado
router.get('/', authenticate, async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        
        // Consulta optimizada para traer solo los campos necesarios
        const [servicios] = await conn.query(`
            SELECT 
                id_servicio, 
                nombre, 
                descripcion, 
                precio
            FROM servicio 
            WHERE id_profesional = ?`, 
            [req.user.id_usuario]);
        
        return res.json({ 
            success: true,
            data: servicios 
        });
        
    } catch (err) {
        console.error('Error al obtener servicios:', err);
        return res.status(500).json({ 
            success: false,
            error: 'Error al obtener servicios' 
        });
    } finally {
        if (conn) conn.release();
    }
});

// Obtener información del perfil del profesional logueado
router.get('/perfil', authenticate, async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();

        const [perfil] = await conn.query(`
            SELECT 
                nombre, 
                apellido, 
                documentos_certificados, 
                experiencia 
            FROM profesional 
            WHERE id_profesional = ?`, 
            [req.user.id_usuario]);

        return res.json({
            success: true,
            data: perfil[0] || null
        });

    } catch (err) {
        console.error('Error al obtener perfil del profesional:', err);
        return res.status(500).json({ 
            success: false,
            error: 'Error al obtener perfil del profesional' 
        });
    } finally {
        if (conn) conn.release();
    }
});


module.exports = router;