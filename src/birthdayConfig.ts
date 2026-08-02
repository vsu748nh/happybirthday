/**
 * Birthday Application Configuration
 * All text, dates, music, photos, and colors can be easily modified here!
 */

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  location: string;
  description: string;
  icon: 'heart' | 'star' | 'sparkles' | 'coffee' | 'plane' | 'gift' | 'music' | 'camera';
  image: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  date: string;
  image: string;
  caption: string;
  rotation?: number; // degree for Polaroid tilt
  location?: string;
  tags?: string[];
}

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audioUrl: string; // URL or Web Audio Synth preset
  duration: string;
  lyricsQuote?: string;
}

export interface BirthdayConfig {
  recipientName: string;
  senderName: string;
  birthdayDate: string; // e.g. "07 August 2026"
  ageNumber: number; // e.g. 20
  ageTitle: string; // e.g. "My Princess's Special Day"
  
  // Theme styling
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentGold: string;
    fontFamilyHeading: string;
    fontFamilyHandwritten: string;
    fontFamilyBody: string;
  };

  // Letter content
  letter: {
    title: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    typewriterSpeedMs: number;
  };

  // Music Playlist
  playlist: SongTrack[];

  // Photo Gallery
  photos: PhotoItem[];

  // Relationship Timeline
  timeline: TimelineItem[];

  // Love Meter Messages
  loveMeterMessages: string[];

  // Final Surprise & Wishes
  finalSurprise: {
    portraitUrl: string;
    quoteTitle: string;
    quoteBody: string;
    specialPromise: string;
  };
}

