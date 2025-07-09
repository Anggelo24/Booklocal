import React from 'react';
import PanelProfesionalIngresos from './PanelProfesionalIngresos';
import PanelProfesionalReservas from './PanelProfesionalReservas';

const PanelProfesionalGraficas = () => {
  return (
    <div className="graficacas-grid">
      <PanelProfesionalIngresos />
      <PanelProfesionalReservas />
    </div>
  );
};

export default  PanelProfesionalGraficas;
