import React, { useState, useEffect } from 'react'
import { usuarioServicio } from '../../services/api';
import { useAuth } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Loading from '../Login/components/Loading';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { user, obtenerRol } = useAuth();
  const navigate = useNavigate();
  const [modalVer, setModalVer] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
  });

  useEffect(() => {
    setUsuariosFiltrados(
      usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        usuario.apellido.toLowerCase().includes(busqueda.toLowerCase())
      )
    );
  }, [busqueda, usuarios]);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const response = await usuarioServicio.obtenerTodos();
        setUsuarios(response.data.data || []);
        setError(null);
      } catch (err) {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError('Error al cargar los usuarios');
        }
        console.error('Error:', err);
      } finally {
        setCargando(false);
      }
    };

    cargarUsuarios();
  }, [user, navigate]);

  const handleVerUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalVer(true);
  };

  const handleEditarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setFormData({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      telefono: usuario.telefono,
      email: usuario.email,
    });
    setModalEditar(true);
  };

  const handleEliminarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalEliminar(true);
  };

  const handleGuardarEdicion = async (e) => {
    e.preventDefault();
    try {
      await usuarioServicio.actualizar(usuarioSeleccionado.id, formData);
      const response = await usuarioServicio.obtenerTodos();
      setUsuarios(response.data.data || []);
      setModalEditar(false);
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  const handleConfirmarEliminar = async () => {
    try {
      console.log('Intentando eliminar usuario:', usuarioSeleccionado.id);
      const response = await usuarioServicio.eliminar(usuarioSeleccionado.id);
      console.log('Respuesta del servidor:', response);
      
      // Solo actualizar la UI si la eliminación fue exitosa
      const nuevaListaUsuarios = await usuarioServicio.obtenerTodos();
      console.log('Nueva lista de usuarios:', nuevaListaUsuarios);
      
      setUsuarios(nuevaListaUsuarios.data.data || []);
      setModalEliminar(false);
      setError(null);
    } catch (error) {
      console.error('Error completo al eliminar:', error);
      setError('Error al eliminar usuario: ' + (error.response?.data?.message || 'Error desconocido'));
      setModalEliminar(false);
    }
  };

  if (cargando) return <Loading/>;
  if (error) return <div className="w-full p-10 text-center text-red-500">{error}</div>;


  return (
    <div className="w-full p-10 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-4 rounded-lg m-2">
          <button className="px-4 py-2 m-2 border-b-2 border-green-400 text-green-700 text-xl">Usuarios</button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="pl-4 text-xl font-semibold text-green-500">Usuarios Registrados: {usuariosFiltrados.length}</h2>
        <div className="flex space-x-4 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Busca un usuario..."
              className="pl-10 pr-4 py-2 mr-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Vista de tabla para desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl">
          <thead>
            <tr className="text-left text-[#003044]">
              <th className="py-3 px-4 w-20">Foto</th>
              <th className="py-3 px-4">Nombre(s)</th>
              <th className="py-3 px-4">Apellido(s)</th>
              <th className="py-3 px-4">Teléfono</th>
              <th className="py-3 px-4">Correo</th>
              <th className="py-3 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => (
              <tr key={usuario.id}>
                <td className="py-3 px-4">
                  <div className="w-10 h-10 rounded-md bg-green-500 flex items-center justify-center text-white font-bold text-lg">
                    {usuario.nombre.charAt(0).toUpperCase()}
                  </div>
                </td>
                <td className="py-3 px-4 font-medium text-[#003044]">{usuario.nombre}</td>
                <td className="py-3 px-4 text-[#003044]">{usuario.apellido}</td>
                <td className="py-3 px-4 text-[#003044]">{usuario.telefono}</td>
                <td className="py-3 px-4 text-[#003044]">{usuario.email}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2 justify-left">
                    <button 
                      className="text-blue-600 hover:text-blue-800 cursor-pointer" 
                      onClick={() => handleVerUsuario(usuario)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button 
                      className="text-green-600 hover:text-green-800 cursor-pointer"
                      onClick={() => handleEditarUsuario(usuario)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      onClick={() => handleEliminarUsuario(usuario)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Modal Ver Usuario */}
      {modalVer && usuarioSeleccionado && (
        <div className="fixed inset-0 bg-[#36363695] bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-5  text-gray-400 hover:text-gray-700 text-3xl cursor-pointer"
              onClick={() => setModalVer(false)}
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Información del Usuario</h3>
            <div className="space-y-3">
              <p><span className="font-semibold">Nombre:</span> {usuarioSeleccionado.nombre}</p>
              <p><span className="font-semibold">Apellido:</span> {usuarioSeleccionado.apellido}</p>
              <p><span className="font-semibold">Teléfono:</span> {usuarioSeleccionado.telefono}</p>
              <p><span className="font-semibold">Email:</span> {usuarioSeleccionado.email}</p>
            </div>

          </div>
        </div>
      )}

      {/* Modal Editar Usuario */}
      {modalEditar && usuarioSeleccionado && (
        <div className="fixed inset-0 bg-[#36363695] bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl cursor-pointer"
              onClick={() => setModalEditar(false)}
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Editar Usuario</h3>
            <form onSubmit={handleGuardarEdicion} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={formData.apellido}
                  onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 cursor-pointer"
                  onClick={() => setModalEditar(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 rounded-md text-white cursor-pointer"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Eliminar Usuario */}
      {modalEliminar && usuarioSeleccionado && (
        <div className="fixed inset-0 bg-[#36363695] bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl cursor-pointer"
              onClick={() => setModalEliminar(false)}
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Eliminar Usuario</h3>
            <p className="mb-4">¿Está seguro que desea eliminar al usuario {usuarioSeleccionado.nombre} {usuarioSeleccionado.apellido}?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 cursor-pointer"
                onClick={() => setModalEliminar(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-500 rounded-md text-white cursor-pointer"
                onClick={handleConfirmarEliminar}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListaUsuarios