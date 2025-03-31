import React from 'react';
import CardEmpresa from "../Inicio/componentes/CardEmpresa.jsx";
import { useEmpresas } from "../../Provider/EmpresasProvider.jsx";

const NoRecomendadas = () => {
  
  const { copiaEmpresas } = useEmpresas();

  return (
    <div className='bg-[#fbfbfb] w-full py-15 px-20'>
      <h1 className='text-center font-bold text-lg'>NO RECOMENDADAS</h1>
      <hr className='w-full text-green-500 mx-auto my-4' />
      
      <div className='flex text-xs items-center justify-between mb-8'>
        <button className='bg-gray-200 rounded-full flex items-center justify-start px-4 py-1 cursor-pointer'>Seleccionar</button>
        <div className='flex items-center'>
          <p className='ml-2 leading-none flex items-center'>Seleccionar todos</p>
          <input type="checkbox" className='ml-2 h-3 w-3 align-middle p-0 m-0' />
          <button className='bg-red-500 text-white flex items-center justify-center px-4 py-1 rounded-full ml-5 cursor-pointer'>Anular</button>
        </div>
      </div>
      
      {/* Renderizar las tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {copiaEmpresas?.map((empresa, index) => (
          <CardEmpresa key={index} empresa={empresa} />
    
        ))}
        
      </div>
    </div>
  );
};

export default NoRecomendadas;