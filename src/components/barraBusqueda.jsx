import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/barrabusqueda.css';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDesignServices } from "react-icons/md";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";

const CustomSelect = ({ options, value, onChange, name, icon, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSelect = (selectedValue) => {
    onChange({ target: { name, value: selectedValue } });
    setIsOpen(false);
  };

  return (
    <div className="search-filter-group">
      <label>
        <span className="filter-icon">{icon}</span> {label}
      </label>
      <div className="custom-select">
        <div 
          className="custom-select-header"
          onClick={() => setIsOpen(!isOpen)}
        >
          {value || 'Cualquiera'}
          <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </div>
        
        {isOpen && (
          <div className="custom-select-options">
            <div 
              className="custom-option"
              onClick={() => handleSelect('')}
            >
              Cualquiera
            </div>
            {options.map((option, i) => (
              <div
                key={i}
                className="custom-option"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const BarraBusqueda = () => {
  const navigate = useNavigate();
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
    const query = new URLSearchParams({
      provincia: filtro.provincia,
      servicio: filtro.servicio,
      calificacion: filtro.calificacion,
      precioMin: price[0],
      precioMax: price[1],
    }).toString();
    navigate(`/explorarFiltrados?${query}`);
  };

  const ratingOptions = [
    { value: '5', label: '⭐⭐⭐⭐⭐' },
    { value: '4', label: '⭐⭐⭐⭐' },
    { value: '3', label: '⭐⭐⭐' },
    { value: '2', label: '⭐⭐' },
    { value: '1', label: '⭐' }
  ];

  return (
    <div className="search-bar-wrapper">
      <div className="search-filters-container">
        <CustomSelect
          name="provincia"
          value={filtro.provincia}
          onChange={handleChange}
          options={provincia.map(p => ({ value: p.provincia, label: p.provincia }))}
          icon={<FaLocationCrosshairs />}
          label="Ubicación"
        />

        <CustomSelect
          name="servicio"
          value={filtro.servicio}
          onChange={handleChange}
          options={servicios.map(s => ({ value: s.nombre, label: s.nombre }))}
          icon={<MdOutlineDesignServices />}
          label="Servicio"
        />

        <CustomSelect
          name="calificacion"
          value={filtro.calificacion}
          onChange={handleChange}
          options={ratingOptions}
          icon={<FaRegStar />}
          label="Calificación"
        />

        <div className="search-filter-group price-filter-slider">
          <label>Precio</label>
          <div className="range-slider-container">
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
          <div className="price-range-display">${price[0]} - ${price[1]}</div>
        </div>

        <button className="search-filters-button" onClick={handleBuscar}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default BarraBusqueda;