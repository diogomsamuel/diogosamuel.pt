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
  FiAlertTriangle
} from "react-icons/fi";

export default function WelcomePage() {
  const messages = useMessages(); // Hook para mensagens traduzidas
  const [sessionData, setSessionData] = useState(null); // Estado para os dados da sessão
  const [loading, setLoading] = useState(true); // Estado de carregamento inicial
  const [isLoading, setIsLoading] = useState(true); // Estado do ecrã de carregamento
  const [activeTab, setActiveTab] = useState("dashboard");
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

  // Função simulada para retornar detalhes do plano
  const getUserPlan = () => {
    return {
      name: "Plano Premium",
      status: "active",
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias a partir de agora
      features: ["Acesso ilimitado", "Suporte 24/7", "Conteúdo exclusivo"]
    };
  };

  // Renderiza o conteúdo com base na tab ativa
  const renderContent = () => {
    if (!sessionData) return null;

    const userPlan = getUserPlan();
    
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
                  <p className="text-white font-medium">{formatDate(new Date().toISOString())}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{messages.welcome?.subscription_status}</p>
                  <div className="flex items-center">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${userPlan.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="text-white font-medium">
                      {userPlan.status === 'active' ? messages.welcome?.active : messages.welcome?.inactive}
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
              {userPlan ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Plano</p>
                    <p className="text-white font-medium">{userPlan.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Válido até</p>
                    <p className="text-white font-medium">{formatDate(userPlan.expiryDate)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Características</p>
                    <ul className="text-white mt-1 space-y-1">
                      {userPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-[#FF8A00] mr-2">•</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">{messages.welcome?.no_plans}</p>
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
            <h3 className="text-xl font-semibold text-white mb-4">Meu Perfil</h3>
            <p className="text-gray-400">Funcionalidade em desenvolvimento. Em breve poderá atualizar os seus dados pessoais aqui.</p>
          </div>
        );
      
      case "plans":
        return (
          <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#303030]">
            <h3 className="text-xl font-semibold text-white mb-4">Meus Planos</h3>
            <p className="text-gray-400">Funcionalidade em desenvolvimento. Em breve poderá visualizar todos os seus planos aqui.</p>
          </div>
        );
      
      case "settings":
        return (
          <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#303030]">
            <h3 className="text-xl font-semibold text-white mb-4">Definições</h3>
            <p className="text-gray-400">Funcionalidade em desenvolvimento. Em breve poderá ajustar as suas preferências aqui.</p>
          </div>
        );
      
      case "support":
        return (
          <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#303030]">
            <h3 className="text-xl font-semibold text-white mb-4">Suporte</h3>
            <p className="text-gray-400">Funcionalidade em desenvolvimento. Em breve poderá contactar o suporte aqui.</p>
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