import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import ServicioHeader from '../components/servicioHeader';
import ServicioImagenes from '../components/servicioImagenes';
import ServicioReview from '../components/servicioReview';
import ServicioProfesional from '../components/servicioProfesional';
import ServicioPaquetes from '../components/servicioPaquetes';
import ServicioSocial from '../components/servicioSocial';

import '../styles/serviciodetalles.css';

const DetallesServicio = ({ onBack = () => window.history.back() }) => {
  const [service, setService] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/servicio/${id}`)
      .then(res => {
        const serviciosOrdenados = [...res.data.paquetes].sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
        setService({ ...res.data, paquetes: serviciosOrdenados });
      })
      .catch(err => console.error('Error al cargar servicio:', err));
  }, [id]);

  if (!service) return <div style={{ paddingTop: '120px' }}>Cargando...</div>;

  return (
    <div className="service-detail-container" style={{ paddingTop: '120px' }}>
      <ServicioHeader
        name={service.nombre}
        rating={service.rating || 5}
        reviews={service.total_reviews || 0}
        onBack={onBack}
      />

      <div className="main-content">
        <div className="left">
          <ServicioImagenes images={[service.imagen_destacada]} />
          <ServicioReview activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="tab-content">
            {activeTab === 'about' && <ServicioProfesional provider={service.profesional} />}
            
            {activeTab === 'description' && (
              <div className="descripcion-tab">
                <p style={{ marginBottom: '10px' }}>{service.descripcion}</p>
                {service.profesional?.direccion && (
                  <p style={{ fontStyle: 'italic', color: 'gray' }}>
                    📍 Dirección: {service.profesional.direccion}
                  </p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-list">
                {service.reseñas.length === 0 ? (
                  <p style={{ color: 'gray' }}>Este servicio aún no tiene reseñas.</p>
                ) : (
                  service.reseñas.map((review, idx) => (
                    <div key={idx} className="review-card">
                      <p style={{ fontWeight: 'bold' }}>{review.nombre} {review.apellido}</p>
                      <p>⭐ {review.calificacion}</p>
                      <p style={{ fontStyle: 'italic' }}>{review.comentario}</p>
                      <p style={{ color: 'gray', fontSize: '0.85rem' }}>
                        {new Date(review.fecha).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="right">
          <ServicioPaquetes packages={service.paquetes} />
          <ServicioSocial idProfesional={service.id_profesional} />
        </div>
      </div>
    </div>
  );
};

export default DetallesServicio;
