import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_APIS_URL_REMOTE;

// Instância do axios configurada para comunicação com a API
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Envia sempre cookies na comunicação
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout padrão de 10 segundos
});

// Interceptor para adicionar o token em todas as requisições
axiosInstance.interceptors.request.use(
  (config) => {
    // Não adicionar o token para endpoints de autenticação
    if (config.url.includes('/api/loginDB') || config.url.includes('/api/register')) {
      return config;
    }

    // Tentar obter o token do cookie
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Limpar o token e redirecionar para a página de login
      document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure; SameSite=Strict";
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
