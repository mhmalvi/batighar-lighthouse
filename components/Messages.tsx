import React, { useState } from 'react';
import { MOCK_CONVERSATIONS } from '../constants';
import { Conversation, Message, Language } from '../types';
import { Search, Plus, MoreVertical, Send, Phone, Video, Users, ArrowLeft, Image as ImageIcon } from 'lucide-react';

interface MessagesProps {
   language: Language;
}

export const Messages: React.FC<MessagesProps> = ({ language }) => {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', senderId: 'c1', text: 'Are you coming to the Pitha Utsab?', timestamp: '10:30 AM', isRead: true },
    { id: '2', senderId: 'me', text: 'Yes! I will bring some Patishapta.', timestamp: '10:32 AM', isRead: true },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);

  // Send Message Handler
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: newMessage,
      timestamp: 'Now',
      isRead: false
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  // Render Conversation List
  if (!activeConversation) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold text-slate-900">{language === 'EN' ? 'Messages' : 'বার্তা'}</h2>
          <button 
            onClick={() => setShowNewGroupModal(true)}
            className="w-10 h-10 bg-bd-green text-white rounded-full flex items-center justify-center shadow-lg shadow-bd-green/30 hover:bg-bd-green/90 transition-transform hover:scale-105"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder={language === 'EN' ? "Search messages..." : "বার্তা খুঁজুন..."} 
            className="w-full bg-white border border-gray-200 pl-12 pr-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-bd-green/20 focus:border-bd-green transition-all shadow-sm"
          />
        </div>

        {/* Conversations */}
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          {MOCK_CONVERSATIONS.map((conv) => (
            <div 
              key={conv.id}
              onClick={() => setActiveConversation(conv)}
              className="p-4 border-b border-gray-50 last:border-none flex items-center space-x-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="relative">
                <img src={conv.avatar} alt={conv.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
                {conv.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-bd-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900 truncate">{conv.name}</h3>
                  <span className="text-xs text-gray-400 font-medium">{conv.timestamp}</span>
                </div>
                <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                  {conv.type === 'GROUP' && <span className="text-bd-green mr-1">Rahim:</span>}
                  {conv.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* New Group Modal (Mock) */}
        {showNewGroupModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95">
              <h3 className="text-xl font-bold mb-4 font-serif">{language === 'EN' ? 'New Group Adda' : 'নতুন গ্রুপ আড্ডা'}</h3>
              <div className="space-y-4">
                <input type="text" placeholder={language === 'EN' ? "Group Name" : "গ্রুপের নাম"} className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-bd-green/20" />
                <div className="space-y-2">
                   <p className="text-xs font-bold text-gray-400 uppercase">{language === 'EN' ? 'Select Friends' : 'বন্ধুদের নির্বাচন করুন'}</p>
                   <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                      {['Rahim', 'Karim', 'Salma', 'Nadia'].map(name => (
                        <div key={name} className="flex flex-col items-center space-y-1 min-w-[60px]">
                           <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                           <span className="text-[10px] text-gray-600">{name}</span>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => setShowNewGroupModal(false)}
                    className="flex-1 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setShowNewGroupModal(false)}
                    className="flex-1 py-3 bg-bd-green text-white font-bold rounded-xl shadow-lg shadow-bd-green/20 hover:bg-bd-green/90 transition-colors"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render Active Chat
  return (
    <div className="flex flex-col h-[calc(100vh-160px)] -mx-4 -my-4 md:rounded-2xl md:border md:border-gray-200 md:shadow-soft bg-white overflow-hidden">
      {/* Chat Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 p-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => setActiveConversation(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
            <ArrowLeft size={20} />
          </button>
          <div className="relative">
            <img src={activeConversation.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">{activeConversation.name}</h3>
            <p className="text-xs text-green-600 font-medium">Active now</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <button className="p-2 hover:bg-gray-50 rounded-full"><Phone size={20} /></button>
          <button className="p-2 hover:bg-gray-50 rounded-full"><Video size={20} /></button>
          <button className="p-2 hover:bg-gray-50 rounded-full"><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg) => {
          const isMe = msg.senderId === 'me';
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] space-y-1 ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  isMe 
                    ? 'bg-bd-green text-white rounded-tr-sm' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 px-1">{msg.timestamp}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
        <button className="p-2 text-gray-400 hover:text-bd-green transition-colors bg-gray-50 rounded-full hover:bg-gray-100">
          <Plus size={20} />
        </button>
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center">
          <input 
            type="text" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={language === 'EN' ? "Type a message..." : "মেসেজ লিখুন..."}
            className="flex-1 bg-transparent text-sm focus:outline-none placeholder-gray-500 text-gray-800"
          />
          <button className="text-gray-400 hover:text-gray-600 ml-2">
            <ImageIcon size={18} />
          </button>
        </div>
        <button 
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="p-3 bg-bd-green text-white rounded-full shadow-lg shadow-bd-green/20 hover:bg-bd-green/90 transition-all disabled:opacity-50 disabled:shadow-none"
        >
          <Send size={18} className={newMessage.trim() ? 'ml-0.5' : ''} />
        </button>
      </div>
    </div>
  );
};