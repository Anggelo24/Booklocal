// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta pública para acceder a imágenes o archivos subidos
app.use('/images', express.static(path.join(__dirname, 'images')));

// Rutas API
const reportesRoutes = require('./routes/reportes');
app.use('/api/reportes', reportesRoutes);

const resetPasswordRoutes = require('./routes/reset-password');
app.use('/api/reset-password', resetPasswordRoutes);

const serviciosRoutes = require('./routes/servicios');
app.use('/api/servicios', serviciosRoutes);

const servicioDetalleRoutes = require('./routes/servicioDetalle');
app.use('/api/servicio', servicioDetalleRoutes);

const categoriasRoutes = require('./routes/categorias');
app.use('/api/categorias', categoriasRoutes);

const provinciasRoutes = require('./routes/provincias');
app.use('/api/provincias', provinciasRoutes);

const serviciosDisponiblesRoutes = require('./routes/serviciosDisponibles');
app.use('/api/servicios-disponibles', serviciosDisponiblesRoutes);

const usuariosRoutes = require('./routes/usuarios');
app.use('/api/usuarios', usuariosRoutes);

const pagosRoutes = require('./routes/pagos');
app.use('/api/pagos', pagosRoutes);

const loginRoutes = require('./routes/login');
app.use('/api/login', loginRoutes);

const reservasRoutes = require('./routes/reservas');
app.use('/api/reservas', reservasRoutes);

const reservasDetallePagoRoutes = require('./routes/reservasDetallePago'); 
app.use('/api/reservas', reservasDetallePagoRoutes);

const reservasProfesionalRoutes = require('./routes/reservasProfesional');
app.use('/api/profesional', reservasProfesionalRoutes);

const resenasRoutes = require('./routes/resenas');
app.use('/api/resenas', resenasRoutes);

const contactoRoutes = require('./routes/contacto');
app.use('/api/contacto', contactoRoutes);

const reporteContableRoutes = require('./routes/reportesContables');
app.use('/api/reporte-contable', reporteContableRoutes);

// Ruta de prueba para verificar que el servidor responde
app.get('/api/ping', (req, res) => {
  res.json({ message: 'API activa y funcionando ' });
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(` Servidor corriendo en http://0.0.0.0:${PORT}`);
});


