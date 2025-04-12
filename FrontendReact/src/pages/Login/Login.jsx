import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import {
  signInWithGoogle,
  signUpWithEmailAndPassword,
  iniciarSesionConEmail,
} from "./firebaseconfig";

import LogPopUp from "./components/logPopUp";
import logogoogle from "../../assets/LogIn/simbolo-de-google.png";

// Importaciones de funciones para interactuar con el backend
import Loading from "./components/Loading"; // Componente de carga
import { manejarErroresFirebase } from "./manejarErroresFirebase"; // Función para manejar errores de Firebase
import LazyBackground from "../../utils/LazyBackground.jsx";
import { LetterIcon, KeyIcon, EyeIcon, EyeOffIcon } from "../../assets/IconosSVG/iconos.jsx"; // Iconos para el formulario
import { usuarioServicio } from "../../services/api.js";
import axios from "axios";

// Definición del componente Login
const Login = () => {
  const navigate = useNavigate(); // Hook para navegar entre páginas
  const [register, setRegister] = useState(true); // Estado para controlar si estamos en modo registro o inicio de sesión
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    confirmPassword: "", 
    rememberMe: true, 
  });

  const [showPopUp, setShowPopUp] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSubText, setPopupSubText] = useState("");
  const [loading, setLoading] = useState(false);

  const stayThere = () => {
    navigate(0);
  };
  const goToHome = () => {
    navigate("/");
  };

  // Función para manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; // Extrae propiedades del evento
    setFormData({
      ...formData, // Mantiene los valores actuales
      [name]: type === "checkbox" ? checked : value, // Actualiza el campo específico (manejo especial para checkboxes)
    });
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Invierte el estado actual
  };

  // Función principal para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    setLoading(true); // Muestra el indicador de carga
    let result; // Variable para almacenar el resultado de las operaciones

    try {
      //Si register es true, vamos a registrar el usuario
      if (register) {
        // Registrar usuario nuevo con email y contraseña
        result = await signUpWithEmailAndPassword(
          formData.email,
          formData.password
        );
        if (!result.success) {
          throw result; // Si hay un error, lanza el resultado completo
        }
        console.log( result.userCredential.user.accessToken)
        // Crea el usuario en la base de datos del backend
        const usuarioCrear = { email: formData.email, token: result.userCredential.user.accessToken };
        
        // const usuarioCreado = await usuarioServicio.crear(usuarioCrear);
        const usuarioCreado =await  axios.post("http://127.0.0.1:8000/api/usuarios", usuarioCrear);

        if (usuarioCreado) {
          // Si el usuario se crea correctamente se muestra el mensaje de éxito
          setPopupMessage("Felicidades!");
          setPopupSubText("Tu usuario se creó correctamente.");
          setShowPopUp(true);
        }
      } else {
        // Iniciar sesión con email y contraseña existentes
        result = await iniciarSesionConEmail(formData.email, formData.password);
        if (!result.success) {
          throw result; // Si hay error, lanza el resultado
        }

        // Configura el popup de bienvenida
        setPopupMessage("Bienvenido!");
        setPopupSubText("Has iniciado sesión correctamente");
        setShowPopUp(true);
      }
    } catch (error) {
      console.log("El error que llega es:", error); // Muestra el error en la consola para depuración

      // Asegura que el error tenga un código válido antes de procesarlo
      const mensajeError = error.code
        ? manejarErroresFirebase(error) // Usa la función para obtener un mensaje de error amigable
        : "Ocurrió un error inesperado."; // Mensaje genérico para errores sin código

      // Configura el popup de error
      setPopupMessage("Error");
      setPopupSubText(mensajeError);
      setShowPopUp(true);
    } finally {
      setLoading(false); // Oculta el indicador de carga al terminar, independientemente del resultado
    }
  };

  // Función para iniciar sesión con Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle(); // Llama a la función de autenticación con Google
      if (result) {
        const { displayName, telefono, email } = result.user; // Extrae datos del usuario

        const nombreCompleto = displayName.split(" "); // Divide el nombre completo en partes separadas

        // Prepara los datos para enviar al backend
        const datosActualizar = {
          email,
          nombre: nombreCompleto[0], // Primera parte (nombre)
          apellido: nombreCompleto[1], // Segunda parte (apellido)
          telefono: telefono || "", // Teléfono o cadena vacía si no existe
        };

        // Envía los datos al backend para crear/actualizar el usuario
        const creado = await usuarioServicio.crear(datosActualizar);
        console.log(creado.message); // Muestra el mensaje de respuesta en la consola

        if (creado) {
          // Si se creó/actualizó el usuario, muestra el popup de bienvenida
          setPopupMessage("Bienvenido!");
          setPopupSubText("Has iniciado sesión correctamente con Google");
          setShowPopUp(true);
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error); // Muestra errores en la consola
    }
  };

  return (
    <LazyBackground  imageUrl="/src/assets/LogIn/background.webp" className="container-login w-screen h-screen">
      {" "}
      <div className="w-screen h-screen filtro flex items-center">
        <div className="login-container relative">
          {register ? (
            <h2 className="register-tittle">Regístrate</h2>
          ) : (
            <h2 className="register-tittle">Inicia sesión</h2>
          )}
          <div className="social-buttons">
            <a
              id="google-button"
              className="social-button"
              onClick={handleGoogleLogin} >
              <img src={logogoogle} alt="logo-google" />
              Continuar con Google
            </a>
          </div>

          <div className="divider">o</div>

          <form onSubmit={handleSubmit}>
            <div className="form-group relative">
              <div className="icon-input">
                <LetterIcon />
              </div>
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu correo electrónico..."
                required
              />
            </div>

            <div className="form-group password-container">
              <label htmlFor="password">Contraseña</label>
              <div className="icon-input">
                <KeyIcon />
              </div>
              <input type={showPassword ? "text" : "password"} id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña..."
                required
              />
              <div className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </div>
            </div>

            <div className="aditional-options">
              <a href="#" className={`forgot-password ${
                  register ? "hidden-button" : "block-button"
                }`}>Olvidó su contraseña</a>

              <div className="remember-me">
                <input type="checkbox" id="rememberMe" name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}/>
                <label htmlFor="rememberMe">Recuérdame</label>
              </div>
            </div>

            <button type="submit" className="register-button">
              {register ? "Registrarse" : "Iniciar sesión"}
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
              className={`login-button`}>
              {register ? "Iniciar sesión" : "Registrarse"}
            </a>
          </div>
        </div>

        {loading && (
          <div className="absolute left-1/2 top-0 translate-x-[-50%] bg-black/50 w-screen h-screen z-50 flex items-center">
            <Loading />
          </div>
        )}

        {showPopUp && (
          <LogPopUp
            setShowPopUp={setShowPopUp}
            message={popupMessage}
            subText={popupSubText}
            onClose={() =>
              popupMessage === "Error" ? () =>{} : goToHome()
            }
          />
        )}
      </div>
    </LazyBackground>
  );
}
  export default Login;
