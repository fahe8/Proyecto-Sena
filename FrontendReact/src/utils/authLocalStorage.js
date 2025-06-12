// Guardar token en localStorage
export function guardarToken(token) {
  localStorage.setItem('authToken', token);
}

// Obtener token desde localStorage
export function obtenerToken() {
  return localStorage.getItem('authToken');
}

// Eliminar token (por ejemplo, al hacer logout)
export function eliminarToken() {
  localStorage.removeItem('authToken');
}
