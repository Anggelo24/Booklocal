import React, { useState } from 'react';
import '../styles/barrabusqueda.css'; 
import { FaSearch } from 'react-icons/fa';

const BarraBusqueda = () => {
  const [price, setPrice] = useState([0, 100]);

  return (
    <div className="search-bar">
      <div className="search-group">
        <label>Ubicación
          <input type="text" placeholder="Busca servicios cerca de ti." />
        </label>
      </div>
      <div className="search-group">
        <label>Servicios
          <input type="text" placeholder="¿Qué necesitas?" />
        </label>
      </div>
      <div className="search-group price-slider">
        <label>Precio
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="100"
              value={price[0]}
              onChange={(e) => setPrice([+e.target.value, price[1]])}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={price[1]}
              onChange={(e) => setPrice([price[0], +e.target.value])}
            />
          </div>
          <div className="price-range">${price[0]} - ${price[1]}</div>
        </label>
      </div>
      <div className="search-group">
        <label>Calificación
          <input type="text" placeholder="Calidad del servicio" />
        </label>
      </div>
      <button className="search-button">
        <FaSearch />
      </button>
    </div>
  );
};

export default BarraBusqueda;
