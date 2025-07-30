const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Navigate } = require('react-router-dom');

// Configuración de multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
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
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes'), false);
    }
  }
});

router.post('/', upload.single('imagen_destacada'), async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const { id_profesional, nombre, descripcion, precio, id_categoria } = req.body;

    // Validación de campos
    if (!id_profesional || !nombre || !descripcion || !precio || !id_categoria) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Manejo de la imagen
    let imagenDestacada = null;
    if (req.file) {
      imagenDestacada = req.file.path;
    }

    // Insertar en la base de datos
    const result = await conn.query(
      `INSERT INTO servicio 
       (id_profesional, nombre, descripcion, precio, imagen_destacada, estado_servicio, id_categoria)
       VALUES (?, ?, ?, ?, ?, 'activo', ?)`,
      [id_profesional, nombre, descripcion, precio, imagenDestacada, id_categoria]
    );

    await conn.commit();
    
    // Convertir BigInt a string para evitar problemas de serialización
    const responseData = {
      message: 'Servicio publicado exitosamente',
      id_servicio: result.insertId.toString() // Convertir a string
    };
    
    return res.status(201).json(responseData);
    
  } catch (error) {
    await conn.rollback();
    console.error('Error al publicar servicio:', error);
    
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    return res.status(500).json({ 
      error: 'Error al publicar servicio',
      details: error.message 
    });
  } finally {
    conn.release();
  }
});

module.exports = router;