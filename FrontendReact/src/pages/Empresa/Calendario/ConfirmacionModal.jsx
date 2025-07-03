import React from "react";

const ConfirmacionModal = ({ isOpen, onClose, onConfirm, reservaInfo }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#36363695] backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
          Confirmar Reserva y Pago
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
          
          <div className="bg-blue-50 p-3 rounded-lg mt-2">
            <p className="text-sm text-center text-blue-700">
              💳 El pago se procesará a través de Wompi
            </p>
          </div>
          
          {/* Nueva advertencia sobre política de no devolución */}
          <div className="bg-red-50 border border-red-200 p-3 rounded-lg mt-2">
            <div className="flex items-start">
              <span className="text-red-500 mr-2 text-lg">⚠️</span>
              <div>
                <p className="text-sm font-semibold text-red-700 mb-1">
                  Política de No Devolución
                </p>
                <p className="text-xs text-red-600">
                  Una vez confirmada la reserva y procesado el pago, no se realizarán devoluciones bajo ninguna circunstancia.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onConfirm}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 cursor-pointer"
          >
            Proceder al Pago
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