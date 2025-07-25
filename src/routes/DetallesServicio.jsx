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

/**
 * DetallesServicio.jsx
 * 
 * Página de detalle individual de un servicio.
 * Muestra información completa sobre un servicio específico, incluyendo:
 * - Información general del servicio
 * - Imágenes destacadas
 * - Paquetes/ofertas del servicio
 * - Información del profesional
 * - Reseñas de clientes
 * - Enlaces sociales del profesional
 * 
 * 🔍 Funcionalidad:
 * - Obtiene los datos del servicio desde el backend con `GET /api/servicio/:id`
 * - Organiza los paquetes por nombre alfabéticamente
 * - Permite cambiar entre pestañas: "Sobre el Profesional", "Descripción", "Reseñas"
 * - Renderiza los componentes visuales: `ServicioHeader`, `ServicioImagenes`, `ServicioReview`, 
 *   `ServicioProfesional`, `ServicioPaquetes`, `ServicioSocial`
 * 
 * 📦 Props:
 * - `onBack`: función opcional para manejar la acción de volver atrás (por defecto, usa `window.history.back()`)
 * 
 * ⚙️ Estados:
 * - `service`: almacena todos los datos del servicio cargado
 * - `activeTab`: controla qué pestaña está activa en el contenido
 * 
 * 📌 Consideraciones:
 * - Muestra "Cargando..." mientras no se obtienen los datos
 * - Soporta casos donde no haya reseñas aún
 * - Espera que las reseñas incluyan nombre, apellido, calificación, comentario y fecha
 * - Se asume que `service.reseñas` y `service.profesional` vienen con el formato correcto desde el backend
 * 
 * 🧩 Archivos relacionados:
 * - `servicioHeader.jsx`: muestra el nombre, rating y botón de volver
 * - `servicioImagenes.jsx`: galería o imagen destacada
 * - `servicioReview.jsx`: tabs de navegación (about, description, reviews)
 * - `servicioProfesional.jsx`: detalles del proveedor
 * - `servicioPaquetes.jsx`: muestra el precio y permite iniciar una reserva
 * - `servicioSocial.jsx`: iconos o enlaces a redes sociales
 */


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
          <ServicioPaquetes
            idServicio={service.id_servicio}
            nombre={service.nombre}
            precio={service.precio}
            descripcion={service.descripcion}
          />
          <ServicioSocial idProfesional={service.id_profesional} />
        </div>
      </div>
    </div>
  );
};

export default DetallesServicio;
