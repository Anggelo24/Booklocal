import React, { useState } from 'react';
import '../styles/contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    alert('¡Mensaje enviado con éxito!');
    setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
  };

  return (
    <div className="contacto-container" style={{ paddingTop: '120px' }}>
      <div className="contacto-card">
        <div className="contacto-header">
          <h1>Contáctanos</h1>
          <p>¿Tienes dudas? Escríbenos y te responderemos pronto</p>
        </div>
        
        <div className="contacto-form-container">
          <form onSubmit={handleSubmit} className="contacto-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="asunto">Asunto</label>
              <input
                type="text"
                name="asunto"
                id="asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                name="mensaje"
                id="mensaje"
                rows="5"
                value={formData.mensaje}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="boton-container">  
            <button type="submit" className="submit-btn">
              Enviar 
            </button>
            </div>
          </form>
          
          <div className="contacto-info">
            <h2 style={{Color:'black'}}>Información adicional</h2>
            <div className="datos_contacto">
            <p>
              <strong>Email:</strong> soporte@booklocal.com<br />
              <strong>Teléfono:</strong> +507 6645-7262<br />
              <strong>Dirección:</strong> Universidad Tecnológica de Panamá, Ciudad de Panamá,
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;