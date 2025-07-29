function modalConfirmar({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>¡Atención!</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="cancel-button">
            Cancelar
          </button>
          <button onClick={onConfirm} className="confirm-button">
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}