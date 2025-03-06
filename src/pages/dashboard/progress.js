import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FiFilter } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

import DashboardLayout from '../../components/layout/DashboardLayout';
import MeasurementForm from '../../components/dashboard/MeasurementForm';
import MeasurementsTable from '../../components/dashboard/MeasurementsTable';
import MeasurementsChart from '../../components/dashboard/MeasurementsChart';

const ProgressPage = () => {
  const [measurements, setMeasurements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [timeRange, setTimeRange] = useState('all');
  const [error, setError] = useState(null);

  const measurementTypes = [
    { value: 'all', label: 'Todas as medidas' },
    { value: 'chest', label: 'Peitoral' },
    { value: 'waist', label: 'Cintura' },
    { value: 'hips', label: 'Quadril' },
    { value: 'arms', label: 'Braços' },
    { value: 'thighs', label: 'Coxas' },
    { value: 'calves', label: 'Panturrilhas' },
  ];

  const timeRanges = [
    { value: 'all', label: 'Todo período' },
    { value: '1m', label: 'Último mês' },
    { value: '3m', label: 'Últimos 3 meses' },
    { value: '6m', label: 'Últimos 6 meses' },
    { value: '1y', label: 'Último ano' },
  ];

  // Carregar medidas
  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/progress/measurements`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Falha ao carregar medidas');
        }

        const data = await response.json();
        setMeasurements(data);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar medidas:', err);
        setError('Não foi possível carregar suas medidas. Tente novamente mais tarde.');
        toast.error('Falha ao carregar medidas');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeasurements();
  }, []);

  // Adicionar nova medida
  const handleAddMeasurement = async (measurementData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/progress/measurements`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(measurementData),
      });

      if (!response.ok) {
        throw new Error('Falha ao adicionar medida');
      }

      const newMeasurement = await response.json();
      setMeasurements([newMeasurement, ...measurements]);
      toast.success('Medida adicionada com sucesso!');
    } catch (err) {
      console.error('Erro ao adicionar medida:', err);
      toast.error('Falha ao adicionar medida');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Deletar medida
  const handleDeleteMeasurement = async (id) => {
    if (!confirm('Tem certeza que deseja excluir esta medida?')) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/progress/measurements?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Falha ao excluir medida');
      }

      setMeasurements(measurements.filter(m => m.id !== id));
      toast.success('Medida excluída com sucesso!');
    } catch (err) {
      console.error('Erro ao excluir medida:', err);
      toast.error('Falha ao excluir medida');
    }
  };

  // Filtrar medidas por tipo
  const getFilteredMeasurements = () => {
    if (selectedType === 'all') {
      return measurements;
    }
    return measurements.filter(m => m.measurement_type === selectedType);
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Progresso | Diogo Samuel</title>
      </Head>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Acompanhamento de Progresso</h1>
        <p className="text-gray-600 mt-1">
          Acompanhe a evolução das suas medidas corporais ao longo do tempo.
        </p>
      </div>

      <MeasurementForm 
        onAddMeasurement={handleAddMeasurement} 
        isSubmitting={isSubmitting} 
      />

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-lg font-medium text-gray-700 mb-2 md:mb-0">Evolução das Medidas</h2>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <div className="flex items-center">
              <FiFilter className="mr-2 text-gray-500" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="block w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {measurementTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="block w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {timeRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <MeasurementsChart 
          measurements={measurements} 
          type={selectedType}
          timeRange={timeRange}
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-700">Histórico de Medidas</h3>
        </div>
        
        {error ? (
          <div className="p-4 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <MeasurementsTable 
            measurements={getFilteredMeasurements()} 
            onDelete={handleDeleteMeasurement}
            isLoading={isLoading}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProgressPage; 