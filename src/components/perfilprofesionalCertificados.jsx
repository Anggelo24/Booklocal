import React,{useEffect, useState} from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";

const PerfilProfesionalCerti = () => {
  const [isHovered, setIsHovered] = useState(false);

  const [profesional, setProfesional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfesionalCertificados = async () => {
      try{
        const response = await fetch('http://localhost:5000/api/profesional-info');
        if (!response.ok) {
          throw new Error(`Error al obtener la información: ${response.status}`);
        }

        const data = await response.json();

        if (!data){throw new Error('No se encontraron datos del profesional');}
        setProfesional(data);
      }catch (err) {
        console.error('Error al obtener la información profesional:', err);
        setError(err.message);
        setProfesional(null);
      }
      finally {
        setLoading(false);
      }
    };
    fetchProfesionalCertificados();
  }, []);

  if (loading) {return <div>Cargando información profesional...</div>;}
  if (error) {return <div>Error: {error}</div>;}
  if (!profesional) {return <div>No se encontró información del profesional.</div>;}

  return (
    <div className="certificados">
      <img src={profesional.documentos_certificados || "https://res.cloudinary.com/db3espoei/image/upload/v1750708653/imagen_2025-06-23_145732023_zz1mdl.png"} alt="Certificado 1" />
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