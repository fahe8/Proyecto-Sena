import React from "react";
import iconSearch from "../../assets/Inicio/search.svg";

export const BusquedaFiltros = () => {
  return (
    <div className="flex gap-1 px-1 lg:gap-6 w-full justify-center pt-4 lg:pt-0">
      <button className="w-12 lg:w-24 flex shadow-md py-2 justify-center border border-gray-300 rounded-md hover:border-black hover:bg-gray-200 transition-all duration-300 ease-in-out">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>

        <span className="hidden lg:block">Filtros</span>
      </button>
      <form className="relative w-full lg:w-[500px] flex">
        <input
          type="text"
          placeholder="Busca alguna cancha que conozcas..."
          className="w-full pl-4 pr-10 lg:pl-10 lg:pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <img
          className="absolute right-4 top-3"
          src={iconSearch}
          alt="Icono de lupa"
        />
      </form>
    </div>
  );
};
