import React, { useState } from 'react';
import Head from 'next/head';
import { FiBarChart2, FiDownload, FiCalendar, FiTrendingUp, FiTarget, FiActivity } from 'react-icons/fi';

import DashboardLayout from '../../components/layout/DashboardLayout';
import ComingSoon from '../../components/common/ComingSoon';

const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('progress');

  const reports = [
    {
      id: 'progress',
      title: 'Relatório de Progresso',
      description: 'Análise detalhada do seu progresso ao longo do tempo',
      icon: FiTrendingUp,
      metrics: [
        { label: 'Treinos Completados', value: '12' },
        { label: 'Tempo Total', value: '540 min' },
        { label: 'Calorias Queimadas', value: '3,240' },
        { label: 'Metas Alcançadas', value: '3' }
      ]
    },
    {
      id: 'performance',
      title: 'Relatório de Desempenho',
      description: 'Métricas de desempenho e evolução',
      icon: FiTarget,
      metrics: [
        { label: 'Intensidade Média', value: '75%' },
        { label: 'Consistência', value: '85%' },
        { label: 'Recuperação', value: '90%' },
        { label: 'Progresso Geral', value: '78%' }
      ]
    },
    {
      id: 'activity',
      title: 'Relatório de Atividade',
      description: 'Detalhes das suas atividades e rotinas',
      icon: FiActivity,
      metrics: [
        { label: 'Dias Ativos', value: '15' },
        { label: 'Sessões', value: '18' },
        { label: 'Tipos de Exercício', value: '5' },
        { label: 'Distância Total', value: '45 km' }
      ]
    }
  ];

  return (
    <DashboardLayout>
      <Head>
        <title>Relatórios | Diogo Samuel</title>
      </Head>

      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            Relatórios
          </h1>
          <p className="text-gray-400 mt-1">
            Acompanhe o seu progresso com relatórios detalhados e análises.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Período */}
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedPeriod === 'week'
                  ? 'bg-[#FF8A00] text-white'
                  : 'bg-[#1A1A1A] text-gray-400 hover:bg-[#333]'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedPeriod === 'month'
                  ? 'bg-[#FF8A00] text-white'
                  : 'bg-[#1A1A1A] text-gray-400 hover:bg-[#333]'
              }`}
            >
              Mês
            </button>
            <button
              onClick={() => setSelectedPeriod('year')}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedPeriod === 'year'
                  ? 'bg-[#FF8A00] text-white'
                  : 'bg-[#1A1A1A] text-gray-400 hover:bg-[#333]'
              }`}
            >
              Ano
            </button>
          </div>

          {/* Botão de Download */}
          <button className="flex items-center px-4 py-2 bg-[#FF8A00] text-white rounded-lg hover:bg-[#FF5F00] transition-colors duration-200">
            <FiDownload className="w-4 h-4 mr-2" />
            Exportar Relatório
          </button>
        </div>

        {/* Relatórios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map(report => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border p-6 cursor-pointer transition-all duration-200 ${
                selectedReport === report.id
                  ? 'border-[#FF8A00]'
                  : 'border-[#333] hover:border-[#FF8A00]/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-full bg-[#FF8A00]/10">
                  <report.icon className="w-6 h-6 text-[#FF8A00]" />
                </div>
                <button className="p-2 text-gray-400 hover:text-white transition-colors duration-200">
                  <FiDownload className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-lg font-medium text-white mt-4">{report.title}</h3>
              <p className="text-gray-400 mt-1">{report.description}</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                {report.metrics.map((metric, index) => (
                  <div key={index} className="bg-[#1A1A1A] rounded-lg p-4">
                    <p className="text-sm text-gray-400">{metric.label}</p>
                    <p className="text-xl font-semibold text-white mt-1">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Gráfico */}
        <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Evolução do Progresso</h2>
            <div className="flex items-center space-x-2 text-gray-400">
              <FiCalendar className="w-4 h-4" />
              <span>Últimos 30 dias</span>
            </div>
          </div>

          <div className="h-80 flex items-center justify-center">
            <div className="text-center">
              <FiBarChart2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Gráfico em desenvolvimento</p>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <ComingSoon 
          title="Mais Tipos de Relatórios"
          message="Em breve, terá acesso a mais tipos de relatórios e análises detalhadas."
        />
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage; 