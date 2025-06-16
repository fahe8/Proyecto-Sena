import React, { useState } from 'react'
import BuscarBTN from './BuscarBTN';


function ListaUsuarios() {
  // Array de objetos con la información de los usuarios
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      Foto: "https://randomuser.me/api/portraits/men/32.jpg",
      Nombre: "George Linekof",
      Telefono: "+4 315 23 62",
      Correo: "carlenn@artwind.no",
      status: "active",
    },
    {
      id: 2,
      Foto: "https://randomuser.me/api/portraits/men/41.jpg",
      Nombre: "Erik Dyer",
      Telefono: "+2 134 25 65",
      Correo: "cristofer.ale@ione.no",
      status: "active",
    },
    {
      id: 3,
      Foto: "https://randomuser.me/api/portraits/men/22.jpg",
      Nombre: "Haitam Alassami",
      Telefono: "+1 345 22 21",
      Correo: "haitam@gmail.com",
      status: "active",
    },
    {
      id: 4,
      Foto: "https://randomuser.me/api/portraits/men/55.jpg",
      Nombre: "Michael Campbell",
      Telefono: "+7 256 52 73",
      Correo: "camp@hotmail.com",
      status: "inactive",
    },
    {
      id: 5,
      Foto: "https://randomuser.me/api/portraits/women/32.jpg",
      Nombre: "Ashley Williams",
      Telefono: "+1 965 43 11",
      Correo: "williams.ash@gmail.com",
      status: "active",
    },
    {
      id: 6,
      Foto: "https://randomuser.me/api/portraits/women/44.jpg",
      Nombre: "Vanessa Paradi",
      Telefono: "+4 644 12 38",
      Correo: "paradi.van@google.com",
      status: "active",
    },
    {
      id: 7,
      Foto: "https://randomuser.me/api/portraits/women/24.jpg",
      Nombre: "Sophie Martinez",
      Telefono: "+3 789 45 67",
      Correo: "sophie.m@outlook.com",
      status: "inactive",
    },
    {
      id: 8,
      Foto: "https://randomuser.me/api/portraits/women/54.jpg",
      Nombre: "Elena Rodriguez",
      Telefono: "+5 123 78 90",
      Correo: "elena.rod@yahoo.com",
      status: "pending",
    }
  ]);

  const getStatusInfo = (status) => {
    switch(status) {
      case 'active':
        return {
          text: 'Activo',
          style: 'bg-green-100 text-green-800'
        };
      case 'inactive':
        return {
          text: 'Inactivo',
          style: 'bg-red-100 text-red-800'
        };
      case 'pending':
        return {
          text: 'En Proceso',
          style: 'bg-yellow-100 text-yellow-800'
        };
      default:
        return {
          text: 'Desconocido',
          style: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const CambiarEstadoUsuario = (id, NuevoEstado) => {
    setUsuarios(usuarios.map(usuario => 
      usuario.id === id ? {...usuario, status: NuevoEstado } : usuario
    ));
  };

  return (
    <div className="w-full p-3 sm:m-4 bg-gray-50 rounded-lg shadow-md">
      {/* Header con estadísticas */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <div className="flex space-x-4 rounded-lg">
          <button className="px-2 sm:px-4 py-2 pt-7 border-b-3 border-green-400 text-green-400 text-lg sm:text-xl">
            Usuarios
          </button>
        </div>
        <div className="text-right text-sm sm:text-md text-[#003044]">
          <div>Total Usuarios: {usuarios.length}</div>
        </div>
      </div>

      {/* Título y controles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-lg sm:text-xl font-semibold text-green-500">
          Usuarios Registrados
        </h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <BuscarBTN />
          <button className="border border-green-400 text-green-500 px-4 py-2 rounded-md flex items-center">
                <span className="mr-2 cursor-pointer">Filter</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
              </button>
        </div>
      </div>

      {/* Vista de tabla para desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl">
          <thead>
            <tr className="text-left text-[#003044]">
              <th className="py-3 px-4">Foto</th>
              <th className="py-3 px-4">Nombre</th>
              <th className="py-3 px-4">Teléfono</th>
              <th className="py-3 px-4">Correo</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4">Operaciones</th>
              <th className="py-3 px-4">Acción</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id} >
                <td className="py-3 px-4">
                  <img src={usuario.Foto} alt={usuario.Nombre} className="w-10 h-10 rounded-md object-cover" />
                </td>
                <td className="py-3 px-4 font-medium text-[#003044]">{usuario.Nombre}</td>
                <td className="py-3 px-4 text-[#003044]">{usuario.Telefono}</td>
                <td className="py-3 px-4 text-[#003044]">{usuario.Correo}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusInfo(usuario.status).style}`}>
                    {getStatusInfo(usuario.status).text}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2 justify-left">
                    <button className="text-blue-600 hover:text-blue-800 p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="text-green-600 hover:text-green-800 p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="text-red-600 hover:text-red-800 p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <button 
                    onClick={() => CambiarEstadoUsuario(usuario.id, usuario.status === 'active' ? 'inactive' : 'active')}
                    className={`px-3 py-1 rounded-md text-sm ${usuario.status === 'active' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                  >
                    {usuario.status === 'active' ? 'Banear' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista de tarjetas para móvil y tablet */}
      <div className="lg:hidden space-y-4">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="bg-white rounded-lg p-4 shadow-sm border">
            {/* Header de la tarjeta */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img src={usuario.Foto} alt={usuario.Nombre} className="w-12 h-12 rounded-md object-cover" />
                <div>
                  <h3 className="font-medium text-[#003044] text-sm sm:text-base">{usuario.Nombre}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${getStatusInfo(usuario.status).style}`}>
                    {getStatusInfo(usuario.status).text}
                  </span>
                </div>
              </div>
            </div>

            {/* Información de contacto */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-[#003044]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{usuario.Telefono}</span>
              </div>
              <div className="flex items-center text-sm text-[#003044]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">{usuario.Correo}</span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex space-x-3">
                <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <button 
                onClick={() => CambiarEstadoUsuario(usuario.id, usuario.status === 'active' ? 'inactive' : 'active')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  usuario.status === 'active' 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {usuario.status === 'active' ? 'Banear' : 'Activar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListaUsuarios