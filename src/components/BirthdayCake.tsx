import React, { useState } from 'react';
import { Sparkles, Flame, ArrowRight, Heart, CheckCircle2 } from 'lucide-react';
import { BirthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audioEngine';
import { launchGrandConfettiShower } from '../utils/fxCanvas';

interface BirthdayCakeProps {
  onNext: () => void;
  isDarkMode: boolean;
  config: BirthdayConfig;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ onNext, isDarkMode, config }) => {
  // 5 Candles on the cake
  const [candles, setCandles] = useState<boolean[]>([true, true, true, true, true]);
  const [allExtinguished, setAllExtinguished] = useState(false);

  const handleTapFlame = (index: number) => {
    if (!candles[index]) return; // Already extinguished

    audioEngine.playCandleBlow();
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    // Check if all candles are now extinguished
    const remaining = newCandles.filter((c) => c).length;
    if (remaining === 0) {
      setAllExtinguished(true);
      setTimeout(() => {
        audioEngine.playGiftOpen();
        audioEngine.playFirework();
        launchGrandConfettiShower();
      }, 400);
    }
  };

  const litCount = candles.filter((c) => c).length;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 pt-20 sm:pt-24 transition-colors duration-500 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-b from-slate-950 via-pink-950/70 to-amber-950/40 text-pink-100' 
        : 'bg-gradient-to-b from-pink-100 via-rose-100 to-amber-100 text-slate-800'
    }`}>
      
      {/* Background Soft Glow Lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-amber-300/20 blur-3xl pointer-events-none animate-pulse" />

      {/* Title & Instructions */}
      <div className="max-w-md w-full text-center mb-6 space-y-2 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-600 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider shadow">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Bánh Sinh Nhật Diệu Kỳ</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-pink-600 dark:text-amber-200 drop-shadow-md">
          Ước Một Điều Ước, {config.recipientName}!
        </h2>

        <p className="text-xs sm:text-sm text-pink-700 dark:text-pink-300/90 font-serif italic">
          {!allExtinguished ? (
            <span className="flex items-center justify-center gap-1">
              Chạm vào ngọn từng cái nến để dập tắt 🕯️ (Còn <strong className="text-amber-500 dark:text-amber-300 font-sans font-bold">{litCount}</strong>/5 nến)
            </span>
          ) : (
            "Tất cả nến đã tắt! Điều ước sinh nhật của em đã gửi tới các vì sao ✨"
          )}
        </p>
      </div>

      {/* Birthday Cake Graphic & Clickable Candle Flames */}
      <div className="relative z-10 my-4 flex flex-col items-center animate-in slide-in-from-bottom-12 duration-700">
        
        {/* Glowing Aura Behind Candles */}
        <div className={`absolute -inset-8 rounded-full bg-amber-400/30 blur-3xl transition-opacity duration-700 pointer-events-none ${
          !allExtinguished ? 'opacity-100 animate-pulse' : 'opacity-10'
        }`} />

        {/* 5 Interactive Candles */}
        <div className="flex items-end justify-center gap-3 sm:gap-5 mb-2 z-20">
          {candles.map((isLit, idx) => (
            <div key={idx} className="relative flex flex-col items-center group">
              
              {/* Flame (Clickable/Tappable) */}
              {isLit ? (
                <button
                  onClick={() => handleTapFlame(idx)}
                  className="relative w-6 h-9 mb-1 flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-125 active:scale-95 group-hover:drop-shadow-[0_0_12px_rgba(251,191,36,1)]"
                  title="Nhấn để tắt nến"
                  aria-label={`Blow candle ${idx + 1}`}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white blur-xs shadow-[0_0_15px_rgba(255,215,0,0.9)] animate-pulse" />
                  <Flame className="w-5 h-8 text-amber-300 fill-amber-300 relative z-10" />
                </button>
              ) : (
                /* Smoke Trail when extinguished */
                <div className="h-9 mb-1 flex flex-col items-center justify-end opacity-70 animate-fade-out">
                  <div className="w-1.5 h-4 bg-slate-400 rounded-full blur-xs animate-bounce" />
                  <div className="w-2.5 h-2.5 bg-slate-300/40 rounded-full blur-xs -mt-1" />
                </div>
              )}

              {/* Candle Body */}
              <div className="w-3.5 sm:w-4 h-12 sm:h-14 rounded-t-sm bg-gradient-to-b from-pink-300 via-rose-300 to-pink-400 border border-amber-300/60 shadow-md flex flex-col items-center justify-between py-1">
                <div className="w-1 h-1 bg-amber-400/60 rounded-full" />
                <div className="w-1 h-1 bg-amber-400/60 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Tiered Pastel Pink Birthday Cake */}
        <div className="flex flex-col items-center z-10">
          
          {/* Top Tier */}
          <div className="w-48 sm:w-56 h-16 sm:h-20 rounded-t-3xl bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 border-2 border-amber-300/80 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-3 bg-pink-400/30 rounded-full" />
            
            {/* Age Badge Topper */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/30 border border-amber-300 text-amber-900 font-bold text-xs shadow-sm mb-0.5 animate-bounce">
              <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
              <span>Mừng Tuổi {config.ageNumber || 20}</span>
            </div>

            <span className="text-xs sm:text-sm font-heading font-bold text-pink-900 tracking-wider uppercase">
              {config.recipientName}
            </span>
          </div>

          {/* Middle Tier */}
          <div className="w-64 sm:w-72 h-18 sm:h-22 rounded-t-3xl bg-gradient-to-r from-rose-300 via-pink-200 to-amber-200 border-2 border-amber-300/80 shadow-2xl flex items-center justify-center relative -mt-1 overflow-hidden">
            <div className="flex items-center gap-4">
              <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse" />
              <span className="text-2xl font-hero font-extrabold text-pink-700 drop-shadow-sm px-2">
                {config.ageNumber || 20}
              </span>
              <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>

          {/* Cake Stand Plate */}
          <div className="w-76 sm:w-88 h-6 rounded-full bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 border-2 border-amber-100 shadow-2xl -mt-1" />
        </div>

      </div>

      {/* Completion Status Card */}
      <div className="mt-6 z-10 max-w-sm w-full">
        {allExtinguished ? (
          <div className="p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-amber-400/50 text-center space-y-2 animate-in zoom-in-95 shadow-2xl">
            <div className="flex items-center justify-center gap-2 text-amber-500 dark:text-amber-300 font-serif font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Chúc Mừng Sinh Nhật!</span>
            </div>
            <p className="text-xs text-pink-800 dark:text-pink-200/90 font-serif italic">
              "Chúc em một tuổi mới ngập tràn niềm vui, hạnh phúc và mọi ước mơ đều trở thành hiện thực!"
            </p>
          </div>
        ) : (
          <div className="text-center p-3 rounded-xl bg-amber-500/10 border border-amber-400/30 text-xs text-amber-800 dark:text-amber-200">
            💡 <i>Mẹo: Nhấn vào ngọn lửa của từng chiếc nến để thổi tắt!</i>
          </div>
        )}
      </div>

      {/* Next Scene Action Button */}
      <div className="mt-8 z-10">
        <button
          onClick={() => {
            audioEngine.playClick();
            onNext();
          }}
          className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white font-serif font-bold text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>Xem Lời Kết Thúc</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
