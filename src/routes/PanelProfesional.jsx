import React from 'react';
import PanelProfesionalActividad from '../components/panelproActividad';
import PanelProfesionalAgenda from '../components/panelproAgenda';
import PanelProfesionalEstadis from '../components/panelproEstadisticas';
import PanelProfesionalHeader from '../components/panelproHeader';
import PanelProfesionalServicios from '../components/panelproServicios';
import PanelProfesionalReservas from '../components/panelproReservas';
import PanelProfesionalIngresos from '../components/panelproIngresos';
import '../styles/panelprofesional.css'; 

const PanelProfesional = () => {
  return (
    <>
    <div className="dashboard-wrapper" style={{ paddingTop: '120px' }}>
    <PanelProfesionalHeader />

    <PanelProfesionalEstadis />

      <div className="graficacas-grid">
  <PanelProfesionalIngresos />
  <PanelProfesionalReservas />
      </div>

        <PanelProfesionalServicios />

      <div className="bottom-grid">
        <PanelProfesionalActividad />
        <PanelProfesionalAgenda />
      </div>
    </div>
    </>
  );
};

export default PanelProfesional;
