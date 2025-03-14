import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiHome, 
  FiUser, 
  FiBarChart2, 
  FiTarget, 
  FiBook, 
  FiSettings, 
  FiLogOut, 
  FiMenu, 
  FiX, 
  FiBell,
  FiActivity,
  FiFileText,
  FiLink,
  FiCreditCard,
  FiPackage,
  FiHelpCircle
} from 'react-icons/fi';

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const checkAuth = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APIS_URL_REMOTE}/api/session`, {
          method: 'GET',
          credentials: 'include',
        });
        
        if (!response.ok) {
          router.push('/auth');
          return;
        }

        const data = await response.json();
        setUserName(data.username || data.display_name || 'Usuário');
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        router.push('/auth');
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APIS_URL_REMOTE}/api/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      router.push('/auth');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome className="w-5 h-5" /> },
    { name: 'Perfil', path: '/dashboard/profile', icon: <FiUser className="w-5 h-5" /> },
    { name: 'Progresso', path: '/dashboard/progress', icon: <FiBarChart2 className="w-5 h-5" /> },
    { name: 'Atividades', path: '/dashboard/activities', icon: <FiActivity className="w-5 h-5" /> },
    { name: 'Metas', path: '/dashboard/goals', icon: <FiTarget className="w-5 h-5" /> },
    { name: 'Materiais', path: '/dashboard/materials', icon: <FiBook className="w-5 h-5" /> },
    { name: 'Relatórios', path: '/dashboard/reports', icon: <FiFileText className="w-5 h-5" /> },
    { name: 'Integrações', path: '/dashboard/integrations', icon: <FiLink className="w-5 h-5" /> },
    { name: 'Notificações', path: '/dashboard/notifications', icon: <FiBell className="w-5 h-5" /> },
    { name: 'Pagamentos', path: '/dashboard/payments', icon: <FiCreditCard className="w-5 h-5" /> },
    { name: 'Assinaturas', path: '/dashboard/subscriptions', icon: <FiPackage className="w-5 h-5" /> },
    { name: 'Ajuda', path: '/dashboard/help', icon: <FiHelpCircle className="w-5 h-5" /> },
    { name: 'Configurações', path: '/dashboard/settings', icon: <FiSettings className="w-5 h-5" /> },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A0A0A]">
        <div className="w-16 h-16 border-4 border-[#FF8A00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A] shadow-md p-4 flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-400 hover:text-[#FF8A00] focus:outline-none"
        >
          {sidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
        <div className="text-white font-semibold">
          Olá, {userName}
        </div>
      </div>

      {/* Sidebar para mobile - overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:w-64 bg-[#1A1A1A] shadow-xl`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="flex items-center justify-center mb-8 mt-4">
            <Link href="/dashboard">
              <div className="relative h-12 w-32">
                <Image 
                  src="/logo.png" 
                  alt="Diogo Samuel Logo" 
                  fill
                  className="object-contain"
                  onError={(e) => {
                    e.target.src = '/favicon.ico';
                  }}
                />
              </div>
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <div className="inline-block rounded-full bg-[#FF8A00]/10 p-3 mb-2">
              <FiUser className="w-6 h-6 text-[#FF8A00]" />
            </div>
            <h3 className="text-white font-semibold">Olá, {userName}</h3>
            <p className="text-gray-400 text-sm">Bem-vindo ao seu dashboard</p>
          </div>
          
          <hr className="my-4 border-[#333]" />
          
          <ul className="space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  href={item.path}
                  className={`flex items-center p-3 text-base font-normal rounded-lg hover:bg-[#333] ${
                    router.pathname === item.path ? 'bg-[#FF8A00]/10 text-[#FF8A00]' : 'text-gray-300'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-3 text-base font-normal text-red-400 rounded-lg hover:bg-red-900/20"
              >
                <FiLogOut className="w-5 h-5" />
                <span className="ml-3">Sair</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Content */}
      <div className={`p-4 lg:ml-64 ${sidebarOpen ? 'lg:ml-64' : ''} pt-16 lg:pt-4`}>
        <div className="p-4 rounded-lg bg-[#0A0A0A] shadow min-h-[calc(100vh-2rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;