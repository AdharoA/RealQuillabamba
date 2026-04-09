import React, { useState } from 'react';
import { ArrowLeft, Coffee, Loader2 } from 'lucide-react';

export const AuthScreen = ({ onAuth, onCancel }) => {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth.php`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        
        if (data.status === 'success') {
            onAuth(data.user);
        } else {
            setError(data.error || 'Credenciales incorrectas locales');
        }
    } catch (err) {
        setError('Error conectando al servidor de PHP. ¿Está prendido XAMPP Apache?');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
      <button 
        onClick={onCancel} 
        className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-5 w-5" /> Home
      </button>

      <div className="bg-card w-full max-w-md p-10 rounded-3xl border border-border shadow-xl">
        <div className="flex justify-center mb-8">
          <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <Coffee className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-center text-foreground mb-2">
          {mode === 'signin' ? 'Acceso al Portal' : 'Backend no configurado para Signup'}
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          {mode === 'signin' 
            ? 'Ingresa tus credenciales para administrar Coco Vanila (Ej: a@a.com / password123)' 
            : 'Por seguridad técnica en InfinityFree, crear cuentas se reservó para otro hito.'}
        </p>

        {error && <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-600 text-sm font-medium text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            required 
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Correo del administrador" 
            className="w-full p-4 bg-background text-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary" 
          />
          <input 
            type="password" 
            required 
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña SQL" 
            className="w-full p-4 bg-background text-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary" 
          />

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-full mt-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (mode === 'signin' ? 'Iniciar Sesión en API' : 'Create Account')}
          </button>
        </form>
      </div>
    </div>
  );
};
