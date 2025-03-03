import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,sendEmailVerification } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDLHB29MlI_1RgwlcFQEXhaEIWOwpSqN5s",
    authDomain: "sample-firebase-ai-app-847ed.firebaseapp.com",
    projectId: "sample-firebase-ai-app-847ed",
    storageBucket: "sample-firebase-ai-app-847ed.firebasestorage.app",
    messagingSenderId: "857937483062",
    appId: "1:857937483062:web:464bf11ac04eb34578cf97"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

const iniciarSesionConEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    alert("Inició sesión:"+ user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    alert("Error:"+ error.message)
  });
}

const signUpWithEmailAndPassword =  (email, password) => {

    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {

        const user = userCredential.user;
        console.log(user);
        await sendEmailVerification(user);
        localStorage.setItem("userCreatedAt", Date.now());
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
}

const checkAndDeleteUnverifiedUser = async () => {
    const user = auth.currentUser;
  
    if (user && !user.emailVerified) {
      const createdAt = new Date(parseInt(localStorage.getItem("userCreatedAt"))); 
      const now = new Date();
      const MAX_MINUTES = 5;
      const differenceInMinutes = (now - createdAt) / (1000 * 60);
  
      if (differenceInMinutes >= MAX_MINUTES) {
        try {         
          await deleteUser(user);
          console.log("Cuenta eliminada por falta de verificación.");
        } catch (error) {
          console.error("Error al eliminar la cuenta:", error.message);
        }
      }
    }
  };
  
 
  onAuthStateChanged(getAuth(), () => {
    checkAndDeleteUnverifiedUser();
  });


export { auth, signInWithGoogle, signUpWithEmailAndPassword, iniciarSesionConEmail};