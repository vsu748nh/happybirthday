import React, { useState, useEffect } from 'react';
import { ScrollText, Play, Pause, FastForward, RotateCcw, Heart, ArrowRight } from 'lucide-react';
import { BirthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audioEngine';

interface TypewriterLetterProps {
  onNext: () => void;
  isDarkMode: boolean;
  config: BirthdayConfig;
}

export const TypewriterLetter: React.FC<TypewriterLetterProps> = ({ onNext, isDarkMode, config }) => {
  const bodyText = [
    config.letter.title,
    "",
    ...config.letter.paragraphs,
  ].join("\n\n");

  const fullTextLength = bodyText.length + config.letter.closing.length + config.letter.signature.length + 10;

  const [displayedLength, setDisplayedLength] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || displayedLength >= fullTextLength) return;

    const timer = setTimeout(() => {
      setDisplayedLength((prev) => prev + 1);
      // Soft click sound occasionally while typing
      if (displayedLength % 12 === 0) {
        audioEngine.playClick();
      }
    }, config.letter.typewriterSpeedMs || 35);

    return () => clearTimeout(timer);
  }, [displayedLength, isPlaying, fullTextLength, config.letter.typewriterSpeedMs]);

  const handleTogglePlay = () => {
    audioEngine.playClick();
    setIsPlaying(!isPlaying);
  };

  const handleSkip = () => {
    audioEngine.playClick();
    setDisplayedLength(fullTextLength);
    setIsPlaying(false);
  };

  const handleRestart = () => {
    audioEngine.playClick();
    setDisplayedLength(0);
    setIsPlaying(true);
  };

  const isFinished = displayedLength >= fullTextLength;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 pt-20 sm:pt-24 transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-slate-950 via-pink-950/60 to-rose-950/40 text-pink-100' 
        : 'bg-gradient-to-b from-rose-50 via-pink-50 to-white text-slate-800'
    }`}>
      
      {/* Hero Title */}
      <div className="max-w-xl w-full text-center mb-6 space-y-1">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-600 dark:text-pink-300 text-xs font-heading font-semibold uppercase tracking-wider shadow">
          <ScrollText className="w-3.5 h-3.5" />
          <span>Thư Lời Chúc Yêu Thương</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-hero font-bold text-pink-600 dark:text-pink-300 drop-shadow-md">
          Gửi Tới Công Chúa Của Anh
        </h1>
      </div>

      {/* Warm White & Soft Pink Letter Card */}
      <div className={`max-w-xl w-full p-6 sm:p-10 rounded-3xl backdrop-blur-xl border shadow-2xl relative transition-all ${
        isDarkMode
          ? 'bg-slate-900/90 border-pink-500/30 shadow-pink-500/10 text-pink-100'
          : 'bg-white/95 border-pink-200 shadow-pink-200/50 text-slate-800'
      }`}>
        
        {/* Wax Seal Badge Accent */}
        <div className="absolute -top-5 right-8 w-12 h-12 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 shadow-lg border-2 border-pink-200 flex items-center justify-center text-white">
          <Heart className="w-6 h-6 fill-white" />
        </div>

        {/* Letter Body Text - Poppins Regular */}
        <div className="min-h-[260px] sm:min-h-[300px] font-body text-sm sm:text-base leading-relaxed whitespace-pre-wrap tracking-wide space-y-4">
          <div>
            {bodyText.slice(0, displayedLength)}
          </div>

          {/* Signature Section - Dancing Script (1-2 lines) */}
          {displayedLength > bodyText.length && (
            <div className="pt-4 border-t border-pink-500/20 font-handwriting text-2xl sm:text-3xl text-pink-500 dark:text-pink-300 leading-snug">
              <div>{config.letter.closing}</div>
              <div className="font-bold text-3xl sm:text-4xl mt-1">{config.letter.signature}</div>
            </div>
          )}

          {!isFinished && <span className="inline-block w-2 h-5 ml-1 bg-pink-500 animate-pulse" />}
        </div>

        {/* Controls Toolbar: Pause/Play, Skip, Replay */}
        <div className="mt-8 pt-4 border-t border-pink-500/20 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-button font-medium">
            <button
              onClick={handleTogglePlay}
              className="px-3 py-1.5 rounded-xl bg-pink-500/20 border border-pink-400/30 text-pink-600 dark:text-pink-300 text-xs flex items-center gap-1.5 hover:bg-pink-500/30 transition"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? "Tạm dừng" : "Tiếp tục"}</span>
            </button>

            {!isFinished && (
              <button
                onClick={handleSkip}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-600 dark:text-amber-300 text-xs flex items-center gap-1.5 hover:bg-amber-500/30 transition"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Xem tất cả</span>
              </button>
            )}

            <button
              onClick={handleRestart}
              className="p-1.5 rounded-xl bg-slate-500/20 text-slate-500 dark:text-slate-400 text-xs hover:bg-slate-500/30 transition"
              title="Phát lại thư"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-[10px] text-pink-500 font-button font-medium">
            {isFinished ? "100% Hoàn tất" : `${Math.floor((displayedLength / fullTextLength) * 100)}%`}
          </span>
        </div>

      </div>

      {/* Next Scene Action Button */}
      <div className="mt-8">
        <button
          onClick={() => {
            audioEngine.playClick();
            onNext();
          }}
          className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white font-button font-medium text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <span>Mở Nhạc Lãng Mạn</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
