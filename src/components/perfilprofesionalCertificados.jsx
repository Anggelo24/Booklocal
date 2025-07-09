import React, { useState } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";

const PerfilProfesionalCerti = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="certificados">
      <img src="https://res.cloudinary.com/db3espoei/image/upload/v1750708653/imagen_2025-06-23_145732023_zz1mdl.png" alt="Certificado 1" />
      <button className="agregar-certificado">
        <span 
          style={{
            display: 'inline-block',
            transition: 'transform 0.2s, color 0.2s',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            color: isHovered ? '#337efb' : 'gray',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <IoIosAddCircleOutline />
        </span>
      </button>
    </div>
  );
};

export default PerfilProfesionalCerti;