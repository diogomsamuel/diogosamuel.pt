import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axiosInstance from '../lib/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiCheck, FiChevronRight, FiDownload, FiAlertTriangle } from 'react-icons/fi';

export default function PaymentSuccess() {
  const router = useRouter();
  const { session_id } = router.query;
  const [status, setStatus] = useState('loading'); // loading, success, pending, error
  const [purchase, setPurchase] = useState(null);
  
  useEffect(() => {
    if (!session_id) return;
    
    const verifyPayment = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/purchases/verify-payment?session_id=${session_id}`);
        
        if (data.success) {
          setPurchase(data.purchase);
          setStatus(data.status);
          
          if (data.status === 'completed') {
            toast.success('Pagamento confirmado! O seu acesso foi disponibilizado.');
          } else if (data.status === 'pending') {
            toast.info('O seu pagamento está a ser processado. Será notificado assim que for confirmado.');
          } else {
            toast.error('Ocorreu um problema com o seu pagamento. Entre em contacto connosco.');
          }
        } else {
          setStatus('error');
          toast.error(data.error || 'Não foi possível verificar o pagamento.');
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setStatus('error');
        toast.error('Erro ao verificar pagamento. Por favor, contacte o suporte.');
      }
    };
    
    verifyPayment();
  }, [session_id]);
  
  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-16 h-16 border-4 border-t-[#FF8A00] border-b-[#FF5F00] border-l-transparent border-r-transparent rounded-full animate-spin mb-6"></div>
            <h2 className="text-2xl font-bold text-white mb-2">A verificar pagamento</h2>
            <p className="text-gray-400">Aguarde enquanto verificamos o seu pagamento...</p>
          </div>
        );
        
      case 'completed':
        return (
          <div className="text-center py-10">
            <div className="bg-green-500 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6">
              <FiCheck className="text-white text-4xl" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Pagamento confirmado!</h2>
            <p className="text-xl text-gray-300 mb-8">O seu acesso ao plano foi disponibilizado com sucesso.</p>
            
            {purchase && (
              <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#303030] max-w-lg mx-auto mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Detalhes da compra</h3>
                <div className="space-y-3 text-left">
                  <p className="flex justify-between">
                    <span className="text-gray-400">Plano:</span>
                    <span className="text-white font-medium">{purchase.plan_name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Variante:</span>
                    <span className="text-white font-medium">{purchase.variant_name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Valor:</span>
                    <span className="text-white font-medium">{purchase.amount_paid.toFixed(2)}€</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Data:</span>
                    <span className="text-white font-medium">{new Date(purchase.purchase_date).toLocaleDateString('pt-PT')}</span>
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/welcome"
                className="inline-flex items-center bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Aceder aos materiais <FiChevronRight className="ml-2" />
              </Link>
              
              <Link 
                href="/products"
                className="inline-flex items-center bg-[#252525] hover:bg-[#303030] text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Ver mais planos
              </Link>
            </div>
          </div>
        );
        
      case 'pending':
        return (
          <div className="text-center py-10">
            <div className="bg-yellow-500 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6">
              <FiAlertTriangle className="text-white text-4xl" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Pagamento em processamento</h2>
            <p className="text-xl text-gray-300 mb-8">
              O seu pagamento está a ser processado. Receberá uma confirmação assim que for aprovado.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/welcome"
                className="inline-flex items-center bg-[#252525] hover:bg-[#303030] text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Ver a minha conta
              </Link>
              
              <Link 
                href="/products"
                className="inline-flex items-center bg-[#252525] hover:bg-[#303030] text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Ver mais planos
              </Link>
            </div>
          </div>
        );
        
      case 'error':
        return (
          <div className="text-center py-10">
            <div className="bg-red-500 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6">
              <FiAlertTriangle className="text-white text-4xl" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Erro no pagamento</h2>
            <p className="text-xl text-gray-300 mb-8">
              Ocorreu um problema ao processar o seu pagamento. Por favor, entre em contacto com o nosso suporte.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/welcome"
                className="inline-flex items-center bg-[#252525] hover:bg-[#303030] text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Ver a minha conta
              </Link>
              
              <button
                onClick={() => status === 'loading' ? null : router.reload()}
                className="inline-flex items-center bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <>
      <Head>
        <title>Pagamento | Diogo Samuel</title>
        <meta name="description" content="Confirmação de pagamento do plano de treino" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <ToastContainer position="top-right" autoClose={5000} />
      
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
            {renderContent()}
          </div>
        </div>
      </main>
    </>
  );
} 