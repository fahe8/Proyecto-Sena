export const manejarErroresFirebase = (error) => {
  console.error("Error de Firebase:", error);

  if (!error.code) return "Ocurrió un error inesperado. Inténtalo más tarde.";

  const errores = {
    "auth/invalid-login-credentials": "Correo o contraseña incorrecta.",
    "auth/email-already-in-use": "Este correo ya está en uso.",
    "auth/invalid-email": "Correo inválido.",
    "auth/weak-password": "La contraseña es demasiado débil.",
    "auth/user-not-found": "Usuario no encontrado.",
    "auth/wrong-password": "Contraseña incorrecta.",
    "auth/network-request-failed": "Error de conexión. Verifica tu internet.",
    "auth/too-many-requests": "Demasiados intentos fallidos. Inténtalo más tarde.",
    "auth/missing-password": "Por favor, ingresa una contraseña.",
    "auth/requires-recent-login": "Por favor, vuelve a iniciar sesión y vuelve a intentarlo.",
    "auth/operation-not-allowed": "Operación no permitida. Contacta al soporte.",
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
    "auth/invalid-verification-code": "Código de verificación inválido.",
    "auth/invalid-verification-id": "ID de verificación inválido.",

    "auth/expired-action-code": "El enlace de recuperación de contraseña ha expirado. Por favor, solicita uno nuevo.",
    "auth/invalid-action-code":"El enlace de recuperación de contraseña es inválido. Por favor, solicita uno nuevo.",
    "auth/user-disabled":"Esta cuenta ha sido deshabilitada. Por favor, contacta con soporte.",
    "auth/user-not-found":"No existe una cuenta con este correo electrónico.",
    "auth/weak-password":"La contraseña debe tener al menos 6 caracteres.",
    "auth/passwords-dont-match":"Las contraseñas no coinciden. Por favor, inténtalo de nuevo."
  };

  return errores[error.code] || "Error inesperado. Inténtalo de nuevo.";
};