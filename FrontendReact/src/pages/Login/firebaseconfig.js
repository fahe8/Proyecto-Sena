import { initializeApp } from "firebase/app";
// Importa la función para inicializar una aplicación Firebase

import {
  getAuth, // Obtiene la instancia de autenticación de Firebase
  GoogleAuthProvider, // Proveedor de autenticación con Google
  signInWithPopup, // Inicia sesión con Google en una ventana emergente
  createUserWithEmailAndPassword, // Crea un usuario con email y contraseña
  signInWithEmailAndPassword, // Inicia sesión con email y contraseña
  sendEmailVerification, // Envía un correo de verificación al usuario
  deleteUser, // Elimina un usuario
  sendPasswordResetEmail, // Envía un correo para restablecer la contraseña
  confirmPasswordReset, // Confirma el restablecimiento de la contraseña
} from "firebase/auth"; // Importa todas las funciones necesarias de autenticación

// Configuración de la aplicación Firebase con las credenciales proporcionadas
const firebaseConfig = {
  apiKey: "AIzaSyDLHB29MlI_1RgwlcFQEXhaEIWOwpSqN5s", // Clave de API
  authDomain: "sample-firebase-ai-app-847ed.firebaseapp.com", // Dominio de autenticación
  projectId: "sample-firebase-ai-app-847ed", // ID del proyecto en Firebase
  storageBucket: "sample-firebase-ai-app-847ed.firebasestorage.app", // Almacenamiento de Firebase
  messagingSenderId: "857937483062", // ID del remitente para mensajes
  appId: "1:857937483062:web:464bf11ac04eb34578cf97", // ID de la aplicación
};

// Inicializa la aplicación Firebase con la configuración anterior
const app = initializeApp(firebaseConfig);

// Obtiene la instancia de autenticación de Firebase para usarla en el proyecto
const auth = getAuth(app);

// Crea una instancia del proveedor de autenticación de Google
const googleProvider = new GoogleAuthProvider();

// Función para iniciar sesión con Google utilizando una ventana emergente
const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

// Función para iniciar sesión con email y contraseña
const iniciarSesionConEmail = async (email, password) => {
  try {
    // Llama a Firebase para autenticar al usuario con email y contraseña
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { success: true, userCredential }; // Retorna éxito si la autenticación es correcta
  } catch (error) {
    console.error(
      "Error en el inicio de sesión:",
      error.code,
      "--",
      error.message
    );
    return { success: false, code: error.code, message: error.message }; // Retorna error en caso de fallo
  }
};

// Función para registrar un nuevo usuario con email y contraseña
const signUpWithEmailAndPassword = async (email, password) => {
  try {
    // Crea el usuario en Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Envía un correo de verificación al usuario
    await sendEmailVerification(userCredential.user);

    return { success: true, userCredential }; // Retorna éxito si el registro es correcto
  } catch (error) {
    console.error("Error en el registro:", error.code, error.message);
    return { success: false, code: error.code, message: error.message }; // Retorna error en caso de fallo
  }
};

// **Función para eliminar usuarios no verificados después de 5 minutos**
const checkAndDeleteUnverifiedUser = async (user) => {
  try {
    // Obtiene la fecha de creación del usuario desde el almacenamiento local
    const createdAt = localStorage.getItem("userCreatedAt");
    if (!createdAt) return false; // Si no hay fecha de creación, no se elimina nada

    const now = Date.now(); // Obtiene la fecha actual en milisegundos
    const MAX_MINUTES = 5; // Tiempo máximo antes de eliminar el usuario
    const differenceInMinutes = (now - parseInt(createdAt, 10)) / (1000 * 60); // Calcula la diferencia en minutos

    if (differenceInMinutes >= MAX_MINUTES) {
      localStorage.removeItem("userCreatedAt"); // Elimina el dato del almacenamiento local

      await deleteUser(user); // Elimina la cuenta del usuario en Firebase
      console.log("Cuenta eliminada por falta de verificación.");
      return true; // Indica que el usuario fue eliminado
    }

    return false; // Indica que el usuario NO fue eliminado
  } catch (error) {
    console.error("Error al eliminar la cuenta:", error.code, error.message);
    return false; // Retorna false en caso de error
  }
};

// Función que envía un correo de recuperación de contraseña
const recuperarContrasena = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email); // Envía el correo de recuperación
    return { success: true, message: "Correo de recuperación enviado." }; // Retorna éxito si se envió correctamente
  } catch (error) {
    console.error("Error al recuperar contraseña:", error.code, error.message);
    return { success: false, code: error.code, message: error.message }; // Retorna error en caso de fallo
  }
};

// Función para confirmar el cambio de contraseña con un token de recuperación
export const confirmarCambioContrasena = async (oobCode, newPassword) => {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword); // Confirma el cambio en Firebase
    return { success: true }; // Retorna éxito si el cambio fue exitoso
  } catch (error) {
    console.error("Error al confirmar el cambio de contraseña:", error);
    return { success: false, error }; // Retorna error en caso de fallo
  }
};

// Exporta todas las funciones y objetos para que puedan ser utilizadas en otros archivos
export {
  auth, // Instancia de autenticación de Firebase
  signInWithGoogle, // Función para iniciar sesión con Google
  signUpWithEmailAndPassword, // Función para registrar un usuario con email y contraseña
  iniciarSesionConEmail, // Función para iniciar sesión con email y contraseña
  checkAndDeleteUnverifiedUser, // Función para eliminar usuarios no verificados después de 5 minutos
  recuperarContrasena, // Función para recuperar la contraseña mediante email
};
