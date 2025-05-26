import React, { useState , useEffect} from 'react';
import { empresaServicio } from '../../services/api';
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
        nombre: '',
        apellido: '',
        identificacion: '',
        telefono: '',
        correo: '',
      },
      empresa: {
        nombre: '',
        nit: '',
        direccion: '',
        logo: '',
      },
      canchas: [{ name: '', size: '', surface: '', price: '', capacity: '' }],
      adicional: {
        horario: { desde: '', hasta: '' },
        dias: [],
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
      const { nombre, apellido, identificacion, telefono, correo } = formData.representante;
      if (!nombre) stepErrors.nombre = 'El nombre es obligatorio';
      if (!apellido) stepErrors.apellido = 'El apellido es obligatorio';
      if (!identificacion) stepErrors.identificacion = 'La identificación es obligatoria';
      if (!telefono) stepErrors.telefono = 'El teléfono es obligatorio';
      if (!correo) stepErrors.correo = 'El correo es obligatorio';
    } else if (currentStep === 2) {
      const { nombre, nit, direccion } = formData.empresa;
      if (!nombre) stepErrors.nombre = 'El nombre de la empresa es obligatorio';
      if (!nit) stepErrors.nit = 'El NIT es obligatorio';
      if (!direccion) stepErrors.direccion = 'La dirección es obligatoria';
    }
    // Agregar validaciones para otros pasos si es necesario
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  // Agregar una nueva cancha
  const addCancha = () => {
    setFormData((prev) => ({
      ...prev,
      canchas: [
        ...prev.canchas,
        { name: '', size: '', surface: '', price: '', capacity: '' }, // Usando los nombres que espera InfoCanchas
      ],
    }));
  };

  // Manejar cambios en las canchas
  const handleCanchaChange = (index, field, value) => {
    const updatedCanchas = [...formData.canchas];
    updatedCanchas[index][field] = value;
    setFormData((prev) => ({ ...prev, canchas: updatedCanchas }));
  };

  // Enviar datos al backend
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await empresaServicio.crear(formData);
      console.log('Empresa creada:', response.data);
      alert('Empresa creada exitosamente');
      // Limpiar los datos guardados después de enviar el formulario exitosamente
      localStorage.removeItem('formEmpresaData');
      localStorage.removeItem('formEmpresaStep');
      
      // Redirigir o reiniciar el formulario
      window.location.href = '/dashboard'; 

    } catch (error) {
      console.error('Error al crear la empresa:', error);
      alert('Hubo un error al crear la empresa');
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

  // CORREGIDA: Función para eliminar una cancha
  const onRemoveCancha = (index) => {
    const updatedCanchas = [...formData.canchas];
    updatedCanchas.splice(index, 1);
    
    // Si no quieres permitir eliminar la última cancha, descomenta estas líneas
    // if (updatedCanchas.length === 0) {
    //   updatedCanchas.push({ name: '', size: '', surface: '', price: '', capacity: '' });
    // }
    
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
            {/* Show current step title for mobile */}
            <div className="text-center text-[#003044] font-medium text-sm mt-3">
              {steps.find(step => step.number === currentStep)?.title}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:gap-10 lg:gap-25">
            {/* Desktop Stepper (Vertical) - Hide on mobile */}
            <div className="hidden md:flex flex-col items-center text-[#003044] bg-[#e5fff2] w-50 rounded-md py-4">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <StepIndicator 
                    number={step.number}
                    title={step.title}
                    isCompleted={currentStep > step.number}
                    isActive={currentStep === step.number}
                    
                  />
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-12 bg-gray-200"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Form content */}
            <div className="flex-1">

              {currentStep === 1 && ( 
              <InfoRepresentante 
              data={formData.representante}
              onChange={(field, value) =>
                handleInputChange('representante', field, value)
              }
              errors={errors}
              />
              )}

              {currentStep === 2 && ( <InfoEmpresa 
              data={formData.empresa}
              onChange={(field, value) =>
                handleInputChange('empresa', field, value)
              }
              errors={errors}
              />
              )}

              {currentStep === 3 && (
                <InfoCanchas
                  data={formData.canchas}
                  onAddCancha={addCancha} // Conecta la función para agregar una nueva cancha
                  onChange={handleCanchaChange} // Conecta la función para manejar cambios en las canchas
                  onRemoveCancha={onRemoveCancha} // Conecta la función para eliminar una cancha
                  errors={errors.canchas} // Pasa los errores específicos de las canchas
                />
              )}

              {currentStep === 4 && (<InfoAdicional 
              data={formData.adicional}
              onChange={(field, value) =>
                handleInputChange('adicional', field, value)
              }
              />
              )}
              
              <div className="mt-8 flex justify-end gap-4">
                {currentStep > 1 && (
                  <button 
                    onClick={goToPreviousStep}
                    className="px-4 sm:px-6 py-2 border border-gray-300 rounded-md flex items-center gap-2 text-gray-600 text-sm"
                  >
                    <ChevronLeft size={16} />
                    <span className="hidden sm:inline">Anterior</span>
                  </button>
                )}
                <button 
                  onClick={goToNextStep}
                  className="px-4 sm:px-5 py-2 bg-[#03c700] text-white text-sm rounded-md flex items-center gap-2"
                >
                  <span>{currentStep === 4 ? 'Finalizar' : 'Siguiente'}</span>
                  {currentStep !== 4 && <ChevronRight size={16} />}
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
  );
}