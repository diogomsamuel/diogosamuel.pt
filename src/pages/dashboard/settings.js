import React, { useState } from 'react';
import Head from 'next/head';
import { FiBell, FiGlobe, FiLock, FiShield, FiTrash2 } from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ComingSoon from '../../components/common/ComingSoon';

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    updates: true
  });

  const [language, setLanguage] = useState('pt-PT');
  const [timezone, setTimezone] = useState('Europe/Lisbon');

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Configurações | Diogo Samuel</title>
      </Head>

      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            Configurações
          </h1>
          <p className="text-gray-400 mt-1">
            Personalize a sua experiência e gerencie as suas preferências.
          </p>
        </div>

        {/* Notificações */}
        <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6">
          <div className="flex items-center mb-6">
            <FiBell className="w-6 h-6 text-[#FF8A00] mr-3" />
            <h2 className="text-lg font-medium text-white">Notificações</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Notificações por Email</p>
                <p className="text-sm text-gray-400">Receba atualizações importantes por email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() => handleNotificationChange('email')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#333] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF8A00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF8A00]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Notificações Push</p>
                <p className="text-sm text-gray-400">Receba notificações no seu navegador</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={() => handleNotificationChange('push')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#333] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF8A00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF8A00]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Marketing</p>
                <p className="text-sm text-gray-400">Receba informações sobre produtos e serviços</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.marketing}
                  onChange={() => handleNotificationChange('marketing')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#333] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF8A00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF8A00]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Atualizações do Sistema</p>
                <p className="text-sm text-gray-400">Receba notificações sobre atualizações importantes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.updates}
                  onChange={() => handleNotificationChange('updates')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#333] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF8A00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF8A00]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Idioma e Fuso Horário */}
        <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6">
          <div className="flex items-center mb-6">
            <FiGlobe className="w-6 h-6 text-[#FF8A00] mr-3" />
            <h2 className="text-lg font-medium text-white">Idioma e Fuso Horário</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Idioma
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#FF8A00]"
              >
                <option value="pt-PT">Português (Portugal)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es-ES">Español (España)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Fuso Horário
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#FF8A00]"
              >
                <option value="Europe/Lisbon">Lisboa (GMT+0)</option>
                <option value="Europe/London">Londres (GMT+0)</option>
                <option value="Europe/Madrid">Madrid (GMT+1)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Segurança */}
        <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6">
          <div className="flex items-center mb-6">
            <FiShield className="w-6 h-6 text-[#FF8A00] mr-3" />
            <h2 className="text-lg font-medium text-white">Segurança</h2>
          </div>

          <div className="space-y-4">
            <button className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-white hover:bg-[#333] transition-colors duration-200 flex items-center justify-between">
              <span>Autenticação em Duas Etapas</span>
              <FiLock className="w-4 h-4" />
            </button>

            <button className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-white hover:bg-[#333] transition-colors duration-200 flex items-center justify-between">
              <span>Histórico de Sessões</span>
              <FiLock className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Conta */}
        <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6">
          <div className="flex items-center mb-6">
            <FiTrash2 className="w-6 h-6 text-red-500 mr-3" />
            <h2 className="text-lg font-medium text-white">Conta</h2>
          </div>

          <button className="w-full px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 hover:bg-red-500/20 transition-colors duration-200">
            Eliminar Conta
          </button>
        </div>

        {/* Coming Soon Section */}
        <ComingSoon 
          title="Mais Opções de Personalização"
          message="Em breve, terá acesso a mais opções para personalizar a sua experiência."
        />
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage; 