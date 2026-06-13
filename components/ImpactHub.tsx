import React, { useState } from 'react';
import { IMPACT_REQUESTS_EN, IMPACT_REQUESTS_BN, TRANSLATIONS } from '../constants';
import { AlertTriangle, Droplet, MapPin, CheckCircle, BookOpen, Heart, Leaf, CloudSun, ArrowRight } from 'lucide-react';
import { Language } from '../types';

type Tab = 'EMERGENCY' | 'EDUCATION' | 'GREEN' | 'WELLBEING';

interface ImpactHubProps {
   language: Language;
}

export const ImpactHub: React.FC<ImpactHubProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<Tab>('EMERGENCY');
  const t = TRANSLATIONS[language];
  
  // Choose correct data based on language
  const impactRequests = language === 'BN' ? IMPACT_REQUESTS_BN : IMPACT_REQUESTS_EN;

  return (
    <div className="space-y-6">
      {/* Header Banner - Premium Gradient */}
      <div className="bg-gradient-to-br from-bd-green to-[#022c22] p-8 rounded-[2rem] text-white shadow-premium relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-serif font-bold mb-2">{t.impact.title}</h2>
          <p className="text-emerald-100/80 text-sm max-w-xs leading-relaxed">{t.impact.subtitle}</p>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl"></div>
        <Heart size={140} className="absolute -bottom-6 -right-6 text-white/5 rotate-12" />
      </div>

      {/* Scrollable Tabs - Improved Layout to prevent cutoff */}
      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
         <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x pr-16 mask-linear-fade">
            <button 
               onClick={() => setActiveTab('EMERGENCY')}
               className={`snap-center flex-shrink-0 px-5 py-3 rounded-2xl text-sm font-bold transition-all border ${
                  activeTab === 'EMERGENCY' 
                  ? 'bg-rose-50 border-rose-200 text-rose-700 shadow-sm ring-2 ring-rose-100' 
                  : 'bg-white border-transparent text-slate-400 hover:bg-slate-50'
               }`}
            >
               <div className="flex items-center gap-2">
                  <AlertTriangle size={18} className={activeTab === 'EMERGENCY' ? 'fill-current' : ''} /> 
                  {t.impact.tabs.emergency}
               </div>
            </button>
            <button 
               onClick={() => setActiveTab('EDUCATION')}
               className={`snap-center flex-shrink-0 px-5 py-3 rounded-2xl text-sm font-bold transition-all border ${
                  activeTab === 'EDUCATION' 
                  ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm ring-2 ring-blue-100' 
                  : 'bg-white border-transparent text-slate-400 hover:bg-slate-50'
               }`}
            >
               <div className="flex items-center gap-2">
                  <BookOpen size={18} className={activeTab === 'EDUCATION' ? 'fill-current' : ''} /> 
                  {t.impact.tabs.education}
               </div>
            </button>
            <button 
               onClick={() => setActiveTab('GREEN')}
               className={`snap-center flex-shrink-0 px-5 py-3 rounded-2xl text-sm font-bold transition-all border ${
                  activeTab === 'GREEN' 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm ring-2 ring-emerald-100' 
                  : 'bg-white border-transparent text-slate-400 hover:bg-slate-50'
               }`}
            >
               <div className="flex items-center gap-2">
                  <Leaf size={18} className={activeTab === 'GREEN' ? 'fill-current' : ''} /> 
                  {t.impact.tabs.green}
               </div>
            </button>
            <button 
               onClick={() => setActiveTab('WELLBEING')}
               className={`snap-center flex-shrink-0 px-5 py-3 rounded-2xl text-sm font-bold transition-all border ${
                  activeTab === 'WELLBEING' 
                  ? 'bg-purple-50 border-purple-200 text-purple-700 shadow-sm ring-2 ring-purple-100' 
                  : 'bg-white border-transparent text-slate-400 hover:bg-slate-50'
               }`}
            >
               <div className="flex items-center gap-2">
                  <CloudSun size={18} className={activeTab === 'WELLBEING' ? 'fill-current' : ''} /> 
                  {t.impact.tabs.wellbeing}
               </div>
            </button>
            {/* Spacer to ensure last item is visible behind gradient */}
            <div className="w-8 flex-shrink-0"></div>
         </div>
         {/* Fade effects for scroll indication - Right Side */}
         <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#fafaf9] to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Tab Content */}
      <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Emergency Tab */}
        {activeTab === 'EMERGENCY' && (
          <>
            <div className="bg-white border border-rose-100 rounded-3xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group">
              <div className="p-4 bg-rose-50 rounded-2xl text-rose-600 group-hover:scale-110 transition-transform">
                 <Droplet size={24} />
              </div>
              <div className="flex-1">
                 <h3 className="font-bold text-slate-900">{t.impact.donor.title}</h3>
                 <p className="text-xs text-slate-500 mt-1">3 {t.impact.donor.desc}</p>
              </div>
              <button className="bg-rose-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-rose-200 hover:bg-rose-700 transition-colors">
                 {t.impact.donor.btn}
              </button>
            </div>
            
            <div className="flex items-center gap-2 mt-2">
               <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
               <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">{t.impact.alerts}</h3>
            </div>

            {impactRequests.map((req) => (
              <div key={req.id} className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100 relative group transition-transform hover:-translate-y-1">
                <div className={`absolute top-5 right-5 text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wide uppercase ${
                  req.urgency === 'HIGH' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {req.urgency} {t.impact.priority}
                </div>
                
                <div className="flex items-start space-x-5">
                  <div className={`mt-1 p-3 rounded-2xl ${req.type === 'BLOOD' ? 'bg-rose-50 text-rose-500' : 'bg-orange-50 text-orange-500'}`}>
                    {req.type === 'BLOOD' ? <Droplet size={22} /> : <AlertTriangle size={22} />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif font-bold text-slate-900 text-lg">{req.title}</h4>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">{req.description}</p>
                    
                    <div className="flex items-center mt-4 text-xs text-slate-400 font-medium">
                      <MapPin size={14} className="mr-1.5" />
                      {req.location}
                      <span className="mx-2 opacity-30">|</span>
                      <span className="text-emerald-600 font-bold">{req.status}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-slate-50 flex justify-end">
                  <button className="text-bd-green text-sm font-bold hover:underline flex items-center bg-emerald-50 px-5 py-2.5 rounded-xl transition-all hover:bg-emerald-100 group-hover:pr-3">
                    <CheckCircle size={16} className="mr-2" /> {t.impact.help} <ArrowRight size={14} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Education Tab */}
        {activeTab === 'EDUCATION' && (
           <div className="p-8 text-center text-slate-400 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <BookOpen size={48} className="mx-auto mb-4 text-blue-100" />
              <h3 className="text-lg font-bold text-slate-700">Educational Resources</h3>
              <p className="text-sm mt-2">Connecting tutors and students.</p>
           </div>
        )}
        
        {/* Green Tab */}
        {activeTab === 'GREEN' && (
           <div className="p-8 text-center text-slate-400 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <Leaf size={48} className="mx-auto mb-4 text-emerald-100" />
              <h3 className="text-lg font-bold text-slate-700">Green Initiatives</h3>
              <p className="text-sm mt-2">Join tree planting and cleanup drives.</p>
           </div>
        )}
        
        {/* Wellbeing Tab */}
        {activeTab === 'WELLBEING' && (
           <div className="bg-white rounded-3xl shadow-soft border border-purple-100 p-8 text-center">
              <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                 <CloudSun size={32} />
              </div>
              <h3 className="text-purple-900 font-serif font-bold text-xl mb-2">{t.impact.wellbeing.title}</h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed max-w-xs mx-auto">{t.impact.wellbeing.desc}</p>
              <button className="bg-purple-600 text-white px-8 py-3 rounded-xl text-xs font-bold shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all">
                 {t.impact.wellbeing.btn}
              </button>
           </div>
        )}

      </div>
    </div>
  );
};