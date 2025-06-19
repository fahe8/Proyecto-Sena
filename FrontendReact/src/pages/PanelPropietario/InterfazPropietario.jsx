import React, { useState, useEffect } from 'react';
import Modal from '../Perfil/Modal';
import LogPopUp from "../Login/components/logPopUp";
import { canchasServicio, empresaServicio, propietarioServicio } from '../../services/api';
import ModificarCancha from './Componentes/ModificarCancha';
import CardSkeleton from './Componentes/cardskeleton';
import { Link, useNavigate } from 'react-router-dom'; 
import { StarIcon } from '../../assets/IconosSVG/iconos';
import HeaderPropietario from './Componentes/HeaderPropietario';
import { useAuth } from '../../Provider/AuthProvider';

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

  const {user} = useAuth();
    useEffect(() => {
      if (!user) return;
      const cargarDatos = async () => {
        try {
          const [canchasResponse, tiposResponse, estadosResponse, empresaResponse] = await Promise.all([
            canchasServicio.obtenerTodosEmpresa(user.NIT),
            canchasServicio.tiposCanchas(),
            canchasServicio.estadoCanchas(),
            empresaServicio.obtenerPorId(user.NIT), // <--- Asegúrate de tener este método
          ]);

          setListaCanchas(canchasResponse.data.data);

          if (tiposResponse.data.success && tiposResponse.data.data) {
            setTiposCanchas(tiposResponse.data.data);
          }
          if (estadosResponse.data.success && estadosResponse.data.data) {
            setEstadoCanchas(estadosResponse.data.data);
          }

          if (empresaResponse.data.success && empresaResponse.data.data) {
            setDatosEmpresa(Array.isArray(empresaResponse.data.data) ? empresaResponse.data.data[0] : empresaResponse.data.data);
          }

          setDatosListos(true);
          setCargando(false);
        } catch (error) {
          console.error("Error al cargar los datos:", error);
          setCargando(false);
        }
      };

      cargarDatos();
    }, [user]);


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
    setModalModificarVisible(false);
    setCanchaParaModificar(null);
    
    // Mostrar popup de confirmación
    setTextoPopUp({
      titulo: "Cancha modificada",
      subtitulo: "Cambios guardados correctamente",
    });
    setMostrarPopUp(true);
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
    const canchasActualizadas = listaCanchas.filter((cancha) => cancha.id !== canchaSeleccionada);
    await canchasServicio.eliminar(canchaSeleccionada);
    setListaCanchas(canchasActualizadas);
    setModalEliminar(false);
    setTextoPopUp({
      titulo: "Se elimino exitosamente",
      subtitulo: "La cancha se elimino con exito",
    });
    setMostrarPopUp(true);
  };
console.log("DatosEmpresa:", DatosEmpresa);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50 overflow-x-hidden">
      <HeaderPropietario empresa={DatosEmpresa} propietario={datosPropietario} />
        
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-6 lg:px-20 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Tus canchas</h2>
            <Link 
              to="/formulario-canchas" 
              className="inline-flex items-center gap-2 bg-[#003344] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300"
            >
              <span className="material-icons text-sm">add</span>
              <span className='hidden sm:block'>Agregar cancha</span>
            </Link>
          </div>

          {cargando ? (
            <div className="space-y-4">
              <CardSkeleton count={4} />
            </div>
          ) : listaCanchas?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-lg border border-gray-100">
              <span className="material-icons text-4xl text-gray-300 mb-3">sports_soccer</span>
              <p className="text-gray-600 text-xl font-medium mb-2">No tienes ninguna cancha registrada</p>
              <p className="text-gray-500 text-sm mb-6">Comienza agregando tu primera cancha deportiva</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {listaCanchas?.map((cancha) => (
                <div key={cancha.id} className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200">
                  {/* Sección de imagen */}
                  <div className="w-full md:w-1/3 h-48 relative">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={cancha.imagen.url}
                      alt={cancha.nombre}
                    />
                    {/* Indicador de estado con icono */}
                    <div className="absolute top-0 left-0 w-full flex justify-between p-2">
                      {cancha.id_estado_cancha === "disponible" ? (
                        <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                          <span className="size-3 bg-green-500 rounded-full mr-1"></span>
                          <span>Disponible</span>
                        </div>
                      ) : (
                        <div className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full flex items-center">
                          <span className="size-3 bg-amber-500 rounded-full mr-1"></span>
                          <span>Mantenimiento</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Sección de contenido */}
                  <div className="w-full md:w-2/3 flex flex-col justify-between p-4 md:px-10">
                    {/* Encabezado con nombre */}
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">Nombre: {cancha.nombre}</h3>
                    </div>
                    
                    {/* Información adicional de la cancha */}
                    <div className="text-sm text-gray-600 space-y-3">
                      {/* Información en fila: Tipo y Precio */}
                      <div className="flex flex-wrap gap-4 mt-1">
                        {/* Tipo de cancha con icono */}
                        <div className="flex items-center bg-green-200 px-3 py-1.5 rounded-lg">
                          <span className="material-icons text-green-600 text-sm mr-2">sports_soccer</span>
                          <p className="font-medium">
                            {cancha.tipoCancha && cancha.tipoCancha.tipo ? cancha.tipoCancha.tipo : 
                             (cancha.tipo_cancha_id && tiposCanchas.length > 0 ? 
                              tiposCanchas.find(tipo => tipo.id === cancha.tipo_cancha_id)?.tipo || "Tipo no disponible" : 
                              "Tipo no disponible")}
                          </p>
                        </div>
                        
                        {/* Precio con icono */}
                        {cancha.precio && (
                          <div className="flex items-center bg-green-200 px-3 py-1.5 rounded-lg">
                            <span className="material-icons text-green-600 text-sm mr-2">payments</span>
                            <p className="font-medium text-gray-700">${cancha.precio}/hora</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Botones de acción */}
                    <div className="flex gap-3 mt-4">
                      <button 
                        className="flex-1 px-3 py-2 bg-white border border-green-500 text-green-600 rounded-md text-sm font-medium hover:bg-green-50 transition-colors duration-300 flex items-center justify-center cursor-pointer"
                        onClick={() => abrirModalModificar(cancha)}
                      >
                        <span className="material-icons items-center justify-center text-sm md:mr-1">edit</span>
                        <p className='hidden sm:block'>Modificar</p>
                      </button>
                      <button
                        className="flex-1 px-3 py-2 bg-white border border-red-500 text-red-600 rounded-md text-sm font-medium hover:bg-red-50 transition-colors duration-300 flex items-center justify-center cursor-pointer"
                        onClick={() => mostrarModalEliminar(cancha.id)}
                      >
                        <span className="material-icons text-sm md:mr-1">delete</span>
                        <p className='hidden sm:block'>Eliminar</p>
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