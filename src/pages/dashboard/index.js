import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  FiBarChart2, 
  FiTarget, 
  FiCalendar, 
  FiTrendingUp, 
  FiBook, 
  FiActivity,
  FiUsers,
  FiClock
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';

import DashboardLayout from '../../components/layout/DashboardLayout';
import MeasurementsChart from '../../components/dashboard/MeasurementsChart';
import ComingSoon from '../../components/common/ComingSoon';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [measurements, setMeasurements] = useState([]);
  const [goals, setGoals] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados do utilizador e resumos
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        // Carregar dados do utilizador
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_APIS_URL_REMOTE}/api/profile`, {
          method: 'GET',
          credentials: 'include',
        });

        // Carregar medidas recentes
        const measurementsResponse = await fetch(`${process.env.NEXT_PUBLIC_APIS_URL_REMOTE}/api/progress/measurements`, {
          method: 'GET',
          credentials: 'include',
        });

        // Carregar metas
        const goalsResponse = await fetch(`${process.env.NEXT_PUBLIC_APIS_URL_REMOTE}/api/progress/goals`, {
          method: 'GET',
          credentials: 'include',
        });

        // Verificar respostas
        if (!userResponse.ok || !measurementsResponse.ok || !goalsResponse.ok) {
          throw new Error('Falha ao carregar dados do dashboard');
        }

        // Processar dados
        const user = await userResponse.json();
        const measurements = await measurementsResponse.json();
        const goals = await goalsResponse.json();

        // Definir estados
        setUserData(user);
        setMeasurements(measurements.slice(0, 10)); // Apenas as 10 medidas mais recentes
        setGoals(goals.filter(goal => goal.status !== 'achieved' && goal.status !== 'failed').slice(0, 5));

        // Carregar materiais se possível
        try {
          const materialsResponse = await fetch(`${process.env.NEXT_PUBLIC_APIS_URL_REMOTE}/api/materials/access`, {
            method: 'GET',
            credentials: 'include',
          });

          if (materialsResponse.ok) {
            const materials = await materialsResponse.json();
            setMaterials(materials.slice(0, 3)); // Apenas os 3 materiais mais recentes
          }
        } catch (err) {
          console.error('Erro ao carregar materiais:', err);
        }

      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
        toast.error('Falha ao carregar dados do dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const renderLoadingState = () => (
    <div className="flex justify-center items-center h-64">
      <div className="w-16 h-16 border-4 border-[#FF8A00] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Calcular progresso total baseado nas metas
  const calculateOverallProgress = () => {
    if (!goals.length) return 0;
    
    const activeGoals = goals.filter(goal => goal.status === 'in_progress');
    if (!activeGoals.length) return 0;

    let totalProgress = 0;
    
    activeGoals.forEach(goal => {
      if (goal.current_value && goal.target_value) {
        const progress = (goal.current_value / goal.target_value) * 100;
        totalProgress += Math.min(progress, 100);
      }
    });

    return Math.round(totalProgress / activeGoals.length);
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Diogo Samuel</title>
      </Head>

      {isLoading ? (
        renderLoadingState()
      ) : (
        <>
          {/* Cabeçalho com boas-vindas */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">
              {`Olá, ${userData?.display_name || userData?.first_name || userData?.username || 'Utilizador'}!`}
            </h1>
            <p className="text-gray-400 mt-1">
              Bem-vindo ao seu dashboard personalizado. Acompanhe o seu progresso e alcance os seus objetivos.
            </p>
          </div>

          {/* Cards de resumo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Card de Medidas */}
            <Link href="/dashboard/progress" className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] hover:border-[#FF8A00] transition-all duration-300 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total de Medidas</p>
                  <p className="text-3xl font-bold text-white mt-1">{measurements.length}</p>
                  <p className="mt-2 text-gray-400 text-sm">
                    {measurements.length > 0 
                      ? `Última em ${formatDate(measurements[0].measurement_date)}` 
                      : 'Nenhuma medida registada'}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] p-3 rounded-full">
                  <FiBarChart2 className="h-6 w-6 text-white" />
                </div>
              </div>
            </Link>

            {/* Card de Metas */}
            <Link href="/dashboard/goals" className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] hover:border-[#FF8A00] transition-all duration-300 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Metas Ativas</p>
                  <p className="text-3xl font-bold text-white mt-1">{goals.length}</p>
                  <p className="mt-2 text-gray-400 text-sm">
                    {calculateOverallProgress()}% de progresso geral
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] p-3 rounded-full">
                  <FiTarget className="h-6 w-6 text-white" />
                </div>
              </div>
            </Link>

            {/* Card de Materiais */}
            <Link href="/dashboard/materials" className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] hover:border-[#FF8A00] transition-all duration-300 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Materiais Acessados</p>
                  <p className="text-3xl font-bold text-white mt-1">{materials.length}</p>
                  <p className="mt-2 text-gray-400 text-sm">
                    {materials.length > 0 
                      ? `Último acesso em ${formatDate(materials[0].last_access_date)}` 
                      : 'Nenhum material acessado'}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] p-3 rounded-full">
                  <FiBook className="h-6 w-6 text-white" />
                </div>
              </div>
            </Link>

            {/* Card de Dias Ativos */}
            <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Dias Ativos</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {userData?.last_login 
                      ? Math.ceil((new Date() - new Date(userData.created_at)) / (1000 * 60 * 60 * 24))
                      : 0}
                  </p>
                  <p className="mt-2 text-gray-400 text-sm">
                    {userData?.created_at 
                      ? `Membro desde ${formatDate(userData.created_at)}` 
                      : 'Iniciando jornada'}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] p-3 rounded-full">
                  <FiCalendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Gráfico de Progresso */}
          <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6 mb-6">
            <h2 className="text-lg font-medium text-white mb-4">Evolução Recente</h2>
            {measurements.length > 0 ? (
              <div className="h-80">
                <MeasurementsChart 
                  measurements={measurements} 
                  timeRange="3m"
                />
              </div>
            ) : (
              <div className="bg-[#1A1A1A] rounded-lg p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="32" fill="#1A1A1A" />
                    <circle cx="40" cy="40" r="30" stroke="#333" strokeWidth="2" />
                    <rect x="25" y="30" width="30" height="4" rx="1" fill="#FF8A00" fillOpacity="0.7" />
                    <rect x="25" y="38" width="20" height="4" rx="1" fill="#FF8A00" fillOpacity="0.7" />
                    <rect x="25" y="46" width="25" height="4" rx="1" fill="#FF8A00" fillOpacity="0.7" />
                    <circle cx="55" cy="55" r="10" fill="#1A1A1A" stroke="#333" />
                    <path d="M55 50V60M50 55H60" stroke="#666" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-gray-400">Nenhuma medida registada ainda.</p>
                <Link href="/dashboard/progress" className="mt-2 inline-flex items-center text-[#FF8A00] hover:text-[#FF5F00]">
                  <span>Registrar primeira medida</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          {/* Coming Soon Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ComingSoon 
              title="Estatísticas Detalhadas"
              message="Em breve, terá acesso a estatísticas mais detalhadas sobre o seu progresso e desempenho."
            />
            <ComingSoon 
              title="Personalização Avançada"
              message="Estamos a desenvolver funcionalidades para personalizar ainda mais a sua experiência no dashboard."
            />
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage; 