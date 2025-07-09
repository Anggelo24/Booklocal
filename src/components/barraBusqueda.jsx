import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/barrabusqueda.css'; 
import { FaSearch } from 'react-icons/fa';

const BarraBusqueda = () => {
  const [provincia, setProvincias] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [price, setPrice] = useState([0, 100]);
  const [filtro, setFiltro] = useState({
    provincia: '',
    servicio: '',
    calificacion: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [provRes, servRes] = await Promise.all([
          axios.get('/api/provincias'),
          axios.get('/api/servicios-disponibles'),
        ]);
        setProvincias(provRes.data);
        setServicios(servRes.data);
      } catch (error) {
        console.error('Error al cargar datos de búsqueda:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value });
  };

  const handleBuscar = () => {
    console.log({
      ...filtro,
      precioMin: price[0],
      precioMax: price[1]
    });
    // Aquí luego puedes redirigir o aplicar filtros a resultados
  };

  return (
    <div className="search-bar">
      {/* Provincia */}
      <div className="search-group">
        <label>Ubicación
          <select name="ubicacion" value={filtro.provincia} onChange={handleChange}>
            <option value="">Cualquiera</option>
            {provincia.map((u, i) => (
              <option key={i} value={u.provincia}>{u.provincia}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Servicio */}
      <div className="search-group">
        <label>Servicios
          <select name="servicio" value={filtro.servicio} onChange={handleChange}>
            <option value="">Cualquiera</option>
            {servicios.map((s, i) => (
              <option key={i} value={s.nombre}>{s.nombre}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Precio */}
      <div className="search-group price-slider">
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

      {/* Calificación */}
      <div className="search-group">
        <label>Calificación
          <select name="calificacion" value={filtro.calificacion} onChange={handleChange}>
            <option value="">Cualquiera</option>
            <option value="5">5 estrellas</option>
            <option value="4">4 estrellas o más</option>
            <option value="3">3 estrellas o más</option>
            <option value="2">2 estrellas o más</option>
            <option value="1">1 estrella o más</option>
          </select>
        </label>
      </div>

      <button className="search-button" onClick={handleBuscar}>
        <FaSearch />
      </button>
    </div>
  );
};

export default BarraBusqueda;