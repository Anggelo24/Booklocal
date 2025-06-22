import React, { useState } from 'react';
import ServicioHeader from '../components/servicioHeader';
import ServicioImagenes from '../components/servicioImagenes';
import ServicioReview from '../components/servicioReview';
import ServicioProfesional from '../components/servicioProfesional';
import ServicioPaquetes from '../components/servicioPaquetes';
import ServicioSocial from '../components/servicioSocial';
import { mockService } from '../ejemplo/ejemploServicios'; // 
import '../styles/serviciodetalles.css';

const DetallesServicio = ({ service = mockService, onBack = () => window.history.back() }) => {
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

export default DetallesServicio;