import express from "express";
import dotenv from "dotenv";
import routerUsuarios from "./src/Usuarios/routes/UsuarioRoutes.js";
import routerEmpresa from "./src/Empresa/routes/EmpresaRoutes.js";
import routerCancha from "./src/Cancha/routes/CanchaRoutes.js";
import routerReserva from "./src/Reserva/routes/ReservaRoutes.js";
import routerAuth from "./src/Auth/routes/AuthRoutes.js";
import sequelize from "./src/config/db.js";
import iniciarAsociaciones from "./src/config/asociaciones.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api/usuarios", routerUsuarios);
app.use("/api/empresas", routerEmpresa);
app.use("/api/canchas", routerCancha);
app.use("/api/reservas", routerReserva);
app.use("/api/auth", routerAuth);

// Configurar asociaciones
iniciarAsociaciones();

//Correr servidor
const PORT = process.env.PORT || 8000;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Corriendo en el puerto:", PORT);
  });
});
