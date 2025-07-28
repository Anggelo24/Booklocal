import React from 'react';
import CategoriasComponent from '../components/categorias';
import '../styles/panelprofesional.css'; 
import SeccionImpulsar from '../components/seccionImpulsaHome';

const Categorias = () => {
  return (
    <>
    <div className="dashboard-wrapper" style={{ marginTop: '90px' }}>
    <CategoriasComponent />
    <SeccionImpulsar />
    </div>
    </>
  );
};

export default Categorias;
