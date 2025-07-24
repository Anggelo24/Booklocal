const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const conn = await db.getConnection();

    const categorias = await conn.query(`
      SELECT c.id_categoria, c.nombre AS categoria, c.icono, COUNT(s.id_servicio) AS total_servicios
      FROM Categoria c
      LEFT JOIN Servicio s ON s.id_categoria = c.id_categoria AND s.estado_servicio = 'activo'
      GROUP BY c.id_categoria, c.nombre, c.icono
      ORDER BY total_servicios DESC
    `);

    conn.release();

    const categoriasFormateadas = categorias.map(c => ({
      id_categoria: c.id_categoria,
      categoria: c.categoria,
      icono: c.icono,
      total_servicios: Number(c.total_servicios)
    }));

    res.json(categoriasFormateadas);
  } catch (error) {
    console.error('Error en /api/categorias:', error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});



module.exports = router;

