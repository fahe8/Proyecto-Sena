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



export const usuarioServicio = {
    obtenerTodos: () => apiClient.get('/usuarios'),
    obtenerPorId: (id) => apiClient.get(`/usuarios/${id}`),
    crear: (data) => apiClient.post('/usuarios', data),
    actualizar: (id, data) => apiClient.put(`/usuarios/${id}`, data),
    eliminar: (id) => apiClient.delete(`/usuarios/${id}`)   
};

export const propietarioServicio = {
    obtenerTodos: () => apiClient.get('/propietarios'),
    obtenerPorId: (id) => apiClient.get(`/propietarios/${id}`),
    obtenerPorEmpresa: (NIT) => apiClient.get(`/propietarios/empresa/${NIT}`),
    crear: (data) => apiClient.post('/propietarios', data),
    actualizar: (id, data) => apiClient.put(`/propietarios/${id}`, data),
    eliminar: (id) => apiClient.delete(`/propietarios/${id}`)
};

export const empresaServicio = {
    obtenerTodos: () => apiClient.get('/empresas'),
    obtenerPorId: (id) => apiClient.get(`/empresas/${id}`),
    crear: (data) => apiClient.post('/empresas', data),
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
    obtenerTodosEmpresa: (nit) => apiClient.get(`/canchas/empresa/${nit}`),
    tiposCanchas: () => apiClient.get(`/tipocanchas`),
    estadoCanchas: () => apiClient.get(`/estadocanchas`),
    actualizar: (id, data) => apiClient.put(`/canchas/${id}`, data),
    eliminar: (id) => apiClient.delete(`/canchas/${id}`),
    agregar: (data) => apiClient.post('/canchas', data),
}

export const adicionalServicio = {
    obtenerTodos: () => apiClient.get('/adicionales'),
    obtenerPorId: (id) => apiClient.get(`/adicionales/${id}`),
    crear: (data) => apiClient.post('/adicionales', data),
    actualizar: (id, data) => apiClient.put(`/adicionales/${id}`, data),
    eliminar: (id) => apiClient.delete(`/adicionales/${id}`)
};
export default apiClient;