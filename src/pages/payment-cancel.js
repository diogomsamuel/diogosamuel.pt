import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FiAlertCircle, FiArrowLeft, FiShoppingCart } from 'react-icons/fi';

export default function PaymentCancel() {
  return (
    <>
      <Head>
        <title>Pagamento Cancelado | Diogo Samuel</title>
        <meta name="description" content="Pagamento cancelado. Pode tentar novamente quando quiser." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-[#0D0D0D] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold text-white">
                Diogo <span className="text-[#FF8A00]">Samuel</span>
              </h1>
            </Link>
          </div>
          
          <div className="bg-[#121212] rounded-xl p-8 border border-[#303030]">
            <div className="text-center py-10">
              <div className="bg-red-500 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6">
                <FiAlertCircle className="text-white text-4xl" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Pagamento Cancelado</h2>
              <p className="text-xl text-gray-300 mb-8">
                O seu processo de pagamento foi cancelado. Não se preocupe, não foi cobrado nenhum valor.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/products"
                  className="inline-flex items-center bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  <FiShoppingCart className="mr-2" /> Ver Planos
                </Link>
                
                <Link 
                  href="/"
                  className="inline-flex items-center bg-[#252525] hover:bg-[#303030] text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  <FiArrowLeft className="mr-2" /> Voltar à Página Inicial
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>Se precisar de ajuda, contacte-nos através de <a href="mailto:suporte@diogosamuel.pt" className="text-[#FF8A00] hover:underline">suporte@diogosamuel.pt</a></p>
          </div>
        </div>
      </main>
    </>
  );
} 