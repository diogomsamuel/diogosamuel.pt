import React, { useState } from 'react';
import { FiTrash2, FiEdit2, FiCheck } from 'react-icons/fi';
import ConfirmationDialog from './ConfirmationDialog';

const GoalsList = ({ goals, onDelete, onUpdate, isLoading }) => {
  const [editingGoal, setEditingGoal] = useState(null);
  const [currentValue, setCurrentValue] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, goalId: null });

  // Função para formatar tipo de meta
  const formatGoalType = (type) => {
    switch (type) {
      case 'weight':
        return 'Meta de Peso';
      case 'measurement':
        return 'Meta de Medida';
      case 'performance':
        return 'Meta de Performance';
      case 'habit':
        return 'Meta de Hábito';
      default:
        return type;
    }
  };

  // Função para formatar status
  const formatStatus = (status) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'in_progress':
        return 'Em Progresso';
      case 'achieved':
        return 'Alcançada';
      case 'failed':
        return 'Não Alcançada';
      default:
        return status;
    }
  };

  // Função para formatar data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Função para calcular porcentagem de conclusão
  const calculateProgress = (goal) => {
    if (!goal.current_value || !goal.target_value) return 0;
    return Math.min(100, Math.round((goal.current_value / goal.target_value) * 100));
  };

  // Função para iniciar edição de meta
  const startEdit = (goal) => {
    setEditingGoal(goal.id);
    setCurrentValue(goal.current_value || '');
  };

  // Função para cancelar edição
  const cancelEdit = () => {
    setEditingGoal(null);
    setCurrentValue('');
  };

  // Função para salvar edição
  const saveEdit = (goal) => {
    if (currentValue === '' || isNaN(currentValue) || parseFloat(currentValue) < 0) {
      return;
    }

    // Calcular novo status baseado no valor atual
    let newStatus = goal.status;
    const progress = parseFloat(currentValue) / goal.target_value;
    
    if (progress >= 1) {
      newStatus = 'achieved';
    } else if (progress > 0) {
      newStatus = 'in_progress';
    }

    onUpdate(goal.id, {
      current_value: parseFloat(currentValue),
      status: newStatus
    });

    setEditingGoal(null);
    setCurrentValue('');
  };

  // Função para iniciar processo de exclusão
  const startDelete = (goalId) => {
    setDeleteDialog({ isOpen: true, goalId });
  };

  // Função para confirmar exclusão
  const confirmDelete = () => {
    if (deleteDialog.goalId) {
      onDelete(deleteDialog.goalId);
    }
    setDeleteDialog({ isOpen: false, goalId: null });
  };

  // Função para cancelar exclusão
  const cancelDelete = () => {
    setDeleteDialog({ isOpen: false, goalId: null });
  };

  // Filtrar metas por status
  const filteredGoals = filterStatus === 'all' 
    ? goals 
    : goals.filter(goal => goal.status === filterStatus);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!goals || goals.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-500">Nenhuma meta encontrada.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between">
        <h3 className="text-lg font-medium text-gray-700 mb-2 md:mb-0">Suas Metas</h3>
        <div className="flex space-x-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="all">Todas</option>
            <option value="pending">Pendentes</option>
            <option value="in_progress">Em Progresso</option>
            <option value="achieved">Alcançadas</option>
            <option value="failed">Não Alcançadas</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor Alvo
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor Atual
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progresso
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data Alvo
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredGoals.map((goal) => (
              <tr key={goal.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {formatGoalType(goal.goal_type)}
                  </div>
                  {goal.notes && (
                    <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">
                      {goal.notes}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{goal.target_value}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingGoal === goal.id ? (
                    <input
                      type="number"
                      step="0.1"
                      value={currentValue}
                      onChange={(e) => setCurrentValue(e.target.value)}
                      className="block w-24 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Novo valor"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">{goal.current_value || 0}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        goal.status === 'achieved' 
                          ? 'bg-green-600' 
                          : goal.status === 'failed' 
                            ? 'bg-red-600' 
                            : 'bg-blue-600'
                      }`}
                      style={{ width: `${calculateProgress(goal)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {calculateProgress(goal)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{formatDate(goal.target_date)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    goal.status === 'achieved' 
                      ? 'bg-green-100 text-green-800' 
                      : goal.status === 'failed' 
                        ? 'bg-red-100 text-red-800' 
                        : goal.status === 'in_progress' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {formatStatus(goal.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editingGoal === goal.id ? (
                    <div className="flex space-x-2 justify-end">
                      <button
                        onClick={() => saveEdit(goal)}
                        className="text-green-600 hover:text-green-900"
                        title="Salvar"
                      >
                        <FiCheck className="h-5 w-5" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-red-600 hover:text-red-900"
                        title="Cancelar"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2 justify-end">
                      <button
                        onClick={() => startEdit(goal)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Editar"
                      >
                        <FiEdit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => startDelete(goal.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Excluir"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        title="Excluir Meta"
        message="Tem certeza que deseja excluir esta meta? Esta ação não pode ser desfeita."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default GoalsList; 