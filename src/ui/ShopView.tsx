import React, { useState } from 'react';
import { useGame, MAX_PLOTS, MAX_TANK_LEVEL, MAX_PEN } from '../game/GameContext';
import { UpgradeType } from '../game/models';
import { Panel, WatchAdModal } from './Common';

interface UpgradeDisplay {
  icon: string;
  nameKey: string;
  descKey: string;
  countText: string;
}

export const ShopView: React.FC = () => {
  const {
    tr,
    tankLevel,
    plots,
    sprinkler,
    penSize,
    upgradeCost,
    upgradeMaxed,
    buyUpgrade,
    rewardRefill,
    showToast,
  } = useGame();

  const [isAdModalOpen, setIsAdModalOpen] = useState(false);

  const upgrades: Record<UpgradeType, UpgradeDisplay> = {
    tank: {
      icon: '🛢️',
      nameKey: 'upTank',
      descKey: 'upTankD',
      countText: `${tankLevel}/${MAX_TANK_LEVEL}`,
    },
    plot: {
      icon: '🟫',
      nameKey: 'upPlot',
      descKey: 'upPlotD',
      countText: `${plots.length}/${MAX_PLOTS}`,
    },
    sprinkler: {
      icon: '💦',
      nameKey: 'upSprinkler',
      descKey: 'upSprinklerD',
      countText: sprinkler ? tr('owned') : '',
    },
    pen: {
      icon: '🏠',
      nameKey: 'upPen',
      descKey: 'upPenD',
      countText: `${penSize}/${MAX_PEN}`,
    },
  };

  const handleBuy = (u: UpgradeType) => {
    const err = buyUpgrade(u);
    showToast(err);
  };

  const handleWatchAd = () => {
    rewardRefill();
    showToast('tankFull');
  };

  return (
    <>
      <div className="w-full max-w-lg mx-auto p-4 space-y-3">
        {(Object.keys(upgrades) as UpgradeType[]).map((key) => {
          const item = upgrades[key];
          const isMaxed = upgradeMaxed(key);
          const cost = upgradeCost(key);

          return (
            <Panel key={key} className="flex items-center gap-3">
              <span className="text-3xl select-none">{item.icon}</span>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#1E2A22]">
                  {tr(item.nameKey)}
                </div>
                <div className="text-xs text-[#7B857E] mt-0.5">
                  {tr(item.descKey)}
                </div>
                {item.countText && (
                  <div className="text-xs font-bold text-[#2F7D4E] mt-0.5">
                    {item.countText}
                  </div>
                )}
              </div>

              <button
                disabled={isMaxed}
                onClick={() => handleBuy(key)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold transition shadow-xs ${
                  isMaxed
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-[#2F7D4E] text-white hover:bg-[#286b43] active:scale-95 cursor-pointer'
                }`}
              >
                {isMaxed ? tr('max') : `${cost} 🪙`}
              </button>
            </Panel>
          );
        })}

        {/* Refill Tank via Ad panel */}
        <Panel className="flex items-center gap-3 bg-linear-to-r from-white to-[#E8F3E9]/50">
          <span className="text-3xl select-none">📺</span>
          <div className="flex-1">
            <span className="text-sm font-bold text-[#1E2A22]">
              {tr('watchAd')}
            </span>
          </div>
          <button
            onClick={() => setIsAdModalOpen(true)}
            className="py-2 px-3.5 rounded-xl bg-[#E8F3E9] text-[#2F7D4E] text-xs font-bold hover:bg-[#d5ebd7] active:scale-95 transition cursor-pointer"
          >
            {tr('watch')}
          </button>
        </Panel>
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
