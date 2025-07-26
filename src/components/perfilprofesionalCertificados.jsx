import React, { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const PerfilProfesionalCerti = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const [profesional, setProfesional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfesionalCertificados = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/profesional-info');
        if (!response.ok) {
          throw new Error(`Error al obtener la información: ${response.status}`);
        }

        const data = await response.json();

        if (!data || data == null) {
          throw new Error('No se encontraron datos del profesional');
        }
        setProfesional(data);
      } catch (err) {
        console.error('Error al obtener la información profesional:', err);
        setError(err.message);
        setProfesional(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfesionalCertificados();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('certificado', selectedFile);

      const response = await fetch('http://localhost:5000/api/upload-certificado', {
        method: 'POST',
        body: formData,
        // Si necesitas autenticación:
        // headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Error al subir el certificado');
      }

      const result = await response.json();
      
      // Actualizar el estado local con el nuevo certificado
      setProfesional(prev => ({
        ...prev,
        documentos_certificados: result.fileUrl // Ajusta según tu API
      }));

      setShowModal(false);
      setSelectedFile(null);
    } catch (err) {
      console.error('Error al subir el certificado:', err);
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="loading">Cargando información profesional...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!profesional) return <div className="no-data">No se encontró información del profesional.</div>;

  return (
    <div className="certificados">
      {profesional.documentos_certificados ? (
        <div className="certificado-preview">
          <img 
            src={profesional.documentos_certificados} 
            alt="Certificado" 
            className="certificado-img"
          />
          <button 
            className="agregar-certificado"
            onClick={() => setShowModal(true)}
          >
            <IoIosAddCircleOutline size={24} />
          </button>
        </div>
      ) : (
        <button 
          className="agregar-certificado"
          onClick={() => setShowModal(true)}
        >
          <span 
            style={{
              display: 'inline-block',
              transition: 'transform 0.2s, color 0.2s',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              color: isHovered ? '#337efb' : 'gray',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <IoIosAddCircleOutline size={48} />
          </span>
        </button>
      )}

      {/* Modal para agregar certificado */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="close-modal"
              onClick={() => {
                setShowModal(false);
                setSelectedFile(null);
                setUploadError(null);
              }}
            >
              <IoClose size={24} />
            </button>

            <h3 className="modal-title">Agregar Certificado</h3>
            <p className="modal-description">
              Sube tu certificado para verificar tus habilidades y credenciales profesionales.
              Aceptamos archivos PDF, JPG o PNG.
            </p>

            <div className="file-upload-container">
              <label className="file-upload-label">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="file-input"
                />
                <span className="file-upload-button">
                  {selectedFile ? 'Cambiar archivo' : 'Seleccionar archivo'}
                </span>
                {selectedFile && (
                  <span className="file-name">{selectedFile.name}</span>
                )}
              </label>
            </div>

            {uploadError && (
              <p className="error-message">{uploadError}</p>
            )}

            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => {
                  setShowModal(false);
                  setSelectedFile(null);
                  setUploadError(null);
                }}
                disabled={uploading}
              >
                Cancelar
              </button>
              <button
                className="upload-button"
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
              >
                {uploading ? 'Subiendo...' : 'Subir Certificado'}
              </button>
            </div>

            <p className="privacy-notice">
              Al subir tu certificado, aceptas nuestros Términos de Servicio y Política de Privacidad.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilProfesionalCerti;