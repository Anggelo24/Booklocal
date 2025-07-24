import React, { useState } from 'react';
import '../styles/serviciodetalles.css';
import ReporteProfesional from './reporteProfesional'; 

const ServicioSocial = ({ idProfesional }) => {
  const [mostrarReporte, setMostrarReporte] = useState(false);

  const handleCompartir = () => {
    const url = window.location.href;
    const mensaje = `¡Descubre este servicio en BookLocal! ${url}`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

    window.open(whatsappURL, '_blank');
    window.open(facebookURL, '_blank');
  };

  return (
    <div className="social-card">
      <div className="action-buttons">
        <button className="share-btn" onClick={handleCompartir}>🔗 Compartir</button>
        <button className="report-btn" onClick={() => setMostrarReporte(true)}>🚩 Reportar</button>
      </div>

      {mostrarReporte && (
        <div className="reporte-modal">
          <div className="reporte-content">
            <button onClick={() => setMostrarReporte(false)} className="close-btn">✖</button>
            <ReporteProfesional idProfesional={idProfesional} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicioSocial;
