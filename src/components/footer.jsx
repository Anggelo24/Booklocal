import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <img 
          src="https://res.cloudinary.com/db3espoei/image/upload/v1750384679/logo_booklocal_czvlup.png" 
          alt="BookLocal Logo" 
          style={{ height: '45px', padding: '2px' }} 
        />
        
        <div className="links-section">
          <Link to="/contacto" className="footer-link">Contacto</Link>
          <Link to="/acercade" className="footer-link">Acerca De</Link>
          <Link to="/terminos" className="footer-link">Términos y Condiciones</Link>
          <Link to="/privacidad" className="footer-link">Privacidad</Link>
        </div>
      </div>
      
      <div className="copyright-section">
        <p>© 2025 BookLocal. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;