import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import "bulma/css/bulma.min.css";

const Layout = ({ children, onSearch }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="has-background-primary p-3">
        <nav className="container">
          <div className="is-flex is-justify-content-space-between is-align-items-center">
            <div className="is-flex is-align-items-center">
              <Link className="button is-light mr-3" to={"/"}>
                Products
              </Link>
              {onSearch && (
                <input
                  type="text"
                  className="input"
                  placeholder="Buscar productos..."
                  onChange={(e) => onSearch(e.target.value)}
                />
              )}
            </div>
            <div>
              {user ? (
                <>
                  <Link className="button is-light mr-3" to={"/dashboard"}>
                    Dashboard
                  </Link>
                  <button className="button is-light" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <Link className="button is-light" to={"/login"}>
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main style={{ minHeight: "100vh" }} className="container mt-5">
        {children}
      </main>
      <footer className="footer has-background-light p-4">
        <div className="content has-text-centered">
          <h4>Sitio creado por Gabriel Alberini</h4>
        </div>
      </footer>
    </>
  );
};

export { Layout };
