import React from 'react';
import '../styles/seccionbusqueda.css'; 
import BarraBusquedaExplorar from '../components/barraBusquedaExplorar';    
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import SeccionImpulsar from '../components/seccionImpulsaHome';

const profesionales = [
  {
    name: 'Diseñadora UX Laura',
    description: 'Experta en diseño de interfaces amigables y experiencia de usuario.',
    distance: '3.1 Km de ti.',
    rating: 4.9,
    reviews: 32,
    author: 'Laura Gómez',
    price: '$45',
    image: '/images/pro2.jpg',
  },
  {
    name: 'Entrenador Personal Carlos',
    description: 'Rutinas personalizadas para ganar masa muscular o bajar de peso.',
    distance: '1.7 Km de ti.',
    rating: 4.8,
    reviews: 27,
    author: 'Carlos Méndez',
    price: '$30',
    image: '/images/pro3.jpg',
  },
  {
    name: 'Paseadora de Perros Sofía',
    description: 'Servicio de paseo y cuidado de mascotas con amor y responsabilidad.',
    distance: '0.9 Km de ti.',
    rating: 5.0,
    reviews: 18,
    author: 'Sofía Herrera',
    price: '$15',
    image: '/images/pro4.jpg',
  },
  {
    name: 'Programador Freelance Andrés',
    description: 'Desarrollo de sitios web, apps y soluciones personalizadas.',
    distance: '2.3 Km de ti.',
    rating: 4.7,
    reviews: 40,
    author: 'Andrés Rivas',
    price: '$60',
    image: '/images/pro5.jpg',
  },
  {
    name: 'Maestra de Inglés Paola',
    description: 'Clases personalizadas de inglés para todas las edades.',
    distance: '1.2 Km de ti.',
    rating: 4.9,
    reviews: 25,
    author: 'Paola Jiménez',
    price: '$25',
    image: '/images/pro6.jpg',
  },
  {
    name: 'Técnico Electricista Miguel',
    description: 'Instalaciones y reparaciones eléctricas certificadas.',
    distance: '3.8 Km de ti.',
    rating: 4.6,
    reviews: 15,
    author: 'Miguel Santos',
    price: '$35',
    image: '/images/pro7.jpg',
  },
  {
    name: 'Chef Privado Mariana',
    description: 'Cenas gourmet y menú personalizado para eventos en casa.',
    distance: '2.0 Km de ti.',
    rating: 5.0,
    reviews: 10,
    author: 'Mariana Vélez',
    price: '$70',
    image: '/images/pro8.jpg',
  },
  {
    name: 'Fotógrafa Profesional Lina',
    description: 'Sesiones profesionales de retrato, eventos y productos.',
    distance: '1.5 Km de ti.',
    rating: 4.8,
    reviews: 19,
    author: 'Lina Muñoz',
    price: '$50',
    image: '/images/pro9.jpg',
  },
  {
    name: 'Fotógrafa Profesional Lina',
    description: 'Sesiones profesionales de retrato, eventos y productos.',
    distance: '1.5 Km de ti.',
    rating: 4.8,
    reviews: 19,
    author: 'Lina Muñoz',
    price: '$50',
    image: '/images/pro9.jpg',
  },
  {
    name: 'Fotógrafa Profesional Lina',
    description: 'Sesiones profesionales de retrato, eventos y productos.',
    distance: '1.5 Km de ti.',
    rating: 4.8,
    reviews: 19,
    author: 'Lina Muñoz',
    price: '$50',
    image: '/images/pro9.jpg',
  },
  {
    name: 'Fotógrafa Profesional Lina',
    description: 'Sesiones profesionales de retrato, eventos y productos.',
    distance: '1.5 Km de ti.',
    rating: 4.8,
    reviews: 19,
    author: 'Lina Muñoz',
    price: '$50',
    image: '/images/pro9.jpg',
  },
  {
    name: 'Fotógrafa Profesional Lina',
    description: 'Sesiones profesionales de retrato, eventos y productos.',
    distance: '1.5 Km de ti.',
    rating: 4.8,
    reviews: 19,
    author: 'Lina Muñoz',
    price: '$50',
    image: '/images/pro9.jpg',
  },
];

const ExplorarTodoComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="section-header">
      <h1 className="services-title" style={{color:'black', fontSize:'48px', fontWeight:'750'}}>
          Descubre a todos los <span style={{ color: '#2979ff' }}>Profesionales</span>
        </h1>
        <h1 className="services-title" style={{color:'#B2BEB5', fontSize:'18px', fontWeight:'200'}}>
          Desde servicios para el hogar hasta consultoría profesional, encuentra justo lo que necesitas.
        </h1>
        
        <div className="services-header">
          <BarraBusquedaExplorar/>
        </div>
      <section className="top-rated">
        <div className="card-grid">
          {profesionales.map((pro, index) => (
            <Link
              key={index}
              to={`/servicio/${index}`} 
              className="pro-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img src={pro.image} alt={pro.name} className="pro-image" />
              <div className="pro-info">
                <h3>{pro.name}</h3>
                <p className="description">{pro.description}</p>
                <div className="details">
                  <span><FaMapMarkerAlt /> {pro.distance}</span>
                  <span><FaStar className="star" /> {pro.rating} ({pro.reviews} Reviews)</span>
                </div>
                <div className="footer">
                  <span className="author">By. {pro.author}</span>
                  <span className="price">Desde {pro.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className='banner-pro'>
          <div className="banner-content" style={{paddingTop:'30px'}}>
            <SeccionImpulsar/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExplorarTodoComponent;
