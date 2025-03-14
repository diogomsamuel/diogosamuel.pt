import React from 'react';
import { FiClock } from 'react-icons/fi';

const ComingSoon = ({ title, message }) => {
  return (
    <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] hover:border-[#FF8A00] transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] p-3 rounded-full">
            <FiClock className="w-8 h-8 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-white text-center mb-2">{title}</h3>
        <p className="text-gray-400 text-center">{message}</p>
      </div>
    </div>
  );
};

export default ComingSoon; 