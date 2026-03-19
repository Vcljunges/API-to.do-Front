export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="flex items-center justify-between p-4 bg-gray-50 border rounded-lg hover:shadow-sm transition">
      <div className="flex items-center gap-3">
        <input 
          type="checkbox" 
          checked={todo.finished} 
          onChange={onToggle}
          className="w-5 h-5 text-blue-600 cursor-pointer" 
        />
        <span className={`text-lg ${todo.finished ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {todo.task}
        </span>
      </div>
      <button 
        onClick={onDelete} 
        className="text-red-500 hover:text-red-700 font-bold px-2 py-1"
      >
        Apagar
      </button>
    </li>
  );
}
