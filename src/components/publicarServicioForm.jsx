import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import "../styles/publicarform.css";

export default function PublicarServicioForm() {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([{ id: 1 }]);

  const goNext = () => setStep((s) => Math.min(s + 1, 3));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const addService = () => {
    setServices([...services, { id: Date.now() }]);
  };

  const removeService = (id) => {
    if (services.length > 1) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  return (
    <div className="publish-form-container">
      <div className="form-step-indicator" style={{paddingTop:'90px'}}>
        <div className={`step ${step >= 1 ? "completed" : ""}`}>1</div>
        <div className={`step ${step >= 2 ? "completed" : ""}`}>2</div>
        <div className={`step ${step === 3 ? "completed" : ""}`}>3</div>
      </div>

      <div className="form-wrapper">
        {step === 1 && (
          <FormStep1 goNext={goNext} />
        )}

        {step === 2 && (
          <FormStep2 goBack={goBack} goNext={goNext} />
        )}

        {step === 3 && (
          <FormStep3 
            services={services} 
            removeService={removeService} 
            goBack={goBack} 
          />
        )}
      </div>

      {step === 3 && (
        <div className="add-service-container">
          <button onClick={addService} className="add-service-button">
            <FaPlus className="plus-icon" />
            Agregar otro servicio
          </button>
        </div>
      )}
    </div>
  );
}

function FormStep1({ goNext }) {
  return (
    <>
      <h2 className="form-title">Completa tu perfil</h2>
      <p className="form-subtitle">Cuéntanos tu experiencia y especialidades</p>

      <form className="profile-form">
        <fieldset>
          <legend>Información profesional</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Primer nombre</label>
              <input type="text" id="firstName" name="firstName" placeholder="Tu primer nombre" />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Apellido</label>
              <input type="text" id="lastName" name="lastName" placeholder="Tu apellido" />
            </div>
            <div className="form-group">
              <label htmlFor="cedula">Cédula</label>
              <input type="number" id="cedula" name="cedula" placeholder="Tu cédula" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="correo@email.com" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input type="tel" id="phone" name="phone" placeholder="+507" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="businessName">Nombre de negocio (Opcional)</label>
            <input type="text" id="businessName" name="businessName" placeholder="Tu negocio" />
          </div>

          <div className="form-group">
            <label htmlFor="experience">Años de experiencia</label>
            <select id="experience" name="experience">
              <option value="">Selecciona tu nivel de experiencia</option>
              <option value="0-1">0-1 años</option>
              <option value="2-3">2-3 años</option>
              <option value="4-5">4-5 años</option>
              <option value="6+">6+ años</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="bio">Biografía Profesional</label>
            <textarea 
              id="bio" 
              name="bio" 
              placeholder="Cuéntale a tus clientes potenciales sobre tu experiencia, tus habilidades y lo que te hace único..." 
              rows={5} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Ubicación</label>
            <input type="text" id="location" name="location" placeholder="Ciudad y Provincia" />
          </div>

          <div className="form-group">
            <label>Especialidades</label>
            <div className="checkbox-group">
              {["Plomería", "Electricidad", "Carpintería", "Jardinería", "Limpieza"].map((specialty) => (
                <label key={specialty} className="checkbox-label">
                  <input type="checkbox" name="specialties" value={specialty} />
                  <span className="checkmark"></span>
                  {specialty}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Disponibilidad</label>
            <div className="checkbox-group">
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
                <label key={day} className="checkbox-label">
                  <input type="checkbox" name="availability" value={day} />
                  <span className="checkmark"></span>
                  {day}
                </label>
              ))}
            </div>
          </div>
        </fieldset>
        <div className="form-actions">
          <button type="button" disabled>Anterior</button>
          <button type="button" onClick={goNext}>Siguiente</button>
        </div>
      </form>
    </>
  );
}

function FormStep2({ goBack, goNext }) {
  return (
    <>
      <h2 className="form-title">Sube tu foto y documentos</h2>
      <p className="form-subtitle">Agrega tus certificaciones</p>

      <form className="profile-form">
        <fieldset>
          <legend>Foto de perfil</legend>
          <div className="upload-box">
            <div className="photo-upload">
              <div className="photo-placeholder"></div>
              <button type="button" className="upload-button">Subir foto</button>
              <p className="upload-hint">Sube una foto profesional (máx. 5MB)</p>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Certificaciones y Documentos (Opcional)</legend>
          <div className="upload-box">
            <div className="doc-upload">
              <div className="doc-placeholder">
                <FaPlus className="upload-icon" />
                <p className="upload-text">Arrastra archivos aquí o haz clic para seleccionar</p>
                <p className="upload-subtext">Formatos aceptados: PDF, JPG, PNG (máx. 10MB cada uno)</p>
              </div>
              <input type="file" multiple className="file-input" />
            </div>
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="button" onClick={goBack}>Anterior</button>
          <button type="button" onClick={goNext}>Siguiente</button>
        </div>
      </form>
    </>
  );
}

function FormStep3({ services, removeService, goBack }) {
  return (
    <>
      <h2 className="form-title">Crea tus servicios</h2>
      <p className="form-subtitle">Agrega los servicios que vas a ofrecer</p>

      <form className="profile-form">
        {services.map((service, index) => (
          <fieldset key={service.id} className="service-fieldset">
            <legend>
              Servicio {index + 1}
              {services.length > 1 && (
                <button 
                  type="button" 
                  className="remove-service" 
                  onClick={() => removeService(service.id)}
                  aria-label="Eliminar servicio"
                >
                  <FaTimes />
                </button>
              )}
            </legend>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`service-name-${service.id}`}>Nombre del servicio</label>
                <input 
                  type="text" 
                  id={`service-name-${service.id}`}
                  name={`service-name-${service.id}`}
                  placeholder="ej. Plomero 24/7" 
                />
              </div>
              <div className="form-group">
                <label htmlFor={`category-${service.id}`}>Categoría</label>
                <select id={`category-${service.id}`} name={`category-${service.id}`}>
                  <option value="">Selecciona una categoría</option>
                  <option value="plomeria">Plomería</option>
                  <option value="electricidad">Electricidad</option>
                  <option value="carpinteria">Carpintería</option>
                  <option value="jardineria">Jardinería</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor={`description-${service.id}`}>Descripción</label>
              <textarea 
                id={`description-${service.id}`}
                name={`description-${service.id}`}
                placeholder="Describe el servicio que vas a ofrecer" 
                rows={5} 
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`price-${service.id}`}>Precio</label>
                <div className="price-input">
                  <span className="currency-symbol">$</span>
                  <input 
                    type="number" 
                    id={`price-${service.id}`}
                    name={`price-${service.id}`}
                    placeholder="45" 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor={`duration-${service.id}`}>Duración</label>
                <select id={`duration-${service.id}`} name={`duration-${service.id}`}>
                  <option value="">Selecciona duración</option>
                  <option value="30min">30 minutos</option>
                  <option value="1h">1 hora</option>
                  <option value="2h">2 horas</option>
                  <option value="medio-dia">Medio día</option>
                  <option value="dia-completo">Día completo</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor={`location-${service.id}`}>Ubicación</label>
                <input 
                  type="text" 
                  id={`location-${service.id}`}
                  name={`location-${service.id}`}
                  placeholder="Ciudad y Provincia" 
                />
              </div>
            </div>
            
            <fieldset className="service-documents">
              <legend>Documentos del servicio (Opcional)</legend>
              <div className="upload-box">
                <div className="doc-upload">
                  <div className="doc-placeholder">
                    <FaPlus className="upload-icon" />
                    <p className="upload-text">Sube fotos o certificados relacionados</p>
                    <p className="upload-subtext">Máximo 5 archivos (JPG, PNG, PDF)</p>
                  </div>
                  <input 
                    type="file" 
                    multiple 
                    className="file-input" 
                    accept=".jpg,.jpeg,.png,.pdf" 
                  />
                </div>
              </div>
            </fieldset>
          </fieldset>
        ))}

        <div className="form-actions">
          <button type="button" onClick={goBack}>Anterior</button>
          <button type="submit" className="publish-button">Publicar servicios</button>
        </div>
      </form>
    </>
  );
}