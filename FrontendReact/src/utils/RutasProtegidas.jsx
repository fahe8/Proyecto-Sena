
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import React from "react";
import Loading from "../pages/Login/components/Loading";
import SinPermisos from "./SinPermisos";

// Rutas protegidas para usuarios
const RutasProtegidas = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div className="h-screen flex justify-center items-center">{<Loading/>}</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.rol_actual !== 'usuario') {
    return <SinPermisos rolRequerido="usuario" loginUrl="/login" />;
  }

  return <Outlet />;
};

// Rutas protegidas para propietarios
export const RutasProtegidasPropietario = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div className="h-screen flex justify-center items-center">{<Loading/>}</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/loginEmpresa" replace />;
  }

  if (user?.rol_actual !== 'propietario') {
    return <SinPermisos rolRequerido="propietario" loginUrl="/loginEmpresa" />;
  }

  return <Outlet />;
};

// Rutas protegidas para administradores
export const RutasProtegidasAdmin = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div className="h-screen flex justify-center items-center">{<Loading/>}</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.rol_actual !== 'admin') {
    return <SinPermisos rolRequerido="admin" loginUrl="/login" />;
  }

  return <Outlet />;
};

export default RutasProtegidas;
