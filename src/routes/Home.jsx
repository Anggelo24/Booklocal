import React from 'react';
import SeccionBusqueda from '../components/seccionBusqueHome';
import SeccionCalificados from '../components/seccionCalifHome';
import SeccionImpulsar from '../components/seccionImpulsaHome';
import FuncionaBooklocal from '../components/seccionFuncionHome';

/**
 * Home.jsx
 * 
 * Página de inicio principal de la aplicación BookLocal.
 * 
 * 🏠 Funcionalidad:
 * - Esta página sirve como punto de entrada visual para los usuarios.
 * - Incluye secciones destacadas como búsqueda, servicios calificados, promoción de profesionales
 *   y explicación del funcionamiento de la plataforma.
 * 
 * 📦 Componentes incluidos:
 * - `SeccionBusqueda`: barra o formulario de búsqueda de servicios/profesionales.
 * - `SeccionCalificados`: muestra a los profesionales mejor calificados.
 * - `SeccionImpulsar`: sección de llamada a la acción para invitar a los usuarios a convertirse en profesionales.
 * - `FuncionaBooklocal`: explica cómo funciona BookLocal.
 * 
 * 🎨 Estilos:
 * - Aplica un padding-top de 80px para evitar solapamiento con el navbar.
 * 
 * 🔁 Esta página puede mostrarse al iniciar sesión o al acceder como visitante.
 */


const Home = () => {
    return (
        <>
            <div style={{ paddingTop: '80px' }}>
                <SeccionBusqueda />
                <SeccionCalificados />
                <SeccionImpulsar />
                <FuncionaBooklocal />
            </div>
        </>
    );
};

export default Home;