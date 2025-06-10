import React, { useState } from 'react'

function ListaEmpresas() {
  // Estado para controlar la vista activa
  const [vistaActiva, setVistaActiva] = useState('empresas');

  const [empresas, setEmpresas] = useState([
    {
      id: 1,
      logo: "https://randomuser.me/api/portraits/men/32.jpg",
      cancha: "Cancha el camping",
      NIT: "123241223",
      Correo: "carlenn@artwind.no",
      status: "active",
    },  
    {
      id: 2,
      logo: "https://randomuser.me/api/portraits/men/41.jpg",
      cancha: "Cancha el Triangulo",
      NIT: "212122344",
      Correo: "cristofer.ale@ione.no",
      status: "active",
    },
    {
      id: 3,
      logo: "https://randomuser.me/api/portraits/men/22.jpg", 
      cancha: "Canchas la 64",
      NIT: "898998332",
      Correo: "haitam@gmail.com",
      status: "active",
    },
    {
      id: 4,
      logo: "https://randomuser.me/api/portraits/men/55.jpg",
      cancha: "Canchas la estacion",
      NIT: "222222222",
      Correo: "camp@hotmail.com",
      status: "inactive",
    },
  ]);

  // Función para cambiar entre vistas
  const cambiarVista = (vista) => {
    setVistaActiva(vista);
  };

  return (
    <div className="w-full p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-4 pt-4 rounded-lg m-2">
          {/* Botón de Empresas */}
          <button 
            onClick={() => cambiarVista('empresas')} 
            className={`relative px-2.5 py-2 text-xl cursor-pointer transition-colors duration-300 ${vistaActiva === 'empresas' ? 'text-green-700' : 'text-green-400'}`}
          >
            Empresas
            <span 
              className={`absolute bottom-0 left-0 h-0.5 bg-green-500 transition-all duration-300 ${vistaActiva === 'empresas' ? 'w-full' : 'w-0 group-hover:w-full'}`}
            ></span>
          </button>
          
          {/* Botón de Solicitudes */}
          <button 
            onClick={() => cambiarVista('solicitudes')} 
            className={`relative px-2.5 text-xl cursor-pointer transition-colors duration-300 ${vistaActiva === 'solicitudes' ? 'text-green-700' : 'text-green-400'}`}
          >
            Solicitudes
            <span 
              className={`absolute bottom-0 left-0 h-0.5 bg-green-500 transition-all duration-300 ${vistaActiva === 'solicitudes' ? 'w-full' : 'w-0 group-hover:w-full'}`}
            ></span>
          </button>
        </div>
        <div className="text-right text-md text-[#003044]">
          <div>Total Empresas: {empresas.length}</div>
        </div>
      </div>

      {/* Contenido condicional según la vista activa */}
      {vistaActiva === 'empresas' ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="pl-4 text-xl font-semibold text-green-500">Empresas Registradas</h2>
            <div className="flex space-x-4">
              <button className="border border-green-400 text-green-500 px-4 py-2 rounded-md flex items-center">
                <span className="mr-2 cursor-pointer">Filter</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl">
              <thead>
                <tr className="text-left text-[#003044]">
                  <th className="py-3 px-4 w-16">Logo</th>
                  <th className="py-3 px-4">Cancha</th>
                  <th className="py-3 px-4">NIT</th>
                  <th className="py-3 px-4">Correo</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Operaciones</th>
                  <th className="py-3 px-4">Accion</th>
                </tr>
              </thead> 
              <tbody>
                {empresas.map((empresa) => (
                  <tr key={empresa.id}>
                    <td className="py-3 px-4">
                      <img src={empresa.logo} alt={empresa.cancha} className="w-10 h-10 rounded-md object-cover" />
                    </td>
                    <td className="py-3 px-4 font-medium text-[#003044]">{empresa.cancha}</td>
                    <td className="py-3 px-4 text-[#003044]">{empresa.NIT}</td>
                    <td className="py-3 px-4 text-[#003044]">{empresa.Correo}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${empresa.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {empresa.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2 pl-2 justify-left">
                        <button className="text-blue-600 hover:text-blue-800">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
                        Banear
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        // Vista de Solicitudes
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl">
          <div className="text-green-500 text-xl font-semibold mb-4">Solicitudes pendientes</div>
          <p className="text-gray-500">No hay solicitudes pendientes en este momento.</p>
        </div>
      )}
    </div>
  )
}

export default ListaEmpresas
