import { useEffect, useState } from "react"; // Importação dos hooks useEffect e useState
import { useRouter } from "next/router"; // Importação do hook useRouter para navegação
import { toast } from "react-toastify"; // Biblioteca para notificações
import "react-toastify/dist/ReactToastify.css"; // Estilos do Toastify
import useMessages from "../hooks/useMessages"; // Hook para mensagens traduzidas
import axiosInstance from "../lib/axiosInstance"; // 🚀 Usa axiosInstance para chamadas API

export default function WelcomePage() {
  const messages = useMessages(); // Hook para mensagens traduzidas
  const [sessionData, setSessionData] = useState(null); // Estado para os dados da sessão
  const [loading, setLoading] = useState(true); // Estado de carregamento inicial
  const [isLoading, setIsLoading] = useState(true); // Estado do ecrã de carregamento
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] text-white p-4 relative">
      
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
            <p className="text-gray-400">{messages.button?.loading}</p>
          ) : sessionData ? (
            <div className="bg-[#1A1A1A] text-gray-300 p-4 rounded-md text-sm w-full max-w-md border border-[#303030] shadow-lg">
              {/* ✅ Nome do utilizador logado */}
              <span className="font-semibold text-[#FF8A00]">{messages.welcome?.user_label}</span>
              <pre className="mt-2 break-words whitespace-pre-wrap">{sessionData.user.username}</pre>

              {/* ✅ Token JWT (caso esteja presente) */}
              <span className="font-semibold text-[#FF8A00] mt-4 block">Token JWT:</span>
              <pre className="mt-2 break-words whitespace-pre-wrap text-xs bg-[#121212] p-2 rounded">
                {sessionData.token}
              </pre>

              {/* ✅ Botão de Logout */}
              <button
                onClick={handleLogout}
                className="mt-4 bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] text-white font-bold py-2 px-4 rounded w-full hover:opacity-90 transition-transform transform hover:scale-105"
              >
                {messages.auth?.logout_button || "Sair"}
              </button>
            </div>
          ) : (
            <p className="text-gray-400">{messages.welcome?.session_expired}</p>
          )}
        </>
      )}
    </div>
  );
}