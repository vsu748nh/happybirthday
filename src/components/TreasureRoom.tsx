import React, { useState } from 'react';
import { Gift, Key, Sparkles, ScrollText, Heart } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { launchGrandConfettiShower } from '../utils/fxCanvas';

interface TreasureRoomProps {
  onNext: () => void;
  isDarkMode: boolean;
  hasGoldenKey: boolean;
}

export const TreasureRoom: React.FC<TreasureRoomProps> = ({ onNext, isDarkMode, hasGoldenKey }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleOpenGift = () => {
    if (isOpened) return;
    audioEngine.playGiftOpen();
    setIsUnlocking(true);

    setTimeout(() => {
      setIsOpened(true);
      setIsUnlocking(false);
      launchGrandConfettiShower();
      audioEngine.playFirework();
    }, 600);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 pt-20 sm:pt-24 text-center relative overflow-hidden transition-colors duration-500 ${
      isDarkMode ? 'bg-gradient-to-b from-slate-950 via-pink-950 to-rose-950 text-pink-100' : 'bg-gradient-to-b from-pink-100 via-rose-100 to-pink-200 text-slate-800'
    }`}>
      
      {/* Background Magic Sparkles */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-400/20 blur-3xl pointer-events-none animate-pulse" />

      {/* Title */}
      <div className="max-w-md w-full mb-8 space-y-2 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-700 dark:text-pink-300 text-xs font-semibold uppercase tracking-widest shadow">
          <Key className="w-4 h-4 text-amber-500" />
          <span>Mở Hộp Quà Sinh Nhật</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-pink-600 dark:text-pink-300 drop-shadow-md">
          Món Quà Dành Tặng Công Chúa
        </h2>
        <p className="text-xs sm:text-sm text-pink-800 dark:text-pink-300/80 font-serif italic">
          {hasGoldenKey ? "Nhấn vào hộp quà lung linh để dùng Chìa Khóa Vàng mở ra bất ngờ!" : "Sử dụng Chìa Khóa Vàng của em để mở món quà bí mật!"}
        </p>
      </div>

      {/* Gift Box Container */}
      <div className="relative z-10 my-4 flex flex-col items-center">
        
        {/* Glowing Aura Behind Gift */}
        <div className={`absolute -inset-4 rounded-full bg-gradient-to-r from-pink-500 via-amber-400 to-purple-500 opacity-30 blur-2xl transition-all duration-700 ${
          isOpened ? 'scale-150 opacity-60' : 'animate-pulse'
        }`} />

        {/* Gift Box Interactive Element */}
        <button
          onClick={handleOpenGift}
          disabled={isOpened || isUnlocking}
          className={`relative group cursor-pointer transition-all duration-500 transform ${
            isUnlocking ? 'scale-110 rotate-3' : isOpened ? 'scale-105' : 'hover:scale-105 active:scale-95'
          }`}
        >
          {/* 3D Box Render */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-tr from-pink-600 via-purple-600 to-amber-500 p-1 shadow-2xl flex flex-col items-center justify-center border-2 border-amber-300/60">
            
            {/* Ribbon Decoration */}
            <div className="absolute inset-x-0 h-10 bg-amber-400/90 top-1/2 -translate-y-1/2 shadow-inner flex items-center justify-center">
              {!isOpened && <Key className="w-6 h-6 text-slate-900 animate-bounce" />}
            </div>
            <div className="absolute inset-y-0 w-10 bg-amber-400/90 left-1/2 -translate-x-1/2 shadow-inner" />

            {!isOpened ? (
              <div className="relative z-10 flex flex-col items-center space-y-2">
                <Gift className="w-16 h-16 text-white drop-shadow-lg group-hover:rotate-6 transition-transform" />
                <span className="text-xs font-serif font-bold text-amber-200 uppercase tracking-widest bg-slate-950/70 px-3 py-1 rounded-full border border-amber-400/30">
                  {isUnlocking ? "Turning Key..." : "Tap to Open"}
                </span>
              </div>
            ) : (
              <div className="relative z-10 flex flex-col items-center space-y-2 animate-in zoom-in-75">
                <Sparkles className="w-16 h-16 text-amber-300 animate-spin" />
                <span className="text-xs font-serif font-bold text-amber-200 uppercase tracking-widest bg-slate-950/70 px-3 py-1 rounded-full border border-amber-400/30">
                  Unwrapped!
                </span>
              </div>
            )}
          </div>
        </button>

      </div>

      {/* Revealed Scroll Content */}
      {isOpened && (
        <div className="mt-8 max-w-sm w-full p-6 rounded-3xl bg-slate-900/90 border border-amber-400/50 shadow-2xl z-20 space-y-4 animate-in fade-in slide-in-from-bottom-6">
          <div className="flex items-center justify-center gap-2 text-amber-300">
            <ScrollText className="w-6 h-6" />
            <span className="font-serif font-bold text-lg">A Handwritten Letter Appears!</span>
          </div>

          <p className="text-xs text-pink-200/90 font-serif italic">
            "Written with love, sealed with a kiss..."
          </p>

          <button
            onClick={() => {
              audioEngine.playClick();
              onNext();
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 text-white font-serif font-bold text-base shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5 text-pink-200 fill-pink-200" />
            <span>Read Birthday Letter</span>
          </button>
        </div>
      )}

    </div>
  );
};
