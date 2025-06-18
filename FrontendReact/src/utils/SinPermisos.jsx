import React from 'react';
import { useNavigate } from 'react-router-dom';

const SinPermisos = ({ rolRequerido, loginUrl }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(loginUrl);
  };

  const getRolTexto = (rol) => {
    switch(rol) {
      case 'usuario':
        return 'usuario';
      case 'propietario':
        return 'propietario de empresa';
      case 'admin':
        return 'administrador';
      default:
        return 'usuario autorizado';
    }
  };

  const getLoginTexto = (url) => {
    return url === '/loginEmpresa' ? 'Login de Empresa' : 'Login de Usuario';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-6">
          <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Acceso Denegado
        </h1>
        
        <p className="text-gray-600 mb-6">
          No tienes los permisos necesarios para acceder a esta página. 
          Esta sección está reservada para usuarios con rol de <strong>{getRolTexto(rolRequerido)}</strong>.
        </p>
        
        <button
          onClick={handleRedirect}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Ir a {getLoginTexto(loginUrl)}
        </button>
        
        <button
          onClick={() => navigate('/')}
          className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default SinPermisos;