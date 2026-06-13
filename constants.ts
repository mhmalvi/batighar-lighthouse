
import { Emotion, Post, MarketItem, ImpactRequest, View, Conversation, Message, UserProfile, ExploreCategory, ParaNotice, Game, RadioStation, VideoItem, FamilyMember, FontOption, Language, Reel, Season, PhotoPost } from './types';

export const TRANSLATIONS = {
  EN: {
    nav: {
      home: 'Adda',
      explore: 'Explore',
      market: 'Bazaar',
      media: 'Media',
      impact: 'Impact',
      para: 'Para',
      events: 'Events',
      messages: 'Messages',
      profile: 'Profile',
      reels: 'Jhalmuri'
    },
    header: {
      title: 'Bātighar',
      season: {
        spring: 'Basanta (Spring)',
        monsoon: 'Borsha (Monsoon)'
      },
      settings: 'Settings'
    },
    meena: {
      title: 'Meena AI',
      subtitle: 'Your wise cultural companion',
      placeholder: 'Ask Meena anything...'
    },
    pondit: {
      title: 'Pondit',
      subtitle: 'Your poetic muse',
      placeholder: 'Ask for rhymes, metaphors, or poetry...',
      welcome: 'Namaskar. I am Pondit. Shall we weave words into poetry today?'
    },
    feed: {
      morningSun: 'Morning Wisdom',
      waitingSun: 'Gathering wisdom...',
      newInspiration: 'Refresh',
      createPlaceholder: 'What\'s on your mind?',
      anonymousPlaceholder: 'Share anonymously...',
      post: 'Post',
      translation: 'Translation',
      listen: 'Listen',
      original: 'Original',
      translate: 'Translate',
      suggestions: 'SUGGESTIONS',
      monsoonPrompt: {
        title: 'Monsoon Memories',
        desc: 'The rain is falling... does it remind you of a childhood paper boat?',
        btn: 'Share Memory'
      },
      festival: {
        eid: { title: 'Eid Mubarak!', desc: 'Share joy with virtual Eidi today.', btn: 'Send Eidi' },
        boishakh: { title: 'Shubho Noboborsho!', desc: 'Join the community digital Alpana.', btn: 'Draw Alpana' },
        puja: { title: 'Sharodiya Shuveccha', desc: 'Share your Puja Bhog offerings.', btn: 'Share Bhog' }
      }
    },
    market: {
      title: 'Bondhu Bazaar',
      subtitle: 'Curated local artisans & makers',
      sell: 'Sell Item',
      search: 'Search for Pitha, Saree, Pottery...',
      buy: 'Purchase',
      promo: {
        title: 'Pohela Boishakh Sale!',
        desc: 'Get 20% off on all handloom sarees and panjabis this week.',
        btn: 'Browse Collection'
      },
      cats: { all: 'All', handicraft: 'Handicraft', food: 'Food', textile: 'Textile' },
      reviews: 'Reviews',
      writeReview: 'Write a Review',
      submit: 'Submit'
    },
    impact: {
      title: 'Impact Hub',
      subtitle: 'Community solutions for a better tomorrow.',
      tabs: { emergency: 'Emergency', education: 'Education', green: 'Green', wellbeing: 'Wellbeing' },
      donor: { title: 'Become a Donor', desc: 'urgent requests near you.', btn: 'Register' },
      alerts: 'Live Alerts',
      priority: 'PRIORITY',
      help: 'Volunteer',
      wellbeing: {
        title: 'Safe Space',
        desc: 'Share your feelings anonymously. Your voice matters.',
        btn: 'Write Anonymously',
        meditation: 'Morning Peace',
        meditationDesc: '5 mins guided audio • Bengali',
        play: 'Play'
      }
    },
    media: {
      tabs: { live: 'Live', radio: 'Radio', video: 'Video' },
      adda: {
        title: 'Cha-er Adda (4 PM)',
        desc: 'Join us every day at 4 PM for a cup of virtual tea.',
        descActive: 'The tea is served! Join the conversation happening right now.',
        topic: "Today's Topic",
        btnSet: 'Remind Me',
        btnJoin: 'Join Room'
      },
      radioTitle: 'Radio Stations',
      cinemaTitle: 'Cinema Hall'
    },
    profile: {
      edit: 'Edit',
      posts: 'Posts',
      followers: 'Followers',
      following: 'Following',
      emotion: 'Emotion Weather',
      badges: 'Badges',
      family: 'My Family',
      addMember: 'Add',
      myAdda: 'My Adda',
      seeAll: 'See All',
      mood: 'Mood',
      setMood: 'Update Moner Haowa',
      close: 'Close',
      howMood: "How is your 'Moner Haowa'?",
      theme: 'Profile Theme',
      cover: 'Cover Image URL',
      privateNote: 'Add a private note (optional)',
      keepPrivate: 'Keep note private'
    },
    settings: {
      title: 'Settings',
      appearance: 'Appearance',
      largeText: 'Large Text',
      highContrast: 'High Contrast',
      lowData: 'Data Saver',
      dev: 'Dev: Simulate Atmosphere',
      monsoon: 'Monsoon Mode',
      time4pm: "It's 4 PM",
      festival: 'Active Festival',
      darkMode: 'Dark Mode',
      genzMode: 'Gen-Z Mode',
      logout: 'Log Out',
      lang: 'Language'
    },
    gallery: {
      title: 'Chhobir Ghor',
      subtitle: 'Visual stories from Bengal',
      exif: 'Camera Details'
    }
  },
  BN: {
    nav: {
      home: 'আড্ডা',
      explore: 'অন্বেষণ',
      market: 'বাজার',
      media: 'মিডিয়া',
      impact: 'সমাধান',
      para: 'পাড়া',
      events: 'ইভেন্ট',
      messages: 'বার্তা',
      profile: 'প্রোফাইল',
      reels: 'ঝালমুড়ি'
    },
    header: {
      title: 'বাতিঘর',
      season: {
        spring: 'বসন্ত (ফাল্গুন)',
        monsoon: 'বর্ষা (আষাঢ়)'
      },
      settings: 'সেটিংস'
    },
    meena: {
      title: 'মিনা এআই',
      subtitle: 'আপনার সাংস্কৃতিক বন্ধু',
      placeholder: 'মিনাকে যা খুশি জিজ্ঞেস করুন...'
    },
    pondit: {
      title: 'পন্ডিত',
      subtitle: 'আপনার কাব্যিক সঙ্গী',
      placeholder: 'ছন্দ, উপমা বা কবিতার জন্য জিজ্ঞাসা করুন...',
      welcome: 'নমস্কার। আমি পন্ডিত। আজ কি আমরা শব্দের জালে কবিতা বুনব?'
    },
    feed: {
      morningSun: 'ভোরের সূর্য',
      waitingSun: 'সূর্যের অপেক্ষায়...',
      newInspiration: 'নতুন অনুপ্রেরণা',
      createPlaceholder: 'মনের কথা খুলে বলো...',
      anonymousPlaceholder: 'নাম গোপন রেখে লিখুন...',
      post: 'পোস্ট',
      translation: 'অনুবাদ',
      listen: 'শুনুন',
      original: 'মূল',
      translate: 'অনুবাদ',
      suggestions: 'পরামর্শ',
      monsoonPrompt: {
        title: 'বৃষ্টি ভেজা স্মৃতি',
        desc: 'বৃষ্টি পড়ছে... ছোটবেলার কাগজের নৌকা বা বিশেষ কোনো দিনের কথা মনে পড়ছে কি?',
        btn: 'গল্প শেয়ার করুন'
      },
      festival: {
        eid: { title: 'ঈদ মোবারক!', desc: 'ভার্চুয়াল সালামি ও আনন্দ ভাগ করে নিন।', btn: 'সালামি পাঠান' },
        boishakh: { title: 'শুভ নববর্ষ!', desc: 'কমিউনিটি ডিজিটাল আলপনায় যোগ দিন।', btn: 'আলপনা আঁকুন' },
        puja: { title: 'শারদীয় শুভেচ্ছা', desc: 'পুজোর ভোগ ও আনন্দ ভাগ করে নিন।', btn: 'ভোগ শেয়ার করুন' }
      }
    },
    market: {
      title: 'বন্ধু বাজার',
      subtitle: 'দেশীয় কারিগর ও উদ্যোক্তাদের পাশে',
      sell: 'বিক্রি করুন',
      search: 'পিঠা, শাড়ি, মাটির জিনিস খুঁজুন...',
      buy: 'কিনুন',
      promo: {
        title: 'পহেলা বৈশাখ মেলা!',
        desc: 'হস্তচালিত তাঁতের শাড়ি ও পাঞ্জাবিতে ২০% ছাড়।',
        btn: 'সংগ্রহ দেখুন'
      },
      cats: { all: 'সব', handicraft: 'হস্তশিল্প', food: 'খাবার', textile: 'বস্ত্র' },
      reviews: 'রিভিউ',
      writeReview: 'রিভিউ লিখুন',
      submit: 'জমা দিন'
    },
    impact: {
      title: 'সমাধান বৃত্ত',
      subtitle: 'রক্তদান থেকে মনের শান্তি—সামাজিক উদ্যোগ।',
      tabs: { emergency: 'জরুরী', education: 'শিক্ষা', green: 'পরিবেশ', wellbeing: 'সুস্থতা' },
      donor: { title: 'রক্তদাতা হন', desc: 'আপনার কাছাকাছি ৩টি জরুরী অনুরোধ।', btn: 'নিবন্ধন করুন' },
      alerts: 'লাইভ সতর্কতা',
      priority: 'জরুরী',
      help: 'সাহায্য করব',
      wellbeing: {
        title: 'মন খোলার গল্প',
        desc: 'নাম গোপন রেখে মনের কথা বলুন।',
        btn: 'গোপনে লিখুন',
        meditation: 'ভোরের শান্তি',
        meditationDesc: '৫ মিনিটের অডিও ধ্যান',
        play: 'শুরু করুন'
      }
    },
    media: {
      tabs: { live: 'লাইভ', radio: 'রেডিও', video: 'ভিডিও' },
      adda: {
        title: 'চায়ের আড্ডা (বিকেল ৪টা)',
        desc: 'প্রতিদিন বিকেল ৪টায় এক কাপ চা আর মন খোলা আড্ডায় যোগ দিন।',
        descActive: 'চা তৈরি! এখনই আড্ডায় যোগ দিন।',
        topic: "আজকের বিষয়",
        btnSet: 'রিমাইন্ডার',
        btnJoin: 'অডিও রুম'
      },
      radioTitle: 'বাংলা রেডিও স্টেশন',
      cinemaTitle: 'সিনেমা হল ও আর্কাইভ'
    },
    profile: {
      edit: 'এডিট',
      posts: 'পোস্ট',
      followers: 'অনুসারী',
      following: 'অনুসরণ',
      emotion: 'মনের আবহাওয়া',
      badges: 'ব্যাজ',
      family: 'আমার পরিবার',
      addMember: 'যোগ',
      myAdda: 'আমার আড্ডা',
      seeAll: 'সব দেখুন',
      mood: 'বর্তমান মেজাজ',
      setMood: 'মনের আবহাওয়া আপডেট',
      close: 'বন্ধ করুন',
      howMood: "আপনার 'মনের হাওয়া' কেমন?",
      theme: 'প্রোফাইল থিম',
      cover: 'কভার ছবির লিংক',
      privateNote: 'ব্যক্তিগত নোট যোগ করুন (ঐচ্ছিক)',
      keepPrivate: 'নোট গোপন রাখুন'
    },
    settings: {
      title: 'সেটিংস ও ভাষা',
      appearance: 'দৃশ্যমানতা',
      largeText: 'বড় লেখা',
      highContrast: 'উচ্চ কন্ট্রাস্ট',
      lowData: 'ছোট মোড',
      dev: 'ডেভ: পরিবেশ সিমুলেশন',
      monsoon: 'বর্ষাকাল মোড',
      time4pm: "বিকেল ৪টা (আড্ডা)",
      festival: 'সক্রিয় উৎসব',
      darkMode: 'ডার্ক মোড',
      genzMode: 'জেন-জি মোড',
      logout: 'লগ আউট',
      lang: 'ভাষা / Language'
    },
    gallery: {
      title: 'ছবির ঘর',
      subtitle: 'বাংলার ভিজ্যুয়াল গল্প',
      exif: 'ক্যামেরা ডিটেইলস'
    }
  }
};

export const EMOTION_ICONS: Record<Emotion, string> = {
  [Emotion.RAINY]: '🌧️',
  [Emotion.SUNNY]: '☀️',
  [Emotion.PEACEFUL]: '🍃',
  [Emotion.STORMY]: '⛈️',
  [Emotion.JOYFUL]: '🎉',
  [Emotion.NOSTALGIC]: '🕰️',
  [Emotion.INSPIRED]: '💡',
  [Emotion.LONELY]: '🕯️',
  [Emotion.GRATEFUL]: '🙏',
};

export const EMOTION_COLORS: Record<Emotion, string> = {
  [Emotion.RAINY]: 'bg-sky-50 text-sky-700 border-sky-100',
  [Emotion.SUNNY]: 'bg-amber-50 text-amber-700 border-amber-100',
  [Emotion.PEACEFUL]: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  [Emotion.STORMY]: 'bg-slate-100 text-slate-700 border-slate-200',
  [Emotion.JOYFUL]: 'bg-rose-50 text-rose-700 border-rose-100',
  [Emotion.NOSTALGIC]: 'bg-stone-50 text-stone-700 border-stone-100',
  [Emotion.INSPIRED]: 'bg-purple-50 text-purple-700 border-purple-100',
  [Emotion.LONELY]: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  [Emotion.GRATEFUL]: 'bg-teal-50 text-teal-700 border-teal-100',
};

