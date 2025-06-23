import React from 'react';

const PerfilProsionalInfo = () => {
  return (
    <div className="barraPerfil">
      <img src="https://res.cloudinary.com/db3espoei/image/upload/v1750708369/imagen_2025-06-23_145247666_asvfmr.png" alt="Profile" className="avatar" />
      <h2 className="nombreProfesional" style={{fontWeight:'100', fontSize:'20px'}}>Profesional Ejemplo</h2>
      <p className="rolProfesional">Programador</p>

      <div className="reviewsProfesional" style={{paddingTop:'10px'}}>
        <p style={{textAlign:'left', fontWeight:'600'}}>Reviews</p>
        <span style={{ display: 'flex', justifyContent: 'flex-start', fontSize:'14px'}}> <span style={{color:'black', paddingRight:'80px', fontSize:'16px', color:'gray', fontWeight:'lighter'}}>Calificación</span>⭐⭐⭐⭐⭐</span>
      </div>

      <div className="disponibilidad">
        <p style={{fontWeight:'600', paddingTop:'25px'}}>Disponibilidad</p>
        <button className="botonDisponibilidad">Marcar como no disponible</button>
      </div>
      <div className="botonCerrar" style={{paddingTop:'35px'}}>
      <button className="botonCerrarSesion">Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default PerfilProsionalInfo;
