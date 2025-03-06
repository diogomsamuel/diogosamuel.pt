import { useState, useEffect, useRef } from "react"; // Hooks do React
import Image from "next/image"; // Componente otimizado para imagens
import { ToastContainer, toast } from "react-toastify"; // Biblioteca para mensagens interativas
import "react-toastify/dist/ReactToastify.css"; // Estilos do Toastify
import Input from "../components/ui/Input"; // Componente reutilizável de Input
import Button from "../components/ui/Button"; // Componente reutilizável de Button
import { useRouter } from "next/router"; // Hook de navegação do Next.js
import useMessages from "../hooks/useMessages"; // Hook para mensagens dinâmicas
import { motion } from "framer-motion";

export default function RecoverPassword() {
  const messages = useMessages(); // Hook para mensagens traduzidas
  const [email, setEmail] = useState(""); // Estado para armazenar o email
  const router = useRouter(); // Instância do router para navegação
  const emailInputRef = useRef(null); // Referência para focar o input ao carregar
  const [isLoading, setIsLoading] = useState(true); // Estado para loading inicial

  // ✅ Focar no input ao carregar a página e simular um carregamento inicial
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simula um pequeno carregamento antes de mostrar o conteúdo
  }, []);

  // ✅ Função para capturar a digitação no input de email
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // ✅ Função para submeter o pedido de recuperação de password
  const handleRecover = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(messages.recover?.recover_success);
      } else {
        toast.error(data.message || messages.recover?.recover_error);
      }
    } catch (error) {
      let errorMessage = messages.recover?.recover_error;
      if (error.message.includes("Network Error")) {
        errorMessage = messages.auth?.network_error; // Usa a mesma mensagem do login
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0D0D0D] text-white relative">
      <div className="absolute inset-0 bg-noise opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-radial from-[#FF8A00]/10 via-transparent to-transparent"></div>
      
      {/* ✅ Ecrã de carregamento antes de exibir o formulário */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-t-[#FF8A00] border-b-[#FF5F00] border-l-transparent border-r-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-semibold text-white">A carregar...</p>
        </div>
      )}

      {/* ✅ Formulário de recuperação de senha */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1A1A1A]/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-[#333] w-full max-w-md relative z-10"
        >
          {/* ✅ Logo e título */}
          <div className="flex flex-col items-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold text-white">{messages.recover?.title}</h2>
            <p className="text-gray-400 text-center">
              Insira o seu email para recuperar a sua palavra-passe
            </p>
          </div>

          {/* ✅ Formulário */}
          <form onSubmit={handleRecover} className="space-y-6">
            <Input
              label={messages.recover?.email_label}
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              ref={emailInputRef}
              className="bg-[#1A1A1A] border-[#333] focus:border-[#FF8A00] focus:ring-[#FF8A00]"
            />
            
            {/* ✅ Botão de recuperação com animação */}
            <Button 
              text={messages.recover?.recover_button} 
              className="w-full py-3 bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            />

            {/* ✅ Link para voltar ao login */}
            <p className="text-center text-sm mt-6">
              {messages.recover?.remember_password}{" "}
              <a 
                onClick={() => router.push("/auth")} 
                className="text-[#FF8A00] hover:text-[#FF5F00] hover:underline cursor-pointer transition-colors"
              >
                {messages.auth?.login_title}
              </a>
            </p>
          </form>
        </motion.div>
      )}

      {/* ✅ Mensagens interativas */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}