import React from "react";
import InfoField from "../../Perfil/components/InfoField";
import InputField from "../../Perfil/components/InputField";
import CloudinaryUploader from "../../../components/CloudinaryUploader";
import lapizIcon from "../../../assets/Perfil/lapiz.svg";
import { UserIcon, EmailIcon, PhoneIcon, ImageIcon, DocumentIcon, IdICon, CompanyIcon, DescriptionIcon, LocationIcon} from "../../../assets/IconosSVG/iconos";

const AdminProfileInfo = ({ 
  propietario, 
  empresa,
  editandoEmpresa,
  editandoPropietario,
  handleChangePropietario,
  handleChangeEmpresa,
  handleImageUpload,
  errores, 
  toggleEdicionEmpresa,
  toggleEdicionPropietario,
  validarInputsEmpresa,
  validarInputsPropietario
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-12 relative mb-8">
      {/* Sección de la Empresa */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-[#003044]">Información de la Empresa</h3>
          <button
            onClick={editandoEmpresa ? validarInputsEmpresa : toggleEdicionEmpresa}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 cursor-pointer ${
              editandoEmpresa 
              ? 'bg-[#00c951] hover:bg-[#00a844]' 
              : 'bg-[#003044] hover:bg-[#004466]'
            } text-white shadow-md hover:shadow-lg`}
          >
            <span>{editandoEmpresa ? "Guardar Cambios" : "Editar Empresa"}</span>
            <img width={20} src={lapizIcon} alt="Editar" className="" />
          </button>
        </div>

        {!editandoEmpresa ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoField
              label="Nombre de la Empresa"
              value={empresa?.nombre}
              icon={<CompanyIcon />}
              defaultText="No hay nombre registrado"
            />
            <InfoField
              label="NIT"
              value={empresa.NIT}
              icon={<IdICon />}
              defaultText="No hay NIT registrado"
            />
            <InfoField
              label="Dirección"
              value={empresa.direccion}
              icon={<LocationIcon />}
              defaultText="No hay dirección registrada"
            />
            <InfoField
              label="Descripción"
              value={empresa.descripcion}
              icon={<DescriptionIcon />}
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
              icon={<CompanyIcon />}
            />
            <InputField
              label="NIT"
              name="NIT"
              value={empresa.NIT}
              onChange={handleChangeEmpresa}
              error={errores.NIT}
              editable={false} // El NIT no se puede editar
              icon={<IdICon />}
            />
            <InputField
              label="Dirección"
              name="direccion"
              value={empresa.direccion}
              onChange={handleChangeEmpresa}
              error={errores.direccionEmpresa}
              editable={editandoEmpresa}
              icon={<LocationIcon/>}
            />
            
            <InputField
              label="descripcion"
              name="descripcion"
              value={empresa.descripcion}
              onChange={handleChangeEmpresa}
              error={errores.descripcionEmpresa}
              editable={editandoEmpresa}
              icon={<DescriptionIcon />}
            />
           
          </div>
        )}
      </div>

      {/* Sección del Propietario */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-[#003044]">Información del Propietario</h3>
          <button
            onClick={editandoPropietario ? validarInputsPropietario : toggleEdicionPropietario}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 cursor-pointer ${
              editandoPropietario 
              ? 'bg-[#00c951] hover:bg-[#00a844]' 
              : 'bg-[#003044] hover:bg-[#004466]'
            } text-white shadow-md hover:shadow-lg`}
          >
            <span>{editandoPropietario ? "Guardar Cambios" : "Editar Propietario"}</span>
            <img width={20} src={lapizIcon} alt="Editar" className="" />
          </button>
        </div>

        {!editandoPropietario ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoField
              label="Nombre(s)"
              value={propietario.nombre}
              icon={<UserIcon />}
              defaultText="No hay nombre registrado"
            />
            <InfoField
              label="Apellido(s)"
              value={propietario.apellido}
              icon={<UserIcon />}
              defaultText="No hay apellido registrado"
            />
            <InfoField
              label="Correo electrónico"
              value={propietario.email}
              icon={<EmailIcon />}
              defaultText="No hay correo registrado"
            />
            <InfoField
              label="Teléfono"
              value={propietario.telefono}
              icon={<PhoneIcon />}
              defaultText="No hay teléfono registrado"
            />
            <InfoField
              label="Número de Documento"
              value={propietario.numero_documento}
              icon={<DocumentIcon />}
              defaultText="No hay documento registrado"
            />
            <div className="md:col-span-2">
              <InfoField
                label="Imagen del Propietario"
                value={propietario.imagen?.url ? "Imagen cargada" : "No hay imagen"}
                icon={<ImageIcon />}
                defaultText="No hay imagen registrada"
              />
              {propietario.imagen?.url && (
                <div className="mt-4">
                  <img 
                    src={propietario.imagen.url} 
                    alt="Imagen del propietario" 
                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
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
              icon={<UserIcon />}
            />
            <InputField
              label="Apellido(s)"
              name="apellido"
              value={propietario.apellido}
              onChange={handleChangePropietario}
              error={errores.apellidoPropietario}
              editable={editandoPropietario}
              icon={<UserIcon />}
            />
            <InputField
              label="Teléfono"
              name="telefono"
              value={propietario.telefono}
              onChange={handleChangePropietario}
              error={errores.telefonoPropietario}
              editable={editandoPropietario}
              icon={<PhoneIcon />}
            />
            <InputField
              label="Correo electrónico"
              name="email"
              value={propietario.email}
              onChange={handleChangePropietario}
              error={errores.emailPropietario}
              editable={false} 
              icon={<EmailIcon />}
            />
            <InputField
              label="Número de Documento"
              name="num_documento"
              value={propietario.numero_documento}
              onChange={handleChangePropietario}
              error={errores.num_documentoPropietario}
              editable={false} 
              icon={<DocumentIcon />}
            />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ImageIcon/> Imagen del Propietario
              </label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <CloudinaryUploader
                    onUploadSuccess={handleImageUpload}
                    folder="micanchaya/propietarios"
                    multiple={false}
                  />
                </div>
                {propietario.imagen?.url && (
                  <div className="flex-shrink-0">
                    <img 
                      src={propietario.imagen.url} 
                      alt="Imagen actual del propietario" 
                      className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <p className="text-xs text-gray-500 mt-1 text-center">Imagen actual</p>
                  </div>
                )}
              </div>
              {errores.imagen && (
                <p className="text-red-500 text-sm mt-1">{errores.imagen}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfileInfo;