import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../Header/Header';

const TerminosCondiciones = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-[#003044] mb-6">Términos y Condiciones</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">1. Introducción</h2>
                <p className="mb-3">
                  Bienvenido a Mi Cancha Ya. Estos Términos y Condiciones rigen el uso de nuestra plataforma web y aplicación móvil, así como todos los servicios relacionados proporcionados por Mi Cancha Ya.
                </p>
                <p>
                  Al acceder o utilizar nuestros servicios, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder o utilizar nuestros servicios.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">2. Definiciones</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>"Plataforma"</strong>: Se refiere al sitio web y aplicación móvil de Mi Cancha Ya.</li>
                  <li><strong>"Usuario"</strong>: Cualquier persona que acceda o utilice la Plataforma.</li>
                  <li><strong>"Propietario"</strong>: Persona o entidad que registra y administra canchas deportivas en la Plataforma.</li>
                  <li><strong>"Reserva"</strong>: Acuerdo entre un Usuario y un Propietario para el uso de una cancha en una fecha y hora específicas.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">3. Registro y Cuentas de Usuario</h2>
                <p className="mb-3">
                  Para utilizar ciertas funciones de nuestra Plataforma, deberá registrarse y crear una cuenta. Usted es responsable de mantener la confidencialidad de su información de cuenta y contraseña.
                </p>
                <p className="mb-3">
                  Usted acepta proporcionar información precisa, actual y completa durante el proceso de registro y se compromete a actualizar dicha información para mantenerla precisa y completa.
                </p>
                <p>
                  Mi Cancha Ya se reserva el derecho de suspender o terminar su cuenta si se proporciona información falsa, inexacta, desactualizada o incompleta, o si existe una sospecha razonable de uso no autorizado de su cuenta.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">4. Reservas y Pagos</h2>
                <p className="mb-3">
                  Al realizar una reserva a través de nuestra Plataforma, usted acepta pagar el precio total indicado por el uso de la cancha deportiva seleccionada.
                </p>
                <p className="mb-3">
                  Los pagos se procesarán a través de los métodos de pago disponibles en la Plataforma. Mi Cancha Ya no almacena información de tarjetas de crédito; todos los pagos son procesados por proveedores de servicios de pago seguros.
                </p>
                <p className="mb-3">
                  Las políticas de cancelación y reembolso varían según el Propietario de la cancha. Consulte las políticas específicas antes de realizar una reserva.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">5. Responsabilidades del Usuario</h2>
                <p className="mb-3">Como Usuario de nuestra Plataforma, usted acepta:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Utilizar la Plataforma de acuerdo con todas las leyes aplicables.</li>
                  <li>No utilizar la Plataforma para fines ilegales o no autorizados.</li>
                  <li>No intentar dañar, deshabilitar o sobrecargar la Plataforma.</li>
                  <li>Respetar las instalaciones y reglas de las canchas deportivas que reserve.</li>
                  <li>Llegar puntualmente a sus reservas y dejar las instalaciones en buen estado.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">6. Responsabilidades del Propietario</h2>
                <p className="mb-3">Como Propietario en nuestra Plataforma, usted acepta:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Proporcionar información precisa sobre sus canchas deportivas.</li>
                  <li>Mantener sus canchas en condiciones seguras y adecuadas para su uso.</li>
                  <li>Honrar todas las reservas realizadas a través de la Plataforma.</li>
                  <li>Establecer políticas claras de cancelación y reembolso.</li>
                  <li>Cumplir con todas las leyes y regulaciones aplicables a su negocio.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">7. Limitación de Responsabilidad</h2>
                <p className="mb-3">
                  Mi Cancha Ya actúa únicamente como intermediario entre Usuarios y Propietarios. No somos responsables de la calidad, seguridad o disponibilidad de las canchas deportivas ofrecidas por los Propietarios.
                </p>
                <p>
                  En ningún caso Mi Cancha Ya será responsable por daños directos, indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de usar nuestra Plataforma.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">8. Modificaciones a los Términos</h2>
                <p>
                  Mi Cancha Ya se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en la Plataforma. El uso continuado de la Plataforma después de dichas modificaciones constituirá su consentimiento a tales cambios.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">9. Ley Aplicable</h2>
                <p>
                  Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes de Colombia, sin tener en cuenta sus disposiciones sobre conflictos de leyes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">10. Contacto</h2>
                <p>
                  Si tiene alguna pregunta sobre estos Términos y Condiciones, por favor contáctenos a través de contactoleidev@gmail.com o al teléfono +57 3214650172.
                </p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Última actualización: {new Date().toLocaleDateString()}
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link to="/politica-privacidad" className="text-green-600 hover:text-green-800 font-medium">
                  Política de Privacidad
                </Link>
                <Link to="/politica-cookies" className="text-green-600 hover:text-green-800 font-medium">
                  Política de Cookies
                </Link>
                <button 
                  onClick={handleGoBack} 
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  ← Volver a la página anterior
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TerminosCondiciones;