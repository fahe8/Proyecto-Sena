import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerUsuarios from "./src/Usuarios/routes/UsuarioRoutes.js";
import routerPropieatarios from "./src/Propietario/PropietarioRoutes.js";
import routerEmpresa from "./src/Empresa/routes/EmpresaRoutes.js";
// import routerCancha from "./src/Cancha/routes/CanchaRoutes.js";
// import routerReserva from "./src/Reserva/routes/ReservaRoutes.js";
import sequelize from "./src/config/db.js";
import iniciarAsociaciones from "./src/config/asociaciones.js";
import cookieParser from "cookie-parser";
import { TipoDocumento } from "./src/models/TipoDocumento.js";
import { Servicio } from "./src/models/Servicio.js";
import { TipoCancha } from "./src/models/TipoCancha.js";
import { EstadoEmpresa } from "./src/models/EstadoEmpresa.js";
import { EstadoCancha } from "./src/models/EstadoCancha.js";

dotenv.config();
const app = express();
//El cors es para permitir  uso de la api a otras url
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api/usuarios", routerUsuarios);
app.use("/api/propietarios", routerPropieatarios);
app.use("/api/empresas", routerEmpresa);

// Configurar asociaciones
iniciarAsociaciones();

//Correr servidor
const PORT = process.env.PORT || 8001;

sequelize.sync({ force: false }).then(async () => {
  // // Insertar datos iniciales si no existen
  // await TipoDocumento.bulkCreate(
  //   [{ id_tipoDocumento: "CC" }, { id_tipoDocumento: "TI" }],
  //   { ignoreDuplicates: true }
  // );

  // await Servicio.bulkCreate(
  //   [
  //     { id_servicio: 1, tipo: "Cafetería" },
  //     { id_servicio: 2, tipo: "Baños" },
  //     { id_servicio: 3, tipo: "Parqueadero" },
  //     { id_servicio: 4, tipo: "PetFriendly" },
  //     { id_servicio: 5, tipo: "Iluminación" },
  //     { id_servicio: 6, tipo: "Wifi" },
  //     { id_servicio: 7, tipo: "Vestidores" },
  //     { id_servicio: 8, tipo: "Seguridad" },
  //   ],
  //   { ignoreDuplicates: true }
  // );

  // await TipoCancha.bulkCreate(
  //   [
  //     { id_tipo_cancha: "Futbol 5" },
  //     { id_tipo_cancha: "Futbol 7" },
  //     { id_tipo_cancha: "Futbol 9" },
  //     { id_tipo_cancha: "Futbol 11" },
  //   ],
  //   { ignoreDuplicates: true }
  // );

  // await EstadoEmpresa.bulkCreate(
  //   [{ id_estado_empresa: "abierto" }, { id_estado_empresa: "cerrado" }],
  //   { ignoreDuplicates: true }
  // );

  // await EstadoCancha.bulkCreate(
  //   [{ id_estado_cancha: "disponible" }, { id_estado_cancha: "mantenimiento" }],
  //   { ignoreDuplicates: true }
  // );

  // console.log("Datos insertados correctamente.");

  app.listen(PORT, () => {
    console.log("Corriendo en el puerto:", PORT);
  });
});
