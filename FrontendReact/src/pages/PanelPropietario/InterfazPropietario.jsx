import React, { useState, useEffect } from 'react';
import Modal from '../Perfil/Modal';
import LogPopUp from "../Login/components/logPopUp";
import { canchasServicio, empresaServicio, propietarioServicio } from '../../services/api';
import ModificarCancha from './Componentes/ModificarCancha';
import CardSkeleton from './Componentes/cardskeleton';
import { useNavigate } from 'react-router-dom'; 
import { StarIcon } from '../../assets/IconosSVG/iconos';
import HeaderPropietario from './Componentes/HeaderPropietario';

const InterfazPropietario = () => {
  // Estado para controlar la visibilidad del modal de modificar cancha
  const [modalModificarVisible, setModalModificarVisible] = useState(false);
  const [canchaParaModificar, setCanchaParaModificar] = useState(null);
  
  const [modalEliminar, setModalEliminar] = useState(false);
  const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [textoPopUp, setTextoPopUp] = useState({ titulo: "", subtitulo: "" });
  const [listaCanchas, setListaCanchas] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  const [tiposCanchas, setTiposCanchas] = useState([]);
  const [estadoCanchas, setEstadoCanchas] = useState([]);
  const [DatosEmpresa, setDatosEmpresa] = useState ([])
  const [datosPropietario, setDatosPropietario] = useState({})
  const [datosListos, setDatosListos] = useState(false);

  useEffect(() => {
    // Función para cargar todos los datos necesarios
    const cargarDatos = async () => {
      try {
        // Realizar todas las peticiones en paralelo
        const [canchasResponse, tiposResponse, estadosResponse, EmpresaReponse, propietarioResponse] = await Promise.all([
          canchasServicio.obtenerTodosEmpresa('987654321'),
          canchasServicio.tiposCanchas(),
          canchasServicio.estadoCanchas(),
          empresaServicio.obtenerPorId('987654321'),
          propietarioServicio.obtenerPorEmpresa('987654321'),
        ]);
        
        // Procesar los resultados
        setListaCanchas(canchasResponse.data.data);
        
        if (tiposResponse.data.success && tiposResponse.data.data.tipos) {
          setTiposCanchas(tiposResponse.data.data.tipos);
        }
        
        if (estadosResponse.data.success && estadosResponse.data.data.estados) {
          setEstadoCanchas(estadosResponse.data.data.estados);
        }
        
        if (EmpresaReponse.data.success && EmpresaReponse.data.data) {
          setDatosEmpresa(EmpresaReponse.data.data);
        }
        
        if (propietarioResponse.data.success && propietarioResponse.data.data) {
          setDatosPropietario(propietarioResponse.data.data);
        }
        
        console.log("Datos de empresa:", EmpresaReponse.data);
        setDatosListos(true);
        setCargando(false);
      } catch (error) {
        
        console.error("Error al cargar los datos:", error);
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  // Función para abrir el modal de modificar y pasar la cancha seleccionada
  const abrirModalModificar = (cancha) => {
    setCanchaParaModificar(cancha);
    setModalModificarVisible(true);
  };

  // Función para cerrar el modal de modificar
  const cerrarModalModificar = () => {
    setModalModificarVisible(false);
    setCanchaParaModificar(null);
  };

  // Función para guardar los cambios de la cancha modificada
  const guardarCambiosCancha = (datosModificados) => {
    // Actualizar la cancha en la lista
    const canchasActualizadas = listaCanchas.map(cancha => 
      cancha.id === canchaParaModificar.id 
        ? {
            ...cancha,
            nombre: datosModificados.nombre,
            tipo: datosModificados.id_tipo_cancha,
            estado: datosModificados.id_estado_cancha,
            precio: datosModificados.precio,
            imagen: datosModificados.imagen
          } 
        : cancha
    );
    
    setListaCanchas(canchasActualizadas);
    

  };

  const navigate = useNavigate(); 

  const AgregarCancha = () => {
    navigate('/formulario-canchas'); 
  };

  const mostrarModalEliminar = (id) => {
    setCanchaSeleccionada(id);
    setModalEliminar(true);
  };

  const eliminarCancha = async () => {
    const canchasActualizadas = listaCanchas.filter((cancha) => cancha.id_cancha !== canchaSeleccionada);
    await canchasServicio.eliminar(canchaSeleccionada);
    setListaCanchas(canchasActualizadas);
    setModalEliminar(false);
    setTextoPopUp({
      titulo: "Se elimino exitosamente",
      subtitulo: "La cancha se elimino con exito",
    });
    setMostrarPopUp(true);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50 overflow-x-hidden">
      <HeaderPropietario empresa={DatosEmpresa} propietario={datosPropietario} />
        
      <div className="w-full max-w-5xl mx-auto py-3 sm:py-5 px-3 sm:px-0">
        <div className="canchas_container flex-grow px-10 md:px-6">
          <h2 className="text-3xl sm:text-lg font-bold mb-3 sm:mb-4 pb-2 sm:pb-2.5 font-sans">Tus canchas</h2>

          {cargando ? (
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
              <CardSkeleton count={6} />
            </div>
          ) : listaCanchas?.length === 0 ? (
            <p className="text-center text-black text-xl sm:text-2xl p-3 sm:p-5">No tienes ninguna cancha registrada</p>
          ) : (
            <div className="flex  justify-center sm:justify-start gap-3 sm:gap-4 flex-col ">
              {listaCanchas?.map((cancha) => (
                <div key={cancha.id} className="flex bg-[#fdfdfd] rounded-xl shadow-md overflow-hidden">
                  <div className="flex justify-between rounn items-start bg-amber-200 w-90">
                    <div className="w-full">
                      <img
                        className="w-full h-48 object-cover rounded-t-xl"
                        src={cancha.imagen}
                        alt={cancha.nombre}
                      />
                    </div>
                  </div>
                  <div className=''>
                    <div className="flex justify-between items-center px-2.5 pb-5">
                    <h3 className="text-lg">{cancha.nombre}</h3>
                    <div className="flex items-center mt-1 bg-amber-100 px-3 py-1 rounded-lg text-xs">
                      <StarIcon />
                      <span className="ml-1 font-bold">4.4</span>
                    </div>
                  </div>
                  <div className="flex gap-5 px-2.5 pb-2.5">
                    <button 
                      className="flex-1 px-2 sm:px-3.5 py-1.5 bg-[#04c707] text-white rounded-md text-sm cursor-pointer border-none"
                      onClick={() => abrirModalModificar(cancha)}
                    >
                      Modificar
                    </button>
                    <button
                      className="flex-1 px-2 sm:px-3.5 py-1.5 bg-[#e63939] text-white rounded-md text-sm cursor-pointer border-none"
                      onClick={() => mostrarModalEliminar(cancha.id_cancha)}
                    >
                      Eliminar
                    </button>
                  </div>
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
      
      {/* Componente de ModificarCancha con las props correctas */}
      {datosListos && modalModificarVisible && (
        <ModificarCancha 
          isOpen={modalModificarVisible}
          onClose={cerrarModalModificar}
          onConfirm={guardarCambiosCancha}
          infoCancha={canchaParaModificar}
          tiposCanchas={tiposCanchas}
          estadoCanchas={estadoCanchas}
        />
      )}
      
    </div>
  );
};

export default InterfazPropietario;