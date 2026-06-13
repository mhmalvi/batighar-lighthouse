
import React, { useState } from 'react';
import { MARKET_ITEMS, TRANSLATIONS } from '../constants';
import { MapPin, ShoppingCart, Filter, Search, Star, X, MessageSquare } from 'lucide-react';
import { MarketItem, Language, Review } from '../types';

interface MarketplaceProps {
   language: Language;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  
  const t = TRANSLATIONS[language];

  // Map categories to translations
  const CATEGORIES = [
     { id: 'All', label: t.market.cats.all },
     { id: 'Handicraft', label: t.market.cats.handicraft },
     { id: 'Food', label: t.market.cats.food },
     { id: 'Textile', label: t.market.cats.textile },
  ];

  const filteredItems = selectedCategory === 'All' 
    ? MARKET_ITEMS 
    : MARKET_ITEMS.filter(item => item.type === selectedCategory);

  const handleAddReview = () => {
    if (selectedItem && newReview) {
       const review: Review = {
          id: Date.now().toString(),
          author: 'Me',
          rating: newRating,
          comment: newReview,
          date: 'Just now'
       };
       // In a real app, you'd update state/backend here. 
       // For this demo, we can't easily mutate the imported constant in a persistent way without context/state uplift.
       // We'll just simulate it visually or clear the input.
       setNewReview('');
       alert("Review submitted! (Simulated)");
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-serif font-bold text-bd-green">{t.market.title}</h2>
          <p className="text-sm text-gray-500">{t.market.subtitle}</p>
        </div>
        <button className="bg-bd-green text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-800 transition-colors shadow-lg shadow-bd-green/20">
          {t.market.sell}
        </button>
      </div>

      {/* Search & Filter */}
      <div className="space-y-4">
         <div className="relative">
             <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
             <input type="text" placeholder={t.market.search} className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-bd-green/20" />
         </div>

         {/* Category Chips */}
         <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map(cat => (
               <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                     selectedCategory === cat.id 
                        ? 'bg-bd-green text-white border-bd-green shadow-md' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-bd-green'
                  }`}
               >
                  {cat.label}
               </button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div 
             key={item.id} 
             onClick={() => setSelectedItem(item)}
             className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-gray-800 shadow-sm uppercase tracking-wide">
                {item.type}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-1">
                 <h3 className="font-bold text-gray-900 line-clamp-1 text-lg">{item.title}</h3>
                 <p className="text-terra-cotta font-bold whitespace-nowrap">{item.price}</p>
              </div>
              
              <div className="flex items-center text-xs text-gray-500 mb-2">
                 <div className="flex text-amber-400 mr-2">
                    <Star size={12} fill="currentColor" />
                    <span className="ml-1 text-gray-600 font-bold">{item.rating || 'New'}</span>
                 </div>
                 <span>({item.reviews?.length || 0} {t.market.reviews})</span>
              </div>
              
              <div className="flex items-center text-xs text-gray-500 mb-4 space-x-1">
                <MapPin size={12} />
                <span>{item.location}</span>
                <span className="mx-1">•</span>
                <span>{item.seller}</span>
              </div>

              <button className="w-full bg-gray-50 hover:bg-bd-green hover:text-white border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-bold transition-colors flex justify-center items-center group/btn">
                <ShoppingCart size={16} className="mr-2 group-hover/btn:animate-bounce" /> {t.market.buy}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl animate-in zoom-in-95">
               <div className="p-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                  <h3 className="font-bold text-lg">{selectedItem.title}</h3>
                  <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
               </div>
               
               <div className="p-6 space-y-6">
                  <img src={selectedItem.image} className="w-full h-64 object-cover rounded-xl" alt={selectedItem.title} />
                  
                  <div className="flex justify-between items-center">
                     <h2 className="text-2xl font-bold text-bd-green">{selectedItem.price}</h2>
                     <div className="flex items-center text-amber-500 gap-1">
                        <Star fill="currentColor" size={20} />
                        <span className="text-xl font-bold text-gray-800">{selectedItem.rating || 'N/A'}</span>
                     </div>
                  </div>

                  {/* Reviews Section */}
                  <div>
                     <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <MessageSquare size={18} /> {t.market.reviews} ({selectedItem.reviews?.length || 0})
                     </h4>
                     
                     <div className="space-y-4 mb-6">
                        {selectedItem.reviews && selectedItem.reviews.length > 0 ? selectedItem.reviews.map(review => (
                           <div key={review.id} className="bg-gray-50 p-4 rounded-xl">
                              <div className="flex justify-between mb-2">
                                 <span className="font-bold text-sm">{review.author}</span>
                                 <div className="flex text-amber-400 text-xs">
                                    {[...Array(5)].map((_, i) => (
                                       <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} />
                                    ))}
                                 </div>
                              </div>
                              <p className="text-sm text-gray-600">{review.comment}</p>
                              <span className="text-[10px] text-gray-400 mt-2 block">{review.date}</span>
                           </div>
                        )) : (
                           <p className="text-sm text-gray-400 italic">No reviews yet.</p>
                        )}
                     </div>

                     {/* Add Review */}
                     <div className="border-t border-gray-100 pt-4">
                        <h5 className="text-sm font-bold mb-3">{t.market.writeReview}</h5>
                        <div className="flex gap-2 mb-3">
                           {[1, 2, 3, 4, 5].map(star => (
                              <button key={star} onClick={() => setNewRating(star)} className={`text-2xl ${star <= newRating ? 'text-amber-400' : 'text-gray-300'}`}>★</button>
                           ))}
                        </div>
                        <textarea 
                           className="w-full border border-gray-200 rounded-xl p-3 text-sm mb-3 focus:outline-none focus:border-bd-green"
                           rows={3}
                           placeholder="Share your experience..."
                           value={newReview}
                           onChange={(e) => setNewReview(e.target.value)}
                        ></textarea>
                        <button onClick={handleAddReview} className="bg-slate-800 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-slate-900 transition-colors">
                           {t.market.submit}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}
      
      {/* Promo Banner */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 rounded-xl p-6 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-bd-red font-serif font-bold text-xl mb-2">{t.market.promo.title}</h3>
          <p className="text-gray-700 text-sm mb-4">{t.market.promo.desc}</p>
          <button className="text-white bg-bd-red px-6 py-2 rounded-full text-xs font-bold shadow-lg shadow-bd-red/20 hover:bg-red-700 transition-colors">{t.market.promo.btn}</button>
        </div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-orange-200 rounded-full opacity-50 blur-2xl"></div>
        <div className="absolute -left-8 -top-8 w-32 h-32 bg-red-200 rounded-full opacity-50 blur-2xl"></div>
      </div>
    </div>
  );
};
