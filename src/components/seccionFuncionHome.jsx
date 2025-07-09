import React from "react";
import "../styles/funcionabooklocal.css";

const FuncionaBooklocal = () => {
  const steps = [
    {
      title: "Descubre",
      description: "Navega entre una variedad de servicios locales y encuentra justo lo que necesitas",
      icon: "🔍"
    },
    {
      title: "Agenda",
      description: "Confirma tu cita en segundos, sin complicaciones",
      icon: "📅"
    },
    {
      title: "Califica",
      description: "Recibe servicio de calidad y califica al cumplir tus expectativas",
      icon: "⭐"
    }
  ];

  return (
    <div className="how-it-works">
      <div className="header">
        <h1>¿Cómo funciona BookLocal?</h1>
        <p className="tagline" style={{color:'#B2BEB5', fontSize:'18px', fontWeight:'200'}}>Simple, Rápido y Seguro.</p>
      </div>
      
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FuncionaBooklocal;