export const manejarErroresFirebase = (error) => {
  console.error("Error de Firebase:", error);

  if (!error.code) return "Ocurrió un error inesperado. Inténtalo más tarde.";

  const errores = {
    "auth/invalid-login-credentials": "Correo o contraseña incorrecta",
    "auth/email-already-in-use": "Este correo ya está en uso.",
    "auth/invalid-email": "Correo inválido.",
    "auth/weak-password": "La contraseña es demasiado débil.",
    "auth/user-not-found": "Usuario no encontrado.",
    "auth/wrong-password": "Contraseña incorrecta.",
    "auth/network-request-failed": "Error de conexión. Verifica tu internet.",
    "auth/too-many-requests":
      "Demasiados intentos fallidos. Inténtalo más tarde.",
    "auth/missing-password": "Por favor, ingresa una contraseña.",
  };

  return errores[error.code] || "Error inesperado. Inténtalo de nuevo.";
};
