
export enum View {
  HOME = 'HOME',
  MARKET = 'MARKET',
  IMPACT = 'IMPACT',
  LIVE = 'LIVE',
  EVENTS = 'EVENTS',
  REELS = 'REELS',
  MESSAGES = 'MESSAGES',
  PROFILE = 'PROFILE',
  EXPLORE = 'EXPLORE',
  PARA = 'PARA',
  GAMES = 'GAMES',
  CHHOBIR_GHOR = 'CHHOBIR_GHOR',
}

export type Language = 'EN' | 'BN';

export enum Emotion {
  RAINY = 'Brishti-r Basha', // Nostalgic
  SUNNY = 'Roder Jhalk',    // Energetic
  PEACEFUL = 'Shanti-r Haowa', // Calm
  STORMY = 'Kalboishakhi',  // Angry/Intense
  JOYFUL = 'Utshob',        // Festive
  NOSTALGIC = 'Smriti-kator', // Nostalgic/Sad
  INSPIRED = 'Onupranito',   // Inspired
  LONELY = 'Ekaki',          // Lonely
  GRATEFUL = 'Kritoggo',     // Grateful
}

export enum Season {
  GRISHMA = 'Summer',
  BARSHA = 'Monsoon',
  SARAT = 'Autumn',
  HEMANTA = 'Late Autumn',
  SHEET = 'Winter',
  BASANTA = 'Spring',
  DEFAULT = 'Default'
}

export enum Festival {
  NONE = 'NONE',
  EID = 'EID',
  POHELA_BOISHAKH = 'POHELA_BOISHAKH',
  DURGA_PUJA = 'DURGA_PUJA',
}

export interface UserProfile {
  id: string;
  name: string;
  banglaName: string;
  handle: string;
  avatar: string;
  coverImage: string;
  bio: string;
  hometown: string;
  badges: string[];
  currentEmotion: Emotion;
  currentEmotionNote?: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  theme?: Season;
}

export interface ExploreCategory {
  id: string;
  label: string;
  banglaLabel: string;
  icon: string;
  color: string;
  image: string;
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  emotion: Emotion;
  likes: number; 
  timestamp: string;
  location?: string;
  hashtags?: string[];
  type?: 'TEXT' | 'IMAGE' | 'POLL';
  isAnonymous?: boolean;
  font?: string; // For custom fonts
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface MarketItem {
  id: string;
  title: string;
  price: string;
  seller: string;
  image: string;
  location: string;
  type: 'Handicraft' | 'Food' | 'Textile';
  rating?: number;
  reviews?: Review[];
}

export interface ImpactRequest {
  id: string;
  type: 'BLOOD' | 'ISSUE' | 'LOST';
  title: string;
  description: string;
  location: string;
  urgency: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'RESOLVED';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  type: 'DIRECT' | 'GROUP';
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  participants: string[];
}

export interface ParaNotice {
  id: string;
  title: string;
  content: string;
  author: string;
  type: 'ALERT' | 'INFO' | 'EVENT';
  timestamp: string;
}

export interface Game {
  id: string;
  title: string;
  banglaTitle: string;
  category: string;
  image: string;
  players: string;
}

export interface RadioStation {
  id: string;
  name: string;
  frequency: string;
  currentTrack: string;
  image: string;
  listeners: number;
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  duration: string;
  views: string;
}

export interface Reel {
  id: string;
  author: string;
  videoUrl: string; // Using image as placeholder for demo
  description: string;
  likes: string;
  comments: string;
  shares: string;
  song: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  avatar: string;
}

export interface FontOption {
  id: string;
  name: string;
  class: string;
  label: string;
}

export interface PhotoPost {
  id: string;
  title: string;
  photographer: string;
  avatar: string;
  imageUrl: string;
  location: string;
  exif: {
    camera: string;
    lens: string;
    aperture: string;
    shutter: string;
    iso: string;
  };
  description: string;
  likes: number;
}
