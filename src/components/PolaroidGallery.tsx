import React, { useState } from 'react';
import { Camera, Heart, X, MapPin, Tag, ArrowRight, Sparkles } from 'lucide-react';
import { BirthdayConfig, PhotoItem } from '../birthdayConfig';
import { audioEngine } from '../utils/audioEngine';

interface PolaroidGalleryProps {
  onNext: () => void;
  isDarkMode: boolean;
  config: BirthdayConfig;
}

export const PolaroidGallery: React.FC<PolaroidGalleryProps> = ({ onNext, isDarkMode, config }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});

  const handlePhotoClick = (photo: PhotoItem) => {
    audioEngine.playClick();
    setSelectedPhoto(photo);
  };

  const handleToggleLike = (e: React.MouseEvent, photoId: string) => {
    e.stopPropagation();
    audioEngine.playStarCollect();
    setLikedPhotos((prev) => ({ ...prev, [photoId]: !prev[photoId] }));
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 pt-20 sm:pt-24 transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-slate-950 via-amber-950/40 to-slate-950 text-amber-100' 
        : 'bg-gradient-to-b from-amber-50 via-amber-100/60 to-orange-50 text-slate-800'
    }`}>
      
      {/* Title */}
      <div className="max-w-2xl w-full text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-700 dark:text-amber-300 text-xs font-heading font-semibold uppercase tracking-wider shadow">
          <Camera className="w-3.5 h-3.5" />
          <span>Album Kỷ Niệm Ngọt Ngào</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-hero font-bold text-amber-700 dark:text-amber-300">
          Những Khoảnh Khắc Đẹp Nhất
        </h1>
        <p className="text-xs sm:text-sm text-amber-800/80 dark:text-amber-200/80 font-body italic">
          Nhấn vào từng bức ảnh Polaroid để xem câu chuyện kỷ niệm ngọt ngào!
        </p>
      </div>

      {/* Polaroid Grid Layout */}
      <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2">
        {config.photos.map((photo, idx) => {
          const isLiked = likedPhotos[photo.id];
          const rotDeg = photo.rotation || (idx % 2 === 0 ? -2 : 2);

          return (
            <div
              key={photo.id || idx}
              onClick={() => handlePhotoClick(photo)}
              style={{ transform: `rotate(${rotDeg}deg)` }}
              className={`group cursor-pointer p-4 pb-6 rounded-2xl border transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 hover:z-20 relative ${
                isDarkMode
                  ? 'bg-slate-900 border-amber-500/30 hover:border-amber-400'
                  : 'bg-amber-50/90 border-amber-300/80 hover:border-amber-400'
              }`}
            >
              {/* Decorative Washi Tape Accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-200/60 border border-amber-400/40 backdrop-blur-sm rotate-2 shadow-sm pointer-events-none" />

              {/* Image Frame */}
              <div className="relative aspect-square rounded-xl overflow-hidden mb-3 border border-amber-300/50 bg-amber-100/40">
                <img
                  src={photo.image}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                
                {/* Like Heart Button */}
                <button
                  onClick={(e) => handleToggleLike(e, photo.id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-slate-950/60 backdrop-blur-md text-white hover:scale-110 transition shadow"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'text-pink-500 fill-pink-500' : 'text-white'}`} />
                </button>
              </div>

              {/* Caption & Date */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-semibold text-base text-amber-800 dark:text-amber-200">
                    {photo.title}
                  </h3>
                  {photo.location && (
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" />
                      {photo.location}
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-slate-600 dark:text-amber-200/80 font-caption font-light italic line-clamp-2">
                  "{photo.caption}"
                </p>
                <p className="text-[10px] text-amber-600 font-button font-medium">
                  {photo.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`max-w-lg w-full p-6 rounded-3xl border shadow-2xl relative space-y-4 animate-in zoom-in-95 ${
              isDarkMode ? 'bg-slate-900 border-amber-500/30 text-amber-100' : 'bg-amber-50 border-amber-300 text-slate-800'
            }`}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-amber-300">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif font-bold text-amber-600 dark:text-amber-300">
                  {selectedPhoto.title}
                </h3>
                <span className="text-xs text-amber-600 font-semibold">{selectedPhoto.date}</span>
              </div>

              <p className="text-sm font-serif italic text-amber-800 dark:text-amber-200">
                "{selectedPhoto.caption}"
              </p>

              {selectedPhoto.tags && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedPhoto.tags.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-[10px] font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" /> {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Next Scene Action Button */}
      <div className="mt-12">
        <button
          onClick={() => {
            audioEngine.playClick();
            onNext();
          }}
          className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-amber-400 text-white font-serif font-bold text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-amber-200" />
          <span>Thổi Nến Sinh Nhật</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
