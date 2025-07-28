require('dotenv').config();
const mariadb = require('mariadb');

console.log('🔧 Cargando configuración desde .env:', {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
});

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 5
});

async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('✅ Conexión exitosa a la base de datos');
  } catch (err) {
    console.error('❌ Error al conectar:', err);
  } finally {
    if (conn) conn.release();
  }
}

testConnection();
