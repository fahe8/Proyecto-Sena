import React from "react";

const ConfirmacionModal = ({ isOpen, onClose, onConfirm, reservaInfo }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#36363695] backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
          Confirmar Reserva
        </h2>
        
        <div className="border-t border-b border-gray-200 py-4 my-4">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <p className="font-semibold">Fecha:</p>
            <p>{reservaInfo.fecha}</p>
            
            <p className="font-semibold">Horario:</p>
            <p>{reservaInfo.horario}</p>
            
            <p className="font-semibold">Duración:</p>
            <p>{reservaInfo.duracion}</p>
            
            <p className="font-semibold">Cancha:</p>
            <p>{reservaInfo.cancha}</p>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg mt-2">
            <p className="font-semibold text-center">Costo total:</p>
            <p className="text-xl font-bold text-center text-green-700">
              ${reservaInfo.costoTotal} COP
            </p>
          </div>
        </div>
        
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onConfirm}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 cursor-pointer"
          >
            Confirmar
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacionModal;