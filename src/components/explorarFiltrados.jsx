// src/components/ExplorarFiltrado.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import '../styles/seccioncalificados.css';

const ExplorarFiltrado = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();

  useEffect(() => {
    axios.get(`/api/servicios/filtrar${search}`)
      .then(res => {
        setServicios(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al filtrar servicios:', err);
        setLoading(false);
      });
  }, [search]);

  if (loading) return <div>Cargando servicios...</div>;

  return (
    <div className="section-header" style={{ paddingTop: '120px' }}>
      <h1>Resultados de tu búsqueda</h1>
      <h3 style={{ color: '#B2BEB5', fontSize: '18px', paddingBottom: '25px', fontWeight: '200' }}>
        Servicios encontrados según tus filtros
      </h3>
      <section className="top-rated">
        <div className="card-grid">
          {servicios.length === 0 ? (
            <p style={{ color: '#888', fontSize: '16px', textAlign: 'center', width: '100%' }}>
              Ningún servicio cumple con los requerimientos.
            </p>
          ) : (
            servicios.map((pro, index) => (
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
                    <span><FaMapMarkerAlt /> {pro.provincia}</span>
                    <span><FaStar className="star" /> {pro.calificacion_promedio} ({pro.total_reviews} Reviews)</span>
                  </div>
                  <div className="footer">
                    <span className="author">By. {pro.profesional} {pro.apellido}</span>
                    <span className="price">Desde ${pro.precio}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ExplorarFiltrado;