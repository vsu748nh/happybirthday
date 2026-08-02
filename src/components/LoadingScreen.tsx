import React, { useEffect, useState } from 'react';
import { Sparkles, Heart, Wand2 } from 'lucide-react';
import { BirthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audioEngine';

interface LoadingScreenProps {
  onComplete: () => void;
  isDarkMode: boolean;
  config: BirthdayConfig;
}

const LOADING_STATUSES = [
  "Đang kết vạch không gian cổ tích diệu kỳ...",
  "Tải trước những bức ảnh kỷ niệm ấm áp...",
  "Tổng hợp giai điệu âm nhạc lãng mạn...",
  "Làm mới các vì sao và những trái tim lung linh...",
  "Sẵn sàng món quà sinh nhật hoàng gia bất ngờ..."
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, isDarkMode, config }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8 + 4);
        const statusIdx = Math.min(
          LOADING_STATUSES.length - 1,
          Math.floor((next / 100) * LOADING_STATUSES.length)
        );
        setStatusIndex(statusIdx);
        return Math.min(100, next);
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    audioEngine.playStarCollect();
    audioEngine.startSynthBgm();
    onComplete();
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden transition-colors duration-500 bg-[#0B0314] text-pink-100`}>
      
      {/* Deep Purple Mysterious Starry Sky Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-950/80 via-[#0F051D] to-[#05010A] pointer-events-none" />

      {/* Twinkling Stars Canvas Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-80">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-200 animate-pulse"
            style={{
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDuration: `${1.5 + (i % 3)}s`,
              boxShadow: '0 0 8px rgba(253, 224, 71, 0.8)'
            }}
          />
        ))}
      </div>

      {/* Central Glassmorphism Card */}
      <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/80 border border-purple-500/40 shadow-2xl backdrop-blur-xl relative z-10">
        
        {/* Pulsing Magic Crest Icon */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-300 p-0.5 shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
              <Wand2 className="w-10 h-10 text-pink-400 animate-pulse" />
            </div>
          </div>
          <Heart className="absolute -top-1 -right-1 w-6 h-6 text-pink-500 fill-pink-500 animate-bounce" />
        </div>

        {/* Date & Title */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{config.birthdayDate}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-wide mb-2 text-amber-200 drop-shadow-md">
          Happy Birthday
        </h1>
        <p className="text-xl font-handwriting text-pink-300 mb-6 font-serif italic">
          {config.recipientName}
        </p>

        {/* Progress Bar or Action Button */}
        {!isReady ? (
          <div className="space-y-4">
            <div className="relative w-full h-3 bg-purple-950/60 rounded-full overflow-hidden p-0.5 border border-purple-500/30">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between text-xs text-purple-300 font-medium">
              <span>{LOADING_STATUSES[statusIndex]}</span>
              <span>{progress}%</span>
            </div>
          </div>
        ) : (
          <button
            onClick={handleStart}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-amber-400 text-white font-serif font-bold text-lg shadow-xl hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
          >
            <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>Mở Cửa Thế Giới Cổ Tích</span>
            <Heart className="w-5 h-5 text-pink-200 fill-pink-200 group-hover:scale-125 transition-transform" />
          </button>
        )}

      </div>

      {/* Floating Sparkle Quotes */}
      <p className="mt-8 text-xs text-purple-300/80 max-w-sm italic font-serif">
        "Mỗi câu chuyện tình yêu đều thật đẹp, nhưng câu chuyện của chúng mình là điều tuyệt vời nhất."
      </p>

    </div>
  );
};
