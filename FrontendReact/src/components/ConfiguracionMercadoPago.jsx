import React, { useState, useEffect } from 'react';
import { propietarioServicio } from '../services/api';

const ConfiguracionMercadoPago = () => {
    const [estado, setEstado] = useState({
        configurado: false,
        user_id: null,
        scopes: [],
        expires_at: null,
        necesita_renovacion: false
    });
    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        verificarEstado();
    }, []);

    const verificarEstado = async () => {
        try {
            const response = await propietarioServicio.estadoMercadoPago();
            setEstado(response.data);
        } catch (error) {
            console.error('Error al verificar estado:', error);
        }
    };

    const iniciarOAuth = async () => {
        setCargando(true);
        try {
            const response = await propietarioServicio.iniciarOAuthMercadoPago();
            // Abrir ventana popup para OAuth
            console.log(response)
            const popup = window.open(
                response.data.auth_url,
                'mercadopago-oauth',
                'width=600,height=700,scrollbars=yes,resizable=yes'
            );
            
            // Escuchar cuando se cierre el popup
            const checkClosed = setInterval(() => {
                if (popup.closed) {
                    clearInterval(checkClosed);
                    setCargando(false);
                    verificarEstado(); // Verificar si se configuró exitosamente
                }
            }, 1000);
            
        } catch (error) {
            setCargando(false);
            setMensaje('Error al iniciar OAuth: ' + (error.response?.data?.message || error.message));
        }
    };

    const renovarToken = async () => {
        setCargando(true);
        try {
            await propietarioServicio.renovarTokenMercadoPago();
            setMensaje('Token renovado exitosamente');
            verificarEstado();
        } catch (error) {
            setMensaje('Error al renovar token: ' + (error.response?.data?.message || error.message));
        } finally {
            setCargando(false);
        }
    };

    const revocarAcceso = async () => {
        if (!confirm('¿Estás seguro de que quieres revocar el acceso a Mercado Pago?')) {
            return;
        }
        
        setCargando(true);
        try {
            await propietarioServicio.revocarMercadoPago();
            setMensaje('Acceso revocado exitosamente');
            verificarEstado();
        } catch (error) {
            setMensaje('Error al revocar acceso: ' + (error.response?.data?.message || error.message));
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-12 relative mb-8">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-[#003044]">Configuración de Mercado Pago</h3>
            </div>
            
            {estado.configurado ? (
                <div className="mb-8">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">✅</span>
                            <span className="text-green-800 font-semibold text-lg">
                                Mercado Pago está configurado correctamente
                            </span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div className="flex items-center mb-2">
                                <span className="text-xl mr-2">🆔</span>
                                <span className="font-semibold text-[#003044]">User ID</span>
                            </div>
                            <p className="text-gray-700">{estado.user_id}</p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div className="flex items-center mb-2">
                                <span className="text-xl mr-2">🔐</span>
                                <span className="font-semibold text-[#003044]">Permisos</span>
                            </div>
                            <p className="text-gray-700">{estado.scopes?.join(', ')}</p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div className="flex items-center mb-2">
                                <span className="text-xl mr-2">⏰</span>
                                <span className="font-semibold text-[#003044]">Expira</span>
                            </div>
                            <p className="text-gray-700">{new Date(estado.expires_at).toLocaleString()}</p>
                        </div>
                    </div>
                    
                    {estado.necesita_renovacion && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                            <div className="flex items-center">
                                <span className="text-2xl mr-3">⚠️</span>
                                <span className="text-yellow-800 font-semibold">
                                    Tu token expirará pronto. Se recomienda renovarlo.
                                </span>
                            </div>
                        </div>
                    )}
                    
                    <div className="flex flex-wrap gap-4">
                        <button 
                            onClick={renovarToken}
                            disabled={cargando}
                            className="flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 bg-yellow-500 hover:bg-yellow-600 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span>{cargando ? 'Renovando...' : 'Renovar Token'}</span>
                        </button>
                        
                        <button 
                            onClick={revocarAcceso}
                            disabled={cargando}
                            className="flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span>{cargando ? 'Revocando...' : 'Revocar Acceso'}</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <span className="text-4xl mr-3">🔗</span>
                            <span className="text-blue-800 font-semibold text-xl">
                                Conecta tu cuenta de Mercado Pago para recibir pagos
                            </span>
                        </div>
                        
                        <button 
                            onClick={iniciarOAuth}
                            disabled={cargando}
                            className="flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 bg-[#003044] hover:bg-[#004466] text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mx-auto text-lg font-semibold"
                        >
                            <span className="text-xl">🔗</span>
                            <span>{cargando ? 'Conectando...' : 'Conectar con Mercado Pago'}</span>
                        </button>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h5 className="text-lg font-semibold text-[#003044] mb-4">¿Qué permisos solicitamos?</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                            <div className="flex items-start">
                                <span className="text-xl mr-3">👁️</span>
                                <div>
                                    <strong className="text-[#003044]">Lectura:</strong>
                                    <p className="text-gray-600 text-sm mt-1">Para consultar información de tu cuenta</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="text-xl mr-3">✍️</span>
                                <div>
                                    <strong className="text-[#003044]">Escritura:</strong>
                                    <p className="text-gray-600 text-sm mt-1">Para procesar pagos y crear preferencias</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="text-xl mr-3">🔄</span>
                                <div>
                                    <strong className="text-[#003044]">Acceso offline:</strong>
                                    <p className="text-gray-600 text-sm mt-1">Para renovar tokens automáticamente</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {mensaje && (
                <div className={`mt-6 p-4 rounded-lg border ${
                    mensaje.includes('Error') 
                        ? 'bg-red-50 border-red-200 text-red-800' 
                        : 'bg-green-50 border-green-200 text-green-800'
                }`}>
                    <div className="flex items-center">
                        <span className="text-xl mr-2">
                            {mensaje.includes('Error') ? '❌' : '✅'}
                        </span>
                        <span className="font-semibold">{mensaje}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConfiguracionMercadoPago;