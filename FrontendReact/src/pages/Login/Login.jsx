import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import {
  auth,
  signInWithGoogle,
  signUpWithEmailAndPassword,
  iniciarSesionConEmail,
  recuperarContrasena,
  confirmarCambioContrasena,
} from "./firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import LogPopUp from "./components/logPopUp";
import logogoogle from "../../assets/LogIn/simbolo-de-google.png";

import {
  actualizarDatosUsuario,
  crearUsuarioConEmail,
} from "./fetchBackendLogin";
import Loading from "./components/Loading";
import { manejarErroresFirebase } from "./manejarErroresFirebase";

const Login = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
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
  
  // Estados para el proceso de recuperación de contraseña
  const [resetPasswordMode, setResetPasswordMode] = useState(false);
  const [passwordResetEmailSent, setPasswordResetEmailSent] = useState(false);
  const [resetPasswordToken, setResetPasswordToken] = useState(null);
  
  // Verificar si hay un token de reinicio de contraseña en la URL
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const oobCode = queryParams.get("oobCode");
    const mode = queryParams.get("mode");
    
    if (mode === "resetPassword" && oobCode) {
      setResetPasswordToken(oobCode);
      setResetPasswordMode(true);
      setRegister(false);
    }
  }, []);
  
  const stayThere = () => { navigate(0);};
  const goToHome = () => {navigate("/");};

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

  //Registrar el usuario correo y contraseña al firebaseAuth y crear el usuario en la base de datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let result;

    try {
      // Lógica para el modo de recuperación de contraseña
      if (resetPasswordMode && resetPasswordToken) {
        // Verificar que las contraseñas coincidan
        if (formData.password !== formData.confirmPassword) {
          throw { code: "auth/passwords-dont-match" };
        }
        
        // Cambiar la contraseña utilizando el token
        await confirmarCambioContrasena(resetPasswordToken, formData.password);
        
        setPopupMessage("¡Éxito!");
        setPopupSubText("Tu contraseña ha sido actualizada correctamente.");
        setShowPopUp(true);
        // Limpiamos el token y el modo de reinicio
        setResetPasswordToken(null);
        setResetPasswordMode(false);
      } else if (resetPasswordMode && !resetPasswordToken) {
        // Enviar correo de recuperación
        const resetResult = await recuperarContrasena(formData.email);
        if (!resetResult.success) {
          throw resetResult; 
        }
        
        setPasswordResetEmailSent(true);
        setPopupMessage("Correo enviado");
        setPopupSubText("Te hemos enviado un enlace para restablecer tu contraseña. Por favor, revisa tu bandeja de entrada.");
        setShowPopUp(true);
      } else if (register) {
        // Registrar usuario
        result = await signUpWithEmailAndPassword(
          formData.email,
          formData.password
        );
        if (!result.success) {
          throw result; // Lanzar el objeto result completo en lugar de un Error vacío.
        }

        const email = { email: formData.email };
        const usuarioCreado = await crearUsuarioConEmail(email);
        if (usuarioCreado) { 
          //Si el usuario se crea correctamente se muestra lo siguiente
          setPopupMessage("Felicidades!");
          setPopupSubText("Tu usuario se creó correctamente.");
          setShowPopUp(true);
        }
      } else {
        // Iniciar sesión
        result = await iniciarSesionConEmail(formData.email, formData.password);
        if (!result.success) {
          throw result;
        }

        setPopupMessage("Bienvenido!");
        setPopupSubText("Has iniciado sesión correctamente");
        setShowPopUp(true);
      }
    } catch (error) {
      console.log("El error que llega es:", error);

      // Asegurar que el error tenga un código válido antes de pasarlo a manejarErroresFirebase
      const mensajeError = error.code
        ? manejarErroresFirebase(error)
        : "Ocurrió un error inesperado.";

      setPopupMessage("Error");
      setPopupSubText(mensajeError);
      setShowPopUp(true);
    } finally {
      setLoading(false);
    }
  };

  //Iniciar sesion con google y crear el usuario en la base de datos
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if (result) {
        //si result obtiene al usuario se muestra el popup
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

  //Recuperar contraseña
  const recuperarContrasenia = async () => {
    await recuperarContrasena(formData.email);
  };
  
  // Nueva función para activar el modo de recuperación de contraseña
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setResetPasswordMode(true);
    setPasswordResetEmailSent(false);
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
            onClose={popupMessage === "Error" ? stayThere : goToHome}
          />
        )}
      </>
    </div>
  );
};

export default Login;