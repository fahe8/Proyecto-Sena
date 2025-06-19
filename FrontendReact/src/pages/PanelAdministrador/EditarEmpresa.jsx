import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { empresaServicio } from '../../services/api';
import { 
  User,  
  Mail, 
  Phone, 
  MapPin, 
  CreditCard,
  Building,
  Check
} from 'lucide-react';
import Loading from '../Login/components/Loading';

const EditarEmpresa = () => {
  const { nit } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    // Empresa
    nit: '',
    nombre: '',
    direccion: '',
    descripcion: '',
    logo: null,
    hora_apertura: '',
    hora_cierre: '',
    // Propietario
    propietario_nombre: '',
    propietario_apellido: '',
    propietario_telefono: '',
    propietario_email: '',
    tipo_documento: '',
    numero_documento: '',
    propietario_imagen: null
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [ownerPreview, setOwnerPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const documentTypes = [
    { value: '', label: 'Seleccionar tipo' },
    { value: 'CC', label: 'Cédula de Ciudadanía' },
    { value: 'CE', label: 'Cédula de Extranjería' },
    { value: 'TI', label: 'Tarjeta de identidad' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Formatear NIT
    if (name === 'nit') {
      const formattedValue = value.replace(/\D/g, '').substring(0, 9);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // Formatear teléfono
    if (name === 'propietario_telefono') {
      const formattedValue = value.replace(/\D/g, '').substring(0, 10);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  // Cargar datos de la empresa al montar el componente
  useEffect(() => {
    const cargarDatosEmpresa = async () => {
      try {
        setLoading(true);
        const response = await empresaServicio.obtenerPorId(nit);
        const empresaData = response.data.data;
        
        // Mapear los datos de la empresa
        setFormData({
          nit: empresaData.NIT || '',
          nombre: empresaData.nombre || '',
          direccion: empresaData.direccion || '',
          descripcion: empresaData.descripcion || '',
          logo: null, // Para archivos nuevos
          // Datos del propietario
          propietario_nombre: empresaData.propietario?.nombre || '',
          propietario_apellido: empresaData.propietario?.apellido || '',
          propietario_telefono: empresaData.propietario?.telefono || '',
          propietario_email: empresaData.propietario?.user?.email || '',
          tipo_documento: empresaData.propietario?.tipo_documento_id || '',
          numero_documento: empresaData.propietario?.numero_documento || '',
          propietario_imagen: null // Para archivos nuevos
        });

        // Establecer previews de imágenes existentes
        if (empresaData.logo?.url) {
          setLogoPreview(empresaData.logo.url);
        }
        if (empresaData.propietario?.imagen?.url) {
          setOwnerPreview(empresaData.propietario.imagen.url);
        }

        setError(null);
      } catch (err) {
        console.error('Error al cargar empresa:', err);
        setError('Error al cargar los datos de la empresa');
      } finally {
        setLoading(false);
      }
    };

    if (nit) {
      cargarDatosEmpresa();
    }
  }, [nit]);


  // Actualizar función de guardado
  const handleSave = async () => {
    setIsSaving(true); // Cambiar setIsLoading por setIsSaving
    setError('');
    
    try {
      // Crear objeto JSON en lugar de FormData
      const jsonData = {
        nombre: formData.nombre,
        direccion: formData.direccion,
        descripcion: formData.descripcion
      };
      
      // Agregar datos del propietario si existen
      if (formData.propietario_nombre) {
        jsonData.propietario_nombre = formData.propietario_nombre;
      }
      if (formData.propietario_apellido) {
        jsonData.propietario_apellido = formData.propietario_apellido;
      }
      if (formData.propietario_telefono) {
        jsonData.propietario_telefono = formData.propietario_telefono;
      }
      if (formData.propietario_email) {
        jsonData.propietario_email = formData.propietario_email;
      }
      if (formData.tipo_documento) {
        jsonData.tipo_documento = formData.tipo_documento;
      }
      if (formData.numero_documento) {
        jsonData.numero_documento = formData.numero_documento;
      }
      
      console.log('Datos JSON a enviar:', jsonData);
      
      // Actualizar empresa con JSON
      const response = await empresaServicio.actualizar(nit, jsonData);
      console.log('Respuesta del servidor:', response);
      
      setIsSaved(true);
      console.log('Empresa actualizada correctamente', jsonData);
      
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error completo al guardar:', error);
      
      // Manejo más detallado de errores
      if (error.response) {
        // Error del servidor
        const errorMessage = error.response.data?.message || 'Error del servidor';
        setError(`Error al guardar: ${errorMessage}`);
      } else if (error.request) {
        // Error de red
        setError('Error de conexión. Verifica tu conexión a internet.');
      } else {
        // Otro tipo de error
        setError('Error inesperado al guardar los datos.');
      }
    } finally {
      setIsSaving(false); // Cambiar setIsLoading por setIsSaving
    }
  };


  // Mostrar loading mientras se cargan los datos
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Mostrar error si hay algún problema
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-4 flex items-center justify-center w-full">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-5xl overflow-hidden">
        {/* Main Content */}
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between  items-center mb-8 ">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md flex items-center gap-2"
            >
              ← Volver
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                isSaved 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg '
              }`}
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Guardando...
                </>
              ) : isSaved ? (
                <>
                  <Check size={16} />
                  Guardado
                </>
              ) : (
                'Guardar →'
              )}
            </button>
          </div>

          {/* Company Information */}
          <div className="flex gap-8 mb-12">
            {/* Logo Section */}
            <div className="flex flex-col items-center min-w-[200px]">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-700 to-green-400 flex items-center justify-center overflow-hidden shadow-xl ">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Building className="w-12 h-12 text-white" />
                  )}
                </div>
              </div>
            </div>

            {/* Company Form */}
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">NIT</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="nit"
                      value={formData.nit}
                      onChange={handleInputChange}
                      placeholder="Ingrese el NIT"
                      readOnly
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre de la Empresa</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Dirección</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      placeholder="Ingrese la dirección completa"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    placeholder="Describe tu empresa..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-400  transition-all duration-200 resize-vertical"
                  />
                </div>
                
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <User className="w-6 h-6 text-green-500" />
              Información del Propietario
            </h3>

            <div className="flex gap-8 mb-8">
              {/* Owner Image */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center overflow-hidden shadow-lg">
                    {ownerPreview ? (
                      <img src={ownerPreview} alt="Propietario" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-white" />
                    )}
                  </div>
                </div>
              </div>

              {/* Owner Form */}
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                    <input
                      type="text"
                      name="propietario_nombre"
                      value={formData.propietario_nombre}
                      onChange={handleInputChange}
                      placeholder="Nombre del propietario"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Apellido</label>
                    <input
                      type="text"
                      name="propietario_apellido"
                      value={formData.propietario_apellido}
                      onChange={handleInputChange}
                      placeholder="Apellido del propietario"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="propietario_telefono"
                        value={formData.propietario_telefono}
                        onChange={handleInputChange}
                        placeholder="Número de teléfono"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="propietario_email"
                        value={formData.propietario_email}
                        onChange={handleInputChange}
                        placeholder="correo@ejemplo.com"
                        readOnly
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Documento</label>
                    <select
                      name="tipo_documento"
                      value={formData.tipo_documento}
                      onChange={handleInputChange}
                      disabled
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed transition-all duration-200"
                    >
                      {documentTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Número de Documento</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="numero_documento"
                        value={formData.numero_documento}
                        onChange={handleInputChange}
                        placeholder="Número de documento"
                        readOnly
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarEmpresa;

