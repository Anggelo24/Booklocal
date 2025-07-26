import React from 'react';
import '../styles/seccioncalificados.css';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const profesionales = [
  {
    name: 'Barber Profesional Jorge',
    description: 'Barbero profesional con años de experiencia ofrece servicios de corte de cabello clásico y moderno.',
    distance: '2.5 Km de ti.',
    rating: 5.0,
    reviews: 12,
    author: 'Jorge Rodríguez',
    price: '$20',
    image: 'https://res.cloudinary.com/db3espoei/image/upload/v1750529244/imagen_2025-06-21_130721032_lej5hz.png',
    
  },

{
    name: 'Barber Profesional Jorge',
    description: 'Barbero profesional con años de experiencia ofrece servicios de corte de cabello clásico y moderno.',
    distance: '2.5 Km de ti.',
    rating: 5.0,
    reviews: 12,
    author: 'Jorge Rodríguez',
    price: '$20',
    image: '/images/pro1.jpg',
},

{
    name: 'Barber Profesional Jorge',
    description: 'Barbero profesional con años de experiencia ofrece servicios de corte de cabello clásico y moderno.',
    distance: '2.5 Km de ti.',
    rating: 5.0,
    reviews: 12,
    author: 'Jorge Rodríguez',
    price: '$20',
    image: '/images/pro1.jpg',
},

{
    name: 'Barber Profesional Jorge',
    description: 'Barbero profesional con años de experiencia ofrece servicios de corte de cabello clásico y moderno.',
    distance: '2.5 Km de ti.',
    rating: 5.0,
    reviews: 12,
    author: 'Jorge Rodríguez',
    price: '$20',
    image: '/images/pro1.jpg',
},

{
    name: 'Barber Profesional Jorge',
    description: 'Barbero profesional con años de experiencia ofrece servicios de corte de cabello clásico y moderno.',
    distance: '2.5 Km de ti.',
    rating: 5.0,
    reviews: 12,
    author: 'Jorge Rodríguez',
    price: '$20',
    image: '/images/pro1.jpg',
},

{
    name: 'Barber Profesional Jorge',
    description: 'Barbero profesional con años de experiencia ofrece servicios de corte de cabello clásico y moderno.',
    distance: '2.5 Km de ti.',
    rating: 5.0,
    reviews: 12,
    author: 'Jorge Rodríguez',
    price: '$20',
    image: '/images/pro1.jpg',
},

{
    name: 'Barber Profesional Jorge',
    description: 'Barbero profesional con años de experiencia ofrece servicios de corte de cabello clásico y moderno.',
    distance: '2.5 Km de ti.',
    rating: 5.0,
    reviews: 12,
    author: 'Jorge Rodríguez',
    price: '$20',
    image: '/images/pro1.jpg',
},

{
    name: 'Barber Profesional Jorge',
    description: 'Barbero profesional con años de experiencia ofrece servicios de corte de cabello clásico y moderno.',
    distance: '2.5 Km de ti.',
    rating: 5.0,
    reviews: 12,
    author: 'Jorge Rodríguez',
    price: '$20',
    image: '/images/pro1.jpg',
},

];

const SeccionCalificados = () => {
const navigate = useNavigate();
  return (
    <div className="section-header" >
      <h1>Mejor Calificados</h1>
      <h3 style={{color: '#B2BEB5', fontSize:'18px', paddingBottom:'25px', fontWeight:'200'}}>Descubre los profesionales con mejor rating </h3>
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
        <button 
      className="explore-button"
      onClick={() => navigate('/explorartodo')}
    >
      Explorar Todo
    </button>
      </section>
    </div>
  );
};

export default SeccionCalificados;
