
import React from 'react';
import { EXPLORE_CATEGORIES, HASHTAGS, TRANSLATIONS } from '../constants';
import { Search, TrendingUp, BookOpen, Music, Utensils, Landmark, ArrowRight, Gamepad2, Camera } from 'lucide-react';
import { Language, View } from '../types';

interface ExploreProps {
  onGameClick?: () => void;
  onGalleryClick?: () => void;
  language: Language;
}

const IconMap: Record<string, React.FC<any>> = {
  'book-open': BookOpen,
  'music': Music,
  'utensils': Utensils,
  'landmark': Landmark,
};

export const Explore: React.FC<ExploreProps> = ({ onGameClick, onGalleryClick, language }) => {
  const t = TRANSLATIONS[language];
  
  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="relative">
         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
         </div>
         <input 
            type="text" 
            placeholder={language === 'EN' ? "Search literature, music, recipes..." : "সাহিত্য, সঙ্গীত, রেসিপি খুঁজুন..."} 
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-bd-green/20 focus:border-bd-green transition-all"
         />
      </div>

      {/* Quick Links Row */}
      <div className="grid grid-cols-2 gap-3">
        <div 
          onClick={onGameClick}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg shadow-purple-200 flex flex-col justify-between cursor-pointer transform transition-transform hover:scale-[1.02] h-32"
        >
           <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm self-start">
              <Gamepad2 size={24} />
           </div>
           <div>
              <h3 className="font-bold text-lg leading-none mb-1">{language === 'EN' ? 'Deshi Games' : 'দেশি গেমস'}</h3>
              <p className="text-[10px] text-purple-100 opacity-90">{language === 'EN' ? 'Play Ludu, Carrom' : 'লুডু, ক্যারাম খেলুন'}</p>
           </div>
        </div>

        <div 
          onClick={onGalleryClick}
          className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg shadow-teal-200 flex flex-col justify-between cursor-pointer transform transition-transform hover:scale-[1.02] h-32"
        >
           <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm self-start">
              <Camera size={24} />
           </div>
           <div>
              <h3 className="font-bold text-lg leading-none mb-1">{language === 'EN' ? 'Chhobir Ghor' : 'ছবির ঘর'}</h3>
              <p className="text-[10px] text-teal-100 opacity-90">{language === 'EN' ? 'Photo Gallery' : 'ফটো গ্যালারি'}</p>
           </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-3">
         {EXPLORE_CATEGORIES.map(cat => {
            const Icon = IconMap[cat.icon];
            return (
               <div key={cat.id} className={`p-4 rounded-2xl relative overflow-hidden group cursor-pointer ${cat.color} bg-opacity-30 border border-white/50 shadow-sm hover:shadow-md transition-all`}>
                  <div className="relative z-10">
                     <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm ${cat.color.split(' ')[1]}`}>
                        <Icon size={20} />
                     </div>
                     <h3 className="font-bold text-lg leading-none">{language === 'EN' ? cat.label : cat.banglaLabel}</h3>
                     <p className="text-xs opacity-70 mt-1 uppercase tracking-wider">{language === 'EN' ? cat.banglaLabel : cat.label}</p>
                  </div>
                  <img src={cat.image} className="absolute bottom-0 right-0 w-24 h-24 object-cover opacity-20 rounded-tl-3xl translate-x-4 translate-y-4 group-hover:scale-110 transition-transform" alt={cat.label} />
               </div>
            );
         })}
      </div>

      {/* Trending Section */}
      <div className="bg-white rounded-2xl shadow-soft p-5 border border-gray-100">
         <div className="flex items-center gap-2 mb-4 text-bd-red">
            <TrendingUp size={20} />
            <h3 className="font-bold text-gray-900 text-lg">{language === 'EN' ? 'Trending in Bangladesh' : 'বাংলাদেশে ট্রেন্ডিং'}</h3>
         </div>
         <div className="space-y-4">
            {HASHTAGS.map((hash, idx) => (
               <div key={hash.id} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                     <span className="text-lg font-bold text-gray-300 w-4">{idx + 1}</span>
                     <div>
                        <p className="font-bold text-slate-800 group-hover:text-bd-green transition-colors">{hash.tag}</p>
                        <p className="text-xs text-gray-500">{hash.label} • 12k Posts</p>
                     </div>
                  </div>
                  <button className="text-gray-300 group-hover:text-bd-green transition-colors">
                     <ArrowRight size={18} />
                  </button>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};
