import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WelcomePage() {
  const router = useRouter();

  // Redirecionar automaticamente para o dashboard
  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  // Renderiza tela de carregamento enquanto redirecionando
  return (
    <>
      <Head>
        <title>Redirecionando | Diogo Samuel</title>
      </Head>
      
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0A] text-white">
        <div className="w-16 h-16 border-4 border-t-[#FF8A00] border-b-[#FF5F00] border-l-transparent border-r-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-semibold text-white">Redirecionando...</p>
      </div>
    </>
  );
}