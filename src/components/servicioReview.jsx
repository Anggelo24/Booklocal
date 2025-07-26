import React from 'react';
import '../styles/serviciodetalles.css';

const ServicioReview = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      {['description', 'about', 'reviews'].map((tab) => (
        <button
          key={tab}
          className={activeTab === tab ? 'active' : ''}
          onClick={() => setActiveTab(tab)}
        >
          {tab === 'description' && 'Descripción'}
          {tab === 'about' && 'Acerca de'}
          {tab === 'reviews' && 'Reseñas'}
        </button>
      ))}
    </div>
  );
};

export default ServicioReview;