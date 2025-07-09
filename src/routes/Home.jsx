import React from 'react';
import SeccionBusqueda from '../components/seccionBusqueHome';
import SeccionCalificados from '../components/seccionCalifHome';
import SeccionImpulsar from '../components/seccionImpulsaHome';
import FuncionaBooklocal from '../components/seccionFuncionHome';

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