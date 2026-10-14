import React, { useState, useEffect } from 'react';
import { useGame } from '../game/GameContext';
import { Pill, Bar, WatchAdModal } from './Common';
import { Video } from 'lucide-react';

export const Hud: React.FC<{ onSwitchToDashboard?: () => void }> = ({
  onSwitchToDashboard,
}) => {
  const {
    tr,
    lang,
    toggleLang,
    soundOn,
    toggleSound,
    level,
    coins,
    tank,
    capacity,
    rewardRefill,
    showToast,
    gameMode,
    toggleGameMode,
    farmFact,
    nextFarmFact,
  } = useGame();

  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [displayCoins, setDisplayCoins] = useState(coins);

  // Smooth coins counting animation
  useEffect(() => {
    let frameId: number;
    const diff = coins - displayCoins;
    if (diff === 0) return;

    const step = () => {
      setDisplayCoins((prev) => {
        const delta = coins - prev;
        if (Math.abs(delta) <= 1) return coins;
        return prev + Math.sign(delta) * Math.max(1, Math.round(Math.abs(delta) * 0.2));
      });
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [coins, displayCoins]);

  const lowWater = tank / capacity < 0.3;

  const handleWatchAd = () => {
    rewardRefill();
    showToast('tankFull');
  };

  return (
    <>
      <div className="w-full max-w-lg mx-auto px-4 pt-3 pb-2 select-none">
        {/* Top bar: Level, Coins, Sound, Lang toggle */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Pill>
              <span>⭐</span>
              <span>
                {tr('level')} {level}
              </span>
            </Pill>
            <Pill>
              <span>🪙</span>
              <span>{displayCoins}</span>
            </Pill>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Game Mode Switcher: Realistic vs Relaxed */}
            <button
              onClick={toggleGameMode}
              title={
                gameMode === 'realistic'
                  ? (lang === 'ar' ? 'النمط الحالي: واقعي احترافي (اضغط للتبديل للنمط العائلي المريح)' : 'Mode: Realistic Simulation (Tap for Relaxed)')
                  : (lang === 'ar' ? 'النمط الحالي: مريح عائلي (اضغط للتبديل للنمط الواقعي)' : 'Mode: Relaxed Family (Tap for Realistic)')
              }
              className={`flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-lg active:scale-95 transition cursor-pointer border shadow-2xs ${
                gameMode === 'realistic'
                  ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <span>{gameMode === 'realistic' ? '🚜' : '🌿'}</span>
              <span className="text-[11px] font-extrabold hidden sm:inline">
                {gameMode === 'realistic'
                  ? (lang === 'ar' ? 'واقعي' : 'Realistic')
                  : (lang === 'ar' ? 'مريح' : 'Relaxed')}
              </span>
            </button>

            {onSwitchToDashboard && (
              <button
                onClick={onSwitchToDashboard}
                title={lang === 'ar' ? 'لوحة تحكم وإدارة المزرعة' : 'Farm Management Dashboard'}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-[#2F7D4E] text-white rounded-lg hover:bg-[#25633E] active:scale-95 transition cursor-pointer shadow-xs"
              >
                <span>📊</span>
                <span className="text-[11px] font-bold">{lang === 'ar' ? 'الإدارة' : 'Dashboard'}</span>
              </button>
            )}

            <button
              onClick={toggleSound}
              title={tr('sound')}
              className="p-1.5 rounded-lg text-lg hover:bg-black/5 active:scale-90 transition cursor-pointer"
            >
              {soundOn ? '🔊' : '🔇'}
            </button>

            <button
              onClick={toggleLang}
              className="px-2.5 py-1 text-sm font-extrabold text-[#2F7D4E] hover:bg-black/5 rounded-lg active:scale-95 transition cursor-pointer"
              title={lang === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
            >
              {lang === 'en' ? 'ع' : 'EN'}
            </button>
          </div>
        </div>

        {/* Water tank gauge */}
        <div className="flex items-center gap-2.5 mt-2 bg-white/70 p-2 rounded-xl border border-[#E8EBE5]/70 shadow-2xs">
          <span className="text-lg">💧</span>
          <div className="flex-1">
            <Bar value={tank / capacity} color="#3E8ED0" height={10} />
          </div>
          <span className="text-xs font-bold text-[#7B857E] min-w-[80px] text-end">
            <bdi dir="ltr">{Math.round(tank)}/{Math.round(capacity)} L</bdi>
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

        {/* Educational Farm Discovery Strip for all ages */}
        <div
          onClick={nextFarmFact}
          title={lang === 'ar' ? 'اضغط لقراءة معلومة زراعية جديدة' : 'Tap for next fun farm discovery'}
          className="mt-1.5 py-1.5 px-3 rounded-xl bg-amber-50/70 border border-amber-200/50 flex items-center justify-between gap-2 text-xs text-amber-900 cursor-pointer hover:bg-amber-100/70 active:scale-[0.99] transition select-none"
        >
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <span className="text-sm shrink-0">💡</span>
            <span className="truncate text-[11px] font-medium">{farmFact}</span>
          </div>
          <span className="text-[10px] text-amber-700/80 font-bold shrink-0">
            {lang === 'ar' ? 'معلومة أخرى ❯' : 'Next ❯'}
          </span>
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
