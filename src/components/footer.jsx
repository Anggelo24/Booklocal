import React from "react";
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
          <a href="/contacto" className="footer-link">Contacto</a>
          <a href="/acerca-de" className="footer-link">Acerca De</a>
          <a href="/terminos" className="footer-link">Términos</a>
          <a href="/privacidad" className="footer-link">Privacidad</a>
        </div>
      </div>
      
      <div className="copyright-section">
        <p>© 2025 BookLocal. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;