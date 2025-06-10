import React from "react";

const InfoField = ({ label, value, icon, defaultText }) => (
  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-[#00c951] transition-all duration-300">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-xl">{icon}</span>
      <label className="text-sm font-semibold text-gray-700">{label}</label>
    </div>
    <p className="text-gray-800 font-medium">
      {value || defaultText}
    </p>
  </div>
);

export default InfoField;