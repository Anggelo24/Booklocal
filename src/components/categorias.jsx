// src/pages/Categorias.jsx
import React, { useEffect, useState } from 'react';
import '../styles/seccionbusqueda.css';
import { useNavigate } from 'react-router-dom';


const CategoriasComponent = () => {

  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('/api/categorias')
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error('Error al cargar categorías:', err));
  }, []);

  return (
    <section className="services-container">
      <h1 className="services-title" style={{color:'black', fontSize:'48px', fontWeight:'750'}}>
        Todas las <span style={{ color: '#2979ff' }}>Categorías</span>
      </h1>
      <h1 className="services-title" style={{color:'#B2BEB5', fontSize:'18px', fontWeight:'200'}}>
        Explora todas las categorías disponibles en la plataforma.
      </h1>

      <div className="categories-container">
        {categorias.map((categoria, index) => (
          <div 
            key={index} 
            className="category-card"
            onClick={() => navigate(`/explorarcategoria/${categoria.id_categoria}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="category-icon">
            <img  className="category-icon-image" src={categoria.icono} alt={categoria.categoria}/>
            </div>
            <h4 className="category-name">{categoria.categoria}</h4>
            <p className="category-count">{categoria.total_servicios} Servicios</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriasComponent;
