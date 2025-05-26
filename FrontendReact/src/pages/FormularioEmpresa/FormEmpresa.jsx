import React, { useState, useEffect } from 'react';
import { empresaServicio, propietarioServicio, canchasServicio, ServiciosServicio } from '../../services/api';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import StepIndicator from './StepIndicator';
import InfoRepresentante from './InfoRepresentante';
import InfoEmpresa from './InfoEmpresa';
import InfoCanchas from './InfoCanchas';
import InfoAdicional from './InfoAdicional';
import CloudinaryUploader from '../../components/CloudinaryUploader';

export default function FormEmpresa() {
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
        id_propietario: '', // Se generará automáticamente
        nombre: '',
        apellido: '',
        id_tipoDocumento: 'CC', // Valor predeterminado válido
        num_documento: '',
        telefono: '',
        email: '',
        imagen: '',
        bloqueado: false
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
        id_estado_empresa: 'abierto'
      },
      canchas: [],
      adicional: {
        horario: { desde: '', hasta: '' },
        servicios: [],
        descripcion: '',
      },
    };
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('formEmpresaData', JSON.stringify(formData));
    localStorage.setItem('formEmpresaStep', currentStep.toString());
  }, [formData, currentStep]);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (section, field, value) => {

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setErrors((prev) => ({ ...prev, [section]: null })); // Limpiar errores al cambiar
  };

  // Validar campos requeridos
  const validateStep = () => {
    const stepErrors = {};
    if (currentStep === 1) {
      const { nombre, apellido, num_documento, telefono, email } = formData.representante;
      if (!nombre) stepErrors.nombre = 'El nombre es obligatorio';
      if (!apellido) stepErrors.apellido = 'El apellido es obligatorio';
      if (!formData.representante.id_tipoDocumento) {
        stepErrors.id_tipoDocumento = 'El tipo de documento es obligatorio';}
      if (!num_documento) stepErrors.num_documento = 'La identificación es obligatoria';
      if (!telefono) stepErrors.telefono = 'El teléfono es obligatorio';
      if (!email) stepErrors.email = 'El correo es obligatorio';
    } else if (currentStep === 2) {
      const { nombre, NIT, direccion } = formData.empresa;
      if (!nombre) stepErrors.nombre = 'El nombre de la empresa es obligatorio';
      if (!NIT) stepErrors.NIT = 'El NIT es obligatorio';
      if (!direccion) stepErrors.direccion = 'La dirección es obligatoria';
    }
    // Agregar validaciones para otros pasos si es necesario
    setErrors(stepErrors);
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
  };

  // Manejar cambios en la información adicional
  const handleAdicionalChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      adicional: {
        ...prev.adicional,
        [field]: value,
      },
    }));
    console.log(formData)

  };

  // Preparar datos para enviar al backend
  const prepareDataForSubmission = () => {
    // Generar un ID único para el propietario (puedes usar una biblioteca como uuid)
    const propietarioId = `PROP-${Date.now()}`;
    
    // Actualizar los datos de la empresa con la información adicional
    const empresaData = {
      ...formData.empresa,
      hora_apertura: formData.adicional.horario.desde,
      hora_cierre: formData.adicional.horario.hasta,
      descripcion: formData.adicional.descripcion,
      id_propietario: propietarioId,
      imagenes: formData.empresa.imagenes && formData.empresa.imagenes.length > 0 ? formData.empresa.imagenes : null
    };
    
    // Actualizar los datos del propietario
    const propietarioData = {
      ...formData.representante,
      id_propietario: propietarioId,
      bloqueado: false
    };
    
    // Actualizar las canchas con el NIT de la empresa
    const canchasData = formData.canchas.map(cancha => {
      // Solo incluir los campos necesarios
      return {
        nombre: cancha.nombre,
        id_tipo_cancha: cancha.id_tipo_cancha,
        id_estado_cancha: cancha.id_estado_cancha,
        imagen: cancha.imagen,
        NIT: formData.empresa.NIT,
        precio: cancha.precio
      };
    });
    
    return {
      propietario: propietarioData,
      empresa: {...empresaData, servicios: formData.adicional.servicios},
      canchas: canchasData,
      
    };
  };

  // Enviar datos al backend
  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setIsLoading(true);
    try {
      const dataToSubmit = prepareDataForSubmission();
      console.log('Datos a enviar:', JSON.stringify(dataToSubmit, null, 2));
      
      
      // 1. Crear el propietario
      const propietarioResponse = await propietarioServicio.crear(dataToSubmit.propietario);
      console.log('Propietario creado:', propietarioResponse.data);
      
      // 2. Crear la empresa
      const empresaResponse = await empresaServicio.crear(dataToSubmit.empresa);
      console.log('Empresa creada:', empresaResponse.data);
      
      // 3. Crear las canchas (si hay)
      if (dataToSubmit.canchas.length > 0) {
        for (const cancha of dataToSubmit.canchas) {
          await canchasServicio.agregar(cancha);
        }
      }
    
      
      // Limpiar los datos guardados después de enviar el formulario exitosamente
      localStorage.removeItem('formEmpresaData');
      localStorage.removeItem('formEmpresaStep');
      
      // Redirigir o reiniciar el formulario
      window.location.href = '/InterfazPropietario'; 

    } catch (error) {
      console.error('Error al crear la empresa:', error);
      alert('Hubo un error al crear la empresa: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };
  
  const goToNextStep = () => {
    if (validateStep()) {
      if (currentStep < 4) {
        setCurrentStep((prevStep) => prevStep + 1);
      } else {
        handleSubmit(); // Enviar datos al backend al finalizar
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
    { number: 1, title: "Datos del Representante" },
    { number: 2, title: "Datos de la Empresa" },
    { number: 3, title: "Canchas Sintéticas" },
    { number: 4, title: "Información Adicional" }
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

  return (
    <div className="bg-teal-800 min-h-screen flex items-center justify-center p-3">
      <div className="bg-white rounded-lg shadow-lg px-10 md:px-15 pt-4 pb-6 w-full max-w-4xl">
        <div className="flex justify-start gap-3 items-center mb-3">
          <a href='/login' className="hover:border-b-2 hover:border-[#003044] px-4 py-1 text-sm hover:text-[#33ea30] font-medium">Usuario</a>
          <div className="px-4 py-1 font-medium border-[#003044] border-b-2 text-[#33ea30] text-sm cursor-default">Empresa</div>
        </div>
        
        <h1 className="text-[#003044]  text-md font-bold mb-5">Crear cuenta</h1>
        
        {/* Mobile Stepper (Horizontal) */}
        <div className="md:hidden mb-6">
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
                  title={step.title}
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
            <InfoRepresentante 
              data={formData.representante} 
              onChange={(field, value) => handleInputChange('representante', field, value)} 
              errors={errors}
            />
          )}
          
          {currentStep === 2 && (
            <InfoEmpresa 
              data={formData.empresa} 
              onChange={(field, value) => handleInputChange('empresa', field, value)} 
              errors={errors}
            />
          )}
          
          {currentStep === 3 && (
            <InfoCanchas 
              data={formData.canchas} 
              onAddCancha={addCancha} 
              onChange={handleCanchaChange} 
              onRemoveCancha={onRemoveCancha}
              errors={errors}
            />
          )}
          
          {currentStep === 4 && (
            <InfoAdicional 
              data={formData.adicional} 
              onChange={handleAdicionalChange} 
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
          
          <button 
            onClick={goToNextStep}
            className="flex items-center gap-1 px-4 py-2 bg-[#003044] text-white rounded-md hover:bg-[#002030] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Procesando...' : currentStep === 4 ? 'Finalizar' : 'Siguiente'}
            {!isLoading && currentStep < 4 && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}