export const SEASON_STYLES: Record<Season, string> = {
  [Season.DEFAULT]: 'from-bd-green/90 to-emerald-800',
  [Season.GRISHMA]: 'from-orange-500 to-red-600',
  [Season.BARSHA]: 'from-slate-600 to-blue-800',
  [Season.SARAT]: 'from-sky-400 to-blue-500',
  [Season.HEMANTA]: 'from-amber-400 to-orange-500',
  [Season.SHEET]: 'from-gray-300 to-slate-500',
  [Season.BASANTA]: 'from-yellow-400 to-red-400',
};

export const CURRENT_USER: UserProfile = {
  id: 'me',
  name: 'Tanvir Hasan',
  banglaName: 'তানভীর হাসান',
  handle: '@tanvir_dhaka',
  avatar: 'https://picsum.photos/seed/me/200/200',
  coverImage: 'https://picsum.photos/seed/cover/800/300',
  bio: 'Chasing sunsets in Charukola. Lover of rain, tea, and Tagore.',
  hometown: 'Barisal',
  badges: ['Pitha Master', 'Rain Lover', 'Top Contributor'],
  currentEmotion: Emotion.PEACEFUL,
  currentEmotionNote: '',
  stats: {
    posts: 142,
    followers: 890,
    following: 120
  },
  theme: Season.DEFAULT
};

