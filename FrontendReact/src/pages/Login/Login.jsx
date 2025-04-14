import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithGoogle,
  signUpWithEmailAndPassword,
  iniciarSesionConEmail,
} from "./firebaseconfig";

import LogPopUp from "./components/logPopUp";
import logogoogle from "../../assets/LogIn/simbolo-de-google.png";

// Importaciones de funciones para interactuar con el backend
import {
  crearUsuarioEnBackend, // Función para crear un usuario en el backend usando email
} from "./fetchBackendLogin"; // Archivo con funciones para comunicarse con el backend
import Loading from "./components/Loading"; // Componente de carga
import { manejarErroresFirebase } from "./manejarErroresFirebase"; // Función para manejar errores de Firebase
import LazyBackground from "../../utils/LazyBackground.jsx";
import { LetterIcon, KeyIcon, EyeIcon, EyeOffIcon } from "../../assets/IconosSVG/iconos.jsx"; // Iconos para el formulario

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

        // Crea el usuario en la base de datos del backend
        const email = { email: formData.email };
        const usuarioCreado = await crearUsuarioEnBackend(email);
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
        const creado = await crearUsuarioEnBackend(datosActualizar);
        console.log(creado.message); // Muestra el mensaje de respuesta en la consola

        if (creado) {
          // Si se creó/actualizó el usuario, muestra el popup de bienvenida
          setPopupMessage("Bienvenido!");
          setPopupSubText("Has iniciado con Google");
          setShowPopUp(true);
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error); // Muestra errores en la consola
    }
  };

  return (
    <LazyBackground  imageUrl="/src/assets/LogIn/background.webp" className="p-0 m-0 relative bg-cover w-screen h-screen">
      {" "}
      <div className="flex absolute w-screen h-screen bg-[#00000037] items-center z-20">
        <div className="relative w-110 p-[30px] px-10 bg-white rounded-[8px] font-[Arial] m-0 mx-auto shadow-md z-10">
          <div className="flex justify-start gap-3 items-center mb-[20px]">
            <div className="border-b-2 border-[#003044] px-4 py-[4px] text-[14px] text-[#33ea30] cursor-default">Usuario</div>
            <a href="/formulario-empresa" className=" px-4 py-[4px] hover:border-[#003044] hover:border-b-2 hover:text-[#33ea30] text-[14px]">Empresa</a>
          </div>
          {register ? (
            <h2 className="text-center text-lg mb-5 font-semibold text-[#333]">Regístrate</h2>
          ) : (
            <h2 className="text-center text-lg mb-5 font-semibold text-[#333]">Inicia sesión</h2>
          )}
          <div className="flex flex-col gap-[12px] mb-[25px]">
            <a
              id="google-button"
              className="flex items-center justify-center px-[15px] py-[12px] h-[46px] rounded-full border border-[#00c951] cursor-pointer text-[15px] transition-colors duration-200 text-[#333] bg-white hover:bg-[#d0ffd0]"
              onClick={handleGoogleLogin} >
              <img src={logogoogle} className="h-[20px] w-[20px] mr-[12px] " alt="logo-google" />
              Continuar con Google
            </a>
          </div>

          <div className="flex items-center text-center text-[#777] text-[14px] my-[20px] before:content-[''] before:flex-1 before:mr-[20px] before:border-b before:border-gray-300 after:content-[''] after:flex-1 after:border-b after:border-gray-300 after:ml-[20px]">o</div>

          <form onSubmit={handleSubmit}>
            <div className="relative mb-[20px]">
              <div className="absolute top-[35px] left-[10px] text-[13px] text-[#777] pt-[5px] cursor-pointer">
                <LetterIcon />
              </div>
              <label htmlFor="email" className="block mb-[8px] text-[15px] text-[#555]">Correo electrónico</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu correo electrónico..."
                className="w-full pl-10 pr-4 py-3 h-[46px] border border-gray-300 rounded-md text-[15px]"
                required
              />
            </div>

            <div className="form-group relative">
              <label htmlFor="password" className="block mb-[8px] text-[15px] text-[#555]">Contraseña</label>
              <div className="absolute top-[35px] left-[10px] text-[13px] text-[#777] pt-[5px] cursor-pointer">
                <KeyIcon />
              </div>
              <input type={showPassword ? "text" : "password"} id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña..."
                className="w-full pl-10 pr-4 py-3 h-[46px] border border-gray-300 rounded-md text-[15px]"
                required
              />
              <div className="absolute top-[38px] right-[15px] text-[13px] text-[#777] pt-[5px] cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon /> }
              </div>
            </div>

            <div className="flex items-center justify-between mb-[22px] text-[14px] my-5">
              <a href="#" className={`block text-right text-[#009a3a] text-[14px] no-underline ${
                  register ? "hidden-button" : "block-button"
                }`}>Olvidó su contraseña</a>

              <div className="flex items-center no-underline"> 
                <input type="checkbox" id="rememberMe" name="rememberMe" className="mr-2 ml-[2px] accent-[rgba(9,167,46,0.912)]"
                  checked={formData.rememberMe}
                  onChange={handleChange}/>
                <label htmlFor="rememberMe">Recuérdame</label>
              </div>
            </div>

            <button type="submit" className="w-full h-[46px] bg-[#00c951] border-none text-white text-[16px] rounded-[25px] mb-[15px] cursor-pointer hover:bg-[#05983b] duration-200 transition ease-in-out">
              {register ? "Registrarse" : "Iniciar sesión"}
            </button>
          </form>

          <div className="mb-[20px] mt-[15px] border-b border-[#ddd] "></div>
          <div className="flex justify-between mt-[20px] text-[17px] text-[#555]">
            <p className={` text-[#555]`}>
              {register ? "¿Ya tienes una cuenta?" : "¿Eres nuevo aquí?"}
            </p>
            <a
              onClick={() => {
                setRegister(!register);
              }}
              className={`text-[#00c951] underline cursor-pointer hover:text-[#029d02]`}>
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
              popupMessage === "Error" ? stayThere() : goToHome()
            }
          />
        )}
      </div>
    </LazyBackground>
  );
}
  export default Login;
