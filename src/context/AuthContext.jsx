import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Al iniciar la app, cargar usuario guardado en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  // Función para iniciar sesión
  const login = (userData) => {
    localStorage.setItem('usuario', JSON.stringify(userData));
    setUsuario(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  // Valor del contexto a compartir
  return (
    <AuthContext.Provider value={{
      usuario,
      login,
      logout,
      isAuthenticated: !!usuario
    }}>
      {children}
    </AuthContext.Provider>
  );
};