import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../Header/Header';

const PoliticaPrivacidad = () => {
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
            <h1 className="text-3xl font-bold text-[#003044] mb-6">Política de Privacidad</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">1. Introducción</h2>
                <p className="mb-3">
                  En Mi Cancha Ya, valoramos y respetamos su privacidad. Esta Política de Privacidad explica cómo recopilamos, utilizamos, divulgamos y protegemos su información personal cuando utiliza nuestra plataforma web y aplicación móvil.
                </p>
                <p>
                  Al utilizar nuestros servicios, usted acepta las prácticas descritas en esta Política de Privacidad. Si no está de acuerdo con esta política, por favor no utilice nuestros servicios.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">2. Información que Recopilamos</h2>
                <p className="mb-3">Podemos recopilar los siguientes tipos de información:</p>
                
                <h3 className="text-lg font-medium text-[#003044] mb-2">2.1 Información Personal</h3>
                <ul className="list-disc pl-5 space-y-2 mb-3">
                  <li>Nombre y apellidos</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Dirección postal</li>
                  <li>Información de pago (procesada por proveedores de servicios de pago seguros)</li>
                  <li>Fotografía de perfil (opcional)</li>
                  <li>Documento de identidad (para propietarios de canchas)</li>
                </ul>
                
                <h3 className="text-lg font-medium text-[#003044] mb-2">2.2 Información de Uso</h3>
                <ul className="list-disc pl-5 space-y-2 mb-3">
                  <li>Historial de reservas</li>
                  <li>Preferencias de canchas</li>
                  <li>Reseñas y calificaciones</li>
                  <li>Interacciones con nuestra plataforma</li>
                </ul>
                
                <h3 className="text-lg font-medium text-[#003044] mb-2">2.3 Información Técnica</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Dirección IP</li>
                  <li>Tipo de navegador</li>
                  <li>Sistema operativo</li>
                  <li>Identificadores de dispositivos</li>
                  <li>Datos de cookies y tecnologías similares</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">3. Cómo Utilizamos su Información</h2>
                <p className="mb-3">Utilizamos la información recopilada para:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Facilitar y gestionar reservas de canchas deportivas</li>
                  <li>Procesar pagos</li>
                  <li>Proporcionar soporte al cliente</li>
                  <li>Mejorar y personalizar nuestros servicios</li>
                  <li>Enviar notificaciones relacionadas con reservas y servicios</li>
                  <li>Enviar comunicaciones de marketing (con su consentimiento)</li>
                  <li>Prevenir fraudes y garantizar la seguridad de nuestra plataforma</li>
                  <li>Cumplir con obligaciones legales</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">4. Compartición de Información</h2>
                <p className="mb-3">Podemos compartir su información con:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Propietarios de Canchas:</strong> Cuando realiza una reserva, compartimos la información necesaria con el propietario de la cancha para facilitar la reserva.</li>
                  <li><strong>Proveedores de Servicios:</strong> Trabajamos con terceros que nos ayudan a operar nuestra plataforma y proporcionar servicios (procesamiento de pagos, análisis de datos, servicio al cliente).</li>
                  <li><strong>Autoridades Legales:</strong> Cuando sea necesario para cumplir con la ley, procesos legales o solicitudes gubernamentales.</li>
                </ul>
                <p className="mt-3">
                  No vendemos ni alquilamos su información personal a terceros con fines de marketing.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">5. Seguridad de la Información</h2>
                <p className="mb-3">
                  Implementamos medidas de seguridad técnicas, administrativas y físicas diseñadas para proteger su información personal contra acceso no autorizado, pérdida, mal uso o alteración.
                </p>
                <p>
                  Sin embargo, ninguna transmisión de datos por Internet o sistema de almacenamiento puede garantizarse como 100% seguro. Por lo tanto, no podemos garantizar la seguridad absoluta de su información.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">6. Sus Derechos</h2>
                <p className="mb-3">Dependiendo de su ubicación, puede tener los siguientes derechos:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Acceder a su información personal</li>
                  <li>Corregir información inexacta o incompleta</li>
                  <li>Eliminar su información personal</li>
                  <li>Restringir u oponerse al procesamiento de su información</li>
                  <li>Portabilidad de datos</li>
                  <li>Retirar su consentimiento en cualquier momento</li>
                </ul>
                <p className="mt-3">
                  Para ejercer estos derechos, contáctenos a través de contactoleidev@gmail.com.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">7. Retención de Datos</h2>
                <p>
                  Conservamos su información personal durante el tiempo necesario para cumplir con los fines descritos en esta Política de Privacidad, a menos que la ley exija o permita un período de retención más largo.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">8. Menores</h2>
                <p>
                  Nuestros servicios no están dirigidos a personas menores de 18 años. No recopilamos a sabiendas información personal de menores. Si descubrimos que hemos recopilado información personal de un menor, tomaremos medidas para eliminar dicha información.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">9. Cambios a esta Política</h2>
                <p>
                  Podemos actualizar esta Política de Privacidad periódicamente. La versión más reciente estará disponible en nuestra plataforma con la fecha de "última actualización". Le recomendamos revisar esta política regularmente.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">10. Contacto</h2>
                <p>
                  Si tiene preguntas o inquietudes sobre esta Política de Privacidad o nuestras prácticas de privacidad, contáctenos a través de contactoleidev@gmail.com o al teléfono +57 3214650172.
                </p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Última actualización: {new Date().toLocaleDateString()}
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link to="/terminos-condiciones" className="text-green-600 hover:text-green-800 font-medium">
                  Términos y Condiciones
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

export default PoliticaPrivacidad;