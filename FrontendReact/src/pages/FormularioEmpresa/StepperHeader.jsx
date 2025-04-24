import React from 'react';
export default function StepperHeader({ currentStep }) {
    return (
      <div className="mb-4 md:mb-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-6 h-4 md:w-7 md:h-6 rounded-full ${currentStep >= 1 ? 'bg-[#003044]' : 'bg-gray-300'}`}>
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <div className="text-xs font-sans ml-2">Datos del Representante</div>
          </div>
  
          <div className="w-15 h-1 bg-gray-200">
            <div className={`h-full ${currentStep === 2 ? 'bg-[#003044]' : 'bg-gray-200'}`}></div>
          </div>
  
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-6 h-4 md:w-7 md:h-6 rounded-full ${currentStep === 2 ? 'bg-[#003044]' : 'bg-gray-300'}`}>
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <div className="text-xs font-sans ml-2">Datos de la Empresa</div>
          </div>
        </div>
      </div>
    );
  }
  