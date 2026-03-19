import { useState } from 'react';

export default function Auth({ setToken }) {
  const [view, setView] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const url = view === 'register' ? '/users' : '/auth';
    const body = view === 'register' ? { name, email, password } : { email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Erro inesperado');

      if (view === 'register') {
        alert('Utilizador criado com sucesso! Faça login agora.');
        setView('login');
      } else {
        setToken(data.token);
        localStorage.setItem('token', data.token);
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          {view === 'login' ? 'Entrar no To-Do' : 'Criar Conta'}
        </h2>
        
        {errorMsg && <p className="text-red-500 text-sm mb-4 text-center">{errorMsg}</p>}
        
        <form onSubmit={handleAuth} className="space-y-4">
          {view === 'register' && (
            <input type="text" placeholder="Nome" required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name} onChange={e => setName(e.target.value)} />
          )}
          <input type="email" placeholder="Email" required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Senha" required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password} onChange={e => setPassword(e.target.value)} />
          
          <button type="submit" className="w-full py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            {view === 'login' ? 'Entrar' : 'Registar'}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          {view === 'login' ? 'Não tem conta? ' : 'Já tem conta? '}
          <button 
            onClick={() => { setView(view === 'login' ? 'register' : 'login'); setErrorMsg(''); }} 
            className="text-blue-600 font-bold hover:underline"
          >
            {view === 'login' ? 'Crie uma agora' : 'Faça Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
