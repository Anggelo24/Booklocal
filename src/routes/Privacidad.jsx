import React from 'react';
import '../styles/privacidad.css';

const Privacidad = () => {
  return (
    <div className="privacidad-container" style={{ paddingTop: '120px' }}>
      <div className="privacidad-content">
        <h1>Política de Privacidad</h1>
        <p className="last-updated">Última actualización: 2 de Julio, 2025</p>
        
        <div className="privacidad-section">
          <h2>1. Introducción</h2>
          <p>
            En BookLocal ("nosotros", "nuestro" o "nos"), respetamos su privacidad y nos comprometemos a proteger 
            su información personal. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y 
            protegemos su información cuando utiliza nuestro sitio web y servicios.
          </p>
        </div>
        
        <div className="privacidad-section">
          <h2>2. Información que Recopilamos</h2>
          <p>
            Recopilamos varios tipos de información para proporcionar y mejorar nuestros servicios:
          </p>
          <ul>
            <li><strong>Información personal:</strong> Nombre, dirección de correo electrónico, número de teléfono, etc.</li>
            <li><strong>Información de pago:</strong> Datos de tarjetas de crédito/débito (procesados de forma segura mediante proveedores de pago certificados)</li>
            <li><strong>Datos de uso:</strong> Cómo interactúa con nuestra plataforma (dirección IP, tipo de navegador, páginas visitadas)</li>
            <li><strong>Datos de ubicación:</strong> Para proporcionar servicios basados en su ubicación geográfica</li>
          </ul>
        </div>
        
        <div className="privacidad-section">
          <h2>3. Cómo Utilizamos su Información</h2>
          <p>
            Utilizamos la información recopilada para los siguientes fines:
          </p>
          <ul>
            <li>Proporcionar, operar y mantener nuestros servicios</li>
            <li>Mejorar, personalizar y expandir nuestros servicios</li>
            <li>Procesar transacciones y enviar notificaciones relacionadas</li>
            <li>Comunicarnos con usted, incluido el servicio al cliente</li>
            <li>Prevenir el fraude y mejorar la seguridad</li>
            <li>Cumplir con las obligaciones legales</li>
          </ul>
        </div>
        
        <div className="privacidad-section">
          <h2>4. Compartir Información</h2>
          <p>
            No vendemos ni alquilamos su información personal a terceros. Podemos compartir información en las siguientes situaciones:
          </p>
          <ul>
            <li><strong>Proveedores de servicios:</strong> Con empresas que nos ayudan a operar nuestro negocio (procesamiento de pagos, análisis)</li>
            <li><strong>Requerimientos legales:</strong> Cuando sea necesario para cumplir con la ley o proteger nuestros derechos</li>
            <li><strong>Transferencias de negocio:</strong> En caso de fusión, adquisición o venta de activos</li>
          </ul>
        </div>
        
        <div className="privacidad-section">
          <h2>5. Seguridad de Datos</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra 
            accesos no autorizados, pérdida o alteración. Sin embargo, ningún método de transmisión por Internet o 
            almacenamiento electrónico es 100% seguro.
          </p>
        </div>
        
        <div className="privacidad-section">
          <h2>6. Sus Derechos</h2>
          <p>
            Tiene derecho a:
          </p>
          <ul>
            <li>Acceder a la información personal que tenemos sobre usted</li>
            <li>Solicitar la corrección de información inexacta</li>
            <li>Solicitar la eliminación de sus datos personales</li>
            <li>Oponerse al procesamiento de sus datos</li>
            <li>Solicitar la portabilidad de sus datos</li>
          </ul>
          <p>
            Para ejercer estos derechos, contáctenos en privacidad@booklocal.com.
          </p>
        </div>
        
        <div className="privacidad-section">
          <h2>7. Cambios a esta Política</h2>
          <p>
            Podemos actualizar nuestra Política de Privacidad periódicamente. Le notificaremos de cualquier cambio 
            publicando la nueva política en esta página.
          </p>
        </div>
        
        <div className="privacidad-section">
          <h2>8. Contáctenos</h2>
          <p>
            Si tiene preguntas sobre esta Política de Privacidad, contáctenos en:
            <br /><br />
            <strong>Email:</strong> privacidad@booklocal.com<br />
            <strong>Dirección:</strong> Universidad Tecnológica de Panamá, Ciudad de Panamá, Panamá
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacidad;