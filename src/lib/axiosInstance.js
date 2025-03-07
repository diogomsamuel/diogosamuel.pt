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

export default axiosInstance;
