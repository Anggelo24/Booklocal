const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    try{
        const conn = await db.getConnection();

        const profesionalinfo = await conn.query(`
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
            LIMIT 1`);

        conn.release();

        if (!profesionalinfo) {
            return res.status(404).json({ error: 'No se encontró información.' });
        }

        res.json(profesionalinfo);

    }catch (err) {
        console.error('Error al obtener información profesional:', err);
        return res.status(500).json({ error: 'Error del servidor al obtener información profesional.' });
    }
});

module.exports = router;
