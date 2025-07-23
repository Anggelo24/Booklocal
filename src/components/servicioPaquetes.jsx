import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/serviciodetalles.css';

const ServicioPaquetes = ({ idServicio, nombre, precio, descripcion }) => {
  const navigate = useNavigate();

  const handleContinuar = () => {
    // Redirige a la pantalla de pago del servicio
    navigate(`/confirmarReserva/${idServicio}`);
  };

  return (
    <div className="packages-section">
      <h3>Detalles del Servicio</h3>
      <div className="package-card selected">
        <div className="package-header">
          <strong style={{ fontWeight: '600' }}>{nombre}</strong>
          <span style={{ fontWeight: 'bolder', fontSize: '14px' }}>${precio}</span>
        </div>
        <p style={{ fontWeight: '100', textAlign: 'left', fontSize: '14px' }}>{descripcion}</p>
      </div>
      <button className="primary-btn" onClick={handleContinuar}>
        Continuar al Pago
      </button>
    </div>
  );
};

export default ServicioPaquetes;