export const FAMILY_MEMBERS: FamilyMember[] = [
  { id: 'f1', name: 'Rafiq Hasan', relation: 'Father', avatar: 'https://picsum.photos/seed/dad/100/100' },
  { id: 'f2', name: 'Nasrin Begum', relation: 'Mother', avatar: 'https://picsum.photos/seed/mom/100/100' },
  { id: 'f3', name: 'Rina Akter', relation: 'Sister', avatar: 'https://picsum.photos/seed/sis/100/100' },
];

export const HASHTAGS = [
  { id: 'h1', tag: '#বৃষ্টিভেজাস্মৃতি', label: 'Rainy Memories' },
  { id: 'h2', tag: '#পিঠাপুলি', label: 'Pitha Puli' },
  { id: 'h3', tag: '#গ্রামের_পথে', label: 'Village Roads' },
  { id: 'h4', tag: '#বাউল_মন', label: 'Baul Mind' },
];

export const FONT_OPTIONS: FontOption[] = [
  { id: 'default', name: 'Default', class: 'font-sans', label: 'Normal' },
  { id: 'river', name: 'Riverine', class: 'font-galada', label: 'Nodi' },
  { id: 'bamboo', name: 'Bamboo', class: 'font-mina', label: 'Bash' },
];

export const EXPLORE_CATEGORIES: ExploreCategory[] = [
  { id: 'cat1', label: 'Literature', banglaLabel: 'সাহিত্য', icon: 'book-open', color: 'bg-amber-100 text-amber-800', image: 'https://picsum.photos/seed/lit/300/200' },
  { id: 'cat2', label: 'Music', banglaLabel: 'সংগীত', icon: 'music', color: 'bg-rose-100 text-rose-800', image: 'https://picsum.photos/seed/music/300/200' },
  { id: 'cat3', label: 'Cooking', banglaLabel: 'রান্না', icon: 'utensils', color: 'bg-orange-100 text-orange-800', image: 'https://picsum.photos/seed/cook/300/200' },
  { id: 'cat4', label: 'Heritage', banglaLabel: 'ঐতিহ্য', icon: 'landmark', color: 'bg-stone-100 text-stone-800', image: 'https://picsum.photos/seed/history/300/200' },
];