export const birthdayConfig: BirthdayConfig = {
  recipientName: "My Princess",
  senderName: "Your Forever Love",
  birthdayDate: "07 August 2026",
  ageNumber: 20,
  ageTitle: "Tuổi 20 Rạng Rỡ & Ngọt Ngào",

  theme: {
    primaryColor: "#FF80AB", // Soft Romantic Pink
    secondaryColor: "#D1C4E9", // Lavender Mist
    accentGold: "#FFD700", // Magical Gold
    fontFamilyHeading: "'Cinzel Decorative', 'Cinzel', serif",
    fontFamilyHandwritten: "'Dancing Script', 'Sacramento', cursive",
    fontFamilyBody: "'Plus Jakarta Sans', sans-serif",
  },

  letter: {
    title: "To My Dearest Princess & Soulmate",
    paragraphs: [
      "Happy Birthday, my love! On this magical day, August 7th, 2026, the stars aligned to bring the most beautiful soul into my world.",
      "Every single moment spent with you feels like stepping straight into a dreamy fairytale. Your laughter is my favorite song, your smile is my brightest light, and your gentle heart is my happiest home.",
      "Thank you for filling my days with warmth, endless joy, and magical memories that I will treasure forever. No matter how many birthdays pass, my love for you grows deeper with every beat of my heart.",
      "May this new chapter bring you infinite happiness, magical dreams fulfilled, laughter that warms your soul, and all the sweetness you truly deserve."
    ],
    closing: "With all my heart and eternal love,",
    signature: "Yours Forever & Always ❤️",
    typewriterSpeedMs: 38,
  },

  playlist: [
    {
      id: "track-1",
      title: "Fairytale Waltz of Love",
      artist: "Magical Symphony",
      cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80",
      audioUrl: "synth-romantic-waltz", // Handled by Audio Engine synthesizer
      duration: "03:45",
      lyricsQuote: "Like stars in the night sky, your love shines forever bright."
    },
    {
      id: "track-2",
      title: "Golden Hogwarts Stars",
      artist: "Dreamy Serenade",
      cover: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80",
      audioUrl: "synth-starlight-lullaby",
      duration: "04:12",
      lyricsQuote: "In every magical universe, I would choose you again and again."
    },
    {
      id: "track-3",
      title: "Forever Princess Symphony",
      artist: "Enchanted Strings",
      cover: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80",
      audioUrl: "synth-princess-theme",
      duration: "03:30",
      lyricsQuote: "Thank you for existing and making every day a fairytale."
    }
  ],

  photos: [
    {
      id: "p1",
      title: "Under the Magical Stars",
      date: "Our Unforgettable Night",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
      caption: "When I looked into your eyes, I saw my entire future shining back at me.",
      rotation: -3,
      location: "Starlight Garden",
      tags: ["Fairytale", "Magical", "Memories"]
    },
    {
      id: "p2",
      title: "Sweet Laughs & Coffee",
      date: "Our Favorite Cozy Afternoon",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      caption: "Your smile can instantly illuminate the darkest days.",
      rotation: 2.5,
      location: "Cozy Café",
      tags: ["Laughter", "Joy", "Together"]
    },
    {
      id: "p3",
      title: "Hand in Hand Forever",
      date: "Romantic Walk",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      caption: "Holding your hand is my favorite place in the whole wide world.",
      rotation: -2,
      location: "Sunset Promenade",
      tags: ["Romance", "Love", "Forever"]
    },
    {
      id: "p4",
      title: "Princess Moment",
      date: "Celebration Day",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
      caption: "You will always be the crowned princess of my heart.",
      rotation: 3,
      location: "Fairytale Kingdom",
      tags: ["Princess", "Golden", "Dream"]
    },
    {
      id: "p5",
      title: "Sparks & Fireworks",
      date: "New Year Wish",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      caption: "Every firework in the sky pales in comparison to your inner glow.",
      rotation: -1.5,
      location: "Celebration Tower",
      tags: ["Sparkles", "Celebration"]
    },
    {
      id: "p6",
      title: "A Promise of Always",
      date: "Unconditional Love",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80",
      caption: "I promise to cherish you, protect your smile, and hold you close forever.",
      rotation: 2,
      location: "Rose Castle",
      tags: ["Promise", "Eternity"]
    }
  ],

  timeline: [
    {
      id: "t1",
      date: "Chapter 1",
      title: "The Magical First Encounter",
      location: "Where It All Began",
      description: "The universe quietly plotted for us to cross paths, and my world changed forever.",
      icon: "sparkles",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "t2",
      date: "Chapter 2",
      title: "Our First Cozy Coffee Date",
      location: "Warm Haven",
      description: "Hours flew by like minutes. We talked about everything under the sun and realized we were soulmates.",
      icon: "coffee",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "t3",
      date: "Chapter 3",
      title: "Under the Hogwarts Starlight",
      location: "Enchanted Garden",
      description: "A night filled with laughter, secret whispers, and holding hands under a canopy of shooting stars.",
      icon: "star",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "t4",
      date: "Chapter 4",
      title: "Unforgettable Journey Together",
      location: "Dreamy Horizon",
      description: "Exploring new places, taking hundreds of cute photos, and realizing home is wherever you are.",
      icon: "plane",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "t5",
      date: "Today & Forever",
      title: "Happy Birthday My Princess!",
      location: "Right Here in My Arms",
      description: "Celebrating another glorious year of your life. May our fairytale continue for a hundred lifetimes!",
      icon: "heart",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=600&q=80"
    }
  ],

  loveMeterMessages: [
    "Analyzing Heartbeat Resonance...",
    "Scanning Sweet Smiles...",
    "Measuring Hug Comfort Level...",
    "Counting Infinite Kisses...",
    "Calculating Soulmate Synchronicity...",
    "WARNING: Love levels exceeding safe thresholds!",
    "CRITICAL: Heart storage overload! ❤️",
    "9999999999% LOVE OVERFLOW ATTAINED!"
  ],

  finalSurprise: {
    portraitUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
    quoteTitle: "You Are My Happily Ever After",
    quoteBody: "If I had a single flower for every time I thought of you, I could walk through my garden forever. Happy Birthday, my beautiful princess!",
    specialPromise: "I promise to love you, cherish you, and bring magic into your life every single day."
  }
};
