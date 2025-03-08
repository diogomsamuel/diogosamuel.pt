import { useEffect, useState } from "react"; // Importação dos hooks useEffect e useState
import { useRouter } from "next/router"; // Importação do hook useRouter para navegação
import Link from "next/link";
import Head from "next/head";
import { toast, ToastContainer } from "react-toastify"; // Biblioteca para notificações
import "react-toastify/dist/ReactToastify.css"; // Estilos do Toastify
import useMessages from "../hooks/useMessages"; // Hook para mensagens traduzidas
import axiosInstance from "../lib/axiosInstance"; // 🚀 Usa axiosInstance para chamadas API
import { 
  FiUser, 
  FiPackage, 
  FiSettings, 
  FiHelpCircle, 
  FiLogOut, 
  FiCreditCard,
  FiEdit,
  FiMail,
  FiAlertTriangle,
  FiSave,
  FiX
} from "react-icons/fi";

export default function WelcomePage() {
  const messages = useMessages(); // Hook para mensagens traduzidas
  const [sessionData, setSessionData] = useState(null); // Estado para os dados da sessão
  const [loading, setLoading] = useState(true); // Estado de carregamento inicial
  const [isLoading, setIsLoading] = useState(true); // Estado do ecrã de carregamento
  const [activeTab, setActiveTab] = useState("dashboard");
  const [profileData, setProfileData] = useState(null);
  const [userPlans, setUserPlans] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const router = useRouter(); // Hook para navegação

  useEffect(() => {
    const checkSession = async () => {
      try {
        // 🚀 Verifica a sessão do utilizador na API
        const { data } = await axiosInstance.get("/api/session", { timeout: 5000 });

        // ❌ Se a sessão for inválida, lança um erro
        if (!data.valid) {
          throw new Error("Sessão inválida");
        }

        // ✅ Atualiza o estado com os dados da sessão
        setSessionData(data); 
        
        // Buscar dados do perfil
        fetchProfileData(data.user.id);
        
        // Buscar planos do usuário
        fetchUserPlans(data.user.id);
      } catch (error) {
        console.error("Erro na API:", error.message || error);

        // Definição da mensagem de erro conforme o tipo de falha
        let errorMessage = messages.error?.server_error;
        if (error.response) {
          if (error.response.status === 404) {
            errorMessage = messages.error?.session_not_found;
          } else if (error.response.status === 500) {
            errorMessage = messages.error?.server_error;
          }
        } else if (error.code === "ECONNABORTED") {
          errorMessage = messages.error?.server_timeout;
        } else if (error.message.includes("Network Error")) {
          errorMessage = messages.error?.server_unavailable;
        }

        // Exibe erro e redireciona para a autenticação após 2 segundos
        toast.error(errorMessage);
        setTimeout(() => router.push("/auth"), 2000);
      } finally {
        setLoading(false);
        setTimeout(() => setIsLoading(false), 1000); // 🔹 Simula tempo de carregamento do loading
      }
    };

    checkSession(); // 🚀 Inicia a verificação da sessão ao carregar a página
  }, [
    router, 
    messages.error?.server_error, 
    messages.error?.server_timeout, 
    messages.error?.server_unavailable, 
    messages.error?.session_not_found
  ]);
  
  // Função para buscar dados do perfil
  const fetchProfileData = async (userId) => {
    try {
      const { data } = await axiosInstance.get("/api/profile");
      setProfileData(data.profile);
    } catch (error) {
      console.error("Erro ao buscar dados do perfil:", error);
      toast.error("Não foi possível carregar os dados do perfil");
    }
  };
  
  // Função para buscar planos do usuário
  const fetchUserPlans = async (userId) => {
    try {
      const { data } = await axiosInstance.get("/api/purchases");
      setUserPlans(data.purchases || []);
    } catch (error) {
      console.error("Erro ao buscar planos do usuário:", error);
      toast.error("Não foi possível carregar os planos do usuário");
    }
  };

  // ✅ Função para Logout
  const handleLogout = async () => {
    await axiosInstance.post("/api/logout"); // 🚀 API logout
    toast.info(messages.auth?.logout_success);
    router.push("/auth");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Atualizar perfil do usuário
  const handleProfileUpdate = async (formData) => {
    setUpdateLoading(true);
    try {
      const { data } = await axiosInstance.post("/api/profile/update", formData);
      setProfileData(data.profile);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Não foi possível atualizar o perfil");
    } finally {
      setUpdateLoading(false);
    }
  };

  // Renderiza o conteúdo com base na tab ativa
  const renderContent = () => {
    if (!sessionData) return null;

    const activePlan = userPlans.length > 0 ? userPlans[0] : null;
    
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informações da conta */}
            <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#303030]">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <FiUser className="mr-2 text-[#FF8A00]" />
                {messages.welcome?.account_info}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">{messages.welcome?.user_label}</p>
                  <p className="text-white font-medium">{sessionData.user.username}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{messages.welcome?.last_login}</p>
                  <p className="text-white font-medium">{sessionData.user.last_login ? formatDate(sessionData.user.last_login) : 'Primeira visita'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{messages.welcome?.subscription_status}</p>
                  <div className="flex items-center">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${activePlan ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    <span className="text-white font-medium">
                      {activePlan ? messages.welcome?.active : messages.welcome?.no_subscription}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Detalhes do plano */}
            <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#303030]">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <FiPackage className="mr-2 text-[#FF8A00]" />
                {messages.welcome?.plan_details}
              </h3>
              {activePlan ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Plano</p>
                    <p className="text-white font-medium">{activePlan.plan_name} - {activePlan.variant_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Data de compra</p>
                    <p className="text-white font-medium">{formatDate(activePlan.purchase_date)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Valor</p>
                    <p className="text-white font-medium">{(activePlan.amount_paid || 0).toFixed(2)}€</p>
                  </div>
                  {activePlan.materials_count > 0 && (
                    <div>
                      <p className="text-gray-400 text-sm">Materiais</p>
                      <p className="text-white font-medium">{activePlan.materials_count} materiais disponíveis</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                <p className="text-gray-400">{messages.welcome?.no_plans}</p>
                  <Link 
                    href="/products"
                    className="mt-4 inline-block bg-[#FF8A00]/10 hover:bg-[#FF8A00]/20 text-[#FF8A00] font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Ver planos disponíveis
                  </Link>
                </div>
              )}
            </div>
            
            {/* Ações rápidas */}
            <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#303030] md:col-span-2">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <FiEdit className="mr-2 text-[#FF8A00]" />
                {messages.welcome?.actions}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setActiveTab("profile")}
                  className="bg-[#252525] hover:bg-[#303030] p-4 rounded-lg flex flex-col items-center justify-center transition-colors"
                >
                  <FiUser className="text-2xl text-[#FF8A00] mb-2" />
                  <span className="text-white text-sm font-medium">{messages.welcome?.update_profile}</span>
                </button>
                <Link 
                  href="/products"
                  className="bg-[#252525] hover:bg-[#303030] p-4 rounded-lg flex flex-col items-center justify-center transition-colors"
                >
                  <FiCreditCard className="text-2xl text-[#FF8A00] mb-2" />
                  <span className="text-white text-sm font-medium">{messages.welcome?.buy_plan}</span>
                </Link>
                <button 
                  onClick={() => setActiveTab("support")}
                  className="bg-[#252525] hover:bg-[#303030] p-4 rounded-lg flex flex-col items-center justify-center transition-colors"
                >
                  <FiMail className="text-2xl text-[#FF8A00] mb-2" />
                  <span className="text-white text-sm font-medium">{messages.welcome?.contact_support}</span>
                </button>
              </div>
            </div>
          </div>
        );
      
      case "profile":
        return (
          <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#303030]">
            <h3 className="text-xl font-semibold text-white mb-6">O Meu Perfil</h3>
            
            {profileData ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const profileUpdate = {
                  first_name: formData.get('first_name'),
                  last_name: formData.get('last_name'),
                  display_name: formData.get('display_name'),
                  phone: formData.get('phone'),
                  birth_date: formData.get('birth_date'),
                  bio: formData.get('bio'),
                  newsletter_subscription: formData.get('newsletter') === 'on'
                };
                handleProfileUpdate(profileUpdate);
              }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      defaultValue={profileData.first_name || ''}
                      className="w-full bg-[#252525] border border-[#303030] rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Apelido
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      defaultValue={profileData.last_name || ''}
                      className="w-full bg-[#252525] border border-[#303030] rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Nome de Exibição
                  </label>
                  <input
                    type="text"
                    name="display_name"
                    defaultValue={profileData.display_name || ''}
                    className="w-full bg-[#252525] border border-[#303030] rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/50"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      disabled
                      value={profileData.email || ''}
                      className="w-full bg-[#252525]/50 border border-[#303030] rounded-lg py-2 px-4 text-gray-400 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">O email não pode ser alterado</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      defaultValue={profileData.phone || ''}
                      className="w-full bg-[#252525] border border-[#303030] rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    name="birth_date"
                    defaultValue={profileData.birth_date || ''}
                    className="w-full bg-[#252525] border border-[#303030] rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/50"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Sobre Mim
                  </label>
                  <textarea
                    name="bio"
                    rows={4}
                    defaultValue={profileData.bio || ''}
                    className="w-full bg-[#252525] border border-[#303030] rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/50"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="newsletter"
                    id="newsletter"
                    defaultChecked={profileData.newsletter_subscription}
                    className="w-4 h-4 text-[#FF8A00] rounded focus:ring-[#FF8A00]"
                  />
                  <label htmlFor="newsletter" className="ml-2 text-sm text-white">
                    Receber Newsletter com novidades e ofertas
                  </label>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("dashboard")}
                    className="flex items-center px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                  >
                    <FiX className="mr-2" /> Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={updateLoading}
                    className="flex items-center px-6 py-2 bg-[#FF8A00] hover:bg-[#FF8A00]/90 rounded-lg text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {updateLoading ? (
                      <>Salvando...</>
                    ) : (
                      <>
                        <FiSave className="mr-2" /> Salvar Alterações
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-center py-10">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-6 w-32 bg-[#252525] rounded-md mb-4"></div>
                  <div className="h-4 w-64 bg-[#252525] rounded-md"></div>
                </div>
              </div>
            )}
          </div>
        );
      
      case "plans":
        return (
          <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#303030]">
            <h3 className="text-xl font-semibold text-white mb-6">Os Meus Planos</h3>
            
            {userPlans.length > 0 ? (
              <div className="space-y-6">
                {userPlans.map((plan) => (
                  <div key={plan.id} className="bg-[#252525] p-5 rounded-lg border border-[#303030]">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{plan.plan_name}</h4>
                        <p className="text-gray-400">{plan.variant_name}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[#FF8A00] font-bold">{(plan.amount_paid || 0).toFixed(2)}€</span>
                        <span className="text-xs text-gray-400">{formatDate(plan.purchase_date)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${plan.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                      <span className="text-sm text-gray-300">
                        {plan.status === 'completed' ? 'Ativo' : plan.status === 'pending' ? 'Pendente' : 'Inativo'}
                      </span>
                    </div>
                    
                    {plan.materials && plan.materials.length > 0 && (
                      <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-300 mb-2">Materiais disponíveis:</h5>
                        <ul className="space-y-2">
                          {plan.materials.map((material) => (
                            <li key={material.id} className="flex items-center text-gray-400 text-sm">
                              <svg className="w-4 h-4 text-[#FF8A00] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {material.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-400 mb-6">Ainda não possui planos adquiridos.</p>
                <Link 
                  href="/products"
                  className="inline-block bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                >
                  Ver Planos Disponíveis
                </Link>
              </div>
            )}
          </div>
        );
      
      case "settings":
        return (
          <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#303030]">
            <h3 className="text-xl font-semibold text-white mb-4">Definições</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Preferências de Conta</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Notificações por Email</p>
                      <p className="text-sm text-gray-400">Receber emails sobre atualizações do plano e novos conteúdos</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={true} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF8A00]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Lembrete de Treino</p>
                      <p className="text-sm text-gray-400">Receber lembretes para treinar regularmente</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={false} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF8A00]"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-[#303030]">
                <h4 className="text-lg font-medium text-white mb-4">Segurança</h4>
                
                <button className="bg-[#252525] hover:bg-[#303030] text-white py-2 px-4 rounded-lg transition-colors">
                  Alterar Senha
                </button>
              </div>
            </div>
          </div>
        );
      
      case "support":
        return (
          <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#303030]">
            <h3 className="text-xl font-semibold text-white mb-6">Suporte</h3>
            
            <form className="space-y-6">
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Assunto
                </label>
                <select
                  className="w-full bg-[#252525] border border-[#303030] rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/50"
                >
                  <option value="general">Dúvida Geral</option>
                  <option value="plan">Dúvida sobre Plano</option>
                  <option value="payment">Problema com Pagamento</option>
                  <option value="login">Problema com Login</option>
                  <option value="other">Outro Assunto</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Mensagem
                </label>
                <textarea
                  rows={6}
                  placeholder="Descreva sua dúvida ou problema..."
                  className="w-full bg-[#252525] border border-[#303030] rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/50"
                ></textarea>
              </div>
              
              <button 
                type="button"
                className="bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>{messages.welcome?.title} | Diogo Samuel</title>
        <meta name="description" content="Painel principal da sua conta Diogo Samuel" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] text-white p-4 relative">
        {/* 🔹 Ecrã de carregamento antes de exibir os dados */}
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
            <div className="w-16 h-16 border-4 border-t-[#FF8A00] border-b-[#FF5F00] border-l-transparent border-r-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-semibold text-white">A carregar...</p>
          </div>
        )}

        {/* 🔹 Exibição dos dados da sessão e opções do utilizador */}
        {!isLoading && (
          <>
            {loading ? (
              <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-400">{messages.button?.loading}</p>
              </div>
            ) : sessionData ? (
              <div className="container mx-auto py-8 max-w-7xl">
                {/* Cabeçalho */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{messages.welcome?.dashboard_title}</h1>
                    <p className="text-gray-400">
                      {messages.welcome?.title}, <span className="text-[#FF8A00]">{sessionData.user.username}</span>
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="mt-4 md:mt-0 flex items-center bg-[#1A1A1A] hover:bg-[#252525] px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <FiLogOut className="mr-2" />
                    {messages.auth?.logout_button}
                  </button>
                </div>

                {/* Layout principal com sidebar e conteúdo */}
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Sidebar de navegação */}
                  <div className="w-full md:w-64 bg-[#1A1A1A] rounded-lg p-4 border border-[#303030] h-fit">
                    <nav>
                      <ul className="space-y-2">
                        <li>
                          <button
                            onClick={() => setActiveTab("dashboard")}
                            className={`w-full flex items-center p-3 rounded-md transition-colors ${
                              activeTab === "dashboard"
                                ? "bg-[#FF8A00] text-white"
                                : "text-gray-300 hover:bg-[#252525]"
                            }`}
                          >
                            <FiUser className="mr-3" />
                            Dashboard
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => setActiveTab("profile")}
                            className={`w-full flex items-center p-3 rounded-md transition-colors ${
                              activeTab === "profile"
                                ? "bg-[#FF8A00] text-white"
                                : "text-gray-300 hover:bg-[#252525]"
                            }`}
                          >
                            <FiUser className="mr-3" />
                            {messages.welcome?.my_profile}
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => setActiveTab("plans")}
                            className={`w-full flex items-center p-3 rounded-md transition-colors ${
                              activeTab === "plans"
                                ? "bg-[#FF8A00] text-white"
                                : "text-gray-300 hover:bg-[#252525]"
                            }`}
                          >
                            <FiPackage className="mr-3" />
                            {messages.welcome?.my_plans}
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => setActiveTab("settings")}
                            className={`w-full flex items-center p-3 rounded-md transition-colors ${
                              activeTab === "settings"
                                ? "bg-[#FF8A00] text-white"
                                : "text-gray-300 hover:bg-[#252525]"
                            }`}
                          >
                            <FiSettings className="mr-3" />
                            {messages.welcome?.settings}
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => setActiveTab("support")}
                            className={`w-full flex items-center p-3 rounded-md transition-colors ${
                              activeTab === "support"
                                ? "bg-[#FF8A00] text-white"
                                : "text-gray-300 hover:bg-[#252525]"
                            }`}
                          >
                            <FiHelpCircle className="mr-3" />
                            {messages.welcome?.support}
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>

                  {/* Área de conteúdo principal */}
                  <div className="flex-1">
                    {renderContent()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-400">{messages.welcome?.session_expired}</p>
              </div>
            )}
          </>
        )}

        {/* Toasts de notificação */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}