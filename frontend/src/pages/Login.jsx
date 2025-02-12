import React, { useState } from "react";
import { loginWithGoogle } from "../services/auth.js"; // Importamos la función de login con Google
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.jsx"; // Importamos el contexto de autenticación

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth(); // Obtenemos el usuario desde el contexto global

  const handleLoginWithGoogle = async () => {
    try {
      const loggedInUser = await loginWithGoogle(); // Iniciamos sesión con Google
      console.log(loggedInUser); // Puedes ver los detalles del usuario aquí
      navigate("/"); // Redirigir al home si el login es exitoso
    } catch (err) {
      console.log(err);
      setError("Error al iniciar sesión con Google. Intenta de nuevo.");
    }
  };

  // Si ya está logueado, redirigir automáticamente
  if (user) {
    navigate("/"); // Redirige al home si ya está autenticado
  }

  return (
    <div className="login-container">
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="box">
                <h1 className="title is-4">Iniciar sesión con Google</h1>

                {error && <div className="notification is-danger">{error}</div>}

                <div className="field">
                  <div className="control">
                    <button
                      className="button is-danger is-fullwidth"
                      onClick={handleLoginWithGoogle}
                    >
                      Iniciar sesión con Google
                    </button>
                  </div>
                </div>

                <div className="has-text-centered">
                  <a href="/registro">¿No tienes cuenta? Regístrate</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { Login };
