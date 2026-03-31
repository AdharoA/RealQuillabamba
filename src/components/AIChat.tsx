import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: '¡Hola! Soy Coco, tu asistente personal de estilo en Coco Vanilla. ¿En qué te puedo ayudar hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost/RealQuillabamba/api/ai_chat.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await response.json();
      
      if (data.response) {
        setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: 'Lo siento, en este momento nuestro sistema de asesoría se encuentra saturado. Intenta de nuevo más tarde.' }]);
      }
    } catch (error) {
       setMessages(prev => [...prev, { role: 'ai', text: 'Lo siento, no he podido conectarme con el centro de diseño. Por favor, revisa tu conexión.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageSquare className="h-7 w-7" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-background border border-border shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-accent font-bold text-lg tracking-widest text-primary-foreground">Coco</h3>
                <p className="text-xs text-primary-foreground/80">Asesora de Estilo</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-gold transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Chat area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tl-2xl rounded-bl-2xl rounded-tr-sm' 
                    : 'bg-background text-foreground border border-border rounded-tr-2xl rounded-br-2xl rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 text-sm bg-background border border-border rounded-tr-2xl rounded-br-2xl rounded-tl-sm flex gap-1">
                  <span className="w-2 h-2 bg-primary/50 animate-bounce rounded-full"></span>
                  <span className="w-2 h-2 bg-primary/50 animate-bounce rounded-full" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-primary/50 animate-bounce rounded-full" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-background border-t border-border">
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-input border border-border p-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-3 bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
