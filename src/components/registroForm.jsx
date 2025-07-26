import React, { useState } from 'react';
import axios from 'axios';
import '../styles/registro.css';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

const RegistroForm = () => {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    contrasena: '',
    confirmarContrasena: '',
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

    if (formData.contrasena !== formData.confirmarContrasena) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.post('/api/usuarios', {
        cedula: formData.cedula,
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
        telefono: formData.telefono,
        contrasena: formData.contrasena,
        tipo_usuario: 'cliente' // asignado automáticamente
      });

      setSuccess('¡Registro exitoso!');
      setFormData({
        cedula: '',
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        contrasena: '',
        confirmarContrasena: ''
      });
    } catch (err) {
      console.error(err);
      setError('Error al registrar. Verifica los datos o intenta más tarde.');
    }
  };

  return (
    <div className="registro-container">
      <img 
        style={{ height: '45px', padding: '2px' }}
        src="https://res.cloudinary.com/db3espoei/image/upload/v1750384679/logo_booklocal_czvlup.png"
        alt="BookLocal Logo"
        className="registro-logo"
      />
      <h3 className="registro-title" style={{fontWeight:'bolder',fontSize:'20px'}}>Sign Up</h3>

      <form className="registro-form" onSubmit={handleSubmit}>
        {/* Mensajes */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="form-group">
          <label htmlFor="cedula">Cédula</label>
          <input
            type="text"
            id="cedula"
            placeholder="Ej. 8-1234-5678"
            className="form-input"
            value={formData.cedula}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <div className="name-fields-container">
            <input
              type="text"
              id="nombre"
              placeholder="Nombre"
              className="form-input name-input"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="apellido"
              placeholder="Apellido"
              className="form-input name-input"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
        </div>

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
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            placeholder="Ej. 6123-4567"
            className="form-input"
            value={formData.telefono}
            onChange={handleChange}
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
          <input 
            type="password"
            id="confirmarContrasena"
            placeholder="Confirmar Contraseña"
            className="form-input"
            style={{marginTop:'10px'}}
            value={formData.confirmarContrasena}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="registro-button">Registrate</button>

        <div className="forgot-password">
          <a href="/login" style={{color:'#B2BEB5'}}>¿Ya tienes una cuenta? Entra</a>
        </div>

        <div className="social-registro">
          <p className="divider" style={{color:'#B2BEB5'}}>O registrate con:</p>
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

export default RegistroForm;