export const SAMPLE_POSTS_EN: Post[] = [
  {
    id: '1',
    author: 'Ayesha Khan',
    avatar: 'https://picsum.photos/seed/ayesha/100/100',
    content: 'The smell of wet earth after the first rain of Boishakh is something else. Missing my village home in Sylhet today.',
    emotion: Emotion.RAINY,
    likes: 42,
    timestamp: '2h ago',
    location: 'Dhaka',
    image: 'https://picsum.photos/seed/rain/600/400',
    font: 'font-sans'
  },
  {
    id: '2',
    author: 'Rahim Uddin',
    avatar: 'https://picsum.photos/seed/rahim/100/100',
    content: 'Just finished harvesting the golden paddy. The fields look like gold under the sun. Alhumdulillah.',
    emotion: Emotion.SUNNY,
    likes: 128,
    timestamp: '5h ago',
    location: 'Comilla',
    image: 'https://picsum.photos/seed/paddy/600/400',
    font: 'font-sans'
  }
];

export const SAMPLE_POSTS_BN: Post[] = [
  {
    id: '1',
    author: 'আয়েশা খান',
    avatar: 'https://picsum.photos/seed/ayesha/100/100',
    content: 'বৈশাখের প্রথম বৃষ্টির পর মাটির সোঁদা গন্ধটাই আলাদা। আজ সিলেটের গ্রামের কথা খুব মনে পড়ছে।',
    emotion: Emotion.RAINY,
    likes: 42,
    timestamp: '২ ঘণ্টা আগে',
    location: 'ঢাকা',
    image: 'https://picsum.photos/seed/rain/600/400',
    font: 'font-galada'
  },
  {
    id: '2',
    author: 'রহিম উদ্দিন',
    avatar: 'https://picsum.photos/seed/rahim/100/100',
    content: 'সোনালী ধান কাটা শেষ করলাম। রোদে মাঠগুলো সোনার মতো জ্বলজ্বল করছে। আলহামদুলিল্লাহ।',
    emotion: Emotion.SUNNY,
    likes: 128,
    timestamp: '৫ ঘণ্টা আগে',
    location: 'কুমিল্লা',
    image: 'https://picsum.photos/seed/paddy/600/400',
    font: 'font-mina'
  }
];

export const SAMPLE_POSTS = SAMPLE_POSTS_EN; // Default export type

