import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({ correo: '', cedula: '', nuevaContrasena: '' });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const res = await axios.post('/api/reset-password', formData);
      setMensaje(res.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cambiar contraseña');
    }
  };

  return (
    <div className="login-container">
      <h3 className="login-title" style={{fontWeight:'bolder', fontSize:'20px'}}>Reiniciar contraseña</h3>
      <form onSubmit={handleSubmit} className="login-form">
        {mensaje && <p className="success-message">{mensaje}</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            id="correo"
            placeholder="Ingresa tu correo"
            className="form-input"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cedula">Cédula</label>
          <input
            type="text"
            id="cedula"
            placeholder="Ej. 8-888-8888"
            className="form-input"
            value={formData.cedula}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nuevaContrasena">Nueva contraseña</label>
          <input
            type="password"
            id="nuevaContrasena"
            placeholder="Nueva contraseña"
            className="form-input"
            value={formData.nuevaContrasena}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-button">Cambiar contraseña</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
