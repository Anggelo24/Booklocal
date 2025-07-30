import React, { useState, useEffect, useContext } from "react";
import { useNavigate , useLocation} from "react-router-dom";
import { FaPlus, FaTimes } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext';
import "../styles/publicarform.css";
import axios from "axios";

export default function PublicarServicioForm() {
  const { usuario, token, logout } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(location.state?.step || 1);
  const [services, setServices] = useState([{ id: 1 }]);
  const [formData, setFormData] = useState({
    bio: '',
    especialidades: [],
    disponibilidad: [],
    provincia: '',
    direccion: '',
    foto_perfil: null,
    documentos_certificados: []
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (usuario?.id_usuario) setUserId(usuario.id_usuario);
    if (!token) {
      logout();
      navigate('/login');
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categorias');
        setCategories(response.data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    fetchCategories();
  }, [usuario, token, navigate, logout]);

  const handleFormDataUpdate = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setSuccess('');

    if (!userId) {
      setError('No se pudo identificar al usuario');
      return;
    }

    if (!formData.bio || !formData.provincia || !formData.direccion) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }

    if (formData.especialidades.length === 0) {
      setError('Selecciona al menos una especialidad');
      return;
    }

    try {
      const dataToSend = new FormData();
      
      // Datos básicos
      dataToSend.append('id_usuario', userId);
      dataToSend.append('bio', formData.bio);
      dataToSend.append('provincia', formData.provincia);
      dataToSend.append('direccion', formData.direccion);
      dataToSend.append('especialidades', JSON.stringify(formData.especialidades));
      dataToSend.append('disponibilidad', JSON.stringify(formData.disponibilidad));
      
      // Archivos
      if (formData.foto_perfil) {
        dataToSend.append('foto_perfil', formData.foto_perfil);
      }
      
      if (formData.documentos_certificados?.length > 0) {
        formData.documentos_certificados.forEach(doc => {
          dataToSend.append('documentos_certificados', doc);
        });
      }

      const response = await axios.post('http://localhost:5000/api/usuario-profesional', dataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setSuccess('Perfil profesional creado exitosamente!');
      setTimeout(() => navigate('/perfilprofesional'), 2000);

    } catch (err) {
      console.error('Error detallado:', err);
      const errorMsg = err.response?.data?.error || 
                      err.response?.data?.message || 
                      'Error al crear perfil profesional';
      setError(errorMsg);
    }
  };

  const goNext = () => setStep(s => Math.min(s + 1, 3));
  const goBack = () => setStep(s => Math.max(s - 1, 1));

  const addService = () => setServices([...services, { id: Date.now() }]);
  const removeService = (id) => {
    if (services.length > 1) setServices(services.filter(s => s.id !== id));
  };

  return (
    <div className="publish-form-container">
      <div className="form-step-indicator" style={{paddingTop: '90px'}}>
        {[1, 2, 3].map(num => (
          <div key={num} className={`step ${step >= num ? "completed" : ""}`}>{num}</div>
        ))}
      </div>

      <div className="form-wrapper">
        {step === 1 && (
          <FormStep1 goNext={goNext} updateFormData={handleFormDataUpdate} />
        )}

        {step === 2 && (
          <FormStep2 
            goBack={goBack} 
            goNext={goNext} 
            updateFormData={handleFormDataUpdate}
            handleSubmit={handleSubmit}
          />
        )}

        {step === 3 && (
          <FormStep3 
            services={services} 
            removeService={removeService} 
            goBack={goBack} 
            categorias={categories}
            provincia={formData.provincia}
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

function FormStep1({ goNext, updateFormData }) {
  const [formData, setFormData] = useState({
    bio: '',
    provincia: '',
    direccion: '',
    especialidades: [],
    disponibilidad: [],
    tipo_usuario : 'profesional'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const updatedData = ({...formData, [e.target.name]: e.target.value});
    setFormData(updatedData);
    updateFormData(updatedData);
  };

  const handleTextAreaChange = (e) => {
    const updatedData = ({...formData, [e.target.name]: e.target.value});
    setFormData(updatedData);
    updateFormData(updatedData);
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const updatedData = {
      ...formData,
      [name]: checked 
        ? [...formData[name], value] 
        : formData[name].filter(item => item !== value)
    };
    setFormData(updatedData);
    updateFormData(updatedData);
  };

  const handleNextAttempt = () => {
    const requiredFields = ['bio', 'provincia', 'direccion'];
    const isEmpty = requiredFields.some(field => !formData[field].trim());

    if (isEmpty) {
      setError('Por favor completa todos los campos obligatorios.'); 
      return;
    }
    setShowModal(true);
  }

  const handleConfirm = () => {
    console.log("Datos del Paso 1:", formData);
    updateFormData(formData);
    setShowModal(false);
    goNext();
  }

  const handleCancel = () => {
    setShowModal(false);
  } 
    
  return (
    <>
      <h2 className="form-title">Completa tu perfil</h2>
      <p className="form-subtitle">Cuéntanos tu experiencia y especialidades</p>

      {error && <div className="error-message">{error}</div>}

      <form className="profile-form">
        <fieldset>
          <legend>Información profesional</legend>

          <div className="form-group">
            <label htmlFor="bio">Biografía Profesional</label>
            <textarea 
              id="bio" 
              name="bio" 
              value={formData.bio}
              onChange={handleTextAreaChange}
              placeholder="Cuéntale a tus clientes potenciales sobre tu experiencia, tus habilidades y lo que te hace único..." 
              rows={5} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="provincia">Provincia</label>
            <input
              type="text"
              name="provincia"
              id="provincia" 
              value={formData.provincia}
              onChange={handleChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="direccion">Ubicación</label>
            <input 
              type="text" 
              id="direccion" 
              name="direccion"
              value={formData.direccion} 
              onChange={handleChange}/>
          </div>

          <div className="form-group">
            <label>Especialidades</label>
            <div className="checkbox-group">
              {/* Construcción y reparaciones */}
              <div className="category-divider">
                <h4>🏗️ Construcción y Reparaciones</h4>
                {["Plomería", "Electricidad residencial", "Carpintería", "Albañilería", 
                  "Pintura de interiores", "Instalación de pisos", "Drywall", 
                  "Reparación de techos", "Herrería", "Instalación de ventanas"].map((especialidad) => (
                  <label key={especialidad} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="especialidades" 
                      value={especialidad} 
                      checked={formData.especialidades.includes(especialidad)}
                      onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                    {especialidad}
                  </label>
                ))}
              </div>

              {/* Hogar y mantenimiento */}
              <div className="category-divider">
                <h4>🏠 Hogar y Mantenimiento</h4>
                {["Limpieza residencial", "Limpieza de alfombras", "Organización de espacios",
                  "Jardinería", "Poda de árboles", "Instalación de riego automático",
                  "Control de plagas", "Lavado de exteriores", "Mantenimiento de piscinas"].map((especialidad) => (
                  <label key={especialidad} className="checkbox-label">
                      <input 
                      type="checkbox" 
                      name="especialidades" 
                      value={especialidad} 
                      checked={formData.especialidades.includes(especialidad)}
                      onChange={handleCheckboxChange}/>
                      <span className="checkmark"></span>
                    {especialidad}
                  </label>
                ))}
              </div>

              {/* Tecnología */}
              <div className="category-divider">
                <h4>💻 Tecnología</h4>
                {["Reparación de computadoras", "Reparación de celulares", "Instalación de redes WiFi",
                  "Desarrollo web", "Diseño gráfico", "Marketing digital", 
                  "Edición de video", "Fotografía profesional", "Sesiones de fotos"].map((especialidad) => (
                  <label key={especialidad} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="especialidades" 
                      value={especialidad} 
                      checked={formData.especialidades.includes(especialidad)}
                      onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                    {especialidad}
                  </label>
                ))}
              </div>

              {/* Belleza y cuidado personal */}
              <div className="category-divider">
                <h4>💅 Belleza y Cuidado Personal</h4>
                {["Barbería", "Peluquería", "Manicura y pedicura", "Maquillaje profesional",
                  "Depilación", "Estética facial", "Masajes terapéuticos"].map((especialidad) => (
                  <label key={especialidad} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="especialidades" 
                      value={especialidad} 
                      checked={formData.especialidades.includes(especialidad)}
                      onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                    {especialidad}
                  </label>
                ))}
              </div>

              {/* Educación */}
              <div className="category-divider">
                <h4>📚 Educación</h4>
                {["Clases de matemáticas", "Clases de ciencias", "Tutoría de idiomas",
                  "Clases de inglés", "Clases de música", "Clases de baile",
                  "Clases de cocina"].map((especialidad) => (
                  <label key={especialidad} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="especialidades" 
                      value={especialidad} 
                      checked={formData.especialidades.includes(especialidad)}
                      onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                    {especialidad}
                  </label>
                ))}
              </div>

              {/* Mascotas */}
              <div className="category-divider">
                <h4>🐾 Mascotas</h4>
                {["Paseo de perros", "Guardería canina", "Adiestramiento canino",
                  "Veterinaria a domicilio", "Grooming profesional"].map((especialidad) => (
                  <label key={especialidad} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="especialidades" 
                      value={especialidad} 
                      checked={formData.especialidades.includes(especialidad)}
                      onChange={handleCheckboxChange}/>
                    <span className="checkmark"></span>
                    {especialidad}
                  </label>
                ))}
              </div>
            </div>
          </div>
                {/*Disponibilidad*/}
          <div className="form-group">
            <label>Disponibilidad</label>
            <div className="checkbox-group">
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
                <label key={day} className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="disponibilidad" 
                    value={day} 
                    checked={formData.disponibilidad.includes(day)}
                    onChange={handleCheckboxChange}/>
                  <span className="checkmark"></span>
                  {day}
                </label>
              ))}
            </div>
          </div>
        </fieldset>
        <div className="form-actions">
          <button type="button" disabled>Anterior</button>
          <button type="button" onClick={handleNextAttempt}>Siguiente</button>
        </div>
        
      </form>
      {showModal && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <h3>¿Estás seguro de continuar?</h3>
            <p>Revisa que toda la información sea correcta antes de avanzar.</p>
            
            <div className="modal-summary">
              <h4>Resumen:</h4>
              <p><strong>Biografía:</strong> {formData.bio.substring(0, 50)}...</p>
              <p><strong>Provincia:</strong> {formData.provincia}</p>
              <p><strong>Dirección:</strong> {formData.direccion}</p>
              <p><strong>Especialidades:</strong> {formData.especialidades.join(', ')}</p>
              <p><strong>Disponibilidad:</strong> {formData.disponibilidad.join(', ')}</p>
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                className="cancel-button" 
                onClick={handleCancel}
              >
                Volver a editar
              </button>
              <button 
                type="button" 
                className="confirm-button" 
                onClick={handleConfirm}
              >
                Sí, continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FormStep2({ goBack, goNext, updateFormData, handleSubmit }) {
  const { usuario, token } = useContext(AuthContext);
  const [fotoPerfil, setProfilePhoto] = useState(null);
  const [certificaciones, setDocuments] = useState([]);
  const [fileError, setFileError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = React.useRef(null);
  const photoInputRef = React.useRef(null);


  /*const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (fileError) return;

    try {
      const formData = new FormData();
      
      // Datos requeridos del paso 1 (deben venir del padre)
      formData.append('bio', formData.bio); // Reemplazar con datos reales
      formData.append('provincia', formData.provincia);
      formData.append('direccion', formData.direccion);
      formData.append('especialidades', JSON.stringify([formData.especialidades]));
      formData.append('disponibilidad', JSON.stringify([formData.disponibilidad]));
      
      // Datos del paso 2
      formData.append('id_usuario', usuario.id_usuario);
      formData.append('tipo_usuario', 'profesional');
      
      console.log('Datos a enviar:', {
        userId: usuario.id_usuario,
        bio: formData.bio,
        provincia: formData.provincia,
        direccion: formData.direccion,
        especialidades: formData.especialidades,
        disponibilidad: formData.disponibilidad,
        foto_perfil: fotoPerfil,
        documentos_certificados: certificaciones
      });

      if (fotoPerfil) {
        formData.append('foto_perfil', fotoPerfil);
      }
      
      certificaciones.forEach(doc => {
        formData.append('documentos_certificados', doc);
      });

      const response = await axios.post('http://localhost:5000/api/usuario-profesional', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      updateFormData({
        foto_perfil: fotoPerfil,
        documentos_certificados: certificaciones
      });
      
      goNext();
    } catch (err) {
      console.error('Error al enviar datos:', err);
      if (err.response?.status === 401) {
        setError('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
      } else {
        setError(err.response?.data?.error || 'Error al guardar los datos. Por favor intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };*/

  const handleDocPlaceholderClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoPlaceholderClick = () => {
    photoInputRef.current.click();
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFileError('La foto de perfil no debe exceder los 5MB');
        return;
      }
      setFileError('');
      setProfilePhoto(file);
    }
  };

  const handleDocumentsChange = (e) => {
    const files = Array.from(e.target.files);
    
    const invalidFiles = files.some(file => 
      file.size > 10 * 1024 * 1024 ||
      !['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)
    );
    
    if (invalidFiles) {
      setFileError('Algunos archivos no cumplen con los requisitos (PDF, JPG, PNG, máximo 10MB)');
      return;
    }
    
    setFileError('');
    setDocuments(files);
  };

  return (
    <>
      <h2 className="form-title">Sube tu foto y documentos</h2>
      <p className="form-subtitle">Agrega tus certificaciones</p>

      {fileError && <div className="error-message">{fileError}</div>}

      <form className="profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <fieldset>
          <legend>Foto de perfil</legend>
          <div className="upload-box">
            <div className="photo-upload">
              <div className="photo-placeholder" onClick={handlePhotoPlaceholderClick} style={{ cursor: 'pointer' }}>
                {fotoPerfil && (
                  <img 
                    src={URL.createObjectURL(fotoPerfil)} 
                    alt="Preview" 
                    style={{maxWidth: '100px', maxHeight: '100px'}}
                  />
                )}
              </div>
              <input 
                type="file" 
                id="profilePhoto"
                ref={photoInputRef}
                onChange={handleProfilePhotoChange}
                accept="image/*"
                style={{display: 'none'}}
              />
              <label htmlFor="profilePhoto" className="upload-button">
                Subir foto
              </label>
              <p className="upload-hint">Sube una foto profesional (máx. 5MB)</p>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Certificaciones y Documentos (Opcional)</legend>
          <div className="upload-box">
            <div className="doc-upload">
              <div className="doc-placeholder" style={{cursor: 'pointer'}} onClick={handleDocPlaceholderClick}>
                <FaPlus className="upload-icon" />
                <p className="upload-text">Arrastra archivos aquí o haz clic para seleccionar</p>
                <p className="upload-subtext">Formatos aceptados: PDF, JPG, PNG (máx. 10MB cada uno)</p>
                {certificaciones.length > 0 && (
                  <div className="selected-files">
                    <p>Archivos seleccionados:</p>
                    <ul>
                      {certificaciones.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                multiple 
                className="file-input" 
                ref={fileInputRef}
                onChange={handleDocumentsChange}
                accept=".pdf, .jpg, .jpeg, .png"
                style={{display: 'none'}}
              />
            </div>
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="button" onClick={goBack}>Anterior</button>
          <button 
            type="submit" 
            onClick={async () => {
              await handleSubmit();
              goNext();             
            }} 
            disabled={loading}>
            {loading ? 'Cargando...' : 'Siguiente'}
          </button>
        </div>
      </form>
    </>
  );
}

function FormStep3({ services, removeService, goBack, categorias, provincia }) {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [servicesData, setServicesData] = useState(
    services.map(service => ({
      id: service.id,
      nombre: '',
      descripcion: '',
      precio: '',
      imagen: null,
      ubicacion: provincia,
      categoria: '',
    }))
  );

  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleServiceChange = (id, field, value) => {
    setServicesData(prev => 
      prev.map(service => 
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  const handleImageChange = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      handleServiceChange(id, 'imagen', file);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess('');

  try {
    // Validación de campos
    const validationErrors = servicesData.map(service => {
      if (!service.nombre) return `El servicio #${servicesData.indexOf(service)+1} necesita un nombre`;
      if (!service.descripcion) return `El servicio "${service.nombre}" necesita una descripción`;
      if (!service.precio) return `El servicio "${service.nombre}" necesita un precio`;
      if (isNaN(service.precio)) return `El precio para "${service.nombre}" debe ser un número`;
      if (!service.categoria) return `Selecciona una categoría para "${service.nombre}"`;
      return null;
    }).filter(Boolean);

    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join('\n'));
    }

    // Publicar cada servicio
    const uploadPromises = servicesData.map(async (service) => {
      const formData = new FormData();
      formData.append('id_profesional', usuario.id_usuario);
      formData.append('nombre', service.nombre);
      formData.append('descripcion', service.descripcion);
      formData.append('precio', service.precio);
      formData.append('id_categoria', service.categoria);
      formData.append('estado_servicio', 'activo');

      if (service.imagen) {
        formData.append('imagen_destacada', service.imagen);
      }

      await axios.post('http://localhost:5000/api/publicar-servicio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
    });

    await Promise.all(uploadPromises);
    setSuccess('Servicios publicados con éxito!');
    
    // Redirigir después de 2 segundos
    setTimeout(() => navigate('/'), 2000);
    
  } catch (err) {
    console.error('Error al publicar servicios:', err);
    const errorMsg = err.response?.data?.error || 
                    err.response?.data?.message || 
                    err.message || 
                    'Error al publicar los servicios. Por favor intenta nuevamente.';
    setError(errorMsg);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <h2 className="form-title">Crea tus servicios</h2>
      <p className="form-subtitle">Agrega los servicios que vas a ofrecer</p>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form className="profile-form" onSubmit={handleSubmit}>
        {servicesData.map((service, index) => (
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
                  value={service.nombre}
                  onChange={(e) => handleServiceChange(service.id, 'nombre', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`category-${service.id}`}>Categoría</label>
                <select 
                  id={`category-${service.id}`} 
                  name={`category-${service.id}`} 
                  value={service.categoria}
                  onChange={(e) => handleServiceChange(service.id, 'categoria', e.target.value)}
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map(cat => (
                    <option key={cat.id_categoria} value={cat.id_categoria}>
                      {cat.categoria}
                    </option>
                  ))}
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
                value={service.descripcion}
                onChange={(e) => handleServiceChange(service.id, 'descripcion', e.target.value)}
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
                    value={service.precio}
                    onChange={(e) => handleServiceChange(service.id, 'precio', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor={`location-${service.id}`}>Ubicación</label>
                <input 
                  type="text" 
                  id={`location-${service.id}`}
                  name={`location-${service.id}`}
                  placeholder="Ciudad y Provincia" 
                  value={service.ubicacion}
                  onChange={(e) => handleServiceChange(service.id, 'ubicacion', e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Imagen destacada</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(service.id, e)}
              />
              {service.imagen && (
                <img 
                  src={URL.createObjectURL(service.imagen)} 
                  alt="Preview" 
                  style={{ maxWidth: '100px', marginTop: '10px' }}
                />
              )}
            </div>
          </fieldset>
        ))}

        <div className="form-actions">
          <button type="button" onClick={goBack}>Anterior</button>
          <button type="submit" className="publish-button" disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar Servicios'}
          </button>
        </div>
      </form>
    </>
  );
}