import React, { useState } from 'react';
import '../styles/serviciodetalles.css';

const ServicioImagenes = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="image-gallery">
      <img className="main-image" src={mainImage} alt="Imagen principal del servicio" />
      <div className="thumbnail-row">
        {images.map((img, idx) => (
          <img 
            key={idx}
            src={img}
            alt={`Miniatura ${idx}`}
            className="thumbnail"
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicioImagenes;
