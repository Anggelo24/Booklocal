import React,{useEffect, useState} from 'react';


const PerfilProsionalInfo = () => {
  const [profesional, setProfesional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchProfesionalInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/profesional-info');
      
      if (!response.ok) {throw new Error('Error al obtener la información profesional: ${response.status}');}
    
      const data = await response.json();
      console.log('Respuesta cruda:', data);
    
        if (!data) {
          throw new Error('datos incompletos');
        }
        setProfesional(data);
      
    } catch (err) {
      console.error('Error completo', err);
      setError(err.message);
      setProfesional(null);
    } finally {
      setLoading(false);
    }
  };
  fetchProfesionalInfo();
}, []);

  if (loading) {return <div>Cargando información profesional...</div>;}
  if (error) {return <div>Error: {error}</div>;}
  if (!profesional) {return <div>No se encontró información del profesional.</div>;}

  return (
    <div className="barraPerfil">
      <img src={profesional.foto_perfil || "https://res.cloudinary.com/db3espoei/image/upload/v1750708369/imagen_2025-06-23_145247666_asvfmr.png"}  alt="Profile" className="avatar" />
      <h2 className="nombreProfesional" style={{fontWeight:'100', fontSize:'20px'}}> {profesional.nombre} {profesional.apellido}</h2>
      <p className="rolProfesional">{profesional.especialidades || 'Programador'}</p>

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
