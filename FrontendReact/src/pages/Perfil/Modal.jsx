import React, { useState, useEffect } from "react";
import error from "../../assets/modal/error.svg";

const Modal = ({
  titulo = "¿Estás seguro?",
  subtitulo = "Estas seguro de aceptar estos cambios, recuerda que no podrás retrocederlo",
  cerrarModal = () => {},
  funcionEjecutar = () => {}
}) => {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    setTimeout(() => setMostrar(true), 10);
  }, []);

  const confirmar = () => {
    funcionEjecutar();
    cerrarModal();
  }

  return (
    <div
      onClick={cerrarModal}
      className={`fixed inset-0 bg-[#00000080] flex justify-center items-center z-50`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[500px] bg-white rounded-2xl shadow-lg transition-all transform scale-95 opacity-0 duration-300"
        style={{
          opacity: mostrar ? 1 : 0,
          transform: mostrar ? "scale(1)" : "scale(0.95)",
        }}
      >
        <div className="text-center">
          <div className="rounded-t-2xl py-2 bg-red-500 flex justify-center">
            <img src={error} alt="Error" width={80} />
          </div>
          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-xl font-bold">{titulo}</h2>
              <p className="text-gray-600 mt-2">{subtitulo}</p>
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={cerrarModal}
                className="px-6 py-3 bg-red-400 rounded-full cursor-pointer hover:bg-red-300"
              >
                <span>Cancelar</span>
              </button>
              <button onClick={confirmar} className="px-6 py-3 bg-green-400 rounded-full cursor-pointer hover:bg-green-300">
                <span>Confirmar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
