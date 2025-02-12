const Toast = ({ message, type, onClose }) => {
  const toastClass = `notification ${type === "success" ? "is-success" : type === "danger" ? "is-danger" : ""}`;
  return (
    <div className={`${toastClass} is-light`} style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1000 }}>
      <button className="delete" onClick={onClose}></button>
      <p className="mr-5">{message}</p>
    </div>
  );
};

export { Toast }