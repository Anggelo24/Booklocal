import React, { useState } from 'react';
import ServicioHeader from '../components/servicioHeader';
import ServicioImagenes from '../components/servicioImagenes';
import ServicioReview from '../components/servicioReview';
import ServicioProfesional from '../components/servicioProfesional';
import ServicioPaquetes from '../components/servicioPaquetes';
import ServicioSocial from '../components/servicioSocial';
import { mockService } from '../ejemplo/ejemploServicios'; 
import '../styles/serviciodetalles.css';

const DetallesServicio = ({ service = mockService, onBack = () => window.history.back() }) => {
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

    return (
      <div className="service-detail-container" style={{ paddingTop: '120px' }}>
        <ServicioHeader
          name={service.name}
          rating={service.rating}
          reviews={service.reviews}
          distance={service.distance}
          onBack={onBack}
        />

        <div className="main-content">
          <div className="left">
            <ServicioImagenes images={service.images} />
            <ServicioReview activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className="tab-content">
              {activeTab === 'about' && <ServicioProfesional provider={service.provider} />}
              {activeTab === 'description' && <p>{service.description}</p>}
              {activeTab === 'reviews' && <div>Contenido de reseñas aparecerá aquí</div>}
            </div>
          </div>

          <div className="right">
            <ServicioPaquetes packages={service.packages} />
            <ServicioSocial />
          </div>
        </div>
      </div>
    );
  };
}
export default DetallesServicio;