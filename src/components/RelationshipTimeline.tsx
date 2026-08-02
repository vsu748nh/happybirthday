import React, { useState } from 'react';
import { Heart, Sparkles, Coffee, Plane, Star, Gift, ArrowRight } from 'lucide-react';
import { birthdayConfig, TimelineItem } from '../birthdayConfig';
import { audioEngine } from '../utils/audioEngine';

interface RelationshipTimelineProps {
  onNext: () => void;
  isDarkMode: boolean;
}

export const RelationshipTimeline: React.FC<RelationshipTimelineProps> = ({ onNext, isDarkMode }) => {
  const [activeItem, setActiveItem] = useState<TimelineItem>(birthdayConfig.timeline[0]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'coffee': return <Coffee className="w-5 h-5 text-amber-400" />;
      case 'star': return <Star className="w-5 h-5 text-amber-300" />;
      case 'plane': return <Plane className="w-5 h-5 text-blue-400" />;
      case 'gift': return <Gift className="w-5 h-5 text-pink-400" />;
      default: return <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />;
    }
  };

  const handleSelectNode = (item: TimelineItem) => {
    audioEngine.playClick();
    setActiveItem(item);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-500 ${
      isDarkMode ? 'bg-slate-950 text-pink-100' : 'bg-gradient-to-b from-purple-950 via-slate-900 to-pink-950 text-white'
    }`}>
      
      {/* Title */}
      <div className="max-w-2xl w-full text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Our Love Journey</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-purple-300">
          Horizontal Milestone Timeline
        </h2>
        <p className="text-xs sm:text-sm text-pink-300/80 font-serif italic">
          Tap each chapter node below to re-live our magical memories!
        </p>
      </div>

      {/* Horizontal Scroll Nodes Container */}
      <div className="max-w-3xl w-full mb-8 overflow-x-auto pb-4 pt-2 no-scrollbar px-4">
        <div className="flex items-center min-w-max mx-auto space-x-6 relative">
          
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-6 right-6 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 -translate-y-1/2 z-0 rounded-full" />

          {birthdayConfig.timeline.map((item) => {
            const isSelected = activeItem.id === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectNode(item)}
                className={`relative z-10 flex flex-col items-center group transition-all duration-300 ${
                  isSelected ? 'scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Node Orb */}
                <div className={`w-12 h-12 rounded-full p-0.5 border-2 transition-all flex items-center justify-center shadow-lg ${
                  isSelected
                    ? 'bg-gradient-to-tr from-pink-500 to-amber-400 border-amber-300 shadow-pink-500/50'
                    : 'bg-slate-900 border-pink-500/30'
                }`}>
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                    {getIcon(item.icon)}
                  </div>
                </div>

                {/* Node Label */}
                <span className={`mt-2 text-xs font-serif font-semibold ${
                  isSelected ? 'text-amber-300' : 'text-pink-300/70'
                }`}>
                  {item.date}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Selected Milestone Card */}
      <div className="max-w-xl w-full p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-pink-500/30 shadow-2xl backdrop-blur-xl z-10 animate-in fade-in zoom-in-95 space-y-4">
        <div className="aspect-video w-full rounded-2xl overflow-hidden border border-pink-500/20">
          <img
            src={activeItem.image}
            alt={activeItem.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20">
              {activeItem.date} • {activeItem.location}
            </span>
          </div>

          <h3 className="text-2xl font-serif font-bold text-pink-200">
            {activeItem.title}
          </h3>

          <p className="text-sm text-pink-200/90 font-serif leading-relaxed italic">
            "{activeItem.description}"
          </p>
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
          <span>Calculate Love Meter</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
