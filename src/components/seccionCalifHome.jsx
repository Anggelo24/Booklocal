import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/seccioncalificados.css';

const SeccionCalificados = () => {
  const [profesionales, setProfesionales] = useState([]);

  useEffect(() => {
    axios.get('/api/servicios')
      .then((res) => {
        setProfesionales(res.data);
      })
      .catch((err) => {
        console.error('Error al cargar servicios:', err);
      });
  }, []);

  return (
    <div className="section-header">
      <h1>Mejor Calificados</h1>
      <h3 style={{ color: '#B2BEB5', fontSize: '18px', paddingBottom: '25px', fontWeight: '200' }}>
        Descubre los profesionales con mejor rating
      </h3>
      <section className="top-rated">
        <div className="card-grid">
          {profesionales.map((pro, index) => (
            <Link
              key={index}
              to={`/servicio/${pro.id_servicio}`}
              className="pro-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img
                src={pro.imagen_destacada || '/images/pro1.jpg'}
                alt={pro.nombre}
                className="pro-image"
              />
              <div className="pro-info">
                <h3>{pro.nombre}</h3>
                <p className="description">{pro.descripcion}</p>
                <div className="details">
                  <span><FaMapMarkerAlt /> Panamá</span>
                  <span><FaStar className="star" /> 5.0 (12 Reviews)</span>
                </div>
                <div className="footer">
                  <span className="author">By. {pro.profesional} {pro.apellido}</span>
                  <span className="price">Desde ${pro.precio}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <button className="explore-button">Explorar todo</button>
      </section>
    </div>
  );
};

export default SeccionCalificados;
