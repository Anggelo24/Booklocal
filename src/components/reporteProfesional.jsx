import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css'; 

const ReporteProfesional = ({ idProfesional }) => {
  const [motivo, setMotivo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const user = JSON.parse(localStorage.getItem('usuario'));

      if (!user || !user.id_usuario) {
        setMensaje('❌ Debes iniciar sesión para enviar un reporte.');
        return;
      }

      const id_reportante = user.id_usuario;

      await axios.post('/api/reportes', {
        id_reportante,
        id_profesional_reportado: idProfesional,
        motivo
      });

      setMotivo('');
      setMensaje('✅ Reporte enviado correctamente.');
    } catch (error) {
      console.error('Error al enviar reporte:', error);
      setMensaje('❌ Error al enviar el reporte. Intenta más tarde.');
    }
  };

  return (
    <div className="login-container">
      <h3 className="login-title">Reportar Profesional</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="motivo">Motivo del Reporte</label>
          <textarea
            id="motivo"
            className="form-input"
            placeholder="Describe brevemente el motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            rows={5}
            required
          ></textarea>
        </div>
        <button type="submit" className="login-button">Enviar Reporte</button>
        {mensaje && (
          <p style={{ marginTop: '1rem', color: mensaje.includes('✅') ? 'green' : 'red' }}>
            {mensaje}
          </p>
        )}
      </form>
    </div>
  );
};

export default ReporteProfesional;
