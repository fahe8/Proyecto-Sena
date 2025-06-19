import React, { use, useState } from "react";
import LazyBackground from "../../../utils/LazyBackground.jsx";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import image from '../../../assets/LogIn/background.webp';
import { authServicio } from "../../../services/api.js";
import { useAuth } from "../../../Provider/AuthProvider.jsx";
const ForgotPassword = ({ onBack, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setStatus('error');
            setMessage('Por favor ingresa tu correo electrónico');
            return;
        }

        // Validación básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus('error');
            setMessage('Por favor ingresa un correo electrónico válido');
            return;
        }

        setIsLoading(true);
        setStatus(null);
        setMessage('');

        try {
            let result;
            if (onSubmit) {
                result = await onSubmit(email);
            } else {
              
                result = await authServicio.recuperarContrasena({ email: email });
                console.log(result)

            }
            if (result.data.success) {

                setStatus('success');
                setMessage('Se ha enviado un enlace de restablecimiento a tu correo electrónico');
                setEmail('');
            } else {
                setStatus('error');
                setMessage(result.message || 'Hubo un error al enviar el correo. Inténtalo de nuevo.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Hubo un error al enviar el correo. Inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setStatus(null);
        setMessage('');
        setEmail('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        ¿Olvidaste tu contraseña?
                    </h2>
                    <p className="text-gray-600 text-sm">
                        No te preocupes, te enviaremos un enlace para restablecerla
                    </p>
                </div>

                {/* Formulario */}
                <div className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Correo electrónico
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ejemplo@correo.com"
                                disabled={isLoading || status === 'success'}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-xs outline-none transition-all ${status === 'error' ? 'border-red-300 bg-red-50' :
                                    status === 'success' ? 'border-green-300 bg-green-50' :
                                        'border-gray-300'
                                    } ${isLoading || status === 'success' ? 'opacity-70 cursor-not-allowed' : ''}`}
                            />
                            <Mail className="absolute right-4 top-2.5 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Mensaje de estado */}
                    {message && (
                        <div className={`flex items-center gap-2 p-3 rounded-lg text-sm ${status === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                            'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                            {status === 'success' ? (
                                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                            ) : (
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            )}
                            <span>{message}</span>
                        </div>
                    )}

                    {/* Botones */}
                    <div className="space-y-3">
                        {status !== 'success' ? (
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full text-sm bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                onClick={handleSubmit}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Enviando...
                                    </div>
                                ) : (
                                    'Enviar correo de restablecimiento'
                                )}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleReset}
                                className="w-full text-sm bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                Enviar otro enlace
                            </button>
                        )}

                        {onBack && (
                            <button
                                type="button"
                                onClick={onBack}
                                className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Volver al inicio de sesión
                            </button>
                        )}
                    </div>
                </div>

                {/* Footer informativo */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                        Si no recibes el correo en unos minutos, revisa tu carpeta de spam
                    </p>
                </div>
            </div>
        </div>
    );

};

export default ForgotPassword;