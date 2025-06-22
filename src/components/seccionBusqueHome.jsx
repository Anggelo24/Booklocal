import React from 'react';
import '../styles/seccionbusqueda.css'; 
import BarraBusqueda from './barraBusqueda';
import { FaLaptopCode, FaChalkboardTeacher, FaHeart, FaHammer } from 'react-icons/fa';
import { TbPlant } from "react-icons/tb";
import { PiDogFill, PiBarbellDuotone } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { GrUserWorker } from "react-icons/gr";

const SeccionBusqueda = () => {
  const serviceCategories = [
    { name: 'Tecnología', count: '123 Servicios', icon: <FaLaptopCode /> },
    { name: 'Jardinería', count: '123 Servicios', icon: <TbPlant /> },
    { name: 'Mascotas', count: '123 Servicios', icon: <PiDogFill /> },
    { name: 'Tutorías', count: '123 Servicios', icon: <LiaChalkboardTeacherSolid /> },
    { name: 'Bienestar', count: '123 Servicios', icon: <PiBarbellDuotone /> },
    { name: 'Construcción', count: '123 Servicios', icon: <GrUserWorker /> },
  ];

  return (
    <section className="services-container">
      <h1 className="services-title" style={{color:'black', fontSize:'48px', fontWeight:'750'}}>Descubre <span style={{ color: '#2979ff' }}>servicios</span> cerca de ti</h1>
      <h1 className="services-title" style={{color:'#B2BEB5', fontSize:'18px', fontWeight:'200'}}>Conecta con emprendores calificados dentro de tu comunidad.</h1>
      
      <div className="services-header">
        <BarraBusqueda />
      </div>

      <h1 className="services-title" style={{color:'#B2BEB5', fontSize:'18px', fontWeight:'200', marginTop:'60px'}}>Busca los servicios más agendados del mes</h1>
      
      <div className="categories-container">
        {serviceCategories.map((category, index) => (
          <div key={index} className="category-card">
            <div className="category-icon">
              {category.icon}
            </div>
            <h4 className="category-name">{category.name}</h4>
            <p className="category-count">{category.count}</p>
          </div>
        ))}
      </div>

      <button className="explore-button">Explorar categorías</button>
    </section>
  );
};

export default SeccionBusqueda;