import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Navbar from './components/navbar';
import Footer from './components/footer';
import LoginForm from './components/loginForm';
import RegistroForm from './components/registroForm';
import DetallesServicio from './routes/DetallesServicio';
import PanelProfesional from './routes/PanelProfesional';
import PerfilProfesional from './routes/PerfilProfesional';
import Contacto from './routes/Contacto';
import AcercaDe from './routes/AcercaDe';
import Privacidad from './routes/Privacidad';
import Terminos from './routes/Terminos';
import Categorias from './routes/Categorias';
import ExplorarTodo from './routes/ExplorarTodo';
import ResetPassword from './components/resetPasswordForm';
import Pago from './components/pago';
import PaypalCheckoutButton from './components/paypalCheckoutButton';
import ConfirmarReserva from './components/confirmarReserva';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Reseña from './components/reseña';

function App() {
  return (
        <PayPalScriptProvider options={{
      'client-id': 'AboRS5ck10v0ZdZPQTDO66BT0QEffkubCa0uo6Nl66F8eQcnhWJXhLKRJV2O6zvJyC5TCfQr8le8BaGZ',
      currency: 'USD',
    }}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registro" element={<RegistroForm />} />
          <Route path="/servicio/:id" element={<DetallesServicio />} />
          <Route path="/panelprofesional" element={<PanelProfesional />} />
          <Route path="/perfilprofesional" element={<PerfilProfesional />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/acercade" element={<AcercaDe />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/explorartodo" element={<ExplorarTodo />} />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="/pago/:reservaId" element={<Pago />} />
          <Route path="/paypalCheckoutButton" element={<PaypalCheckoutButton />} />
          <Route path="/confirmarReserva/:id" element={<ConfirmarReserva />} />
          <Route path="/reseña/:reservaId" element={<Reseña />} />
        </Routes>
        <Footer />
      </div>
      </PayPalScriptProvider>
  );
}

export default App;