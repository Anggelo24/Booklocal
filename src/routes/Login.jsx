import React from 'react';
import LoginForm from '../components/loginForm';

const Login = () => {
    return (
        <>
            <div style={{ paddingTop: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <LoginForm />
            </div>
        </>
    );
};

export default Login;