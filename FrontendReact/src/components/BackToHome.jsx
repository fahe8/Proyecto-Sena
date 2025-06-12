import React from 'react';
import { useNavigate } from 'react-router-dom';


const BackToHome = () => {
    const navigate = useNavigate();
    
    const handleBackToHome = () => {
      navigate('/');
    };
    
    return (
      <button 
        onClick={handleBackToHome}
        className="flex items-center gap-2 pb-1 text-gray-600 hover:text-gray-800 cursor-pointer"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
          />
        </svg>
        <span className="font-medium text-sm">Inicio</span>
      </button>
    );
  };

  export default BackToHome;