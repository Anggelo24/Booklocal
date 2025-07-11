import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    correo: '',
    contrasena: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('/api/login', formData);
      login(res.data.usuario);
      setSuccess(`Bienvenido ${res.data.usuario.nombre}`);
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      console.error('Error en login:', err);
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      <img style={{ height: '45px', padding: '2px' }}
        src="https://res.cloudinary.com/db3espoei/image/upload/v1750384679/logo_booklocal_czvlup.png"
        alt="BookLocal Logo"
        className="login-logo"
      />
      <h3 className="login-title" style={{fontWeight:'bolder',fontSize:'20px'}}>Sign In</h3>

      <form className="login-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="form-group">
          <label htmlFor="correo">Email</label>
          <input
            type="email"
            id="correo"
            placeholder="@ Introduce tu email"
            className="form-input"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            placeholder="Contraseña"
            className="form-input"
            value={formData.contrasena}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-button">Entrar</button>

        <div className="forgot-password">
          <a href="/forgot-password" style={{color:'#B2BEB5'}}>¿Olvidaste la contraseña?</a>
        </div>

        <div className="social-login">
          <p className="divider" style={{color:'#B2BEB5'}}>O inicia sesión con:</p>
          <div className="social-buttons">
            <button type="button" className="social-icon-button">
              <FcGoogle className="social-icon" />
            </button>
            <button type="button" className="social-icon-button">
              <FaFacebook className="social-icon" style={{ color: '#1877F2' }} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
