import React from 'react';
import LoginForm from '../components/loginForm';
import '../styles/login.css';

/**
 * Login.jsx
 * 
 * Página de inicio de sesión para usuarios registrados.
 * 
 * 🔐 Funcionalidad:
 * - Renderiza el componente `LoginForm`, que contiene el formulario de autenticación.
 * - Permite que tanto clientes como profesionales ingresen con sus credenciales.
 * 
 * 📦 Componente utilizado:
 * - `LoginForm`: componente que maneja el formulario de login, validación de datos y envío.
 * 
 * 🎨 Estilos:
 * - Aplica padding superior de 80px para evitar solaparse con el navbar.
 * - Usa `flex` para centrar el formulario vertical y horizontalmente en la pantalla completa (`100vh`).
 * 
 * 📍 Navegación:
 * - Después del login exitoso, el usuario es redirigido a su respectiva página de inicio (Home).
 */


const Login = () => {
    return (
        <>
            <div className="login-page-container">
                <LoginForm />
            </div>
        </>
    );
};

export default Login;