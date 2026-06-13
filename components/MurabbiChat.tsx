import React, { useState, useRef, useEffect } from 'react';
import { getMurabbiAdvice } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { Send, User, Bot, Loader2 } from 'lucide-react';

interface MurabbiChatProps {
   language: Language;
}

export const MurabbiChat: React.FC<MurabbiChatProps> = ({ language }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      sender: 'ai',
      text: language === 'EN' 
         ? "As-salamu alaykum, baba. I am here. Tell me what is weighing on your heart today? Is it work, family, or just the changing seasons?"
         : "আসসালামু আলাইকুম বাবা। আমি আছি। আজ তোমার মনের খবর কি? কাজ, পরিবার নাকি ঋতু বদল?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-bd-green p-4 flex items-center space-x-3 text-white">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
           <span className="text-2xl">👴🏽</span>
        </div>
        <div>
          <h2 className="font-bold">{language === 'EN' ? 'Murabbi Advice' : 'মুরুব্বির পরামর্শ'}</h2>
          <p className="text-xs text-green-100">{language === 'EN' ? 'Always online, always patient.' : 'সবসময় পাশে আছি।'}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-bd-green text-white rounded-tr-none'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex justify-start">
             <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center text-gray-500 text-sm">
               <Loader2 className="animate-spin mr-2 h-4 w-4" /> {language === 'EN' ? 'Murabbi is thinking...' : 'মুরুব্বি ভাবছেন...'}
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={language === 'EN' ? "Ask for advice..." : "পরামর্শ চান..."}
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-bd-green/50"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-bd-green text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};