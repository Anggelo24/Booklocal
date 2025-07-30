import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const PerfilProfesionalInfo = () => {
  const { token } = useContext(AuthContext);
  const [profesional, setProfesional] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      if (token) {
        console.log('Token presente, info:', token);
      } else {
        console.warn('Token ausente, no se hace la petición');
      }
      try {
        const response = await axios.get('http://localhost:5000/api/profesional-info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setProfesional(response.data.data);
        } else {
          console.error('Error en la respuesta:', response.data.error);
        }
        console.log('Respuesta recibida:', response.data);
      } catch (error) {
        console.error('Error al obtener los datos del profesional:', error);
        
      }
    };

    if (token) {
      fetchPerfil();
    }
  }, [token]);

  if (!profesional) {
    return <p>Cargando información del profesional...</p>;
  }

  const { nombre, apellido, especialidades } = profesional;

  return (
    <div className="barraPerfil">
      <img
        src={
              profesional.foto_perfil ||
              'https://res.cloudinary.com/db3espoei/image/upload/v1750708369/imagen_2025-06-23_145247666_asvfmr.png'
            }
        alt="Foto de perfil"
        className="avatar"
      />
      <h2 className="nombreProfesional" style={{ fontWeight: '100', fontSize: '20px' }}>
        {nombre} {apellido}
      </h2>
      <p className="rolProfesional">{profesional.especialidades || 'Profesional'}</p>
    </div>
  );
};

export default PerfilProfesionalInfo;
