import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

const GoalForm = ({ onAddGoal, isSubmitting }) => {
  const [formData, setFormData] = useState({
    goal_type: '',
    target_value: '',
    current_value: '',
    start_date: new Date().toISOString().split('T')[0],
    target_date: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);

  const goalTypes = [
    { value: 'weight', label: 'Meta de Peso' },
    { value: 'measurement', label: 'Meta de Medida' },
    { value: 'performance', label: 'Meta de Performance' },
    { value: 'habit', label: 'Meta de Hábito' },
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
    
    if (!formData.goal_type) {
      newErrors.goal_type = 'Selecione um tipo de meta';
    }
    
    if (!formData.target_value) {
      newErrors.target_value = 'Digite um valor alvo';
    } else if (isNaN(formData.target_value) || parseFloat(formData.target_value) <= 0) {
      newErrors.target_value = 'Digite um valor numérico válido';
    }
    
    if (!formData.target_date) {
      newErrors.target_date = 'Selecione uma data alvo';
    } else {
      const targetDate = new Date(formData.target_date);
      const today = new Date();
      
      if (targetDate <= today) {
        newErrors.target_date = 'A data alvo deve ser no futuro';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddGoal({
        ...formData,
        target_value: parseFloat(formData.target_value),
        current_value: formData.current_value ? parseFloat(formData.current_value) : 0,
      });
      
      // Limpar formulário após envio
      setFormData({
        goal_type: '',
        target_value: '',
        current_value: '',
        start_date: new Date().toISOString().split('T')[0],
        target_date: '',
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
        <h3 className="font-medium text-gray-700">Adicionar Nova Meta</h3>
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
              <label htmlFor="goal_type" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Meta *
              </label>
              <select
                id="goal_type"
                name="goal_type"
                value={formData.goal_type}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${
                  errors.goal_type ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                disabled={isSubmitting}
              >
                <option value="">Selecione um tipo</option>
                {goalTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.goal_type && (
                <p className="mt-1 text-sm text-red-600">{errors.goal_type}</p>
              )}
            </div>

            <div>
              <label htmlFor="target_value" className="block text-sm font-medium text-gray-700 mb-1">
                Valor Alvo *
              </label>
              <input
                type="number"
                step="0.1"
                id="target_value"
                name="target_value"
                value={formData.target_value}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${
                  errors.target_value ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Exemplo: 70.0"
                disabled={isSubmitting}
              />
              {errors.target_value && (
                <p className="mt-1 text-sm text-red-600">{errors.target_value}</p>
              )}
            </div>

            <div>
              <label htmlFor="current_value" className="block text-sm font-medium text-gray-700 mb-1">
                Valor Atual
              </label>
              <input
                type="number"
                step="0.1"
                id="current_value"
                name="current_value"
                value={formData.current_value}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Exemplo: 80.5"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="target_date" className="block text-sm font-medium text-gray-700 mb-1">
                Data Alvo *
              </label>
              <input
                type="date"
                id="target_date"
                name="target_date"
                value={formData.target_date}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${
                  errors.target_date ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                min={new Date().toISOString().split('T')[0]}
                disabled={isSubmitting}
              />
              {errors.target_date && (
                <p className="mt-1 text-sm text-red-600">{errors.target_date}</p>
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
              placeholder="Observações sobre esta meta..."
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
                'Salvar Meta'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default GoalForm; 