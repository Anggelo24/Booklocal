import React from 'react';

const PanelProfesionalServicios = () => {
  const servicios = [
    { nombre: 'Programación Front-end', reseñas: 23, ingresos: '$95.00', rating: 5.0 },
    { nombre: 'Marketing Digital', reseñas: 20, ingresos: '$113.70', rating: 5.0 },
  ];

  return (
    <div className="seccionServicios">
      <h3>Servicios ofrecidos</h3>
      <div className="tablaServicios">
        {servicios.map((servicio, i) => (
          <div key={i} className="serviciosFila">
            <div style={{textAlign: 'left'}}>
              <h1 style={{fontSize:'16px'}}>{servicio.nombre}</h1>
              <p style={{fontSize:'14px', color:'gray'}}>{servicio.reseñas} Reviews • Ingresos {servicio.ingresos} • ⭐ {servicio.rating}</p>
            </div>
            <button className="botonStatus">Activo</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelProfesionalServicios;