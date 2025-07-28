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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Error al enviar el mensaje');
      
      setSubmitStatus('success');
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
    } catch (err) {
      console.error('❌ Error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contacto-container" style={{ paddingTop: '120px' }}>
      {/* Additional floating shape */}
      <div className="floating-shape"></div>
      
      <div className="contacto-wrapper">
        <div className="contacto-card">
          
          {/* Left side - Hero section */}
          <div className="card-illustration-side">
            <div className="illustration-wrapper">
              <div className="contact-illustration"></div>
              <h2>Conectemos</h2>
              <p>Tu mensaje es importante para nosotros. Responderemos lo antes posible.</p>
              
              <div className="contact-details">
                <div className="detail-item">
                  <span className="icon">✉️</span>
                  <span>soporte@booklocal.com</span>
                </div>
                <div className="detail-item">
                  <span className="icon">📱</span>
                  <span>+507 6645-7262</span>
                </div>
                <div className="detail-item">
                  <span className="icon">📍</span>
                  <span>UTP, Ciudad de Panamá</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Form */}
          <div className="card-form-side">
            <div className="form-header">
              <h1>Envíanos un mensaje</h1>
              <p>Completa el formulario y te responderemos pronto</p>
            </div>
            
            <div className="contacto-form">
              {/* Status messages */}
              {submitStatus === 'success' && (
                <div className="success-message">
                  <span>¡Mensaje enviado! Te responderemos pronto.</span>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="error-message">
                  <span>Oops! Algo salió mal. Intenta nuevamente.</span>
                </div>
              )}

              {/* Form fields */}
              <div className="form-group">
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="nombre">Nombre completo</label>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="email">Correo electrónico</label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="asunto"
                  id="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="asunto">Asunto</label>
              </div>

              <div className="form-group">
                <textarea
                  name="mensaje"
                  id="mensaje"
                  rows="4"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder=" "
                  required
                ></textarea>
                <label htmlFor="mensaje">Tu mensaje</label>
              </div>

              <button 
                type="button"
                onClick={handleSubmit}
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span> 
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar mensaje</span>
                    <span>✈️</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;