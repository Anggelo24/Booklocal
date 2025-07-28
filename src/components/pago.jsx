// src/components/Pago.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaypalCheckoutButton from './paypalCheckoutButton';
import '../styles/pagos.css';
import { SiBitcoinsv } from "react-icons/si";

const Pago = () => {
  const { reservaId } = useParams();
  const navigate = useNavigate();

  const [monto, setMonto] = useState(null);
  const [payeeEmail, setPayeeEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!reservaId) return;
    axios.get(`/api/reservas/${reservaId}/detalle-pago`)
      .then(res => {
        setMonto(res.data.monto);
        setPayeeEmail(res.data.paypal_email);
      })
      .catch(err => {
        console.error('Error al obtener detalles del pago:', err);
        setError('No se pudo obtener el detalle del pago.');
      });
  }, [reservaId]);

  const handleSuccess = async (details) => {
    try {
      await axios.post('/api/pagos', {
        id_reserva: reservaId,
        monto,
        metodo_pago: 'paypal',
      });

      alert('✅ Pago exitoso y registrado');
      navigate(`/reseña/${reservaId}`);
    } catch (err) {
      console.error('Error al registrar el pago:', err);
      alert('Error al registrar el pago.');
    }
  };

  if (error) return <div style={{ padding: 20, color: 'red' }}>{error}</div>;
  if (monto === null) return <div style={{ padding: 20 }}>Cargando...</div>;

  return (
  <div className="container_pago">
    <div className="form_pago">
      <div className="payment_header">
        <h2 className="payment_title">Método de Pago</h2>
        <p className="payment_amount">Total: ${monto.toFixed(2)}</p>
      </div>

      <div className="payment_methods">
        <label className="payment_method_label">Selecciona tu método de pago</label>
        
        <button className="payment_button boton_pago_crypto">
          <span>🔐</span>
          Crypto Wallet
        </button>
        
        <button className="payment_button boton_pago_clave">
          <span>🔑</span>
          Pago con Clave
        </button>
      </div>

      <div className="paypal_section">
        <p className="paypal_label">O paga con</p>
        <PaypalCheckoutButton 
          amount={monto} 
          onSuccess={handleSuccess} 
          payeeEmail={payeeEmail} 
        />
      </div>

      <div className="security_info">
        <span className="security_icon">🛡️</span>
        <span className="security_text">Pago 100% seguro y protegido</span>
      </div>

      <p className="terms_text">
        Al proceder con el pago, aceptas los{' '}
        <a href="#" className="terms_link">Términos y Condiciones</a>{' '}
        y la{' '}
        <a href="#" className="terms_link">Política de Privacidad</a>{' '}
        de BookLocal.
      </p>
    </div>
  </div>
);
};

export default Pago;
