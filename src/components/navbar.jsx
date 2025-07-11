import React, { useState, useContext } from 'react';
import '../styles/navbar.css';
import { CiCircleRemove, CiMenuBurger } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

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
              src="https://res.cloudinary.com/db3espoei/image/upload/v1750384679/logo_booklocal_czvlup.png" 
              alt="BookLocal Logo" 
              style={{ height: '45px', padding: '2px' }}
            />
          </Link>
        </div>

        <button 
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <CiCircleRemove size={24} /> : <CiMenuBurger size={24} />}
        </button>

        <div className={`nav-content ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link to="/porque-booklocal" style={{color: '#88898a'}}>
                Porqué BookLocal?
              </Link>
            </li>
            <li>
              <Link to="/about" style={{color: '#88898a'}}>
                Sobre nosotros
              </Link>
            </li>
        {usuario?.tipo_usuario === 'profesional' && (
          <>
            <li>
              <Link to="/panelprofesional" style={{color: '#88898a'}}>Panel Profesional</Link>
            </li>
            <li>
              <Link to="/perfilprofesional" style={{color: '#88898a'}}>Perfil Profesional</Link>
            </li>
          </>
        )}
          </ul>

          <div className="nav-actions">
            {!usuario ? (
              <>
                <Link to="/login" className="main-action">Iniciar Sesión</Link>
                <Link to="/registro" className="secondary-action">Registrate</Link>
              </>
            ) : (
              <>
                <span style={{ marginRight: '10px', color: '#88898a', fontWeight: 500 }}>
                  Hola, {usuario.nombre}
                </span>
                <button onClick={handleLogout} className="main-action">
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
