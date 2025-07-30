const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// Configuración mejorada de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
}).fields([
  { name: 'foto_perfil', maxCount: 1 },
  { name: 'documentos_certificados', maxCount: 10 }
]);

// Middleware de autenticación mejorado
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
      }
      
      if (!decoded.id_usuario) {
        return res.status(401).json({ error: 'Token no contiene información de usuario válida' });
      }

      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error('Error en autenticación:', err);
    return res.status(500).json({ error: 'Error de autenticación' });
  }
};

// Ruta para convertir usuario a profesional
router.post('/', authenticate, (req, res, next) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'Error al subir archivos: ' + err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const requiredFields = ['bio', 'provincia', 'direccion', 'especialidades', 'disponibilidad'];
      const missingFields = requiredFields.filter(field => !req.body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: 'Campos obligatorios faltantes',
          missingFields
        });
      }

      // Convertir a profesional
      await conn.query(
        `UPDATE usuario SET tipo_usuario = 'profesional' WHERE id_usuario = ?`, 
        [req.user.id_usuario]
      );

      // Procesamiento de arrays
      let especialidades = [];
      let disponibilidad = [];
      
      try {
        // Handle especialidades - could be stringified array or already an array
        if (typeof req.body.especialidades === 'string') {
          especialidades = JSON.parse(req.body.especialidades);
        } else if (Array.isArray(req.body.especialidades)) {
          especialidades = req.body.especialidades;
        } else {
          throw new Error('Formato inválido para especialidades');
        }

        // Handle disponibilidad - same approach
        if (typeof req.body.disponibilidad === 'string') {
          disponibilidad = JSON.parse(req.body.disponibilidad);
        } else if (Array.isArray(req.body.disponibilidad)) {
          disponibilidad = req.body.disponibilidad;
        } else {
          throw new Error('Formato inválido para disponibilidad');
        }

        if (!Array.isArray(especialidades) || !Array.isArray(disponibilidad)) {
          throw new Error('Los campos especialidades y disponibilidad deben ser arrays');
        }
      } catch (e) {
        return res.status(400).json({
          error: 'Error procesando los datos de entrada',
          details: e.message
        });
      }

      // Insertar datos profesionales
      await conn.query(
        `INSERT INTO profesional (
          id_profesional, 
          experiencia, 
          especialidades, 
          horario_disponible, 
          foto_perfil, 
          documentos_certificados, 
          provincia, 
          direccion_detallada
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          req.user.id_usuario,
          req.body.bio,
          especialidades.join(','),
          disponibilidad.join(','),
          req.files['foto_perfil']?.[0]?.filename || null,
          req.files['documentos_certificados']?.map(f => f.filename).join(',') || null,
          req.body.provincia,
          req.body.direccion
        ]
      );

      await conn.commit();

      return res.status(201).json({
        success: true,
        message: 'Perfil profesional creado exitosamente',
        profesional: {
          id: req.user.id_usuario,
          experiencia: req.body.bio,
          especialidades,
          disponibilidad,
          provincia: req.body.provincia,
          direccion: req.body.direccion
        }
      });

    } catch (error) {
      await conn.rollback();
      
      // Limpiar archivos subidos en caso de error
      if (req.files) {
        Object.values(req.files).forEach(files => {
          if (files) {
            files.forEach(file => {
              if (file.path) {
                fs.unlinkSync(file.path);
              }
            });
          }
        });
      }

      console.error('Error detallado:', error);
      return res.status(500).json({ 
        error: 'Error al crear perfil profesional',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    } finally {
      if (conn) conn.release();
    }
  });
});

module.exports = router;