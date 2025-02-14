import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { addMattress, updateMattress, deleteMattress, getAllMattresses, deleteManyMattresses } from "../services/mattress.js";
import { Layout } from "../components/Layout";
import { Toast } from "../components/Toast"; // Importamos el componente Toast
import { Modal } from "../components/Modal"; // Importamos el componente Modal
import "./Dashboard.css"; // Agregar este import

const Dashboard = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    dimensions: "",
    material: "",
    price: ""
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [modal, setModal] = useState({ isActive: false, message: "", onConfirm: null });
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery(
    ["mattresses", currentPage],
    () => getAllMattresses({ page: currentPage, limit: 10 }),
    {
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true
    }
  );

  const mattresses = data?.mattresses || [];
  const pagination = data?.pagination || {};

  const deleteMutation = useMutation(
    async (ids) => {
      await deleteManyMattresses(ids);
    },
    {
      onSuccess: (_, ids) => {
        queryClient.invalidateQueries(["mattresses"]);
        setSelectedItems([]);
        showToast(`${ids.length} colchones eliminados exitosamente`, "success");
      },
      onError: (error) => {
        showToast(error.response?.data?.error || "Error al eliminar los colchones", "error");
      }
    }
  );

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdating) {
      await updateMattress(formData._id, formData);
      showToast("Mattress updated successfully!", "success");
    } else {
      await addMattress(formData);
      showToast("Mattress added successfully!", "success");
    }
    setFormData({ name: "", dimensions: "", material: "", price: "" });
    setIsUpdating(false);
    queryClient.invalidateQueries(["mattresses"]);
  };

  const handleEdit = (mattress) => {
    const { _id, name, dimensions, material, price } = mattress;
    setFormData({
      _id,
      name,
      dimensions,
      material,
      price
    });
    setIsUpdating(true);
  };

  const handleDelete = async (id) => {
    setModal({
      isActive: true,
      message: "Are you sure you want to delete this mattress?",
      onConfirm: async () => {
        await deleteMattress(id);
        showToast("Mattress deleted successfully!", "success");
        queryClient.invalidateQueries(["mattresses"]);
        setModal({ isActive: false, message: "", onConfirm: null });
      }
    });
  };

  const handleSelect = (mattressId) => {
    setSelectedItems(prev => {
      if (prev.includes(mattressId)) {
        return prev.filter(id => id !== mattressId);
      } else {
        return [...prev, mattressId];
      }
    });
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length > 0) {
      setModal({
        isActive: true,
        message: `¿Estás seguro de que quieres eliminar ${selectedItems.length} colchones?`,
        onConfirm: () => {
          deleteMutation.mutate(selectedItems);
          setModal({ isActive: false, message: "", onConfirm: null });
        }
      });
    }
  };

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
            <h1 className="title has-text-primary">Dashboard</h1>
            {selectedItems.length > 0 && (
              <button 
                className="button is-danger"
                onClick={handleDeleteSelected}
              >
                Delete items ({selectedItems.length})
              </button>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Dimensions</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Material</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Price</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="control">
              <button className="button is-primary" type="submit">
                {isUpdating ? "Update Mattress" : "Add Mattress"}
              </button>
            </div>
          </form>

          {isLoading ? (
            <div className="has-text-centered mt-5">
              <span className="icon is-large">
                <i className="fas fa-spinner fa-pulse"></i>
              </span>
            </div>
          ) : mattresses.length > 0 ? (
            <>
              <div className="box mt-5">
                <table className="table is-fullwidth">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems(mattresses.map(m => m._id));
                            } else {
                              setSelectedItems([]);
                            }
                          }}
                          checked={selectedItems.length === mattresses.length}
                        />
                      </th>
                      <th>Name</th>
                      <th>Dimensions</th>
                      <th>Material</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mattresses.map((mattress) => (
                      <tr 
                        key={mattress._id}
                        className={selectedItems.includes(mattress._id) ? 'has-background-grey-lighter' : ''}
                      >
                        <td>
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            checked={selectedItems.includes(mattress._id)}
                            onChange={() => handleSelect(mattress._id)}
                          />
                        </td>
                        <td className={selectedItems.includes(mattress._id) ? 'has-text-black' : ''}>{mattress.name}</td>
                        <td className={selectedItems.includes(mattress._id) ? 'has-text-black' : ''}>{mattress.dimensions}</td>
                        <td className={selectedItems.includes(mattress._id) ? 'has-text-black' : ''}>{mattress.material}</td>
                        <td className={selectedItems.includes(mattress._id) ? 'has-text-black' : ''}>${mattress.price}</td>
                        <td>
                          <div className="buttons are-small">
                            <button 
                              className="button is-info is-light"
                              onClick={() => handleEdit(mattress)}
                            >
                              Edit
                            </button>
                            <button 
                              className="button is-danger is-light"
                              onClick={() => handleDelete(mattress._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {pagination.pages > 1 && (
                <nav 
                  className="pagination is-right mt-4" 
                  role="navigation" 
                  aria-label="pagination"
                >
                  <button
                    className="pagination-previous"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="pagination-next"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.pages))}
                    disabled={currentPage === pagination.pages}
                  >
                    Next
                  </button>
                  <ul className="pagination-list">
                    {Array.from({ length: pagination.pages }, (_, i) => (
                      <li key={i + 1}>
                        <a
                          className={`pagination-link ${currentPage === i + 1 ? 'is-current' : ''}`}
                          onClick={() => setCurrentPage(i + 1)}
                          aria-label={`Go to page ${i + 1}`}
                        >
                          {i + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </>
          ) : (
            <div className="notification is-warning has-text-centered mt-5">
              <h2 className="title is-4">No hay colchones disponibles</h2>
              <p>Por favor, añade un colchón para que aparezca en la lista.</p>
            </div>
          )}
        </div>
      </section>

      {/* Componente Toast */}
      {toast.message && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />
      )}

      {/* Componente Modal */}
      <Modal
        isActive={modal.isActive}
        title="Confirmation"
        message={modal.message}
        onConfirm={modal.onConfirm}
        onCancel={() => setModal({ isActive: false, message: "", onConfirm: null })}
      />
    </Layout>
  );
};

export { Dashboard };
