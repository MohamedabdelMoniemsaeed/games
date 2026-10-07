import React from 'react';
import { useGame } from '../game/GameContext';
import { kAnimals, kEmoji } from '../game/constants';
import { AnimalType } from '../game/models';
import { Panel, Bar } from './Common';

export const AnimalsView: React.FC = () => {
  const { tr, animals, penSize, level, buyAnimal, showToast } = useGame();

  const handleBuy = (t: AnimalType) => {
    const err = buyAnimal(t);
    showToast(err);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 space-y-4">
      {/* Pen Capacity Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-extrabold text-[#1E2A22]">
          {tr('pen')} {animals.length}/{penSize}
        </h2>
      </div>

      {/* Owned Animals List */}
      <div className="space-y-3">
        {animals.map((_, i) => (
          <AnimalCard key={i} index={i} />
        ))}
      </div>

      {/* Buy Animals Market Section */}
      <div className="pt-2 space-y-2.5">
        {(Object.keys(kAnimals) as AnimalType[]).map((type) => {
          const def = kAnimals[type];
          const isUnlocked = level >= def.unlockLevel;

          return (
            <Panel key={type} className="flex items-center gap-3">
              <span className="text-3xl select-none">{def.emoji}</span>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#1E2A22]">
                  {tr(type)}
                </div>
                <div className="text-xs text-[#7B857E] mt-0.5">
                  {kEmoji[def.product]} {tr(def.product)} · {def.period}s
                </div>
              </div>

              <button
                disabled={!isUnlocked}
                onClick={() => handleBuy(type)}
                className={`py-2 px-3.5 rounded-xl font-bold text-xs transition ${
                  isUnlocked
                    ? 'bg-[#2F7D4E] text-white hover:bg-[#286b43] active:scale-95 cursor-pointer shadow-xs'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {!isUnlocked
                  ? `🔒 ${tr('level')} ${def.unlockLevel}`
                  : `${tr('buy')} ${def.cost} 🪙`}
              </button>
            </Panel>
          );
        })}
      </div>
    </div>
  );
};

const AnimalCard: React.FC<{ index: number }> = ({ index }) => {
  const { animals, tr, feed, collect, showToast } = useGame();
  const a = animals[index];
  const def = kAnimals[a.type];

  const handleFeed = () => {
    const res = feed(index);
    showToast(res);
  };

  const handleCollect = () => {
    const res = collect(index);
    showToast(res);
  };

  return (
    <Panel className="space-y-3">
      {/* Top info and progress bars */}
      <div className="flex items-center gap-3">
        <span className="text-4xl select-none">{def.emoji}</span>
        <div className="flex-1 space-y-1.5">
          <div className="text-sm font-bold text-[#1E2A22]">
            {tr(a.type)}
          </div>

          {/* Fullness bar */}
          <div className="flex items-center gap-2">
            <span className="text-xs">🍽️</span>
            <div className="flex-1">
              <Bar value={a.fullness} color="#E6A23C" height={7} />
            </div>
          </div>

          {/* Product progress bar */}
          <div className="flex items-center gap-2">
            <span className="text-xs">{kEmoji[def.product]}</span>
            <div className="flex-1">
              <Bar value={a.progress} color="#2F7D4E" height={7} />
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons: Feed & Collect */}
      <div className="flex gap-2.5 pt-1">
        <button
          onClick={handleFeed}
          className="flex-1 py-2 px-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 active:scale-98 text-xs font-bold text-[#1E2A22] transition cursor-pointer"
        >
          {tr('feed')} {def.feedCost} 🪙
        </button>

        <button
          onClick={handleCollect}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
            a.stored > 0
              ? 'bg-[#2F7D4E] text-white hover:bg-[#286b43] active:scale-98 animate-pulse'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          disabled={a.stored === 0}
        >
          {tr('collect')} {kEmoji[def.product]} ×{a.stored}
        </button>
      </div>
    </Panel>
  );
};
