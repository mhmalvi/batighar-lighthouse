import React, { useState } from 'react';
import { REELS_DATA, TRANSLATIONS } from '../constants';
import { Heart, MessageCircle, Share2, Music2, Plus } from 'lucide-react';
import { Language } from '../types';

interface ReelsProps {
  language: Language;
}

export const Reels: React.FC<ReelsProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [activeReelIndex, setActiveReelIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight } = e.currentTarget;
    const index = Math.round(scrollTop / clientHeight);
    if (index !== activeReelIndex) {
      setActiveReelIndex(index);
    }
  };

  return (
    <div className="fixed inset-0 top-16 bottom-20 bg-black z-0 overflow-y-scroll snap-y snap-mandatory no-scrollbar" onScroll={handleScroll}>
      {REELS_DATA.map((reel) => (
        <div key={reel.id} className="relative w-full h-full snap-start flex items-center justify-center bg-gray-900">
           {/* Video Placeholder (Using Image) */}
           <div className="absolute inset-0">
             <img src={reel.videoUrl} alt="Reel" className="w-full h-full object-cover opacity-80" />
             <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
           </div>

           {/* Right Actions */}
           <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6 z-20">
              <div className="relative mb-2">
                 <img src={`https://ui-avatars.com/api/?name=${reel.author.substring(1)}&background=random`} className="w-12 h-12 rounded-full border-2 border-white shadow-lg" alt="Author" />
                 <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-bd-red text-white rounded-full p-0.5 border border-white">
                    <Plus size={12} />
                 </div>
              </div>
              
              <div className="flex flex-col items-center gap-1">
                 <button className="p-2.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all active:scale-90">
                    <Heart size={28} className="text-white fill-white/10" />
                 </button>
                 <span className="text-white text-xs font-bold drop-shadow-md">{reel.likes}</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                 <button className="p-2.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all active:scale-90">
                    <MessageCircle size={28} className="text-white" />
                 </button>
                 <span className="text-white text-xs font-bold drop-shadow-md">{reel.comments}</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                 <button className="p-2.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all active:scale-90">
                    <Share2 size={28} className="text-white" />
                 </button>
                 <span className="text-white text-xs font-bold drop-shadow-md">{reel.shares}</span>
              </div>
           </div>

           {/* Bottom Content */}
           <div className="absolute bottom-8 left-4 right-20 z-20 text-white text-left">
              <div className="flex items-center gap-2 mb-3">
                 <h3 className="font-bold text-shadow-sm text-lg">{reel.author}</h3>
                 <button className="text-[10px] border border-white/60 px-2 py-0.5 rounded-full font-bold backdrop-blur-sm hover:bg-white/20 transition-colors">Follow</button>
              </div>
              <p className="text-sm mb-4 leading-snug text-shadow-sm font-medium">{reel.description}</p>
              
              <div className="flex items-center gap-2 opacity-90 bg-white/10 self-start px-3 py-1.5 rounded-full backdrop-blur-sm max-w-max">
                 <Music2 size={14} className="animate-spin-slow" />
                 <div className="text-xs font-medium overflow-hidden">
                    <span>{reel.song}</span>
                 </div>
              </div>
           </div>
        </div>
      ))}
    </div>
  );
};