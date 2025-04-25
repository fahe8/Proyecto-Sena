import React from "react";

const LoginHeader = ({ register }) => {
  return (
    <>
      <div className="flex justify-start gap-3 items-center mb-[20px]">
        <div className="border-b-2 border-[#003044] px-4 py-[4px] text-[14px] text-[#33ea30] cursor-default">
          Usuario
        </div>
        <a
          href="/formulario-empresa"
          className="px-4 py-[4px] hover:border-[#003044] hover:border-b-2 hover:text-[#33ea30] text-[14px]"
        >
          Empresa
        </a>
      </div>

      <h2 className="text-center text-lg mb-5 font-semibold text-[#333]">
        {register ? "Regístrate" : "Inicia sesión"}
      </h2>
    </>
  );
};

export default LoginHeader;