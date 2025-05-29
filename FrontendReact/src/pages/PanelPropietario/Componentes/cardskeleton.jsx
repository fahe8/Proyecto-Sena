import React from 'react';

const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div 
            key={index} 
            className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-14px)] lg:w-[255px] bg-[#f2f2f2] rounded-xl shadow-md overflow-hidden animate-pulse"
          >
            {/* Imagen */}
            <div className="w-full h-48 bg-gray-300 rounded-t-xl"></div>
            
            {/* Título y rating */}
            <div className="flex justify-between items-center px-2.5 py-2.5">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="flex items-center gap-1">
                <div className="h-4 bg-gray-300 rounded w-10"></div>
              </div>
            </div>
            
            {/* Botones */}
            <div className="flex gap-2.5 px-2.5 pb-2.5">
              <div className="flex-1 h-8 bg-gray-300 rounded"></div>
              <div className="flex-1 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
    </>
  );
};

export default CardSkeleton;