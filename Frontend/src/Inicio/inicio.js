const menuItems = [
  {
    text: "Historial de reservas",
    ref: "/1",
    icon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-arrow-up">
          <path d="M13.228 21.925A10 10 0 1 1 21.994 12.338" />
          <path d="M12 6v6l1.562.781" />
          <path d="m14 18 4-4 4 4" />
          <path d="M18 22v-8" />
        </svg>`,
  },
  {
    text: "Reservas pendientes",
    ref: "/2",
    icon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-down">
          <path d="M17 14V2" />
          <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/>
        </svg>`,
  },
  {
    text: "Mis favoritos",
    ref: "/",
    icon: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
        </svg>`,
  },
  {
    text: "No recomendarme",
    ref: "/",
    icon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-down">
          <path d="M17 14V2" />
          <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/>
        </svg>`,
  },
];

const canchas = [
  {
    nombre: "Canchas la 64",
    tiposCanchas: "Futbol 5, 6, 7 y 8",
    calificacion: "4.8",
    imagen: "../assets/cancha.jpeg",
  },
  {
    nombre: "Canchas la 64",
    tiposCanchas: "Futbol 5, 6, 7 y 8",
    calificacion: "4.8",
    imagen: "../assets/cancha.jpeg",
  },
  {
    nombre: "Canchas la 64",
    tiposCanchas: "Futbol 5, 6, 7 y 8",
    calificacion: "4.8",
    imagen: "../assets/cancha.jpeg",
  },
  {
    nombre: "Canchas la 64",
    tiposCanchas: "Futbol 5, 6, 7 y 8",
    calificacion: "4.8",
    imagen: "../assets/cancha.jpeg",
  },
  {
    nombre: "Canchas la 64",
    tiposCanchas: "Futbol 5, 6, 7 y 8",
    calificacion: "4.8",
    imagen: "../assets/cancha.jpeg",
  },
  {
    nombre: "Canchas la 64",
    tiposCanchas: "Futbol 5, 6, 7 y 8",
    calificacion: "4.8",
    imagen: "../assets/cancha.jpeg",
  },
  {
    nombre: "Canchas la 64",
    tiposCanchas: "Futbol 5, 6, 7 y 8",
    calificacion: "4.8",
    imagen: "../assets/cancha.jpeg",
  },
  {
    nombre: "Canchas la 64",
    tiposCanchas: "Futbol 5, 6, 7 y 8",
    calificacion: "4.8",
    imagen: "../assets/cancha.jpeg",
  },
  {
    nombre: "Canchas la 64",
    tiposCanchas: "Futbol 5, 6, 7 y 8",
    calificacion: "4.8",
    imagen: "../assets/cancha.jpeg",
  },
  {
    nombre: "Canchas la 64",
    tiposCanchas: "Futbol 5, 6, 7 y 8",
    calificacion: "4.8",
    imagen: "../assets/cancha.jpeg",
  },
  {
    nombre: "Canchas la 64",
    tiposCanchas: "Futbol 5, 6, 7 y 8",
    calificacion: "4.8",
    imagen: "../assets/cancha.jpeg",
  },
  {
    nombre: "Canchas la 64",
    tiposCanchas: "Futbol 5, 6, 7 y 8",
    calificacion: "4.8",
    imagen: "../assets/cancha.jpeg",
  },
  {
    nombre: "Canchas la 64",
    tiposCanchas: "Futbol 5, 6, 7 y 8",
    calificacion: "4.8",
    imagen: "../assets/cancha.jpeg",
  },
];

const menuList = document.getElementById("menu-lista");
const canchasSection = document.getElementById("canchas-seccion");

menuItems.forEach((item, index) => {
  const li = document.createElement("li");
  li.classList.add("flex", "flex-col", "gap-2");

  const borderClass =
    index === menuItems.length - 1 ? "" : "border-b-2 border-gray-300";

  li.innerHTML = `<a class="flex px-6 py-8 gap-2 justify-center ${borderClass} 
                    hover:bg-gray-200 hover:text-green-500 
                    transition-colors duration-300" 
                    href="${item.ref}">
                    <span>${item.text}</span> 
                    ${item.icon}
                  </a>`;

  menuList.appendChild(li);
});

canchas.forEach((cancha) => {
  const div = document.createElement("div");
  div.classList.add(
    "w-56",
    "bg-white",
    "rounded-2xl",
    "shadow-lg",
    "overflow-hidden",
    "hover:scale-105",
    "transition-transform",
    "duration-300"
  );

  div.innerHTML = `
    <div class="relative">
      <img src="${cancha.imagen}" alt="${cancha.nombre}" />
      <button class="absolute top-3 right-3 group text-gray-500 hover:text-red-500">
       <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" 
    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
    class="size-6 fill-gray-500 group-hover:fill-red-500 transition-colors duration-300">
    <path stroke-linecap="round" stroke-linejoin="round" 
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
      </button>
    </div>

    <div class="bg-white p-3">
      <h3 class=" font-bold">${cancha.nombre}</h3>
      <p class="text-gray-800 text-sm">${cancha.tiposCanchas}</p>
      <div class="flex items-center mt-1 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
</svg>
 <span class="ml-1">${cancha.calificacion}</span>
      </div>
    </div>
  `;

  canchasSection.appendChild(div);
});

const profileButton = document.getElementById("profileButton");
const profileMenu = document.getElementById("profileMenu");

profileButton.addEventListener("click", () => {
  profileMenu.classList.toggle("hidden");
});

document.addEventListener("click", (event) => {
  if (
    !profileButton.contains(event.target) &&
    !profileMenu.contains(event.target)
  ) {
    profileMenu.classList.add("hidden");
  }
});

// Obtener los enlaces de "Registrarse" e "Iniciar sesión"
const registerLink = document.getElementById("registerLink");
const loginLink = document.getElementById("loginLink");

// Guardar la selección de "Registrarse" en localStorage cuando se haga clic en el enlace
registerLink.addEventListener("click", function () {
  localStorage.setItem("seleccion", "registro");
  window.location.href = "/src/Registro/registro.html";
});

// Guardar la selección de "Iniciar sesión" en localStorage cuando se haga clic en el enlace
loginLink.addEventListener("click", function () {
  localStorage.setItem("seleccion", "inicioSesion");
  window.location.href = "/src/Registro/registro.html";
});

