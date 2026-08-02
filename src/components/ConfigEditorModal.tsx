import React, { useState } from 'react';
import { X, Save, RotateCcw, Image, MessageSquare, Music, User, Plus, Trash2, Check, Sparkles } from 'lucide-react';
import { BirthdayConfig, PhotoItem, SongTrack } from '../birthdayConfig';
import { audioEngine } from '../utils/audioEngine';

interface ConfigEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  onSaveConfig: (newConfig: BirthdayConfig) => void;
  onResetDefault: () => void;
}

export const ConfigEditorModal: React.FC<ConfigEditorModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onResetDefault,
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'letter' | 'photos' | 'music'>('general');
  const [editedConfig, setEditedConfig] = useState<BirthdayConfig>(JSON.parse(JSON.stringify(config)));
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    audioEngine.playStarCollect();
    onSaveConfig(editedConfig);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm("Bạn có chắc chắn muốn khôi phục lại nội dung mặc định ban đầu?")) {
      audioEngine.playClick();
      onResetDefault();
      onClose();
    }
  };

  // Photo handlers
  const handlePhotoChange = (index: number, field: keyof PhotoItem, value: string) => {
    const updatedPhotos = [...editedConfig.photos];
    updatedPhotos[index] = { ...updatedPhotos[index], [field]: value };
    setEditedConfig({ ...editedConfig, photos: updatedPhotos });
  };

  const handleAddPhoto = () => {
    audioEngine.playClick();
    const newPhoto: PhotoItem = {
      id: `p-${Date.now()}`,
      title: "Kỷ niệm mới",
      date: "Ngày đặc biệt",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
      caption: "Khoảnh khắc tuyệt vời bên em",
      location: "Góc kỷ niệm"
    };
    setEditedConfig({ ...editedConfig, photos: [...editedConfig.photos, newPhoto] });
  };

  const handleRemovePhoto = (index: number) => {
    audioEngine.playClick();
    const updatedPhotos = editedConfig.photos.filter((_, i) => i !== index);
    setEditedConfig({ ...editedConfig, photos: updatedPhotos });
  };

  // Music handlers
  const handleSongChange = (index: number, field: keyof SongTrack, value: string) => {
    const updatedPlaylist = [...editedConfig.playlist];
    updatedPlaylist[index] = { ...updatedPlaylist[index], [field]: value };
    setEditedConfig({ ...editedConfig, playlist: updatedPlaylist });
  };

  const handleAddSong = () => {
    audioEngine.playClick();
    const newSong: SongTrack = {
      id: `track-${Date.now()}`,
      title: "Bài hát ngọt ngào",
      artist: "Nhạc lãng mạn",
      cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80",
      audioUrl: "synth-romantic-waltz",
      duration: "03:30",
      lyricsQuote: "Yêu em từ cái nhìn đầu tiên..."
    };
    setEditedConfig({ ...editedConfig, playlist: [...editedConfig.playlist, newSong] });
  };

  const handleRemoveSong = (index: number) => {
    audioEngine.playClick();
    const updatedPlaylist = editedConfig.playlist.filter((_, i) => i !== index);
    setEditedConfig({ ...editedConfig, playlist: updatedPlaylist });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-pink-500/30 text-pink-100 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-pink-500/20 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-serif font-bold text-pink-300 drop-shadow-md">
              Chỉnh Sửa Nội Dung & Album Ảnh
            </h2>
          </div>
          <button
            onClick={() => {
              audioEngine.playClick();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-pink-500/20 text-pink-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-pink-500/20 bg-slate-950/40 px-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition ${
              activeTab === 'general'
                ? 'border-pink-500 text-pink-300 bg-pink-500/10'
                : 'border-transparent text-slate-400 hover:text-pink-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Thông Tin</span>
          </button>

          <button
            onClick={() => setActiveTab('letter')}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition ${
              activeTab === 'letter'
                ? 'border-pink-500 text-pink-300 bg-pink-500/10'
                : 'border-transparent text-slate-400 hover:text-pink-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Thư & Lời Chúc</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition ${
              activeTab === 'photos'
                ? 'border-pink-500 text-pink-300 bg-pink-500/10'
                : 'border-transparent text-slate-400 hover:text-pink-200'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Album Ảnh ({editedConfig.photos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('music')}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition ${
              activeTab === 'music'
                ? 'border-pink-500 text-pink-300 bg-pink-500/10'
                : 'border-transparent text-slate-400 hover:text-pink-200'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>Nhạc Nền ({editedConfig.playlist.length})</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: General Info */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-pink-300 mb-1">Tên Người Nhận (Công chúa)</label>
                  <input
                    type="text"
                    value={editedConfig.recipientName}
                    onChange={(e) => setEditedConfig({ ...editedConfig, recipientName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-pink-500/30 text-xs sm:text-sm text-pink-100 focus:outline-none focus:border-pink-400"
                    placeholder="ví dụ: Công Chúa Của Anh"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-pink-300 mb-1">Tên Người Gửi</label>
                  <input
                    type="text"
                    value={editedConfig.senderName}
                    onChange={(e) => setEditedConfig({ ...editedConfig, senderName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-pink-500/30 text-xs sm:text-sm text-pink-100 focus:outline-none focus:border-pink-400"
                    placeholder="ví dụ: Your Forever Love"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-pink-300 mb-1">Số Tuổi Sinh Nhật</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={editedConfig.ageNumber || 20}
                    onChange={(e) => setEditedConfig({ ...editedConfig, ageNumber: parseInt(e.target.value) || 20 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-pink-500/30 text-xs sm:text-sm text-pink-100 focus:outline-none focus:border-pink-400"
                    placeholder="20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-pink-300 mb-1">Ngày Sinh Nhật</label>
                  <input
                    type="text"
                    value={editedConfig.birthdayDate}
                    onChange={(e) => setEditedConfig({ ...editedConfig, birthdayDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-pink-500/30 text-xs sm:text-sm text-pink-100 focus:outline-none focus:border-pink-400"
                    placeholder="ví dụ: 07 August 2026"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-pink-300 mb-1">Tiêu Đề Phụ / Chương</label>
                  <input
                    type="text"
                    value={editedConfig.ageTitle}
                    onChange={(e) => setEditedConfig({ ...editedConfig, ageTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-pink-500/30 text-xs sm:text-sm text-pink-100 focus:outline-none focus:border-pink-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Letter */}
          {activeTab === 'letter' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-pink-300 mb-1">Tiêu Đề Thư</label>
                <input
                  type="text"
                  value={editedConfig.letter.title}
                  onChange={(e) =>
                    setEditedConfig({
                      ...editedConfig,
                      letter: { ...editedConfig.letter, title: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-pink-500/30 text-xs sm:text-sm text-pink-100 focus:outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-pink-300 mb-1">
                  Nội Dung Thư (xuống dòng để chia thành nhiều đoạn)
                </label>
                <textarea
                  rows={6}
                  value={editedConfig.letter.paragraphs.join('\n\n')}
                  onChange={(e) =>
                    setEditedConfig({
                      ...editedConfig,
                      letter: {
                        ...editedConfig.letter,
                        paragraphs: e.target.value.split('\n\n').filter(Boolean)
                      }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-pink-500/30 text-xs sm:text-sm text-pink-100 focus:outline-none focus:border-pink-400 leading-relaxed font-serif"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-pink-300 mb-1">Lời Kết Thư</label>
                  <input
                    type="text"
                    value={editedConfig.letter.closing}
                    onChange={(e) =>
                      setEditedConfig({
                        ...editedConfig,
                        letter: { ...editedConfig.letter, closing: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-pink-500/30 text-xs sm:text-sm text-pink-100 focus:outline-none focus:border-pink-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-pink-300 mb-1">Chữ Ký</label>
                  <input
                    type="text"
                    value={editedConfig.letter.signature}
                    onChange={(e) =>
                      setEditedConfig({
                        ...editedConfig,
                        letter: { ...editedConfig.letter, signature: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-pink-500/30 text-xs sm:text-sm text-pink-100 focus:outline-none focus:border-pink-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Photos */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-pink-300 font-medium">
                  Thay đổi đường dẫn hình ảnh (URL) hoặc chỉnh sửa lời chúc/tiêu đề từng tấm ảnh
                </span>
                <button
                  onClick={handleAddPhoto}
                  className="px-3 py-1.5 rounded-xl bg-pink-500 text-white text-xs font-semibold hover:bg-pink-600 transition flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm Ảnh</span>
                </button>
              </div>

              <div className="space-y-4">
                {editedConfig.photos.map((photo, idx) => (
                  <div key={photo.id || idx} className="p-4 rounded-2xl bg-slate-950/80 border border-pink-500/20 space-y-3 relative group">
                    <div className="flex items-center justify-between border-b border-pink-500/20 pb-2">
                      <span className="text-xs font-bold text-amber-300 font-serif">Ảnh #{idx + 1}</span>
                      <button
                        onClick={() => handleRemovePhoto(idx)}
                        className="p-1 rounded bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 transition text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                      {/* Photo Thumbnail Preview */}
                      <div className="aspect-[4/3] rounded-xl overflow-hidden border border-pink-400/30 bg-slate-900 relative">
                        <img
                          src={photo.image}
                          alt={photo.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                      </div>

                      {/* Photo Detail Inputs */}
                      <div className="sm:col-span-2 space-y-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-pink-300">Đường dẫn Hình ảnh (Image URL)</label>
                          <input
                            type="text"
                            value={photo.image}
                            onChange={(e) => handlePhotoChange(idx, 'image', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-pink-500/30 text-xs text-pink-100 focus:outline-none"
                            placeholder="https://..."
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-pink-300">Tiêu đề ảnh</label>
                            <input
                              type="text"
                              value={photo.title}
                              onChange={(e) => handlePhotoChange(idx, 'title', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-pink-500/30 text-xs text-pink-100 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-pink-300">Thời gian / Ngày</label>
                            <input
                              type="text"
                              value={photo.date}
                              onChange={(e) => handlePhotoChange(idx, 'date', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-pink-500/30 text-xs text-pink-100 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-pink-300">Chú thích (Caption)</label>
                          <input
                            type="text"
                            value={photo.caption}
                            onChange={(e) => handlePhotoChange(idx, 'caption', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-pink-500/30 text-xs text-pink-100 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Music */}
          {activeTab === 'music' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-pink-300 font-medium">
                  Tùy chỉnh danh sách bài hát và câu nói hay
                </span>
                <button
                  onClick={handleAddSong}
                  className="px-3 py-1.5 rounded-xl bg-pink-500 text-white text-xs font-semibold hover:bg-pink-600 transition flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm Bài Hát</span>
                </button>
              </div>

              <div className="space-y-4">
                {editedConfig.playlist.map((song, idx) => (
                  <div key={song.id || idx} className="p-4 rounded-2xl bg-slate-950/80 border border-pink-500/20 space-y-3">
                    <div className="flex items-center justify-between border-b border-pink-500/20 pb-2">
                      <span className="text-xs font-bold text-amber-300 font-serif">Bài hát #{idx + 1}</span>
                      <button
                        onClick={() => handleRemoveSong(idx)}
                        className="p-1 rounded bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 transition text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-pink-300">Tên bài hát</label>
                        <input
                          type="text"
                          value={song.title}
                          onChange={(e) => handleSongChange(idx, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-pink-500/30 text-xs text-pink-100 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-pink-300">Ca sĩ / Nghệ sĩ</label>
                        <input
                          type="text"
                          value={song.artist}
                          onChange={(e) => handleSongChange(idx, 'artist', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-pink-500/30 text-xs text-pink-100 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-pink-300">Trích dẫn Lời bài hát</label>
                        <input
                          type="text"
                          value={song.lyricsQuote || ''}
                          onChange={(e) => handleSongChange(idx, 'lyricsQuote', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-pink-500/30 text-xs text-pink-100 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-pink-500/20 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 text-xs font-semibold transition flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Khôi Phục Mặc Định</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                audioEngine.playClick();
                onClose();
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-pink-500/30 text-pink-200 hover:bg-slate-800 text-xs font-semibold transition"
            >
              Hủy
            </button>

            <button
              onClick={handleSave}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 text-white font-serif font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2"
            >
              {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
              <span>{savedSuccess ? "Đã Lưu Thành Công!" : "Lưu & Áp Dụng"}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
