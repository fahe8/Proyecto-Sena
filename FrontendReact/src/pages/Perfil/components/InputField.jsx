import React from "react";

const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
  editable,
  icon,
}) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-2">
        <span>{icon}</span>
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      </div>

      {editable ? (
        <>
          {name === "descripcion" ? (
            <textarea
              name={name}
              value={value}
              onChange={onChange}
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00c951] focus:border-transparent transition-all duration-300 "
            />
          ) : (
            <input
              type={name === "email" ? "email" : "text"}
              name={name}
              value={value}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00c951] focus:border-transparent transition-all duration-300"
            />
          )}

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </>
      ) : (
        <p className="text-gray-800 font-medium">
          {value || "No hay información"}
        </p>
      )}
    </div>
  );
};

export default InputField;
