import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from '../components/ErrorBoundary';
import Head from 'next/head';
import '../lib/i18n'; // Importar configuração i18n

export default function App({ Component, pageProps }) {
  const router = useRouter();
  
  // Isso não é mais necessário, pois cada página agora implementa sua própria lógica de scrolling
  // Removendo para evitar comportamentos indesejados
  
  return (
    <ErrorBoundary>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Diogo Samuel - Personal Trainer e Especialista em Transformação Física. Planos de treino personalizados para resultados reais."
        />
        <meta
          name="keywords"
          content="personal trainer, treino personalizado, transformação física, emagrecimento, hipertrofia, plano de treino"
        />
        <meta property="og:title" content="Diogo Samuel - Personal Trainer" />
        <meta
          property="og:description"
          content="Planos de treino personalizados para transformação física real."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://diogosamuel.pt/" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@diogosvmuel" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" />
    </ErrorBoundary>
  );
}

