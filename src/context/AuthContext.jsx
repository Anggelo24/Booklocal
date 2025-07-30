import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [token, setToken] = useState(null);

  // Al iniciar la app, cargar usuario guardado en localStorage
  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem('usuario');
      const storedTipoUsuario = localStorage.getItem('tipo_usuario');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser && storedToken && storedTipoUsuario) {
        try{
          setUsuario(JSON.parse(storedUser));
          setTipoUsuario(storedTipoUsuario);
          setToken(storedToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }catch (error) {
          console.error('Error al parser los datos de autenticacion:', error);
          logout();
        }
      }
    };
    initializeAuth();
  }, []);

  // Función para iniciar sesión
  const login = (userData, authToken) => {
    try {
      localStorage.setItem('usuario', JSON.stringify(userData));
      localStorage.setItem('tipo_usuario', userData.tipo_usuario);
      localStorage.setItem('token', authToken);
      setUsuario(userData);
      setTipoUsuario(userData.tipo_usuario);
      setToken(authToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      console.log('Token almacenado:', authToken);
    }catch (error) {
      console.error('Error al guardar los datos de autenticación:', error);
    }
  }
  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('tipo_usuario');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUsuario(null);
    setToken(null);
  };

  // Valor del contexto a compartir
  return (
    <AuthContext.Provider value={{
      usuario,
      token,
      tipoUsuario,
      login,
      logout,
      isAuthenticated: !!token,
      userId: usuario?.id_usuario || null
    }}>
      {children}
    </AuthContext.Provider>
  );
};
