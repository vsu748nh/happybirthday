import React from 'react';
import { Sparkles, Heart, Crown, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audioEngine';

interface FinalSurpriseProps {
  onNext: () => void;
  isDarkMode: boolean;
}

export const FinalSurprise: React.FC<FinalSurpriseProps> = ({ onNext, isDarkMode }) => {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-500 relative overflow-hidden ${
      isDarkMode ? 'bg-slate-950 text-pink-100' : 'bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 text-white'
    }`}>
      
      {/* Blurred Background Halo */}
      <div 
        className="absolute inset-0 opacity-20 blur-3xl scale-125 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: `url(${birthdayConfig.finalSurprise.portraitUrl})` }}
      />

      {/* Floating Magic Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-pink-500/20 blur-3xl pointer-events-none animate-pulse" />

      {/* Header Badge */}
      <div className="max-w-xl w-full text-center mb-6 space-y-2 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-widest shadow">
          <Crown className="w-4 h-4 text-amber-400" />
          <span>The Crowned Jewel</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-purple-300">
          My Royal Princess
        </h2>
      </div>

      {/* Fullscreen Framed Romantic Portrait Card */}
      <div className="max-w-md w-full p-4 sm:p-6 rounded-3xl bg-slate-900/90 border-2 border-amber-400/50 shadow-2xl backdrop-blur-2xl z-10 space-y-6 relative group animate-in fade-in zoom-in-95">
        
        {/* Golden Crown Accent */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 p-2 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 shadow-xl border-2 border-slate-950 z-20">
          <Crown className="w-8 h-8 text-slate-950 fill-slate-950" />
        </div>

        {/* Portrait Image */}
        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-pink-400/30 shadow-inner">
          <img
            src={birthdayConfig.finalSurprise.portraitUrl}
            alt={birthdayConfig.recipientName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Floating Hearts Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-center space-y-2">
            <h3 className="text-2xl font-serif font-bold text-amber-300">
              {birthdayConfig.finalSurprise.quoteTitle}
            </h3>
            <p className="text-xs sm:text-sm text-pink-100/90 font-serif italic leading-relaxed">
              "{birthdayConfig.finalSurprise.quoteBody}"
            </p>
          </div>
        </div>

        {/* Special Promise Banner */}
        <div className="p-4 rounded-2xl bg-pink-950/50 border border-pink-500/30 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs text-pink-300 font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>Forever Promise</span>
          </div>
          <p className="text-xs text-pink-200/90 font-serif italic">
            "{birthdayConfig.finalSurprise.specialPromise}"
          </p>
        </div>

      </div>

      {/* Next Scene Action Button */}
      <div className="mt-8 z-10">
        <button
          onClick={() => {
            audioEngine.playClick();
            onNext();
          }}
          className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 text-white font-serif font-bold text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>Final Farewell & Wishes</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
