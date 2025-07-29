import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

const PagoServicio = () => {
  const { id } = useParams(); // id del servicio
  const navigate = useNavigate();
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [error, setError] = useState('');

  const handleReservar = async (e) => {
    e.preventDefault();
    setError('');

    if (!fecha || !hora) {
      return setError('Debes seleccionar fecha y hora para reservar.');
    }

    // Validación fecha y hora
    const ahora = new Date();
    const fechaSeleccionada = new Date(fecha + 'T' + hora + ':00'); // fecha y hora seleccionadas

    // Validar que la fecha no sea anterior a hoy
    const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate()); // solo fecha sin tiempo
    const fechaSoloSeleccionada = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth(), fechaSeleccionada.getDate());

    if (fechaSoloSeleccionada < hoy) {
      return setError('No puedes reservar para una fecha anterior a hoy.');
    }

    // Si es la misma fecha, validar diferencia de 1 hora
    if (fechaSoloSeleccionada.getTime() === hoy.getTime()) {
      const diffMs = fechaSeleccionada.getTime() - ahora.getTime();
      const diffHoras = diffMs / (1000 * 60 * 60);

      if (diffHoras < 1) {
        return setError('Para reservas el mismo día, la hora debe ser al menos 1 hora después de la hora actual.');
      }
    }

    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      if (!usuario || usuario.tipo_usuario !== 'cliente') {
        return setError('Debes iniciar sesión como cliente.');
      }

      const res = await axios.post('/api/reservas', {
        id_servicio: id,
        id_cliente: usuario.id_usuario,
        fecha_reserva: fecha,
        hora_reserva: hora + ':00'
      });

      const idReserva = res.data.id_reserva;
      navigate(`/pago/${idReserva}`);
    } catch (err) {
      console.error('Error al crear reserva:', err);
      setError('Ocurrió un error al generar la reserva.');
    }
  };

  return (
    <div className="login-container">
      <h3 className="login-title">Confirmación del Servicio</h3>
      <form className="login-form" onSubmit={handleReservar}>
        <div className="form-group">
          <label>Fecha del Servicio</label>
          <input
            type="date"
            className="form-input"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            min={new Date().toISOString().split('T')[0]} // evita fechas pasadas en el selector
          />
        </div>
        <div className="form-group">
          <label>Hora del Servicio</label>
          <input
            type="time"
            className="form-input"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </div>

        <button className="login-button" type="submit">
          Continuar al Pago
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
};

export default PagoServicio;
