import React, { useState } from 'react';
import Head from 'next/head';
import { FiActivity, FiCalendar, FiClock, FiTrendingUp, FiTarget, FiAward } from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ComingSoon from '../../components/common/ComingSoon';

const ActivitiesPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [activities] = useState([
    {
      id: 1,
      type: 'workout',
      title: 'Treino de Força',
      description: 'Completou um treino de força de 45 minutos',
      date: '2024-03-20',
      time: '10:30',
      duration: '45 min',
      calories: 320,
      icon: FiActivity
    },
    {
      id: 2,
      type: 'goal',
      title: 'Meta Alcançada',
      description: 'Alcançou a sua meta semanal de treinos',
      date: '2024-03-19',
      time: '15:45',
      icon: FiTarget
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Nova Conquista',
      description: 'Desbloqueou a conquista "Consistência"',
      date: '2024-03-18',
      time: '09:15',
      icon: FiAward
    }
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Atividades | Diogo Samuel</title>
      </Head>

      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            Atividades
          </h1>
          <p className="text-gray-400 mt-1">
            Acompanhe o seu histórico de atividades e conquistas.
          </p>
        </div>

        {/* Filtros de Período */}
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedPeriod('day')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              selectedPeriod === 'day'
                ? 'bg-[#FF8A00] text-white'
                : 'bg-[#1A1A1A] text-gray-400 hover:bg-[#333]'
            }`}
          >
            Hoje
          </button>
          <button
            onClick={() => setSelectedPeriod('week')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              selectedPeriod === 'week'
                ? 'bg-[#FF8A00] text-white'
                : 'bg-[#1A1A1A] text-gray-400 hover:bg-[#333]'
            }`}
          >
            Esta Semana
          </button>
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              selectedPeriod === 'month'
                ? 'bg-[#FF8A00] text-white'
                : 'bg-[#1A1A1A] text-gray-400 hover:bg-[#333]'
            }`}
          >
            Este Mês
          </button>
        </div>

        {/* Lista de Atividades */}
        <div className="space-y-4">
          {activities.map(activity => (
            <div
              key={activity.id}
              className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-[#FF8A00]/10">
                  <activity.icon className="w-6 h-6 text-[#FF8A00]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white">{activity.title}</h3>
                  <p className="text-gray-400 mt-1">{activity.description}</p>
                  <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiCalendar className="w-4 h-4 mr-1" />
                      {formatDate(activity.date)}
                    </div>
                    <div className="flex items-center">
                      <FiClock className="w-4 h-4 mr-1" />
                      {activity.time}
                    </div>
                    {activity.duration && (
                      <div className="flex items-center">
                        <FiTrendingUp className="w-4 h-4 mr-1" />
                        {activity.duration}
                      </div>
                    )}
                    {activity.calories && (
                      <div className="flex items-center">
                        <FiActivity className="w-4 h-4 mr-1" />
                        {activity.calories} kcal
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {activities.length === 0 && (
            <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6 text-center">
              <FiActivity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Não há atividades registadas para este período.</p>
            </div>
          )}
        </div>

        {/* Coming Soon Section */}
        <ComingSoon 
          title="Mais Detalhes de Atividade"
          message="Em breve, terá acesso a mais informações e estatísticas sobre as suas atividades."
        />
      </div>
    </DashboardLayout>
  );
};

export default ActivitiesPage; 