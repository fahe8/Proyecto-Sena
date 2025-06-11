import axios from "axios";

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
    obtenerTodos: () => apiClient.get('/usuarios'),
    obtenerPorId: (id) => apiClient.get(`/usuarios/${id}`),
    crear: (data) => apiClient.post('/usuarios', data),
    actualizar: (id, data) => apiClient.put(`/usuarios/${id}`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    }),
    eliminar: (id) => apiClient.delete(`/usuarios/${id}`)
};

export const propietarioServicio = {
    obtenerTodos: () => apiClient.get('/propietarios'),
    obtenerPorId: (id) => apiClient.get(`/propietarios/${id}`),
    obtenerPorEmpresa: (NIT) => apiClient.get(`/propietarios/empresa/${NIT}`),
    crear: (data) => {
        // Si data es FormData, cambiar headers
        const config = data instanceof FormData ? {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        } : {};
        
        return apiClient.post('/propietarios', data, config);
    },
    actualizar: (id, data) => apiClient.put(`/propietarios/${id}`, data),
    eliminar: (id) => apiClient.delete(`/propietarios/${id}`),
    obtenerTiposDocumentos: () => apiClient.get('/tipos-documentos'),
};

export const empresaServicio = {
    obtenerTodos: () => apiClient.get('/empresas'),
    obtenerPorId: (id) => apiClient.get(`/empresas/${id}`),
    crear: (data) => {
        // Si data es FormData, cambiar headers
        const config = data instanceof FormData ? {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        } : {};
        
        return apiClient.post('/empresas', data, config);
    },
    actualizar: (id, data) => apiClient.put(`/empresas/${id}`, data),
    eliminar: (id) => apiClient.delete(`/empresas/${id}`)
};

export const reservaServicio = {
    obtenerTodos: () => apiClient.get('/reservas'),
    obtenerPorUsuario: (userId) => apiClient.get(`/reservas/usuario/${userId}`),
    obtenerPorEmpresa: (nit) => apiClient.get(`/reservas/empresa/${nit}`),
    crear: (data) => apiClient.post('/reservas', data),
    actualizar: (id, data) => apiClient.put(`/reservas/${id}`, data),
    eliminar: (id) => apiClient.delete(`/reservas/${id}`),
    obtenerReservasActivas: (id) => apiClient.get(`reservas/active/${id}`),
    obtenerHistorialReservas: (userId) => apiClient.get(`reservas/history/${userId}`)
};

export const canchasServicio = {
    obtenerTodosEmpresa: (nit) => apiClient.get(`canchas/empresa/${nit}`),
    tiposCanchas: () => apiClient.get(`/tipos-canchas`),
    estadoCanchas: () => apiClient.get(`/estados-canchas`),
    actualizar: (id, data) => apiClient.put(`/canchas/${id}`, data),
    eliminar: (id) => apiClient.delete(`/canchas/${id}`),
    agregar: (data) => {
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