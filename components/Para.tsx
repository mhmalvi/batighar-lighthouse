import React from 'react';
import { PARA_NOTICES, SAMPLE_POSTS } from '../constants';
import { MapPin, Bell, UserCheck, ShieldAlert, Calendar } from 'lucide-react';
import { Language } from '../types';

interface ParaProps {
   language: Language;
}

export const Para: React.FC<ParaProps> = ({ language }) => {
  return (
    <div className="space-y-6">
      {/* Village Header */}
      <div className="relative h-40 rounded-3xl overflow-hidden shadow-soft group">
        <img src="https://picsum.photos/seed/village/800/300" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Village" />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
           <div className="flex items-center text-white mb-1">
              <MapPin className="mr-2" size={20} />
              <h2 className="text-2xl font-serif font-bold">{language === 'EN' ? 'Barisal Sadar' : 'বরিশাল সদর'}</h2>
           </div>
           <p className="text-white/80 text-sm ml-7">{language === 'EN' ? 'My Hometown • 1.2k Neighbors' : 'আমার শহর • ১.২ হাজার প্রতিবেশী'}</p>
        </div>
      </div>

      {/* Notice Board */}
      <div>
         <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-bold text-slate-900 flex items-center">
               <Bell className="mr-2 text-bd-green" size={18} /> {language === 'EN' ? 'Notice Board' : 'নোটিশ বোর্ড'}
            </h3>
            <span className="text-xs text-gray-400">{language === 'EN' ? 'Updated 1h ago' : '১ ঘণ্টা আগে আপডেট'}</span>
         </div>
         <div className="space-y-3">
            {PARA_NOTICES.map(notice => (
               <div key={notice.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                  <div className={`w-1 rounded-full ${notice.type === 'ALERT' ? 'bg-red-500' : notice.type === 'EVENT' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                  <div className="flex-1">
                     <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-900 text-sm">{notice.title}</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${notice.type === 'ALERT' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>{notice.type}</span>
                     </div>
                     <p className="text-xs text-gray-600 mb-2">{notice.content}</p>
                     <p className="text-[10px] text-gray-400">{language === 'EN' ? 'Posted by' : 'পোস্ট করেছেন'} {notice.author} • {notice.timestamp}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Verified Elders (Murabbi) */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
         <h3 className="text-amber-900 font-bold text-sm mb-3 flex items-center">
            <UserCheck size={16} className="mr-2" /> {language === 'EN' ? 'Verified Murabbi (Elders)' : 'যাচাইকৃত মুরুব্বি'}
         </h3>
         <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {[1, 2, 3, 4].map(i => (
               <div key={i} className="flex flex-col items-center min-w-[70px]">
                  <div className="relative">
                     <img src={`https://picsum.photos/seed/elder${i}/100/100`} className="w-14 h-14 rounded-full border-2 border-white shadow-sm" alt="Elder" />
                     <div className="absolute -bottom-1 -right-1 bg-bd-green text-white p-0.5 rounded-full border-2 border-white">
                        <UserCheck size={10} />
                     </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-900 mt-1">{language === 'EN' ? 'Hazi Saheb' : 'হাজী সাহেব'}</span>
                  <span className="text-[9px] text-amber-700/70">{language === 'EN' ? 'Advisor' : 'উপদেষ্টা'}</span>
               </div>
            ))}
         </div>
      </div>

      {/* Local Feed */}
      <div>
         <h3 className="font-bold text-slate-900 mb-3 px-1">{language === 'EN' ? 'Neighborhood Chatter' : 'পাড়ার আড্ডা'}</h3>
         <div className="space-y-4">
            {SAMPLE_POSTS.slice(0, 2).map(post => (
               <div key={post.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                     <img src={post.avatar} className="w-10 h-10 rounded-full" alt={post.author} />
                     <div>
                        <h4 className="font-bold text-sm">{post.author}</h4>
                        <p className="text-xs text-gray-400">{post.timestamp}</p>
                     </div>
                  </div>
                  <p className="text-sm text-gray-700">{post.content}</p>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};