export const MARKET_ITEMS: MarketItem[] = [
  {
    id: 'm1',
    title: 'Nakshi Kantha Quilt',
    price: '৳ 2,500',
    seller: 'Jamalpur Crafts',
    image: 'https://picsum.photos/seed/kantha/400/400',
    location: 'Jamalpur',
    type: 'Textile',
    rating: 4.8,
    reviews: [
      { id: 'r1', author: 'Sadia', rating: 5, comment: 'Beautiful intricate work! Worth every taka.', date: '2d ago' },
      { id: 'r2', author: 'Kamal', rating: 4, comment: 'Delivery was a bit slow, but product is great.', date: '1w ago' }
    ]
  },
  {
    id: 'm2',
    title: 'Narkel Pitha Box',
    price: '৳ 500',
    seller: 'Mayer Dowa Kitchen',
    image: 'https://picsum.photos/seed/pitha/400/400',
    location: 'Dhaka',
    type: 'Food',
    rating: 4.5,
    reviews: []
  },
  {
    id: 'm3',
    title: 'Terracotta Vase',
    price: '৳ 800',
    seller: 'Mrittika Art',
    image: 'https://picsum.photos/seed/pottery/400/400',
    location: 'Bogra',
    type: 'Handicraft',
    rating: 5.0,
    reviews: []
  },
  {
    id: 'm4',
    title: 'Organic Honey',
    price: '৳ 1,200',
    seller: 'Sundarban Collections',
    image: 'https://picsum.photos/seed/honey/400/400',
    location: 'Khulna',
    type: 'Food',
    rating: 4.2,
    reviews: []
  },
  {
    id: 'm5',
    title: 'Jute Bag Set',
    price: '৳ 600',
    seller: 'Eco Bangla',
    image: 'https://picsum.photos/seed/jute/400/400',
    location: 'Faridpur',
    type: 'Handicraft',
    rating: 4.7,
    reviews: []
  }
];

export const REELS_DATA: Reel[] = [
   {
      id: 'r1',
      author: '@dhaka_foodie',
      videoUrl: 'https://picsum.photos/seed/foodreel/400/800',
      description: 'Best Fuchka in Dhanmondi? 🌶️ #dhakastreetfood #fuchka',
      likes: '12.4k',
      comments: '342',
      shares: '1.2k',
      song: 'Fuchka Lover - Remix'
   },
   {
      id: 'r2',
      author: '@travel_bd',
      videoUrl: 'https://picsum.photos/seed/sylhet/400/800',
      description: 'Morning vibes in Jaflong 🌿 #sylhet #travel',
      likes: '8.2k',
      comments: '120',
      shares: '500',
      song: 'Nature Sounds - Original'
   },
   {
      id: 'r3',
      author: '@artisan_crafts',
      videoUrl: 'https://picsum.photos/seed/weaving/400/800',
      description: 'The art of Jamdani weaving. A heritage. 🇧🇩 #jamdani',
      likes: '15k',
      comments: '890',
      shares: '2.3k',
      song: 'Weaving Beats'
   }
];

export const IMPACT_REQUESTS_EN: ImpactRequest[] = [
  {
    id: 'i1',
    type: 'BLOOD',
    title: 'Urgent: O+ Blood Needed',
    description: 'Patient at Square Hospital. Critical condition.',
    location: 'Dhaka',
    urgency: 'HIGH',
    status: 'OPEN'
  },
  {
    id: 'i2',
    type: 'ISSUE',
    title: 'Waterlogging in Mirpur 10',
    description: 'Main road blocked due to heavy rain since morning. Drains clogged.',
    location: 'Mirpur',
    urgency: 'MEDIUM',
    status: 'OPEN'
  }
];

export const IMPACT_REQUESTS_BN: ImpactRequest[] = [
  {
    id: 'i1',
    type: 'BLOOD',
    title: 'জরুরী: ও+ রক্ত প্রয়োজন',
    description: 'রোগী স্কয়ার হাসপাতালে। অবস্থা সংকটাপন্ন।',
    location: 'ঢাকা',
    urgency: 'HIGH',
    status: 'OPEN'
  },
  {
    id: 'i2',
    type: 'ISSUE',
    title: 'মিরপুর ১০ এ জলাবদ্ধতা',
    description: 'সকাল থেকে ভারি বৃষ্টির কারণে প্রধান সড়ক বন্ধ। ড্রেন জ্যাম।',
    location: 'মিরপুর',
    urgency: 'MEDIUM',
    status: 'OPEN'
  }
];

