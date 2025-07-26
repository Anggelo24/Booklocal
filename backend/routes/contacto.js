const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST /api/contacto
router.post('/', async (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;

  if (!nombre || !email || !asunto || !mensaje) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    await db.query(`
      INSERT INTO Mensaje_Contacto (nombre, email, asunto, mensaje)
      VALUES (?, ?, ?, ?)
    `, [nombre, email, asunto, mensaje]);

    res.status(201).json({ message: 'Mensaje guardado exitosamente' });
  } catch (error) {
    console.error('❌ Error al guardar mensaje de contacto:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
