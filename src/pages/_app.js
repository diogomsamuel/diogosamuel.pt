import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from '../components/ErrorBoundary';
import '@/styles/globals.css';
import '../lib/i18n'; // Importar configuração i18n

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Registrar o Service Worker
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Registrar o service worker apenas após o carregamento da página
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then(registration => {
            console.log('Service Worker registrado com sucesso:', registration.scope);
          })
          .catch(error => {
            console.error('Falha ao registrar Service Worker:', error);
          });
      });

      // Adicionar listeners para mudanças de conexão
      const handleOnlineStatusChange = () => {
        if (navigator.onLine) {
          // Se voltarmos a ficar online, tentar atualizar o Service Worker
          navigator.serviceWorker.ready.then(registration => {
            registration.update().catch(err => 
              console.error('Erro ao atualizar Service Worker:', err)
            );
          });
        }
      };

      window.addEventListener('online', handleOnlineStatusChange);
      window.addEventListener('offline', () => {
        console.log('Conexão perdida. Modo offline ativado.');
      });

      // Limpar event listeners ao desmontar
      return () => {
        window.removeEventListener('online', handleOnlineStatusChange);
        window.removeEventListener('offline', () => {});
      };
    }
  }, []);

  return (
    <ErrorBoundary>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0D0D0D" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </ErrorBoundary>
  );
}

