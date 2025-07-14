import React from 'react';
import '../styles/serviciodetalles.css';

const ServicioHeader = ({ name, rating, reviews, distance, onBack }) => {
  return (
    <div className="header">
      <button className="back-btn" onClick={onBack}>← Atrás</button>
      <h2>{name}</h2>
      <p style={{color:'gray'}}>⭐ {rating || 'N/A'} ({reviews || 0} Reviews)</p>
    </div>
  );
};

export default ServicioHeader;