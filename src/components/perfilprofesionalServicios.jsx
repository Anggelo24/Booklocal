import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const PerfilProfesionalServicios = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [servicios, setServicios] = useState([]);
    const { token, isAuthenticated, usuario } = useContext(AuthContext); 
    const navigate = useNavigate();

    useEffect(() => {
      let isMounted = true;
      let controller = null;

      const fetchProfesionalServicios = async () => {
        // Verificación más estricta del token
        if (!isAuthenticated || !token || typeof token !== 'string' || token.length < 10) {
          if (isMounted) {
            setError('No autenticado correctamente');
            setLoading(false);
          }
          return;
        }

        try {
          controller = new AbortController();
          
          // Configuración mejorada de los headers
          const headers = new Headers();
          headers.append('Authorization', `Bearer ${token.trim()}`);
          headers.append('Content-Type', 'application/json');

          const response = await fetch(`http://localhost:5000/api/profesional-servicios`, {
            method: 'GET',
            headers: headers,
            signal: controller.signal
          });

          // Manejo mejorado de la respuesta
          const textResponse = await response.text();
          const result = textResponse ? JSON.parse(textResponse) : {};

          console.log('Respuesta completa:', {
            status: response.status,
            data: result
          });

          if (!response.ok) {
            throw new Error(result.error || `Error ${response.status}`);
          }

          if (isMounted) {
            setServicios(Array.isArray(result.data) ? result.data : [result.data].filter(Boolean));
            setError(null);
          }
        } catch (err) {
          console.error('Error completo:', err);
          if (isMounted) {
            setError(err.message.includes('aborted') 
              ? 'La solicitud tardó demasiado' 
              : (err.message || 'Error al cargar servicios'));
          }
        } finally {
          if (isMounted) setLoading(false);
        }
      };

      // Delay pequeño para asegurar que el token esté disponible
      const timer = setTimeout(() => {
        fetchProfesionalServicios();
      }, 100);

      return () => {
        isMounted = false;
        clearTimeout(timer);
        if (controller) controller.abort();
      };
    }, [token, isAuthenticated, usuario?.id_usuario]);

    if (loading) return <div>Cargando servicios...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
      <div className="servicios-container">
        <h3>Mis Servicios</h3>
        {servicios.length === 0 ? (
          <div className="no-services-message">No tienes servicios registrados.
                  <button onClick={() => navigate('/publicarservicio', { state: { step: 3 } })} >Crear servicio</button>
          </div>
        ) : (
          <div className="services-grid">
            {servicios.map(servicio => (
              <div key={servicio.id_servicio} className="service-card">
                <div className="service-header">
                  <h4>{servicio.nombre}</h4>
                </div>
                <div className="service-body">
                  <p className="service-description">{servicio.descripcion}</p>
                  <p className="service-price">Precio: ${servicio.precio}</p>
                  <button onClick={() => navigate('/publicarservicio', { state: { step: 3 } })} >Crear servicio</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
};

export default PerfilProfesionalServicios;