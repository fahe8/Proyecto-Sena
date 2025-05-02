import React from 'react';
import { Check } from 'lucide-react';

export default function StepIndicator({ number, title, isCompleted, isActive }) {
  return (
    <div className="flex flex-col items-center mb-2">
      <div className={`
        w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center 
        ${isCompleted ? 'bg-[#03c700] text-white' : isActive ? 'bg-green-100 border-2 border-[#2bd800] text-[#2bd800]' : 'bg-gray-300 text-gray-500'}
        transition-all duration-300
      `}>
        {isCompleted ? <Check size={16} className="md:text-lg" /> : number}
      </div>
      {title && (
        <span className={`
          mt-2 text-xs md:text-[13px] whitespace-nowrap max-w-32 text-center
          ${isActive ? 'font-medium text-[#003044]' : 'text-gray-500'}
        `}>
          {title}
        </span>
      )}
    </div>
  );
}