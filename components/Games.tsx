import React from 'react';
import { GAMES } from '../constants';
import { Gamepad2, Play, Trophy, Users } from 'lucide-react';
import { Language } from '../types';

interface GamesProps {
   language: Language;
}

export const Games: React.FC<GamesProps> = ({ language }) => {
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold text-slate-900">{language === 'EN' ? 'Deshi Games' : 'দেশি গেমস'}</h2>
          <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold flex items-center">
             <Trophy size={14} className="mr-1" /> 1200 Pts
          </div>
       </div>

       {/* Featured Game */}
       <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md group cursor-pointer">
          <img src="https://picsum.photos/seed/cricket/800/450" className="w-full h-full object-cover" alt="Cricket" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
             <span className="bg-bd-green text-white text-[10px] font-bold px-2 py-1 rounded self-start mb-2">{language === 'EN' ? 'TRENDING' : 'ট্রেন্ডিং'}</span>
             <h3 className="text-white text-xl font-bold mb-1">Gali Cricket League</h3>
             <p className="text-gray-200 text-xs mb-3">{language === 'EN' ? 'Compete with friends in your neighborhood.' : 'আপনার পাড়ার বন্ধুদের সাথে প্রতিযোগিতা করুন।'}</p>
             <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-xs font-bold self-start flex items-center hover:bg-gray-100 transition-colors">
                <Play size={14} className="mr-2 fill-current" /> {language === 'EN' ? 'Play Now' : 'খেলুন'}
             </button>
          </div>
       </div>

       {/* Game Grid */}
       <h3 className="font-bold text-gray-800 flex items-center">
          <Gamepad2 size={18} className="mr-2 text-bd-green" /> {language === 'EN' ? 'All Games' : 'সব গেম'}
       </h3>
       <div className="grid grid-cols-2 gap-4">
          {GAMES.map(game => (
             <div key={game.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
                <div className="aspect-square bg-gray-100 relative">
                   <img src={game.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={game.title} />
                   <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                      {game.category}
                   </div>
                </div>
                <div className="p-3">
                   <h4 className="font-bold text-gray-900 text-sm leading-tight mb-0.5">{language === 'EN' ? game.title : game.banglaTitle}</h4>
                   <p className="text-xs text-gray-500 mb-2">{language === 'EN' ? game.banglaTitle : game.title}</p>
                   <div className="flex items-center text-[10px] text-gray-400">
                      <Users size={12} className="mr-1" /> {game.players}
                   </div>
                   <button className="w-full mt-3 border border-gray-200 text-gray-600 text-[10px] font-bold py-1.5 rounded hover:bg-bd-green hover:text-white hover:border-bd-green transition-colors">
                      {language === 'EN' ? 'Play' : 'খেলুন'}
                   </button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};