import React from 'react';
import '../styles/terminos.css';

const Terminos = () => {
  return (
    <div className="terminos-container" style={{ paddingTop: '120px' }}>
      <div className="terminos-content">
        <h1>Términos y Condiciones de Uso</h1>
        <p className="last-updated">Última actualización: 2 de Julio, 2025</p>
        
        <div className="terminos-section">
          <h2>1. Aceptación de los Términos</h2>
          <p>
            Al acceder o utilizar el servicio BookLocal ("Plataforma"), usted ("Usuario") acepta cumplir con estos 
            Términos y Condiciones de Uso. Si no está de acuerdo con alguna parte de estos términos, no podrá utilizar 
            nuestros servicios.
          </p>
        </div>
        
        <div className="terminos-section">
          <h2>2. Definiciones</h2>
          <ul>
            <li><strong>Plataforma:</strong> Sitio web y aplicación móvil de BookLocal</li>
            <li><strong>Usuario:</strong> Persona que accede o utiliza la Plataforma</li>
            <li><strong>Profesional:</strong> Usuario que ofrece servicios a través de la Plataforma</li>
            <li><strong>Cliente:</strong> Usuario que reserva servicios a través de la Plataforma</li>
            <li><strong>Servicio:</strong> Prestación profesional ofrecida a través de la Plataforma</li>
          </ul>
        </div>
        
        <div className="terminos-section">
          <h2>3. Registro de Cuenta</h2>
          <p>
            Para utilizar ciertas funciones de la Plataforma, deberá registrarse creando una cuenta. Usted acepta:
          </p>
          <ul>
            <li>Proporcionar información precisa, actual y completa</li>
            <li>Mantener la confidencialidad de su contraseña</li>
            <li>Aceptar toda la responsabilidad por las actividades que ocurran bajo su cuenta</li>
            <li>Ser mayor de 18 años o contar con autorización de un tutor legal</li>
          </ul>
        </div>
        
        <div className="terminos-section">
          <h2>4. Servicios de Profesionales</h2>
          <p>
            Los Profesionales que ofrecen servicios a través de BookLocal:
          </p>
          <ul>
            <li>Son responsables de la calidad y entrega de sus servicios</li>
            <li>Deben cumplir con todas las leyes y regulaciones aplicables</li>
            <li>Mantendrán información precisa sobre disponibilidad, precios y servicios</li>
            <li>Aceptan las políticas de cancelación establecidas por la Plataforma</li>
          </ul>
        </div>
        
        <div className="terminos-section">
          <h2>5. Reservas y Pagos</h2>
          <ul>
            <li>Las reservas se consideran confirmadas al recibir el pago completo</li>
            <li>BookLocal actúa como intermediario de pago entre Clientes y Profesionales</li>
            <li>Los precios mostrados son finales e incluyen todos los impuestos aplicables</li>
            <li>Política de cancelación:
              <ul>
                <li>Cancelación con más de 24 horas: Reembolso completo</li>
                <li>Cancelación con menos de 24 horas: 50% de reembolso</li>
                <li>No presentación: Sin reembolso</li>
              </ul>
            </li>
          </ul>
        </div>
        
        <div className="terminos-section">
          <h2>6. Comportamiento del Usuario</h2>
          <p>
            Usted se compromete a:
          </p>
          <ul>
            <li>No utilizar la Plataforma para fines ilegales o no autorizados</li>
            <li>No acosar, dañar o perjudicar a otros usuarios</li>
            <li>No interferir con la seguridad o funcionamiento de la Plataforma</li>
            <li>Proporcionar retroalimentación honesta y constructiva</li>
          </ul>
        </div>
        
        <div className="terminos-section">
          <h2>7. Propiedad Intelectual</h2>
          <p>
            Todos los derechos de propiedad intelectual de la Plataforma son propiedad de BookLocal o sus licenciantes. 
            Usted recibe una licencia limitada, no exclusiva, intransferible y revocable para acceder y utilizar el 
            servicio de acuerdo con estos términos.
          </p>
        </div>
        
        <div className="terminos-section">
          <h2>8. Limitación de Responsabilidad</h2>
          <p>
            BookLocal actúa como intermediario entre Profesionales y Clientes. No somos responsables por:
          </p>
          <ul>
            <li>La calidad, seguridad o legalidad de los servicios prestados</li>
            <li>La precisión de la información proporcionada por los Profesionales</li>
            <li>Conflictos o disputas entre Usuarios</li>
            <li>Daños indirectos, incidentales o consecuentes</li>
          </ul>
        </div>
        
        <div className="terminos-section">
          <h2>9. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos Términos en cualquier momento. Las modificaciones entrarán en 
            vigor al publicar los términos revisados. Su uso continuado de la Plataforma constituye la aceptación de los 
            términos modificados.
          </p>
        </div>
        
        <div className="terminos-section">
          <h2>10. Ley Aplicable</h2>
          <p>
            Estos Términos se regirán e interpretarán de acuerdo con las leyes de la República de Panamá. Cualquier 
            disputa relacionada con estos términos se resolverá en los tribunales competentes de la Ciudad de Panamá.
          </p>
        </div>
        
        <div className="terminos-section">
          <h2>11. Contacto</h2>
          <p>
            Para consultas sobre estos Términos y Condiciones, contáctenos en:
            <br /><br />
            <strong>Email:</strong> legal@booklocal.com<br />
            <strong>Dirección:</strong> Universidad Tecnológica de Panamá, Ciudad de Panamá, Panamá
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terminos;