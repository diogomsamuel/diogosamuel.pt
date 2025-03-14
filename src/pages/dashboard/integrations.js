import React, { useState } from 'react';
import Head from 'next/head';
import { FiLink, FiUnlink, FiCheck, FiX, FiRefreshCw } from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ComingSoon from '../../components/common/ComingSoon';

const IntegrationsPage = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: 'strava',
      name: 'Strava',
      description: 'Sincronize suas atividades e rotas do Strava',
      icon: '/images/integrations/strava.svg',
      connected: true,
      lastSync: '2024-03-20T10:30:00Z'
    },
    {
      id: 'garmin',
      name: 'Garmin',
      description: 'Conecte seu dispositivo Garmin para sincronização automática',
      icon: '/images/integrations/garmin.svg',
      connected: false,
      lastSync: null
    },
    {
      id: 'fitbit',
      name: 'Fitbit',
      description: 'Integre seus dados de atividade e sono do Fitbit',
      icon: '/images/integrations/fitbit.svg',
      connected: false,
      lastSync: null
    },
    {
      id: 'apple-health',
      name: 'Apple Health',
      description: 'Sincronize seus dados de saúde do Apple Health',
      icon: '/images/integrations/apple-health.svg',
      connected: false,
      lastSync: null
    }
  ]);

  const toggleIntegration = (id) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, connected: !integration.connected }
        : integration
    ));
  };

  const formatLastSync = (dateString) => {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Integrações | Diogo Samuel</title>
      </Head>

      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            Integrações
          </h1>
          <p className="text-gray-400 mt-1">
            Conecte suas aplicações favoritas para uma experiência mais completa.
          </p>
        </div>

        {/* Lista de Integrações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map(integration => (
            <div
              key={integration.id}
              className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                    <img
                      src={integration.icon}
                      alt={integration.name}
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{integration.name}</h3>
                    <p className="text-gray-400 mt-1">{integration.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleIntegration(integration.id)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    integration.connected
                      ? 'bg-[#FF8A00]/10 text-[#FF8A00] hover:bg-[#FF8A00]/20'
                      : 'bg-[#1A1A1A] text-gray-400 hover:bg-[#333]'
                  }`}
                >
                  {integration.connected ? <FiUnlink className="w-5 h-5" /> : <FiLink className="w-5 h-5" />}
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {integration.connected ? (
                    <>
                      <FiCheck className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500">Conectado</span>
                    </>
                  ) : (
                    <>
                      <FiX className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Desconectado</span>
                    </>
                  )}
                </div>
                {integration.connected && (
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <FiRefreshCw className="w-4 h-4" />
                    <span>Última sincronização: {formatLastSync(integration.lastSync)}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <ComingSoon 
          title="Mais Integrações"
          message="Em breve, terá acesso a mais opções de integração com outras aplicações e dispositivos."
        />
      </div>
    </DashboardLayout>
  );
};

export default IntegrationsPage; 