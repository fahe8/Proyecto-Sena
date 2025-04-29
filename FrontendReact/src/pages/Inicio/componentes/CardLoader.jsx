import React from 'react'

const CardLoader = () => {
  return (
    <div className='w-64 bg-[#fdfdfd] rounded-2xl shadow-lg overflow-hidden animate-pulse'>
      {/* Imagen esqueleto */}
      <div className="h-48 w-full bg-gray-200"/>

      {/* Contenido esqueleto */}
      <div className="px-6 py-4">
        <div className="bg-white">
          <div className="flex justify-between items-center min-h-[3rem]">
            {/* Titutlo esqueleto */}
            <div className="h-4 bg-gray-200 rounded w-2/3"/>
            {/* Calificación esqueleto */}
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-gray-200 rounded"/>
              <div className="h-4 w-8 bg-gray-200 rounded"/>
            </div>
          </div>

          {/* Types Skeleton */}
          <div className="mt-2 h-4 bg-gray-200 rounded w-4/5"/>
        </div>

        {/* Services Icons Skeleton */}
        <div className="flex gap-4 justify-center my-2">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-5 w-5 bg-gray-200 rounded-full"/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardLoader