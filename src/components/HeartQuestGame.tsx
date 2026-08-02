import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Key, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { launchConfetti } from '../utils/fxCanvas';

interface HeartQuestGameProps {
  onCompleteKey: () => void;
  isDarkMode: boolean;
}

interface StarItem {
  id: number;
  x: number; // percentage
  y: number; // percentage
  collected: boolean;
}

interface ObstacleItem {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const HeartQuestGame: React.FC<HeartQuestGameProps> = ({ onCompleteKey, isDarkMode }) => {
  const [heartPos, setHeartPos] = useState({ x: 50, y: 80 }); // percentage
  const [stars, setStars] = useState<StarItem[]>([
    { id: 1, x: 20, y: 25, collected: false },
    { id: 2, x: 75, y: 20, collected: false },
    { id: 3, x: 50, y: 45, collected: false },
    { id: 4, x: 15, y: 65, collected: false },
    { id: 5, x: 80, y: 65, collected: false },
  ]);

  const [obstacles, setObstacles] = useState<ObstacleItem[]>([
    { id: 1, x: 35, y: 30, vx: 0.4, vy: 0.3 },
    { id: 2, x: 65, y: 55, vx: -0.3, vy: 0.4 },
    { id: 3, x: 40, y: 70, vx: 0.5, vy: -0.2 },
  ]);

  const [score, setScore] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [hitWarning, setHitWarning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Move Heart via keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isWon) return;
      const speed = 4;
      setHeartPos((prev) => {
        let newX = prev.x;
        let newY = prev.y;
        if (e.key === 'ArrowLeft' || e.key === 'a') newX = Math.max(5, prev.x - speed);
        if (e.key === 'ArrowRight' || e.key === 'd') newX = Math.min(95, prev.x + speed);
        if (e.key === 'ArrowUp' || e.key === 'w') newY = Math.max(5, prev.y - speed);
        if (e.key === 'ArrowDown' || e.key === 's') newY = Math.min(95, prev.y + speed);
        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWon]);

