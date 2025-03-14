import { useState, useEffect, useRef } from "react"; // Importação dos hooks do React
import { useRouter } from "next/router"; // Routeamento do Next.js
import Head from "next/head"; // Importação do Head para SEO
import { ToastContainer, toast } from "react-toastify"; // Importação do Toastify - Mensagens de erro
import "react-toastify/dist/ReactToastify.css"; // Estilos do Toastify
import useMessages from "../hooks/useMessages"; // Hook para mensagens dinâmicas
import Input from "../components/ui/Input"; // Componente Input
import Button from "../components/ui/Button"; // Componente Button
import Image from "next/image"; // Componente Image
import { FiAlertTriangle } from "react-icons/fi"; // Ícone de erro
import axiosInstance from "../lib/axiosInstance"; // 🚀 Importação do axiosInstance
import { motion } from "framer-motion"; // Importação do motion para animações
//import PwaInstallButton from "@/components/PwaInstallButton";

export default function Auth() {
  const messages = useMessages(); // Hook para carregar mensagens dinâmicas
  const [formData, setFormData] = useState({ email: "", password: "" }); // Estado do formulário
  const router = useRouter();
  const emailInputRef = useRef(null);
  const [dbStatus, setDbStatus] = useState(null); // Estado da base de dados
  const [serverError, setServerError] = useState(null); // Estado do servidor
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento da página

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus(); // Colocar foco no campo de email ao carregar a página
    }

    async function checkDBStatus() {
      try {
        console.log('[AUTH] Verificando status do banco de dados...');
        const { data, status } = await axiosInstance.get("/api/db-status", {
          timeout: 5000,
          validateStatus: () => true,
        });

        console.log('[AUTH] Resposta do status:', data);

        if (status === 200 && data.status === "connected") {
          setDbStatus("online");
          setServerError(false);
        } else {
          console.error('[AUTH] Banco de dados offline:', data.error);
          setDbStatus("offline");
          setServerError(false);
        }
      } catch (error) {
        console.error('[AUTH] Erro ao verificar status:', error);
        setServerError(true);
        setDbStatus(null);
      } finally {
        setIsLoading(false);
      }
    }

    checkDBStatus();
  }, []);

  // Atualiza os campos do formulário quando o utilizador digita
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função de login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (serverError) {
      toast.error(messages.server?.server_offline);
      return;
    }

    if (dbStatus === "offline") {
      toast.error(messages.database?.db_offline_message);
      return;
    }

    try {
      console.log('[AUTH] Tentando fazer login...');
      const { data } = await axiosInstance.post("/api/loginDB", {
        username: formData.email,
        password: formData.password,
      });

      console.log('[AUTH] Login bem-sucedido:', data);

      // O token já está sendo definido como cookie pelo backend
      // Não precisamos fazer nada adicional aqui

      toast.success(messages.auth?.login_success);
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (error) {
      console.error('[AUTH] Erro no login:', error);
      let errorMessage = messages.auth?.login_error;
      
      if (error.response) {
        console.error('[AUTH] Resposta do erro:', error.response.data);
        
        if (error.response.status === 404) {
          errorMessage = messages.auth?.user_not_found;
        } else if (error.response.status === 500) {
          errorMessage = messages.server?.server_offline;
        } else if (error.response.status === 401) {
          errorMessage = messages.auth?.invalid_credentials;
        } else if (error.response.status === 403) {
          errorMessage = messages.auth?.account_disabled;
        }
      } else if (error.message.includes("Network Error")) {
        errorMessage = messages.server?.server_offline;
      }
      
      toast.error(errorMessage);
    }
  };

  return (
    <>
      {/* ✅ SEO Tags */}
      <Head>
        <title>Autenticação do FrontEnd</title>
        <meta name="description" content="Login para acesso a serviços." />
      </Head>

      {/* ✅ Estrutura da Página */}
      <div className="flex items-center justify-center min-h-screen bg-[#0D0D0D] text-white relative">
        <div className="absolute inset-0 bg-noise opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-radial from-[#FF8A00]/10 via-transparent to-transparent"></div>
        
        {/* ✅ Animação de Carregamento antes de renderizar o conteúdo */}
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
            <div className="w-16 h-16 border-4 border-t-[#FF8A00] border-b-[#FF5F00] border-l-transparent border-r-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-semibold text-white">A carregar...</p>
          </div>
        )}

        {/* ✅ Formulário de Login */}
        {!isLoading && (
          <div className="bg-[#1A1A1A]/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-[#333] w-full max-w-md flex flex-col items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <h2 className="text-3xl font-bold text-center text-white mb-8">DIOGO SAMUEL</h2>

              <form onSubmit={handleLogin} className="w-full space-y-6">
                <Input 
                  label={messages.auth?.email_label} 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  ref={emailInputRef} 
                  disabled={serverError || dbStatus === "offline"}
                  className="bg-[#1A1A1A] border-[#333] focus:border-[#FF8A00] focus:ring-[#FF8A00]"
                />
                <Input 
                  label={messages.auth?.password_label} 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  disabled={serverError || dbStatus === "offline"}
                  className="bg-[#1A1A1A] border-[#333] focus:border-[#FF8A00] focus:ring-[#FF8A00]"
                />

                <Button 
                  text={messages.auth?.login_button} 
                  disabled={serverError || dbStatus === "offline"}
                  className="w-full py-3 bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                />

                {/* ✅ Link "Recuperar password" */}
                <div className={`text-center mt-4 text-sm ${serverError || dbStatus === "offline" ? "opacity-50 pointer-events-none" : ""}`}>
                  <a onClick={() => router.push("/recover")} className="text-[#FF8A00] hover:text-[#FF5F00] hover:underline cursor-pointer transition-colors">
                    {messages.recover?.title}
                  </a>
                </div>
              </form>
              
              {/* ✅ Link "Registe-se" */}
              <p className={`text-center text-sm mt-6 ${serverError || dbStatus === "offline" ? "opacity-50 pointer-events-none" : ""}`}>
                Ainda não tem conta?{" "}
                <a onClick={() => router.push("/register")} className="text-[#FF8A00] hover:text-[#FF5F00] hover:underline cursor-pointer transition-colors">
                  Registe-se
                </a>
              </p>
            </motion.div>
          </div>
        )}

        {/* ✅ Indicador do estado da base de dados movido para o canto **superior direito** */}
        {!isLoading && (
          <div className="absolute top-5 right-5 flex items-center space-x-2">
            {serverError === true ? (
              <>
                <FiAlertTriangle className="text-[#FF5F00] text-xl animate-bounce" />
                <p className="text-sm text-gray-300">{messages.server?.server_offline}</p>
              </>
            ) : dbStatus === "online" ? (
              <>
                <span className="w-3 h-3 rounded-full bg-[#FF8A00] animate-pulse" />
                <p className="text-sm text-gray-300">{messages.database?.db_online}</p>
              </>
            ) : (
              <>
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <p className="text-sm text-gray-300">{messages.database?.db_offline}</p>
              </>
            )}
            {/*<PwaInstallButton />*/}
          </div>
        )}

        {/* ✅ Notificações Toastify */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}