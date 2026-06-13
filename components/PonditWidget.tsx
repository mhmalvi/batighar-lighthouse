
import React, { useState, useRef, useEffect } from 'react';
import { getPonditAdvice } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { Send, Loader2, X, Feather } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface PonditWidgetProps {
   language: Language;
   onClose: () => void;
}

export const PonditWidget: React.FC<PonditWidgetProps> = ({ language, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ id: '0', sender: 'ai', text: t.pondit.welcome }]);
    }
  }, [language, t.pondit.welcome]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      text: m.text
    }));

    const responseText = await getPonditAdvice(history, userMsg.text);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: responseText
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-24 left-4 w-80 md:w-96 h-[450px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[2rem] shadow-premium border border-amber-100 dark:border-slate-700 z-50 flex flex-col overflow-hidden animate-in slide-in-from-left-10 fade-in zoom-in-95 origin-bottom-left">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-700 to-orange-800 p-5 flex items-center justify-between relative overflow-hidden">
             {/* Decorative Background Elements */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
             
             <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-inner">
                   <Feather className="text-amber-100" size={20} />
                </div>
                <div>
                   <h3 className="text-white font-serif font-bold text-lg leading-tight">{t.pondit.title}</h3>
                   <p className="text-amber-100 text-[10px] font-medium tracking-wide opacity-90">{t.pondit.subtitle}</p>
                </div>
             </div>
             
             <button onClick={onClose} className="text-white/80 hover:text-white transition-colors relative z-10">
                <X size={20} />
             </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-amber-50/30 dark:bg-slate-900 scroll-smooth font-serif">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-sm shadow-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-700 text-white rounded-tr-none font-sans'
                      : 'bg-white dark:bg-slate-800 dark:text-slate-200 text-slate-800 border border-amber-100 dark:border-slate-700 rounded-tl-none italic'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-white dark:bg-slate-800 border border-amber-100 dark:border-slate-700 rounded-2xl rounded-tl-none p-4 shadow-sm">
                   <Loader2 className="animate-spin h-5 w-5 text-amber-700" />
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-amber-100 dark:border-slate-800">
             <div className="flex items-center gap-2 bg-amber-50 dark:bg-slate-800 rounded-full px-5 py-3 border border-amber-200 dark:border-slate-700 focus-within:border-amber-700 focus-within:ring-2 focus-within:ring-amber-700/10 transition-all shadow-inner">
                <input 
                   type="text" 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyDown={handleKeyPress}
                   placeholder={t.pondit.placeholder}
                   className="flex-1 bg-transparent text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none"
                   disabled={isLoading}
                   autoFocus
                />
                <button 
                   onClick={handleSend}
                   disabled={!input.trim()}
                   className="text-amber-700 hover:text-amber-900 disabled:opacity-50 transition-colors transform active:scale-95"
                >
                   <Send size={20} />
                </button>
             </div>
          </div>
        </div>
  );
};
