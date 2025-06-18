import React, { useState } from "react";
import { LetterIcon, KeyIcon, EyeIcon, EyeOffIcon } from "../../../assets/IconosSVG/iconos.jsx";
import { AlertCircle, CheckCircle } from 'lucide-react';

const AuthForm = ({ register, formData, handleChange, handleSubmit, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Función para validar la contraseña
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('Mínimo 8 caracteres');
    if (!/[A-Z]/.test(password)) errors.push('Una letra mayúscula');
    if (!/[a-z]/.test(password)) errors.push('Una letra minúscula');
    if (!/\d/.test(password)) errors.push('Un número');
    
    return errors;
  };

  // Función para determinar la fortaleza de la contraseña
  const getPasswordStrength = (password) => {
    const errors = validatePassword(password);
    if (password.length === 0) return { strength: 0, text: '', color: '' };
    if (errors.length === 0) return { strength: 100, text: 'Muy fuerte', color: 'text-green-600' };
    if (errors.length <= 2) return { strength: 75, text: 'Fuerte', color: 'text-blue-600' };
    if (errors.length <= 3) return { strength: 50, text: 'Media', color: 'text-yellow-600' };
    return { strength: 25, text: 'Débil', color: 'text-red-600' };
  };
  
  const passwordStrength = getPasswordStrength(formData.password);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mb-[20px]">
        <div className="absolute top-[35px] left-[10px] text-[13px] text-[#777] pt-[5px] cursor-pointer">
          <LetterIcon />
        </div>
        <label htmlFor="email" className="block mb-[8px] text-[15px] text-[#555]">
          Correo electrónico
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ingresa tu correo electrónico..."
          className="w-full pl-10 pr-4 py-3 h-[46px] border border-gray-300 rounded-md text-[15px]"
          required
        />
      </div>
      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

      <div className="form-group relative">
        <label htmlFor="password" className="block mb-[8px] text-[15px] text-[#555]">
          Contraseña
        </label>
        <div className="absolute top-[35px] left-[10px] text-[13px] text-[#777] pt-[5px] cursor-pointer">
          <KeyIcon />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Ingresa tu contraseña..."
          className="w-full pl-10 pr-4 py-3 h-[46px] border border-gray-300 rounded-md text-[15px]"
          required
        />
        <div
          className="absolute top-[38px] right-[15px] text-[13px] text-[#777] pt-[5px] cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </div>

        {/* Indicador de fortaleza de contraseña */}
        {register && formData.password && (
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Fortaleza de contraseña</span>
              <span className={passwordStrength.color + ' font-medium'}>
                {passwordStrength.text}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.strength >= 75 ? 'bg-green-500' :
                  passwordStrength.strength >= 50 ? 'bg-blue-500' :
                    passwordStrength.strength >= 25 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                style={{ width: `${passwordStrength.strength}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Requisitos de contraseña - mostrar en formato horizontal */}
        {register && formData.password && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-3">
              {validatePassword(formData.password).map((req, index) => (
                <div key={index} className="flex items-center gap-1 text-xs text-red-600 rounded-md">
                  <AlertCircle className="w-3 h-3" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      <div className="flex items-center justify-between mb-[22px] text-[14px] my-5">
        <a
          href="/recuperar-contrasena"
          className={`block text-right text-[#009a3a] text-[14px] no-underline ${
            register ? "hidden-button" : "block-button"
          }`}
        >
          Olvidó su contraseña
        </a>

        <div className="flex items-center no-underline">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            className="mr-2 ml-[2px] accent-[rgba(9,167,46,0.912)]"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <label htmlFor="rememberMe">Recuérdame</label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full h-[46px] bg-[#00c951] border-none text-white text-[16px] rounded-[25px] mb-[15px] cursor-pointer hover:bg-[#05983b] duration-200 transition ease-in-out"
      >
        {register ? "Registrarse" : "Iniciar sesión"}
      </button>
    </form>
  );
};

export default AuthForm;