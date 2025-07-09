import React from 'react';
import '../styles/seccionbusqueda.css'; 
import BarraBusqueda from './barraBusqueda';
import BarraBusquedaCategorias from './barraBusquedaCategorias';    
import { FaLaptopCode, FaChalkboardTeacher, FaHeart, FaHammer } from 'react-icons/fa';
import { TbPlant } from "react-icons/tb";
import { PiDogFill, PiBarbellDuotone } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { GrUserWorker } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import SeccionImpulsar from './seccionImpulsaHome';

const CategoriasComponent = () => {
  const navigate = useNavigate();
  const serviceCategories = [
    { name: 'Tecnología', count: '123 Servicios', icon: <FaLaptopCode /> },
    { name: 'Jardinería', count: '123 Servicios', icon: <TbPlant /> },
    { name: 'Tecnología', count: '123 Servicios', icon: <FaLaptopCode /> },
    { name: 'Jardinería', count: '123 Servicios', icon: <TbPlant /> },
    { name: 'Mascotas', count: '123 Servicios', icon: <PiDogFill /> },
    { name: 'Tutorías', count: '123 Servicios', icon: <LiaChalkboardTeacherSolid /> },
   { name: 'Bienestar', count: '123 Servicios', icon: <PiBarbellDuotone /> },
   { name: 'Construcción', count: '123 Servicios', icon: <GrUserWorker /> },
   { name: 'Jardinería', count: '123 Servicios', icon: <TbPlant /> },
    { name: 'Mascotas', count: '123 Servicios', icon: <PiDogFill /> },
    { name: 'Tutorías', count: '123 Servicios', icon: <LiaChalkboardTeacherSolid /> },
   { name: 'Bienestar', count: '123 Servicios', icon: <PiBarbellDuotone /> },
   { name: 'Construcción', count: '123 Servicios', icon: <GrUserWorker /> },
   { name: 'Mascotas', count: '123 Servicios', icon: <PiDogFill /> },
    { name: 'Tutorías', count: '123 Servicios', icon: <LiaChalkboardTeacherSolid /> },
   { name: 'Bienestar', count: '123 Servicios', icon: <PiBarbellDuotone /> },
   { name: 'Construcción', count: '123 Servicios', icon: <GrUserWorker /> },
   { name: 'Construcción', count: '123 Servicios', icon: <GrUserWorker /> },
  ];

  return (
    <div className="page-wrapper">
      <section className="services-container">
        <h1 className="services-title" style={{color:'black', fontSize:'48px', fontWeight:'750'}}>
          Descubre todas las <span style={{ color: '#2979ff' }}>Categorias</span>
        </h1>
        <h1 className="services-title" style={{color:'#B2BEB5', fontSize:'18px', fontWeight:'200'}}>
          Desde servicios para el hogar hasta consultoría profesional, encuentra justo lo que necesitas.
        </h1>
        
        <div className="services-header">
          <BarraBusquedaCategorias/>
        </div>

        <h1 className="services-title" style={{color:'#B2BEB5', fontSize:'18px', fontWeight:'200', marginTop:'60px'}}>
          Explora todos las categorias de servicios disponibles
        </h1>
        
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
      </section>

      <div className='banner-pro'>
        <div className="banner-content">
          <SeccionImpulsar/>
        </div>
      </div>
    </div>
  );
};

export default CategoriasComponent;