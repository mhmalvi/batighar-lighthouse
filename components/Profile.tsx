
import React, { useState } from 'react';
import { CURRENT_USER, EMOTION_ICONS, EMOTION_COLORS, SAMPLE_POSTS, FAMILY_MEMBERS, TRANSLATIONS, SEASON_STYLES } from '../constants';
import { MapPin, Calendar, Award, Edit3, Settings, Activity, Users, Plus, Wind, Sun, Zap, Share2, Palette, Image as ImageIcon, Check } from 'lucide-react';
import { Post, Emotion, Language, Season } from '../types';

interface ProfileProps {
   language: Language;
}

export const Profile: React.FC<ProfileProps> = ({ language }) => {
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>(CURRENT_USER.currentEmotion);
  const [currentEmotionNote, setCurrentEmotionNote] = useState(CURRENT_USER.currentEmotionNote || '');
  const [isEditingEmotion, setIsEditingEmotion] = useState(false);
  const [theme, setTheme] = useState<Season>(CURRENT_USER.theme || Season.DEFAULT);
  const [coverImage, setCoverImage] = useState(CURRENT_USER.coverImage);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [tempCoverUrl, setTempCoverUrl] = useState('');
  
  const t = TRANSLATIONS[language];

  const getEmotionVisual = (emotion: Emotion) => {
     switch (emotion) {
        case Emotion.RAINY: return <div className="absolute inset-0 rain-overlay opacity-50"></div>;
        case Emotion.SUNNY: return <div className="absolute top-4 right-4 animate-spin-slow opacity-30"><Sun size={100} /></div>;
        case Emotion.STORMY: return <div className="absolute top-10 left-10 animate-pulse opacity-30"><Zap size={80} /></div>;
        case Emotion.NOSTALGIC: return <div className="absolute inset-0 bg-sepia opacity-30"></div>;
        default: return null;
     }
  };

  const handleThemeChange = (selectedTheme: Season) => {
     setTheme(selectedTheme);
  };

  const handleCoverUpdate = () => {
     if (tempCoverUrl) {
        setCoverImage(tempCoverUrl);
        setTempCoverUrl('');
     }
  };

  return (
    <div className="space-y-6">
      {/* Customization Panel */}
      {isCustomizing && (
         <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 animate-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-lg">{t.profile.edit}</h3>
               <button onClick={() => setIsCustomizing(false)} className="text-slate-400 hover:text-slate-600"><Settings size={20} /></button>
            </div>
            
            <div className="space-y-6">
               <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">{t.profile.theme}</label>
                  <div className="flex flex-wrap gap-2">
                     {Object.values(Season).map(s => (
                        <button
                           key={s}
                           onClick={() => handleThemeChange(s)}
                           className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${theme === s ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-800'}`}
                        >
                           {s}
                        </button>
                     ))}
                  </div>
               </div>
               
               <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">{t.profile.cover}</label>
                  <div className="flex gap-2">
                     <input 
                        type="text" 
                        value={tempCoverUrl}
                        onChange={(e) => setTempCoverUrl(e.target.value)}
                        placeholder="https://..."
                        className="flex-1 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-bd-green"
                     />
                     <button onClick={handleCoverUpdate} className="bg-bd-green text-white p-2 rounded-xl">
                        <Check size={20} />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* Profile Header */}
      <div className="bg-white rounded-[2rem] shadow-soft overflow-hidden border border-gray-100 relative group transition-all duration-500">
        <div className={`h-64 relative transition-all duration-1000 bg-gradient-to-br ${SEASON_STYLES[theme]} overflow-hidden`}>
           <img src={coverImage} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" alt="Cover" />
           {getEmotionVisual(currentEmotion)}
           
           {/* Customization Toggle */}
           <div className="absolute top-6 right-6 flex gap-3 z-20">
             <button onClick={() => setIsCustomizing(!isCustomizing)} className="bg-white/20 backdrop-blur-md text-white p-2.5 rounded-full hover:bg-white/30 transition-colors">
               <Palette size={20} />
             </button>
           </div>

           <div className="absolute bottom-6 right-6 z-20">
              <button 
                 onClick={() => setIsEditingEmotion(!isEditingEmotion)}
                 className="bg-white/20 backdrop-blur-md border border-white/40 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center hover:bg-white/30 transition-all"
              >
                 <Activity size={16} className="mr-2" /> 
                 {isEditingEmotion ? t.profile.close : t.profile.setMood}
              </button>
           </div>
        </div>
        
        {isEditingEmotion && (
           <div className="bg-slate-50 border-b border-slate-100 p-6 animate-in slide-in-from-top-2">
              <p className="text-xs font-bold text-slate-500 uppercase mb-3">{t.profile.howMood}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                 {Object.values(Emotion).map(emotion => (
                    <button
                       key={emotion}
                       onClick={() => setCurrentEmotion(emotion)}
                       className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${currentEmotion === emotion ? 'bg-bd-green text-white border-bd-green shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-bd-green'}`}
                    >
                       <span>{EMOTION_ICONS[emotion]}</span> {emotion.split(' ')[0]}
                    </button>
                 ))}
              </div>
              
              <div className="space-y-3">
                 <input 
                    type="text" 
                    value={currentEmotionNote}
                    onChange={(e) => setCurrentEmotionNote(e.target.value)}
                    placeholder={t.profile.privateNote}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-bd-green"
                 />
                 <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
                       <input type="checkbox" className="rounded text-bd-green focus:ring-bd-green" /> {t.profile.keepPrivate}
                    </label>
                    <button 
                       onClick={() => setIsEditingEmotion(false)}
                       className="bg-bd-green text-white px-4 py-1.5 rounded-lg text-xs font-bold"
                    >
                       Update
                    </button>
                 </div>
              </div>
           </div>
        )}

        <div className="px-6 pb-8 relative">
          <div className="flex justify-between items-end -mt-16 mb-5 relative z-10">
             <img 
               src={CURRENT_USER.avatar} 
               alt="Avatar" 
               className="w-32 h-32 rounded-full border-4 border-white shadow-premium object-cover" 
             />
             <button className="bg-slate-50 hover:bg-slate-100 text-slate-700 px-5 py-2.5 rounded-full text-xs font-bold border border-slate-200 transition-colors flex items-center shadow-sm">
               <Edit3 size={16} className="mr-2" /> {t.profile.edit}
             </button>
          </div>

          <div>
             <h2 className="text-3xl font-bold text-slate-900 font-serif">{CURRENT_USER.banglaName}</h2>
             <p className="text-slate-500 text-sm font-medium mb-3">{CURRENT_USER.name} • {CURRENT_USER.handle}</p>
             <p className="text-slate-700 leading-relaxed text-sm mb-6 max-w-lg">{CURRENT_USER.bio}</p>
             
             <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 mb-8">
                <span className="flex items-center gap-1.5"><MapPin size={16} className="text-bd-green" /> {CURRENT_USER.hometown}</span>
                <span className="flex items-center gap-1.5"><Calendar size={16} className="text-bd-green" /> Joined Boishakh 1428</span>
             </div>

             <div className="flex gap-10 border-t border-b border-slate-50 py-5 mb-8">
                <div className="text-center">
                   <div className="font-bold text-xl text-slate-900">{CURRENT_USER.stats.posts}</div>
                   <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{t.profile.posts}</div>
                </div>
                <div className="text-center">
                   <div className="font-bold text-xl text-slate-900">{CURRENT_USER.stats.followers}</div>
                   <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{t.profile.followers}</div>
                </div>
                <div className="text-center">
                   <div className="font-bold text-xl text-slate-900">{CURRENT_USER.stats.following}</div>
                   <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{t.profile.following}</div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               {/* Mood Card */}
               <div className={`p-5 rounded-2xl border ${EMOTION_COLORS[currentEmotion]} bg-opacity-5 relative overflow-hidden`}>
                 <div className="relative z-10">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60 flex items-center gap-2">
                      <Wind size={12} /> {t.profile.mood}
                    </h3>
                    <div className="flex items-baseline gap-2">
                       <span className="font-bold text-lg">{currentEmotion}</span>
                       <span className="text-2xl">{EMOTION_ICONS[currentEmotion]}</span>
                    </div>
                    {currentEmotionNote && (
                       <p className="mt-2 text-xs italic opacity-80 border-t border-current/20 pt-2">"{currentEmotionNote}"</p>
                    )}
                 </div>
               </div>

               {/* Badge System */}
               <div className="p-5 rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest mb-3 text-orange-800/70 flex items-center gap-2">
                     <Award size={14} /> {t.profile.badges}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                     {CURRENT_USER.badges.map(badge => (
                        <div key={badge} className="bg-white text-orange-700 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm border border-orange-100 flex items-center gap-1">
                           <Award size={12} className="text-orange-500" /> {badge}
                        </div>
                     ))}
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Family Connections */}
      <div className="bg-white rounded-[2rem] shadow-soft p-6 border border-gray-100">
         <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg font-serif">
               <Users size={20} className="text-bd-green" /> {t.profile.family}
            </h3>
            <button className="bg-slate-50 text-bd-green p-2 hover:bg-green-50 rounded-full transition-colors">
               <Plus size={18} />
            </button>
         </div>
         <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar">
            {FAMILY_MEMBERS.map(member => (
               <div key={member.id} className="flex flex-col items-center min-w-[90px] group cursor-pointer">
                  <div className="relative">
                     <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover group-hover:scale-105 transition-transform" />
                     <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                        <Users size={10} className="text-bd-green" />
                     </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900 mt-2 text-center leading-tight">{member.name}</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">{member.relation}</span>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};
