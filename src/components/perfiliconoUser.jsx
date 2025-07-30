import { useState, useRef, useEffect } from "react";
import { MdOutlinePerson } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import '../styles/perfilIconoUser.css';
import '../styles/slideInpanel.css';
import { Link } from "react-router-dom";
import { FaRegFileAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { PiChatsBold } from "react-icons/pi";
import { LuWallet } from "react-icons/lu";
import { FiSettings } from "react-icons/fi";
import { AiOutlineRise } from "react-icons/ai";
import { TbPigMoney } from "react-icons/tb";

const PerfilIconoUSer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { usuario, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="icono-perfil-dropdown" ref={dropdownRef}>
      <div>
      <button className="icono-perfil-menu" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <MdOutlinePerson /> : <MdOutlinePerson />}
      </button>
      
      <div className={`panel ${isOpen ? 'panel-open' : ''}`}>
        <div className="panel-content">
          <h1 className="panel-titulo"> Bienvenido a Booklocal </h1>
         <h3 className="panel-nombre"> {usuario.nombre} {usuario.apellido} </h3>
          {usuario?.tipo_usuario === 'profesional' && (
              <>
                <li>
                  <Link to="/panelprofesional" onClick={() => setIsOpen(false)}>
                    <FaRegFileAlt /> Panel Profesional
                  </Link>
                </li>
                <li>
                  <Link to="/perfilprofesional" onClick={() => setIsOpen(false)}>
                    <FiEdit /> Editar Perfil
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => setIsOpen(false)}>
                   <PiChatsBold /> Chats <p style={{fontSize:'10px', color:'lightgray'}}>Proximamente...</p>
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => setIsOpen(false)}>
                   <LuWallet /> Crypto Wallet <p style={{fontSize:'10px', color:'lightgray'}}>Proximamente...</p>
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => setIsOpen(false)}>
                    <FiSettings /> Configuración <p style={{fontSize:'10px', color:'lightgray'}}>Proximamente...</p>
                  </Link>
                </li>
              </>
            )}
            {usuario?.tipo_usuario !== 'profesional' && (
              <>
              <li>
                  <Link to="/" onClick={() => setIsOpen(false)}>
                   <TbPigMoney /> Impulsa tu negocio 
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => setIsOpen(false)}>
                   <PiChatsBold /> Chats <p style={{fontSize:'10px', color:'lightgray'}}>Proximamente...</p>
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => setIsOpen(false)}>
                   <LuWallet /> Crypto Wallet <p style={{fontSize:'10px', color:'lightgray'}}>Proximamente...</p>
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => setIsOpen(false)}>
                    <FiSettings /> Configuración <p style={{fontSize:'10px', color:'lightgray'}}>Proximamente...</p>
                  </Link>
                </li>
              </>
            )}
        </div>
        <div className="logout-container">
        <button onClick={handleLogout} className="cerrar-sesion-panel">
        Cerrar sesión                 
         </button> 
         </div>
      </div>
    </div>
    </div>
  );
};

export default PerfilIconoUSer;

