import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/seccionimpulsar.css";
import { AuthContext } from '../context/AuthContext';

const SeccionImpulsar = () => {
  const { usuario } = useContext(AuthContext);


  return (
    <div className="business-promo-container">
      <div className="text-content">
        <h1 className="promo-title">Impulsa tu <span style={{ color: '#2979ff' }}>negocio</span> con nosotros.</h1>

        <p className="promo-description">
          Somos el espacio donde los emprendedores como tú encuentran herramientas, 
          conexiones y oportunidades para hacer crecer su negocio.
        </p>

        <div className="action-buttons">
          <Link 
            to='/publicarServicio'
            className="action-button primary"
          >
            Publica un servicio
          </Link>
          <button className="action-button secondary">Aprende más</button>
        </div>
      </div>

      <div className="image-content">
        <img
          src="https://res.cloudinary.com/db3espoei/image/upload/c_crop,ar_1:1/v1749077445/pexels-rdne-5915224_zg4huh.jpg"
          alt="Impulsa tu negocio"
          className="promo-image"
        />
      </div>
    </div>
  );
};

export default SeccionImpulsar;
