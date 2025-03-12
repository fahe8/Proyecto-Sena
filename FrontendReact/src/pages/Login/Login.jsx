// Importaciones iniciales de React y componentes necesarios
import React, { useState, useEffect } from "react";  // Importa React y los hooks useState y useEffect
import "./Login.css";  // Importa los estilos CSS para este componente
import { useNavigate } from "react-router-dom";  // Hook para la navegación entre rutas

// Importaciones relacionadas con Firebase Authentication
import {

  signInWithGoogle,  // Función para iniciar sesión con Google
  signUpWithEmailAndPassword,  // Función para registrarse con email y contraseña
  iniciarSesionConEmail,  // Función para iniciar sesión con email
  recuperarContrasena,  // Función para recuperar contraseña
  confirmarCambioContrasena,  // Función para confirmar el cambio de contraseña
} from "./firebaseconfig";  // Archivo que contiene la configuración de Firebase

// Importaciones de otros componentes y recursos
import LogPopUp from "./components/logPopUp";  // Componente para mostrar popups
import logogoogle from "../../assets/LogIn/simbolo-de-google.png";  // Imagen del logo de Google

// Importaciones de funciones para interactuar con el backend
import {
  crearUsuarioConEmail,  // Función para crear un usuario en el backend usando email
} from "./fetchBackendLogin";  // Archivo con funciones para comunicarse con el backend
import Loading from "./components/Loading";  // Componente de carga
import { manejarErroresFirebase } from "./manejarErroresFirebase";  // Función para manejar errores de Firebase

