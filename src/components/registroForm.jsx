import React from 'react';
import '../styles/registro.css';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

const RegistroForm = () => {
  return (
    <div className="registro-container">
      <img 
        style={{ height: '45px', padding: '2px' }}
        src="https://res.cloudinary.com/db3espoei/image/upload/v1750384679/logo_booklocal_czvlup.png"
        alt="BookLocal Logo"
        className="registro-logo"
      />
      <h3 className="registro-title" style={{fontWeight:'bolder',fontSize:'20px'}}>Sign Up</h3>
      
      <form className="registro-form">
        {/* Name fields side by side */}
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <div className="name-fields-container">
            <input
              type="text"
              id="firstName"
              placeholder="Nombre"
              className="form-input name-input"
            />
            <input
              type="text"
              id="lastName"
              placeholder="Apellido"
              className="form-input name-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="@ Introduce tu email"
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            className="form-input"
          />
          <input 
            style={{marginTop:'10px'}}
            type="password"
            id="confirmPassword"
            placeholder="Confirmar Contraseña"
            className="form-input"
          />
        </div>
        
        <button type="submit" className="registro-button">Registrate</button>
        
        <div className="forgot-password">
          <a href="/forgot-password" style={{color:'#B2BEB5'}}>¿Ya tienes una cuenta? Entra</a>
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