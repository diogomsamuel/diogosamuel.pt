import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_APIS_URL_REMOTE;

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone: '',
    birth_date: '',
    height: '',
    initial_weight: '',
    target_weight: '',
    fitness_level: 'beginner',
    fitness_goals: '',
    health_conditions: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
          toast.error('Por favor, preencha todos os campos obrigatórios');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error('As palavras-passe não coincidem');
          return false;
        }
        if (formData.password.length < 8) {
          toast.error('A palavra-passe deve ter pelo menos 8 caracteres');
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          toast.error('Por favor, insira um email válido');
          return false;
        }
        return true;

      case 2:
        if (!formData.first_name || !formData.last_name) {
          toast.error('Por favor, preencha o nome e apelido');
          return false;
        }
        return true;

      case 3:
        if (!formData.height || !formData.initial_weight) {
          toast.error('Por favor, preencha a altura e peso inicial');
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/register`, {
        ...formData,
        confirmPassword: undefined // Remove confirmPassword antes de enviar
      });
      
      if (response.data.success) {
        toast.success('Registo efetuado com sucesso!');
        router.push('/auth');
      }
    } catch (error) {
      console.error('Erro no registo:', error);
      const errorMessage = error.response?.data?.error || 'Erro ao efetuar o registo';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Variante para inputs normais
  const inputVariant = {
    default: "w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] transition-all",
    error: "w-full bg-[#1A1A1A] border border-red-500 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
  };

  // Variante para inputs de tipo select
  const selectVariant = {
    default: "w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] transition-all"
  };

  // Variante para botões
  const buttonVariant = {
    primary: "w-full bg-gradient-to-r from-[#FF8A00] to-[#FF5F00] text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/50 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "w-full bg-[#1A1A1A] border border-[#333] text-white font-semibold py-3 px-4 rounded-lg hover:border-[#FF8A00] transition-all focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/50 disabled:opacity-50 disabled:cursor-not-allowed"
  };

  // Animações para as etapas do formulário
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeIn" } }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-5"
          >
            <h2 className="text-2xl font-bold mb-5 text-white">Informações da Conta</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Nome de utilizador *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={inputVariant.default}
                placeholder="Escolha um nome de utilizador"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputVariant.default}
                placeholder="Insira o seu email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Palavra-passe *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={inputVariant.default}
                placeholder="Mínimo 8 caracteres"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Confirmar Palavra-passe *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={inputVariant.default}
                placeholder="Confirme a sua palavra-passe"
                required
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-5"
          >
            <h2 className="text-2xl font-bold mb-5 text-white">Informações Pessoais</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Nome *</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={inputVariant.default}
                placeholder="Insira o seu nome"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Apelido *</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={inputVariant.default}
                placeholder="Insira o seu apelido"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Telefone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputVariant.default}
                placeholder="Opcional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Data de Nascimento</label>
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                className={inputVariant.default}
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-5"
          >
            <h2 className="text-2xl font-bold mb-5 text-white">Informações Físicas</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Altura (cm) *</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className={inputVariant.default}
                placeholder="Ex: 170"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Peso Inicial (kg) *</label>
              <input
                type="number"
                name="initial_weight"
                value={formData.initial_weight}
                onChange={handleChange}
                className={inputVariant.default}
                placeholder="Ex: 70"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Nível de Fitness</label>
              <select
                name="fitness_level"
                value={formData.fitness_level}
                onChange={handleChange}
                className={selectVariant.default}
              >
                <option value="beginner">Iniciante</option>
                <option value="intermediate">Intermediário</option>
                <option value="advanced">Avançado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Objetivos de Fitness</label>
              <textarea
                name="fitness_goals"
                value={formData.fitness_goals}
                onChange={handleChange}
                className={inputVariant.default}
                rows="3"
                placeholder="Descreva seus objetivos (opcional)"
              />
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl shadow-2xl border border-[#333] overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">Criar Conta</h1>
            <p className="text-gray-400 mt-2">Passo {step} de 3</p>
            
            {/* Barra de progresso */}
            <div className="mt-4 h-2 w-full bg-[#333] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#FF8A00] to-[#FF5F00]"
                initial={{ width: "33.33%" }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>

            <div className="flex justify-between mt-8 gap-4">
              {step > 1 && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={prevStep}
                  className={buttonVariant.secondary}
                  disabled={loading}
                >
                  Anterior
                </motion.button>
              )}
              
              {step < 3 ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={nextStep}
                  className={step > 1 ? buttonVariant.primary : "w-full " + buttonVariant.primary}
                  disabled={loading}
                >
                  Próximo
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className={buttonVariant.primary}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>A processar...</span>
                    </div>
                  ) : 'Finalizar Registo'}
                </motion.button>
              )}
            </div>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Já tem conta?{' '}
            <Link href="/auth" className="text-[#FF8A00] hover:text-[#FF5F00] hover:underline transition-colors">
              Entrar
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
} 