import React, { useState } from 'react';
import { authServicio } from '../../services/api';
import { useAuth } from '../../Provider/AuthProvider';

export default function IniciarSesionPrev({ setCurrentStep }) {
  const [emailData, setEmailData] = useState({
    email: '',
    password: '',
    role: 'usuario' // Asumiendo que el rol por defecto es 'usuario'
  });
  const [errors, setErrors] = useState({});
  const { guardarToken, setUser, setIsAuthenticated } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Intentar iniciar sesión
      const response = await authServicio.loginUsuario(JSON.stringify({
        email: emailData.email,
        password: emailData.password,
        role: emailData.role
      }));
      console.log(response)
      if (response.data.success) {
        guardarToken(response.data.data.token);
        setUser(response.data.data.usuario);
        setIsAuthenticated(true);
        setCurrentStep(2);
      }
    } catch (error) {
      console.log(error)
      // Manejar errores de autenticación
      if (error.response && error.response.status === 401) {
        // Si las credenciales son inválidas, mostrar un mensaje de error
        setErrors({
          auth: 'Credenciales inválidas'
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#003044]">Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Correo Electrónico</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
            placeholder="correo@ejemplo.com"
            value={emailData.email}
            onChange={(e) => setEmailData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md p-2 text-[14px]"
            placeholder="Ingrese su contraseña"
            value={emailData.password}
            onChange={(e) => setEmailData(prev => ({ ...prev, password: e.target.value }))}
            required
          />
        </div>
        {errors.auth && (
          <p className="text-red-500 text-sm mb-4">{errors.auth}</p>
        )}
        <button
          type="submit"
          className="w-full bg-[#00c951] text-white py-2 rounded-md hover:bg-[#00a844] transition-colors"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}