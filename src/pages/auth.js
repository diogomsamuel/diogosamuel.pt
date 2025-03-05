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
        const { data, status } = await axiosInstance.get("/api/db-status", {
          timeout: 5000,
          validateStatus: () => true,
        });

        if (status === 200 && data.status === "online") {
          setDbStatus("online");
          setServerError(false);
        } else {
          setDbStatus("offline");
          setServerError(false);
        }
      } catch {
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
      const { data } = await axiosInstance.post("/api/loginDB", {
        username: formData.email,
        password: formData.password,
      });

      toast.success(messages.auth?.login_success);
      setTimeout(() => router.push("/welcome"), 1000);
    } catch (error) {
      let errorMessage = messages.auth?.login_error;
      if (error.response) {
        if (error.response.status === 404) errorMessage = messages.auth?.user_not_found;
        else if (error.response.status === 500) errorMessage = messages.server?.server_offline;
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] text-white relative">
        
        {/* ✅ Animação de Carregamento antes de renderizar o conteúdo */}
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
            <div className="w-16 h-16 border-4 border-t-[#FF8A00] border-b-[#FF5F00] border-l-transparent border-r-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-semibold text-white">A carregar...</p>
          </div>
        )}

        {/* ✅ Formulário de Login */}
        {!isLoading && (
          <div className="bg-[#121212] p-8 rounded-lg shadow-lg w-full max-w-md border border-[#303030] flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-white mb-6">DIOGO SAMUEL</h2>

            <form onSubmit={handleLogin} className="w-full">
              <Input 
                label={messages.auth?.email_label} 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                ref={emailInputRef} 
                disabled={serverError || dbStatus === "offline"}
              />
              <Input 
                label={messages.auth?.password_label} 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                disabled={serverError || dbStatus === "offline"}
              />

              <Button text={messages.auth?.login_button} disabled={serverError || dbStatus === "offline"} />

              {/* ✅ Link "Recuperar password" desativado se o servidor estiver offline */}
              <div className={`text-center mt-4 text-sm ${serverError || dbStatus === "offline" ? "opacity-50 pointer-events-none" : ""}`}>
                <a onClick={() => router.push("/recover")} className="text-[#FF8A00] hover:text-[#FF5F00] hover:underline cursor-pointer transition-colors">
                {messages.recover?.title}
                </a>
              </div>
            </form>
            
            {/* ✅ Link "Registe-se" desativado se o servidor estiver offline */}
            <p className={`text-center text-sm mt-4 ${serverError || dbStatus === "offline" ? "opacity-50 pointer-events-none" : ""}`}>
              Ainda não tem conta?{" "}
              <a onClick={() => router.push("/register")} className="text-[#FF8A00] hover:text-[#FF5F00] hover:underline cursor-pointer transition-colors">
                Registe-se
              </a>
            </p>
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