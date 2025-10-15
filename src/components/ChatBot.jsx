import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Brain, AlertCircle, RefreshCw } from 'lucide-react';

const MAX_MESSAGES = 30; // ✨ Aumentado a 30!

export default function ChatBot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length >= MAX_MESSAGES - 5) {
      setShowWarning(true);
    }
  }, [messages.length]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    if (messages.length >= MAX_MESSAGES) {
      const limitMessage = {
        role: 'assistant',
        content: '⚠️ Has alcanzado el límite de 30 mensajes por sesión. Por favor, inicia una nueva conversación haciendo clic en "🔄 Reiniciar". ¡Gracias! 😊',
        timestamp: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, limitMessage]);
      return;
    }

    if (inputValue.length > 1000) {
      alert('Por favor envía mensajes de máximo 1000 caracteres.');
      return;
    }

    const userMessage = {
      role: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const apiMessages = messages.concat(userMessage).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en la respuesta');
      }

      const botMessage = {
        role: 'assistant',
        content: data.content,
        timestamp: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'assistant',
        content: error.message || 'Lo siento, hubo un error. Por favor, intenta de nuevo en unos momentos.',
        timestamp: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const startChat = () => {
    setIsChatOpen(true);
    if (messages.length === 0) {
      const welcomeMessage = {
        role: 'assistant',
        content: "¡Hola! Soy PrepáraTE 🚀\n\n¿Para qué empresa o posición te estás preparando? Si tienes la descripción del puesto, compártela conmigo.\n\n💡 Tip: Tienes hasta 30 mensajes por sesión para practicar en profundidad.",
        timestamp: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcomeMessage]);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setShowWarning(false);
    startChat();
  };

  return (
    <>
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 flex flex-col z-50 max-w-[calc(100vw-3rem)]">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-t-2xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">PrepáraTE</h3>
                  <p className="text-xs text-white/80">Powered by Gemini AI</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetChat}
                  className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                  title="Reiniciar conversación"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-white/70">
              <span>Mensajes: {messages.length}/{MAX_MESSAGES}</span>
              {showWarning && (
                <span className="flex items-center gap-1 text-yellow-300">
                  <AlertCircle className="w-3 h-3" />
                  Cerca del límite
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                    : 'bg-slate-800 text-slate-200'
                } rounded-2xl px-4 py-3`}>
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 rounded-2xl px-4 py-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-purple-500/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe tu mensaje... (máx 1000 caracteres)"
                maxLength={1000}
                disabled={messages.length >= MAX_MESSAGES}
                className="flex-1 bg-slate-800 border border-purple-500/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 text-white placeholder-slate-500 disabled:opacity-50"
              />
              <button 
                onClick={handleSendMessage}
                disabled={messages.length >= MAX_MESSAGES}
                className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              {inputValue.length}/1000 caracteres
            </p>
          </div>
        </div>
      )}

      {!isChatOpen && (
        <button
          onClick={startChat}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl shadow-purple-500/50 flex items-center justify-center hover:scale-110 transition-transform z-50"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      )}
    </>
  );
}