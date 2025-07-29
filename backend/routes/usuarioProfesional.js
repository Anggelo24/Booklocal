const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    // Crear directorio si no existe
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

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB máximo
  }
})

const uploadFiles = upload.fields([
  { name: 'foto_perfil', maxCount: 1 },
  { name: 'documentos_certificados', maxCount: 10 }
]);

const authenticate = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  next();
};

//usuario a profesional
router.post('/', authenticate, uploadFiles, async (req, res) => {
  const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const requiredFields = ['bio', 'provincia', 'direccion'];
      const missingFields = requiredFields.filter(field => !req.body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: 'Campos obligatorios faltantes',
          missingFields
        });
      }

      await conn.query(`
        Update usuario
        SET tipo_usuario = 'profesional'
        WHERE id_usuario = ?`, [req.user.id_usuario]
      );

      const { bio, provincia, direccion } = req.body;
      let especialidades = [];
      let disponibilidad = [];

      try {
        especialidades = req.body.especialidades ? JSON.parse(req.body.especialidades) : [];
        disponibilidad = req.body.disponibilidad ? JSON.parse(req.body.disponibilidad) : [];
      } catch (e) {
        console.error('Error parsing JSON arrays:', e);
        throw new Error('Formato inválido para especialidades o disponibilidad');
      }
        
        const [result] = await conn.query(
          `INSERT INTO profesional (
            id_profesional, 
            experiencia, 
            especialidades, 
            horario_disponible, 
            foto_perfil, 
            documentos_certificados, 
            provincia, 
            direccion_detallada)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            req.user.id_usuario,
            bio,
            especialidades.join(','),
            disponibilidad.join(','),
            req.files['foto_perfil']?.[0]?.path || null,
            req.files['documentos_certificados']?.map(f => f.path).join(',') || null,
            provincia,
            direccion
          ]
        );

        await conn.commit();
        conn.release();

        res.status(201).json({
          success: true,
          message: 'Perfil profesional creado exitosamente',
          id_profesional: req.user.id_usuario,
          data: {
            experiencia: bio,
            especialidades,
            disponibilidad,
            provincia,
            direccion
          }
        });

    }catch (error) {
        await conn.rollback();
        conn.release();
        
      
        if (req.files) {
          Object.values(req.files).forEach(files => {
            files.forEach(file => {
              fs.unlink(file.path, () => {});
            });
          });
        }

      console.error('Error al crear perfil profesional:', error);
        res.status(500).json({ 
        error: 'Error al crear perfil profesional',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });

module.exports = router;