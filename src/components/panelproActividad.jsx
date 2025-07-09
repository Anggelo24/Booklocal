import React from 'react';

const PanelProfesionalActividad = () => {
  const actividades = [

     'Aqui va la actividad'
    
  ];

  return (
    <div className="activity-card">
      <h4>Actividad reciente</h4>
      <ul>
        {actividades.map((actividad, i) => (
          <li key={i}>{actividad}</li>
        ))}
      </ul>
    </div>
  );
};

export default PanelProfesionalActividad;