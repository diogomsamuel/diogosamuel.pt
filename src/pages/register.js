import { useState, useEffect, useRef } from "react"; // Hooks do React
import axios from "axios"; // Biblioteca para requisições HTTP
import Image from "next/image"; // Componente otimizado para imagens
import { ToastContainer, toast } from "react-toastify"; // Biblioteca para mensagens interativas
import "react-toastify/dist/ReactToastify.css"; // Estilos do Toastify
import Input from "../components/ui/Input"; // Componente reutilizável de Input
import Button from "../components/ui/Button"; // Componente reutilizável de Button
import { useRouter } from "next/router"; // Hook de navegação do Next.js
import useMessages from "../hooks/useMessages"; // Hook para mensagens dinâmicas
import Head from 'next/head';
import RegisterForm from '../components/RegisterForm';
import { motion } from 'framer-motion';

// Define a URL da API de produção (HTTPS Hosting online)
const API_URL = process.env.NEXT_PUBLIC_APIS_URL_REMOTE;

export default function Register() {
  return (
    <>
      <Head>
        <title>Registo | Diogo Samuel - Treinos Personalizados</title>
        <meta name="description" content="Crie a sua conta para aceder aos planos de treino personalizados do Diogo Samuel. Comece a sua jornada de transformação hoje!" />
        <meta name="keywords" content="registo, conta, treino personalizado, fitness, Diogo Samuel, planos de treino" />
        <meta property="og:title" content="Registo | Diogo Samuel - Treinos Personalizados" />
        <meta property="og:description" content="Crie a sua conta para aceder aos planos de treino personalizados do Diogo Samuel. Comece a sua jornada de transformação hoje!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.diogosamuel.pt/register" />
        <meta property="og:image" content="https://www.diogosamuel.pt/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Registo | Diogo Samuel - Treinos Personalizados" />
        <meta name="twitter:description" content="Crie a sua conta para aceder aos planos de treino personalizados do Diogo Samuel. Comece a sua jornada de transformação hoje!" />
        <meta name="twitter:image" content="https://www.diogosamuel.pt/og-image.jpg" />
        <link rel="canonical" href="https://www.diogosamuel.pt/register" />
      </Head>

      <main className="min-h-screen bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-radial from-[#FF8A00]/10 via-transparent to-transparent"></div>
        
        <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto text-center mb-12"
          >
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Crie a sua conta
            </h1>
            <p className="mt-3 text-lg text-gray-400">
              Comece a sua jornada de transformação hoje mesmo
            </p>
          </motion.div>

          <RegisterForm />
        </div>
      </main>

      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}