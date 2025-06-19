import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    } 
});

export const authServicio = {
    obtenerUsuario: () => apiClient.get('/user', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    }),
    registroUsuario: (data) => apiClient.post('/usuarios', data),
    loginUsuario: (data) => apiClient.post('/login', data),
    logoutUsuario: (token) => apiClient.get('/logout', {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    }),
    enviarCorreoVerificacion: () => apiClient.post('/email/verification-notification', {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    }),
    verificarToken: (token) => apiClient.get('/verificar-token', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }),

    recuperarContrasena: (email) => apiClient.post('/forgot-password', email),
    cambiarContrasena: (data) => apiClient.post('/reset-password', data),
};



export const usuarioServicio = {
    obtenerTodos: () => apiClient.get('/usuarios', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    }),
    obtenerPorId: (id) => apiClient.get(`/usuarios/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    }),
    crear: (data) => apiClient.post('/usuarios', data),
    actualizar: (id, data) => apiClient.put(`/usuarios/${id}`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    }),
    eliminar: (id) => apiClient.delete(`/usuarios/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    })
};

export const propietarioServicio = {
    obtenerTodos: () => apiClient.get('/propietarios'),
    obtenerPorId: (id) => apiClient.get(`/propietarios/${id}`),
    obtenerPorEmpresa: (NIT) => apiClient.get(`/propietarios/empresa/${NIT}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    }),
    crear: (data) => {
        // Si data es FormData, cambiar headers
        const config = data instanceof FormData ? {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        } : {};
        
        return apiClient.post('/propietarios', data, config);
    },
    actualizar: (id, data) => {
        // Si data es FormData, cambiar headers pero mantener Authorization
        const headers = data instanceof FormData ? {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        } : {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        };
        
        return apiClient.put(`/propietarios/${id}`, data, { headers });
    },
    eliminar: (id) => apiClient.delete(`/propietarios/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }),
    obtenerTiposDocumentos: () => apiClient.get('/tipos-documentos'),
};

export const empresaServicio = {
    obtenerTodos: () => apiClient.get('/empresas'),
    obtenerEmpresasActivas: () => apiClient.get('/empresas/activas'),
    obtenerPorId: (nit) => apiClient.get(`/empresas/${nit}`),
    crear: (data) => {
        // Si data es FormData, cambiar headers
        const config = data instanceof FormData ? {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        } : {};
        
        return apiClient.post('/empresas', data, config);
    },
    actualizar: (id, data) => {
        // Si data es FormData, cambiar headers pero mantener Authorization
        const headers = data instanceof FormData ? {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        } : {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        };
        
        return apiClient.put(`/empresas/${id}`, data, { headers });
    },
    eliminar: (id) => apiClient.delete(`/empresas/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
};

export const reservaServicio = {
    obtenerTodos: () => apiClient.get('/reservas'),
    obtenerPorUsuario: (userId) => apiClient.get(`/reservas/usuario/${userId}`),
    obtenerPorEmpresa: (nit) => apiClient.get(`/reservas/empresa/${nit}`),
    crear: (data) => apiClient.post('/reservas', data),
    actualizar: (id, data) => apiClient.put(`/reservas/${id}`, data),
    eliminar: (id) => apiClient.delete(`/reservas/${id}`),
    obtenerReservasActivas: (id) => apiClient.get(`reservas/active/${id}`),
    obtenerHistorialReservas: (userId) => apiClient.get(`reservas/history/${userId}`),
    obtenerHorasReservadas: (data) => apiClient.post('/reservas/horas-reservadas', data)
};

// NUEVO SERVICIO PARA RESEÑAS
export const resenaServicio = {
    obtenerResenasEmpresa: (nit) => apiClient.get(`/resenas/empresa/${nit}`),
    crear: (data) => apiClient.post('/resenas', data),
    verificarResenaUsuario: (idReserva, idUsuario) => apiClient.get(`/resenas/verificar/${idReserva}/${idUsuario}`),
    obtenerPorReserva: (idReserva) => apiClient.get(`/resenas/reserva/${idReserva}`),
    obtenerHistorialResenas: (idUsuario) => apiClient.get(`/resenas/history/${idUsuario}`) // NUEVO MÉTODO
};

export const canchasServicio = {
    obtenerTodosEmpresa: (nit) => apiClient.get(`canchas/empresa/${nit}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    }),
    tiposCanchas: () => apiClient.get(`/tipos-canchas`),
    estadoCanchas: () => apiClient.get(`/estados-canchas`),
    actualizar: (id, data) => {
        console.log('first, data: ', data)
        
        // Si data es FormData, usar POST con _method spoofing
        if (data instanceof FormData) {
            // Agregar el método PUT como campo oculto
            data.append('_method', 'PUT');
            
            return apiClient.post(`/canchas/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
        }
        
        // Para datos sin archivos, usar PUT normal
        return apiClient.put(`/canchas/${id}`, data);
    },
    eliminar: (id) => apiClient.delete(`/canchas/${id}`),
    agregar: (data) => {
        console.log(data)
        // Si data es FormData, cambiar headers
        const config = data instanceof FormData ? {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        } : {};
        
        return apiClient.post('/canchas', data, config);
    }
}

export const ServiciosServicio = {
    obtenerTodos: () => apiClient.get('/servicios'),
    obtenerPorId: (id) => apiClient.get(`/servicios/${id}`),
    obtenerPorEmpresa: (nit) => apiClient.get(`/servicios/empresa/${nit}`),
    crear: (data) => apiClient.post('/servicios', data),
    actualizar: (id, data) => apiClient.put(`/servicios/${id}`, data),
    eliminar: (id) => apiClient.delete(`/servicios/${id}`)
}

export default apiClient;