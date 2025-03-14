import React, { useState } from 'react';
import Head from 'next/head';
import { FiCreditCard, FiPlus, FiTrash2, FiCheck, FiX, FiRefreshCw } from 'react-icons/fi';

import DashboardLayout from '../../components/layout/DashboardLayout';
import ComingSoon from '../../components/common/ComingSoon';

const PaymentsPage = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'card-1',
      type: 'card',
      last4: '4242',
      brand: 'visa',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 'card-2',
      type: 'card',
      last4: '8888',
      brand: 'mastercard',
      expiry: '06/24',
      isDefault: false
    }
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: 'tx-1',
      date: '2024-03-20T10:30:00Z',
      amount: 29.99,
      status: 'completed',
      description: 'Assinatura Mensal'
    },
    {
      id: 'tx-2',
      date: '2024-02-20T10:30:00Z',
      amount: 29.99,
      status: 'completed',
      description: 'Assinatura Mensal'
    },
    {
      id: 'tx-3',
      date: '2024-01-20T10:30:00Z',
      amount: 29.99,
      status: 'completed',
      description: 'Assinatura Mensal'
    }
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
        <title>Pagamentos | Diogo Samuel</title>
      </Head>

      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            Pagamentos
          </h1>
          <p className="text-gray-400 mt-1">
            Gerencie seus métodos de pagamento e visualize suas transações.
          </p>
        </div>

        {/* Métodos de Pagamento */}
        <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Métodos de Pagamento</h2>
            <button className="flex items-center px-4 py-2 bg-[#FF8A00] text-white rounded-lg hover:bg-[#FF5F00] transition-colors duration-200">
              <FiPlus className="w-4 h-4 mr-2" />
              Adicionar Cartão
            </button>
          </div>

          <div className="space-y-4">
            {paymentMethods.map(method => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-[#FF8A00]/10">
                    <FiCreditCard className="w-6 h-6 text-[#FF8A00]" />
                  </div>
                  <div>
                    <p className="text-white">
                      •••• {method.last4} •••• {method.last4}
                    </p>
                    <p className="text-sm text-gray-400">
                      Expira em {method.expiry}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {method.isDefault && (
                    <span className="px-2 py-1 text-xs font-medium text-[#FF8A00] bg-[#FF8A00]/10 rounded">
                      Padrão
                    </span>
                  )}
                  <button className="p-2 text-gray-400 hover:text-white transition-colors duration-200">
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Histórico de Transações */}
        <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Histórico de Transações</h2>
            <button className="flex items-center px-4 py-2 bg-[#1A1A1A] text-white rounded-lg hover:bg-[#333] transition-colors duration-200">
              <FiRefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </button>
          </div>

          <div className="space-y-4">
            {transactions.map(transaction => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    transaction.status === 'completed'
                      ? 'bg-green-500/10'
                      : 'bg-gray-500/10'
                  }`}>
                    {transaction.status === 'completed' ? (
                      <FiCheck className="w-6 h-6 text-green-500" />
                    ) : (
                      <FiX className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-white">{transaction.description}</p>
                    <p className="text-sm text-gray-400">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">
                    {formatAmount(transaction.amount)}
                  </p>
                  <p className={`text-sm ${
                    transaction.status === 'completed'
                      ? 'text-green-500'
                      : 'text-gray-500'
                  }`}>
                    {transaction.status === 'completed' ? 'Concluído' : 'Pendente'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Section */}
        <ComingSoon 
          title="Mais Opções de Pagamento"
          message="Em breve, terá acesso a mais métodos de pagamento e funcionalidades relacionadas."
        />
      </div>
    </DashboardLayout>
  );
};

export default PaymentsPage; 