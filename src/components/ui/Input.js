import { forwardRef } from "react";

// ✅ Componente reutilizável para campos de entrada
const Input = forwardRef(({ label, type = "text", name, value, onChange, disabled }, ref) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <input
        ref={ref}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full mt-1 p-3 border rounded-md bg-[#1A1A1A] text-white border-[#FF8A00]/20 focus:ring focus:ring-[#FF8A00] focus:border-[#FF8A00] focus:outline-none transition-all ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
});

// Adicionando displayName ao componente
Input.displayName = 'Input';

export default Input;