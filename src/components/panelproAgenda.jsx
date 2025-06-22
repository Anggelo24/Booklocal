import React from 'react';

const PanelProfesionalAgenda = () => {
  const eventos = [
    
  ];

  return (
    <div className="agenda-card">
      <h4>Agenda</h4>
       <p>Aqui va la agenda</p>
      {eventos.map((evento, i) => (
        <div key={i} className="agenda-item">
          <div>
            <p>{evento.fecha}</p>
            <p>{evento.cliente}</p>
          </div>
          <button className="agenda-btn">Ver</button>
        </div>
      ))}
    </div>
  );
};

export default PanelProfesionalAgenda;