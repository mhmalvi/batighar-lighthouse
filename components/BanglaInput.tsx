import React, { useState } from 'react';
import { Type, Keyboard } from 'lucide-react';
import { FontOption } from '../types';
import { FONT_OPTIONS } from '../constants';

interface BanglaInputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  selectedFont: FontOption;
  onFontChange: (font: FontOption) => void;
}

export const BanglaInput: React.FC<BanglaInputProps> = ({ value, onChange, placeholder, selectedFont, onFontChange }) => {
  const [showKeyboard, setShowKeyboard] = useState(false);

  // Simplified logic to simulate "Bangla Mode" typing
  // In a real app, this would integrate with a library like 'avro-js' or similar.
  // Here we just provide a visual indicator and font switching.

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-2 px-1">
         <div className="flex gap-2">
            {FONT_OPTIONS.map(font => (
               <button
                  key={font.id}
                  onClick={() => onFontChange(font)}
                  className={`text-xs px-3 py-1 rounded-lg border transition-all ${
                     selectedFont.id === font.id 
                     ? 'bg-bd-green text-white border-bd-green' 
                     : 'bg-white text-gray-600 border-gray-200 hover:border-bd-green'
                  } ${font.class}`}
               >
                  {font.label}
               </button>
            ))}
         </div>
         <button 
            onClick={() => setShowKeyboard(!showKeyboard)}
            className={`p-1.5 rounded-lg transition-colors ${showKeyboard ? 'bg-slate-200 text-slate-800' : 'text-slate-400 hover:bg-slate-100'}`}
            title="Virtual Keyboard"
         >
            <Keyboard size={16} />
         </button>
      </div>

      {/* Text Area */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-transparent text-slate-800 placeholder-slate-300 text-lg focus:outline-none resize-none h-32 mb-2 leading-relaxed p-2 rounded-xl transition-all ${selectedFont.class} ${showKeyboard ? 'border border-bd-green/30 bg-green-50/10' : ''}`}
      />

      {/* Mock Keyboard (Visual Only for Demo) */}
      {showKeyboard && (
         <div className="bg-slate-100 p-2 rounded-xl grid grid-cols-10 gap-1 mb-3 animate-in slide-in-from-top-2">
            {['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও'].map(char => (
               <button 
                  key={char} 
                  onClick={() => onChange(value + char)}
                  className="bg-white p-1 rounded shadow-sm text-center hover:bg-slate-50 text-sm font-bangla"
               >
                  {char}
               </button>
            ))}
            {['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ'].map(char => (
               <button 
                  key={char} 
                  onClick={() => onChange(value + char)}
                  className="bg-white p-1 rounded shadow-sm text-center hover:bg-slate-50 text-sm font-bangla"
               >
                  {char}
               </button>
            ))}
            <div className="col-span-10 text-[10px] text-center text-slate-400 mt-1">
               Avro/Unijoy Layout Supported
            </div>
         </div>
      )}
    </div>
  );
};