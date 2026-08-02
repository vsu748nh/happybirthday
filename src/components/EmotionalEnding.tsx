import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Send, RotateCcw, Share2, Check, Star } from 'lucide-react';
import { BirthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audioEngine';
import { launchGrandConfettiShower } from '../utils/fxCanvas';

interface EmotionalEndingProps {
  onRestart: () => void;
  isDarkMode: boolean;
  config: BirthdayConfig;
}

export const EmotionalEnding: React.FC<EmotionalEndingProps> = ({ onRestart, isDarkMode, config }) => {
  const [userWish, setUserWish] = useState("");
  const [wishesList, setWishesList] = useState<string[]>([
    "Chúc tình yêu của chúng mình mãi mãi bền chặt, ngọt ngào và hạnh phúc! 🌸",
    "Mong rằng mọi giấc mơ của em đều sẽ trở thành hiện thực rạng rỡ! ✨"
  ]);
  const [copied, setCopied] = useState(false);

  // Trigger continuous magical fireworks and confetti on mount
  useEffect(() => {
    launchGrandConfettiShower();
    const timer = setInterval(() => {
      audioEngine.playFirework();
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userWish.trim()) return;
    audioEngine.playStarCollect();
    setWishesList((prev) => [userWish.trim(), ...prev]);
    setUserWish("");
    launchGrandConfettiShower();
  };

  const handleShare = () => {
    audioEngine.playClick();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 pt-20 sm:pt-24 transition-colors duration-500 relative overflow-hidden bg-gradient-to-br from-pink-600 via-purple-700 to-indigo-900 text-white`}>
      
      {/* Pink-Purple Aurora Light Waves Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-400/30 via-purple-600/30 to-transparent blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-pink-500/20 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-purple-500/20 blur-3xl pointer-events-none animate-pulse" />

      {/* Floating Hearts Overlay Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300/40 animate-bounce"
            style={{
              left: `${(i * 8.5) % 95}%`,
              top: `${(i * 12 + 10) % 85}%`,
              animationDuration: `${3 + (i % 4)}s`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            <Heart className="w-6 h-6 fill-pink-300/30" />
          </div>
        ))}
      </div>

      {/* Central Emotional Card */}
      <div className="max-w-xl w-full p-8 sm:p-10 rounded-3xl bg-slate-950/80 border border-pink-400/40 shadow-2xl backdrop-blur-2xl z-10 text-center space-y-6 animate-in fade-in zoom-in-95">
        
        {/* Pulsing Heart Crest */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-pink-500/40 animate-ping" />
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-amber-300 p-0.5 shadow-xl flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
              <Heart className="w-8 h-8 text-pink-400 fill-pink-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Final Emotional Text */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-hero font-bold text-amber-200 drop-shadow-md">
            Chúc Mừng Sinh Nhật {config.recipientName} ❤️
          </h1>
          <p className="text-xl sm:text-2xl text-pink-200 font-handwriting italic">
            "Cảm ơn em đã xuất hiện và làm cho cuộc đời anh trở nên tuyệt vời nhất. Anh yêu em mãi mãi!"
          </p>
          <p className="text-sm font-handwriting font-bold text-pink-300">
            — {config.senderName}
          </p>
        </div>

        {/* Interactive Floating Wishes Jar */}
        <div className="pt-4 border-t border-pink-500/30 text-left space-y-3">
          <h3 className="text-xs font-serif font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400" />
            <span>Hũ Nguyện Ước Bí Mật</span>
          </h3>

          <form onSubmit={handleAddWish} className="flex gap-2">
            <input
              type="text"
              value={userWish}
              onChange={(e) => setUserWish(e.target.value)}
              placeholder="Nhập điều ước sinh nhật tại đây..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-pink-500/30 text-xs text-pink-100 placeholder-pink-400/50 focus:outline-none focus:border-pink-400 transition"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold hover:scale-105 transition flex items-center gap-1 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi Ước</span>
            </button>
          </form>

          {/* List of Submitted Wishes */}
          <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1">
            {wishesList.map((w, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-pink-950/50 border border-pink-500/30 text-xs text-pink-200 italic font-serif flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                <span>"{w}"</span>
              </div>
            ))}
          </div>
        </div>

        {/* Share & Replay Buttons */}
        <div className="pt-4 border-t border-pink-500/30 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleShare}
            className="w-full py-3 px-4 rounded-xl bg-slate-900/80 border border-pink-500/30 text-xs font-semibold text-pink-200 hover:bg-slate-800 transition flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-pink-400" />}
            <span>{copied ? "Đã Sao Chép Liên Kết Thiệp!" : "Chia Sẻ Thiệp Sinh Nhật"}</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playClick();
              onRestart();
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-xs font-serif font-bold text-white hover:scale-105 transition flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Phát Lại Hành Trình</span>
          </button>
        </div>

      </div>

    </div>
  );
};
