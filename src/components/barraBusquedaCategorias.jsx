import React from "react";
import barraBusquedaCate from '../styles/barraBusquedaCate.css'

const BarraBusquedaCategorias = () => {
  
  return (
    <label className="search-bar-container" htmlFor="search-bar">
      <input
        id="search-bar"
        placeholder="Busca Categorias"
        className="search-input"
      />
      <button className="search-button">
        <div className="spinner-container">
          <div className="spinner-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="spinner-circle"
                cx="12"
                cy="12"
                r="10"
              ></circle>
              <path
                className="spinner-path"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>

          <div className="button-content">
            <span className="button-text">Buscar</span>
          </div>
        </div>
      </button>
    </label>
  );
};

export default BarraBusquedaCategorias;
