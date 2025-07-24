require('dotenv').config();
const db = require('./config/db');

async function testConnection() {
  try {
    const conn = await db.getConnection();
    const rows = await conn.query('SELECT 1 AS test');
    console.log('✅ Conexión exitosa:', rows);
    conn.release();
  } catch (err) {
    console.error('❌ Error en la conexión:', err);
  }
}

testConnection();