import React, { useState, useEffect } from 'react';
import { propietarioServicio } from '../services/api';
// import { toast } from 'react-toastify';

const ConfiguracionWompi = () => {
    const [estado, setEstado] = useState({
        configurado: false,
        public_key: '',
        environment: 'test',
        configured_at: null
    });
    
    const [formulario, setFormulario] = useState({
        public_key: '',
        private_key: '',
        integrity_secret: '',
        environment: 'test'
    });
    
    const [cargando, setCargando] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        cargarEstado();
    }, []);

    const cargarEstado = async () => {
        try {
            const response = await propietarioServicio.estadoWompi();
            if (response.data.success) {
                setEstado(response.data.data);
            }
        } catch (error) {
            console.error('Error al cargar estado de Wompi:', error);
        }
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        
        try {
            const response = await propietarioServicio.configurarWompi(formulario);
            if (response.data.success) {
               alert('Credenciales de Wompi configuradas correctamente');
                await cargarEstado();
                setMostrarFormulario(false);
                setFormulario({ public_key: '', private_key: '', environment: 'test' });
            }
        } catch (error) {
           alert(error.response?.data?.message || 'Error al configurar Wompi');
        } finally {
            setCargando(false);
        }
    };

    const revocarCredenciales = async () => {
        if (!window.confirm('¿Estás seguro de que quieres revocar las credenciales de Wompi?')) {
            return;
        }
        
        setCargando(true);
        try {
            const response = await propietarioServicio.revocarWompi();
            if (response.data.success) {
                alert('Credenciales revocadas correctamente');
                await cargarEstado();
            }
        } catch (error) {
          alert('Error al revocar credenciales');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Configuración de Wompi</h3>
            
            {estado.configurado ? (
                <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-green-800">
                                    Wompi configurado correctamente
                                </h3>
                                <div className="mt-2 text-sm text-green-700">
                                    <p><strong>Llave pública:</strong> {estado.public_key}</p>
                                    <p><strong>Ambiente:</strong> {estado.environment}</p>
                                    <p><strong>Configurado:</strong> {new Date(estado.configured_at).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex space-x-3">
                        <button
                            onClick={() => setMostrarFormulario(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Actualizar credenciales
                        </button>
                        <button
                            onClick={revocarCredenciales}
                            disabled={cargando}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
                        >
                            Revocar credenciales
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">
                                Wompi no configurado
                            </h3>
                            <div className="mt-2 text-sm text-yellow-700">
                                <p>Necesitas configurar tus credenciales de Wompi para procesar pagos.</p>
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={() => setMostrarFormulario(true)}
                                    className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
                                >
                                    Configurar Wompi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {mostrarFormulario && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Configurar credenciales de Wompi
                        </h3>
                        
                        <form onSubmit={manejarSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Llave pública
                                </label>
                                <input
                                    type="text"
                                    value={formulario.public_key}
                                    onChange={(e) => setFormulario({...formulario, public_key: e.target.value})}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                    placeholder="pub_test_..."
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Llave privada
                                </label>
                                <input
                                    type="password"
                                    value={formulario.private_key}
                                    onChange={(e) => setFormulario({...formulario, private_key: e.target.value})}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                    placeholder="prv_test_..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Integridad
                                </label>
                                <input
                                    type="password"
                                    value={formulario.integrity_secret}
                                    onChange={(e) => setFormulario({...formulario, integrity_secret: e.target.value})}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                    placeholder="test_int_..."
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Ambiente
                                </label>
                                <select
                                    value={formulario.environment}
                                    onChange={(e) => setFormulario({...formulario, environment: e.target.value})}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                    <option value="test">Pruebas (Test)</option>
                                    <option value="production">Producción</option>
                                </select>
                            </div>
                            
                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={cargando}
                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {cargando ? 'Configurando...' : 'Configurar'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMostrarFormulario(false)}
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConfiguracionWompi;