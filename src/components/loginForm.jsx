import React from 'react';
import '../styles/login.css';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";


const LoginForm = () => {
  return (
    <div className="login-container">
        <img style={{ height: '45px', padding: '2px' }}
          src="https://res.cloudinary.com/db3espoei/image/upload/v1750384679/logo_booklocal_czvlup.png"
            alt="BookLocal Logo"
            className="login-logo"
        />
      <h3 className="login-title" style={{fontWeight:'bolder',fontSize:'20px'}}>Sign In</h3>
      
      <form className="login-form">
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