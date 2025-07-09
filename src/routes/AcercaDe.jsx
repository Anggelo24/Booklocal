import React from 'react';
import '../styles/acercade.css';

const AcercaDe = () => {
  return (
    <div className="acerca-container" style={{ paddingTop: '100px' }}>
      <div className="acerca-header">
        <h1>Sobre BookLocal</h1>
        <p>"Impulsa lo local, reserva con confianza"</p>
      </div>

      <div className="acerca-section">
        <h2>Nuestra Historia</h2>
        <p>
          BookLocal nació en Panamá con la visión de transformar la economía local. Observamos que profesionales
          independientes y emprendedores enfrentaban grandes desafíos para conectarse con clientes y gestionar sus
          negocios, mientras que los usuarios luchaban para encontrar servicios confiables cerca de su ubicación.
        </p>
        
        <div className="mision-vision">
          <div className="mv-card">
            <div className="mv-icon" style={{paddingTop:'20px'}}>🌟</div>
            <h3>Misión</h3>
            <p>
              Crear una plataforma intuitiva, segura y accesible que conecte profesionales independientes con clientes,
              facilitando reservas y pagos mientras empoderamos emprendedores locales y fomentamos la economía comunitaria.
            </p>
          </div>
          
          <div className="mv-card">
            <div className="mv-icon" style={{paddingTop:'20px'}}>🚀</div>
            <h3>Visión</h3>
            <p>
              Ser la plataforma líder en Centroamérica que transforma la forma de reservar servicios locales, expandiendo
              nuestra red a nivel nacional y convirtiéndonos en referente de confianza para emprendedores y usuarios.
            </p>
          </div>
        </div>
      </div>

      <div className="acerca-section">
        <h2>¿Qué Ofrecemos?</h2>
        
        <div className="servicios-grid">
          <div className="servicio-card">
            <div className="servicio-icon">📅</div>
            <div>
              <h3>Sistema de Reservas Inteligente</h3>
              <p>Gestión automatizada de citas con confirmación inmediata</p>
            </div>
          </div>
          
          <div className="servicio-card">
            <div className="servicio-icon">🔒</div>
            <div>
              <h3>Pagos Seguros</h3>
              <p>Múltiples opciones de pago digital con protección antifraude</p>
            </div>
          </div>
          
          <div className="servicio-card">
            <div className="servicio-icon">⭐</div>
            <div>
              <h3>Perfiles Verificados</h3>
              <p>Sistema de calificaciones y reseñas confiables</p>
            </div>
          </div>
          
          <div className="servicio-card">
            <div className="servicio-icon">📊</div>
            <div>
              <h3>Panel de Control Profesional</h3>
              <p>Estadísticas de ingresos y reportes contables automatizados</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcercaDe;