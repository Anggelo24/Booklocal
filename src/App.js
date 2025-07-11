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

function App() {
  return (
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
        </Routes>
        <Footer />
      </div>
  );
}

export default App;