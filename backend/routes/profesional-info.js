const express = require('express');
const router = express.Router();
const db = require('../config/db');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const multer = require('multer');

// Middleware de autenticación usando JWT
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ error: 'Token requerido' });
  }

  // Extraer token del header "Authorization: Bearer <token>"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Acceso denegado. Token no proporcionado.',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Error verificando token:', err.message);
      return res.status(403).json({
        success: false,
        error: 'Token inválido o expirado',
      });
    }

    // Guardar los datos decodificados del token en la request
    req.user = decoded;
    next();
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/certificados'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Ruta: Obtener información del profesional
router.get('/', authenticate, async (req, res) => {
  let conn;
  try {
    const idProfesional = req.user.id_usuario;
    conn = await db.getConnection();

    const rows = await conn.query(`
      SELECT
        u.id_usuario,
        p.id_profesional,
        u.nombre,
        u.apellido,
        p.experiencia, 
        p.especialidades, 
        p.foto_perfil, 
        p.documentos_certificados
      FROM profesional p
      JOIN usuario u ON p.id_profesional = u.id_usuario 
      WHERE p.id_profesional = ?`, [idProfesional]);

    console.log('Datos obtenidos:', rows);

    if (!rows || rows.length === 0) {
      console.log('No se encontraron filas para el id_profesional:', idProfesional);
      return res.status(404).json({ 
        success: false,
        error: 'No se encontró información del profesional.' 
      });
    }

    const profesionalData = rows[0];

    console.log('Respuesta que se enviará:', {
      success: true,
      data: profesionalData
    });

    res.json({
      success: true,
      data: profesionalData
    });

  } catch (err) {
    console.error('Error al obtener información profesional:', err);
    return res.status(500).json({ 
      success: false,
      error: 'Error del servidor al obtener información profesional.' 
    });
  } finally {
    if (conn) conn.release();
  }
});

// Ruta: Obtener documentos certificados del profesional
router.post('/documentos/upload', authenticate, upload.single('documento'), async (req, res) => {
  let conn;
  let file;
  
  try {
    const idProfesional = req.user.id_usuario;
    file = req.file;
    
    if (!file) {
      return res.status(400).json({ 
        success: false,
        error: 'No se subió ningún archivo' 
      });
    }
    
    conn = await db.getConnection();
    
    // Obtener documentos actuales
    const [profesional] = await conn.query(`
      SELECT documentos_certificados 
      FROM profesional 
      WHERE id_profesional = ?`, 
      [idProfesional]);
    
    // Verificar que se encontró el profesional
    if (!profesional) {
      if (file && file.path) fs.unlinkSync(file.path);
      return res.status(404).json({
        success: false,
        error: 'Profesional no encontrado'
      });
    }
    
    // Función para parsear documentos de forma segura
    const parseDocuments = (docString) => {
      if (!docString) return [];
      
      try {
        const parsed = JSON.parse(docString);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        if (typeof docString === 'string' && 
            (docString.startsWith('http://') || docString.startsWith('https://'))) {
          return [{ ruta: docString }];
        }
        return [];
      }
    };
    
    // Parsear documentos existentes de forma segura
    const documentosActuales = parseDocuments(profesional.documentos_certificados);
    
    // Crear nuevo documento
    const nuevoDocumento = {
      id: Date.now(),
      nombre: file.originalname,
      tipo: file.mimetype,
      ruta: `/uploads/certificados/${file.filename}`,
      fechaSubida: new Date().toISOString()
    };
    
    documentosActuales.push(nuevoDocumento);
    
    // Actualizar en la base de datos
    await conn.query(`
      UPDATE profesional 
      SET documentos_certificados = ?
      WHERE id_profesional = ?`, 
      [JSON.stringify(documentosActuales), idProfesional]);
    
    res.json({
      success: true,
      data: nuevoDocumento,
      message: 'Documento subido correctamente'
    });
    
  } catch (err) {
    console.error('Error al subir documento:', err);
    
    // Limpiar archivo subido en caso de error
    if (file && file.path) {
      try {
        fs.unlinkSync(file.path);
      } catch (unlinkErr) {
        console.error('Error al eliminar archivo:', unlinkErr);
      }
    }
    
    res.status(500).json({ 
      success: false,
      error: 'Error del servidor al subir documento' 
    });
  } finally {
    if (conn) conn.release();
  }
});

