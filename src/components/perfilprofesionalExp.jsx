import React, {useEffect, useState} from 'react';

const PerfilProfesionalExp = () => {
  const [profesional, setProfesional] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchProfesionalExp = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/profesional-info');
        if (!response.ok) {
          throw new Error(`Error al obtener la información: ${response.status}`);
        }
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
      }finally {
        setLoading(false);
      }
    };
      fetchProfesionalExp();
}, []);

  if (loading) {return <div>Cargando información profesional...</div>;}
  if (error) {return <div>Error: {error}</div>;}
  if (!profesional) {return <div>No se encontró información del profesional.</div>;}

  return (
    <div className="card experiencia">
      <h3>Experiencia</h3>
      <p>
        {profesional.experiencia ? profesional.experiencia : 'No hay experiencia disponible.'}
      </p>
    </div>
  );
};

export default PerfilProfesionalExp;