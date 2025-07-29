import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <PayPalScriptProvider options={{
              'client-id': 'AboRS5ck10v0ZdZPQTDO66BT0QEffkubCa0uo6Nl66F8eQcnhWJXhLKRJV2O6zvJyC5TCfQr8le8BaGZ',
              currency: 'USD',
            }}>
            <App />
          </PayPalScriptProvider>
        </AuthProvider> 
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
