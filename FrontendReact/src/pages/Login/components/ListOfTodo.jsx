import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";

export default function ListOfTodo({ token }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.localStorage.removeItem('auth');
      console.log("Cierre de sesión exitoso");
      
      
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div>
      <h1>List of todo</h1>
      <br />
      <button className='bg-red-700 rounded-b-md cursor-pointer' onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}