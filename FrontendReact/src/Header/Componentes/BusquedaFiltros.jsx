import React, { useState } from "react";
import iconSearch from "../../assets/Inicio/search.svg";
import close from "../../assets/header/close.svg";
import { useEmpresas } from "../../Provider/EmpresasProvider";
import { iconosServicios } from "../../utils/iconosServicios";

export const BusquedaFiltros = () => {
  const [filtros, setFiltros] = useState({
    tiposCanchas: [],
    servicios: [],
  });

  const agregarFiltros = (categoria, valor) => {
    setFiltros((prevFiltros) => {
      let nuevosFiltros = { ...prevFiltros };

      if (categoria === "tiposCanchas") {
        nuevosFiltros.tiposCanchas = prevFiltros.tiposCanchas.includes(valor)
          ? prevFiltros.tiposCanchas.filter((item) => item !== valor)
          : [...prevFiltros.tiposCanchas, valor];
      } else if (categoria === "servicios") {
        nuevosFiltros.servicios = prevFiltros.servicios.includes(valor)
          ? prevFiltros.servicios.filter((item) => item !== valor)
          : [...prevFiltros.servicios, valor];
      }
      return nuevosFiltros;
    });
  };

  const limpiarFiltros = () => {
    setFiltros({
      tiposCanchas: [],
      servicios: [],
    });
  };

  return (
    <div className="flex gap-1 px-1 lg:gap-6 w-full justify-center pt-4 lg:pt-0">
      <BotonFiltros
        filtros={filtros}
        agregarFiltros={agregarFiltros}
        limpiarFiltros={limpiarFiltros}
      />
      <BarraBusqueda filtros={filtros} agregarFiltros={agregarFiltros} />
    </div>
  );
};

const BotonFiltros = ({ filtros, agregarFiltros, limpiarFiltros }) => {
  const { empresas, setFilteredOptions } = useEmpresas();
  const [mostrarModal, setMostarModal] = useState(false);
  const [contadorFiltros, setCondatorFiltros] = useState(0);

  const tiposCanchas = [
    "Futbol 5",
    "Futbol 6",
    "Futbol 7",
    "Futbol 9",
    "Futbol 11",
  ];

  const servicios = ["baños", "tienda", "parqueadero", "wifi", "restaurante"];
  const cerrarModal = () => {
    enviarFiltros();
    setMostarModal(false);
  };

  const abrirModal = () => {
    setMostarModal(true);
  };

  const contadorDeFiltros = () => {
    const cantidad = filtros.tiposCanchas.length + filtros.servicios.length;
    setCondatorFiltros(cantidad);
  };

  const enviarFiltros = () => {
    setFilteredOptions(
      empresas.filter(
        (empresa) =>
          filtros.tiposCanchas.every((tipo) =>
            empresa.tipoCanchas.includes(tipo)
          ) &&
          filtros.servicios.every((tipo) => empresa.servicios.includes(tipo))
      )
    );
    contadorDeFiltros();
  };

  return (
    <>
      <button
        onClick={abrirModal}
        className="relative w-12 lg:w-24 cursor-pointer flex shadow-md py-2 justify-center border border-gray-300 rounded-md  hover:bg-gray-200 transition-all duration-300 ease-in-out"
      >
        {contadorFiltros > 0 && <div className="absolute w-5 h-5 rounded-full bg-red-500 right-0 bottom-0 translate-2">
          <p className="text-sm">{contadorFiltros}</p>
        </div>}
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
      {mostrarModal && (
        <div
          onClick={cerrarModal}
          className="absolute h-screen inset-0 bg-[#00000080] top-0 left-0 z-50 flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[600px]  bg-white rounded-2xl p-8"
          >
            <div className="flex justify-end pr-4">
              <img
                onClick={cerrarModal}
                className="cursor-pointer"
                src={close}
                alt="icono de cerrar"
                width={40}
              />
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-center text-2xl font-bold">FILTROS</p>
              <div>
                {" "}
                <p>Tipos de canchas</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  {tiposCanchas.map((tipoCancha) => (
                    <p
                      onClick={() => agregarFiltros("tiposCanchas", tipoCancha)}
                      className={`border-2 border-green-300 rounded-2xl px-2 cursor-pointer hover:bg-green-300 text-sm ${
                        filtros.tiposCanchas.includes(tipoCancha) &&
                        "bg-green-400"
                      }`}
                    >
                      {tipoCancha}
                    </p>
                  ))}
                </div>
              </div>
              <div className="h-[2px] bg-gray-200"></div>
              <div>
                {" "}
                <p>Servicios</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  {servicios.map((servicio) => (
                    <div
                      onClick={() => agregarFiltros("servicios", servicio)}
                      className={`border-2 border-green-300 rounded-2xl cursor-pointer hover:bg-green-300 flex px-2 text-sm ${
                        filtros.servicios.includes(servicio) && "bg-green-400"
                      }`}
                    >
                      <p>{servicio}</p>
                      <span>{iconosServicios[servicio]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center gap-4">
                <p
                  onClick={limpiarFiltros}
                  className="underline cursor-pointer"
                >
                  Limpiar Filtros
                </p>
                <button
                  onClick={() => {
                    enviarFiltros();
                    cerrarModal();
                  }}
                  className=" bg-green-400 px-8 py-2 rounded-2xl hover:bg-green-300 cursor-pointer text-xl"
                >
                  Filtrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const BarraBusqueda = ({ filtros, agregarFiltros }) => {
  const { empresas, filteredOptions, setFilteredOptions } = useEmpresas();

  const [query, setQuery] = useState("");

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    let filtered = [];
    setQuery(value);

    if (filtros.servicios.length > 0 || filtros.tiposCanchas.length > 0) {
      filtered = empresas.filter(
        (empresa) =>
          filtros.tiposCanchas.every((tipo) =>
            empresa.tipoCanchas.includes(tipo)
          ) &&
          filtros.servicios.every((tipo) => empresa.servicios.includes(tipo)) &&
          removeAccents(empresa?.nombre)
            .toLowerCase()
            .includes(removeAccents(value).toLowerCase())
      );
    } else {
      filtered = empresas?.filter((empresa) =>
        removeAccents(empresa?.nombre)
          .toLowerCase()
          .includes(removeAccents(value).toLowerCase())
      );
    }

    agregarFiltros();
    setFilteredOptions(filtered);
  };

  return (
    <div className="relative w-full lg:w-[500px]">
      {/* Input de búsqueda */}
      <form className="flex rounded-full relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Busca alguna cancha que conozcas..."
          className="w-full pl-4 pr-10 lg:pl-10 lg:pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <img className="absolute right-4 top-3" src={iconSearch} alt="Buscar" />
      </form>

      {/* Lista de resultados */}
      {query.length > 0 && (
        <ul className="absolute w-full bg-white shadow-md rounded-lg mt-2 z-10">
          {filteredOptions?.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BarraBusqueda;
