import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Configuração básica do i18next
i18n
  // Carregar traduções usando xhr
  .use(Backend)
  // Detectar idioma do navegador
  .use(LanguageDetector)
  // Integração com React
  .use(initReactI18next)
  // Inicialização
  .init({
    fallbackLng: 'pt-PT',
    debug: process.env.NODE_ENV === 'development',
    
    // Namespace padrão usado no carregamento de recursos
    defaultNS: 'messages',
    
    interpolation: {
      escapeValue: false, // Não é necessário para React pois ele escapa por padrão
    },
    
    // Caminho para carregar recursos de tradução
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    }
  });

export default i18n; 