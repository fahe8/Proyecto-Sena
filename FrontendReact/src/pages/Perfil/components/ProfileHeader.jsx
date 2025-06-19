import React from "react";
import camara from "../../../assets/Perfil/camara.svg";

const ProfileHeader = ({ usuario }) => {
  return (
    <div className="bg-[#003044] rounded-t-lg shadow-lg py-8 px-12 ">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-15 h-15 md:w-18 md:h-18  rounded-full bg-gradient-to-r from-[#00c951] to-[#33ea30] flex items-center justify-center shadow-xl border-4 border-white overflow-hidden">
              {usuario?.imagen ? (
                <img 
                  src={usuario.imagen} 
                  alt="Foto de perfil" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    // Show fallback content when image fails to load
                    e.target.parentNode.innerHTML = `<p class="text-4xl font-bold text-white">${usuario.nombre ? usuario.nombre[0].toLocaleUpperCase() : ''}</p>`;
                  }}
                />
              ) : (
                <p className="text-2xl md:text-4xl font-bold text-white">
                  {usuario?.nombre ? usuario.nombre[0].toLocaleUpperCase() : ''}
                </p>
              )}
             
            </div>
          </div>
          <div className="text-white mt-4 md:mt-0">
            <h2 className="text-xl font-bold">
              {usuario?.nombre && usuario?.apellido ? `${usuario.nombre} ${usuario.apellido}` : 'Usuario'}
            </h2>
            <p className="text-gray-300">{usuario?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;