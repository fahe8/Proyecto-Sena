import React from 'react';
import { useState } from 'react';
import StepperHeader from './StepperHeader.jsx';
import RepresentanteForm from './RepresentanteForm.jsx';
import EmpresaForm from './EmpresaForm.jsx';
import { useFormData } from './useFormData.js';

export default function FormularioEmpresa() {
  const [currentStep, setCurrentStep] = useState(1);
  const { formData, handleChange, handleSubmit } = useFormData();

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handlePrev = () => {
    setCurrentStep(1);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#02514d]">
      <div className=" relative w-78 md:w-90 mx-auto p-8 py-5 bg-white rounded-lg shadow-2xl">

        <div className="flex justify-start gap-3 items-center mb-5">
            <a href="/login" className=" px-3 py-1 text-[14px] hover:border-[#003044] hover:border-b-2 hover:text-[#33ea30]">Usuario</a>
            <div className="border-b-2 border-[#003044] px-3 py-1 text-[14px] text-[#33ea30] cursor-default">Empresa</div>
        </div>
        
        <StepperHeader currentStep={currentStep} />

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <RepresentanteForm 
              formData={formData} 
              handleChange={handleChange} 
              handleNext={handleNext} 
            />
          )}
          
          {currentStep === 2 && (
            <EmpresaForm 
              formData={formData} 
              handleChange={handleChange} 
              handlePrev={handlePrev} 
            />
          )}
        </form>
      </div>
    </div>
  );
}