// Ruta: Actualizar documentos certificados del profesional
router.get('/documentos', authenticate, async (req, res) => {
  let conn;
  try {
    const idProfesional = req.user.id_usuario;
    conn = await db.getConnection();

    const [profesional] = await conn.query(`
      SELECT documentos_certificados 
      FROM profesional 
      WHERE id_profesional = ?`, 
      [idProfesional]);

    if (!profesional) {
      return res.status(404).json({ 
        success: false,
        error: 'Profesional no encontrado' 
      });
    }

    // Función mejorada para parsear documentos
    const parseDocuments = (docString) => {
      if (!docString) return [];
      
      try {
        // Intenta parsear como JSON
        const parsed = JSON.parse(docString);
        
        // Si es array, devolverlo
        if (Array.isArray(parsed)) return parsed;
        
        // Si es objeto, convertirlo a array
        if (typeof parsed === 'object') return [parsed];
        
        return [];
      } catch (e) {
        // Si es URL directa, convertir a objeto documento
        if (typeof docString === 'string' && docString.startsWith('http')) {
          return [{
            id: Date.now(),
            ruta: docString,
            nombre: 'Documento certificado',
            tipo: 'application/octet-stream',
            fechaSubida: new Date().toISOString()
          }];
        }
        return [];
      }
    };

    const documentos = parseDocuments(profesional.documentos_certificados);
    
    console.log('Documentos a enviar:', documentos); // Debug

    res.json({
      success: true,
      data: documentos
    });

  } catch (err) {
    console.error('Error al obtener documentos:', err);
    return res.status(500).json({ 
      success: false,
      error: 'Error del servidor al obtener documentos' 
    });
  } finally {
    if (conn) conn.release();
  }
});

// Ruta: Subir un nuevo documento certificado
router.post('/documentos/upload', authenticate, upload.single('documento'), async (req, res) => {
  let conn;
  try {
    const idProfesional = req.user.id_usuario;
    file = req.file;
    
    if (!file) {
      return res.status(400).json({ 
        success: false,
        error: 'No se subió ningún archivo' 
      });
    }
    
    conn = await db.getConnection();
    
    // Obtener documentos actuales
    const [profesional] = await conn.query(`
      SELECT documentos_certificados 
      FROM profesional 
      WHERE id_profesional = ?`, 
      [idProfesional]);
    
    // Verificar que se encontró el profesional
    if (!profesional) {
      return res.status(404).json({
        success: false,
        error: 'Profesional no encontrado'
      });
    }
    
    // Maneja el caso cuando documentos_certificados es null
    const documentosActuales = profesional.documentos_certificados 
      ? JSON.parse(profesional.documentos_certificados)
      : [];
    
    // Crear nuevo documento - FIXED: usar template literal correctamente
    const nuevoDocumento = {
      id: Date.now(),
      nombre: file.originalname,
      tipo: file.mimetype,
      ruta: `/uploads/certificados/${file.filename}`, // FIXED: Template literal con backticks
      fechaSubida: new Date().toISOString()
    };
    
    documentosActuales.push(nuevoDocumento);
    
    // Actualizar en la base de datos
    await conn.query(`
      UPDATE profesional 
      SET documentos_certificados = ?
      WHERE id_profesional = ?`, 
      [JSON.stringify(documentosActuales), idProfesional]);
    
    res.json({
      success: true,
      data: nuevoDocumento,
      message: 'Documento subido correctamente'
    });
    
  } catch (err) {
    console.error('Error al subir documento:', err);
    
    // Limpiar archivo subido en caso de error
    if (req.file && req.file.path) {
      try {
        const fs = require('fs');
        fs.unlinkSync(req.file.path);
      } catch (unlinkErr) {
        console.error('Error al eliminar archivo:', unlinkErr);
      }
    }
    
    res.status(500).json({ 
      success: false,
      error: 'Error del servidor al subir documento' 
    });
  } finally {
    if (conn) conn.release();
  }
});

// Ruta: Eliminar un documento certificado
router.delete('/documentos/:id', authenticate, async (req, res) => {
  let conn;
  try {
    const idProfesional = req.user.id_usuario;
    const documentoId = parseInt(req.params.id);

    conn = await db.getConnection();

    // Obtener documentos actuales
    const [profesional] = await conn.query(`
      SELECT documentos_certificados 
      FROM profesional 
      WHERE id_profesional = ?`, 
      [idProfesional]);

    const documentosActuales = profesional.documentos_certificados 
      ? JSON.parse(profesional.documentos_certificados)
      : [];

    // Buscar el documento a eliminar
    const documentoIndex = documentosActuales.findIndex(doc => doc.id === documentoId);
    
    if (documentoIndex === -1) {
      return res.status(404).json({ 
        success: false,
        error: 'Documento no encontrado' 
      });
    }

    const documentoEliminado = documentosActuales[documentoIndex];

    // Eliminar el archivo del sistema
    if (documentoEliminado.ruta && fs.existsSync(documentoEliminado.ruta)) {
      fs.unlinkSync(documentoEliminado.ruta);
    }

    // Eliminar de la lista
    documentosActuales.splice(documentoIndex, 1);

    // Actualizar en la base de datos
    await conn.query(`
      UPDATE profesional 
      SET documentos_certificados = ?
      WHERE id_profesional = ?`, 
      [JSON.stringify(documentosActuales), idProfesional]);

    res.json({
      success: true,
      message: 'Documento eliminado correctamente'
    });

  } catch (err) {
    console.error('Error al eliminar documento:', err);
    return res.status(500).json({ 
      success: false,
      error: 'Error del servidor al eliminar documento' 
    });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
