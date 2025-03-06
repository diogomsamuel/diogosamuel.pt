import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
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
        router.push('/login');
      }
    } catch (error) {
      console.error('Erro no registo:', error);
      const errorMessage = error.response?.data?.error || 'Erro ao efetuar o registo';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "mt-1 block w-full rounded-lg bg-[#1A1A1A] border-[#333] text-white shadow-sm focus:border-[#FFD700] focus:ring-[#FFD700] transition-colors";
  const labelClasses = "block text-sm font-medium text-gray-200";
  const buttonClasses = "w-full py-2 px-4 rounded-lg bg-[#FFD700] text-black font-semibold hover:bg-[#FFE55C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold mb-4 text-white">Informações da Conta</h2>
            
            <div>
              <label className={labelClasses}>Username *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className={labelClasses}>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className={labelClasses}>Palavra-passe *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className={labelClasses}>Confirmar Palavra-passe *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold mb-4 text-white">Informações Pessoais</h2>
            
            <div>
              <label className={labelClasses}>Nome *</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className={labelClasses}>Apelido *</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className={labelClasses}>Telefone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Data de Nascimento</label>
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold mb-4 text-white">Informações Físicas</h2>
            
            <div>
              <label className={labelClasses}>Altura (cm) *</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className={labelClasses}>Peso Inicial (kg) *</label>
              <input
                type="number"
                name="initial_weight"
                value={formData.initial_weight}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className={labelClasses}>Nível de Fitness</label>
              <select
                name="fitness_level"
                value={formData.fitness_level}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="beginner">Iniciante</option>
                <option value="intermediate">Intermediário</option>
                <option value="advanced">Avançado</option>
              </select>
            </div>

            <div>
              <label className={labelClasses}>Objetivos de Fitness</label>
              <textarea
                name="fitness_goals"
                value={formData.fitness_goals}
                onChange={handleChange}
                className={inputClasses}
                rows="3"
              />
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-[#1A1A1A]/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-[#333]"
      >
        <div>
          <h1 className="text-2xl font-bold text-center text-white mb-2">
            Criar Conta
          </h1>
          <p className="text-center text-gray-400">
            Passo {step} de 3
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {renderStep()}

          <div className="flex justify-between space-x-4 mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className={buttonClasses + " bg-[#333] hover:bg-[#444]"}
                disabled={loading}
              >
                Anterior
              </button>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className={buttonClasses}
                disabled={loading}
              >
                Próximo
              </button>
            ) : (
              <button
                type="submit"
                className={buttonClasses}
                disabled={loading}
              >
                {loading ? 'A registar...' : 'Finalizar Registo'}
              </button>
            )}
          </div>
        </form>

        <p className="text-center text-gray-400 text-sm mt-4">
          Já tem conta?{' '}
          <Link href="/login" className="text-[#FFD700] hover:text-[#FFE55C] transition-colors">
            Entrar
          </Link>
        </p>
      </motion.div>
    </div>
  );
} 