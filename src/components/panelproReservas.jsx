import React from 'react';

const PanelProfesionalReservas = () => {
  return (
    <div className="graficaca-card">
      <h4 style={{fontWeight:'700', textAlign:'left', fontSize:'22px'}}>Resumen de reservas</h4>
      <img src="/reservations-placeholder.png" alt="Gráfico de reservas" />
      <p style={{fontWeight:'500', textAlign:'left', fontSize:'14px'}}>Reservas de los últimos 12 meses</p>
    </div>
  );
};

export default PanelProfesionalReservas;