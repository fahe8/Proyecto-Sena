import { loginUser, registerUser } from "./logicaAuth.js";

document
  .getElementById("btn__iniciar-sesion")
  .addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);

var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(
  ".contenedor__login-register"
);
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

window.addEventListener("load", function () {
  var seleccion = localStorage.getItem("seleccion"); // Obtener la selección
  console.log(seleccion);
  if (seleccion === "inicioSesion") {
    iniciarSesion(); // Si la selección es "login", mostrar el formulario de inicio de sesión
  } else if (seleccion === "registro") {
    register(); // Si la selección es "register", mostrar el formulario de registro
  }
});

function anchoPage() {
  if (window.innerWidth > 850) {
    caja_trasera_register.style.display = "block";
    caja_trasera_login.style.display = "block";
  } else {
    caja_trasera_register.style.display = "block";
    caja_trasera_register.style.opacity = "1";
    caja_trasera_login.style.display = "none";
    formulario_login.style.display = "block";
    contenedor_login_register.style.left = "0px";
    formulario_register.style.display = "none";
  }
}

anchoPage();

function iniciarSesion() {
  if (window.innerWidth > 850) {
    formulario_login.style.display = "block";
    contenedor_login_register.style.left = "10px";
    formulario_register.style.display = "none";
    caja_trasera_register.style.opacity = "1";
    caja_trasera_login.style.opacity = "0";
  } else {
    formulario_login.style.display = "block";
    contenedor_login_register.style.left = "0px";
    formulario_register.style.display = "none";
    caja_trasera_register.style.display = "block";
    caja_trasera_login.style.display = "none";
  }
}

function register() {
  if (window.innerWidth > 850) {
    formulario_register.style.display = "block";
    contenedor_login_register.style.left = "410px";
    formulario_login.style.display = "none";
    caja_trasera_register.style.opacity = "0";
    caja_trasera_login.style.opacity = "1";
  } else {
    formulario_register.style.display = "block";
    contenedor_login_register.style.left = "0px";
    formulario_login.style.display = "none";
    caja_trasera_register.style.display = "none";
    caja_trasera_login.style.display = "block";
    caja_trasera_login.style.opacity = "1";
  }
}
document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault(); // Evitar que el formulario se envíe y recargue la página
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;
  console.log(email, password);
  loginUser(email, password);
});

document
  .getElementById("formRegister")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe y recargue la página
    const nombre = document.getElementById("nombreRegister").value;
    const telefono = document.getElementById("telefonoRegister").value;
    const email = document.getElementById("emailRegister").value;
    const password = document.getElementById("passwordRegister").value;
    console.log(nombre, telefono, email, password);
    registerUser(nombre, telefono, email, password);
  });
