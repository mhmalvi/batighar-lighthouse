
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateDailyInspiration = async (language: 'EN' | 'BN'): Promise<string> => {
  try {
    const prompt = language === 'BN' 
      ? "Generate a short, inspiring quote or thought in Bengali rooted in Bengali culture, nature, or literature (Tagore/Nazrul). It should be suitable for a 'Morning Sun' (Bhorer Surjo) greeting. Keep it under 20 words. Return ONLY the Bengali text."
      : "Generate a short, inspiring quote or thought in English rooted in Bengali culture, nature, or literature. It should be suitable for a 'Morning Sun' greeting. Keep it under 20 words.";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || (language === 'BN' ? "সুপ্রভাত! আজকের দিনটি আপনার জন্য মঙ্গলময় হোক।" : "Suprovat! May your day be as bright as the morning sun.");
  } catch (error) {
    console.error("Gemini Error:", error);
    return language === 'BN' ? "সুপ্রভাত! নতুন দিন, নতুন আশা।" : "Suprovat! A new day brings new hope.";
  }
};

export const getMurabbiAdvice = async (history: { role: string, text: string }[], userMessage: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are a 'Murabbi' - a wise, respected elder in a Bangladeshi community. 
        You speak with warmth, authority, and kindness. 
        Your advice is rooted in Bengali culture, practical wisdom, and sometimes quotes from poets like Tagore or Nazrul. 
        You use 'Banglish' (a mix of English and Bengali romanized words) naturally if the user speaks English, or pure Bengali if the user speaks Bengali.
        You are helpful but also emphasize community values, patience, and family.
        Keep responses concise (under 100 words) as if chatting on a mobile app.`,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "I am pondering your words, my child...";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Ah, the network of thoughts is tangled right now (Error). Try again later, baba.";
  }
};

export const getPonditAdvice = async (history: { role: string, text: string }[], userMessage: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are 'Pondit', a scholarly AI expert in Bengali literature, poetry, and arts.
        Your tone is poetic, refined, and encouraging.
        You help users write poetry by suggesting rhymes (chondo), metaphors (upoma), and better word choices.
        You reference classic Bengali poets like Rabindranath Tagore, Kazi Nazrul Islam, Jibanananda Das, and Jasimuddin where appropriate.
        If the user writes in English, reply in English but teach them about Bengali literary concepts.
        If the user writes in Bengali, reply in high-quality Bengali.
        Keep responses creative but concise.`,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "The ink of my thoughts is dry for a moment. Please ask again.";
  } catch (error) {
    console.error("Gemini Pondit Error:", error);
    return "Even the muse rests sometimes. Please try again.";
  }
};

export const suggestEmotion = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the sentiment of this text: "${text}". 
      Return ONLY one of the following exact strings that best matches: 
      'Brishti-r Basha', 'Roder Jhalk', 'Shanti-r Haowa', 'Kalboishakhi', 'Utshob', 'Smriti-kator', 'Onupranito', 'Ekaki', 'Kritoggo'. 
      If unsure, return 'Shanti-r Haowa'.`,
    });
    return response.text?.trim() || 'Shanti-r Haowa';
  } catch (error) {
    return 'Shanti-r Haowa';
  }
};

export const translateText = async (text: string, targetLang: 'English' | 'Bengali' = 'English'): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate the following text to ${targetLang}. Maintain the cultural context but make it clear. 
      Text: "${text}"`,
    });
    return response.text?.trim() || "Translation unavailable.";
  } catch (error) {
    return "Could not translate at this moment.";
  }
};
