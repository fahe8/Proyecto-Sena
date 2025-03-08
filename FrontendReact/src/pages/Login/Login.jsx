import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import {
  auth,
  signInWithGoogle,
  signUpWithEmailAndPassword,
  iniciarSesionConEmail,
  recuperarContrasena,
} from "./firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import LogPopUp from "./components/logPopUp";
import logogoogle from "../../assets/LogIn/simbolo-de-google.png";

import {
  actualizarDatosUsuario,
  crearUsuarioConEmail,
} from "./fetchBackendLogin";

const Login = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    rememberMe: true,
  });

  const [isAuthenticated] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          setToken(token);
        });
      } else {
        console.log("Usuario no autenticado");
      }
    });
  }, []);


  //Guardar la informacion de los inputs en el state
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  //Ver o ocultar la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const [showPopUp, setShowPopUp] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSubText, setPopupSubText] = useState ("");

  //Registrar el usuario correo y contraseña al firebaseAuth y crear el usuario en la base de datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (register) {
      try {
        const usuarioCreado = await signUpWithEmailAndPassword(
          formData.email,
          formData.password
        );
        if (usuarioCreado) {
          const email = { email: formData.email };
          const usuarioCreado = await crearUsuarioConEmail(email);
          if (usuarioCreado) {
            setPopupMessage ("Felicidades!");
            setPopupSubText ("Tu usuario se creó correctamente.");
            setShowPopUp(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      //Iniciar sesion
      try {
        iniciarSesionConEmail(formData.email, formData.password);
        setPopupMessage("Bienvenido!");
        setPopupSubText("Has iniciado sesión correctamente");
        setShowPopUp (true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  //Iniciar sesion con google y crear el usuario en la base de datos
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      window.localStorage.setItem("auth", "true");

      if (result) {
        const { displayName, telefono, email } = result.user;
        const nombreCompleto = displayName.split(" ");
        const datosActualizar = {
          email,
          nombre: nombreCompleto[0],
          apellido: nombreCompleto[1],
          telefono: telefono || "",
        };
        const creado = await crearUsuarioConEmail(datosActualizar);
        console.log(creado.message);
        if (creado) {
          setPopupMessage("Bienvenido!");
          setPopupSubText("Has iniciado sesión correctamente con Google");
          setShowPopUp(true);
          
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  //Recuperar contrasena
  const recuperarContrasenia = async () => {
    await recuperarContrasena(formData.email);
  };

  const EyeIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

  return (
    <div className="login-container">
      <>
        {register ? (
          <h2 className="register-tittle">Regístrate</h2>
        ) : (
          <h2 className="register-tittle">Inicia sesión</h2>
        )}

        <div className="social-buttons ">
          <a
            id="google-button"
            className="social-button"
            onClick={handleGoogleLogin}
          >
            <img src={logogoogle} alt="logo-google" />
            Continuar con Google
          </a>
        </div>

        <div className="divider">o</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              Correo electrónico
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group password-container">
            <label htmlFor="password">Contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </div>
          </div>

          <div className="aditional-options">
            <a
              href="#"
              onClick={recuperarContrasenia}
              className={`forgot-password ${
                register ? "hidden-button" : "block-button"
              }`}
            >
              Olvidó su contraseña
            </a>
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Recuérdame</label>
            </div>
          </div>

          <button type="submit" className="register-button">
            {register ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </form>

        <div className="bottom-divider"></div>
        <div className="changeSign">
          <p className={`login-prompt`}>
            {register ? "¿Ya tienes una cuenta?" : "¿Eres nuevo aquí?"}
          </p>
          <a
            onClick={() => {
              setRegister(!register);
            }}
            className={`login-button `}
          >
            {register ? "Iniciar sesión" : "Registrarse"}
          </a>
          
          {showPopUp && <LogPopUp setShowPopUp={setShowPopUp} 
          message={popupMessage} 
          subText={popupSubText}
          onClose={() => navigate("/")} />}
            
        </div>
      </>
      
    </div>
  );
};

export default Login;
