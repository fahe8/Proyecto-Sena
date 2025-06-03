import React, { useState } from "react";
import { LetterIcon, KeyIcon, EyeIcon, EyeOffIcon } from "../../../assets/IconosSVG/iconos.jsx";

const AuthForm = ({ register, formData, handleChange, handleSubmit, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

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
         {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        <div
          className="absolute top-[38px] right-[15px] text-[13px] text-[#777] pt-[5px] cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </div>
      </div>

      <div className="flex items-center justify-between mb-[22px] text-[14px] my-5">
        <a
          href="/recuperar-contrasena/"
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