export const IMPACT_REQUESTS = IMPACT_REQUESTS_EN; // Default

export const EDUCATION_REQUESTS = [
  {
    id: 'e1',
    title: 'Math Tutor Needed',
    description: 'Looking for a volunteer to teach Math to 5 underprivileged kids in Rayer Bazar.',
    location: 'Rayer Bazar',
    urgency: 'MEDIUM'
  },
  {
    id: 'e2',
    title: 'NCTB Books for Class 8',
    description: 'A brilliant student needs a full set of used Class 8 books.',
    location: 'Savar',
    urgency: 'HIGH'
  }
];

export const VOLUNTEER_OPPORTUNITIES = [
  {
    id: 'v1',
    title: 'Buriganga Cleanup Drive',
    description: 'Join us this Friday morning to clean the river banks. Gloves provided.',
    location: 'Keraniganj',
    date: 'Friday, 8 AM'
  },
  {
    id: 'v2',
    title: 'Tree Planting Campaign',
    description: 'Planting 100 Neem trees in Uttara Sector 4 park.',
    location: 'Uttara',
    date: 'Saturday, 4 PM'
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    type: 'DIRECT',
    name: 'Ayesha Khan',
    avatar: 'https://picsum.photos/seed/ayesha/100/100',
    lastMessage: 'Are you coming to the Pitha Utsab?',
    timestamp: '10:30 AM',
    unreadCount: 2,
    participants: ['Ayesha Khan']
  },
  {
    id: 'c2',
    type: 'GROUP',
    name: 'Dhaka Foodies',
    avatar: 'https://picsum.photos/seed/foodies/100/100',
    lastMessage: 'Rahim: Best biryani in Old Dhaka?',
    timestamp: '9:45 AM',
    unreadCount: 0,
    participants: ['Rahim', 'Karim', 'Salma']
  },
  {
    id: 'c3',
    type: 'DIRECT',
    name: 'Jamalpur Crafts',
    avatar: 'https://picsum.photos/seed/kantha/100/100',
    lastMessage: 'Your order has been shipped!',
    timestamp: 'Yesterday',
    unreadCount: 0,
    participants: ['Jamalpur Crafts']
  }
];

export const PARA_NOTICES: ParaNotice[] = [
  {
    id: 'n1',
    title: 'Mosque Maintenance',
    content: 'The west wall painting will start tomorrow. Volunteers needed.',
    author: 'Committee',
    type: 'INFO',
    timestamp: '2h ago'
  },
  {
    id: 'n2',
    title: 'Electricity Maintenance',
    content: 'Power outage expected from 2PM to 5PM due to grid repair.',
    author: 'Palli Bidyut',
    type: 'ALERT',
    timestamp: '5h ago'
  },
  {
    id: 'n3',
    title: 'Baishakhi Fair Prep',
    content: 'First meeting at the School field this Friday.',
    author: 'Club Secretary',
    type: 'EVENT',
    timestamp: '1d ago'
  }
];

export const GAMES: Game[] = [
  {
    id: 'g1',
    title: 'Ludu Star BD',
    banglaTitle: 'লুডু স্টার',
    category: 'Board',
    image: 'https://picsum.photos/seed/ludu/200/200',
    players: '12k Playing'
  },
  {
    id: 'g2',
    title: 'Carrom Pro',
    banglaTitle: 'ক্যারাম প্রো',
    category: 'Board',
    image: 'https://picsum.photos/seed/carrom/200/200',
    players: '8k Playing'
  },
  {
    id: 'g3',
    title: 'Pitha Maker',
    banglaTitle: 'পিঠা কারিগর',
    category: 'Casual',
    image: 'https://picsum.photos/seed/pithamake/200/200',
    players: '15k Playing'
  },
  {
    id: 'g4',
    title: 'Kite Fighter',
    banglaTitle: 'ঘুড়ি যুদ্ধ',
    category: 'Action',
    image: 'https://picsum.photos/seed/kite/200/200',
    players: '5k Playing'
  }
];

