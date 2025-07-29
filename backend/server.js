require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); 
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta pública para acceder a imágenes o archivos subidos
app.use('/images', express.static(path.join(__dirname, 'images')));

console.log('Available routes:');
console.log('- POST /api/publicar-servicio');

// Rutas API
const apiRoutes = [
  { path: '/profesional-info', router: require('./routes/profesional-info') },
  { path: '/reportes', router: require('./routes/reportes') },
  { path: '/reset-password', router: require('./routes/reset-password') },
  { path: '/servicios', router: require('./routes/servicios') },
  { path: '/servicio', router: require('./routes/servicioDetalle') },
  { path: '/categorias', router: require('./routes/categorias') },
  { path: '/provincias', router: require('./routes/provincias') },
  { path: '/servicios-disponibles', router: require('./routes/serviciosDisponibles') },
  { path: '/usuarios', router: require('./routes/usuarios') },
  { path: '/pagos', router: require('./routes/pagos') },
  { path: '/login', router: require('./routes/login') },
  { path: '/reservas', router: require('./routes/reservas') },
  { path: '/resenas', router: require('./routes/resenas') },
  { path: '/contacto', router: require('./routes/contacto') },
  { path: '/usuario-profesional', router: require('./routes/usuarioProfesional') },
  { path: '/publicar-servicio', router: require('./routes/publicarServicio') }
];

apiRoutes.forEach(route => {
  app.use(`/api${route.path}`, route.router);
  console.log(`Mounted route: /api${route.path}`);
});

// Ruta de prueba para verificar que el servidor responde
app.get('/api/ping', (req, res) => {
  res.json({ message: 'API activa y funcionando ✅' });
});

//404 por si las moscas
app.use((req, res) => {
  console.warn(`404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  console.log('Available routes:');
  apiRoutes.forEach(route => {
    console.log(`- http://localhost:${PORT}/api${route.path}`);
  });
});