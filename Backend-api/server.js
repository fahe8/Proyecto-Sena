import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerUsuarios from "./src/Usuarios/routes/UsuarioRoutes.js";
// import routerEmpresa from "./src/Empresa/routes/EmpresaRoutes.js";
// import routerCancha from "./src/Cancha/routes/CanchaRoutes.js";
// import routerReserva from "./src/Reserva/routes/ReservaRoutes.js";
import sequelize from "./src/config/db.js";
import iniciarAsociaciones from "./src/config/asociaciones.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api/usuarios", routerUsuarios);

// Configurar asociaciones
iniciarAsociaciones();

//Correr servidor
const PORT = process.env.PORT || 8001;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Corriendo en el puerto:", PORT);
  });
});
