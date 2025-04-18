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


export default apiClient;