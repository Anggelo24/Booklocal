require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas API
const profesionalinfoRoutes = require('./routes/profesional-info');
app.use('/api/profesional-info', profesionalinfoRoutes);

app.get('/', (req, res) => {
  res.send('API activa y funcionando ✅');
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});