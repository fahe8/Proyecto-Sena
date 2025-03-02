// src/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

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
const facebookProvider = new FacebookAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
const signInWithFacebook = () => signInWithPopup(auth, facebookProvider);


export { auth, signInWithGoogle, signInWithFacebook };