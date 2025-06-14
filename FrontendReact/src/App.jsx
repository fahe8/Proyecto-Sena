import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Inicio from "./pages/Inicio/Inicio";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Login/components/ForgotPassword";
import Empresa from "./pages/Empresa/Empresa";
import SideBarPerfil from "./pages/SideBarPerfil/SideBarPerfil";
import Favoritos from "./pages/Favoritos/Favoritos";
import PerfilPage from "./pages/Perfil/Perfil";
import Reservas from "./pages/Reservas/ReservasActivas";
import RutasProtegidas, {
  RutasProtegidasPropietario,
  RutasProtegidasAdmin,
} from "./utils/RutasProtegidas";
import FormularioEmpresa from "./pages/FormularioEmpresa/FormEmpresa";
import HistorialReservas from "./pages/HistorialReservas/HistorialReservas";
import InterfazPropietario from "./pages/PanelPropietario/InterfazPropietario";
import PerfilAdministrador from "./pages/PanelPropietario/PerfilAdministrador";
import ReservasPendientes from "./pages/PanelPropietario/ReservasPendientes";
import ReservasPasadas from "./pages/PanelPropietario/ReservasPasadas";
// import { ProfileIcon } from "./assets/IconosSVG/iconos";
import InterfazAdministrador from "./pages/PanelAdministrador/InterfazAdministrador";
import ListaUsuarios from "./pages/PanelAdministrador/ListaUsuarios";
import ListaEmpresas from "./pages/PanelAdministrador/ListaEmpresas";

import iconoCorazon from "./assets/Perfil/corazon.svg";
import iconoArchivo from "./assets/Perfil/archive.svg";
import iconoReciente from "./assets/Perfil/clockIcon.svg";
import iconoPerfil from "./assets/Perfil/iconoPerfil.svg";
import users from "./assets/Perfil/users.svg";
import IconoHome from "./assets/Inicio/Home.svg";
import business from "./assets/Perfil/business.svg";
import AgregarCancha from "./pages/PanelPropietario/Componentes/AgregarCancha";
import ResetPassword from "./pages/Login/components/ResetPassword";
import LoginEmpresa from "./pages/LoginEmpresa/LoginEmpresa";

function App() {
  const opcionesUsuario = [
    {
      nombre: "Inicio",
      icono: IconoHome,
      url: "/",
    },
    {
      nombre: "Información Personal",
      icono: iconoPerfil,
      url: "/perfil",
    },
    {
      nombre: "Reservas Activas",
      icono: iconoReciente,
      url: "/reservasactivas",
    },
    {
      nombre: "Historial de Reservas",
      icono: iconoArchivo,
      url: "/historialreservas",
    },
    {
      nombre: "Canchas Favoritas",
      icono: iconoCorazon,
      url: "/favoritos",
    },
  ];

  const opcionesEmpresario = [
    {
      nombre: "Inicio",
      icono: IconoHome,
      url: "/interfazpropietario",
    },
    {
      nombre: "Tu perfil ",
      icono: iconoPerfil,
      url: "/perfiladministrador",
    },
    {
      nombre: "Reservas pasadas",
      icono: iconoArchivo,
      url: "/reservaspasadas",
    },
    {
      nombre: "Reservas pendientes",
      icono: iconoReciente,
      url: "/reservaspendientes",
    },
  ];

  const opcionesAdminitrador = [
    {
      nombre: "Inicio",
      icono: IconoHome,
      url: "/",
    },
    {
      nombre: "Perfil",
      icono: iconoPerfil,
      url: "/InterfazAdministrador",
    },
    {
      nombre: "Usuarios registrados",
      icono: users,
      url: "/ListaUsuarios",
    },
    {
      nombre: "Empresas registradas",
      icono: business,
      url: "/ListaEmpresas",
    },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-contrasena" element={<ForgotPassword />} />
        <Route path="/restablecer-contrasena" element={<ResetPassword />} />
        <Route path="/empresa/:id" element={<Empresa />} />
        <Route path="/loginEmpresa" element={<LoginEmpresa />} />
        <Route path="/registro-empresa" element={<FormularioEmpresa />} />
        <Route
          path="/recuperar-contrasena/:token"
          element={<ResetPassword />}
        />
        <Route path="/recuperar-contrasena" element={<ForgotPassword />} />

        {/* Rutas protegidas para USUARIOS */}
        <Route element={<RutasProtegidas />}>
          <Route element={<SideBarPerfil opciones={opcionesUsuario} />}>
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/reservasactivas" element={<Reservas />} />
            <Route path="/historialreservas" element={<HistorialReservas />} />
          </Route>
        </Route>

        {/* Rutas protegidas para PROPIETARIOS */}
        <Route element={<RutasProtegidasPropietario />}>
          <Route element={<SideBarPerfil opciones={opcionesEmpresario} />}>
            <Route
              path="/interfazpropietario"
              element={<InterfazPropietario />}
            />
            <Route
              path="/perfiladministrador"
              element={<PerfilAdministrador />}
            />
            <Route
              path="/reservaspendientes"
              element={<ReservasPendientes />}
            />
            <Route path="/reservaspasadas" element={<ReservasPasadas />} />
            <Route path="/formulario-canchas" element={<AgregarCancha />} />

          </Route>
        </Route>

        {/* Rutas protegidas para ADMINISTRADORES */}
        <Route element={<RutasProtegidasAdmin />}>
          <Route element={<SideBarPerfil opciones={opcionesAdminitrador} />}>
            <Route
              path="/InterfazAdministrador"
              element={<InterfazAdministrador />}
            />
            <Route path="/ListaUsuarios" element={<ListaUsuarios />} />
            <Route path="/ListaEmpresas" element={<ListaEmpresas />} />
          </Route>
        </Route>

        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
