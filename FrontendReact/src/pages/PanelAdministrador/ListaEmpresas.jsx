import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { empresaServicio } from '../../services/api'
import Loading from "../Login/components/Loading";

function ListaEmpresas() {
  const navigate = useNavigate();
  const [vistaActiva, setVistaActiva] = useState('empresas');
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalEliminar, setModalEliminar] = useState({
    mostrar: false,
    empresa: null
  });
  const [eliminando, setEliminando] = useState(false);
  // Estados para el filtro
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [mostrarDropdownFiltro, setMostrarDropdownFiltro] = useState(false);
  // Agregar estado para búsqueda
  const [busqueda, setBusqueda] = useState('');

  // Cargar empresas desde el backend
  useEffect(() => {
    const cargarEmpresas = async () => {
      try {
        setLoading(true);
        const response = await empresaServicio.obtenerTodos();
        console.log("info", response);

        // Mapear los datos del backend al formato esperado por el componente
        // En la función cargarEmpresas, actualizar el mapeo de datos:
        const empresasFormateadas = response.data.data.map(empresa => ({
          id: empresa.NIT,
          logo: empresa.logo?.url || empresa.logo?.[0]?.url || "https://via.placeholder.com/40",
          cancha: empresa.nombre,
          NIT: empresa.NIT,
          Correo: empresa.propietario?.user?.email || 'No disponible',
          propietario: {
            nombre: empresa.propietario?.nombre || 'No disponible',
            apellido: empresa.propietario?.apellido || 'No disponible',
            telefono: empresa.propietario?.telefono || 'No disponible',
            email: empresa.propietario?.user?.email || 'No disponible',
            tipoDocumento: empresa.propietario?.tipo_documento_id || 'No disponible',
            numeroDocumento: empresa.propietario?.numero_documento || 'No disponible'
          },
          status: mapearEstadoEmpresa(empresa.id_estado_empresa)
        }));
        
        setEmpresas(empresasFormateadas);
      } catch (error) {
        console.error('Error al cargar empresas:', error);
        setError('Error al cargar las empresas');
      } finally {
        setLoading(false);
      }
    };

    cargarEmpresas();
  }, []);

  // Mapear estados del backend a estados del frontend
  const mapearEstadoEmpresa = (estadoBackend) => {
    switch(estadoBackend) {
      case 'activo':
        return 'active';
      case 'inactivo':
        return 'inactive';
      case 'pendiente':
        return 'pending';
      default:
        return 'pending';
    }
  };

  // Mapear estados del frontend al backend
  const mapearEstadoBackend = (estadoFrontend) => {
    switch(estadoFrontend) {
      case 'active':
        return 'activo';
      case 'inactive':
        return 'inactivo';
      case 'pending':
        return 'pendiente';
      default:
        return 'pendiente';
    }
  };

  const getStatusInfo = (status) => {
    switch(status) {
      case 'active':
        return {
          text: 'Activo',
          style: 'bg-green-100 text-green-800'
        };
      case 'inactive':
        return {
          text: 'Inactivo',
          style: 'bg-red-100 text-red-800'
        };
      case 'pending':
        return {
          text: 'En Proceso',
          style: 'bg-yellow-100 text-yellow-800'
        };
      default:
        return {
          text: 'Desconocido',
          style: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const getFilteredEmpresas = () => {
    let empresasFiltradas;
    
    if (vistaActiva === 'empresas') {
      empresasFiltradas = empresas.filter(empresa => empresa.status === 'active' || empresa.status === 'inactive');
    } else {
      empresasFiltradas = empresas.filter(empresa => empresa.status === 'pending');
    }
    
    // Aplicar filtro por estado solo en la vista de empresas
    if (vistaActiva === 'empresas' && filtroEstado !== 'todos') {
      empresasFiltradas = empresasFiltradas.filter(empresa => empresa.status === filtroEstado);
    }
    
    // Aplicar filtro de búsqueda por nombre o NIT
    if (busqueda.trim() !== '') {
      empresasFiltradas = empresasFiltradas.filter(empresa =>
        empresa.cancha.toLowerCase().includes(busqueda.toLowerCase()) ||
        empresa.NIT.toString().includes(busqueda)
      );
    }
    
    return empresasFiltradas;
  };

  // Función para obtener el texto del filtro
  const obtenerTextoFiltro = () => {
    switch(filtroEstado) {
      case 'active':
        return 'Filtro: Activos';
      case 'inactive':
        return 'Filtro: Inactivos';
      case 'todos':
      default:
        return 'Filtro: Todos';
    }
  };

  // Función para manejar el cambio de filtro
  const handleFiltroEstado = (estado) => {
    setFiltroEstado(estado);
    setMostrarDropdownFiltro(false);
  };

  // Efecto para cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mostrarDropdownFiltro && !event.target.closest('.relative')) {
        setMostrarDropdownFiltro(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mostrarDropdownFiltro]);

  const manejarEdicion = (nit) => {
    navigate(`/admin/empresas/${nit}/editar`);
  };

  // Agregar después de los otros useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mostrarDropdownFiltro && !event.target.closest('.relative')) {
        setMostrarDropdownFiltro(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mostrarDropdownFiltro]);

  
  const cambiarEstadoEmpresa = async (nit, nuevoEstado) => {
    try {
      const estadoBackend = mapearEstadoBackend(nuevoEstado);
      
      // Actualizar en el backend
      await empresaServicio.actualizar(nit, {
        id_estado_empresa: estadoBackend
      });
      
      // Actualizar en el estado local
      setEmpresas(empresas.map(empresa => 
        empresa.NIT === nit ? { ...empresa, status: nuevoEstado } : empresa
      ));
      
      console.log(`Estado de empresa ${nit} cambiado a ${nuevoEstado}`);
    } catch (error) {
      console.error('Error al cambiar estado de empresa:', error);
      setError('Error al cambiar el estado de la empresa');
    }
  };

  const abrirModalEliminar = (empresa) => {
    setModalEliminar({
      mostrar: true,
      empresa: empresa
    });
  };

  const confirmarEliminacion = async () => {
    if (!modalEliminar.empresa) return;
    
    try {
      setEliminando(true);
      await empresaServicio.eliminar(modalEliminar.empresa.NIT);
      
      // Actualizar el estado local removiendo la empresa eliminada
      setEmpresas(empresas.filter(empresa => empresa.NIT !== modalEliminar.empresa.NIT));
      
      // Cerrar modal
      setModalEliminar({ mostrar: false, empresa: null });
      
      console.log(`Empresa ${modalEliminar.empresa.NIT} eliminada correctamente`);
    } catch (error) {
      console.error('Error al eliminar empresa:', error);
      setError('Error al eliminar la empresa');
    } finally {
      setEliminando(false);
    }
  };
  
  const cambiarVista = (vista) => {
    setVistaActiva(vista);
  };

  const empresasFiltradas = getFilteredEmpresas();

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-4 pt-4 rounded-lg m-2">
          {/* Botón de Empresas */}
          <button 
            onClick={() => cambiarVista('empresas')} 
            className={`relative px-2.5 py-2 text-xl cursor-pointer transition-colors duration-300 ${vistaActiva === 'empresas' ? 'text-green-700' : 'text-green-400'}`}
          >
            Empresas
            <span 
              className={`absolute bottom-0 left-0 h-0.5 bg-green-500 transition-all duration-300 ${vistaActiva === 'empresas' ? 'w-full' : 'w-0 group-hover:w-full'}`}
            ></span>
          </button>
          
          {/* Botón de Solicitudes */}
          <button 
            onClick={() => cambiarVista('solicitudes')} 
            className={`relative px-2.5 text-xl cursor-pointer transition-colors duration-300 ${vistaActiva === 'solicitudes' ? 'text-green-700' : 'text-green-400'}`}
          >
            Solicitudes
            <span 
              className={`absolute bottom-0 left-0 h-0.5 bg-green-500 transition-all duration-300 ${vistaActiva === 'solicitudes' ? 'w-full' : 'w-0 group-hover:w-full'}`}
            ></span>
          </button>
        </div>
        <div className="text-right text-md text-[#003044]">
          <div>Total {vistaActiva === 'empresas' ? 'Empresas' : 'Solicitudes'}: {empresasFiltradas.length}</div>
        </div>
      </div>

      {/* Contenido condicional según la vista activa */}
      {vistaActiva === 'empresas' ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="pl-4 text-xl font-semibold text-green-500">Empresas Registradas</h2>
            <div className="flex space-x-4 items-center">
              {/* Campo de búsqueda */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar por nombre o NIT"
                  className="pl-10 pr-4 py-2 border border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Filtro existente */}
              <div className="relative">
                <button 
                  className={`border border-green-400 text-green-500 px-4 py-2 rounded-md flex items-center transition-all duration-200 hover:bg-green-50 ${
                    filtroEstado !== 'todos' ? 'bg-green-50 border-green-600' : ''
                  }`}
                  onClick={() => setMostrarDropdownFiltro(!mostrarDropdownFiltro)}
                >
                  <span className="mr-2 cursor-pointer font-medium">
                    {obtenerTextoFiltro()}
                  </span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 transition-transform duration-200 ${
                      mostrarDropdownFiltro ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown del filtro */}
                {mostrarDropdownFiltro && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="py-1">
                      <button
                        onClick={() => handleFiltroEstado('todos')}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                          filtroEstado === 'todos' ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'
                        }`}
                      >
                        Todos los estados
                      </button>
                      <button
                        onClick={() => handleFiltroEstado('active')}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                          filtroEstado === 'active' ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'
                        }`}
                      >
                        Solo Activos
                      </button>
                      <button
                        onClick={() => handleFiltroEstado('inactive')}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                          filtroEstado === 'inactive' ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'
                        }`}
                      >
                        Solo Inactivos
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl">
              <thead>
                <tr className="text-left text-[#003044]">
                  <th className="py-3 px-4 w-16">Logo</th>
                  <th className="py-3 px-4">Empresa</th>
                  <th className="py-3 px-4">NIT</th>
                  <th className="py-3 px-4">Correo</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Operaciones</th>
                  <th className="py-3 px-4">Acción</th>
                </tr>
              </thead> 
              <tbody>
                {empresasFiltradas.map((empresa) => (
                  <tr key={empresa.NIT}>
                    <td className="py-3 px-4">
                      <img src={empresa.logo} alt={empresa.cancha} className="w-10 h-10 rounded-md object-cover" />
                    </td>
                    <td className="py-3 px-4 font-medium text-[#003044]">{empresa.cancha}</td>
                    <td className="py-3 px-4 text-[#003044]">{empresa.NIT}</td>
                    <td className="py-3 px-4 text-[#003044]">
                      <td>
                        {empresa.propietario.email}
                      </td>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusInfo(empresa.status).style}`}>
                        {getStatusInfo(empresa.status).text}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2 pl-2 justify-left">
                        <button 
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => navigate(`/admin/empresas/${empresa.NIT}/ver`)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-800"
                          onClick={() => manejarEdicion(empresa.NIT)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800"
                          onClick={() => abrirModalEliminar(empresa)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button 
                        onClick={() => cambiarEstadoEmpresa(empresa.NIT, empresa.status === 'active' ? 'inactive' : 'active')}
                        className={`px-3 py-1 rounded-md text-sm ${empresa.status === 'active' ? 'bg-red-500 text-white' : 'bg-green-500 text-white' }`}
                      >
                        {empresa.status === 'active' ? 'Banear' : 'Activar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="pl-4 text-xl font-semibold text-green-500">Solicitudes Pendientes</h2>
            <div className="flex space-x-4">
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl">
              <thead>
                <tr className="text-left text-[#003044]">
                  <th className="py-3 px-4 w-16">Logo</th>
                  <th className="py-3 px-4">Cancha</th>
                  <th className="py-3 px-4">NIT</th>
                  <th className="py-3 px-4">Correo</th>
                  <th className="py-3 px-4 pl-6">Estado</th>
                  <th className="py-3 px-4">Operaciones</th>
                  <th className="py-3 px-4 pl-16">Acción</th>
                </tr>
              </thead> 
              <tbody>
                {empresasFiltradas.map((empresa) => (
                  <tr key={empresa.NIT}>
                    <td className="py-3 px-4">
                      <img src={empresa.logo} alt={empresa.cancha} className="w-10 h-10 rounded-md object-cover" />
                    </td>
                    <td className="py-3 px-4 font-medium text-[#003044]">{empresa.cancha}</td>
                    <td className="py-3 px-4 text-[#003044]">{empresa.NIT}</td>
                    <td className="py-3 px-4 text-[#003044]">{empresa.propietario.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusInfo(empresa.status).style}`}>
                        {getStatusInfo(empresa.status).text}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2 pl-6 justify-left">
                        <button className="text-blue-600 hover:text-blue-800"
                        onClick={() => navigate(`/admin/empresas/${empresa.NIT}/ver`)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="text-red-600 hover:text-red-800"
                          onClick={() => abrirModalEliminar(empresa)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="flex space-x-2 pl-2 justify-left py-3 ">
                      <button 
                        onClick={() => cambiarEstadoEmpresa(empresa.NIT, 'active')}
                        className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 transition-colors cursor-pointer"
                      >
                        Aprobar
                      </button>
                      <button 
                        onClick={() => cambiarEstadoEmpresa(empresa.NIT, 'inactive')}
                        className='bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors cursor-pointer'
                      >
                        Rechazar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {/* Modal de confirmación para eliminar */}
      {modalEliminar.mostrar && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Confirmar eliminación
                </h3>
                <p className="text-sm text-gray-500">
                  Esta acción no se puede deshacer
                </p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-700">
                ¿Estás seguro de que deseas eliminar la empresa <strong>{modalEliminar.empresa?.cancha}</strong> con NIT <strong>{modalEliminar.empresa?.NIT}</strong>?
              </p>
              <p className="text-xs text-red-600 mt-2">
                Se eliminarán todos los datos asociados incluyendo canchas, reservas y reseñas.
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setModalEliminar({ mostrar: false, empresa: null })}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminacion}
                disabled={eliminando}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {eliminando ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListaEmpresas;
