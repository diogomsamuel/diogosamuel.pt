import React, { useState } from 'react';
import Head from 'next/head';
import { FiBell, FiCheck, FiX, FiClock, FiStar, FiTrendingUp, FiBook } from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ComingSoon from '../../components/common/ComingSoon';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'achievement',
      title: 'Nova Conquista!',
      message: 'Parabéns! Completou o seu primeiro treino da semana.',
      time: '2 horas atrás',
      read: false,
      icon: FiStar
    },
    {
      id: 2,
      type: 'progress',
      title: 'Progresso Atualizado',
      message: 'O seu progresso foi atualizado com sucesso.',
      time: '5 horas atrás',
      read: true,
      icon: FiTrendingUp
    },
    {
      id: 3,
      type: 'material',
      title: 'Novo Material Disponível',
      message: 'Um novo material de treino foi adicionado à sua biblioteca.',
      time: '1 dia atrás',
      read: false,
      icon: FiBook
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const deleteAllRead = () => {
    setNotifications(notifications.filter(notification => !notification.read));
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Notificações | Diogo Samuel</title>
      </Head>

      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            Notificações
          </h1>
          <p className="text-gray-400 mt-1">
            Mantenha-se atualizado com as suas atividades e conquistas.
          </p>
        </div>

        {/* Ações em Lote */}
        <div className="flex space-x-4">
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-white hover:bg-[#333] transition-colors duration-200 flex items-center"
          >
            <FiCheck className="w-4 h-4 mr-2" />
            Marcar Todas como Lidas
          </button>
          <button
            onClick={deleteAllRead}
            className="px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-white hover:bg-[#333] transition-colors duration-200 flex items-center"
          >
            <FiX className="w-4 h-4 mr-2" />
            Eliminar Lidas
          </button>
        </div>

        {/* Lista de Notificações */}
        <div className="space-y-4">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6 ${
                !notification.read ? 'border-[#FF8A00]' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full ${
                    notification.read ? 'bg-[#333]' : 'bg-[#FF8A00]/10'
                  }`}>
                    <notification.icon className={`w-6 h-6 ${
                      notification.read ? 'text-gray-400' : 'text-[#FF8A00]'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-medium ${
                      notification.read ? 'text-gray-400' : 'text-white'
                    }`}>
                      {notification.title}
                    </h3>
                    <p className="text-gray-400 mt-1">{notification.message}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <FiClock className="w-4 h-4 mr-1" />
                      {notification.time}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <FiCheck className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6 text-center">
              <FiBell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Não há notificações para mostrar.</p>
            </div>
          )}
        </div>

        {/* Coming Soon Section */}
        <ComingSoon 
          title="Mais Tipos de Notificações"
          message="Em breve, terá acesso a mais tipos de notificações e opções de personalização."
        />
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage; 