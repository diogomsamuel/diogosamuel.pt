import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

const MeasurementForm = ({ onAddMeasurement, isSubmitting }) => {
  const [formData, setFormData] = useState({
    measurement_type: '',
    value: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);

  const measurementTypes = [
    { value: 'chest', label: 'Peitoral' },
    { value: 'waist', label: 'Cintura' },
    { value: 'hips', label: 'Quadril' },
    { value: 'arms', label: 'Braços' },
    { value: 'thighs', label: 'Coxas' },
    { value: 'calves', label: 'Panturrilhas' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Limpar erro quando o campo for preenchido
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.measurement_type) {
      newErrors.measurement_type = 'Selecione um tipo de medida';
    }
    
    if (!formData.value) {
      newErrors.value = 'Digite um valor';
    } else if (isNaN(formData.value) || parseFloat(formData.value) <= 0) {
      newErrors.value = 'Digite um valor numérico válido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddMeasurement({
        ...formData,
        value: parseFloat(formData.value),
      });
      
      // Limpar formulário após envio
      setFormData({
        measurement_type: '',
        value: '',
        notes: '',
      });
      
      // Fechar formulário após envio
      setIsFormVisible(false);
    }
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    
    // Limpar erros ao abrir o formulário
    if (!isFormVisible) {
      setErrors({});
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-medium text-gray-700">Adicionar Nova Medida</h3>
        <button
          onClick={toggleForm}
          className={`p-2 rounded-full ${
            isFormVisible ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
          }`}
        >
          {isFormVisible ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <FiPlus className="h-5 w-5" />
          )}
        </button>
      </div>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="measurement_type" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Medida *
              </label>
              <select
                id="measurement_type"
                name="measurement_type"
                value={formData.measurement_type}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${
                  errors.measurement_type ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                disabled={isSubmitting}
              >
                <option value="">Selecione um tipo</option>
                {measurementTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.measurement_type && (
                <p className="mt-1 text-sm text-red-600">{errors.measurement_type}</p>
              )}
            </div>

            <div>
              <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
                Valor (cm) *
              </label>
              <input
                type="number"
                step="0.1"
                id="value"
                name="value"
                value={formData.value}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${
                  errors.value ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Exemplo: 80.5"
                disabled={isSubmitting}
              />
              {errors.value && (
                <p className="mt-1 text-sm text-red-600">{errors.value}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notas (opcional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="2"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Observações sobre esta medida..."
              disabled={isSubmitting}
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={toggleForm}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Salvando...
                </>
              ) : (
                'Salvar Medida'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MeasurementForm; 