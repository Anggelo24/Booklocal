import React from 'react';
import RegistroForm from '../components/registroForm';

const Registro = () => {
    return (
        <div className="registro-page" style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
            <div className="registro-container">
                <RegistroForm />
            </div>
        </div>
    );
};

export default Registro;