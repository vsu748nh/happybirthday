import { useState, useEffect, useRef } from 'react';
import { ParticleSystem } from './utils/fxCanvas';
import { birthdayConfig, BirthdayConfig } from './birthdayConfig';
import { HeaderNav } from './components/HeaderNav';
import { LoadingScreen } from './components/LoadingScreen';
import { CastleEntrance } from './components/CastleEntrance';
import { HeartQuestGame } from './components/HeartQuestGame';
import { TreasureRoom } from './components/TreasureRoom';
import { TypewriterLetter } from './components/TypewriterLetter';
import { MusicPlayer } from './components/MusicPlayer';
import { PolaroidGallery } from './components/PolaroidGallery';
import { BirthdayCake } from './components/BirthdayCake';
import { EmotionalEnding } from './components/EmotionalEnding';
import { ConfigEditorModal } from './components/ConfigEditorModal';

export default function App() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [hasGoldenKey, setHasGoldenKey] = useState(false);
  const [config, setConfig] = useState<BirthdayConfig>(birthdayConfig);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleSysRef = useRef<ParticleSystem | null>(null);

  // Initialize FX Canvas Background System
  useEffect(() => {
    if (canvasRef.current) {
      particleSysRef.current = new ParticleSystem(canvasRef.current);
      particleSysRef.current.start();
    }

    return () => {
      particleSysRef.current?.destroy();
    };
  }, []);

  const totalScenes = 9;

  const handleNextScene = () => {
    setCurrentScene((prev) => Math.min(totalScenes - 1, prev + 1));
  };

  const handleSelectScene = (sceneIdx: number) => {
    setCurrentScene(sceneIdx);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleUnlockKey = () => {
    setHasGoldenKey(true);
    handleNextScene();
  };

  const handleSaveConfig = (newConfig: BirthdayConfig) => {
    setConfig(newConfig);
  };

  const handleResetDefaultConfig = () => {
    setConfig(JSON.parse(JSON.stringify(birthdayConfig)));
  };

  return (
    <div className={`min-h-screen relative font-sans select-none overflow-x-hidden ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Dynamic FX Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      />

      {/* Header Navigation Bar (only show after loading screen scene 0) */}
      {currentScene > 0 && (
        <HeaderNav
          currentScene={currentScene}
          totalScenes={totalScenes}
          onSelectScene={handleSelectScene}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
          hasGoldenKey={hasGoldenKey}
          onOpenEditor={() => setIsEditorOpen(true)}
        />
      )}

      {/* Main Scene Router */}
      <main className="relative z-10 min-h-screen">
        {currentScene === 0 && (
          <LoadingScreen
            onComplete={handleNextScene}
            isDarkMode={isDarkMode}
            config={config}
          />
        )}

        {currentScene === 1 && (
          <CastleEntrance
            onNext={handleNextScene}
            isDarkMode={isDarkMode}
          />
        )}

        {currentScene === 2 && (
          <HeartQuestGame
            onCompleteKey={handleUnlockKey}
            isDarkMode={isDarkMode}
          />
        )}

        {currentScene === 3 && (
          <TreasureRoom
            onNext={handleNextScene}
            isDarkMode={isDarkMode}
            hasGoldenKey={hasGoldenKey}
          />
        )}

        {currentScene === 4 && (
          <TypewriterLetter
            onNext={handleNextScene}
            isDarkMode={isDarkMode}
            config={config}
          />
        )}

        {currentScene === 5 && (
          <MusicPlayer
            onNext={handleNextScene}
            isDarkMode={isDarkMode}
          />
        )}

        {currentScene === 6 && (
          <PolaroidGallery
            onNext={handleNextScene}
            isDarkMode={isDarkMode}
            config={config}
          />
        )}

        {currentScene === 7 && (
          <BirthdayCake
            onNext={handleNextScene}
            isDarkMode={isDarkMode}
            config={config}
          />
        )}

        {currentScene === 8 && (
          <EmotionalEnding
            onRestart={() => setCurrentScene(0)}
            isDarkMode={isDarkMode}
            config={config}
          />
        )}
      </main>

      {/* Live Content & Photo Config Editor Modal */}
      <ConfigEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        onResetDefault={handleResetDefaultConfig}
      />

    </div>
  );
}
