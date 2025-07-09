import React, { useEffect, useState } from 'react';
import '../styles/seccionbusqueda.css'; 
import BarraBusqueda from './barraBusqueda';

import {
  FaLaptopCode,
  FaChalkboardTeacher,
  FaHeart,
  FaHammer,
  FaCut,          // barbería (tijeras)
  FaToiletPaper,  // plomería (símbolo WC)
  FaPaw,          // mascotas
  FaBroom,        // limpieza
  FaCar,          // automotriz
} from 'react-icons/fa';

import { TbPlant } from 'react-icons/tb';
import { PiDogFill, PiBarbellDuotone } from 'react-icons/pi';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { GrUserWorker } from 'react-icons/gr';
import { MdCleaningServices } from 'react-icons/md';
import { RiUserStarFill, RiToolsFill } from 'react-icons/ri';
import { BiUserCheck, BiBrush } from 'react-icons/bi';

const iconMap = {
  FaLaptopCode: <FaLaptopCode />,
  FaChalkboardTeacher: <FaChalkboardTeacher />,
  FaHeart: <FaHeart />,
  FaHammer: <FaHammer />,
  FaCut: <FaCut />,
  FaToiletPaper: <FaToiletPaper />,
  FaPaw: <FaPaw />,
  FaBroom: <FaBroom />,
  FaCar: <FaCar />,
  TbPlant: <TbPlant />,
  PiDogFill: <PiDogFill />,
  PiBarbellDuotone: <PiBarbellDuotone />,
  LiaChalkboardTeacherSolid: <LiaChalkboardTeacherSolid />,
  GrUserWorker: <GrUserWorker />,
  MdCleaningServices: <MdCleaningServices />,
  RiUserStarFill: <RiUserStarFill />,
  RiToolsFill: <RiToolsFill />,
  BiUserCheck: <BiUserCheck />,
  BiBrush: <BiBrush />,
};

const SeccionBusqueda = () => {
  const [serviceCategories, setServiceCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categorias')
      .then(res => res.json())
      .then(data => setServiceCategories(data))
      .catch(err => console.error('Error al cargar categorías:', err));
  }, []);

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
        {serviceCategories.map((category, index) => (
          <div key={index} className="category-card">
            <div className="category-icon">
              {iconMap[category.icono] || <FaHammer />} {/* fallback icon */}
            </div>
            <h4 className="category-name">{category.categoria}</h4>
            <p className="category-count">{category.total_servicios} Servicios</p>
          </div>
        ))}
      </div>

      <button className="explore-button">Explorar categorías</button>
    </section>
  );
};

export default SeccionBusqueda;
