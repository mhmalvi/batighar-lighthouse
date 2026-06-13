import React, { useState } from 'react';
import { Festival, Language } from '../types';
import { Gift, Paintbrush, Utensils, Send, Share2, Heart, CheckCircle } from 'lucide-react';

interface FestivalFeatureProps {
  festival: Festival;
  language: Language;
}

export const FestivalFeature: React.FC<FestivalFeatureProps> = ({ festival, language }) => {
  if (festival === Festival.NONE) return null;

  return (
    <div className="mb-6 animate-in slide-in-from-top-4 fade-in duration-500">
      {festival === Festival.EID && <EidFeature language={language} />}
      {festival === Festival.POHELA_BOISHAKH && <BoishakhFeature language={language} />}
      {festival === Festival.DURGA_PUJA && <PujaFeature language={language} />}
    </div>
  );
};

// --- EID: Virtual Eidi ---
const EidFeature: React.FC<{ language: Language }> = ({ language }) => {
  const [amount, setAmount] = useState('');
  const [sent, setSent] = useState(false);

  const stickers = ['🌙', '🕌', '🍬', '✨'];

  const handleSend = () => {
    if (!amount) return;
    setSent(true);
    setTimeout(() => {
       setSent(false);
       setAmount('');
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
           <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Gift size={24} />
           </div>
           <div>
              <h3 className="font-serif font-bold text-xl">{language === 'EN' ? 'Send Virtual Eidi' : 'ভার্চুয়াল সালামি পাঠান'}</h3>
              <p className="text-emerald-100 text-xs">{language === 'EN' ? 'Surprise your loved ones with a digital gift card.' : 'আপনার প্রিয়জনদের ডিজিটাল উপহার দিয়ে চমকে দিন।'}</p>
           </div>
        </div>

        {!sent ? (
           <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="flex gap-2 mb-4 justify-center">
                 {stickers.map(s => (
                    <button key={s} className="text-2xl hover:scale-125 transition-transform">{s}</button>
                 ))}
              </div>
              <div className="flex gap-2">
                 <input 
                    type="number" 
                    placeholder="৳ 500" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-emerald-100/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                 />
                 <button 
                    onClick={handleSend}
                    className="bg-white text-emerald-800 px-6 py-2 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
                 >
                    {language === 'EN' ? 'Send' : 'পাঠান'}
                 </button>
              </div>
           </div>
        ) : (
           <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center animate-in zoom-in">
              <CheckCircle size={48} className="mx-auto mb-2 text-emerald-200" />
              <h4 className="font-bold text-lg">{language === 'EN' ? 'Eidi Sent Successfully!' : 'সালামি সফলভাবে পাঠানো হয়েছে!'}</h4>
           </div>
        )}
      </div>
      {/* Decorative Circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl"></div>
    </div>
  );
};

// --- BOISHAKH: Digital Alpana ---
const BoishakhFeature: React.FC<{ language: Language }> = ({ language }) => {
  const [joined, setJoined] = useState(false);

  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
       <div className="relative z-10 flex flex-col items-center text-center">
          <h3 className="font-serif font-bold text-2xl mb-2">{language === 'EN' ? 'Community Alpana' : 'কমিউনিটি আলপনা'}</h3>
          <p className="text-red-100 text-sm mb-6 max-w-xs">{language === 'EN' ? 'Join 124 neighbors in painting the longest digital street art.' : '১২৪ জন প্রতিবেশীর সাথে যোগ দিন এবং দীর্ঘতম ডিজিটাল আলপনা আঁকুন।'}</p>
          
          <div className="relative w-full h-32 bg-white/90 rounded-xl mb-4 overflow-hidden shadow-inner group cursor-crosshair">
             {/* Simulated Alpana Pattern */}
             <div className="absolute inset-0 flex items-center justify-center opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
             <svg className="absolute w-full h-full" viewBox="0 0 100 40">
                <path d="M0 20 Q 25 5, 50 20 T 100 20" stroke="#dc2626" strokeWidth="2" fill="none" className="animate-pulse" />
                <circle cx="50" cy="20" r="8" fill="#ea580c" opacity="0.6" />
                {joined && <circle cx="20" cy="30" r="5" fill="#db2777" className="animate-ping" />}
             </svg>
             {!joined && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
                   <button 
                      onClick={() => setJoined(true)}
                      className="bg-red-700 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-red-800 transition-transform hover:scale-105 flex items-center gap-2"
                   >
                      <Paintbrush size={16} /> {language === 'EN' ? 'Add Your Stroke' : 'আপনার ছোঁয়া দিন'}
                   </button>
                </div>
             )}
          </div>
          {joined && <p className="text-xs font-bold text-yellow-200 animate-bounce">{language === 'EN' ? 'Thanks for contributing!' : 'অংশগ্রহণের জন্য ধন্যবাদ!'}</p>}
       </div>
    </div>
  );
};

// --- PUJA: Food Sharing ---
const PujaFeature: React.FC<{ language: Language }> = ({ language }) => {
  return (
    <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
       <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
             <div>
                <h3 className="font-serif font-bold text-xl">{language === 'EN' ? 'Maha Bhog Share' : 'মহা ভোগ শেয়ার'}</h3>
                <p className="text-amber-100 text-xs">{language === 'EN' ? 'Share your Puja offerings with the community.' : 'কমিউনিটির সাথে আপনার পুজোর ভোগ শেয়ার করুন।'}</p>
             </div>
             <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Utensils size={24} />
             </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-3 border border-white/20 mb-3 flex items-center gap-3">
             <div className="w-12 h-12 bg-white rounded-xl overflow-hidden">
                <img src="https://picsum.photos/seed/bhog/100/100" className="w-full h-full object-cover" alt="Bhog" />
             </div>
             <div className="flex-1">
                <h4 className="font-bold text-sm">Khichuri Bhog Available</h4>
                <p className="text-[10px] text-amber-100">By Anjali • 500m away</p>
             </div>
             <button className="bg-white text-orange-600 px-3 py-1.5 rounded-lg text-xs font-bold">Request</button>
          </div>

          <button className="w-full bg-orange-800/50 hover:bg-orange-800 border border-white/30 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
             <Share2 size={16} /> {language === 'EN' ? 'Share Your Bhog' : 'আপনার ভোগ শেয়ার করুন'}
          </button>
       </div>
    </div>
  );
};