import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const AuthContext = createContext();

// Context provider
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set up axios interceptor for automatic token handling
  useEffect(() => {
    // Request interceptor to add token to headers
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const currentToken = localStorage.getItem('token');
        if (currentToken) {
          config.headers.Authorization = `Bearer ${currentToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token expiration
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          const errorCode = error.response?.data?.code;
          
          if (errorCode === 'TOKEN_EXPIRED' || errorCode === 'INVALID_TOKEN') {
            console.log('Token expired or invalid, logging out...');
            logout();
            // Optionally redirect to login
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Initialize auth state on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('usuario');
        const storedTipoUsuario = localStorage.getItem('tipo_usuario');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken && storedTipoUsuario) {
          const parsedUser = JSON.parse(storedUser);
          
          // Verify token is still valid by making a test request
          try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            
            // Optional: Make a test request to verify token validity
            // await axios.get('/api/auth/verify');
            
            setUsuario(parsedUser);
            setTipoUsuario(storedTipoUsuario);
            setToken(storedToken);
          } catch (verificationError) {
            console.log('Token verification failed, clearing auth data');
            logout();
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = (userData, authToken) => {
    try {
      localStorage.setItem('usuario', JSON.stringify(userData));
      localStorage.setItem('tipo_usuario', userData.tipo_usuario);
      localStorage.setItem('token', authToken);
      
      setUsuario(userData);
      setTipoUsuario(userData.tipo_usuario);
      setToken(authToken);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      
      console.log('Login successful, token stored:', authToken);
    } catch (error) {
      console.error('Error saving authentication data:', error);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('tipo_usuario');
    localStorage.removeItem('token');
    
    delete axios.defaults.headers.common['Authorization'];
    
    setUsuario(null);
    setTipoUsuario(null);
    setToken(null);
    
    console.log('Logout successful');
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return tipoUsuario === role;
  };

  // Check if user is professional
  const isProfessional = () => {
    return tipoUsuario === 'profesional';
  };

  // Check if user is admin
  const isAdmin = () => {
    return tipoUsuario === 'admin';
  };

  // Context value
  const contextValue = {
    usuario,
    token,
    tipoUsuario,
    loading,
    login,
    logout,
    hasRole,
    isProfessional,
    isAdmin,
    isAuthenticated: !!token,
    userId: usuario?.id_usuario || null
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};