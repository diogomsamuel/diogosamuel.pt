import React, { useEffect } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

const inter = Inter({ subsets: ['latin'] });

// Função para registrar corretamente o Service Worker
function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        // Primeiro, tentar desregistrar qualquer service worker existente
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (let registration of registrations) {
          await registration.unregister();
          console.log('Service Worker desregistrado com sucesso');
        }

        // Agora registrar o novo service worker
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registrado com sucesso:', registration.scope);
      } catch (error) {
        console.error('Falha ao registrar o Service Worker:', error);
      }
    });
  }
}

export const metadata = {
  title: 'Diogo Samuel | Planos de Treino Personalizados',
  description: 'Descubra planos de treino personalizados e acompanhe a minha jornada fitness',
  manifest: '/manifest.json',
  themeColor: '#FF8A00',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  icons: {
    icon: ['/favicon.ico', '/icon-192x192.png', '/icon-512x512.png'],
    apple: ['/apple-touch-icon.png'],
  }
};

export default function RootLayout({ children }) {
  // Registrar o Service Worker
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <html lang="pt">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FF8A00" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <I18nextProvider i18n={i18n}>
          {children}
        </I18nextProvider>
      </body>
    </html>
  );
} 