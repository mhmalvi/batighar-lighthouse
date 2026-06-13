import React, { useState, useEffect } from 'react';
import { View, Festival, Language } from '../types';
import { NAV_ITEMS, CURRENT_USER, TRANSLATIONS } from '../constants';
import { Home, Store, HeartHandshake, Compass, UserCheck, MapPin, MessageCircle, Settings, X, Moon, Type, Wifi, Radio, CloudRain, Clock, PartyPopper, Globe, CalendarHeart, Zap, Star, Clapperboard, PlayCircle, Feather } from 'lucide-react';
import { MeenaWidget } from './MeenaWidget';
import { PonditWidget } from './PonditWidget';

interface LayoutProps {
  currentView: View;
  setView: (view: View) => void;
  children: React.ReactNode;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const IconMap: Record<string, React.FC<any>> = {
  'home': Home,
  'store': Store,
  'heart-handshake': HeartHandshake,
  'compass': Compass,
  'user-check': UserCheck,
  'map-pin': MapPin,
  'radio': Radio,
  'calendar-heart': CalendarHeart,
  'clapperboard': Clapperboard,
  'play-circle': PlayCircle,
};

export const Layout: React.FC<LayoutProps> = ({ currentView, setView, children, language, setLanguage }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showPondit, setShowPondit] = useState(false);
  
