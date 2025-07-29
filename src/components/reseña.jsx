import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

const Reseña = () => {
  const { reservaId } = useParams();
  const navigate = useNavigate();
  const [calificacion, setCalificacion] = useState(5);
  const [comentario, setComentario] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario || usuario.tipo_usuario !== 'cliente') {
      return setMensaje('❌ Debes iniciar sesión como cliente para dejar una reseña.');
    }

    try {
      await axios.post('/api/resenas', {
        id_reserva: reservaId,
        id_cliente: usuario.id_usuario,
        calificacion,
        comentario
      });

      setMensaje('✅ ¡Gracias por tu reseña!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error('❌ Error al enviar reseña:', err);
      setMensaje('❌ No se pudo guardar la reseña. Intenta más tarde.');
    }
  };

  return (
    <div className="login-container">
      <h3 className="login-title">Déjanos tu opinión</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Calificación</label>
          <select
            className="form-input"
            value={calificacion}
            onChange={(e) => setCalificacion(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{n} ⭐</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Comentario (opcional)</label>
          <textarea
            className="form-input"
            rows={4}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="¿Qué te pareció el servicio?"
          ></textarea>
        </div>

        <button type="submit" className="login-button">Enviar Reseña</button>
        {mensaje && <p style={{ marginTop: '10px', color: mensaje.includes('✅') ? 'green' : 'red' }}>{mensaje}</p>}
      </form>
    </div>
  );
};

export default Reseña;
