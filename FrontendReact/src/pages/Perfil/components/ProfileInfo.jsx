import React from "react";
import InfoField from "./InfoField";
import InputField from "./InputField";
import lapizIcon from "../../../assets/Perfil/lapiz.svg";

const ProfileInfo = ({ 
  usuario, 
  editando, 
  handleChange, 
  errores, 
  toggleEdicion, 
  validarInputs 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 relative">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-[#003044]">Información Personal</h3>
        <button
          onClick={editando ? validarInputs : toggleEdicion}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
            editando 
            ? 'bg-[#00c951] hover:bg-[#00a844]' 
            : 'bg-[#003044] hover:bg-[#004466]'
          } text-white shadow-md hover:shadow-lg`}
        >
          <span>{editando ? "Guardar Cambios" : "Editar Perfil"}</span>
          <img width={20} src={lapizIcon} alt="Editar" className="invert" />
        </button>
      </div>

      {!editando ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InfoField
            label="Nombre(s)"
            value={usuario.nombre}
            icon="👤"
            defaultText="No hay nombre registrado"
          />
          <InfoField
            label="Apellido(s)"
            value={usuario.apellido}
            icon="👤"
            defaultText="No hay apellido registrado"
          />
          <InfoField
            label="Correo electrónico"
            value={usuario.email}
            icon="📧"
            defaultText="No hay correo registrado"
          />
          <InfoField
            label="Teléfono"
            value={usuario.telefono}
            icon="📱"
            defaultText="No hay número registrado"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InputField
            label="Nombre(s)"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            error={errores.nombre}
            editable={editando}
            icon="👤"
          />
          <InputField
            label="Apellido(s)"
            name="apellido"
            value={usuario.apellido}
            onChange={handleChange}
            error={errores.apellido}
            editable={editando}
            icon="👤"
          />
          <InputField
            label="Teléfono"
            name="telefono"
            value={usuario.telefono}
            onChange={handleChange}
            error={errores.telefono}
            editable={editando}
            icon="📱"
          />
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;