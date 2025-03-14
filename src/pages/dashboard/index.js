import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  FiUser,
  FiBox,
  FiSettings,
  FiMessageSquare,
  FiCreditCard,
  FiArrowRight
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';

import DashboardLayout from '../../components/layout/DashboardLayout';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [subscription, setSubscription] = useState(null);
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

        // Carregar informações de subscrição
        const subscriptionResponse = await fetch(`${process.env.NEXT_PUBLIC_APIS_URL_REMOTE}/api/subscription`, {
          method: 'GET',
          credentials: 'include',
        });

        // Verificar respostas
        if (!userResponse.ok) {
          throw new Error('Falha ao carregar dados do utilizador');
        }

        // Processar dados
        const user = await userResponse.json();
        setUserData(user);

        if (subscriptionResponse.ok) {
          const subscription = await subscriptionResponse.json();
          setSubscription(subscription);
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
    if (!dateString) return 'N/A';
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
        <title>Painel Principal | Diogo Samuel</title>
      </Head>

      {isLoading ? (
        renderLoadingState()
      ) : (
        <div className="space-y-6">
          {/* Cabeçalho */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">
              Painel Principal
            </h1>
            <p className="text-gray-400 mt-1">
              Bem-vindo, {userData?.username || userData?.display_name || 'test'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Informações da Conta */}
            <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6">
              <div className="flex items-center mb-4">
                <FiUser className="w-6 h-6 text-[#FF8A00] mr-3" />
                <h2 className="text-lg font-medium text-white">Informações da Conta</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Utilizador</p>
                  <p className="text-white">{userData?.username || userData?.display_name || 'test'}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Último Acesso</p>
                  <p className="text-white">
                    {userData?.last_login ? formatDate(userData.last_login) : 'Primeira visita'}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Estado da Subscrição</p>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-[#FF8A00] rounded-full mr-2"></span>
                    <p className="text-white">
                      {subscription?.status === 'active' ? 'Ativa' : 'Inativa'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detalhes do Plano */}
            <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6">
              <div className="flex items-center mb-4">
                <FiBox className="w-6 h-6 text-[#FF8A00] mr-3" />
                <h2 className="text-lg font-medium text-white">Detalhes do Plano</h2>
              </div>
              
              {subscription?.status === 'active' ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Plano Atual</p>
                    <p className="text-white">{subscription.plan_name || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">Próximo Pagamento</p>
                    <p className="text-white">{formatDate(subscription.next_billing_date)}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">Valor</p>
                    <p className="text-white">
                      {subscription.amount ? 
                        new Intl.NumberFormat('pt-PT', {
                          style: 'currency',
                          currency: 'EUR'
                        }).format(subscription.amount) : 
                        'N/A'
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-400 mb-4">Sem planos ativos</p>
                  <Link href="/dashboard/subscriptions" className="inline-flex items-center text-[#FF8A00] hover:text-[#FF5F00]">
                    <span>Ver planos disponíveis</span>
                    <FiArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              )}
            </div>

            {/* Ações Rápidas */}
            <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6">
              <div className="flex items-center mb-4">
                <FiSettings className="w-6 h-6 text-[#FF8A00] mr-3" />
                <h2 className="text-lg font-medium text-white">Ações Rápidas</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <Link href="/dashboard/profile" className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg hover:bg-[#333] transition-colors duration-200">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-[#FF8A00]/10 mr-3">
                      <FiUser className="w-5 h-5 text-[#FF8A00]" />
                    </div>
                    <span className="text-white">Atualizar Perfil</span>
                  </div>
                  <FiArrowRight className="w-4 h-4 text-gray-400" />
                </Link>
                
                <Link href="/dashboard/subscriptions" className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg hover:bg-[#333] transition-colors duration-200">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-[#FF8A00]/10 mr-3">
                      <FiCreditCard className="w-5 h-5 text-[#FF8A00]" />
                    </div>
                    <span className="text-white">Comprar Plano</span>
                  </div>
                  <FiArrowRight className="w-4 h-4 text-gray-400" />
                </Link>
                
                <Link href="/dashboard/help" className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg hover:bg-[#333] transition-colors duration-200">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-[#FF8A00]/10 mr-3">
                      <FiMessageSquare className="w-5 h-5 text-[#FF8A00]" />
                    </div>
                    <span className="text-white">Contactar Suporte</span>
                  </div>
                  <FiArrowRight className="w-4 h-4 text-gray-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage; 