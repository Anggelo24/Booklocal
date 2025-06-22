import React, { useState } from 'react';
import '../styles/navbar.css';
import { CiCircleRemove, CiMenuBurger } from "react-icons/ci";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/"> {/* Wrap logo with Link to home */}
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
            <li>
              <Link to="/panelprofesional" style={{color: '#88898a'}}>
                Panel Profesional (Para Ejemplo)
              </Link>
            </li>
          </ul>
          
          <div className="nav-actions">
            <Link to="/login" className="main-action">Iniciar Sesión</Link>
            <Link to="/registro" className="secondary-action">Registrate</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;