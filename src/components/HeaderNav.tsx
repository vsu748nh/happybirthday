import React, { useState } from 'react';
import { Volume2, VolumeX, Moon, Sun, Menu, X, Sparkles, Heart, Edit3 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface HeaderNavProps {
  currentScene: number;
  totalScenes: number;
  onSelectScene: (sceneIndex: number) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  hasGoldenKey: boolean;
  onOpenEditor: () => void;
}

const SCENE_NAMES = [
  "1. Mở Đầu Cổ Tích",
  "2. Cổng Lâu Đài",
  "3. Săn Tìm Chìa Khóa Vàng",
  "4. Hộp Quà Sinh Nhật",
  "5. Thư Lời Chúc Yêu Thương",
  "6. Nhạc Lãng Mạn",
  "7. Album Kỷ Niệm",
  "8. Thổi Nến Sinh Nhật",
  "9. Lời Kết Thúc & Ước Nguyện"
];

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentScene,
  totalScenes,
  onSelectScene,
  isDarkMode,
  onToggleDarkMode,
  hasGoldenKey,
  onOpenEditor,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(audioEngine.isMuted());

  const handleToggleSound = () => {
    audioEngine.playClick();
    const newMuteState = !isMuted;
    audioEngine.setMuted(newMuteState);
    setIsMuted(newMuteState);
  };

  const handleSelect = (idx: number) => {
    audioEngine.playClick();
    onSelectScene(idx);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Progress & Scene Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              audioEngine.playClick();
              setIsMenuOpen(!isMenuOpen);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs sm:text-sm font-medium transition-all shadow-lg backdrop-blur-md ${
              isDarkMode 
                ? 'bg-slate-900/80 border-pink-500/30 text-pink-200 hover:bg-slate-800' 
                : 'bg-white/80 border-pink-200 text-pink-800 hover:bg-pink-50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline font-serif">
              Cảnh {currentScene + 1}/{totalScenes}:
            </span>
            <span className="font-semibold">{SCENE_NAMES[currentScene] || "Cổ Tích"}</span>
            <Menu className="w-4 h-4 ml-1 opacity-70" />
          </button>

          {/* Quick Scene Menu Modal */}
          {isMenuOpen && (
            <div className={`absolute top-12 left-0 w-72 max-h-[80vh] overflow-y-auto rounded-2xl p-2 shadow-2xl border backdrop-blur-xl transition-all animate-in fade-in zoom-in-95 ${
              isDarkMode ? 'bg-slate-900/95 border-pink-500/30 text-pink-100' : 'bg-white/95 border-pink-200 text-slate-800'
            }`}>
              <div className="flex items-center justify-between p-2 border-b border-pink-200/20 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1">
                  <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> Danh Sách Cảnh
                </span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-pink-500/20 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                {SCENE_NAMES.map((name, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm transition flex items-center justify-between ${
                      currentScene === idx
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow'
                        : isDarkMode
                          ? 'hover:bg-slate-800 text-pink-200/80'
                          : 'hover:bg-pink-50 text-slate-700'
                    }`}
                  >
                    <span>{name}</span>
                    {currentScene === idx && <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Controls: Edit Content Button, Golden Key, Sound Toggle, Dark Mode Toggle */}
        <div className="flex items-center gap-2">
          
          {/* Edit Content Button */}
          <button
            onClick={() => {
              audioEngine.playClick();
              onOpenEditor();
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-semibold shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 ${
              isDarkMode
                ? 'bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 border-pink-500/40 text-pink-200 hover:bg-pink-500/30'
                : 'bg-white/90 border-pink-300 text-pink-700 hover:bg-pink-50'
            }`}
            title="Sửa nội dung & ảnh"
          >
            <Edit3 className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden xs:inline">Sửa Nội Dung</span>
          </button>

          {hasGoldenKey && (
            <div className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold backdrop-blur-md animate-bounce shadow-lg">
              <span>🔑</span>
              <span>Đã Có Chìa Khóa Vàng</span>
            </div>
          )}

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label="Toggle sound"
            className={`p-2.5 rounded-full border shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 ${
              isDarkMode
                ? 'bg-slate-900/80 border-pink-500/30 text-pink-300 hover:bg-slate-800'
                : 'bg-white/80 border-pink-200 text-pink-600 hover:bg-pink-50'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-pink-500 animate-pulse" />}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => {
              audioEngine.playClick();
              onToggleDarkMode();
            }}
            aria-label="Toggle theme"
            className={`p-2.5 rounded-full border shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 ${
              isDarkMode
                ? 'bg-slate-900/80 border-pink-500/30 text-amber-300 hover:bg-slate-800'
                : 'bg-white/80 border-pink-200 text-purple-600 hover:bg-pink-50'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
};
