import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogPopUp from "./components/logPopUp";
import Loading from "./components/Loading";
import LazyBackground from "../../utils/LazyBackground.jsx";
import { manejarErroresFirebase } from "./manejarErroresFirebase";
import { authServicio, usuarioServicio } from "../../services/api.js";
import GoogleLoginButton from "./components/GoogleLoginButton";
import AuthForm from "./components/AuthForm";
import LoginHeader from "./components/LoginHeader";
import LoginFooter from "./components/LoginFooter";
import Divider from "./components/Divider";
import axios from "axios";
import { useAuth } from "../../Provider/AuthProvider.jsx";
import BackToHome from "../../components/BackToHome.jsx";

// Definición del componente Login
const Login = () => {
  const { guardarToken, setUser, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [register, setRegister] = useState(true);

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    confirmPassword: "",
    rememberMe: true,
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  //Guardar la informacion del popup
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    subText: "",
  });

  const [loading, setLoading] = useState(false);

  const stayThere = () => {};
  const goToHome = () => {
    navigate("/");
  };

  // Función para manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    
    // Limpiar errores cuando el usuario empiece a escribir
    if (error[name]) {
      setError({
        ...error,
        [name]: "",
      });
    }
  };

  // La validación de contraseña se maneja en AuthForm.jsx

  // Función principal para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // La validación de contraseña se maneja en AuthForm.jsx
    
    setLoading(true);
    try {
      if (register) {
        // Si está en modo registro, maneja el registro de usuarios
        await handleRegistration();
      } else {
        // Si está en modo inicio de sesión, maneja el inicio de sesión
        await handleLogin();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Función para manejar el registro de usuarios
  const handleRegistration = async () => {
    const { email, password } = formData;

    const userData = {
      email,
      password,
    };
    try {
      const response = await authServicio.registroUsuario(
        JSON.stringify(userData)
      );
      guardarToken(response.data.data.token);
      setUser(response.data.data.usuario);
      setIsAuthenticated(true);
      showSuccessMessage(
        "Registro exitoso",
        "Ahora confirma tu correo electrónico para completar el registro."
      );
      console.log("Registro exitoso:", response.data);
    } catch (error) {
      handleError(error);
    }
  };

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    const { email, password } = formData;

    const userData = {
      role: "usuario",
      email,
      password,
    };

    try {
      const response = await authServicio.loginUsuario(
        JSON.stringify(userData)
      );
      guardarToken(response.data.data.token);
      setUser(response.data.data.usuario);
      setIsAuthenticated(true);
      showSuccessMessage("Inicio de sesión exitoso", "Bienvenido de nuevo.");
      console.log("Inicio de sesión exitoso:", response.data);
    } catch (error) {
      handleError(error);
    }
  };

  // Función para mostrar mensajes de éxito
  const showSuccessMessage = (title, message) => {
    // Gaurdar en navigate la url de redirigiemiento y la información del popup
    navigate("/", {
      state: {
        showPopup: true,
        popupMessage: title,
        popupSubText: message,
      },
    });
  };

  // Función para mostrar mensajes de error
  const showErrorMessage = (message) => {
    setPopup({
      show: true,
      message: "Error",
      subText: message,
    });
  };

  // Función para manejar errores
  const handleError = (error) => {
    console.log("El error que llega es:", error);

    // Asegura que el error tenga un código válido antes de procesarlo
    const mensajeError = "Ocurrió un error inesperado.";

    showErrorMessage(mensajeError);
  };

  return (
    <LazyBackground
      imageUrl="/src/assets/LogIn/background.webp"
      className="p-0 m-0 relative bg-cover w-screen h-screen"
    >
      <div className="flex absolute w-screen h-screen bg-[#00000037] items-center z-20">
        <div className="relative w-110 p-[30px] px-10 bg-white rounded-[8px] font-[Arial] m-0 mx-auto shadow-md z-10">
          <BackToHome />

          <LoginHeader register={register} />
          <AuthForm
            register={register}
            formData={formData}
            errors={error}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />

          <LoginFooter
            register={register}
            toggleRegister={() => setRegister(!register)}
          />
        </div>

        {loading && (
          <div className="absolute left-1/2 top-0 translate-x-[-50%] bg-black/50 w-screen h-screen z-50 flex items-center">
            <Loading />
          </div>
        )}

        {popup.show && (
          <LogPopUp
            setShowPopUp={(show) => setPopup({ ...popup, show })}
            message={popup.message}
            subText={popup.subText}
            onClose={() =>
              popup.message === "Error" ? stayThere() : goToHome()
            }
          />
        )}
      </div>
    </LazyBackground>
  );
};

export default Login;