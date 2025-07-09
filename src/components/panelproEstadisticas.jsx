import React from 'react';

const PanelProfesionalEstadis = () => {
  const estadisticas = [
    { titulo: 'Ingresos totales', valor: '💸 $235.00', subtexto: '$4,560 este mes' },
    { titulo: 'Reservas totales', valor: '✔️ 54', subtexto: '12 este mes' },
    { titulo: 'Vistas al perfil', valor: '👀 3,000', subtexto: '1,345 este mes' },
    { titulo: 'Calificación', valor: '⭐ 5.0', subtexto: '32 reviews' },
  ];

  return (
    <div className="estadisticas">
      {estadisticas.map((est, i) => (
        <div key={i} className="estadisticasCard">
          <p>{est.titulo}</p>
          <h3>{est.valor}</h3>
          <p className="sub">{est.subtexto}</p>
        </div>
      ))}
    </div>
  );
};

export default PanelProfesionalEstadis;