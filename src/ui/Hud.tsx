import React, { useState } from 'react';
import { useGame } from '../game/GameContext';
import { Pill, Bar, WatchAdModal } from './Common';
import { Video } from 'lucide-react';

export const Hud: React.FC = () => {
  const {
    tr,
    lang,
    toggleLang,
    level,
    coins,
    weather,
    tank,
    capacity,
    rewardRefill,
    showToast,
  } = useGame();

  const [isAdModalOpen, setIsAdModalOpen] = useState(false);

  const weatherEmoji =
    weather === 'sunny' ? '☀️' : weather === 'cloudy' ? '☁️' : '🌧️';

  const lowWater = tank / capacity < 0.3;

  const handleWatchAd = () => {
    rewardRefill();
    showToast('tankFull');
  };

  return (
    <>
      <div className="w-full max-w-lg mx-auto px-4 pt-3 pb-2 select-none">
        {/* Top bar: Level, Coins, Weather, Lang toggle */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Pill>
              <span>⭐</span>
              <span>{tr('level')} {level}</span>
            </Pill>
            <Pill>
              <span>🪙</span>
              <span>{coins}</span>
            </Pill>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl" title={tr(weather)}>
              {weatherEmoji}
            </span>
            <button
              onClick={toggleLang}
              className="px-2.5 py-1 text-sm font-bold text-[#2F7D4E] hover:bg-black/5 rounded-lg active:scale-95 transition"
              title={lang === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
            >
              {lang === 'en' ? 'ع' : 'EN'}
            </button>
          </div>
        </div>

        {/* Water tank gauge */}
        <div className="flex items-center gap-2.5 mt-2.5 bg-white/60 p-2 rounded-xl border border-[#E8EBE5]/60 shadow-2xs">
          <span className="text-lg">💧</span>
          <div className="flex-1">
            <Bar
              value={tank / capacity}
              color="#3E8ED0"
              height={10}
            />
          </div>
          <span className="text-xs font-semibold text-[#7B857E] min-w-[70px] text-end">
            {Math.round(tank)}/{Math.round(capacity)} L
          </span>

          {lowWater && (
            <button
              onClick={() => setIsAdModalOpen(true)}
              title={tr('watchAd')}
              className="p-1 rounded-lg text-[#2F7D4E] hover:bg-[#2F7D4E]/10 active:scale-90 transition animate-pulse"
            >
              <Video className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <WatchAdModal
        isOpen={isAdModalOpen}
        onClose={() => setIsAdModalOpen(false)}
        onWatch={handleWatchAd}
        tr={tr}
      />
    </>
  );
};
