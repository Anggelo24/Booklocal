// src/pages/Categorias.jsx
import React, { useEffect, useState } from 'react';
import '../styles/seccionbusqueda.css';
import {
  FaLaptopCode, FaChalkboardTeacher, FaHeart, FaHammer,
  FaCut, FaToiletPaper, FaPaw, FaBroom, FaCar
} from 'react-icons/fa';
import { TbPlant } from 'react-icons/tb';
import { PiDogFill, PiBarbellDuotone } from 'react-icons/pi';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { GrUserWorker } from 'react-icons/gr';
import { MdCleaningServices } from 'react-icons/md';
import { RiUserStarFill, RiToolsFill } from 'react-icons/ri';
import { BiUserCheck, BiBrush } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

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
              {iconMap[categoria.icono] || <FaHammer />}
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
