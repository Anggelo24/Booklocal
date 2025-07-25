/**
 * Contacto.jsx
 * 
 * Página de contacto donde los usuarios pueden enviar un mensaje con su nombre,
 * correo, asunto y contenido. Está diseñada para que cualquier visitante o usuario
 * de la plataforma pueda establecer comunicación con el equipo de soporte.
 * 
 * 🚀 Funcionalidad:
 * - Permite llenar un formulario con 4 campos obligatorios:
 *   - nombre: nombre completo del remitente
 *   - email: dirección de correo electrónico del remitente
 *   - asunto: breve descripción del motivo de contacto
 *   - mensaje: contenido del mensaje o consulta
 * - Al enviar el formulario, los datos se envían mediante una petición POST
 *   al backend (`/api/contacto`).
 * - Si el envío es exitoso, muestra una alerta de confirmación y limpia el formulario.
 * - En caso de error, muestra un mensaje de alerta.
 * 
 * 💡 Detalles técnicos:
 * - Usa `useState` para manejar el estado del formulario.
 * - Usa `fetch` para realizar la solicitud al backend.
 * - Contiene validaciones HTML5 (`required`) para campos obligatorios.
 * 
 * 🎯 Backend esperado:
 * Una ruta POST `/api/contacto` que guarde el mensaje en la base de datos o envíe el mensaje al equipo de soporte.
 * 
 * 🧩 Estilos:
 * Se espera que los estilos estén definidos en el archivo `../styles/contacto.css`.
 * 
 * 🏁 Información adicional:
 * También muestra información de contacto estática (correo, teléfono, dirección).
 * 
 * 🔐 No requiere autenticación para usar esta pantalla.
 */

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

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!res.ok) throw new Error('Error al enviar el mensaje');
    
    alert('¡Mensaje enviado con éxito!');
    setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
  } catch (err) {
    console.error('❌ Error:', err);
    alert('No se pudo enviar el mensaje. Intenta más tarde.');
  }
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