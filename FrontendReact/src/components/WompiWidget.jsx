import React, { useEffect, useRef } from 'react';

const WompiWidget = ({ 
  transactionData, 
  onSuccess, 
  onError, 
  onClose,
  isVisible 
}) => {
  const widgetRef = useRef(null);
  const checkoutRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !transactionData) return;

    // Cargar el script de Wompi si no está cargado
    const loadWompiScript = () => {
      return new Promise((resolve, reject) => {
        if (window.WidgetCheckout) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.wompi.co/widget.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initializeWidget = async () => {
      try {
        await loadWompiScript();
        
        if (checkoutRef.current) {
          checkoutRef.current.close();
        }

        // Configurar el widget con los datos de la transacción
        const checkout = new window.WidgetCheckout({
            
          currency: transactionData?.currency,
          amountInCents: transactionData?.amount_in_cents,
          reference: transactionData?.reference,
          publicKey: transactionData?.public_key,
          redirectUrl: transactionData?.redirect_url,
          integrity: transactionData?.integrity_signature,
          customerData: {
            email: transactionData?.customer_email,
            fullName: transactionData?.customer_data?.full_name,
            phoneNumber: transactionData?.customer_data?.phone_number,
           phoneNumberPrefix:"+57"
          },
          shippingAddress: {
            addressLine1: transactionData?.shipping_address?.address_line_1,
            city: transactionData?.shipping_address?.city,
            phoneNumber: transactionData?.shipping_address?.phone_number,
            region: transactionData?.shipping_address?.region,
            country: transactionData?.shipping_address?.country
          }
        });

        checkoutRef.current = checkout;

        // Configurar eventos del widget
        checkout.open((result) => {
          console.log('Wompi Widget Result:', result);
          
          if (result.transaction && result.transaction.status === 'APPROVED') {
            onSuccess(result);
          } else if (result.transaction && result.transaction.status === 'DECLINED') {
            onError(result);
          } else {
            onClose(result);
          }
        });

      } catch (error) {
        console.error('Error inicializando Wompi Widget:', error);
        onError({ error: 'Error al cargar el widget de pago' });
      }
    };

    initializeWidget();

    // Cleanup
    return () => {
      if (checkoutRef.current) {
        checkoutRef.current.close();
      }
    };
  }, [isVisible, transactionData, onSuccess, onError, onClose]);

  return (
    <div 
      ref={widgetRef}
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      {/* El widget se renderiza automáticamente por el script de Wompi */}
    </div>
  );
};

export default WompiWidget;