import React from "react";

const LoginFooter = ({ register, toggleRegister }) => {
  return (
    <>
      <div className="mb-[20px] mt-[15px] border-b border-[#ddd]"></div>
      <div className="flex justify-between mt-[20px] text-[17px] text-[#555]">
        <p className="text-[#555]">
          {register ? "¿Ya tienes una cuenta?" : "¿Eres nuevo aquí?"}
        </p>
        <a
          onClick={toggleRegister}
          className="text-[#00c951] underline cursor-pointer hover:text-[#029d02]"
        >
          {register ? "Iniciar sesión" : "Registrarse"}
        </a>
      </div>
    </>
  );
};

export default LoginFooter;