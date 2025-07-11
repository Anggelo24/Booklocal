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
const resetPasswordRoutes = require('./routes/reset-password');
app.use('/api/reset-password', resetPasswordRoutes);

const serviciosRoutes = require('./routes/servicios');
app.use('/api/servicios', serviciosRoutes);

const categoriasRoutes = require('./routes/categorias');
app.use('/api/categorias', categoriasRoutes);

const provinciasRoutes = require('./routes/provincias');
app.use('/api/provincias', provinciasRoutes);

const serviciosDisponiblesRoutes = require('./routes/serviciosDisponibles');
app.use('/api/servicios-disponibles', serviciosDisponiblesRoutes);

const usuariosRoutes = require('./routes/usuarios');
app.use('/api/usuarios', usuariosRoutes);

const loginRoutes = require('./routes/login');
app.use('/api/login', loginRoutes);

// Ruta de prueba para verificar que el servidor responde
app.get('/api/ping', (req, res) => {
  res.json({ message: 'API activa y funcionando ✅' });
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
