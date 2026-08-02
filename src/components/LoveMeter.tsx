import React, { useState } from 'react';
import { Heart, Sparkles, Zap, Award, ArrowRight, RotateCcw } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audioEngine';
import { launchGrandConfettiShower } from '../utils/fxCanvas';

interface LoveMeterProps {
  onNext: () => void;
  isDarkMode: boolean;
}

export const LoveMeter: React.FC<LoveMeterProps> = ({ onNext, isDarkMode }) => {
  const [percent, setPercent] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const [statusMessageIndex, setStatusMessageIndex] = useState(0);

  const handleStartCalculate = () => {
    if (isCalculating) return;
    audioEngine.playClick();
    setIsCalculating(true);
    setIsOverflow(false);
    setPercent(0);

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 80 + 30);
      
      const msgIdx = Math.min(
        birthdayConfig.loveMeterMessages.length - 1,
        Math.floor((current / 1000) * birthdayConfig.loveMeterMessages.length)
      );
      setStatusMessageIndex(msgIdx);

      if (current >= 99999) {
        clearInterval(interval);
        setPercent(9999999999);
        setIsCalculating(false);
        setIsOverflow(true);
        audioEngine.playGiftOpen();
        audioEngine.playFirework();
        launchGrandConfettiShower();
      } else {
        setPercent(current);
        audioEngine.playClick();
      }
    }, 120);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-500 ${
      isDarkMode ? 'bg-slate-950 text-pink-100' : 'bg-gradient-to-b from-pink-900 via-purple-950 to-slate-950 text-white'
    }`}>
      
      {/* Header Title */}
      <div className="max-w-md w-full text-center mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-xs font-semibold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-amber-300" />
          <span>Love Intensity Scanner</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-purple-300">
          Quantum Love Meter
        </h2>
        <p className="text-xs sm:text-sm text-pink-300/80 font-serif italic">
          Press "Scan Our Love" to analyze our heart compatibility!
        </p>
      </div>

      {/* Main Glassmorphism Meter Card */}
      <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-pink-500/30 shadow-2xl backdrop-blur-xl relative z-10 text-center space-y-6">
        
        {/* Heart Container Liquid Fill Indicator */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto flex items-center justify-center">
          
          {/* Pulsing Aura */}
          <div className={`absolute inset-0 rounded-full bg-pink-500/20 transition-all ${
            isOverflow ? 'animate-ping bg-pink-500/40' : ''
          }`} />

          {/* Heart Graphic */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <Heart className={`w-32 h-32 sm:w-36 sm:h-36 transition-all duration-300 ${
              isOverflow
                ? 'text-pink-500 fill-pink-500 scale-125 drop-shadow-[0_0_25px_rgba(255,64,129,0.9)] animate-bounce'
                : 'text-pink-500/40 fill-pink-500/20'
            }`} />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
              {!isOverflow ? (
                <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-300 drop-shadow">
                  {percent.toLocaleString()}%
                </span>
              ) : (
                <span className="text-xl sm:text-2xl font-serif font-bold text-amber-300 drop-shadow animate-pulse">
                  LOVE OVERFLOW! ❤️
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="min-h-[48px] flex items-center justify-center px-4 py-2 rounded-2xl bg-pink-950/40 border border-pink-500/20 text-xs sm:text-sm font-serif italic text-pink-200">
          <span>{birthdayConfig.loveMeterMessages[statusMessageIndex]}</span>
        </div>

        {/* Action Button */}
        {!isOverflow ? (
          <button
            onClick={handleStartCalculate}
            disabled={isCalculating}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 text-white font-serif font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>{isCalculating ? "Scanning Soulmate Signal..." : "Scan Our Love"}</span>
          </button>
        ) : (
          <div className="space-y-4 animate-in fade-in zoom-in-95">
            {/* Love Certificate Badge */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs font-serif space-y-1">
              <div className="flex items-center justify-center gap-1.5 font-bold text-sm">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Certified Soulmates Forever</span>
              </div>
              <p className="text-[11px] text-pink-200/80">
                "Warning: Heart capacity exceeded limits! Guaranteed lifetime of infinite warmth and love."
              </p>
            </div>

            <button
              onClick={handleStartCalculate}
              className="text-xs text-pink-400 underline hover:text-pink-300 flex items-center justify-center gap-1 mx-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Re-scan Love Level
            </button>
          </div>
        )}

      </div>

      {/* Next Scene Action Button */}
      <div className="mt-8">
        <button
          onClick={() => {
            audioEngine.playClick();
            onNext();
          }}
          className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 text-white font-serif font-bold text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <span>Bring Out Birthday Cake</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
