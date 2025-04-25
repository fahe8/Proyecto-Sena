import React from 'react';
import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import StepIndicator from './StepIndicator';
import InfoRepresentante from './InfoRepresentante';
import InfoEmpresa from './InfoEmpresa';
import InfoCanchas from './InfoCanchas';
import InfoAdicional from './InfoAdicional';

export default function FormEmpresa() {
  const [currentStep, setCurrentStep] = useState(1);
  
  const goToNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    }
  };

  // Steps configuration
  const steps = [
    { number: 1, title: "Datos del Representante" },
    { number: 2, title: "Datos de la Empresa" },
    { number: 3, title: "Canchas Sintéticas" },
    { number: 4, title: "Información Adicional" }
  ];

  return (
    <div className="bg-green-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg px-10 sm:px-6 md:px-15 pt-4 pb-6 w-full max-w-4xl">
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
            {currentStep === 1 && <InfoRepresentante />}
            {currentStep === 2 && <InfoEmpresa />}
            {currentStep === 3 && <InfoCanchas />}
            {currentStep === 4 && <InfoAdicional />}
            
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