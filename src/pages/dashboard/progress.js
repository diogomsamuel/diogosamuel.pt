import React from 'react';
import Head from 'next/head';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ComingSoon from '../../components/common/ComingSoon';

const ProgressPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>O Meu Progresso | Diogo Samuel</title>
      </Head>

      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            O Meu Progresso
          </h1>
          <p className="text-gray-400 mt-1">
            Acompanhe a sua evolução e conquistas ao longo do tempo.
          </p>
        </div>

        {/* Coming Soon Section */}
        <ComingSoon 
          title="Acompanhe o Seu Progresso"
          message="Esta funcionalidade estará disponível brevemente. Aqui poderá acompanhar todo o seu progresso e conquistas."
        />

        {/* Informações Adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6">
            <h2 className="text-lg font-medium text-white mb-4">O Que Virá</h2>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <span className="w-2 h-2 bg-[#FF8A00] rounded-full mr-3"></span>
                Gráficos detalhados de evolução
              </li>
              <li className="flex items-center text-gray-400">
                <span className="w-2 h-2 bg-[#FF8A00] rounded-full mr-3"></span>
                Comparação com períodos anteriores
              </li>
              <li className="flex items-center text-gray-400">
                <span className="w-2 h-2 bg-[#FF8A00] rounded-full mr-3"></span>
                Metas personalizadas
              </li>
              <li className="flex items-center text-gray-400">
                <span className="w-2 h-2 bg-[#FF8A00] rounded-full mr-3"></span>
                Relatórios de progresso
              </li>
            </ul>
          </div>

          <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6">
            <h2 className="text-lg font-medium text-white mb-4">Dicas</h2>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <span className="w-2 h-2 bg-[#FF8A00] rounded-full mr-3"></span>
                Mantenha um registo consistente
              </li>
              <li className="flex items-center text-gray-400">
                <span className="w-2 h-2 bg-[#FF8A00] rounded-full mr-3"></span>
                Defina objetivos realistas
              </li>
              <li className="flex items-center text-gray-400">
                <span className="w-2 h-2 bg-[#FF8A00] rounded-full mr-3"></span>
                Celebre as suas conquistas
              </li>
              <li className="flex items-center text-gray-400">
                <span className="w-2 h-2 bg-[#FF8A00] rounded-full mr-3"></span>
                Acompanhe a sua evolução
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProgressPage; 