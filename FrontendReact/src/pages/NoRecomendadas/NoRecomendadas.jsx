import React, { useState } from "react";
import CardEmpresa from "../Inicio/componentes/CardEmpresa.jsx";
import { useEmpresas } from "../../Provider/EmpresasProvider.jsx";


const NoRecomendadas = () => {
  const { copiaEmpresas } = useEmpresas();
  const [mostrarOpciones, setMostrarOpciones] = useState(false); 
  const [seleccionados, setSeleccionados] = useState([]);

  // Manejar selección de una empresa
  const manejarSeleccion = (slug) => {
    if (seleccionados.includes(slug)) {
      setSeleccionados(seleccionados.filter((item) => item !== slug));
    } else {
      setSeleccionados([...seleccionados, slug]);
    }
  };

  // Seleccionar todos
  const seleccionarTodos = () => {
    if (seleccionados.length === copiaEmpresas.length) {
      setSeleccionados([]); 
    } else {
      setSeleccionados(copiaEmpresas.map((empresa) => empresa.slug)); 
    }
  };

  // Anular aislamiento
  const anularAislamiento = () => {
    
  };

  return (
    <div className="bg-[#fbfbfb] w-full py-10 px-10 md:px-15 lg:px-20 ">
      <h1 className="text-center font-bold text-lg">NO RECOMENDADAS</h1>
      <hr className="w-full mx-auto my-4 border-[1.5px]" />

      <div className="flex justify-between items-center text-xs mb-8">
        <div className="flex items-center">

          <button
            className="bg-[#33ea30] hover:bg-green-800 hover:text-[#f5f5f5] rounded-full flex items-center justify-start px-4 py-1 transition-all cursor-pointer"
            onClick={() => setMostrarOpciones(!mostrarOpciones)}
          >
            Seleccionar
          </button>

          {mostrarOpciones && (
            <div className="flex items-center mx-2">
              <p className="leading-none flex items-center">Seleccionar todos</p>
              <input type="checkbox"
                className="ml-2 h-3 w-3 align-middle p-0 m-0 "
                onChange={seleccionarTodos}
                checked={seleccionados.length === copiaEmpresas.length}
              />
            </div>
          )}
        </div>

        <button
          className={`flex items-center justify-center px-4 py-1 rounded-full cursor-pointer ${
            seleccionados.length > 0 ? "bg-red-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          onClick={anularAislamiento}
          disabled={seleccionados.length === 0}>Anular
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-15">
        {copiaEmpresas?.map((empresa) => (
          <div
            key={empresa.slug}
            className="relative hover:scale-102 transition-transform duration-300 ease-in-out mx-auto my-0">
            {mostrarOpciones && (
              <input
                type="checkbox"
                className="absolute top-2 left-2 z-10 w-4 h-4 "
                checked={seleccionados.includes(empresa.slug)}
                onChange={() => manejarSeleccion(empresa.slug)}
              />
            )}
            <CardEmpresa empresa={empresa} mostrarFavorito={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoRecomendadas;