const express = require('express');
const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({ message: 'BookLocal API Activa' });
});

module.exports = router;