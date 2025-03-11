import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

const MeasurementsTable = ({ measurements, onDelete, isLoading }) => {
  const [sortField, setSortField] = useState('measurement_date');
  const [sortDirection, setSortDirection] = useState('desc');

  const measurementTypeLabels = {
    chest: 'Peitoral',
    waist: 'Cintura',
    hips: 'Quadril',
    arms: 'Braços',
    thighs: 'Coxas',
    calves: 'Panturrilhas',
  };

  // Função para ordenar medidas
  const sortedMeasurements = [...(measurements || [])].sort((a, b) => {
    if (sortField === 'measurement_date') {
      const dateA = new Date(a[sortField]);
      const dateB = new Date(b[sortField]);
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortField === 'value') {
      return sortDirection === 'asc' 
        ? parseFloat(a[sortField]) - parseFloat(b[sortField])
        : parseFloat(b[sortField]) - parseFloat(a[sortField]);
    } else {
      const valueA = a[sortField] || '';
      const valueB = b[sortField] || '';
      return sortDirection === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
  });

  // Função para alternar ordenação
  const toggleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Renderizar seta de ordenação
  const renderSortArrow = (field) => {
    if (sortField !== field) return null;
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!measurements || measurements.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <div className="mb-4 flex justify-center">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Fundo do ícone */}
            <circle cx="40" cy="40" r="32" fill="#F3F4F6" />
            <circle cx="40" cy="40" r="30" stroke="#E5E7EB" strokeWidth="2" />
            
            {/* Ícone de tabela vazia */}
            <rect x="20" y="25" width="40" height="30" rx="2" stroke="#9CA3AF" strokeWidth="2" />
            <line x1="20" y1="35" x2="60" y2="35" stroke="#9CA3AF" strokeWidth="2" />
            <line x1="35" y1="25" x2="35" y2="55" stroke="#9CA3AF" strokeWidth="2" />
            
            {/* Ícone de medida com detalhe laranja */}
            <path d="M30 42H25V45H30V42Z" fill="#FF8A00" fillOpacity="0.7" />
            <path d="M45 42H40V45H45V42Z" fill="#FF8A00" fillOpacity="0.7" />
          </svg>
        </div>
        <p className="text-gray-500">Nenhuma medida registrada ainda.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => toggleSort('measurement_type')}
              >
                Tipo de Medida
                {renderSortArrow('measurement_type')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => toggleSort('value')}
              >
                Valor (cm)
                {renderSortArrow('value')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => toggleSort('measurement_date')}
              >
                Data
                {renderSortArrow('measurement_date')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Notas
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedMeasurements.map((measurement) => (
              <tr key={measurement.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {measurementTypeLabels[measurement.measurement_type] || measurement.measurement_type}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {parseFloat(measurement.value).toFixed(1)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {formatDate(measurement.measurement_date)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {measurement.notes || '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onDelete(measurement.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeasurementsTable; 