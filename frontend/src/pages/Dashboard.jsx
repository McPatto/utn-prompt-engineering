import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { addMattress, updateMattress, deleteMattress, getAllMattresses } from "../services/mattress.js";
import { Layout } from "../components/Layout";
import { Toast } from "../components/Toast"; // Importamos el componente Toast
import { Modal } from "../components/Modal"; // Importamos el componente Modal

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

  const { data: mattresses = [] } = useQuery(
    ["mattresses"],
    getAllMattresses,
    {
      staleTime: 1000 * 60 * 5,
      refetchInterval: 1000 * 30,
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

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="title">Dashboard</h1>
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

          {
            mattresses.length > 0 ? <table className="table is-fullwidth is-striped mt-5">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Dimensions</th>
                  <th>Material</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mattresses.map((mattress) => (
                  <tr key={mattress._id}>
                    <td>{mattress.name}</td>
                    <td>{mattress.dimensions}</td>
                    <td>{mattress.material}</td>
                    <td>{mattress.price}</td>
                    <td>
                      <button
                        className="button is-info is-small"
                        onClick={() => handleEdit(mattress)}
                      >
                        Edit
                      </button>
                      <button
                        className="button is-danger is-small ml-2"
                        onClick={() => handleDelete(mattress._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> : <div className="notification is-warning has-text-centered mt-5">
              <h2 className="title is-4">No hay colchones disponibles</h2>
              <p>Por favor, añade un colchón para que aparezca en la lista.</p>
            </div>
          }
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
