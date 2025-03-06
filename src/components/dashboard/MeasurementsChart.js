import React, { useState, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MeasurementsChart = ({ measurements, type, timeRange = 'all' }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [isLoading, setIsLoading] = useState(true);

  const measurementTypeLabels = useMemo(() => ({
    chest: 'Peitoral',
    waist: 'Cintura',
    hips: 'Quadril',
    arms: 'Braços',
    thighs: 'Coxas',
    calves: 'Panturrilhas',
  }), []);

  const chartColors = useMemo(() => ({
    chest: { bg: 'rgba(54, 162, 235, 0.2)', border: 'rgba(54, 162, 235, 1)' },
    waist: { bg: 'rgba(255, 99, 132, 0.2)', border: 'rgba(255, 99, 132, 1)' },
    hips: { bg: 'rgba(75, 192, 192, 0.2)', border: 'rgba(75, 192, 192, 1)' },
    arms: { bg: 'rgba(255, 159, 64, 0.2)', border: 'rgba(255, 159, 64, 1)' },
    thighs: { bg: 'rgba(153, 102, 255, 0.2)', border: 'rgba(153, 102, 255, 1)' },
    calves: { bg: 'rgba(255, 206, 86, 0.2)', border: 'rgba(255, 206, 86, 1)' },
  }), []);

  useEffect(() => {
    if (!measurements || measurements.length === 0) {
      setIsLoading(false);
      return;
    }

    // Filtrar medidas pelo tipo e intervalo de tempo
    let filteredMeasurements = [...measurements];
    
    if (type && type !== 'all') {
      filteredMeasurements = filteredMeasurements.filter(m => m.measurement_type === type);
    }

    // Aplicar filtro de tempo
    if (timeRange !== 'all') {
      const now = new Date();
      let startDate;

      switch (timeRange) {
        case '1m':
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case '3m':
          startDate = new Date(now.setMonth(now.getMonth() - 3));
          break;
        case '6m':
          startDate = new Date(now.setMonth(now.getMonth() - 6));
          break;
        case '1y':
          startDate = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        filteredMeasurements = filteredMeasurements.filter(
          m => new Date(m.measurement_date) >= startDate
        );
      }
    }

    // Agrupar medidas por tipo
    const measurementsByType = {};
    filteredMeasurements.forEach(m => {
      if (!measurementsByType[m.measurement_type]) {
        measurementsByType[m.measurement_type] = [];
      }
      measurementsByType[m.measurement_type].push({
        value: m.value,
        date: new Date(m.measurement_date),
      });
    });

    // Ordenar medidas por data
    Object.keys(measurementsByType).forEach(key => {
      measurementsByType[key].sort((a, b) => a.date - b.date);
    });

    // Criar conjuntos de dados para o gráfico
    const datasets = [];
    const allDates = [];

    Object.keys(measurementsByType).forEach(key => {
      const data = measurementsByType[key];
      
      // Adicionar todas as datas para rótulos
      data.forEach(item => {
        allDates.push(item.date.toISOString());
      });

      datasets.push({
        label: measurementTypeLabels[key] || key,
        data: data.map(item => ({
          x: item.date.toISOString(),
          y: item.value,
        })),
        borderColor: chartColors[key]?.border || 'rgba(54, 162, 235, 1)',
        backgroundColor: chartColors[key]?.bg || 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      });
    });

    // Ordenar e deduplificar todas as datas para rótulos
    const uniqueDates = [...new Set(allDates)].sort();
    
    // Formatar rótulos de data
    const labels = uniqueDates.map(dateStr => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    });

    setChartData({
      labels,
      datasets,
    });

    setIsLoading(false);
  }, [measurements, type, timeRange, chartColors, measurementTypeLabels]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!measurements || measurements.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-500">Nenhuma medida registrada ainda.</p>
      </div>
    );
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y} cm`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Centímetros (cm)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Data',
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 h-96">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MeasurementsChart; 