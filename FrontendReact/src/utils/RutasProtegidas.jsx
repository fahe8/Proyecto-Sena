
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import React from "react";
import Loading from "../pages/Login/components/Loading";

const RutasProtegidas = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="h-screen flex justify-center items-center">{<Loading/>}</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RutasProtegidas;
