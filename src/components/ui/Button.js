export default function Button({ text, onClick, disabled, type = 'submit' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 rounded-md transition-all duration-200 shadow-md ${
        disabled
          ? "bg-gray-600 cursor-not-allowed opacity-50"
          : "bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] hover:opacity-90 text-white font-medium"
      }`}
    >
      {text}
    </button>
  );
}