
import React, { useState } from 'react';
import { PHOTO_POSTS, TRANSLATIONS } from '../constants';
import { Camera, Maximize2, X, Aperture, Heart, MapPin, Share2 } from 'lucide-react';
import { Language, PhotoPost } from '../types';

interface ChhobirGhorProps {
   language: Language;
}

export const ChhobirGhor: React.FC<ChhobirGhorProps> = ({ language }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoPost | null>(null);
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between mb-4">
          <div>
             <h2 className="text-2xl font-serif font-bold text-slate-900">{t.gallery.title}</h2>
             <p className="text-slate-500 text-sm">{t.gallery.subtitle}</p>
          </div>
          <div className="p-3 bg-slate-100 rounded-full text-slate-600">
             <Camera size={24} />
          </div>
       </div>

       {/* Masonry Layout */}
       <div className="columns-2 gap-4 space-y-4">
          {PHOTO_POSTS.map(photo => (
             <div 
                key={photo.id} 
                className="break-inside-avoid relative rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
             >
                <img src={photo.imageUrl} alt={photo.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                   <h3 className="text-white font-bold text-sm">{photo.title}</h3>
                   <p className="text-white/80 text-xs">by {photo.photographer}</p>
                </div>
             </div>
          ))}
       </div>

       {/* Photo Detail Modal */}
       {selectedPhoto && (
          <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in">
             <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
             >
                <X size={32} />
             </button>

             <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
                {/* Image Section */}
                <div className="flex-1 bg-black flex items-center justify-center relative">
                   <img src={selectedPhoto.imageUrl} alt={selectedPhoto.title} className="max-h-[70vh] md:max-h-[80vh] w-full object-contain" />
                </div>

                {/* Info Section */}
                <div className="w-full md:w-80 bg-white p-6 flex flex-col h-full overflow-y-auto">
                   <div className="flex items-center gap-3 mb-6">
                      <img src={selectedPhoto.avatar} className="w-10 h-10 rounded-full" alt="User" />
                      <div>
                         <h4 className="font-bold text-slate-900">{selectedPhoto.photographer}</h4>
                         <p className="text-xs text-slate-500 flex items-center"><MapPin size={10} className="mr-1" /> {selectedPhoto.location}</p>
                      </div>
                   </div>

                   <h2 className="text-xl font-serif font-bold mb-2">{selectedPhoto.title}</h2>
                   <p className="text-slate-600 text-sm leading-relaxed mb-6">{selectedPhoto.description}</p>

                   <div className="bg-slate-50 rounded-xl p-4 mb-6">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                         <Aperture size={12} /> {t.gallery.exif}
                      </h5>
                      <div className="grid grid-cols-2 gap-y-3 text-xs">
                         <div>
                            <span className="block text-slate-400">Camera</span>
                            <span className="font-bold text-slate-700">{selectedPhoto.exif.camera}</span>
                         </div>
                         <div>
                            <span className="block text-slate-400">Lens</span>
                            <span className="font-bold text-slate-700">{selectedPhoto.exif.lens}</span>
                         </div>
                         <div>
                            <span className="block text-slate-400">Aperture</span>
                            <span className="font-bold text-slate-700">{selectedPhoto.exif.aperture}</span>
                         </div>
                         <div>
                            <span className="block text-slate-400">ISO</span>
                            <span className="font-bold text-slate-700">{selectedPhoto.exif.iso}</span>
                         </div>
                      </div>
                   </div>

                   <div className="mt-auto flex gap-3 pt-4 border-t border-slate-100">
                      <button className="flex-1 bg-bd-red/10 text-bd-red py-2 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-bd-red hover:text-white transition-colors">
                         <Heart size={16} /> {selectedPhoto.likes}
                      </button>
                      <button className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                         <Share2 size={16} /> Share
                      </button>
                   </div>
                </div>
             </div>
          </div>
       )}
    </div>
  );
};
