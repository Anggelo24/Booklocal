import React, { useState, useContext } from 'react';
import '../styles/navbar.css';
import { CiCircleRemove, CiMenuBurger } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PerfilIconoUSer from './perfiliconoUser';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <img 
              src="https://res.cloudinary.com/db3espoei/image/upload/v1753819153/imagen_2025-07-29_145843517-removebg-preview_jytj3x.png" 
              alt="BookLocal Logo" 
              className="navbar-logo"
            />
          </Link>
        </div>

        <button 
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <CiCircleRemove size={28} /> : <CiMenuBurger size={28} />}
        </button>

        <div className={`nav-content ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link to="/acercade" onClick={() => setIsMenuOpen(false)}>
                ¿Porqué BookLocal?
              </Link>
            </li>
            <li>
              <Link to="/explorartodo" onClick={() => setIsMenuOpen(false)}>
                Explora
              </Link>
            </li>
            {usuario &&  isMenuOpen && (
    <li className="mobile-only-item">
      <Link to="" onClick={handleLogout}>
        Cerrar sesión
      </Link>
    </li>
  )}            
            {usuario?.tipo_usuario === 'profesional' && (
              <>
                <li>
                  <Link to="/panelprofesional" onClick={() => setIsMenuOpen(false)}>
                    Panel Profesional
                  </Link>
                </li>
                <li>
                  <Link to="/perfilprofesional" onClick={() => setIsMenuOpen(false)}>
                    Perfil Profesional
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="nav-actions">
            {!usuario ? (
              <>
                <Link to="/login" className="main-action" onClick={() => setIsMenuOpen(false)}>
                  Iniciar Sesión
                </Link>
                <Link to="/registro" className="secondary-action" onClick={() => setIsMenuOpen(false)}>
                  Registrate
                </Link>
              </>
            ) : (
               <div className='iconoUser'>
                <PerfilIconoUSer isMobile={isMenuOpen} />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;