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
    <div className="flex gap-1 px-1 lg:gap-6 w-full justify-center items-center pt-4 lg:pt-0 ">
      <BotonFiltros
        filtros={filtros}
        agregarFiltros={agregarFiltros}
        limpiarFiltros={limpiarFiltros}/>
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
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const filteredEmpresas = empresas.filter((empresa) => {
      
      const tiposCanchasMatch = filtros.tiposCanchas.length === 0 || 
        filtros.tiposCanchas.every((tipo) => 
          empresa.tiposCanchas && empresa.tiposCanchas.includes(tipo)
        );
      
      const serviciosMatch = filtros.servicios.length === 0 || 
        filtros.servicios.every((servicio) => {
          return empresa.servicios && 
            empresa.servicios.some(s => {
              if (!s.tipo) return false;
              // Normalize both strings to ignore accents and case
              const normalizedServicio = removeAccents(servicio.toLowerCase());
              const normalizedTipo = removeAccents(s.tipo.toLowerCase());
              return normalizedTipo === normalizedServicio;
            });
        });
      
      return tiposCanchasMatch && serviciosMatch;
    });
    
    setFilteredOptions(filteredEmpresas);
    contadorDeFiltros();
  };

  return (
    <>
      <button
        onClick={abrirModal}
        className="relative bg-[#f6f6f6] w-11 lg:w-20 h-7 cursor-pointer flex shadow-md  justify-center border border-gray-300 rounded-md  hover:bg-gray-300 transition-all duration-300 ease-in-out items-center"
      >
        {contadorFiltros > 0 && (
          <div className="absolute w-5 h-5 rounded-full bg-red-500 right-0 bottom-0 flex items-center justify-center">
            <p className="text-sm text-white">{contadorFiltros}</p>
          </div>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 pr-1"
        >
          {/* SVG path */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>

        <span className="hidden lg:block text-[16px]" >Filtros</span>
      </button>
      {mostrarModal && (
        <div
          onClick={cerrarModal}
          className="absolute h-screen inset-0 bg-[#00000080] top-0 left-0 z-50 flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[600px] max-h-[95vh] bg-white rounded-2xl shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl py-3 font-bold text-[#003044] px-8">FILTROS</h2>
              <button
                onClick={cerrarModal}
                className="p-2 mr-3 hover:bg-red-400 rounded-full transition-colors duration-200 cursor-pointer"
              >
                <img src={close} alt="icono de cerrar" width={30} height={30} />
              </button>
            </div>

            {/* Make only this section scrollable */}
            <div className="space-y-4 overflow-y-auto pr-2 flex-1 px-8 max-h-[60vh]">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Tipos de canchas</h3>
                <div className="flex flex-wrap gap-3">
                  {tiposCanchas.map((tipoCancha) => (
                    <button
                      key={tipoCancha}
                      onClick={() => agregarFiltros("tiposCanchas", tipoCancha)}
                      className={`px-4 py-2 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                        filtros.tiposCanchas.includes(tipoCancha)
                          ? 'border-[#00c951] bg-[#00c951] text-white'
                          : 'border-gray-300 hover:border-[#00c951] hover:bg-[#00c95110]'
                      }`}
                    >
                      {tipoCancha}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-px bg-gray-200"/>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Servicios disponibles</h3>
                <div className="flex flex-wrap gap-3">
                  {Object.keys(iconosServicios).map((servicio) => {
                    const IconComponent = iconosServicios[servicio];
                    return (
                      <button
                        key={servicio}
                        onClick={() => agregarFiltros("servicios", servicio)}
                        className={`px-4 py-2 rounded-full border-2 transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                          filtros.servicios.includes(servicio)
                            ? 'border-[#00c951] bg-[#00c95110] text-gray-700'
                            : 'border-gray-300 hover:border-[#00c951] hover:bg-[#00c95110]'
                        }`}
                      >
                        <span className="text-gray-700">
                          {IconComponent && <IconComponent className="w-5 h-5" />}
                        </span>
                        <span className="capitalize">{servicio}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            
            <div className="flex justify-end items-center px-8 py-3 bg-white rounded-b-2xl gap-2">
              <button
                onClick={limpiarFiltros}
                className="text-gray-600 hover:text-[#003044] px-5 py-2 rounded-full hover:bg-indigo-50 font-medium transition-colors duration-200 cursor-pointer"
              >
                Limpiar filtros
              </button>
              <button
                onClick={() => {
                  enviarFiltros();
                  cerrarModal();
                }}
                className="bg-[#00c951] hover:bg-[#00a844] text-white px-5 py-2 rounded-full transition-all duration-200 font-semibold shadow-lg hover:shadow-xl cursor-pointer"
              >
                Aplicar filtros
              </button>
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
const BarraBusqueda = ({ filtros, agregarFiltros }) => {
  const { empresas, setFilteredOptions } = useEmpresas();
  const [query, setQuery] = useState("");

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    let filtered = empresas.filter((empresa) => {
      const nombreEmpresa = removeAccents(empresa?.nombre || "").toLowerCase();
      const nombreMatch = nombreEmpresa.includes(removeAccents(value.toLowerCase()));

      const tiposCanchasMatch =
        filtros.tiposCanchas.length === 0 ||
        (empresa.tiposCanchas &&
          filtros.tiposCanchas.every((tipo) => empresa.tiposCanchas.includes(tipo)));

      const serviciosMatch =
        filtros.servicios.length === 0 ||
        (empresa.servicios &&
          filtros.servicios.every((servicio) =>
            empresa.servicios.some((s) => {
              if (!s.tipo) return false;
              return removeAccents(s.tipo.toLowerCase()) === removeAccents(servicio.toLowerCase());
            })
          ));

      return nombreMatch && tiposCanchasMatch && serviciosMatch;
    });

    setFilteredOptions(filtered);
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Buscar empresa"
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00c951]"
        />
        <img
          src={iconSearch}
          alt="Buscar"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        />
      </div>
    </div>
  );
};

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
    <div className="relative w-full lg:w-[400px]">
      {/* Input de búsqueda */}
      <form className="flex rounded-full relative items-center">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Busca alguna cancha que conozcas..."
          className="bg-[#f6f6f6] w-full pl-4 pr-10 lg:pl-7 lg:pr-4 py-1 text-[17px] border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <img className="absolute right-6 cursor-pointer " src={iconSearch} alt="Buscar" />
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