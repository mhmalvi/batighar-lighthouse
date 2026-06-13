import React, { useState, useRef, useEffect } from 'react';
import { getMurabbiAdvice } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { Send, Loader2, X, Flame } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface MeenaWidgetProps {
   language: Language;
}

export const MeenaWidget: React.FC<MeenaWidgetProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language];

  const initialMessage = language === 'EN' 
         ? "Assalamu Alaikum! I am Meena. How can I help you today?"
         : "আসসালামু আলাইকুম! আমি মিনা। আজ আপনাকে কীভাবে সাহায্য করতে পারি?";

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ id: '0', sender: 'ai', text: initialMessage }]);
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

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

    const responseText = await getMurabbiAdvice(history, userMsg.text);

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
    <>
      {/* Floating Button - "Lighthouse" Flame Motif */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 right-4 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-4 border-white dark:border-slate-800 ${isOpen ? 'bg-slate-800 rotate-90' : 'bg-gradient-to-tr from-bd-green to-teal-500'}`}
        aria-label="Open Meena AI"
      >
        {isOpen ? <X className="text-white" size={24} /> : (
           <div className="relative">
              <Flame className="text-white fill-white" size={28} />
              <div className="absolute -top-1 -right-1 flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-200"></span>
              </div>
           </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 right-4 w-80 md:w-96 h-[500px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[2rem] shadow-premium border border-white/50 dark:border-slate-700 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in zoom-in-95 origin-bottom-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-bd-green to-teal-600 p-5 flex items-center gap-4 relative overflow-hidden">
             {/* Decorative Background Elements */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
             
             <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-inner relative z-10">
                <Flame className="text-yellow-100 fill-white/20" size={24} />
             </div>
             <div className="relative z-10">
                <h3 className="text-white font-serif font-bold text-lg leading-tight">{t.meena.title}</h3>
                <p className="text-emerald-100 text-[11px] font-medium tracking-wide opacity-90">{t.meena.subtitle}</p>
             </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-sm shadow-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-bd-green text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 dark:text-slate-200 text-slate-800 border border-slate-100 dark:border-slate-700 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl rounded-tl-none p-4 shadow-sm">
                   <Loader2 className="animate-spin h-5 w-5 text-bd-green" />
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
             <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-full px-5 py-3 border border-slate-200 dark:border-slate-700 focus-within:border-bd-green focus-within:ring-2 focus-within:ring-bd-green/10 transition-all shadow-inner">
                <input 
                   type="text" 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyDown={handleKeyPress}
                   placeholder={t.meena.placeholder}
                   className="flex-1 bg-transparent text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none"
                   disabled={isLoading}
                   autoFocus
                />
                <button 
                   onClick={handleSend}
                   disabled={!input.trim()}
                   className="text-bd-green hover:text-emerald-700 disabled:opacity-50 transition-colors transform active:scale-95"
                >
                   <Send size={20} />
                </button>
             </div>
          </div>
        </div>
      )}
    </>
  );
};