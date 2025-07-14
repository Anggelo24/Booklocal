import React, { useState } from 'react';
import '../styles/serviciodetalles.css';

const ServicioPaquetes = ({ packages }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <div className="packages-section">
      <h3>Selecciona un Paquete</h3>
      <div className="packages">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`package-card ${selectedPackage === pkg.id ? 'selected' : ''}`}
            onClick={() => setSelectedPackage(pkg.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedPackage(pkg.id)}
          >
            <div className="package-header">
              <strong style={{ fontWeight: '600' }}>{pkg.nombre}</strong>
              <span style={{ fontWeight: 'bolder', fontSize: '14px' }}>${pkg.precio}</span>
            </div>
            <p style={{ fontWeight: '100', textAlign: 'left', fontSize: '14px' }}>{pkg.descripcion}</p>
          </div>
        ))}
      </div>
      <button className="primary-btn">Seleccionar y Continuar</button>
    </div>
  );
};

export default ServicioPaquetes;
