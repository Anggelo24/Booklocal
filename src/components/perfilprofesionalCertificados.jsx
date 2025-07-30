import React, { useState, useEffect, useContext } from 'react';
import { IoIosAddCircleOutline, IoMdDownload, IoMdEye } from "react-icons/io";
import { IoClose, IoTrashOutline } from "react-icons/io5";
import { AuthContext } from '../context/AuthContext';

const PerfilProfesionalCerti = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar documentos al montar el componente
  useEffect(() => {
    if (!token) {
      console.warn('Token ausente, no se hace la petición');
      setLoading(false);
      setError('No se encontró token de autenticación');
      return;
    }
    fetchDocuments();
  }, [token]);

  const fetchDocuments = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const response = await fetch('http://localhost:5000/api/profesional-info/documentos', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData?.error || `Error ${response.status} al obtener documentos`
      );
    }

    const data = await response.json();
    
    console.log('Datos recibidos del backend:', data); // Debug
    
    if (!data.success) {
      throw new Error(data.error || 'Error al procesar documentos');
    }

    // Normalización mejorada de documentos
    const normalizeDocuments = (docs) => {
      if (!docs) return [];
      
      // Si es string, intentar parsear como JSON
      if (typeof docs === 'string') {
        try {
          docs = JSON.parse(docs);
        } catch (e) {
          // Si es una URL, convertir a objeto
          if (docs.startsWith('http')) {
            return [{
              id: Date.now(),
              ruta: docs,
              nombre: 'Documento certificado',
              tipo: 'application/octet-stream',
              fechaSubida: new Date().toISOString()
            }];
          }
          return [];
        }
      }
      
      // Si es array, devolverlo filtrado
      if (Array.isArray(docs)) {
        return docs.filter(doc => doc && (doc.ruta || doc.url));
      }
      
      // Si es objeto, convertirlo a array
      if (typeof docs === 'object' && docs !== null && (docs.ruta || docs.url)) {
        return [docs];
      }
      
      return [];
    };

    const normalizedDocs = normalizeDocuments(data.data || data.documentos || data);
    console.log('Documentos normalizados:', normalizedDocs); // Debug
    
    setDocuments(normalizedDocs);

  } catch (error) {
    console.error('Error fetching documents:', error);
    setError(error.message || 'Error al cargar documentos');
    setDocuments([]);
  } finally {
    setLoading(false);
  }
};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        setError('Por favor sube un archivo PDF, JPG o PNG.');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('El archivo es demasiado grande. Máximo 5MB permitido.');
        return;
      }
      
      setSelectedFile(file);
      setUploadSuccess(false);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Por favor selecciona un archivo antes de subir.');
      return;
    }

    setIsUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('documento', selectedFile);

      const response = await fetch('http://localhost:5000/api/profesional-info/documentos/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData?.error || `Error ${response.status} al subir el archivo`
        );
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Error al procesar el archivo');
      }

      setUploadSuccess(true);
      setError(null);
      fetchDocuments(); // Actualizar la lista
      
      setTimeout(() => {
        setSelectedFile(null);
        setUploadSuccess(false);
        setIsModalOpen(false);
      }, 2000);

    } catch (error) {
      console.error('Error al subir el archivo:', error);
      setError(error.message || 'Error al subir el archivo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este documento?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/profesional-info/documentos/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData?.error || `Error ${response.status} al eliminar documento`
          );
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Error al eliminar documento');
        }

        fetchDocuments(); // Actualizar la lista de documentos
        setError(null);

      } catch (error) {
        console.error('Error al eliminar documento:', error);
        setError(error.message || 'Error al eliminar documento');
      }
    }
  };

  const handleViewDocument = (doc) => {
    // Verificar si la ruta es completa o relativa
    const fullPath = doc.ruta.startsWith('http') 
      ? doc.ruta 
      : `http://localhost:5000${doc.ruta}`;
    
    setCurrentDocument({ ...doc, ruta: fullPath });
    setIsViewerOpen(true);
  };

  const handleDownload = async (doc) => {
    try {
      // Verificar si la ruta es completa o relativa
      const downloadUrl = doc.ruta.startsWith('http') 
        ? doc.ruta 
        : `http://localhost:5000${doc.ruta}`;
      
      const response = await fetch(downloadUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status} al descargar documento`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.nombre || 'documento';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error al descargar documento:', error);
      setError(error.message || 'Error al descargar documento');
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setUploadSuccess(false);
    setIsModalOpen(false);
    setError(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setSelectedFile(null);
    setUploadSuccess(false);
    setError(null);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
    setCurrentDocument(null);
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    } catch {
      return 'Fecha desconocida';
    }
  };

  // Función para obtener el tipo de archivo
  const getFileType = (type) => {
    if (!type) return 'DESCONOCIDO';
    return type.split('/')[1]?.toUpperCase() || 'ARCHIVO';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando documentos...</p>
      </div>
    );
  }

  if (error && documents.length === 0) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button 
          className="retry-button"
          onClick={fetchDocuments}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="certificados-container">
      <div className="section-header">
        <h2>Documentos Certificados</h2>
        <button 
          onClick={openModal} 
          className="add-button"
          aria-label="Agregar certificado"
        >
          <IoIosAddCircleOutline size={24} />
          <span>Agregar</span>
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button 
            onClick={() => setError(null)}
            className="close-error"
            aria-label="Cerrar mensaje de error"
          >
            <IoClose size={16} />
          </button>
        </div>
      )}

      <div className="documentos-list">
        {documents.length === 0 ? (
          <div className="empty-state">
            <p>No hay documentos certificados aún</p>
            <button 
              onClick={openModal}
              className="primary-button"
            >
              <IoIosAddCircleOutline /> Agregar primer documento
            </button>
          </div>
        ) : (
          documents.map(doc => (
            <div key={doc.id || doc.ruta} className="documento-card">
              <div className="documento-header">
                <span className="documento-nombre">
                  {doc.nombre || 'Documento sin nombre'}
                </span>
                <div className="documento-acciones">
                  <button 
                    onClick={() => handleViewDocument(doc)} 
                    className="accion-btn"
                    aria-label="Ver documento"
                  >
                    <IoMdEye />
                  </button>
                  <button 
                    onClick={() => handleDownload(doc)} 
                    className="accion-btn"
                    aria-label="Descargar documento"
                  >
                    <IoMdDownload />
                  </button>
                  <button 
                    onClick={() => handleDelete(doc.id)} 
                    className="accion-btn danger"
                    aria-label="Eliminar documento"
                  >
                    <IoTrashOutline />
                  </button>
                </div>
              </div>
              <div className="documento-metadata">
                <span>{formatDate(doc.fechaSubida)}</span>
                <span>{getFileType(doc.tipo)}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal para subir documentos */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Agregar Certificado</h3>
              <button 
                className="close-button" 
                onClick={handleCancel}
                aria-label="Cerrar modal"
                disabled={isUploading}
              >
                <IoClose />
              </button>
            </div>
            
            <div className="modal-body">
              <p className="modal-description">
                Sube tu certificado para verificar tus habilidades y credenciales profesionales.
                Aceptamos archivos PDF, JPG o PNG (máximo 5MB).
              </p>

              <div className="file-upload-section">
                <label className="file-upload-label">
                  <input
                    type="file"
                    className="file-input"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                  <span className="file-upload-button">
                    {selectedFile ? 'Cambiar archivo' : 'Seleccionar archivo'}
                  </span>
                  {selectedFile && (
                    <span className="file-name">{selectedFile.name}</span>
                  )}
                </label>
              </div>

              {uploadSuccess && (
                <div className="success-message">
                  ¡Certificado subido exitosamente!
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                className="secondary-button"
                onClick={handleCancel}
                disabled={isUploading}
              >
                Cancelar
              </button>

              <button
                className="primary-button"
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
              >
                {isUploading ? (
                  <>
                    <span className="spinner"></span>
                    Subiendo...
                  </>
                ) : 'Subir Certificado'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Visor de documentos */}
      {isViewerOpen && currentDocument && (
        <div className="document-viewer-overlay" onClick={closeViewer}>
          <div className="document-viewer-content" onClick={(e) => e.stopPropagation()}>
            <div className="viewer-header">
              <h3 className="viewer-title">
                {currentDocument.nombre || 'Documento'}
              </h3>
              <button 
                className="close-button" 
                onClick={closeViewer}
                aria-label="Cerrar visor"
              >
                <IoClose size={24} />
              </button>
            </div>

            <div className="viewer-body">
              {currentDocument.tipo?.includes('pdf') ? (
                <iframe 
                  src={currentDocument.ruta} 
                  title={currentDocument.nombre || 'Documento PDF'}
                  className="document-iframe"
                />
              ) : (
                <img 
                  src={currentDocument.ruta} 
                  alt={currentDocument.nombre || 'Documento'}
                  className="document-image"
                />
              )}
            </div>

            <div className="viewer-footer">
              <button 
                className="download-button"
                onClick={() => handleDownload(currentDocument)}
              >
                <IoMdDownload size={20} /> Descargar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PerfilProfesionalCerti;