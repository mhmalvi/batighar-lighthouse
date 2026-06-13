import React, { useState } from 'react';
import { Radio, Users, MessageCircle, Play, Film, Mic2, Pause, Coffee } from 'lucide-react';
import { RADIO_STATIONS, VIDEOS, TRANSLATIONS } from '../constants';
import { Language } from '../types';

type MediaTab = 'LIVE' | 'RADIO' | 'VIDEO';

interface LiveStreamProps {
   is4PM?: boolean;
   language: Language;
}

export const LiveStream: React.FC<LiveStreamProps> = ({ is4PM, language }) => {
  const [activeTab, setActiveTab] = useState<MediaTab>('LIVE');
  const [playingStation, setPlayingStation] = useState<string | null>(null);
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-6">
       {/* Tabs */}
       <div className="flex bg-white rounded-xl p-1.5 shadow-sm border border-gray-100">
          <button 
             onClick={() => setActiveTab('LIVE')}
             className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'LIVE' ? 'bg-bd-red text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
          >
             <Mic2 size={16} /> {t.media.tabs.live}
          </button>
          <button 
             onClick={() => setActiveTab('RADIO')}
             className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'RADIO' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
          >
             <Radio size={16} /> {t.media.tabs.radio}
          </button>
          <button 
             onClick={() => setActiveTab('VIDEO')}
             className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'VIDEO' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
          >
             <Film size={16} /> {t.media.tabs.video}
          </button>
       </div>

       {activeTab === 'LIVE' && (
         <div className="space-y-6 animate-in fade-in">
             
             {/* Cha-er Adda Card - Dynamic based on time */}
             <div className={`border rounded-xl p-6 relative overflow-hidden transition-all duration-500 ${is4PM ? 'bg-amber-100 border-amber-300 shadow-lg scale-[1.02]' : 'bg-amber-50 border-amber-100'}`}>
                {is4PM && (
                   <div className="absolute top-0 right-0 p-4 animate-pulse">
                      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">Live Now</span>
                   </div>
                )}
                <div className="flex items-start justify-between relative z-10">
                   <div>
                      <div className="flex items-center gap-2 mb-2">
                         <div className={`p-2 rounded-full ${is4PM ? 'bg-amber-600 text-white animate-bounce' : 'bg-amber-200 text-amber-700'}`}>
                            <Coffee size={24} />
                         </div>
                         <h3 className={`font-bold text-lg ${is4PM ? 'text-amber-900' : 'text-amber-800/70'}`}>{t.media.adda.title}</h3>
                      </div>
                      
                      <p className={`text-sm mb-4 max-w-xs ${is4PM ? 'text-amber-900 font-medium' : 'text-amber-700/70'}`}>
                         {is4PM ? t.media.adda.descActive : t.media.adda.desc}
                      </p>
                      
                      <div className="bg-white/60 rounded-lg p-3 mb-4 backdrop-blur-sm">
                         <p className="text-[10px] font-bold text-amber-500 uppercase mb-1">{t.media.adda.topic}</p>
                         <p className="text-sm font-serif text-amber-900">"Is Dhaka losing its neighborhood culture?"</p>
                      </div>

                      <button className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm ${is4PM ? 'bg-amber-700 text-white hover:bg-amber-800' : 'bg-amber-200 text-amber-700 hover:bg-amber-300'}`}>
                        {is4PM ? t.media.adda.btnJoin : t.media.adda.btnSet}
                      </button>
                   </div>
                   <div className="text-9xl opacity-10 absolute -right-6 -bottom-6 rotate-12 pointer-events-none">☕</div>
                </div>
             </div>

             {/* Featured Live */}
             <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-md group cursor-pointer">
                <img 
                  src="https://picsum.photos/seed/baul/800/450" 
                  alt="Baul Singing" 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity"
                />
                <div className="absolute top-4 left-4 bg-bd-red text-white text-xs font-bold px-2 py-1 rounded flex items-center animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full mr-2"></span> LIVE
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6">
                  <h2 className="text-white font-bold text-xl">Baul Shondha: Songs of the Soul</h2>
                  <p className="text-gray-300 text-sm mt-1">Streaming from Kushtia Akhrabari</p>
                  <div className="flex items-center mt-3 text-white/80 text-xs space-x-4">
                     <span className="flex items-center"><Users size={12} className="mr-1" /> 1.2k listening</span>
                     <span className="flex items-center"><MessageCircle size={12} className="mr-1" /> Active Chat</span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                   </div>
                </div>
             </div>
         </div>
       )}

       {activeTab === 'RADIO' && (
          <div className="space-y-4 animate-in fade-in">
             <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-800">{t.media.radioTitle}</h3>
                <span className="text-xs text-bd-green font-bold bg-green-50 px-2 py-1 rounded-full">3 Live</span>
             </div>
             {RADIO_STATIONS.map((station) => (
                <div key={station.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                   <div className="relative">
                      <img src={station.image} alt={station.name} className="w-16 h-16 rounded-lg object-cover" />
                      <button 
                        onClick={() => setPlayingStation(playingStation === station.id ? null : station.id)}
                        className="absolute inset-0 bg-black/30 flex items-center justify-center text-white rounded-lg opacity-0 hover:opacity-100 transition-opacity"
                      >
                         {playingStation === station.id ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                      </button>
                   </div>
                   <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{station.name}</h4>
                      <p className="text-xs text-gray-500 mb-1">{station.frequency}</p>
                      <div className="flex items-center gap-2">
                         <div className="flex space-x-0.5 h-3 items-end">
                            <div className="w-1 bg-bd-green h-2 animate-pulse"></div>
                            <div className="w-1 bg-bd-green h-3 animate-pulse delay-75"></div>
                            <div className="w-1 bg-bd-green h-1 animate-pulse delay-150"></div>
                         </div>
                         <p className="text-xs text-bd-green font-medium truncate w-32">{station.currentTrack}</p>
                      </div>
                   </div>
                   <div className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">
                      {station.listeners}
                   </div>
                </div>
             ))}
          </div>
       )}

       {activeTab === 'VIDEO' && (
          <div className="space-y-4 animate-in fade-in">
             <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-800">{t.media.cinemaTitle}</h3>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VIDEOS.map((video) => (
                   <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group">
                      <div className="relative aspect-video">
                         <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                         <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            {video.duration}
                         </div>
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                            <div className="bg-white/90 p-3 rounded-full shadow-lg">
                               <Play size={20} className="ml-1 text-gray-900" fill="currentColor" />
                            </div>
                         </div>
                      </div>
                      <div className="p-3">
                         <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded mb-1 inline-block">{video.category}</span>
                         <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{video.title}</h4>
                         <p className="text-xs text-gray-500 mt-1">{video.views} views</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       )}
    </div>
  );
};