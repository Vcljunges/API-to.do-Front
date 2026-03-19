import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

export default function Dashboard({ token, onLogout }) {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch('/todos', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) setTodos(await res.json());
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const res = await fetch('/todos', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ task: newTask })
    });
    
    if (res.ok) {
      setNewTask('');
      fetchTodos();
    }
  };

  const toggleTodo = async (todo) => {
    const res = await fetch(`/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ finished: !todo.finished })
    });
    if (res.ok) fetchTodos();
  };

  const deleteTodo = async (id) => {
    const res = await fetch(`/todos/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) fetchTodos();
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-6 flex justify-between items-center text-white">
          <h1 className="text-2xl font-bold">As Minhas Tarefas</h1>
          <button onClick={onLogout} className="px-4 py-2 text-sm font-semibold text-blue-600 bg-white rounded-lg hover:bg-gray-100">
            Sair
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={addTodo} className="flex gap-2 mb-6">
            <input type="text" placeholder="Adicionar nova tarefa..." required
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newTask} onChange={e => setNewTask(e.target.value)} />
            <button type="submit" className="px-6 py-2 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600">
              Adicionar
            </button>
          </form>

          <ul className="space-y-3">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500 py-4">Nenhuma tarefa encontrada. Bom trabalho!</p>
            ) : (
              todos.map(todo => (
                <TodoItem 
                  key={todo.id} 
                  todo={todo} 
                  onToggle={() => toggleTodo(todo)} 
                  onDelete={() => deleteTodo(todo.id)} 
                />
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
