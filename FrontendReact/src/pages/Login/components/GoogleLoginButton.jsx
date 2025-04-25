import React from "react";
import logogoogle from "../../../assets/LogIn/simbolo-de-google.png";

const GoogleLoginButton = ({ onClick }) => {
  return (
    <a
      id="google-button"
      className="flex items-center justify-center px-[15px] py-[12px] h-[46px] rounded-full border border-[#00c951] cursor-pointer text-[15px] transition-colors duration-200 text-[#333] bg-white hover:bg-[#d0ffd0]"
      onClick={onClick}
    >
      <img src={logogoogle} className="h-[20px] w-[20px] mr-[12px] " alt="logo-google" />
      Continuar con Google
    </a>
  );
};

export default GoogleLoginButton;