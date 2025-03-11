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

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [measurements, setMeasurements] = useState([]);
  const [goals, setGoals] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados do usuário e resumos
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        // Carregar dados do usuário
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
          method: 'GET',
          credentials: 'include',
        });

        // Carregar medidas recentes
        const measurementsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/progress/measurements`, {
          method: 'GET',
          credentials: 'include',
        });

        // Carregar metas
        const goalsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/progress/goals`, {
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
          const materialsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/materials/access`, {
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
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
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
            <h1 className="text-2xl font-bold text-gray-800">
              {`Olá, ${userData?.display_name || userData?.first_name || userData?.username || 'Usuário'}!`}
            </h1>
            <p className="text-gray-600 mt-1">
              Bem-vindo ao seu dashboard personalizado. Acompanhe seu progresso e alcance seus objetivos.
            </p>
          </div>

          {/* Cards de resumo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Card de Medidas */}
            <Link href="/dashboard/progress" className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-4 text-white hover:from-blue-600 hover:to-blue-700 transition duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total de Medidas</p>
                  <p className="text-3xl font-bold mt-1">{measurements.length}</p>
                  <p className="mt-2 text-blue-100 text-sm">
                    {measurements.length > 0 
                      ? `Última em ${formatDate(measurements[0].measurement_date)}` 
                      : 'Nenhuma medida registrada'}
                  </p>
                </div>
                <div className="bg-blue-400 bg-opacity-40 p-3 rounded-full">
                  <FiBarChart2 className="h-6 w-6" />
                </div>
              </div>
            </Link>

            {/* Card de Metas */}
            <Link href="/dashboard/goals" className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-4 text-white hover:from-green-600 hover:to-green-700 transition duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-green-100 text-sm">Metas Ativas</p>
                  <p className="text-3xl font-bold mt-1">{goals.length}</p>
                  <p className="mt-2 text-green-100 text-sm">
                    {calculateOverallProgress()}% de progresso geral
                  </p>
                </div>
                <div className="bg-green-400 bg-opacity-40 p-3 rounded-full">
                  <FiTarget className="h-6 w-6" />
                </div>
              </div>
            </Link>

            {/* Card de Materiais */}
            <Link href="/dashboard/materials" className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg p-4 text-white hover:from-purple-600 hover:to-purple-700 transition duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Materiais Acessados</p>
                  <p className="text-3xl font-bold mt-1">{materials.length}</p>
                  <p className="mt-2 text-purple-100 text-sm">
                    {materials.length > 0 
                      ? `Último acesso em ${formatDate(materials[0].last_access_date)}` 
                      : 'Nenhum material acessado'}
                  </p>
                </div>
                <div className="bg-purple-400 bg-opacity-40 p-3 rounded-full">
                  <FiBook className="h-6 w-6" />
                </div>
              </div>
            </Link>

            {/* Card de Dias Ativos */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg p-4 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Dias Ativos</p>
                  <p className="text-3xl font-bold mt-1">
                    {userData?.last_login 
                      ? Math.ceil((new Date() - new Date(userData.created_at)) / (1000 * 60 * 60 * 24))
                      : 0}
                  </p>
                  <p className="mt-2 text-orange-100 text-sm">
                    {userData?.created_at 
                      ? `Membro desde ${formatDate(userData.created_at)}` 
                      : 'Iniciando jornada'}
                  </p>
                </div>
                <div className="bg-orange-400 bg-opacity-40 p-3 rounded-full">
                  <FiCalendar className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Gráfico de Progresso */}
          <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Evolução Recente</h2>
            {measurements.length > 0 ? (
              <div className="h-80">
                <MeasurementsChart 
                  measurements={measurements} 
                  timeRange="3m"
                />
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Fundo do ícone */}
                    <circle cx="40" cy="40" r="32" fill="#F3F4F6" />
                    <circle cx="40" cy="40" r="30" stroke="#E5E7EB" strokeWidth="2" />
                    
                    {/* Ícone de régua/medição */}
                    <rect x="25" y="30" width="30" height="4" rx="1" fill="#FF8A00" fillOpacity="0.7" />
                    <rect x="25" y="38" width="20" height="4" rx="1" fill="#FF8A00" fillOpacity="0.7" />
                    <rect x="25" y="46" width="25" height="4" rx="1" fill="#FF8A00" fillOpacity="0.7" />
                    
                    {/* Indicação para adicionar */}
                    <circle cx="55" cy="55" r="10" fill="#F3F4F6" stroke="#E5E7EB" />
                    <path d="M55 50V60M50 55H60" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-gray-500">Nenhuma medida registrada ainda.</p>
                <Link href="/dashboard/progress" className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800">
                  Adicionar medidas
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            )}
          </div>

          {/* Seção de Metas e Acesso rápido */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Metas Ativas */}
            <div className="bg-white rounded-lg shadow-lg p-4 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-700">Metas Ativas</h2>
                <Link href="/dashboard/goals" className="text-sm text-blue-600 hover:text-blue-800">
                  Ver todas
                </Link>
              </div>

              {goals.length > 0 ? (
                <div className="space-y-4">
                  {goals.map((goal) => (
                    <div key={goal.id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {goal.goal_type === 'weight' && 'Meta de Peso'}
                            {goal.goal_type === 'measurement' && 'Meta de Medida'}
                            {goal.goal_type === 'performance' && 'Meta de Performance'}
                            {goal.goal_type === 'habit' && 'Meta de Hábito'}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {`Alvo: ${goal.target_value} • `}
                            {`Atual: ${goal.current_value || '0'}`}
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {`Até ${formatDate(goal.target_date)}`}
                        </div>
                      </div>

                      <div className="mt-2">
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div className="text-xs text-gray-600">
                              {`${Math.min(100, Math.round((goal.current_value / goal.target_value) * 100) || 0)}% completo`}
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                            <div 
                              style={{ width: `${Math.min(100, Math.round((goal.current_value / goal.target_value) * 100) || 0)}%` }} 
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Fundo do ícone */}
                      <circle cx="40" cy="40" r="32" fill="#F3F4F6" />
                      <circle cx="40" cy="40" r="30" stroke="#E5E7EB" strokeWidth="2" />
                      
                      {/* Ícone de alvo/meta */}
                      <circle cx="40" cy="40" r="25" stroke="#E5E7EB" strokeWidth="2" />
                      <circle cx="40" cy="40" r="18" stroke="#E5E7EB" strokeWidth="2" />
                      <circle cx="40" cy="40" r="10" stroke="#E5E7EB" strokeWidth="2" />
                      <circle cx="40" cy="40" r="5" fill="#FF8A00" fillOpacity="0.7" />
                      
                      {/* Setas apontando para o centro */}
                      <path d="M40 15V25" stroke="#FF8A00" strokeWidth="2" strokeLinecap="round" />
                      <path d="M40 55V65" stroke="#FF8A00" strokeWidth="2" strokeLinecap="round" />
                      <path d="M65 40L55 40" stroke="#FF8A00" strokeWidth="2" strokeLinecap="round" />
                      <path d="M25 40L15 40" stroke="#FF8A00" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="text-gray-500">Nenhuma meta ativa no momento.</p>
                  <Link href="/dashboard/goals" className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800">
                    Definir metas
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            {/* Acesso Rápido */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Acesso Rápido</h2>
              
              <nav className="space-y-3">
                <Link href="/dashboard/progress" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition duration-200">
                  <FiActivity className="mr-3 h-5 w-5 text-blue-500" />
                  <span>Registrar Medidas</span>
                </Link>

                <Link href="/dashboard/goals" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition duration-200">
                  <FiTrendingUp className="mr-3 h-5 w-5 text-blue-500" />
                  <span>Atualizar Metas</span>
                </Link>

                <Link href="/dashboard/materials" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition duration-200">
                  <FiBook className="mr-3 h-5 w-5 text-blue-500" />
                  <span>Acessar Materiais</span>
                </Link>

                <Link href="/dashboard/profile" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition duration-200">
                  <FiUsers className="mr-3 h-5 w-5 text-blue-500" />
                  <span>Atualizar Perfil</span>
                </Link>

                <Link href="/products" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition duration-200">
                  <FiClock className="mr-3 h-5 w-5 text-blue-500" />
                  <span>Explorar Planos</span>
                </Link>
              </nav>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage; 