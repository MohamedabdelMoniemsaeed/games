import React from 'react';
import { useGame } from '../game/GameContext';
import { Panel, Bar } from './Common';

const QUEST_ICONS: Record<string, string> = {
  harvest: '🧺',
  sell: '💰',
  water: '💧',
  deliver: '📦',
};

export const QuestsView: React.FC = () => {
  const {
    tr,
    streak,
    dailyAvailable,
    dailyReward,
    claimDaily,
    quests,
    claimQuest,
    showToast,
  } = useGame();

  const handleClaimDaily = () => {
    const err = claimDaily();
    showToast(err);
  };

  const handleClaimQuest = (idx: number) => {
    const err = claimQuest(idx);
    showToast(err);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 space-y-4">
      {/* 1. Daily Gift Banner Card */}
      <Panel className="flex items-center gap-3 bg-linear-to-r from-white to-[#E8F3E9]/60">
        <span className="text-3xl select-none">🎁</span>
        <div className="flex-1">
          <h2 className="text-sm font-bold text-[#1E2A22]">{tr('dailyTitle')}</h2>
          <div className="text-xs text-[#7B857E] mt-0.5 flex items-center gap-1">
            <span>{tr('streak')}:</span>
            <span className="inline-flex items-center gap-0.5" dir="ltr">
              <bdi>{streak}</bdi>
              <span>🔥</span>
            </span>
          </div>
        </div>

        <button
          disabled={!dailyAvailable}
          onClick={handleClaimDaily}
          className={`py-2 px-3.5 rounded-xl text-xs font-bold transition shadow-xs ${
            dailyAvailable
              ? 'bg-[#2F7D4E] text-white hover:bg-[#286b43] active:scale-95 cursor-pointer animate-pulse'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {dailyAvailable ? (
            <span className="inline-flex items-center gap-1" dir="ltr">
              <span>{tr('claim')}</span>
              <span>+{dailyReward}</span>
              <span>🪙</span>
            </span>
          ) : (
            tr('claimed')
          )}
        </button>
      </Panel>

      {/* 2. Today's Quests */}
      <div className="space-y-2.5">
        <h2 className="text-base font-extrabold text-[#1E2A22]">
          {tr('questsTitle')}
        </h2>

        <div className="space-y-2.5">
          {quests.map((q, i) => {
            const shown = Math.min(q.progress, q.target);
            const isDone = q.progress >= q.target;
            const icon = QUEST_ICONS[q.type] || '🎯';

            return (
              <Panel key={i} className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl select-none">{icon}</span>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-[#1E2A22]">
                      {tr(`q_${q.type}`)}
                    </span>
                    <span className="text-xs text-[#7B857E] ms-2">
                      <bdi dir="ltr">{shown} / {q.target}</bdi>
                    </span>
                  </div>

                  <button
                    disabled={!isDone || q.claimed}
                    onClick={() => handleClaimQuest(i)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold transition ${
                      q.claimed
                        ? 'bg-gray-100 text-gray-500'
                        : isDone
                        ? 'bg-[#2F7D4E] text-white hover:bg-[#286b43] active:scale-95 cursor-pointer animate-bounce'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {q.claimed ? (
                      '✔'
                    ) : (
                      <span className="inline-flex items-center gap-0.5" dir="ltr">
                        <span>+{q.reward}</span>
                        <span>🪙</span>
                      </span>
                    )}
                  </button>
                </div>

                <Bar value={shown / q.target} color="#2F7D4E" height={6} />
              </Panel>
            );
          })}
        </div>
      </div>
    </div>
  );
};
