import React, { useEffect, useState } from 'react';
import '../styles/seccionbusqueda.css'; 
import BarraBusqueda from './barraBusqueda';


import { useNavigate } from 'react-router-dom';


const SeccionBusqueda = () => {
  const [serviceCategories, setServiceCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categorias')
      .then(res => res.json())
      .then(data => setServiceCategories(data))
      .catch(err => console.error('Error al cargar categorías:', err));
  }, []);
  const navigate = useNavigate();
  return (
    <section className="services-container">
      <h1 className="services-title" style={{color:'black', fontSize:'48px', fontWeight:'750'}}>
        Descubre <span style={{ color: '#2979ff' }}>servicios</span> cerca de ti
      </h1>
      <h1 className="services-title" style={{color:'#B2BEB5', fontSize:'18px', fontWeight:'200'}}>
        Conecta con emprendores calificados dentro de tu comunidad.
      </h1>
      
      <div className="services-header">
        <BarraBusqueda />
      </div>

      <h1 className="services-title" style={{color:'#B2BEB5', fontSize:'18px', fontWeight:'200', marginTop:'60px'}}>
        Busca los servicios más agendados del mes
      </h1>
      
      <div className="categories-container">
        {serviceCategories.map((categoria, index) => (
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

  <button 
      className="explore-button"
      onClick={() => navigate('/categorias')}
    >
      Explorar categorías
    </button>

    </section>
  );
};

export default SeccionBusqueda;
