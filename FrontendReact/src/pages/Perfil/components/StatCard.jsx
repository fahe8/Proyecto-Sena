import React from "react";

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl py-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
    <div className="flex items-center justify-evenly gap-4">
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-2xl font-bold text-[#003044] mt-1">{value}</p>
      </div>
      <span className="items-center justify-center">{icon}</span>
    </div>
  </div>
);

export default StatCard;