import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Disc, Music, Quote, Volume2, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audioEngine';

interface MusicPlayerProps {
  onNext: () => void;
  isDarkMode: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ onNext, isDarkMode }) => {
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const track = birthdayConfig.playlist[currentTrackIdx];

  const handlePlayPause = () => {
    audioEngine.playClick();
    if (isPlaying) {
      audioEngine.stopSynthBgm();
      setIsPlaying(false);
    } else {
      audioEngine.startSynthBgm();
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    audioEngine.playClick();
    setCurrentTrackIdx((prev) => (prev + 1) % birthdayConfig.playlist.length);
    if (!isPlaying) {
      audioEngine.startSynthBgm();
      setIsPlaying(true);
    }
  };

  const handlePrevTrack = () => {
    audioEngine.playClick();
    setCurrentTrackIdx((prev) => (prev - 1 + birthdayConfig.playlist.length) % birthdayConfig.playlist.length);
    if (!isPlaying) {
      audioEngine.startSynthBgm();
      setIsPlaying(true);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 pt-20 sm:pt-24 transition-colors duration-500 ${
      isDarkMode ? 'bg-slate-950 text-pink-100' : 'bg-gradient-to-b from-purple-900 via-pink-900 to-slate-950 text-white'
    }`}>
      
      {/* Title */}
      <div className="max-w-md w-full text-center mb-6 space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-xs font-semibold uppercase tracking-wider">
          <Music className="w-3.5 h-3.5 text-pink-400" />
          <span>Âm Nhạc Lãng Mạn Hoàng Gia</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-pink-300 drop-shadow-md">
          Giai Đệu Cổ Tích Của Chúng Ta
        </h2>
      </div>

      {/* Main Jukebox Player Card */}
      <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-pink-500/30 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        
        {/* Spinning Vinyl & Album Art */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center">
          
          {/* Vinyl Disc Behind */}
          <div className={`absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-slate-950 border-4 border-slate-800 shadow-xl flex items-center justify-center transition-transform duration-1000 ${
            isPlaying ? 'animate-spin' : ''
          }`} style={{ animationDuration: '8s' }}>
            <div className="w-16 h-16 rounded-full border-2 border-slate-700 bg-pink-950/80 flex items-center justify-center">
              <Disc className="w-8 h-8 text-pink-500" />
            </div>
          </div>

          {/* Album Cover Card */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-2xl border-2 border-pink-400/40 z-10">
            <img
              src={track.cover}
              alt={track.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>
        </div>

        {/* Track Title & Artist */}
        <div className="text-center space-y-1">
          <h3 className="text-xl font-serif font-bold text-pink-200">
            {track.title}
          </h3>
          <p className="text-xs text-pink-400 font-medium">
            {track.artist}
          </p>
        </div>

        {/* Lyrics / Romantic Quote Banner */}
        {track.lyricsQuote && (
          <div className="p-3 rounded-2xl bg-pink-950/40 border border-pink-500/20 text-xs text-pink-200/90 italic font-serif flex items-start gap-2 text-center justify-center">
            <Quote className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
            <span>"{track.lyricsQuote}"</span>
          </div>
        )}

        {/* Animated Visualizer Sound Waves */}
        <div className="flex items-center justify-center gap-1.5 h-6 my-2">
          {[40, 70, 30, 90, 50, 80, 40, 60, 100, 30, 70].map((h, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-pink-500 to-amber-400 transition-all duration-300"
              style={{
                height: isPlaying ? `${Math.max(15, Math.round(h * Math.random()))}%` : '15%',
              }}
            />
          ))}
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={handlePrevTrack}
            className="p-3 rounded-full bg-slate-800/80 text-pink-300 hover:bg-slate-700 transition active:scale-95"
            title="Previous Song"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={handlePlayPause}
            className="p-5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 text-white shadow-xl hover:scale-105 active:scale-95 transition"
            title={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
          </button>

          <button
            onClick={handleNextTrack}
            className="p-3 rounded-full bg-slate-800/80 text-pink-300 hover:bg-slate-700 transition active:scale-95"
            title="Next Song"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Volume & Audio Indicator Footer */}
        <div className="flex items-center justify-between text-xs text-pink-400/80 pt-2 border-t border-pink-500/20">
          <div className="flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-pink-400" />
            <span>Ambient Melody Synth</span>
          </div>
          <span>Track {currentTrackIdx + 1} of {birthdayConfig.playlist.length}</span>
        </div>

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
          <span>View Photo Gallery</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
