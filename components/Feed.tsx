import React, { useState, useEffect } from 'react';
import { Post, Emotion, Festival, Language } from '../types';
import { SAMPLE_POSTS_EN, SAMPLE_POSTS_BN, EMOTION_ICONS, EMOTION_COLORS, HASHTAGS, FONT_OPTIONS, TRANSLATIONS } from '../constants';
import { generateDailyInspiration, suggestEmotion, translateText } from '../services/geminiService';
import { Loader2, Send, Image as ImageIcon, Sparkles, MessageCircle, Share2, Heart, Volume2, Globe, EyeOff, CloudRain, PenTool, X, MapPin } from 'lucide-react';
import { FestivalFeature } from './FestivalFeatures';
import { BanglaInput } from './BanglaInput';

interface FeedProps {
  isMonsoon?: boolean;
  is4PM?: boolean;
  currentFestival?: Festival;
  language: Language;
}

export const Feed: React.FC<FeedProps> = ({ isMonsoon, currentFestival, language }) => {
  const initialPosts = language === 'BN' ? SAMPLE_POSTS_BN : SAMPLE_POSTS_EN;
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  
  useEffect(() => {
    setPosts(language === 'BN' ? SAMPLE_POSTS_BN : SAMPLE_POSTS_EN);
  }, [language]);

  const [inspiration, setInspiration] = useState<string>("");
  const [isLoadingInspiration, setIsLoadingInspiration] = useState(false);
  const t = TRANSLATIONS[language];

  // Post Creation State
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [isSuggestingEmotion, setIsSuggestingEmotion] = useState(false);
  const [showHashtags, setShowHashtags] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0]);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  // Translation State
  const [translatedPosts, setTranslatedPosts] = useState<Record<string, string>>({});
  const [loadingTranslation, setLoadingTranslation] = useState<Record<string, boolean>>({});

  useEffect(() => {
    handleRefreshInspiration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const handleRefreshInspiration = async () => {
    setIsLoadingInspiration(true);
    const quote = await generateDailyInspiration(language);
    setInspiration(quote);
    setIsLoadingInspiration(false);
  };

  const handleContentChange = async (text: string) => {
    setNewPostContent(text);
    
    if (text.endsWith('#')) {
      setShowHashtags(true);
    } else if (text.includes(' ')) {
      setShowHashtags(false);
    }
    
    if (text.length > 10 && text.length % 20 === 0) {
      setIsSuggestingEmotion(true);
      const suggested = await suggestEmotion(text);
      const emotionEnum = Object.values(Emotion).find(e => e === suggested);
      if (emotionEnum) setSelectedEmotion(emotionEnum);
      setIsSuggestingEmotion(false);
    }
  };

  const addHashtag = (tag: string) => {
     setNewPostContent(prev => prev + tag.substring(1) + " ");
     setShowHashtags(false);
  };

  const handlePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: isAnonymous ? 'Anonymous' : 'You',
      avatar: isAnonymous ? 'https://ui-avatars.com/api/?name=A&background=random' : 'https://picsum.photos/seed/me/100/100',
      content: newPostContent,
      emotion: selectedEmotion || Emotion.PEACEFUL,
      likes: 0,
      timestamp: 'Just now',
      location: isAnonymous ? undefined : 'Dhaka',
      isAnonymous: isAnonymous,
      font: selectedFont.class
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setSelectedEmotion(null);
    setIsAnonymous(false);
    setIsCreatingPost(false);
  };

  const handleTranslate = async (postId: string, text: string) => {
    if (translatedPosts[postId]) {
      const newTrans = { ...translatedPosts };
      delete newTrans[postId];
      setTranslatedPosts(newTrans);
      return;
    }

    setLoadingTranslation(prev => ({ ...prev, [postId]: true }));
    const targetLang = language === 'EN' ? 'Bengali' : 'English';
    const translation = await translateText(text, targetLang);
    setTranslatedPosts(prev => ({ ...prev, [postId]: translation }));
    setLoadingTranslation(prev => ({ ...prev, [postId]: false }));
  };

  const handleTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      if (language === 'BN') {
         const bnVoice = voices.find(v => v.lang.includes('bn'));
         if (bnVoice) utterance.voice = bnVoice;
      }
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech not supported in this browser.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Inspiration */}
      {!isMonsoon && (currentFestival === Festival.NONE || !currentFestival) && (
         <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-6 shadow-soft group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100/50 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10 flex flex-col gap-3">
               <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center">
                     <Sparkles size={10} className="mr-1.5 text-gold-accent" /> {t.feed.morningSun}
                  </span>
                  <button onClick={handleRefreshInspiration} className="text-slate-300 hover:text-bd-green transition-colors">
                     <Sparkles size={14} />
                  </button>
               </div>
               {isLoadingInspiration ? (
                  <div className="flex items-center text-slate-400 text-sm font-serif italic h-12">
                     <Loader2 className="animate-spin mr-3 h-4 w-4" /> {t.feed.waitingSun}
                  </div>
               ) : (
                  <p className="text-slate-800 font-serif text-lg leading-relaxed">{inspiration}</p>
               )}
            </div>
         </div>
      )}

      {/* Festival Mode Feature */}
      {currentFestival && <FestivalFeature festival={currentFestival} language={language} />}

      {/* Monsoon Prompt */}
      {isMonsoon && (
         <div className="bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-full text-blue-500">
               <CloudRain size={20} />
            </div>
            <div className="flex-1">
               <h3 className="text-blue-900 font-bold text-sm mb-0.5">{t.feed.monsoonPrompt.title}</h3>
               <p className="text-xs text-slate-500 leading-snug">{t.feed.monsoonPrompt.desc}</p>
            </div>
            <button className="text-[10px] font-bold bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
               {t.feed.monsoonPrompt.btn}
            </button>
         </div>
      )}

      {/* Post Creator */}
      {!isCreatingPost ? (
         <div 
            onClick={() => setIsCreatingPost(true)}
            className="bg-white rounded-full shadow-premium p-2 pr-6 flex items-center gap-3 cursor-pointer hover:shadow-lg transition-all border border-gray-50/50"
         >
            <img src="https://picsum.photos/seed/me/100/100" alt="You" className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
            <span className="text-sm text-slate-400 font-medium pl-1 flex-1">{t.feed.createPlaceholder}</span>
            <div className="p-2 bg-slate-50 rounded-full text-slate-400">
               <PenTool size={16} />
            </div>
         </div>
      ) : (
         <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 animate-in fade-in zoom-in-95 relative z-20">
            <div className="flex justify-between items-center mb-4">
               <div className="flex items-center gap-3">
                  {isAnonymous ? (
                     <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><EyeOff size={18} /></div>
                  ) : (
                     <img src="https://picsum.photos/seed/me/100/100" alt="You" className="w-10 h-10 rounded-full object-cover shadow-sm" />
                  )}
                  <div>
                     <span className="block text-sm font-bold text-slate-800">{isAnonymous ? 'Anonymous' : 'Tanvir Hasan'}</span>
                     <button onClick={() => setIsAnonymous(!isAnonymous)} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hover:text-bd-green">
                        {isAnonymous ? 'Switch to Public' : 'Switch to Anonymous'}
                     </button>
                  </div>
               </div>
               <button onClick={() => setIsCreatingPost(false)} className="bg-slate-50 p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"><X size={18} /></button>
            </div>
            
            {/* Custom Bangla Input with Fonts */}
            <BanglaInput 
               value={newPostContent}
               onChange={handleContentChange}
               placeholder={isAnonymous ? t.feed.anonymousPlaceholder : t.feed.createPlaceholder}
               selectedFont={selectedFont}
               onFontChange={setSelectedFont}
            />

            {/* Suggestions */}
            {showHashtags && (
               <div className="flex flex-wrap gap-2 mb-4">
                  {HASHTAGS.map(h => (
                     <button key={h.id} onClick={() => addHashtag(h.tag)} className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-100 transition-colors">
                        {h.tag}
                     </button>
                  ))}
               </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
               <div className="flex items-center gap-2">
                  <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors"><ImageIcon size={20} /></button>
                  <div className="h-6 w-px bg-slate-100 mx-1"></div>
                  {/* Emotion Trigger */}
                  <div className="flex gap-1 overflow-x-auto max-w-[150px] no-scrollbar">
                     {Object.values(Emotion).map((emotion) => (
                        <button
                           key={emotion}
                           onClick={() => setSelectedEmotion(emotion)}
                           className={`p-1.5 rounded-full text-lg transition-transform hover:scale-110 ${selectedEmotion === emotion ? 'bg-slate-100 scale-110' : ''}`}
                        >
                           {EMOTION_ICONS[emotion]}
                        </button>
                     ))}
                  </div>
               </div>
               <button 
                  onClick={handlePost} 
                  disabled={!newPostContent.trim()}
                  className="bg-bd-green text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-bd-green/20 hover:bg-green-800 disabled:opacity-50 disabled:shadow-none transition-all"
               >
                  {t.feed.post} <Send size={16} />
               </button>
            </div>
         </div>
      )}

      {/* Feed Stream */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-3xl shadow-soft border border-white/50 overflow-hidden group hover:shadow-md transition-shadow duration-500">
            {/* Post Card Content - Simplified for Brevity */}
            <div className="p-5 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                   <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{post.author}</h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium mt-0.5">
                     <span>{post.timestamp}</span>
                     <span className="w-0.5 h-0.5 bg-slate-300 rounded-full"></span>
                     <span className="flex items-center gap-0.5"><MapPin size={10} /> {post.location || 'Hidden'}</span>
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${EMOTION_COLORS[post.emotion]}`}>
                <span className="mr-1 text-base">{EMOTION_ICONS[post.emotion]}</span> {post.emotion.split(' ')[0]}
              </div>
            </div>
            <div className="px-5 pb-3">
              <p className={`text-slate-700 text-[15px] leading-relaxed font-light ${post.font || 'font-sans'}`}>
                 {post.content}
              </p>
              {translatedPosts[post.id] && (
                 <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-600 animate-in fade-in">
                    <div className="flex items-center gap-1.5 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        <Globe size={12} /> {t.feed.translation}
                    </div>
                    {translatedPosts[post.id]}
                 </div>
              )}
            </div>
            {post.image && (
              <div className="mt-2 mx-5 mb-2 rounded-2xl overflow-hidden shadow-sm relative h-64 group cursor-pointer">
                <img src={post.image} alt="Content" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            )}
            <div className="px-5 py-4 flex items-center justify-between">
               <div className="flex gap-6">
                 <button className="flex items-center gap-2 text-slate-400 hover:text-bd-red transition-colors group">
                    <Heart size={20} className="group-hover:fill-current" />
                    <span className="text-sm font-bold group-hover:text-bd-red">{post.likes}</span>
                 </button>
                 <button className="flex items-center gap-2 text-slate-400 hover:text-bd-green transition-colors group">
                    <MessageCircle size={20} />
                 </button>
                 <button className="flex items-center gap-2 text-slate-400 hover:text-bd-green transition-colors group">
                    <Share2 size={20} />
                 </button>
               </div>
               <div className="flex gap-2">
                  <button onClick={() => handleTTS(translatedPosts[post.id] || post.content)} className="p-2 rounded-full text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
                    <Volume2 size={18} />
                  </button>
                  <button 
                     onClick={() => handleTranslate(post.id, post.content)} 
                     className={`p-2 rounded-full transition-colors ${loadingTranslation[post.id] || translatedPosts[post.id] ? 'bg-bd-green/10 text-bd-green' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
                  >
                    {loadingTranslation[post.id] ? <Loader2 size={18} className="animate-spin" /> : <Globe size={18} />}
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};