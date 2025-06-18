import React, { useEffect, useState } from 'react';

const PagoModal = ({ isOpen, onClose, transactionData, onPaymentSuccess, reservaInfo }) => {
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [checkingPayment, setCheckingPayment] = useState(false);

  useEffect(() => {
    if (isOpen && transactionData) {
      // Abrir ventana de pago de Wompi
      const paymentWindow = window.open(
        transactionData.payment_link,
        'wompi-payment',
        'width=600,height=700,scrollbars=yes,resizable=yes'
      );

      // Verificar periódicamente si la ventana se cerró
      const checkClosed = setInterval(() => {
        if (paymentWindow.closed) {
          clearInterval(checkClosed);
          checkPaymentStatus();
        }
      }, 1000);

      return () => {
        clearInterval(checkClosed);
        if (paymentWindow && !paymentWindow.closed) {
          paymentWindow.close();
        }
      };
    }
  }, [isOpen, transactionData]);

  const checkPaymentStatus = async () => {
    setCheckingPayment(true);
    try {
      // Esperar un momento para que Wompi procese
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      await onPaymentSuccess(transactionData.transaction_id);
      setPaymentStatus('success');
    } catch (error) {
      setPaymentStatus('failed');
    } finally {
      setCheckingPayment(false);
    }
  };

  const handleManualCheck = () => {
    checkPaymentStatus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Procesando Pago
        </h2>
        
        <div className="border-t border-b border-gray-200 py-4 my-4">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <p className="font-semibold">Fecha:</p>
            <p>{reservaInfo.fecha}</p>
            
            <p className="font-semibold">Horario:</p>
            <p>{reservaInfo.horario}</p>
            
            <p className="font-semibold">Cancha:</p>
            <p>{reservaInfo.cancha}</p>
            
            <p className="font-semibold">Referencia:</p>
            <p className="text-sm">{transactionData?.reference}</p>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg mt-2">
            <p className="font-semibold text-center">Total a pagar:</p>
            <p className="text-xl font-bold text-center text-blue-700">
              ${transactionData?.amount} COP
            </p>
          </div>
        </div>

        {checkingPayment ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p>Verificando estado del pago...</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-4 text-gray-600">
              Se abrió una ventana para completar el pago. 
              Una vez completado, haz clic en "Verificar Pago".
            </p>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={handleManualCheck}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
              >
                Verificar Pago
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PagoModal;