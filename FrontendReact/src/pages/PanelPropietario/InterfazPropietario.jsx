import React, { useState } from 'react';
import cancha2 from '../../../src/assets/Inicio/Cancha2.jpeg';
import Modal from '../Perfil/Modal';
import LogPopUp from "../Login/components/logPopUp";

const InterfazPropietario = () => {

  const [modalEliminar, setModalEliminar] = useState(false);
  const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);

  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [textoPopUp, setTextoPopUp] = useState({ titulo: "", subtitulo: "" });



  const [listaCanchas, setListaCanchas] = useState([
    {
      id: 1,
      nombre: 'Futbol 7',
      image: cancha2,
      rating: 4.8,
    },
    {
      id: 2,
      nombre: 'Futbol 5',
      image: cancha2,
      rating: 4.8,
    },
    {
      id: 3,
      nombre: 'Futbol 5',
      image: cancha2,
      rating: 4.8,
    },
    {
      id: 4,
      nombre: 'Futbol 5',
      image: cancha2,
      rating: 4.8,
    },
    {
      id: 5,
      nombre: 'Futbol 5',
      image: cancha2,
      rating: 4.8,
    },
    {
      id: 6,
      nombre: 'Futbol 5',
      image: cancha2,
      rating: 4.8,
    }
  ]);
  
  const AgregarCancha = () => {
    console.log('Agregar cancha');
  };

 const mostrarModalEliminar = (id) => {
    setCanchaSeleccionada(id);
    setModalEliminar(true);
  };

  const eliminarCancha = () => {
    const canchasActualizadas = listaCanchas.filter((cancha) => cancha.id !== canchaSeleccionada);
    setListaCanchas(canchasActualizadas);
    setModalEliminar(false);
    setTextoPopUp({
      titulo: "Se elimino exitosamente",
      subtitulo: "La cancha se elimino con exito",
    });
    setMostrarPopUp(true);
  };

  const ModificarCancha = () => {
    console.log(`Modificar cancha`);
  };

  return (
    <div className="min-h-screen w-full bg-white overflow-x-hidden">
      <nav className="bg-[#003950] shadow-lg p-2 sm:p-4">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-[4px]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative">
                <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-green-500 flex items-center justify-center border-2 sm:border-4 border-white">
                  <span className="text-white text-3xl sm:text-5xl font-bold"></span>
                </div>
              </div>
              <div className="text-white text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold">Canchas La 64</h2>
                <p className="text-lg sm:text-xl font-sans">James Diaz</p>
              </div>
            </div>
            
            <div className="relative mt-2 sm:mt-0">
              <button 
                onClick={AgregarCancha}
                className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-[#39de02] text-black rounded-lg hover:bg-green-400 transition-colors text-sm sm:text-base"
              >
                <span className="mr-1">+</span>
                Agregar canchas
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="w-full max-w-5xl mx-auto py-3 sm:py-5 px-3 sm:px-0">
        <div className="canchas_container flex-grow px-2 sm:px-5">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 sm:pb-2.5 border-b-2 border-gray-200">Tus canchas</h2>

          {listaCanchas.length === 0 ? (
            <p className="text-center text-black text-xl sm:text-2xl p-3 sm:p-5">No tienes ninguna cancha registrada</p>
          ) : (
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
              {listaCanchas.map((cancha) => (
                <div key={cancha.id} className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-14px)] lg:w-[255px] bg-[#f2f2f2] rounded-xl shadow-md overflow-hidden">
                  <div className="flex flex-col justify-between items-start mb-2 sm:mb-4">
                    <div className="w-full">
                      <img
                        className="w-full h-48 object-cover rounded-t-xl"
                        src={cancha.image}
                        alt={cancha.nombre}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-2.5 pb-2.5">
                    <h3 className="font-bold">{cancha.nombre}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span>{cancha.rating}</span>
                    </div>
                  </div>
                  <div className="flex gap-2.5 px-2.5 pb-2.5">
                    <button className="flex-1 px-2 sm:px-3.5 py-1.5 bg-[#04c707] text-white rounded text-sm cursor-pointer border-none"
                      onClick={() => ModificarCancha(cancha.id)} >
                      
                      Modificar
                    </button>
                    <button
                      className="flex-1 px-2 sm:px-3.5 py-1.5 bg-[#e63939] text-white rounded text-sm cursor-pointer border-none"
                      onClick={() => mostrarModalEliminar(cancha.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {modalEliminar && (
        <Modal
          titulo="¿Estás seguro de eliminar esta cancha?"
          subtitulo="Esta acción es irreversible y eliminará permanentemente todos los datos relacionados con esta cancha."
          cerrarModal={() => setModalEliminar(false)}
          funcionEjecutar={eliminarCancha}
          tipo="eliminar"
        />
      )}
      {mostrarPopUp && (
          <LogPopUp
            setShowPopUp={setMostrarPopUp}
            message={textoPopUp.titulo}
            subText={textoPopUp.subtitulo}
            onClose={() => {}}
          />
        )}
    </div>
  );
};

export default InterfazPropietario;
