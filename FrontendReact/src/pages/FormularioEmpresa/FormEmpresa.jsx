import React, { useState, useEffect } from 'react';
import { empresaServicio, propietarioServicio, canchasServicio } from '../../services/api';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import StepIndicator from './StepIndicator';
import InfoRepresentante from './InfoRepresentante';
import InfoEmpresa from './InfoEmpresa';
import InfoCanchas from './InfoCanchas';
import InfoAdicional from './InfoAdicional';
import CloudinaryUploader from '../../components/CloudinaryUploader';
import image from "../../assets/LogIn/background.webp";
import EmailVerification from './IniciarSesionPrev';
import IniciarSesionPrev from './IniciarSesionPrev';
import { useAuth } from '../../Provider/AuthProvider';

export default function FormEmpresa() {
  const { isAuthenticated, guardarToken, setUser, setIsAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem('formEmpresaStep');
    return savedStep ? parseInt(savedStep) : 1;
  });

  const [formData, setFormData] = useState(() => {
    // Intenta recuperar los datos guardados en localStorage
    const savedData = localStorage.getItem('formEmpresaData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    // Si no hay datos guardados, usa el estado inicial por defecto
    return {
      representante: {
        email: '',
        password: '',
        nombre: '',
        apellido: '',
        tipo_documento_id: 'CC',
        num_documento: '',
        telefono: '',
        imagen: '',
      },
      empresa: {
        NIT: '',
        nombre: '',
        direccion: '',
        descripcion: '',
        logo: '',
        imagenes: [],
        hora_apertura: '',
        hora_cierre: '',
        id_estado_empresa: 'abierto',
        servicios: [],
      },
      canchas: [
        {
          nombre: '',
          precio: '',
          id_estado_cancha: 'disponible',
          tipo_cancha_id:'',
          imagen: '',
        }
      ],

    };
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registrado, setRegistrado] = useState(false);

  useEffect(() => {
    localStorage.setItem('formEmpresaData', JSON.stringify(formData));
    localStorage.setItem('formEmpresaStep', currentStep.toString());
  }, [formData, currentStep]);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (section, field, value) => {
    console.log(field, value)

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    console.log(formData)
    setErrors((prev) => ({ ...prev, [section]: null })); // Limpiar errores al cambiar
  };

  // Validar campos requeridos
  const validateStep = () => {
    const stepErrors = {};
    if (currentStep === 2) {
      const { nombre, apellido, num_documento, telefono, email } = formData.representante;
      if (!nombre) stepErrors.nombre = 'El nombre es obligatorio';
      if (!apellido) stepErrors.apellido = 'El apellido es obligatorio';
      if (!formData.representante.tipo_documento_id) {
        stepErrors.tipo_documento_id = 'El tipo de documento es obligatorio';
      }
      if (!num_documento) stepErrors.num_documento = 'La identificación es obligatoria';
      if (!telefono) stepErrors.telefono = 'El teléfono es obligatorio';
      if (!email) stepErrors.email = 'El correo es obligatorio';
    } else if (currentStep === 3) {
      const { nombre, NIT, direccion } = formData.empresa;
      if (!nombre) stepErrors.nombre = 'El nombre de la empresa es obligatorio';
      if (!NIT) stepErrors.NIT = 'El NIT es obligatorio';
      if (!direccion) stepErrors.direccion = 'La dirección es obligatoria';
    }
    // Agregar validaciones para otros pasos si es necesario
    setErrors(stepErrors);
    console.log(stepErrors)
    return Object.keys(stepErrors).length === 0;
  };

  // Agregar una nueva cancha
  const addCancha = () => {
    setFormData((prev) => ({
      ...prev, // Mantener el resto del estado
      canchas: [
        ...prev.canchas,
        {
          nombre: '',
          id_tipo_cancha: '',
          id_estado_cancha: 'disponible',
          imagen: '',
          NIT: prev.empresa.NIT,
          precio: ''
        },
      ],
    }));
  };

  // Manejar cambios en las canchas
  const handleCanchaChange = (index, field, value) => {
    const updatedCanchas = [...formData.canchas];
    updatedCanchas[index][field] = value;
    setFormData((prev) => ({ ...prev, canchas: updatedCanchas }));

    console.log(formData)
  };


  // Preparar datos para enviar al backend
  const prepareDataForSubmission = () => {
    const {
      NIT,
      direccion,
      descripcion,
      logo,
      imagenes,
      hora_apertura,
      hora_cierre,
      id_estado_empresa,
      servicios, } = formData.empresa;
  
    const empresaData = {
      NIT: NIT,
      nombre: formData.empresa.nombre,
      direccion: direccion,
      descripcion: descripcion,
      logo: logo, // Mantener como File
      imagenes: imagenes, // Mantener como array de Files
      hora_apertura: hora_apertura,
      hora_cierre: hora_cierre,
      id_estado_empresa: id_estado_empresa,
      servicios: servicios && servicios.length > 0 ? servicios : null, // Asegurarse de que sea un array o null
      // imagenes: formData.empresa.imagenes && formData.empresa.imagenes.length > 0 ? formData.empresa.imagenes : null
    };
  
    // Actualizar los datos del propietario
    const { email, password, nombre, apellido, telefono, imagen, tipo_documento_id, numero_documento } = formData.representante;
    const propietarioData = {
      email,
      password,
      nombre,
      apellido,
      telefono,
      imagen, // Mantener como File
      tipo_documento_id,
      numero_documento:numero_documento,
    };
  
    // Actualizar las canchas con el NIT de la empresa
    const canchasData = formData.canchas.map(cancha => {
      // Solo incluir los campos necesarios
      return {
        nombre: cancha.nombre,
        tipo_cancha_id: cancha.tipo_cancha_id,
        id_estado_cancha: cancha.id_estado_cancha,
        imagen: cancha.imagen, // Mantener como File
        NIT: formData.empresa.NIT,
        precio: cancha.precio
      };
    });
  
    return {
      propietario: propietarioData,
      empresa: { ...empresaData },
      canchas: canchasData,
  
    };
  };

  // Enviar datos al backend
  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setIsLoading(true);
    try {
      const dataToSubmit = prepareDataForSubmission();
      console.log('Datos a enviar:', dataToSubmit);

      // 1. Crear FormData para el propietario
      const propietarioFormData = new FormData();
      propietarioFormData.append('email', dataToSubmit.propietario.email);
      propietarioFormData.append('password', dataToSubmit.propietario.password);
      propietarioFormData.append('nombre', dataToSubmit.propietario.nombre);
      propietarioFormData.append('apellido', dataToSubmit.propietario.apellido);
      propietarioFormData.append('telefono', dataToSubmit.propietario.telefono);
      propietarioFormData.append('tipo_documento_id', dataToSubmit.propietario.tipo_documento_id);
      propietarioFormData.append('numero_documento', dataToSubmit.propietario.numero_documento);

      // Agregar imagen del propietario si existe
      if (dataToSubmit.propietario.imagen instanceof File) {
        propietarioFormData.append('imagen', dataToSubmit.propietario.imagen);
      }

      // Crear el propietario
      const propietarioResponse = await propietarioServicio.crear(propietarioFormData);
      const propietarioId = propietarioResponse.data.data.propietario.id;
      console.log('Propietario creado:', propietarioResponse.data);

      // 2. Crear FormData para la empresa
      const empresaFormData = new FormData();
      empresaFormData.append('NIT', dataToSubmit.empresa.NIT);
      empresaFormData.append('nombre', dataToSubmit.empresa.nombre);
      empresaFormData.append('direccion', dataToSubmit.empresa.direccion);
      empresaFormData.append('descripcion', dataToSubmit.empresa.descripcion);
      empresaFormData.append('hora_apertura', dataToSubmit.empresa.hora_apertura);
      empresaFormData.append('hora_cierre', dataToSubmit.empresa.hora_cierre);
      empresaFormData.append('propietario_id', propietarioId);
      
      // Agregar logo si existe
      if (dataToSubmit.empresa.logo instanceof File) {
        empresaFormData.append('logo', dataToSubmit.empresa.logo);
      }
      
      // Agregar imágenes múltiples si existen
      if (dataToSubmit.empresa.imagenes && dataToSubmit.empresa.imagenes.length > 0) {
        dataToSubmit.empresa.imagenes.forEach((imagen, index) => {
          if (imagen instanceof File) {
            empresaFormData.append('imagenes[]', imagen);
          }
        });
      }
      
      // Agregar servicios si existen
      if (dataToSubmit.empresa.servicios && dataToSubmit.empresa.servicios.length > 0) {
        dataToSubmit.empresa.servicios.forEach((servicio, index) => {
          empresaFormData.append('servicios[]', servicio);
        });
      }

      // Crear la empresa
      const empresaResponse = await empresaServicio.crear(empresaFormData);
      console.log('Empresa creada:', empresaResponse.data);

      // 3. Crear las canchas (mantener el código existente)
      for (const cancha of dataToSubmit.canchas) {
        const canchaFormData = new FormData();
        canchaFormData.append('nombre', cancha.nombre);
        canchaFormData.append('precio', cancha.precio);
        canchaFormData.append('NIT', dataToSubmit.empresa.NIT);
        canchaFormData.append('id_estado_cancha', cancha.id_estado_cancha);
        canchaFormData.append('tipo_cancha_id', cancha.tipo_cancha_id);
        
        // Agregar imagen de la cancha si existe
        if (cancha.imagen instanceof File) {
          canchaFormData.append('imagen', cancha.imagen);
        }

        const canchaResponse = await canchasServicio.agregar(canchaFormData);
        console.log('Cancha creada:', canchaResponse.data);
      }

      // Guardar token y usuario si el registro fue exitoso
      if (propietarioResponse.data.data.token) {
        guardarToken(propietarioResponse.data.data.token);
        setUser(propietarioResponse.data.data.propietario);
        setIsAuthenticated(true);
      }

      setRegistrado(true);
      
      // Limpiar localStorage después del registro exitoso
      localStorage.removeItem('formEmpresaData');
      localStorage.removeItem('formEmpresaStep');

      // Redirigir a la interfaz de propietario
      window.location.href = '/interfazpropietario';
      
    } catch (error) {
      console.error('Error al enviar datos:', error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };


  const goToNextStep = () => {
    if (validateStep()) {
      console.log('asas')

      if (currentStep < 5) {
        setCurrentStep((prevStep) => prevStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    }
  };

  // Función para eliminar una cancha
  const onRemoveCancha = (index) => {
    const updatedCanchas = [...formData.canchas];
    updatedCanchas.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      canchas: updatedCanchas
    }));
  };

  // Steps configuration
  const steps = [
    { number: 1, title: "¿Ya tienes una cuenta registrada?" },
    { number: 2, title: "Datos del Representante" },
    { number: 3, title: "Datos de la Empresa" },
    { number: 4, title: "Canchas Sintéticas" },
    { number: 5, title: "Información Adicional" }
  ];

  // Función para manejar la subida de imágenes para la empresa
  const handleEmpresaImageUpload = (url) => {
    setFormData(prev => ({
      ...prev,
      empresa: {
        ...prev.empresa,
        imagenes: [...(prev.empresa.imagenes || []), url]
      }
    }));
  };

  const [showEmailVerification, setShowEmailVerification] = useState(true);
  const handleEmailVerified = (data) => {
    setShowEmailVerification(false);
    setFormData(prev => ({
      ...prev,
      representante: {
        ...prev.representante,
        email: data.email,
        password: data.password
      }
    }));
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-3 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
      <div className="bg-white rounded-lg shadow-lg px-10 md:px-15 pt-4 pb-6 w-full max-w-4xl">
        <div className="flex justify-start gap-3 items-center mb-3">
          <a href='/login' className="hover:border-b-2 hover:border-[#003044] px-4 py-1 text-sm hover:text-[#33ea30] font-medium">Usuario</a>
          <div className="px-4 py-1 font-medium border-[#003044] border-b-2 text-[#33ea30] text-sm cursor-default">Empresa</div>
        </div>

        <h1 className="text-[#003044]  text-md font-bold mb-5">Crear cuenta</h1>

        {/* Mobile Stepper (Horizontal) */}
        <div className="md:hidden mb-6 ">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <StepIndicator
                    number={step.number}
                    title=""  // Hide title on mobile
                    isCompleted={currentStep > step.number}
                    isActive={currentStep === step.number}
                  />

                </div>
                {index < steps.length - 1 && (
                  <div className="h-0.5 flex-1 bg-gray-200 mx-1"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Desktop Stepper (Vertical) */}
        <div className="hidden md:flex mb-6">
          <div className="flex justify-between w-full">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <StepIndicator
                  number={step.number}
                  isCompleted={currentStep > step.number}
                  isActive={currentStep === step.number}
                />
                <span className="text-xs mt-1 text-center">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="mb-6">
          {currentStep === 1 && (
            <>
              <h1>¿Tienes una cuenta creada en este Sitio?</h1>
              <div className='flex gap-4 pt-2'>
                <button className='bg-[#003044] text-white px-4 py-2 rounded-md hover:bg-[#002030] mb-4' onClick={() => setRegistrado(true)}>
                  Si
                </button>
                <button className='bg-[#003044] text-white px-4 py-2 rounded-md hover:bg-[#002030] mb-4' onClick={() => setCurrentStep(2)}>
                  No </button>

              </div>

              {registrado && <IniciarSesionPrev setCurrentStep={setCurrentStep} />}
            </>


          )}
          {currentStep === 2 && (
            <InfoRepresentante
              data={formData.representante}
              onChange={(field, value) => handleInputChange('representante', field, value)}
              errors={errors}
              isAuthenticated={isAuthenticated}
            />
          )}

          {currentStep === 3 && (
            <InfoEmpresa
              data={formData.empresa}
              onChange={(field, value) => handleInputChange('empresa', field, value)}
              errors={errors}
            />
          )}

          {currentStep === 4 && (
            <InfoCanchas
              data={formData.canchas}
              onAddCancha={addCancha}
              onChange={handleCanchaChange}
              onRemoveCancha={onRemoveCancha}
              errors={errors}
            />
          )}

          {currentStep === 5 && (
            <InfoAdicional
              data={formData.empresa}
              onChange={(field, value) => handleInputChange('empresa', field, value)}
              errors={errors}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={goToPreviousStep}
            className={`flex items-center gap-1 px-4 py-2 rounded-md ${currentStep === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[#003044] hover:bg-gray-100'}`}
            disabled={currentStep === 1}
          >
            <ChevronLeft size={16} />
            Anterior
          </button>

          {currentStep != '1' && <button
          
            onClick={goToNextStep}
            
            className="flex items-center gap-1 px-4 py-2 bg-[#003044] text-white rounded-md hover:bg-[#002030] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Procesando...' : currentStep === 5 ? 'Finalizar' : 'Siguiente'}
            {!isLoading && currentStep < 5 && <ChevronRight size={16} />}
          </button>}
        </div>
      </div>
    </div>



  );
}