import React from 'react';
import '../styles/serviciodetalles.css';

const ServicioProfesional = ({ provider }) => {
  return (
    <div className="provider-card">
      <img src={provider.photo} alt={provider.name} className="provider-photo" />
      <div className="provider-info">
        <h4>{provider.name}</h4>
        <p style={{color:'gray'}}>⭐ {provider.rating} ({provider.reviews} Reviews)</p>
        <p style={{color:'gray'}}>Miembro desde {provider.joined}</p>
        <p style={{color:'gray'}}>{provider.responseTime}</p>
      </div>
    </div>
  );
};

export default ServicioProfesional;