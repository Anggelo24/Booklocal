import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const PerfilProfesionalReviews = () => {
  const { usuario, token } = useContext(AuthContext);
  const [state, setState] = useState({
    reviews: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Validación completa de autenticación
        if (!token || !usuario?.id_usuario) {
          throw new Error('No autenticado o datos de usuario incompletos');
        }

        console.log(`Solicitando reseñas para profesional ID: ${usuario.id_usuario}`);
        
        const response = await axios.get('http://localhost:5000/api/resenas/profesional', {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000 // 10 segundos de timeout
        });

        console.log('Respuesta del servidor:', response.data);

        if (!response.data?.success) {
          throw new Error(response.data?.error || 'Respuesta inesperada del servidor');
        }

        setState({
          reviews: response.data.data || [],
          loading: false,
          error: null
        });

      } catch (err) {
        console.error('Error al obtener reseñas:', {
          message: err.message,
          code: err.code,
          response: err.response?.data
        });
        
        setState(prev => ({
          ...prev,
          loading: false,
          error: err.response?.data?.error || err.message || 'Error desconocido'
        }));
      }
    };

    fetchReviews();

    // Limpieza
    return () => {
      // Opcional: Cancelar la petición si el componente se desmonta
    };
  }, [token, usuario?.id_usuario]);

  const renderStars = (rating) => {
    const numericRating = Number(rating) || 0;
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} className={star <= numericRating ? 'filled' : 'empty'}>
            {star <= numericRating ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  // Renderizado condicional
  if (state.loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando reseñas...</p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="error-container">
        <h4>Error al cargar reseñas</h4>
        <p>{state.error}</p>
        <button 
          onClick={() => setState(prev => ({ ...prev, loading: true, error: null }))}
          className="retry-button"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="reviews-section">
      <h3>Reseñas de Clientes ({state.reviews.length})</h3>
      
      {state.reviews.length > 0 ? (
        <div className="reviews-grid">
          {state.reviews.map(review => (
            <div key={review.id_reserva} className="review-card">
              <div className="review-header">
                <span className="client-name">{review.cliente}</span>
                <span className="review-date">{review.fecha}</span>
                {renderStars(review.calificacion)}
              </div>
              <p className="review-comment">{review.comentario}</p>
              <div className="service-info">Servicio: {review.servicio}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-reviews">
          <p>📭 No hay reseñas disponibles</p>
          <small>Las reseñas aparecerán aquí cuando los clientes evalúen tus servicios</small>
        </div>
      )}
    </div>
  );
};

export default PerfilProfesionalReviews;