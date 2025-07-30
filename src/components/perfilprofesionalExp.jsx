import React, {useEffect, useState, useContext} from 'react';
import { AuthContext } from '../context/AuthContext';

const PerfilProfesionalExp = () => {
  const { token } = useContext(AuthContext);
  const [profesional, setProfesional] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
  const fetchProfesionalExp = async () => {
    if (!token) {
      console.warn('Token ausente, no se hace la petición');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/profesional-info', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error al obtener la información: ${response.status}`);
      }
      const result = await response.json();
      console.log('Respuesta del backend:', result);

      if (!result.success || !result.data) {
        throw new Error(result.error || 'datos invalidos');
      }
      setProfesional(result.data);

    } catch (err) {
      console.error('Error completo', err);
      setError(err.message);
      setProfesional(null);
    } finally {
      setLoading(false);
    }
  };
  fetchProfesionalExp();
}, [token]); // <-- Asegúrate que se actualice si cambia el token


  if (loading) {return <div>Cargando información profesional...</div>;}
  if (error) {return <div>Error: {error}</div>;}
  if (!profesional) {return <div>No se encontró información del profesional.</div>;}

  return (
    <div className="card experiencia">
      <h3>Experiencia</h3>
      <p>
        {profesional.experiencia || 'No hay experiencia disponible.'}
      </p>
    </div>
  );
};

export default PerfilProfesionalExp;