export const RADIO_STATIONS: RadioStation[] = [
  { id: 'r1', name: 'Radio Foorti', frequency: '88.0 FM', currentTrack: 'Bondhu - Topu', image: 'https://picsum.photos/seed/radio1/100/100', listeners: 1500 },
  { id: 'r2', name: 'Bhoot FM', frequency: 'Online', currentTrack: 'Haunted Stories', image: 'https://picsum.photos/seed/radio2/100/100', listeners: 5000 },
  { id: 'r3', name: 'Dhaka FM', frequency: '90.4 FM', currentTrack: 'News Update', image: 'https://picsum.photos/seed/radio3/100/100', listeners: 3200 },
];

export const VIDEOS: VideoItem[] = [
  { id: 'v1', title: 'Aguner Poroshmoni', category: 'Classic Movie', thumbnail: 'https://picsum.photos/seed/movie1/300/200', duration: '2h 10m', views: '1.2M' },
  { id: 'v2', title: 'Beauty of Sundarbans', category: 'Documentary', thumbnail: 'https://picsum.photos/seed/doc1/300/200', duration: '45m', views: '500k' },
  { id: 'v3', title: 'Nazrul Geeti Live', category: 'Music', thumbnail: 'https://picsum.photos/seed/music1/300/200', duration: '1h 20m', views: '300k' },
];

export const PHOTO_POSTS: PhotoPost[] = [
  {
    id: 'p1',
    title: 'Old Dhaka Alleyway',
    photographer: 'Sabbir Ahmed',
    avatar: 'https://picsum.photos/seed/sabbir/100/100',
    imageUrl: 'https://picsum.photos/seed/olddhaka/800/600',
    location: 'Shankhari Bazar, Dhaka',
    exif: {
      camera: 'Sony A7III',
      lens: '35mm f/1.4',
      aperture: 'f/2.8',
      shutter: '1/125s',
      iso: '400'
    },
    description: 'The light filtering through the narrow lanes of Old Dhaka tells stories of centuries.',
    likes: 245
  },
  {
    id: 'p2',
    title: 'Fisherman at Sunset',
    photographer: 'Nadia Islam',
    avatar: 'https://picsum.photos/seed/nadia/100/100',
    imageUrl: 'https://picsum.photos/seed/river/800/600',
    location: 'Padma River',
    exif: {
      camera: 'Canon EOS R',
      lens: '85mm f/1.8',
      aperture: 'f/4',
      shutter: '1/500s',
      iso: '100'
    },
    description: 'The golden hour at Padma river is magical.',
    likes: 312
  },
  {
    id: 'p3',
    title: 'Tea Worker\'s Portrait',
    photographer: 'Tanvir Hasan',
    avatar: 'https://picsum.photos/seed/me/100/100',
    imageUrl: 'https://picsum.photos/seed/tea/800/600',
    location: 'Srimangal, Sylhet',
    exif: {
      camera: 'Fujifilm X-T4',
      lens: '56mm f/1.2',
      aperture: 'f/2',
      shutter: '1/250s',
      iso: '200'
    },
    description: 'A moment of pause amidst the lush green tea gardens.',
    likes: 189
  },
];

// Re-arranged Navigation for Better UX - 7 Items
// Layout: [Reels] [Explore] [Market] [HOME (Center)] [Impact] [Media] [Para]
export const NAV_ITEMS = [
  { id: View.REELS, label: 'Jhalmuri', icon: 'clapperboard' },
  { id: View.EXPLORE, label: 'Explore', icon: 'compass' },
  { id: View.MARKET, label: 'Bazaar', icon: 'store' },
  { id: View.HOME, label: 'Adda', icon: 'home' }, // Perfectly in the middle (index 3 of 7)
  { id: View.IMPACT, label: 'Impact', icon: 'heart-handshake' },
  { id: View.LIVE, label: 'Media', icon: 'play-circle' },
  { id: View.PARA, label: 'Para', icon: 'map-pin' },
];
