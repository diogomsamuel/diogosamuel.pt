import React, { useState } from 'react';
import Head from 'next/head';
import { FiCheck, FiX, FiRefreshCw, FiCalendar, FiCreditCard } from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ComingSoon from '../../components/common/ComingSoon';

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 'sub-1',
      name: 'Plano Premium',
      description: 'Acesso completo a todos os recursos e funcionalidades',
      price: 29.99,
      interval: 'month',
      status: 'active',
      nextBilling: '2024-04-20T10:30:00Z',
      features: [
        'Acesso ilimitado a todos os treinos',
        'Suporte prioritário',
        'Análise avançada de progresso',
        'Conteúdo exclusivo'
      ]
    },
    {
      id: 'sub-2',
      name: 'Plano Básico',
      description: 'Acesso a recursos essenciais',
      price: 19.99,
      interval: 'month',
      status: 'inactive',
      nextBilling: null,
      features: [
        'Acesso a treinos básicos',
        'Suporte por email',
        'Análise básica de progresso'
      ]
    }
  ]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Assinaturas | Diogo Samuel</title>
      </Head>

      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            Assinaturas
          </h1>
          <p className="text-gray-400 mt-1">
            Gerencie suas assinaturas e escolha o plano ideal para você.
          </p>
        </div>

        {/* Planos de Assinatura */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subscriptions.map(subscription => (
            <div
              key={subscription.id}
              className={`bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border p-6 ${
                subscription.status === 'active'
                  ? 'border-[#FF8A00]'
                  : 'border-[#333]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white">{subscription.name}</h3>
                  <p className="text-gray-400 mt-1">{subscription.description}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  subscription.status === 'active'
                    ? 'bg-[#FF8A00]/10 text-[#FF8A00]'
                    : 'bg-gray-500/10 text-gray-500'
                }`}>
                  {subscription.status === 'active' ? 'Ativo' : 'Inativo'}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-white">
                    {formatAmount(subscription.price)}
                  </span>
                  <span className="text-gray-400 ml-2">
                    /{subscription.interval === 'month' ? 'mês' : 'ano'}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {subscription.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <FiCheck className="w-5 h-5 text-[#FF8A00]" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {subscription.status === 'active' && (
                <div className="mt-6 pt-6 border-t border-[#333]">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <FiCalendar className="w-4 h-4" />
                      <span>Próximo pagamento:</span>
                    </div>
                    <span className="text-white">
                      {formatDate(subscription.nextBilling)}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <button
                  className={`w-full flex items-center justify-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                    subscription.status === 'active'
                      ? 'bg-[#1A1A1A] text-white hover:bg-[#333]'
                      : 'bg-[#FF8A00] text-white hover:bg-[#FF5F00]'
                  }`}
                >
                  {subscription.status === 'active' ? 'Cancelar Assinatura' : 'Ativar Plano'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Histórico de Faturamento */}
        <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Histórico de Faturamento</h2>
            <button className="flex items-center px-4 py-2 bg-[#1A1A1A] text-white rounded-lg hover:bg-[#333] transition-colors duration-200">
              <FiRefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-[#FF8A00]/10">
                  <FiCreditCard className="w-6 h-6 text-[#FF8A00]" />
                </div>
                <div>
                  <p className="text-white">Assinatura Mensal - Plano Premium</p>
                  <p className="text-sm text-gray-400">
                    {formatDate('2024-03-20T10:30:00Z')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">
                  {formatAmount(29.99)}
                </p>
                <p className="text-sm text-green-500">
                  Pago
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <ComingSoon 
          title="Mais Opções de Assinatura"
          message="Em breve, terá acesso a mais planos e opções de assinatura personalizadas."
        />
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionsPage; 