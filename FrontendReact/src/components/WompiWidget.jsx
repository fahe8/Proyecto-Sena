import React, { useEffect, useRef } from "react";
import { wompiServicio } from "../services/api";


const WompiWidget = ({
  transactionData,
  onSuccess,
  onError,
  onClose,
  isVisible,
  redirectUrl = window.location.origin,
}) => {
  const widgetRef = useRef(null);
  const checkoutRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !transactionData) return;

    const script = document.createElement("script");
    script.src = "https://checkout.wompi.co/widget.js";
    script.setAttribute("data-render", "button");
    script.setAttribute("data-public-key", transactionData.public_key);
    script.setAttribute("data-currency", transactionData.currency);
    script.setAttribute(
      "data-amount-in-cents",
      transactionData.amount_in_cents.toString()
    );
    script.setAttribute("data-reference", transactionData.reference);
    script.setAttribute(
      "data-signature:integrity",
      transactionData.integrity_signature
    );
    script.setAttribute("data-redirect-url", "http://localhost:5173/reservasactivas");
    script.setAttribute("data-button-text", "Pagar Reserva");
    script.setAttribute("data-locale", "es");

    script.onload = () => {
      console.log("Wompi script loaded con firma");
      
      // Simular click automático después de que el script se cargue
      setTimeout(() => {
        const wompiButton = document.querySelector('#wompi-button-container button');
        if (wompiButton) {
          console.log('Abriendo widget automáticamente...');
          wompiButton.click();
        }
      }, 500); // Pequeño delay para asegurar que el botón esté renderizado
    };

    // Event listener para capturar cuando se cierra el widget
    const handleWidgetClose = (event) => {
      if (event.data && event.data.type === 'WIDGET_CLOSED') {
        console.log('Widget cerrado:', event.data);
        if (onClose) onClose(event.data);
      }
    };

    // Event listener para capturar respuestas del pago
    const handlePaymentResponse = async (event) => {
      if (event.data && event.data.type === 'PAYMENT_RESPONSE') {
        const { status, transaction } = event.data;
        
        console.log('Respuesta del pago:', event.data);
        
        switch (status) {
          case 'APPROVED':
            try {
              // Llamar al backend para confirmar el pago
              console.log('Confirmando pago en el backend...');
              const confirmationResult = await wompiServicio.confirmarPago(
                transactionData.reference,
                transaction.id
              );
              
              console.log('Pago confirmado en el backend:', confirmationResult);
              
              if (onSuccess) {
                onSuccess({
                  status,
                  transaction,
                  reference: transactionData.reference,
                  backendResponse: confirmationResult
                });
              }
            } catch (error) {
              console.error('Error confirmando pago en el backend:', error);
              if (onError) {
                onError({
                  status: 'BACKEND_ERROR',
                  transaction,
                  reference: transactionData.reference,
                  error: 'Error confirmando el pago en el servidor'
                });
              }
            }
            break;
          case 'DECLINED':
          case 'ERROR':
            if (onError) {
              onError({
                status,
                transaction,
                reference: transactionData.reference,
                error: event.data.error || 'Pago rechazado'
              });
            }
            break;
          default:
            console.log('Estado de pago no manejado:', status);
        }
      }
    };

    // Agregar event listeners
    window.addEventListener('message', handlePaymentResponse);
    window.addEventListener('message', handleWidgetClose);

    const container = document.getElementById("wompi-button-container");
    container.innerHTML = ""; // Evita duplicados
    container.appendChild(script);

    return () => {
      // Limpieza
      container.innerHTML = "";
      window.removeEventListener('message', handlePaymentResponse);
      window.removeEventListener('message', handleWidgetClose);
    };
  }, [isVisible, transactionData, onSuccess, onError, onClose, redirectUrl]);

  return <div id="wompi-button-container" />;
};

export default WompiWidget;
