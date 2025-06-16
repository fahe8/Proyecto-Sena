import React from "react";
import InfoField from "../../Perfil/components/InfoField";
import InputField from "../../Perfil/components/InputField";
import lapizIcon from "../../../assets/Perfil/lapiz.svg";

const AdminProfileInfo = ({ 
  propietario, 
  empresa,
  editandoEmpresa,
  editandoPropietario,
  handleChangePropietario,
  handleChangeEmpresa, 
  errores, 
  toggleEdicionEmpresa,
  toggleEdicionPropietario,
  validarInputsEmpresa,
  validarInputsPropietario
}) => {

  return (
    <div className="bg-white rounded-lg shadow-lg p-12 relative mb-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-[#003044]">Información de la Empresa</h3>
        <button
          onClick={editando ? validarInputs : toggleEdicion}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 cursor-pointer ${
            editando 
            ? 'bg-[#00c951] hover:bg-[#00a844]' 
            : 'bg-green-700 hover:bg-green-600'
          } text-white shadow-md hover:shadow-lg`}
        >
          <span>{editando ? "Guardar Cambios" : "Editar Información"}</span>
          <img width={20} src={lapizIcon} alt="Editar" className="" />
        </button>
      </div>

        {!editandoEmpresa ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoField
              label="Nombre de la Empresa"
              value={empresa?.nombre}
              icon="🏢"
              defaultText="No hay nombre registrado"
            />
            <InfoField
              label="NIT"
              value={empresa.NIT}
              icon="🆔"
              defaultText="No hay NIT registrado"
            />
            <InfoField
              label="Dirección"
              value={empresa.direccion}
              icon="📍"
              defaultText="No hay dirección registrada"
            />
            <InfoField
              label="Descripcion"
              value={empresa.descripcion}
              icon="📩"
              defaultText="No hay descripción registrada"
            />
            
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField
              label="Nombre de la Empresa"
              name="nombre"
              value={empresa.nombre}
              onChange={handleChangeEmpresa}
              error={errores.nombreEmpresa}
              editable={editandoEmpresa}
              icon="🏢"
            />
            <InputField
              label="NIT"
              name="NIT"
              value={empresa.NIT}
              onChange={handleChangeEmpresa}
              error={errores.NIT}
              editable={false} // El NIT no se puede editar
              icon="🆔"
            />
            <InputField
              label="Dirección"
              name="direccion"
              value={empresa.direccion}
              onChange={handleChangeEmpresa}
              error={errores.direccionEmpresa}
              editable={editandoEmpresa}
              icon="📍"
            />
            <InputField
              label="descripcion"
              name="descripcion"
              value={empresa.descripcion}
              onChange={handleChangeEmpresa}
              error={errores.descripcionEmpresa}
              editable={editandoEmpresa}
              icon="📩"
            />
           
          </div>
        )}
      {/* Sección del Propietario */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-[#003044]">Información del Propietario</h3>
          <button
            onClick={editandoPropietario ? validarInputsPropietario : toggleEdicionPropietario}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
              editandoPropietario 
              ? 'bg-[#00c951] hover:bg-[#00a844]' 
              : 'bg-[#003044] hover:bg-[#004466]'
            } text-white shadow-md hover:shadow-lg`}
          >
            <span>{editandoPropietario ? "Guardar Cambios" : "Editar Propietario"}</span>
            <img width={20} src={lapizIcon} alt="Editar" className="invert" />
          </button>
        </div>

        {!editandoPropietario ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoField
              label="Nombre(s)"
              value={propietario.nombre}
              icon="👤"
              defaultText="No hay nombre registrado"
            />
            <InfoField
              label="Apellido(s)"
              value={propietario.apellido}
              icon="👤"
              defaultText="No hay apellido registrado"
            />
            <InfoField
              label="Correo electrónico"
              value={propietario.email}
              icon="📧"
              defaultText="No hay correo registrado"
            />
            <InfoField
              label="Teléfono"
              value={propietario.telefono}
              icon="📱"
              defaultText="No hay teléfono registrado"
            />
            <InfoField
              label="Número de Documento"
              value={propietario.numero_documento}
              icon="🪪"
              defaultText="No hay documento registrado"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField
              label="Nombre(s)"
              name="nombre"
              value={propietario.nombre}
              onChange={handleChangePropietario}
              error={errores.nombrePropietario}
              editable={editandoPropietario}
              icon="👤"
            />
            <InputField
              label="Apellido(s)"
              name="apellido"
              value={propietario.apellido}
              onChange={handleChangePropietario}
              error={errores.apellidoPropietario}
              editable={editandoPropietario}
              icon="👤"
            />
            <InputField
              label="Teléfono"
              name="telefono"
              value={propietario.telefono}
              onChange={handleChangePropietario}
              error={errores.telefonoPropietario}
              editable={editandoPropietario}
              icon="📱"
            />
            <InputField
              label="Correo electrónico"
              name="email"
              value={propietario.email}
              onChange={handleChangePropietario}
              error={errores.emailPropietario}
              editable={false} 
              icon="📧"
            />
            <InputField
              label="Número de Documento"
              name="num_documento"
              value={propietario.numero_documento}
              onChange={handleChangePropietario}
              error={errores.num_documentoPropietario}
              editable={false} 
              icon="🪪"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfileInfo;