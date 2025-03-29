import React, { useState } from "react";
import { useAuth } from "../../Provider/AuthProvider";
import { useUsuario } from "../../Provider/UsuarioProvider";
import lapizIcon from "../../assets/Perfil/lapiz.svg";

const PerfilPage = () => {
  const { isAuthenticated } = useAuth();
  const { usuario } = useUsuario();
  const [editando, setEditando] = useState(false);

  const toggleEdicion = () => {
    setEditando(!editando);
  };

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-full h-screen container  mx-auto">
      <div className="flex flex-col  items-center  w-full h-screen">
        <h1>MI INFORMACIÓN PERSONAL</h1>
        <div className="relative overflow-hidden w-28 h-28 flex items-center justify-center bg-purple-300 rounded-full group">
          <p className=" text-7xl">{usuario.nombre[0]}</p>
          <div className="absolute bottom-0 translate-y-[80%] transition-all duration-300 group-hover:translate-y-[50%] flex justify-center bg-black opacity-40 w-28 h-1/2 rounded-b-full"></div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="size-6 absolute bottom-0 translate-y-[70%] transition-all duration-300 group-hover:translate-y-[0%]"
          >
            <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
            <path
              fillRule="evenodd"
              d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="border-2 border-black w-[800px] h-auto rounded-2xl relative py-6 px-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Nombre(s)</label>
              {editando ? (
                <input
                  type="text"
                  name="nombre"
                  value={usuario.nombre}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-2xl"
                />
              ) : (
                <p className="w-full p-2 bg-gray-300 rounded-2xl">
                  {usuario.nombre}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-semibold">Apellido(s)</label>
              {editando ? (
                <input
                  type="text"
                  name="apellido"
                  value={usuario.apellido}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-2xl"
                />
              ) : (
                <p className="w-full p-2 bg-gray-300 rounded-2xl">
                  {usuario.apellido}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <label className="text-sm font-semibold">
                Correo electrónico
              </label>
              {editando ? (
                <input
                  type="email"
                  name="email"
                  value={usuario.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-2xl"
                />
              ) : (
                <p className="w-full p-2 bg-gray-300 rounded-2xl">
                  {usuario.email}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <label className="text-sm font-semibold">Teléfono</label>
              {editando ? (
                <input
                  type="tel"
                  name="telefono"
                  value={usuario.telefono}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-2xl"
                />
              ) : (
                <p className="w-full p-2 bg-gray-300 rounded">
                  {usuario.telefono === "" ? "No hay número" : usuario.telefono}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={toggleEdicion}
            className="absolute bg-blue-500 text-white p-2 rounded-tr-xl rounded-bl-xl  top-0 right-0 flex "
          >
            <span>{editando ? "Guardar" : "Editar"}</span>
            <img width={28} src={lapizIcon} alt="Icono de un lapiz para editar la información del usuario" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;
