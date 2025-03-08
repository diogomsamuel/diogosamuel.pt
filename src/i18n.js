import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Configuração do i18n
i18n
  // Carregar as traduções a partir dos arquivos JSON
  .use(Backend)
  // Detectar o idioma do navegador
  .use(LanguageDetector)
  // Integração com o React
  .use(initReactI18next)
  // Inicializar i18next
  .init({
    // Idioma padrão
    fallbackLng: 'pt-PT',
    // Lista de idiomas suportados
    supportedLngs: ['pt-PT', 'pt'],
    // Idioma padrão se a detecção falhar
    lng: 'pt-PT',
    // Debug em desenvolvimento (desabilitado em produção)
    debug: process.env.NODE_ENV === 'development',
    // Caminho para os arquivos de tradução
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    // Separador para chaves de tradução
    keySeparator: '.',
    // Interpolar variáveis nas traduções
    interpolation: {
      escapeValue: false,
    },
    // Opções para o detector de idioma
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    },
    // Recarregar traduções em desenvolvimento
    react: {
      useSuspense: true,
    },
  });

export default i18n; 