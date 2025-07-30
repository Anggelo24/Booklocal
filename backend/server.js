// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Import JWT middleware
const { authenticate, optionalAuth, requireRole } = require('./routes/auth');

// Middlewares
app.use(cors());
app.use(express.json());

// Verify JWT_SECRET is set
if (!process.env.JWT_SECRET) {
  console.warn('⚠️  JWT_SECRET not set in environment variables. Using default (not secure for production)');
}

// Ruta pública para acceder a imágenes o archivos subidos
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Public routes (no authentication required)
const loginRoutes = require('./routes/login');
app.use('/api/login', loginRoutes);

const usuariosRoutes = require('./routes/usuarios'); // Registration
app.use('/api/usuarios', usuariosRoutes);

const resetPasswordRoutes = require('./routes/reset-password');
app.use('/api/reset-password', resetPasswordRoutes);

const contactoRoutes = require('./routes/contacto');
app.use('/api/contacto', contactoRoutes);

// Public service routes (can be viewed without authentication)
const serviciosDisponiblesRoutes = require('./routes/serviciosDisponibles');
app.use('/api/servicios-disponibles', serviciosDisponiblesRoutes);

const serviciosRoutes = require('./routes/servicios');
app.use('/api/servicios', serviciosRoutes);

const servicioDetalleRoutes = require('./routes/servicioDetalle');
app.use('/api/servicio', servicioDetalleRoutes);

const categoriasRoutes = require('./routes/categorias');
app.use('/api/categorias', categoriasRoutes);

const provinciasRoutes = require('./routes/provincias');
app.use('/api/provincias', provinciasRoutes);

// Protected routes (authentication required)
const reservasRoutes = require('./routes/reservas');
app.use('/api/reservas', authenticate, reservasRoutes);

const reservasDetallePagoRoutes = require('./routes/reservasDetallePago'); 
app.use('/api/reservas-detalle', authenticate, reservasDetallePagoRoutes);

const reservasProfesionalRoutes = require('./routes/reservasProfesional');
app.use('/api/profesional', authenticate, reservasProfesionalRoutes);

const resenasRoutes = require('./routes/resenas');
app.use('/api/resenas', authenticate, resenasRoutes);

const pagosRoutes = require('./routes/pagos');
app.use('/api/pagos', authenticate, pagosRoutes);

// Admin/Professional only routes
const reportesRoutes = require('./routes/reportes');
app.use('/api/reportes', authenticate, requireRole('admin', 'profesional'), reportesRoutes);

const reporteContableRoutes = require('./routes/reportesContables');
app.use('/api/reporte-contable', authenticate, requireRole('admin', 'profesional'), reporteContableRoutes);

// Ruta de prueba para verificar que el servidor responde
app.get('/api/ping', (req, res) => {
  res.json({ message: 'API activa y funcionando ' });
});

// These routes might be causing the issue - let's add them with error handling
try {
  const publicarServicioRoutes = require('./routes/publicar-servicio');
  app.use('/api/publicar-servicio', publicarServicioRoutes);
} catch (error) {
  console.error('Error loading publicar-servicio routes:', error.message);
}

try {
  const profesionalServiciosRoutes = require('./routes/profesionalServicios');
  app.use('/api/profesional-servicios', profesionalServiciosRoutes);
} catch (error) {
  console.error('Error loading profesionalServicios routes:', error.message);
}

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
});