// Definición del componente Login
const Login = () => {
  const navigate = useNavigate();  // Hook para navegar entre páginas
  const [register, setRegister] = useState(true);  // Estado para controlar si estamos en modo registro o inicio de sesión
  const [showPassword, setShowPassword] = useState(false);  // Estado para mostrar/ocultar la contraseña
  
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    password: "",  // Contraseña
    email: "",  // Email
    confirmPassword: "",  // Confirmación de contraseña (para registro)
    rememberMe: true,  // Opción "Recuérdame"
  });

  // Estados para controlar popups y carga
  const [showPopUp, setShowPopUp] = useState(false);  // Controla si se muestra o no el popup
  const [popupMessage, setPopupMessage] = useState("");  // Mensaje principal del popup
  const [popupSubText, setPopupSubText] = useState("");  // Texto secundario del popup
  const [loading, setLoading] = useState(false);  // Estado para mostrar el indicador de carga
  
  // Estados para el proceso de recuperación de contraseña
  const [resetPasswordMode, setResetPasswordMode] = useState(false);  // Controla si estamos en modo de recuperación de contraseña
  const [passwordResetEmailSent, setPasswordResetEmailSent] = useState(false);  // Indica si se ha enviado el email de recuperación
  const [resetPasswordToken, setResetPasswordToken] = useState(null);  // Token para resetear la contraseña
  
  // Efecto para verificar si hay un token de reinicio de contraseña en la URL
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);  // Obtiene los parámetros de la URL
    const oobCode = queryParams.get("oobCode");  // Obtiene el código oob (out-of-band, usado por Firebase)
    const mode = queryParams.get("mode");  // Obtiene el modo
    
    // Si estamos en modo resetPassword y hay un código oob, activamos el modo de reinicio de contraseña
    if (mode === "resetPassword" && oobCode) {
      setResetPasswordToken(oobCode);  // Guardamos el token
      setResetPasswordMode(true);  // Activamos el modo de reinicio
      setRegister(false);  // Desactivamos el modo de registro
    }
  }, []);  // Este efecto se ejecuta solo una vez al cargar el componente
  
  // Funciones para navegación
  const stayThere = () => { navigate(0); };  // Recarga la página actual
  const goToHome = () => { navigate("/"); };  // Navega a la página principal

  // Función para manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;  // Extrae propiedades del evento
    setFormData({
      ...formData,  // Mantiene los valores actuales
      [name]: type === "checkbox" ? checked : value,  // Actualiza el campo específico (manejo especial para checkboxes)
    });
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);  // Invierte el estado actual
  };

  // Función principal para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();  // Previene el comportamiento por defecto del formulario
    setLoading(true);  // Muestra el indicador de carga
    let result;  // Variable para almacenar el resultado de las operaciones

    try {
      //Si register es true, vamos a registrar el usuario
    if (register) {
        // Registrar usuario nuevo con email y contraseña
        result = await signUpWithEmailAndPassword(
          formData.email,
          formData.password
        );
        if (!result.success) {
          throw result;  // Si hay un error, lanza el resultado completo
        }

        // Crea el usuario en la base de datos del backend
        const email = { email: formData.email };
        const usuarioCreado = await crearUsuarioConEmail(email);
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
          throw result;  // Si hay error, lanza el resultado
        }

        // Configura el popup de bienvenida
        setPopupMessage("Bienvenido!");
        setPopupSubText("Has iniciado sesión correctamente");
        setShowPopUp(true);
      }
    } catch (error) {
      console.log("El error que llega es:", error);  // Muestra el error en la consola para depuración

      // Asegura que el error tenga un código válido antes de procesarlo
      const mensajeError = error.code
        ? manejarErroresFirebase(error)  // Usa la función para obtener un mensaje de error amigable
        : "Ocurrió un error inesperado.";  // Mensaje genérico para errores sin código

      // Configura el popup de error
      setPopupMessage("Error");
      setPopupSubText(mensajeError);
      setShowPopUp(true);
    } finally {
      setLoading(false);  // Oculta el indicador de carga al terminar, independientemente del resultado
    }
  };

  // Función para iniciar sesión con Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();  // Llama a la función de autenticación con Google
      if (result) {
        const { displayName, telefono, email } = result.user;  // Extrae datos del usuario

        const nombreCompleto = displayName.split(" ");  // Divide el nombre completo en partes separadas

        // Prepara los datos para enviar al backend
        const datosActualizar = {
          email,
          nombre: nombreCompleto[0],  // Primera parte (nombre)
          apellido: nombreCompleto[1],  // Segunda parte (apellido)
          telefono: telefono || "",  // Teléfono o cadena vacía si no existe
        };
        
        // Envía los datos al backend para crear/actualizar el usuario
        const creado = await crearUsuarioConEmail(datosActualizar);
        console.log(creado.message);  // Muestra el mensaje de respuesta en la consola
        
        if (creado) {
          // Si se creó/actualizó el usuario, muestra el popup de bienvenida
          setPopupMessage("Bienvenido!");
          setPopupSubText("Has iniciado sesión correctamente con Google");
          setShowPopUp(true);
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);  // Muestra errores en la consola
    }
  };

  // Función para recuperar contraseña (no se usa actualmente en el código)
  const recuperarContrasenia = async () => {
    await recuperarContrasena(formData.email);  // Llama a la función de recuperación
  };
  
  // Función para activar el modo de recuperación de contraseña
  const handleForgotPassword = (e) => {
    e.preventDefault();  // Previene el comportamiento por defecto
    setResetPasswordMode(true);  // Activa el modo de recuperación
    setPasswordResetEmailSent(false);  // Reinicia el estado de envío de correo
  };

  // Componente para el icono de ojo abierto (mostrar contraseña)
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

  // Componente para el icono de ojo cerrado (ocultar contraseña)
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
  
  // Función para renderizar el formulario de recuperación de contraseña
  const renderResetPasswordForm = () => {
    if (resetPasswordToken) {
      // Formulario para establecer nueva contraseña
      return (
        <>
          <h2 className="register-tittle">Establece una nueva contraseña</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group password-container">
              <label htmlFor="password">Nueva contraseña</label>
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
            
            <div className="form-group password-container">
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <div className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </div>
            </div>
            
            <button type="submit" className="register-button">
              Actualizar contraseña
            </button>
          </form>
          
          <div className="bottom-divider"></div>
          <div className="changeSign">
            <a 
              onClick={() => {
                setResetPasswordMode(false);
                setResetPasswordToken(null);
              }}
              className="login-button"
            >
              Volver al inicio de sesión
            </a>
          </div>
        </>
      );
    } else if (passwordResetEmailSent) {
      // Mensaje de correo enviado
      return (
        <>
          <h2 className="register-tittle">Revisa tu correo</h2>
          <div className="text-center">
            <p className="mb-4">Hemos enviado un enlace de recuperación a tu correo electrónico.</p>
            <p className="mb-4">Por favor, revisa tu bandeja de entrada y sigue las instrucciones.</p>
            <button 
              className="register-button"
              onClick={() => {
                setResetPasswordMode(false);
                setPasswordResetEmailSent(false);
              }}
            >
              Volver al inicio de sesión
            </button>
          </div>
        </>
      );
    } else {
      // Formulario para solicitar recuperación
      return (
        <>
          <h2 className="register-tittle">Recuperar contraseña</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">
                Ingresa tu correo electrónico para recuperar tu contraseña
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" className="register-button">
              Enviar correo de recuperación
            </button>
          </form>
          
          <div className="bottom-divider"></div>
          <div className="changeSign">
            <a 
              onClick={() => setResetPasswordMode(false)}
              className="login-button"
            >
              Volver al inicio de sesión
            </a>
          </div>
        </>
      );
    }
  };

  return (
    <div className="login-container relative">
      <>
        {resetPasswordMode ? (
          renderResetPasswordForm()
        ) : (
          <>
            {register ? (
              <h2 className="register-tittle">Regístrate</h2>
            ) : (
              <h2 className="register-tittle">Inicia sesión</h2>
            )}
          {/* Boton de google */}
            <div className="social-buttons "> 
              <a
                id="google-button"
                className="social-button"
                onClick={handleGoogleLogin} //Boton de google para iniciar o registrarse
              >
                <img src={logogoogle} alt="logo-google" />
                Continuar con Google
              </a>
            </div>

            <div className="divider">o</div>
            {/*Registrar o Iniciar sesion con correo y contraseña*/}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="text-green-600! font-semibold tracking-wide">
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
                <label htmlFor="password" className="text-green-600! font-semibold tracking-wide">Contraseña</label>
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
                  onClick={handleForgotPassword}
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
                className={`login-button `}
              >
                {register ? "Iniciar sesión" : "Registrarse"}
              </a>
            </div>
          </>
        )}

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
            onClose={() => (popupMessage === "Error" ? stayThere() : goToHome())}
          />
        )}
      </>
    </div>
  );
}
export default Login;
