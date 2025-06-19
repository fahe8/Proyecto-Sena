import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../Header/Header';

const PoliticaCookies = () => {
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
            <h1 className="text-3xl font-bold text-[#003044] mb-6">Política de Cookies</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">1. ¿Qué son las Cookies?</h2>
                <p className="mb-3">
                  Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (computadora, teléfono móvil o tablet) cuando visita nuestra plataforma. Las cookies nos ayudan a hacer que nuestra plataforma funcione correctamente, la haga más segura, brinde una mejor experiencia de usuario y nos permita analizar cómo se utiliza nuestra plataforma.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">2. Tipos de Cookies que Utilizamos</h2>
                
                <h3 className="text-lg font-medium text-[#003044] mb-2">2.1 Cookies Esenciales</h3>
                <p className="mb-3">
                  Estas cookies son necesarias para el funcionamiento de nuestra plataforma. Le permiten navegar por nuestra plataforma y utilizar sus funciones, como acceder a áreas seguras. Sin estas cookies, no podríamos proporcionar los servicios que ha solicitado.
                </p>
                
                <h3 className="text-lg font-medium text-[#003044] mb-2">2.2 Cookies de Rendimiento</h3>
                <p className="mb-3">
                  Estas cookies recopilan información sobre cómo utiliza nuestra plataforma, como qué páginas visita con más frecuencia y si recibe mensajes de error. Estos datos nos ayudan a mejorar el rendimiento de nuestra plataforma.
                </p>
                
                <h3 className="text-lg font-medium text-[#003044] mb-2">2.3 Cookies de Funcionalidad</h3>
                <p className="mb-3">
                  Estas cookies permiten que nuestra plataforma recuerde las elecciones que realiza (como su nombre de usuario, idioma o región) y proporcione funciones mejoradas y más personalizadas.
                </p>
                
                <h3 className="text-lg font-medium text-[#003044] mb-2">2.4 Cookies de Publicidad y Seguimiento</h3>
                <p className="mb-3">
                  Estas cookies se utilizan para entregar anuncios más relevantes para usted y sus intereses. También se utilizan para limitar el número de veces que ve un anuncio y para ayudar a medir la efectividad de las campañas publicitarias.
                </p>
                
                <h3 className="text-lg font-medium text-[#003044] mb-2">2.5 Cookies de Redes Sociales</h3>
                <p>
                  Estas cookies están configuradas por una serie de servicios de redes sociales que hemos agregado a nuestra plataforma para permitirle compartir nuestro contenido con sus amigos y redes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">3. Cookies de Terceros</h2>
                <p className="mb-3">
                  Además de nuestras propias cookies, también podemos utilizar varias cookies de terceros para informar estadísticas de uso de nuestra plataforma, entregar anuncios en y a través de nuestra plataforma, y así sucesivamente.
                </p>
                <p>
                  Estas cookies pueden rastrear sus actividades de navegación en otros sitios web y crear un perfil de sus intereses en línea. Esto podría afectar el contenido y los mensajes que encuentra en otros sitios web que visita.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">4. Cómo Controlar las Cookies</h2>
                <p className="mb-3">
                  La mayoría de los navegadores web permiten cierto control de la mayoría de las cookies a través de la configuración del navegador. Para obtener más información sobre las cookies, incluido cómo ver qué cookies se han establecido y cómo administrarlas y eliminarlas, visite <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">www.allaboutcookies.org</a>.
                </p>
                <p className="mb-3">
                  Para optar por no ser rastreado por Google Analytics en todos los sitios web, visite <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">https://tools.google.com/dlpage/gaoptout</a>.
                </p>
                <p>
                  Tenga en cuenta que si decide deshabilitar las cookies, es posible que no pueda acceder a ciertas partes de nuestra plataforma y algunas funciones pueden no funcionar correctamente.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">5. Cookies Específicas Utilizadas</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propósito</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiración</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">_ga</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Google Analytics</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Registra una identificación única que se utiliza para generar datos estadísticos sobre cómo utiliza el visitante el sitio web.</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 años</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">_gid</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Google Analytics</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Registra una identificación única que se utiliza para generar datos estadísticos sobre cómo utiliza el visitante el sitio web.</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">24 horas</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">_gat</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Google Analytics</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Se utiliza para limitar la velocidad de solicitud.</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 minuto</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">authToken</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mi Cancha Ya</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mantiene al usuario conectado durante la sesión.</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sesión</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">formEmpresaData</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mi Cancha Ya</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Guarda temporalmente los datos del formulario de registro de empresa.</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Local Storage</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">6. Cambios en nuestra Política de Cookies</h2>
                <p>
                  Podemos actualizar nuestra Política de Cookies periódicamente. Le notificaremos cualquier cambio publicando la nueva Política de Cookies en esta página. Le recomendamos que revise esta Política de Cookies periódicamente para estar informado de cualquier cambio.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#003044] mb-3">7. Contacto</h2>
                <p>
                  Si tiene preguntas o inquietudes sobre nuestra Política de Cookies, contáctenos a través de contactoleidev@gmail.com o al teléfono +57 3214650172.
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
                <Link to="/politica-privacidad" className="text-green-600 hover:text-green-800 font-medium">
                  Política de Privacidad
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

export default PoliticaCookies;