  // Touch / Drag Control
  const handleTouchOrClickMove = (clientX: number, clientY: number) => {
    if (isWon || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(95, Math.max(5, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.min(95, Math.max(5, ((clientY - rect.top) / rect.height) * 100));
    setHeartPos({ x, y });
  };

  // Obstacle Animation & Collision Loop
  useEffect(() => {
    if (isWon) return;

    const interval = setInterval(() => {
      // Move obstacles
      setObstacles((prevObs) =>
        prevObs.map((obs) => {
          let nx = obs.x + obs.vx;
          let ny = obs.y + obs.vy;
          let nvx = obs.vx;
          let nvy = obs.vy;

          if (nx < 10 || nx > 90) nvx = -nvx;
          if (ny < 15 || ny > 85) nvy = -nvy;

          return { ...obs, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );

      // Check collision with obstacles
      obstacles.forEach((obs) => {
        const dx = obs.x - heartPos.x;
        const dy = obs.y - heartPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 7) {
          setHitWarning(true);
          setTimeout(() => setHitWarning(false), 300);
        }
      });

      // Check collision with stars
      setStars((prevStars) => {
        let updatedScore = score;
        const newStars = prevStars.map((star) => {
          if (!star.collected) {
            const dx = star.x - heartPos.x;
            const dy = star.y - heartPos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 8) {
              audioEngine.playStarCollect();
              updatedScore++;
              return { ...star, collected: true };
            }
          }
          return star;
        });

        if (updatedScore !== score) {
          setScore(updatedScore);
          if (updatedScore >= 5) {
            setIsWon(true);
            audioEngine.playKeyUnlocked();
            launchConfetti();
          }
        }
        return newStars;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [heartPos, score, isWon, obstacles]);

  const handleResetGame = () => {
    audioEngine.playClick();
    setHeartPos({ x: 50, y: 80 });
    setScore(0);
    setIsWon(false);
    setStars([
      { id: 1, x: 20, y: 25, collected: false },
      { id: 2, x: 75, y: 20, collected: false },
      { id: 3, x: 50, y: 45, collected: false },
      { id: 4, x: 15, y: 65, collected: false },
      { id: 5, x: 80, y: 65, collected: false },
    ]);
  };

  const moveDir = (dx: number, dy: number) => {
    setHeartPos((prev) => ({
      x: Math.min(95, Math.max(5, prev.x + dx)),
      y: Math.min(95, Math.max(5, prev.y + dy)),
    }));
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 pt-20 sm:pt-24 transition-colors duration-500 ${
      isDarkMode ? 'bg-gradient-to-b from-slate-950 via-emerald-950 to-teal-950 text-emerald-100' : 'bg-gradient-to-b from-teal-900 via-emerald-800 to-slate-950 text-white'
    }`}>
      
      {/* Game Header */}
      <div className="max-w-xl w-full flex items-center justify-between mb-4 px-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-300 drop-shadow-md">
            Trò Chơi Săn Tìm Chìa Khóa Vàng
          </h2>
          <p className="text-xs text-amber-200/90 font-serif">Điều khiển trái tim thu thập đủ 5 ngôi sao vàng!</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-sm font-semibold shadow">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>{score} / 5</span>
          </div>

          <button
            onClick={handleResetGame}
            className="p-2 rounded-full bg-emerald-900/80 border border-amber-400/30 text-amber-300 hover:bg-emerald-800 transition"
            title="Reset Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Game Stage Arena */}
      <div
        ref={containerRef}
        onPointerMove={(e) => {
          if (e.buttons === 1) handleTouchOrClickMove(e.clientX, e.clientY);
        }}
        onPointerDown={(e) => handleTouchOrClickMove(e.clientX, e.clientY)}
        className={`max-w-xl w-full h-[380px] sm:h-[420px] rounded-3xl relative overflow-hidden border shadow-2xl backdrop-blur-xl transition-all touch-none select-none ${
          hitWarning ? 'border-red-500 shadow-red-500/50 bg-red-950/30' : 'border-amber-400/40 bg-emerald-950/80 shadow-emerald-500/20'
        }`}
      >
        {/* Helper Instructions Overlay */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-950/60 text-[10px] sm:text-xs text-pink-300 border border-pink-500/20 pointer-events-none z-10">
          Touch & Drag OR use WASD / Arrow Keys
        </div>

        {/* Player Controlled Heart */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 pointer-events-none z-20 flex flex-col items-center"
          style={{ left: `${heartPos.x}%`, top: `${heartPos.y}%` }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-pink-500/40 animate-ping" />
            <Heart className="w-9 h-9 text-pink-500 fill-pink-500 drop-shadow-[0_0_12px_rgba(255,64,129,0.8)]" />
          </div>
        </div>

        {/* Golden Stars to Collect */}
        {stars.map((star) =>
          !star.collected ? (
            <div
              key={star.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 animate-pulse pointer-events-none z-10"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
            >
              <div className="relative p-2">
                <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-md animate-ping" />
                <Sparkles className="w-8 h-8 text-amber-300 fill-amber-300 drop-shadow-[0_0_10px_rgba(255,215,0,0.9)]" />
              </div>
            </div>
          ) : null
        )}

        {/* Floating Broken Heart Obstacles */}
        {obstacles.map((obs) => (
          <div
            key={obs.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 text-xs text-slate-400"
            style={{ left: `${obs.x}%`, top: `${obs.y}%` }}
          >
            <div className="p-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 shadow">
              💔
            </div>
          </div>
        ))}

        {/* Victory Celebration Modal Overlay */}
        {isWon && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 animate-in fade-in zoom-in-95 space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-500 p-1 shadow-2xl animate-bounce">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-amber-300">
                <Key className="w-10 h-10" />
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-300">
              Golden Key Acquired!
            </h3>
            
            <p className="text-sm text-pink-200/90 max-w-xs font-serif italic">
              You have proven your love and unlocked the doorway to the Birthday Treasure Room!
            </p>

            <button
              onClick={() => {
                audioEngine.playGiftOpen();
                onCompleteKey();
              }}
              className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white font-serif font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Key className="w-5 h-5 text-amber-200" />
              <span>Unlock Treasure Room</span>
            </button>
          </div>
        )}
      </div>

      {/* Onscreen D-Pad Controls for Mobile Users */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <button
          onClick={() => moveDir(0, -8)}
          className="p-3 rounded-full bg-slate-800/80 border border-pink-500/30 text-pink-300 active:bg-pink-500 active:text-white transition shadow"
          aria-label="Up"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => moveDir(-8, 0)}
            className="p-3 rounded-full bg-slate-800/80 border border-pink-500/30 text-pink-300 active:bg-pink-500 active:text-white transition shadow"
            aria-label="Left"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => moveDir(0, 8)}
            className="p-3 rounded-full bg-slate-800/80 border border-pink-500/30 text-pink-300 active:bg-pink-500 active:text-white transition shadow"
            aria-label="Down"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
          <button
            onClick={() => moveDir(8, 0)}
            className="p-3 rounded-full bg-slate-800/80 border border-pink-500/30 text-pink-300 active:bg-pink-500 active:text-white transition shadow"
            aria-label="Right"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
};
