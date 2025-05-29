import React from "react";
import camara from "../../../assets/Perfil/camara.svg";

const AdminProfileHeader = ({ propietario, empresa }) => {
  return (
    <div className="bg-[#003044] rounded-lg shadow-lg p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#00c951] to-[#33ea30] flex items-center justify-center shadow-xl border-4 border-white overflow-hidden">
              {empresa?.logo ? (
                <img 
                  src={empresa.logo} 
                  alt="Logo de la empresa" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    // Mostrar contenido alternativo cuando la imagen no carga
                    e.target.parentNode.innerHTML = `<p class="text-6xl font-bold text-white">${empresa.nombre ? empresa.nombre[0].toLocaleUpperCase() : ''}</p>`;
                  }}
                />
              ) : (
                <p className="text-6xl font-bold text-white">
                  {empresa?.nombre ? empresa.nombre[0].toLocaleUpperCase() : ''}
                </p>
              )}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 rounded-full transition-opacity duration-300" />
              <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer transform translate-y-1/4 translate-x-1/4 hover:bg-gray-100">
                <img className="w-6 h-6" src={camara} alt="Cambiar logo" />
              </div>
            </div>
          </div>
          <div className="text-white mt-4 md:mt-0">
            <h2 className="text-2xl font-bold">
              {empresa?.nombre || 'Empresa'}
            </h2>
            <p className="text-gray-300">Representante: {propietario?.nombre && propietario?.apellido ? `${propietario.nombre} ${propietario.apellido}` : 'Propietario'}</p>
            <p className="text-gray-300">{propietario?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileHeader;