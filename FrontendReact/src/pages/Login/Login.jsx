import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  signInWithGoogle,
  signUpWithEmailAndPassword,
  iniciarSesionConEmail,
} from "./firebaseconfig";

import LogPopUp from "./components/logPopUp";
import Loading from "./components/Loading";
import LazyBackground from "../../utils/LazyBackground.jsx";
import { manejarErroresFirebase } from "./manejarErroresFirebase";
import { usuarioServicio } from "../../services/api.js";
import GoogleLoginButton from "./components/GoogleLoginButton";
import AuthForm from "./components/AuthForm";
import LoginContainer from "./components/LoginContainer";
import LoginHeader from "./components/LoginHeader";
import LoginFooter from "./components/LoginFooter";
import Divider from "./components/Divider";

// Definición del componente Login
const Login = () => {
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

  //Guardar la informacion del popup
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    subText: "",
  });
  
  const [loading, setLoading] = useState(false);

  const stayThere = () => {
    
  };
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
  };

  // Función principal para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (register) {
        await handleRegistration();
      } else {
        await handleLogin();
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el registro de usuarios
  const handleRegistration = async () => {
    // Registrar usuario nuevo con email y contraseña
    const result = await signUpWithEmailAndPassword(
      formData.email,
      formData.password
    );
    
    if (!result.success) {
      throw result;
    }

    // Crea el usuario en la base de datos del backend
    const usuarioCrear = {
      id_usuario: result.userCredential.user.uid,
      email: formData.email,
    };
    
    try {
      const usuarioCreado = await usuarioServicio.crear(JSON.stringify(usuarioCrear));
      
      if (usuarioCreado) {
        showSuccessMessage("Felicidades!", "Tu usuario se creó correctamente.");
      }
    } catch (error) {
      console.log("Error del backend:", error.response?.data);
      showErrorMessage(error.response?.data?.message || "Error al crear el usuario");
      throw error;
    }
  };

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    const result = await iniciarSesionConEmail(formData.email, formData.password);
    
    if (!result.success) {
      throw result;
    }

    // Verificar si el usuario existe en la base de datos
    try {
      await usuarioServicio.obtenerPorId(result.userCredential.user.uid);
      
      // Si llegamos aquí, el usuario existe en la base de datos
      showSuccessMessage("Bienvenido!", "Has iniciado sesión correctamente");
    } catch (error) {
      console.log("Error al buscar usuario:", error);
      
      // Verificar si es un error 404 (usuario no encontrado)
      if (error.response && error.response.status === 404) {
        console.log("Usuario no encontrado en la base de datos, creando...");
        
        // El usuario existe en Firebase pero no en la base de datos
        // Crearlo en la base de datos
        const usuarioCrear = {
          id_usuario: result.userCredential.user.uid,
          email: formData.email,
        };
        
        try {
          const usuarioCreado = await usuarioServicio.crear(JSON.stringify(usuarioCrear));
      
          showSuccessMessage("Bienvenido!", "Tu cuenta ha sido restaurada correctamente");
        } catch (createError) {
          console.log("Error al crear usuario en la base de datos:", createError);
          showErrorMessage("Error al restaurar tu cuenta en el sistema");
          throw createError;
        }
      } else {
        // Si es otro tipo de error, lo lanzamos
        console.log("Error inesperado:", error);
        showErrorMessage("Error al verificar tu cuenta");
        throw error;
      }
    }
  };

  // Función para mostrar mensajes de éxito
  const showSuccessMessage = (title, message) => {
    // Gaurdar en navigate la url de redirigiemiento y la información del popup
    navigate("/", { 
      state: { 
        showPopup: true,
        popupMessage: title,
        popupSubText: message
      } 
    });
  };

  // Función para mostrar mensajes de error
  const showErrorMessage = (message) => {
    setPopup({
      show: true,
      message: "Error",
      subText: message
    });
  };

  // Función para manejar errores
  const handleError = (error) => {
    console.log("El error que llega es:", error);

    // Asegura que el error tenga un código válido antes de procesarlo
    const mensajeError = error.code
      ? manejarErroresFirebase(error)
      : "Ocurrió un error inesperado.";

    showErrorMessage(mensajeError);
  };

  // Función para iniciar sesión con Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle(); 
      if (result) {
        console.log("Este es el result", result.user.uid);
        const { displayName, telefono, email, photoURL } = result.user;
        let usuarioExistente;

        try {
          usuarioExistente = await usuarioServicio.obtenerPorId(result.user.uid);
        } catch (error) {
          if (error.response?.status === 404) {
            usuarioExistente = { success: false, message: "Usuario no encontrado" };
          } else {
            throw error;
          }
        }

        if (usuarioExistente.success === false) {
          const nombreCompleto = displayName.split(" ");
          const datosActualizar = {
            id_usuario: result.user.uid,
            email: email,
            nombre: nombreCompleto[0],
            apellido: nombreCompleto[1]
          };

          // Añadir la URL de la imagen de perfil si existe
          if (photoURL) {
            datosActualizar.imagen = photoURL;
          }

          console.log(datosActualizar);
  
          if (telefono) {
            datosActualizar.telefono = telefono;
          }
  
          const creado = await usuarioServicio.crear(JSON.stringify(datosActualizar));
  
          if (creado) {
            showSuccessMessage("Bienvenido!", "Has iniciado sesión correctamente con Google");
          } 
        } else {
          // Si el usuario ya existía, también mostramos mensaje de bienvenida
          showSuccessMessage("Bienvenido de nuevo!", "Has iniciado sesión correctamente con Google");
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      showErrorMessage(error.response?.data?.message || "Error al autenticar con Google");
    }
  };
  
  return (
    <LazyBackground imageUrl="/src/assets/LogIn/background.webp" className="p-0 m-0 relative bg-cover w-screen h-screen">
      <div className="flex absolute w-screen h-screen bg-[#00000037] items-center z-20">
        <LoginContainer>
          <LoginHeader register={register} />
          
          <div className="flex flex-col gap-[12px] mb-[25px]">
            <GoogleLoginButton onClick={handleGoogleLogin} />
          </div>

          <Divider />

          <AuthForm 
            register={register}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />

          <LoginFooter 
            register={register} 
            toggleRegister={() => setRegister(!register)} 
          />
        </LoginContainer>

        {loading && (
          <div className="absolute left-1/2 top-0 translate-x-[-50%] bg-black/50 w-screen h-screen z-50 flex items-center">
            <Loading />
          </div>
        )}

        {popup.show && (
          <LogPopUp
            setShowPopUp={(show) => setPopup({...popup, show})}
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
}

export default Login;
