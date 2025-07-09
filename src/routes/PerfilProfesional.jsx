import React from 'react';
import PerfilProfesionalCertificados from '../components/perfilprofesionalCertificados';
import PerfilProfesionalExp from '../components/perfilprofesionalExp';
import PerfilProfesionalServicios from '../components/perfilprofesionalServicios';
import PerfilProsionalInfo from '../components/perfilprofesionalInfo';
import PerfilProfesionalReviews from '../components/perfilprofesionalReviews';           
import '../styles/perfilProfesional.css';

const PerfilProfesional = () => {
  return (
    <div className="profile-grid" style={{ paddingTop: '120px' }}>
  <div className="sidebar-area"><PerfilProsionalInfo/></div>
  <div className="content-area">
    <div className="top-row">
      <PerfilProfesionalReviews />
      <PerfilProfesionalServicios />
    </div>
    <div className="top1-row">
            <PerfilProfesionalExp />
    </div>
    <PerfilProfesionalCertificados />
  </div>
</div>
  );
};

export default PerfilProfesional;
