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
        </Routes>
        <Footer />
      </div>
  );
}

export default App;