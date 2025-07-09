import React, { useState } from 'react';
import '../styles/barrabusqueda.css'; 
import { FaSearch } from 'react-icons/fa';

const BarraBusqueda = () => {
  const [price, setPrice] = useState([0, 100]);

  return (
    <div className="search-filters-container">
      <div className="search-filter-group">
        <label>Ubicación
          <input type="text" placeholder="Busca servicios cerca de ti." />
        </label>
      </div>
      <div className="search-filter-group">
        <label>Servicios
          <input type="text" placeholder="¿Qué necesitas?" />
        </label>
      </div>
      <div className="search-filter-group price-filter-slider">
        <label>Precio
          <div className="range-slider-container">
            <input
              type="range"
              min="0"
              max="100"
              value={price[0]}
              onChange={(e) => setPrice([+e.target.value, price[1]])}
            />
          </div>
          <div className="price-range-display">${price[0]} - ${price[1]}</div>
        </label>
      </div>
      <div className="search-filter-group">
        <label>Calificación
          <input type="text" placeholder="Calidad del servicio" />
        </label>
      </div>
      <button className="search-filters-button">
        <FaSearch />
      </button>
    </div>
  );
};

export default BarraBusqueda;