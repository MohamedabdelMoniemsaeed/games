import React, { useState, useEffect } from 'react';
import { useGame } from '../game/GameContext';
import { Hud } from './Hud';
import { FarmView } from './FarmView';
import { AnimalsView } from './AnimalsView';
import { OrdersView } from './OrdersView';
import { QuestsView } from './QuestsView';
import { ShopView } from './ShopView';

export const Shell: React.FC = () => {
  const {
    tr,
    toasts,
    tutorialSeen,
    closeTutorial,
    dailyAvailable,
    streak,
    dailyReward,
    claimDaily,
    pendingLevelUp,
    clearLevelUp,
  } = useGame();

  const [tab, setTab] = useState<number>(0);
  const [showWelcome, setShowWelcome] = useState<boolean>(false);
  const [showDailyPopup, setShowDailyPopup] = useState<boolean>(false);

  useEffect(() => {
    if (!tutorialSeen) {
      setShowWelcome(true);
    } else if (dailyAvailable) {
      setShowDailyPopup(true);
    }
  }, [tutorialSeen, dailyAvailable]);

  const tabs = [
    { labelKey: 'farm', emoji: '🌱' },
    { labelKey: 'animals', emoji: '🐔' },
    { labelKey: 'orders', emoji: '📦' },
    { labelKey: 'quests', emoji: '🎯' },
    { labelKey: 'shop', emoji: '🛒' },
  ];

  return (
    <div className="min-h-screen bg-[#F6F4EA] text-[#1E2A22] flex flex-col font-sans transition-colors duration-200">
      {/* Top HUD */}
      <header className="sticky top-0 z-30 bg-[#F6F4EA]/90 backdrop-blur-md border-b border-[#E8EBE5]/60 shadow-2xs">
        <Hud />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-24 overflow-y-auto">
        {tab === 0 && <FarmView />}
        {tab === 1 && <AnimalsView />}
        {tab === 2 && <OrdersView />}
        {tab === 3 && <QuestsView />}
        {tab === 4 && <ShopView />}
      </main>

      {/* Bottom Navigation Bar (5 tabs) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8EBE5] shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-around h-16 px-1">
          {tabs.map((t, idx) => {
            const isActive = tab === idx;
            return (
              <button
                key={t.labelKey}
                onClick={() => setTab(idx)}
                className={`flex-1 flex flex-col items-center justify-center py-1 transition cursor-pointer select-none ${
                  isActive
                    ? 'text-[#2F7D4E] font-black scale-105'
                    : 'text-[#7B857E] hover:text-[#1E2A22]'
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-8 rounded-full transition ${
                    isActive ? 'bg-[#E8F3E9]' : ''
                  }`}
                >
                  <span className="text-xl">{t.emoji}</span>
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight font-bold">
                  {tr(t.labelKey)}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Floating Toast Notification Bar */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none px-4 w-full max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#1E2A22]/95 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-sm animate-bounce"
          >
            {tr(toast.key)}
          </div>
        ))}
      </div>

      {/* Welcome Tutorial Modal */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 text-[#1E2A22] text-center space-y-4">
            <span className="text-4xl">🌾</span>
            <h3 className="text-lg font-extrabold">{tr('welcomeTitle')}</h3>
            <p className="text-xs text-[#7B857E] leading-relaxed">
              {tr('welcomeBody')}
            </p>
            <button
              onClick={() => {
                setShowWelcome(false);
                closeTutorial();
                if (dailyAvailable) setShowDailyPopup(true);
              }}
              className="w-full py-2.5 rounded-xl bg-[#2F7D4E] text-white font-bold text-sm shadow-md hover:bg-[#286b43] active:scale-98 transition cursor-pointer"
            >
              {tr('ok')}
            </button>
          </div>
        </div>
      )}

      {/* Daily Gift Streak Popup */}
      {showDailyPopup && !showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 text-[#1E2A22] text-center space-y-3.5">
            <span className="text-4xl animate-bounce">🎁</span>
            <h3 className="text-lg font-extrabold">{tr('dailyTitle')}</h3>
            <p className="text-xs text-[#7B857E]">
              <span>{tr('streak')}: </span>
              <span className="inline-flex items-center gap-0.5 font-bold" dir="ltr">
                <bdi>{streak}</bdi>
                <span>🔥</span>
              </span>
              <br />
              <span className="text-sm font-black text-[#2F7D4E] mt-1 inline-flex items-center gap-0.5" dir="ltr">
                <span>+{dailyReward}</span>
                <span>🪙</span>
              </span>
            </p>
            <button
              onClick={() => {
                claimDaily();
                setShowDailyPopup(false);
              }}
              className="w-full py-2.5 rounded-xl bg-[#2F7D4E] text-white font-bold text-sm shadow-md hover:bg-[#286b43] active:scale-98 transition cursor-pointer"
            >
              {tr('claim')}
            </button>
          </div>
        </div>
      )}

      {/* Level Up Dialog */}
      {pendingLevelUp > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 text-[#1E2A22] text-center space-y-3.5 animate-scale-up">
            <span className="text-4xl">🎉</span>
            <h3 className="text-lg font-extrabold text-[#2F7D4E]">
              {tr('levelUp')} {pendingLevelUp}
            </h3>
            <p className="text-xs text-[#7B857E] leading-relaxed">
              {tr('levelUpBody')}
            </p>
            <button
              onClick={clearLevelUp}
              className="w-full py-2.5 rounded-xl bg-[#2F7D4E] text-white font-bold text-sm shadow-md hover:bg-[#286b43] active:scale-98 transition cursor-pointer"
            >
              {tr('ok')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
