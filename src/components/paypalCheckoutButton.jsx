// src/components/PaypalCheckoutButton.jsx
import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PaypalCheckoutButton = ({ amount, payeeEmail, onSuccess }) => {
  // Validaciones previas
  if (!payeeEmail || typeof payeeEmail !== 'string') {
    return <div>❌ Error: El correo del profesional es inválido o no está definido.</div>;
  }

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return <div>❌ Error: El monto de pago es inválido.</div>;
  }

  return (
    <PayPalButtons
      style={{ layout: 'vertical' }}
      forceReRender={[amount, payeeEmail]} // Asegura actualización si cambian props
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: Number(amount).toFixed(2), // siempre string con 2 decimales
            },
            payee: {
              email_address: payeeEmail,
            },
          }],
        });
      }}
      onApprove={async (data, actions) => {
        try {
          const details = await actions.order.capture();
          onSuccess(details);
        } catch (err) {
          console.error('❌ Error al capturar el pago:', err);
        }
      }}
      onError={(err) => {
        console.error('❌ Error en PayPalButtons:', err);
      }}
    />
  );
};

export default PaypalCheckoutButton;
