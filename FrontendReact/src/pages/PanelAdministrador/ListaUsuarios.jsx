import React, { useState } from 'react'

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
      Estado: "inactive",
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
    
  ]);

  return (
    <div className="w-full p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button className="px-4 py-2 border-b-2 border-green-400 text-green-400 font-medium">Usuarios</button>
        </div>
        <div className="text-right text-sm text-gray-500">
          <div>Total Usuarios: 6</div>
        </div>
      </div>  

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-green-500 ">Usuarios Registrados</h2>
        <div className="flex space-x-4">
          <button className="border border-green-400 text-green-500 px-4 py-2 rounded-md flex items-center">
            <span className="mr-2">Filter</span>
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
              <th className="py-3 px-4 w-16">Foto</th>
              <th className="py-3 px-4">Nombre</th>
              <th className="py-3 px-4">Telefono</th>
              <th className="py-3 px-4">Correo</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4">Operaciones</th>
              <th className="py-3 px-4">Accion</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td className="py-3 px-4">
                  <img src={usuario.Foto} alt={usuario.Nombre} className="w-10 h-10 rounded-md object-cover" />
                </td>
                <td className="py-3 px-4 font-medium text-[#003044] ">{usuario.Nombre}</td>
                <td className="py-3 px-4 text-[#003044]">{usuario.Telefono}</td>
                <td className="py-3 px-4 text-[#003044]">{usuario.Correo}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${usuario.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {usuario.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
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
    </div>
  )
}

export default ListaUsuarios
