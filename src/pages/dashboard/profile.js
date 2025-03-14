import React, { useState } from 'react';
import Head from 'next/head';
import { FiUser, FiMail, FiLock, FiCamera, FiSave } from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ComingSoon from '../../components/common/ComingSoon';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Diogo Samuel',
    email: 'diogo@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementar lógica de atualização do perfil
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <Head>
        <title>O Meu Perfil | Diogo Samuel</title>
      </Head>

      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            O Meu Perfil
          </h1>
          <p className="text-gray-400 mt-1">
            Gerencie as suas informações pessoais e preferências.
          </p>
        </div>

        {/* Informações Básicas */}
        <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Informações Básicas</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center px-4 py-2 bg-[#FF8A00] text-white rounded-lg hover:bg-[#FF5F00] transition-colors duration-200"
            >
              {isEditing ? (
                <>
                  <FiSave className="w-4 h-4 mr-2" />
                  Guardar Alterações
                </>
              ) : (
                <>
                  <FiUser className="w-4 h-4 mr-2" />
                  Editar Perfil
                </>
              )}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Foto de Perfil */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-[#333] flex items-center justify-center">
                  <FiUser className="w-12 h-12 text-gray-400" />
                </div>
                {isEditing && (
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-[#FF8A00] p-2 rounded-full hover:bg-[#FF5F00] transition-colors duration-200"
                  >
                    <FiCamera className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
              <div>
                <p className="text-gray-400">Foto de perfil</p>
                <p className="text-sm text-gray-500">PNG, JPG até 2MB</p>
              </div>
            </div>

            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#FF8A00] disabled:opacity-50"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#FF8A00] disabled:opacity-50"
              />
            </div>

            {/* Botão de Submissão */}
            {isEditing && (
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#FF8A00] text-white rounded-lg hover:bg-[#FF5F00] transition-colors duration-200"
              >
                Guardar Alterações
              </button>
            )}
          </form>
        </div>

        {/* Alterar Palavra-passe */}
        <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6">
          <h2 className="text-lg font-medium text-white mb-6">Alterar Palavra-passe</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Palavra-passe Atual
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#FF8A00]"
                />
                <FiLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Nova Palavra-passe
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#FF8A00]"
                />
                <FiLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Confirmar Nova Palavra-passe
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#FF8A00]"
                />
                <FiLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#FF8A00] text-white rounded-lg hover:bg-[#FF5F00] transition-colors duration-200"
            >
              Alterar Palavra-passe
            </button>
          </form>
        </div>

        {/* Coming Soon Section */}
        <ComingSoon 
          title="Preferências Avançadas"
          message="Em breve, terá acesso a mais opções de personalização do seu perfil."
        />
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage; 