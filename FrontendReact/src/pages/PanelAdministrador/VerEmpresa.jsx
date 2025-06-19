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
  Eye
} from 'lucide-react';
import Loading from '../Login/components/Loading';

const VerEmpresa = () => {
  const { nit } = useParams();
  const navigate = useNavigate();
  
  const [empresaData, setEmpresaData] = useState({
    // Empresa
    nit: '',
    nombre: '',
    direccion: '',
    descripcion: '',
    hora_apertura: '',
    hora_cierre: '',
    // Propietario
    propietario_nombre: '',
    propietario_apellido: '',
    propietario_telefono: '',
    propietario_email: '',
    tipo_documento: '',
    numero_documento: ''
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [ownerPreview, setOwnerPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const documentTypes = {
    'CC': 'Cédula de Ciudadanía',
    'CE': 'Cédula de Extranjería',
    'TI': 'Tarjeta de identidad'
  };

  // Cargar datos de la empresa al montar el componente
  useEffect(() => {
    const cargarDatosEmpresa = async () => {
      try {
        setLoading(true);
        const response = await empresaServicio.obtenerPorId(nit);
        const empresa = response.data.data;
        
        // Mapear los datos de la empresa
        setEmpresaData({
          nit: empresa.NIT || '',
          nombre: empresa.nombre || '',
          direccion: empresa.direccion || '',
          descripcion: empresa.descripcion || '',
          hora_apertura: empresa.hora_apertura || '',
          hora_cierre: empresa.hora_cierre || '',
          // Datos del propietario
          propietario_nombre: empresa.propietario?.nombre || '',
          propietario_apellido: empresa.propietario?.apellido || '',
          propietario_telefono: empresa.propietario?.telefono || '',
          propietario_email: empresa.propietario?.user?.email || '',
          tipo_documento: empresa.propietario?.tipo_documento_id || '',
          numero_documento: empresa.propietario?.numero_documento || ''
        });

        // Establecer previews de imágenes existentes
        if (empresa.logo?.url) {
          setLogoPreview(empresa.logo.url);
        }
        if (empresa.propietario?.imagen?.url) {
          setOwnerPreview(empresa.propietario.imagen.url);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
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
    <div className="min-h-screen p-4 flex items-center justify-center w-full">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-5xl overflow-hidden">
        {/* Main Content */}
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md flex items-center gap-2"
            >
              ← Volver
            </button>
            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-100 text-blue-700">
              <Eye size={16} />
              Modo Visualización
            </div>
          </div>

          {/* Company Information */}
          <div className="flex gap-8 mb-12">
            {/* Logo Section */}
            <div className="flex flex-col items-center min-w-[200px]">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-700 to-green-400 flex items-center justify-center overflow-hidden shadow-xl">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Building className="w-12 h-12 text-white" />
                  )}
                </div>
              </div>
            </div>

            {/* Company Information Display */}
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">NIT</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <div className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-800">
                      {empresaData.nit || 'No especificado'}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre de la Empresa</label>
                  <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-800">
                    {empresaData.nombre || 'No especificado'}
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Dirección</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <div className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-800">
                      {empresaData.direccion || 'No especificado'}
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
                  <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-800 min-h-[120px]">
                    {empresaData.descripcion || 'No especificado'}
                  </div>
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

              {/* Owner Information Display */}
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                    <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-800">
                      {empresaData.propietario_nombre || 'No especificado'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Apellido</label>
                    <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-800">
                      {empresaData.propietario_apellido || 'No especificado'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <div className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-800">
                        {empresaData.propietario_telefono || 'No especificado'}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <div className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-800">
                        {empresaData.propietario_email || 'No especificado'}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Documento</label>
                    <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-800">
                      {documentTypes[empresaData.tipo_documento] || 'No especificado'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Número de Documento</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <div className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-800">
                        {empresaData.numero_documento || 'No especificado'}
                      </div>
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

export default VerEmpresa;
