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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Basic validation
    if (!formData.correo || !formData.contrasena) {
      setError('Por favor, completa todos los campos');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      
      // Check if response contains required data
      if (response.data.usuario && response.data.token) {
        const { usuario, token } = response.data;
        
        // Use AuthContext login function
        login(usuario, token);
        
        setSuccess(`¡Bienvenido ${usuario.nombre}!`);
        console.log('Login successful. Token received:', token);
        
        // Navigate based on user type
        setTimeout(() => {
          if (usuario.tipo_usuario === 'admin') {
            navigate('/admin-dashboard');
          } else if (usuario.tipo_usuario === 'profesional') {
            navigate('/professional-dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 1000);
        
      } else {
        setError('Respuesta inválida del servidor. Intenta nuevamente.');
      }
      
    } catch (err) {
      console.error('Login error:', err);
      
      if (err.response) {
        // Server responded with error status
        const { status, data } = err.response;
        
        switch (status) {
          case 400:
            setError('Datos de entrada inválidos');
            break;
          case 401:
            setError('Credenciales incorrectas. Verifica tu email y contraseña.');
            break;
          case 500:
            setError('Error del servidor. Intenta más tarde.');
            break;
          default:
            setError(data?.error || 'Error al iniciar sesión');
        }
      } else if (err.request) {
        // Network error
        setError('Error de conexión. Verifica tu conexión a internet.');
      } else {
        // Other error
        setError('Error inesperado. Intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img 
        style={{ height: '45px', padding: '2px' }}
        src="https://res.cloudinary.com/db3espoei/image/upload/v1750384679/logo_booklocal_czvlup.png"
        alt="BookLocal Logo"
        className="login-logo"
      />
      <h3 className="login-title" style={{fontWeight:'bolder',fontSize:'20px'}}>
        Sign In
      </h3>

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
            disabled={isLoading}
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
            disabled={isLoading}
            required
          />
        </div>

        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? 'Iniciando sesión...' : 'Entrar'}
        </button>

        <div className="forgot-password">
          <a href="/forgot-password" style={{color:'#B2BEB5'}}>
            ¿Olvidaste la contraseña?
          </a>
        </div>

        <div className="social-login">
          <p className="divider" style={{color:'#B2BEB5'}}>
            O inicia sesión con:
          </p>
          <div className="social-buttons">
            <button type="button" className="social-icon-button" disabled={isLoading}>
              <FcGoogle className="social-icon" />
            </button>
            <button type="button" className="social-icon-button" disabled={isLoading}>
              <FaFacebook className="social-icon" style={{ color: '#1877F2' }} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;