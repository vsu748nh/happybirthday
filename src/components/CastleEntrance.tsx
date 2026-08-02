import React from 'react';
import { Castle, Sparkles, Heart, Compass, ShieldCheck } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audioEngine';

interface CastleEntranceProps {
  onNext: () => void;
  isDarkMode: boolean;
}

export const CastleEntrance: React.FC<CastleEntranceProps> = ({ onNext, isDarkMode }) => {
  const handleBegin = () => {
    audioEngine.playStarCollect();
    onNext();
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 pt-20 sm:pt-24 text-center relative overflow-hidden transition-colors duration-500 ${
      isDarkMode ? 'bg-slate-950 text-pink-100' : 'bg-gradient-to-b from-purple-900 via-pink-900 to-slate-950 text-white'
    }`}>
      
      {/* Background Castle Silhouette Graphic */}
      <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
        <Castle className="w-[600px] h-[600px] text-pink-300 animate-pulse" />
      </div>

      {/* Floating Magic Glow Spheres */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-xl w-full p-8 sm:p-10 rounded-3xl backdrop-blur-2xl border border-pink-500/30 bg-slate-900/80 shadow-2xl relative z-10 space-y-6">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-widest shadow-inner">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Vương Quốc Tình Yêu Vĩnh Cửu</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-wide text-amber-200 drop-shadow-md leading-tight">
          Cổng Lâu Đài Cổ Tích
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg font-light text-pink-200/90 leading-relaxed font-serif italic">
          "Phía sau cánh cổng diệu kỳ này là hành trình lãng mạn được dành riêng cho em. Để mở được hộp quà sinh nhật hoàng gia, hãy tham gia trò chơi săn tìm Chìa Khóa Vàng nhé!"
        </p>

        {/* Floating Icons Display */}
        <div className="grid grid-cols-3 gap-3 py-3 border-y border-pink-500/20 text-xs text-pink-300">
          <div className="flex flex-col items-center gap-1">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span>Harry Potter Magic</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Castle className="w-6 h-6 text-pink-400" />
            <span>Disney Fairytale</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Heart className="w-6 h-6 text-purple-400 fill-purple-400" />
            <span>Infinite Love</span>
          </div>
        </div>

        {/* Begin Quest Button */}
        <button
          onClick={handleBegin}
          className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white font-serif font-bold text-xl shadow-xl hover:shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group border border-amber-300/40"
        >
          <Compass className="w-6 h-6 text-amber-200 group-hover:rotate-45 transition-transform" />
          <span>Begin Adventure</span>
          <Sparkles className="w-6 h-6 text-amber-300 group-hover:scale-125 transition-transform" />
        </button>

      </div>

    </div>
  );
};
