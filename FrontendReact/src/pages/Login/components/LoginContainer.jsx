import React from "react";

const LoginContainer = ({ children }) => {
  return (
    <div className="relative w-110 p-[30px] px-10 bg-white rounded-[8px] font-[Arial] m-0 mx-auto shadow-md z-10">
      {children}
    </div>
  );
};

export default LoginContainer;