  // Theme States
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isGenZMode, setIsGenZMode] = useState(false);
  
  // Immersive Feature States
  const [isMonsoon, setIsMonsoon] = useState(false);
  const [is4PM, setIs4PM] = useState(false);
  const [currentFestival, setCurrentFestival] = useState<Festival>(Festival.NONE);

  const t = TRANSLATIONS[language];
  const banglaDate = language === 'EN' ? "12th Falgun, 1430" : "১২ই ফাল্গুন, ১৪৩০";

  // Toggle Dark Mode Class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Toggle Gen-Z Mode Class
  useEffect(() => {
    if (isGenZMode) {
      document.body.classList.add('gen-z-mode');
    } else {
      document.body.classList.remove('gen-z-mode');
    }
  }, [isGenZMode]);

  // Handle 4 PM Notification
  const [show4PMNotification, setShow4PMNotification] = useState(false);
  useEffect(() => {
    if (is4PM) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Audio play failed interaction", e));
      setShow4PMNotification(true);
    } else {
      setShow4PMNotification(false);
    }
  }, [is4PM]);

  // Provide context-like props
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { isMonsoon, is4PM, currentFestival } as any);
    }
    return child;
  });

  return (
    <div className={`min-h-screen flex flex-col bg-nakshi font-sans selection:bg-bd-green/20 relative overflow-hidden transition-colors duration-300`}>
      
      {/* Rain Overlay */}
      {isMonsoon && <div className="absolute inset-0 z-0 rain-overlay pointer-events-none h-full w-full fixed"></div>}

      {/* Premium Glass Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b shadow-sm transition-all duration-300 ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/70 border-white/50'}`}>
        <div className="max-w-3xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView(View.HOME)}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md transition-all group-hover:scale-105 ${isMonsoon ? 'bg-river-blue' : 'bg-bd-green'}`}>
              <span className="text-lg font-serif font-bold text-white">B</span>
            </div>
            <div>
              <h1 className={`text-xl font-serif font-bold tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.header.title}</h1>
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">{banglaDate}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Pondit Trigger */}
             <button 
                onClick={() => setShowPondit(!showPondit)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${showPondit ? 'bg-amber-100 text-amber-700' : 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'}`}
                title="Pondit (Poetry AI)"
             >
                <Feather size={18} />
             </button>

             <button onClick={() => setShowSettings(true)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <Settings size={20} />
             </button>
             <button onClick={() => setView(View.MESSAGES)} className="text-slate-400 hover:text-slate-600 transition-colors relative">
                <MessageCircle size={20} />
                {currentView !== View.MESSAGES && <span className="absolute top-0 right-0 w-2 h-2 bg-bd-red rounded-full ring-1 ring-white"></span>}
             </button>
             <div onClick={() => setView(View.PROFILE)} className="w-8 h-8 rounded-full ring-2 ring-white shadow-sm overflow-hidden cursor-pointer">
                <img src={CURRENT_USER.avatar} alt="Profile" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </header>

      {/* 4 PM Notification Toast */}
      {show4PMNotification && (
        <div 
           onClick={() => { setView(View.LIVE); setShow4PMNotification(false); }}
           className="fixed top-24 right-4 z-[45] bg-white/90 backdrop-blur-md rounded-2xl shadow-premium p-4 border border-amber-100 w-72 animate-in slide-in-from-right cursor-pointer hover:bg-white transition-colors"
        >
           <div className="flex items-center gap-4">
              <div className="bg-amber-50 p-3 rounded-full text-amber-600">
                 <Radio size={20} />
              </div>
              <div>
                 <h4 className="font-serif font-bold text-slate-800">{t.media.adda.title} ☕</h4>
                 <p className="text-xs text-slate-500 mt-0.5">{t.media.adda.descActive}</p>
              </div>
           </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 pt-4 pb-32 animate-fade-in relative z-10">
        {childrenWithProps}
      </main>

      {/* Floating Meena Widget - Positioned above Nav */}
      <MeenaWidget language={language} />

      {/* Pondit Widget - Triggered from Header */}
      {showPondit && <PonditWidget language={language} onClose={() => setShowPondit(false)} />}

      {/* Premium Floating Dock Navigation */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-lg z-40 px-2 pointer-events-none">
        <div className={`backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-full flex justify-between items-end px-2 py-2 pointer-events-auto ring-1 ring-white/20 transition-all duration-300 ${isDarkMode ? 'bg-slate-900/90 border border-slate-700/50' : 'bg-white/80 border border-white/50'}`}>
          {NAV_ITEMS.map((item) => {
            const Icon = IconMap[item.icon];
            const isActive = currentView === item.id;
            const isHome = item.id === View.HOME;
            
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`relative flex flex-col items-center justify-center transition-all duration-300 ease-out group
                  ${isHome ? 'w-16 h-16 -mb-5 bg-bd-green rounded-full shadow-[0_10px_20px_rgba(4,77,56,0.3)] hover:scale-110 z-20 ring-4 ring-white dark:ring-slate-900' : 'flex-1 h-12 rounded-full hover:bg-transparent'}
                `}
                aria-label={item.label}
              >
                {/* Circular Active Indicator Background (Non-Home) - Fixed Size Circle */}
                {!isHome && (
                  <div 
                    className={`absolute w-10 h-10 rounded-full transition-all duration-300 ease-out flex items-center justify-center ${
                      isActive 
                        ? 'bg-bd-green/10 opacity-100 shadow-[0_0_0_1px_rgba(4,77,56,0.05)]' 
                        : 'opacity-0 scale-50'
                    }`}
                  ></div>
                )}

                {/* Icon Wrapper */}
                <div 
                   className={`relative z-10 transition-all duration-300 ease-out flex flex-col items-center justify-center 
                   ${isActive && !isHome ? 'transform scale-110' : ''}
                   ${isHome ? 'text-white' : ''}
                   `}
                >
                   {/* Home Specific Effects */}
                   {isHome && (
                     <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                   )}
                   
                   <Icon 
                      size={isHome ? 28 : 22} 
                      className={`transition-all duration-300 
                        ${isHome 
                           ? 'text-white fill-white/20' 
                           : isActive 
                              ? 'text-bd-green fill-bd-green/20' 
                              : isDarkMode 
                                 ? 'text-slate-400' 
                                 : 'text-slate-400 group-hover:text-slate-600'
                        }`} 
                      strokeWidth={isActive ? 2.5 : 2} 
                    />
                </div>
                
                {/* Active Dot Indicator (Non-Home) */}
                {!isHome && (
                   <span className={`absolute -bottom-1 w-1 h-1 rounded-full transition-all duration-300 ease-out ${isActive ? 'bg-bd-green scale-100 opacity-100' : 'scale-0 opacity-0'}`}></span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-6">
          <div className={`rounded-[2rem] w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 border overflow-hidden ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-white/50'}`}>
             <div className="flex justify-between items-center mb-8">
                <h3 className={`text-2xl font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t.settings.title}</h3>
                <button onClick={() => setShowSettings(false)} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-50 text-slate-400'}`}>
                   <X size={20} />
                </button>
             </div>
             
             <div className="space-y-6">
                {/* Language */}
                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                     <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-slate-500">
                           <Globe size={18} />
                           <span className="text-sm font-bold tracking-wide">{t.settings.lang}</span>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-2">
                        <button 
                           onClick={() => setLanguage('EN')} 
                           className={`py-2 rounded-xl text-xs font-bold transition-all ${language === 'EN' ? 'bg-white shadow-sm text-bd-green ring-1 ring-bd-green/20' : 'text-slate-400 hover:bg-white/50'}`}
                        >
                           English
                        </button>
                        <button 
                           onClick={() => setLanguage('BN')} 
                           className={`py-2 rounded-xl text-xs font-bold transition-all ${language === 'BN' ? 'bg-white shadow-sm text-bd-green ring-1 ring-bd-green/20' : 'text-slate-400 hover:bg-white/50'}`}
                        >
                           বাংলা
                        </button>
                     </div>
                  </div>

                {/* Theme Toggles */}
                 <div className="space-y-3">
                   {/* Dark Mode */}
                  <button onClick={() => setIsDarkMode(!isDarkMode)} className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${isDarkMode ? 'bg-slate-800 border-slate-600 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
                     <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${isDarkMode ? 'bg-slate-700 text-purple-400' : 'bg-slate-100 text-slate-400'}`}><Moon size={18} /></div>
                        <span className={`text-sm font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-600'}`}>{t.settings.darkMode}</span>
                     </div>
                     <div className={`w-10 h-5 rounded-full relative transition-colors ${isDarkMode ? 'bg-purple-500' : 'bg-slate-200'}`}>
                        <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all shadow-sm ${isDarkMode ? 'left-6' : 'left-1'}`}></div>
                     </div>
                  </button>

                  {/* Gen-Z Mode */}
                  <button onClick={() => setIsGenZMode(!isGenZMode)} className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${isGenZMode ? 'bg-neon-lime/10 border-neon-lime shadow-sm' : (isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 hover:border-slate-200')}`}>
                     <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${isGenZMode ? 'bg-neon-lime text-black' : (isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-400')}`}><Zap size={18} /></div>
                        <span className={`text-sm font-bold ${isGenZMode ? 'text-black dark:text-white' : (isDarkMode ? 'text-slate-200' : 'text-slate-600')}`}>{t.settings.genzMode}</span>
                     </div>
                     <div className={`w-10 h-5 rounded-full relative transition-colors ${isGenZMode ? 'bg-neon-lime' : (isDarkMode ? 'bg-slate-600' : 'bg-slate-200')}`}>
                        <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all shadow-sm ${isGenZMode ? 'left-6' : 'left-1'}`}></div>
                     </div>
                  </button>
                 </div>

                {/* Cultural Toggles */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t.settings.dev}</h4>
                  
                  <button onClick={() => setIsMonsoon(!isMonsoon)} className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${isMonsoon ? 'bg-blue-50 border-blue-200 shadow-sm' : (isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 hover:border-slate-200')}`}>
                     <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${isMonsoon ? 'bg-blue-100 text-blue-600' : (isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-400')}`}><CloudRain size={18} /></div>
                        <span className={`text-sm font-bold ${isMonsoon ? 'text-blue-900' : (isDarkMode ? 'text-slate-200' : 'text-slate-600')}`}>{t.settings.monsoon}</span>
                     </div>
                     <div className={`w-10 h-5 rounded-full relative transition-colors ${isMonsoon ? 'bg-blue-500' : (isDarkMode ? 'bg-slate-600' : 'bg-slate-200')}`}>
                        <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all shadow-sm ${isMonsoon ? 'left-6' : 'left-1'}`}></div>
                     </div>
                  </button>

                  <button onClick={() => setIs4PM(!is4PM)} className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${is4PM ? 'bg-amber-50 border-amber-200 shadow-sm' : (isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 hover:border-slate-200')}`}>
                     <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${is4PM ? 'bg-amber-100 text-amber-600' : (isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-400')}`}><Clock size={18} /></div>
                        <span className={`text-sm font-bold ${is4PM ? 'text-amber-900' : (isDarkMode ? 'text-slate-200' : 'text-slate-600')}`}>{t.settings.time4pm}</span>
                     </div>
                     <div className={`w-10 h-5 rounded-full relative transition-colors ${is4PM ? 'bg-amber-500' : (isDarkMode ? 'bg-slate-600' : 'bg-slate-200')}`}>
                        <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all shadow-sm ${is4PM ? 'left-6' : 'left-1'}`}></div>
                     </div>
                  </button>
                </div>
             </div>
             
             <button className="w-full mt-8 py-4 text-slate-400 font-bold text-xs hover:text-red-500 transition-colors uppercase tracking-widest">
               {t.settings.logout}
             </button>
          </div>
        </div>
      )}
    </div>
  );
};