import React from 'react';
import { FaRegFilePdf } from "react-icons/fa6";

const PanelProfesionalHeader = () => {
  return (
    <div className="header-seccion">
      <div className="intro">
        <p style={{fontWeight:'500'}}>Bienvenido de vuelta, Usuario!</p>
        <h1 style={{fontSize:'55px', fontWeight:'900'}}>
          Genera tu <span style={{color:'#2563eb'}}>declaración <br /> de renta</span>
        </h1>
        <p className="description">
          El sistema genera automáticamente un resumen contable completo a partir de las transacciones del ecommerce. Clasifica ingresos por ventas, 
          gastos operativos y calcula impuestos según la legislación local. Organiza los datos en reportes descargables con estructura fiscal estándar
        </p>
        <div style={{display:'flex', gap:'10px', marginTop:'25px'}}>
        <select style={{width:'200px', height:'40px', borderRadius:'5px', border:'1px solid #2563eb', fontSize:'14px', fontWeight:'500', paddingTop:'10px', paddingLeft:'10px'}}>
          <option>Junio 2025</option>
          <option>Junio 2025</option>
          <option>Junio 2025</option>
        </select>
        </div>
      </div>
      <div className="pdfContable" >
        <FaRegFilePdf className="pdfIcon" style={{paddingTop:'75px', color:'#2563eb', fontSize:'100px', fontWeight:'600'}} />
        <p style={{color:'lightgray', fontWeight:'400'}}>Descarga tu resumen en PDF</p>
        <div className="pdfBoton">
        <button className="descargarPDF">Descargar</button>
        </div>
      </div>
    </div>
  );
};

export default PanelProfesionalHeader;