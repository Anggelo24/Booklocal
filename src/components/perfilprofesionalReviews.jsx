import React from 'react';

const PerfilProfesionalReviews = () => {
  const reviews = [
    {
      name: 'Usuario de Ejemplo',
      date: '09/06/2025',
      rating: 5,
      text: 'Reseña desde la BD'
    },
  ];

  return (
    <div className="card reviews">
      <h3>Reseñas</h3>
      {reviews.map((review, index) => (
        <div key={index} className="review">
          <p><strong>{review.name}</strong> {review.date}</p>
          <span className="stars">⭐⭐⭐⭐⭐</span>
          <p>{review.text}</p>
        </div>
      ))}
    </div>
  );
};

export default PerfilProfesionalReviews;
