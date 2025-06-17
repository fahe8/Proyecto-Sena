import React, { useState } from "react";
import camara from "../../../assets/Perfil/camara.svg";
import CloudinaryUploader from "../../../components/CloudinaryUploader";

const ProfileHeader = ({ usuario, onImageUpload }) => {
  const [showUploader, setShowUploader] = useState(false);
  return (
    <div className="bg-[#003044] rounded-t-lg shadow-lg py-8 px-12 ">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-18 h-18 rounded-full bg-gradient-to-r from-[#00c951] to-[#33ea30] flex items-center justify-center shadow-xl border-4 border-white overflow-hidden">
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
                <p className="text-4xl font-bold text-white">
                  {usuario?.nombre ? usuario.nombre[0].toLocaleUpperCase() : ''}
                </p>
              )}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 rounded-full transition-opacity duration-300" />
              <div 
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer transform translate-y-1/4 translate-x-1/4 hover:bg-gray-100"
                onClick={() => setShowUploader(!showUploader)}
              >
                <img className="w-5 h-5" src={camara} alt="Cambiar foto" />
              </div>
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
      
      {/* Modal para subir imagen */}
      {showUploader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Cambiar foto de perfil</h3>
              <button 
                onClick={() => setShowUploader(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <CloudinaryUploader
              onUploadSuccess={(formData) => {
                onImageUpload(formData);
                setShowUploader(false);
                
              }}
              folder="usuarios"
              
            />
            
            <div className="mt-4 flex justify-end gap-2">
              <button 
                onClick={() => setShowUploader(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;