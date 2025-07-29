import React, { createContext, useState, useEffect, authToken } from 'react';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  // Al iniciar la app, cargar usuario guardado en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Función para iniciar sesión
  const login = (userData) => {
    localStorage.setItem('usuario', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
    setUsuario(userData);
    setToken(authToken);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    setUserId(null);
    setToken(null);
  };

  // Valor del contexto a compartir
  return (
    <AuthContext.Provider value={{
      usuario,
      token,
      login,
      logout,
      isAuthenticated: !!usuario,
      userId: usuario?.id_usuario || null
    }}>
      {children}
    </AuthContext.Provider>
  );
};
