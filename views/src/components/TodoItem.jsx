import { useState } from 'react';

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.task);
  const handleSave = () => {
    if (editValue.trim() !== '' && editValue !== todo.task) {
      onUpdate({ task: editValue });
    } else {
      setEditValue(todo.task);
    }
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between p-4 bg-gray-50 border rounded-lg hover:shadow-sm transition">
      
      <div className="flex items-center gap-3 flex-1">
        {/* Checkbox para atualizar o status (finished) */}
        <input 
          type="checkbox" 
          checked={todo.finished} 
          onChange={() => onUpdate({ finished: !todo.finished })}
          className="w-5 h-5 text-blue-600 cursor-pointer" 
        />
        
        {/* Alterna entre o Input de edição e o Texto normal */}
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span className={`text-lg flex-1 ${todo.finished ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {todo.task}
          </span>
        )}
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-2 ml-4">
        <button
          onMouseDown={(e) => {
            if (isEditing) {
              e.preventDefault();
            }
          }}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)} 
          className="text-blue-500 hover:text-blue-700 font-bold px-2 py-1"
        >
          {isEditing ? 'Salvar' : 'Editar'}
        </button>
        <button 
          onClick={onDelete} 
          className="text-red-500 hover:text-red-700 font-bold px-2 py-1"
        >
          Apagar
        </button>
      </div>

    </li>
  );
}
