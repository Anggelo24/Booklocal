import React from 'react';
import CategoriasComponent from '../components/categorias';
import '../styles/panelprofesional.css'; 

const Categorias = () => {
  return (
    <>
    <div className="dashboard-wrapper" style={{ paddingTop: '90px' }}>
    <CategoriasComponent />
    </div>
    </>
  );
};

export default Categorias;
