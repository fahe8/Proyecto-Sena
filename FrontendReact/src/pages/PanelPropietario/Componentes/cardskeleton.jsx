import React from 'react';

const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div 
            key={index} 
            className="w-full flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden animate-pulse mb-4 border border-gray-100"
          >
            {/* Imagen */}
            <div className="w-full md:w-1/3 h-48 bg-gray-200 relative">
              {/* Indicador de estado skeleton */}
              <div className="absolute top-0 left-0 w-full p-2">
                <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
              </div>
            </div>
            
            {/* Contenido */}
            <div className="w-full md:w-2/3 flex flex-col justify-between p-4 md:px-10">
              {/* Título */}
              <div className="mb-3">
                <div className="h-6 bg-gray-300 rounded w-32 sm:w-40"></div>
              </div>
              
              {/* Información adicional */}
              <div className="text-sm text-gray-600 space-y-3">
                {/* Información en fila: Tipo y Precio */}
                <div className="flex flex-wrap gap-4 mt-1">
                  {/* Tipo de cancha con icono */}
                  <div className="flex items-center bg-gray-200 px-3 py-1.5 rounded-lg">
                    <div className="h-5 w-5 bg-gray-300 rounded mr-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-28"></div>
                  </div>
                  
                  {/* Precio con icono */}
                  <div className="flex items-center bg-gray-200 px-3 py-1.5 rounded-lg">
                    <div className="h-5 w-5 bg-gray-300 rounded mr-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              </div>
              
              {/* Botones */}
              <div className="flex gap-3 mt-4">
                <div className="flex-1 h-9 bg-white border border-gray-300 rounded-md flex items-center justify-center">
                  <div className="h-4 w-4 bg-gray-300 rounded-full md:mr-1"></div>
                  <div className="hidden sm:block h-3 w-16 bg-gray-300 rounded ml-1"></div>
                </div>
                <div className="flex-1 h-9 bg-white border border-gray-300 rounded-md flex items-center justify-center">
                  <div className="h-4 w-4 bg-gray-300 rounded-full md:mr-1"></div>
                  <div className="hidden sm:block h-3 w-16 bg-gray-300 rounded ml-1"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default CardSkeleton;