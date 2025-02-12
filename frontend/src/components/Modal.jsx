const Modal = ({ isActive, title, message, onConfirm, onCancel }) => {
  return (
    <div className={`modal ${isActive ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onCancel}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={onCancel}></button>
        </header>
        <section className="modal-card-body">
          <p>{message}</p>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-danger mr-3" onClick={onConfirm}>
            Confirm
          </button>
          <button className="button" onClick={onCancel}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export { Modal }