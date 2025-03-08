import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
  sendPasswordResetEmail,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLHB29MlI_1RgwlcFQEXhaEIWOwpSqN5s",
  authDomain: "sample-firebase-ai-app-847ed.firebaseapp.com",
  projectId: "sample-firebase-ai-app-847ed",
  storageBucket: "sample-firebase-ai-app-847ed.firebasestorage.app",
  messagingSenderId: "857937483062",
  appId: "1:857937483062:web:464bf11ac04eb34578cf97",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

const iniciarSesionConEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { success: true, userCredential };
  } catch (error) {
    console.error(
      "Error en el inicio de sesión:",
      error.code,
      "--",
      error.message
    );
    return { success: false, code: error.code, message: error.message };
  }
};

const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(userCredential.user);
    return { success: true, userCredential };
  } catch (error) {
    console.error("Error en el registro:", error.code, error.message);
    return { success: false, code: error.code, message: error.message };
  }
};

// **Función para eliminar usuarios no verificados después de 5 minutos**
const checkAndDeleteUnverifiedUser = async (user) => {
  try {
    const createdAt = localStorage.getItem("userCreatedAt");
    if (!createdAt) return false; // Si no hay fecha de creación, no eliminamos nada.

    const now = Date.now();
    const MAX_MINUTES = 5;
    const differenceInMinutes = (now - parseInt(createdAt, 10)) / (1000 * 60);

    if (differenceInMinutes >= MAX_MINUTES) {
      localStorage.removeItem("userCreatedAt");

      await deleteUser(user);
      console.log("Cuenta eliminada por falta de verificación.");
      return true; // Indica que el usuario fue eliminado.
    }

    return false; // Indica que el usuario NO fue eliminado.
  } catch (error) {
    console.error("Error al eliminar la cuenta:", error.code, error.message);
    return false;
  }
};

const recuperarContrasena = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: "Correo de recuperación enviado." };
  } catch (error) {
    console.error("Error al recuperar contraseña:", error.code, error.message);
    return { success: false, code: error.code, message: error.message };
  }
};

export {
  auth,
  signInWithGoogle,
  signUpWithEmailAndPassword,
  iniciarSesionConEmail,
  checkAndDeleteUnverifiedUser,
  recuperarContrasena,
};
