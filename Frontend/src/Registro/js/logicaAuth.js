const API_URL = "http://localhost:8001/api/auth"; // Cambia esto por la URL de tu backend
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/iniciarsesion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Importante: incluye las cookies
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error en el inicio de sesión");
    }

    alert("Inicio de sesión exitoso");
    window.location.href = "/src/Inicio/inicio.html";
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message);
  }
}

export async function registerUser(nombre, telefono, email, password) {
  try {
    const response = await fetch(`${API_URL}/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, telefono, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error en el registro");
    }

    alert("Registro exitoso. Ahora inicia sesión.");
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message);
  }
}
