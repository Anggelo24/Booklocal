const express = require('express');
const router = express.Router();
const db = require('../config/db');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const multer = require('multer');

// Middleware de autenticación con JWT
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Token requerido o mal formado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
    req.user = decoded;
    next();
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/certificados');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Funciones utilitarias
const parseDocuments = (docString) => {
  if (!docString) return [];
  try {
    const parsed = JSON.parse(docString);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (e) {
    if (typeof docString === 'string' && docString.startsWith('http')) {
      return [{ ruta: docString }];
    }
    return [];
  }
};

// Obtener información del profesional
router.get('/', authenticate, async (req, res) => {
  let conn;
  try {
    const idProfesional = req.user.id_usuario;
    conn = await db.getConnection();

    const [profesional] = await conn.query(`
      SELECT u.id_usuario, p.id_profesional, u.nombre, u.apellido, p.experiencia, 
             p.especialidades, p.foto_perfil, p.documentos_certificados
      FROM profesional p
      JOIN usuario u ON p.id_profesional = u.id_usuario 
      WHERE p.id_profesional = ?`, [idProfesional]);

    if (!profesional) {
      return res.status(404).json({ error: 'No se encontró información del profesional' });
    }

    res.json({ success: true, data: profesional });

  } catch (err) {
    console.error('Error al obtener información profesional:', err);
    res.status(500).json({ error: 'Error del servidor' });
  } finally {
    if (conn) conn.release();
  }
});

// Obtener documentos certificados
router.get('/documentos', authenticate, async (req, res) => {
  let conn;
  try {
    const idProfesional = req.user.id_usuario;
    conn = await db.getConnection();

    const [profesional] = await conn.query(
      'SELECT documentos_certificados FROM profesional WHERE id_profesional = ?',
      [idProfesional]
    );

    if (!profesional) {
      return res.status(404).json({ error: 'Profesional no encontrado' });
    }

    const documentos = parseDocuments(profesional.documentos_certificados);
    res.json({ success: true, data: documentos });

  } catch (err) {
    console.error('Error al obtener documentos:', err);
    res.status(500).json({ error: 'Error del servidor' });
  } finally {
    if (conn) conn.release();
  }
});

// Subir documento certificado
router.post('/documentos/upload', authenticate, upload.single('documento'), async (req, res) => {
  let conn;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No se subió ningún archivo' });
  }

  try {
    const idProfesional = req.user.id_usuario;
    conn = await db.getConnection();

    const [profesional] = await conn.query(
      'SELECT documentos_certificados FROM profesional WHERE id_profesional = ?',
      [idProfesional]
    );

    if (!profesional) {
      fs.unlinkSync(file.path);
      return res.status(404).json({ error: 'Profesional no encontrado' });
    }

    const documentosActuales = parseDocuments(profesional.documentos_certificados);

    const nuevoDocumento = {
      id: Date.now(),
      nombre: file.originalname,
      tipo: file.mimetype,
      ruta: `/uploads/certificados/${file.filename}`,
      fechaSubida: new Date().toISOString()
    };

    documentosActuales.push(nuevoDocumento);

    await conn.query(
      'UPDATE profesional SET documentos_certificados = ? WHERE id_profesional = ?',
      [JSON.stringify(documentosActuales), idProfesional]
    );

    res.json({ success: true, data: nuevoDocumento, message: 'Documento subido correctamente' });

  } catch (err) {
    console.error('Error al subir documento:', err);
    if (file?.path) fs.unlinkSync(file.path);
    res.status(500).json({ error: 'Error del servidor' });
  } finally {
    if (conn) conn.release();
  }
});

// Eliminar documento certificado
router.delete('/documentos/:id', authenticate, async (req, res) => {
  let conn;
  try {
    const idProfesional = req.user.id_usuario;
    const documentoId = parseInt(req.params.id);
    conn = await db.getConnection();

    const [profesional] = await conn.query(
      'SELECT documentos_certificados FROM profesional WHERE id_profesional = ?',
      [idProfesional]
    );

    const documentos = parseDocuments(profesional.documentos_certificados);
    const index = documentos.findIndex(doc => doc.id === documentoId);

    if (index === -1) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }

    const doc = documentos[index];
    if (doc.ruta && fs.existsSync(path.join(__dirname, '..', doc.ruta))) {
      fs.unlinkSync(path.join(__dirname, '..', doc.ruta));
    }

    documentos.splice(index, 1);

    await conn.query(
      'UPDATE profesional SET documentos_certificados = ? WHERE id_profesional = ?',
      [JSON.stringify(documentos), idProfesional]
    );

    res.json({ success: true, message: 'Documento eliminado correctamente' });

  } catch (err) {
    console.error('Error al eliminar documento:', err);
    res.status(500).json({ error: 'Error del servidor' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;