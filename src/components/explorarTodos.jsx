import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/seccioncalificados.css';

const ExplorarTodos = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/servicios')
      .then(res => {
        setServicios(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener servicios:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando servicios...</div>;

  return (
    <div className="section-header">
      <h1>Todos los Servicios</h1>
      <h3 style={{ color: '#B2BEB5', fontSize: '18px', paddingBottom: '25px', fontWeight: '200' }}>
        Encuentra el servicio que necesitas en cualquier categoría
      </h3>

      {servicios.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', fontSize: '18px' }}>
          Ningún servicio cumple con los requerimientos.
        </p>
      ) : (
        <section className="top-rated">
          <div className="card-grid">
            {servicios.map((pro, index) => (
              <Link
                key={index}
                to={`/servicio/${pro.id_servicio}`}
                className="pro-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <img
                  src={pro.imagen_destacada || '/images/pro1.jpg'}
                  alt={pro.servicio_nombre}
                  className="pro-image"
                />
                <div className="pro-info">
                  <h3>{pro.servicio_nombre}</h3>
                  <p className="description">{pro.descripcion}</p>
                  <div className="details">
                    <span>
                      <FaMapMarkerAlt /> {pro.provincia || 'Ubicación no especificada'}
                    </span>
                    <span>
                      <FaStar className="star" /> {pro.calificacion_promedio || '5.0'} ({pro.total_reviews || 0} Reviews)
                    </span>
                  </div>
                  <div className="footer">
                    <span className="author">
                      By. {pro.profesional} {pro.apellido}
                    </span>
                    <span className="price">Desde ${pro.precio}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ExplorarTodos;
