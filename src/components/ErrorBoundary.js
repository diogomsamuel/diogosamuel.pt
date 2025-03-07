import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

/**
 * Classe ErrorBoundary para capturar erros na UI
 * https://reactjs.org/docs/error-boundaries.html
 */
class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para exibir a UI de fallback
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Capturar o erro para logging
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // Enviar erro para serviço de monitoramento (opcional)
    if (typeof window !== 'undefined' && window.reportError) {
      window.reportError(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    const { hasError, error, errorInfo, errorCount } = this.state;
    
    // Se não houver erro, renderizar os filhos normalmente
    if (!hasError) {
      return this.props.children;
    }

    // Se houver muitos erros consecutivos, exibir mensagem mais grave
    if (errorCount > 3) {
      return <ErrorFallbackSevere error={error} resetError={this.resetError} />;
    }

    // Se estiver em desenvolvimento, mostrar detalhes do erro
    if (process.env.NODE_ENV === 'development') {
      return <ErrorFallbackDev error={error} errorInfo={errorInfo} resetError={this.resetError} />;
    }

    // Fallback padrão para produção
    return <ErrorFallback error={error} resetError={this.resetError} />;
  }
}

/**
 * Componente de fallback para desenvolvimento - mostra detalhes técnicos
 */
function ErrorFallbackDev({ error, errorInfo, resetError }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-center">
      <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">Something went wrong</h2>
      <div className="text-red-600 dark:text-red-300 mb-4">
        <p className="mb-2">{error.toString()}</p>
        <details className="text-left">
          <summary className="cursor-pointer mb-2 font-medium">Stack trace</summary>
          <pre className="text-xs overflow-auto p-2 bg-black/10 dark:bg-black/30 rounded max-h-[200px]">
            {errorInfo?.componentStack || error?.stack || 'No stack trace available'}
          </pre>
        </details>
      </div>
      <div className="mt-4 flex gap-4">
        <button 
          onClick={resetError}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
        >
          Try Again
        </button>
        <Link 
          href="/"
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

/**
 * Componente de fallback padrão - amigável para usuários
 */
function ErrorFallback({ error, resetError }) {
  const { t } = useTranslation('common');
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg text-center shadow-lg">
      <div className="mb-6 text-orange-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">{t('error.component_error')}</h2>
      <p className="text-gray-300 mb-6">{t('error.component_error_message')}</p>
      <div className="flex flex-col md:flex-row gap-4">
        <button 
          onClick={resetError}
          className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full transition-colors shadow-lg transform hover:scale-105"
        >
          {t('error.try_again')}
        </button>
        <Link 
          href="/"
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors shadow-lg transform hover:scale-105"
        >
          {t('error.go_home')}
        </Link>
      </div>
    </div>
  );
}

/**
 * Componente de fallback para erros graves/repetidos
 */
function ErrorFallbackSevere({ resetError }) {
  const { t } = useTranslation('common');
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-6 bg-gradient-to-br from-red-900 to-gray-900 border border-red-800 rounded-lg text-center shadow-lg">
      <div className="mb-6 text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">{t('error.serious_error')}</h2>
      <p className="text-gray-300 mb-6">{t('error.serious_error_message')}</p>
      <div className="flex flex-col md:flex-row gap-4">
        <Link 
          href="/"
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors shadow-lg transform hover:scale-105"
        >
          {t('error.go_home')}
        </Link>
        <a 
          href="mailto:support@diogosamuel.pt"
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors shadow-lg transform hover:scale-105"
        >
          {t('error.contact_support')}
        </a>
      </div>
    </div>
  );
}

/**
 * Wrapper com hooks para acessar traduções no componente de classe
 */
export default function ErrorBoundary(props) {
  return <ErrorBoundaryClass {...props} />;
} 