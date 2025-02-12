import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard.jsx";
import { Products } from "../pages/Products.jsx";
import { Login } from "../pages/Login.jsx";
import { useAuth } from "../context/auth.jsx";

function Router() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export { Router };
