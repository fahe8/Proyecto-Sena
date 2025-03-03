import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "./firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import logogoogle from "../../assets/LogIn/simbolo-de-google.png";
import Listoftodo from "./components/ListOfTodo";

const Login = () => {
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Aquí pondré la lógica para enviar los datos al servidor
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      console.log("Inicio de sesión exitoso:", result.user);
      window.localStorage.setItem("auth", "true");
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
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
      {isAuthenticated ? (
        token ? (
          <Listoftodo token={token} />
        ) : (
          <p>Cargando...</p>
        )
      ) : (
        <>
          <h2 className="register-tittle">Regístrate</h2>

          <div className="social-buttons">
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
                Correo electrónico o nombre de usuario
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
              />
              <div className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </div>
            </div>

            <div className="aditional-options">
              <a href="#" className="forgot-password">
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
              Registrarse
            </button>
          </form>

          <div className="bottom-divider"></div>

          <p className="login-prompt">¿Ya tienes una cuenta?</p>

          <a href="#" className="login-button">
            Iniciar sesión
          </a>
        </>
      )}
    </div>
  );
};

export default Login;
