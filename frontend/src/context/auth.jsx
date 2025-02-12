import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase"; // Asegúrate de que auth esté configurado correctamente

// Creamos el contexto para manejar la autenticación global
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para almacenar el usuario autenticado

  // Usamos el hook useEffect para suscribirnos al cambio de estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Actualizamos el estado cuando el usuario cambia
    });
    return () => unsubscribe(); // Limpiamos la suscripción al desmontar el componente
  }, []);

  // Función para hacer logout
  const logout = async () => {
    await signOut(auth); // Llamamos al método signOut de Firebase para cerrar la sesión
    setUser(null); // Limpiamos el estado global cuando el usuario cierra sesión
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para acceder al contexto
export const useAuth = () => {
  return React.useContext(AuthContext);
};
