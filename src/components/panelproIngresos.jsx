import React from 'react';

const PanelProfesionalIngresos = () => {
  return (
    <div className="graficaca-card">
      <h4 style={{fontWeight:'700', textAlign:'left', fontSize:'22px'}}>Resumen de ingresos</h4>
      <img src="/income-placeholder.png" alt="Gráfico de ingresos" />
      <p style={{fontWeight:'500', textAlign:'left', fontSize:'14px'}}>Ingresos de los últimos 12 meses</p>
    </div>
  );
};

export default PanelProfesionalIngresos;