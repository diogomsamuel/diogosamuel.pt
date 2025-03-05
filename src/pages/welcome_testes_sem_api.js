// Este é um exemplo de uma página sem autenticação (pública).
import Image from "next/image";
import { useRouter } from "next/router";

export default function Welcome() {
  const router = useRouter();

  // Retorno da função para renderização do componente (HTML)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] text-white">
      {/* Logotipo e título */}
      <div className="flex items-center space-x-4 mb-8">
        <h1 className="text-4xl font-bold text-white">DIOGO SAMUEL</h1>
      </div>

      {/* Área principal do Dashboard */}
      <div className="bg-[#1A1A1A] w-full max-w-4xl p-8 rounded-lg shadow-lg border border-[#303030] flex flex-col items-center">
        <p className="text-center text-lg text-gray-300 mb-6">
          Bem-vindo ao Utilizador à sua Página Principal ! 🎉
        </p>

        <button
          onClick={() => router.push("/auth")}
          className="mt-4 bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] text-white px-6 py-3 rounded-md hover:opacity-90 transition-all duration-200"
        >
          Voltar ao Login
        </button>
      </div>
    </div>
  );
}