const jwt = require('jsonwebtoken');
require('dotenv').config();

// Global JWT Authentication Middleware
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        error: 'Token de acceso requerido',
        code: 'NO_TOKEN'
      });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ 
            error: 'Token expirado',
            code: 'TOKEN_EXPIRED'
          });
        } else if (err.name === 'JsonWebTokenError') {
          return res.status(401).json({ 
            error: 'Token inválido',
            code: 'INVALID_TOKEN'
          });
        } else {
          return res.status(401).json({ 
            error: 'Error de autenticación',
            code: 'AUTH_ERROR'
          });
        }
      }

      // Verify required user information
      if (!decoded.id_usuario) {
        return res.status(401).json({ 
          error: 'Token no contiene información de usuario válida',
          code: 'INVALID_USER_DATA'
        });
      }

      // Add user info to request object
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    return res.status(500).json({ 
      error: 'Error interno de autenticación',
      code: 'INTERNAL_AUTH_ERROR'
    });
  }
};

// Optional middleware - allows requests without token but adds user info if token exists
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      req.user = null;
      return next();
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
      if (err) {
        req.user = null;
      } else {
        req.user = decoded;
      }
      next();
    });
  } catch (error) {
    req.user = null;
    next();
  }
};

// Role-based authorization middleware
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Autenticación requerida',
        code: 'AUTH_REQUIRED'
      });
    }

    if (!roles.includes(req.user.tipo_usuario)) {
      return res.status(403).json({ 
        error: 'Permisos insuficientes',
        code: 'INSUFFICIENT_PERMISSIONS',
        required: roles,
        current: req.user.tipo_usuario
      });
    }

    next();
  };
};

module.exports = {
  authenticate,
  optionalAuth,
  requireRole
};