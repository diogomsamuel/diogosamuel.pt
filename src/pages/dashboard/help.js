import React, { useState } from 'react';
import Head from 'next/head';
import { FiHelpCircle, FiSearch, FiBook, FiMessageSquare, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ComingSoon from '../../components/common/ComingSoon';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todos os Tópicos' },
    { id: 'account', name: 'Conta' },
    { id: 'progress', name: 'Progresso' },
    { id: 'payments', name: 'Pagamentos' },
    { id: 'technical', name: 'Suporte Técnico' }
  ];

  const faqs = [
    {
      category: 'account',
      question: 'Como posso alterar a minha palavra-passe?',
      answer: 'Para alterar a sua palavra-passe, aceda às configurações da sua conta e selecione "Alterar Palavra-passe". Siga as instruções na tela para concluir o processo.'
    },
    {
      category: 'progress',
      question: 'Como posso acompanhar o meu progresso?',
      answer: 'O seu progresso é automaticamente registado quando completa exercícios e atinge objetivos. Pode visualizar todas as suas conquistas na página de progresso.'
    },
    {
      category: 'payments',
      question: 'Quais são os métodos de pagamento aceites?',
      answer: 'Aceitamos cartões de crédito/débito, PayPal e transferências bancárias. Todos os pagamentos são processados de forma segura.'
    },
    {
      category: 'technical',
      question: 'O que devo fazer se encontrar um erro?',
      answer: 'Se encontrar algum erro, por favor, tente atualizar a página. Se o problema persistir, entre em contacto com o nosso suporte técnico.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (searchQuery === '' || 
     faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <Head>
        <title>Ajuda e Suporte | Diogo Samuel</title>
      </Head>

      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            Ajuda e Suporte
          </h1>
          <p className="text-gray-400 mt-1">
            Encontre respostas para as suas perguntas e obtenha suporte quando necessário.
          </p>
        </div>

        {/* Barra de Pesquisa */}
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquisar na ajuda..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 bg-[#1A1A1A] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF8A00]"
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Categorias */}
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors duration-200 ${
                selectedCategory === category.id
                  ? 'bg-[#FF8A00] text-white'
                  : 'bg-[#1A1A1A] text-gray-400 hover:bg-[#333]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6"
            >
              <h3 className="text-lg font-medium text-white mb-2">{faq.question}</h3>
              <p className="text-gray-400">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Contactos */}
        <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#333] p-6">
          <h2 className="text-lg font-medium text-white mb-6">Contacte-nos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-[#FF8A00]/10 p-3 rounded-full">
                <FiMail className="w-5 h-5 text-[#FF8A00]" />
              </div>
              <div>
                <p className="text-white">Email</p>
                <p className="text-gray-400">suporte@diogosamuel.pt</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-[#FF8A00]/10 p-3 rounded-full">
                <FiPhone className="w-5 h-5 text-[#FF8A00]" />
              </div>
              <div>
                <p className="text-white">Telefone</p>
                <p className="text-gray-400">+351 123 456 789</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-[#FF8A00]/10 p-3 rounded-full">
                <FiMapPin className="w-5 h-5 text-[#FF8A00]" />
              </div>
              <div>
                <p className="text-white">Localização</p>
                <p className="text-gray-400">Lisboa, Portugal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <ComingSoon 
          title="Centro de Ajuda Expandido"
          message="Em breve, terá acesso a mais recursos e guias detalhados para ajudá-lo a tirar o máximo proveito da plataforma."
        />
      </div>
    </DashboardLayout>
  );
};

export default HelpPage; 