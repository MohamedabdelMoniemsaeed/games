import React, { useState } from 'react';
import { useGame } from '../game/GameContext';
import { kCrops } from '../game/constants';
import { CropType } from '../game/models';
import { Panel, Bar } from './Common';
import { Droplets, X } from 'lucide-react';

// Soil color interpolation helper
function getSoilColor(water: number): string {
  // Lerp between dry soil #A8875F and wet soil #6B4E31
  const r1 = 0xa8, g1 = 0x87, b1 = 0x5f;
  const r2 = 0x6b, g2 = 0x4e, b2 = 0x31;
  const t = Math.max(0, Math.min(1, water));
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

export const FarmView: React.FC = () => {
  const {
    weather,
    tr,
    plots,
    waterAll,
    showToast,
  } = useGame();

  const [activePlotIndex, setActivePlotIndex] = useState<number | null>(null);

  const weatherData = (() => {
    switch (weather) {
      case 'sunny':
        return { emoji: '☀️', name: tr('sunny'), hint: tr('sunnyHint') };
      case 'cloudy':
        return { emoji: '☁️', name: tr('cloudy'), hint: tr('cloudyHint') };
      case 'rain':
        return { emoji: '🌧️', name: tr('rain'), hint: tr('rainHint') };
    }
  })();

  const handleWaterAll = () => {
    const err = waterAll();
    showToast(err);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 space-y-4">
      {/* Weather Banner Panel */}
      <Panel className="flex items-center gap-3 bg-white/90">
        <span className="text-3xl select-none">{weatherData.emoji}</span>
        <div className="flex-1">
          <h2 className="text-base font-bold text-[#1E2A22]">{weatherData.name}</h2>
          <p className="text-xs text-[#7B857E] mt-0.5 leading-snug">{weatherData.hint}</p>
        </div>
      </Panel>

      {/* 3-Column Plots Grid */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {plots.map((_, i) => (
          <PlotTile
            key={i}
            index={i}
            onPickSeed={() => setActivePlotIndex(i)}
          />
        ))}
      </div>

      {/* Water All Action Button */}
      <button
        onClick={handleWaterAll}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#2F7D4E] text-white font-bold text-sm shadow-md hover:bg-[#286b43] active:scale-[0.99] transition cursor-pointer"
      >
        <Droplets className="w-4 h-4" />
        <span>{tr('waterAll')}</span>
      </button>

      {/* Seed Picker Modal / Bottom Sheet */}
      {activePlotIndex !== null && (
        <SeedPickerModal
          plotIndex={activePlotIndex}
          onClose={() => setActivePlotIndex(null)}
        />
      )}
    </div>
  );
};

const PlotTile: React.FC<{
  index: number;
  onPickSeed: () => void;
}> = ({ index, onPickSeed }) => {
  const { plots, plant, water, harvest, showToast } = useGame();
  const p = plots[index];
  const def = p.crop ? kCrops[p.crop] : null;

  const isReady = p.crop !== null && p.progress >= 1;

  let face: string;
  if (!def) {
    face = '➕';
  } else if (isReady) {
    face = def.emoji;
  } else if (p.water <= 0) {
    face = '🥀';
  } else {
    face = p.progress < 0.35 ? '🌱' : '🌿';
  }

  const handleTap = () => {
    if (p.crop === null) {
      onPickSeed();
    } else if (isReady) {
      const err = harvest(index);
      showToast(err);
    } else {
      const err = water(index);
      showToast(err);
    }
  };

  const soilBg = getSoilColor(p.water);

  return (
    <div
      onClick={handleTap}
      className={`relative aspect-square rounded-2xl p-2 flex flex-col justify-between cursor-pointer select-none transition-all duration-300 shadow-sm active:scale-95 ${
        isReady ? 'ring-3 ring-amber-400 ring-offset-2 ring-offset-[#F6F4EA]' : ''
      }`}
      style={{ backgroundColor: soilBg }}
    >
      {/* Progress percentage on top right */}
      {def && !isReady && (
        <span className="absolute top-1.5 right-2 text-[11px] font-extrabold text-white drop-shadow-md">
          {Math.round(p.progress * 100)}%
        </span>
      )}

      {/* Center Crop Face / Icon */}
      <div className="flex-1 flex items-center justify-center">
        <span
          className={`transition-transform duration-300 ${
            isReady ? 'text-4xl scale-115 animate-bounce' : def ? 'text-3xl' : 'text-xl text-white/80'
          }`}
        >
          {face}
        </span>
      </div>

      {/* Water Bar at bottom */}
      <div className="w-full">
        <Bar value={p.water} color="#3E8ED0" height={5} />
      </div>
    </div>
  );
};

const SeedPickerModal: React.FC<{
  plotIndex: number;
  onClose: () => void;
}> = ({ plotIndex, onClose }) => {
  const { tr, level, plant, showToast } = useGame();

  const handleSelectCrop = (cropKey: CropType) => {
    onClose();
    const err = plant(plotIndex, cropKey);
    showToast(err);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs animate-fade-in p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-gray-100 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-base font-extrabold text-[#1E2A22]">
            {tr('seed')}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="divide-y divide-gray-100 mt-2">
          {(Object.keys(kCrops) as CropType[]).map((key) => {
            const crop = kCrops[key];
            const isUnlocked = level >= crop.unlockLevel;

            return (
              <button
                key={key}
                disabled={!isUnlocked}
                onClick={() => handleSelectCrop(key)}
                className={`w-full py-3.5 px-2 flex items-center gap-3 text-start transition rounded-xl ${
                  isUnlocked
                    ? 'hover:bg-gray-50 active:bg-gray-100 cursor-pointer'
                    : 'opacity-40 cursor-not-allowed'
                }`}
              >
                <span className="text-3xl">{crop.emoji}</span>
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#1E2A22]">
                    {tr(key)}
                  </div>
                  <div className="text-xs text-[#7B857E] mt-0.5">
                    {tr('seed')} {crop.seedCost} 🪙 · {crop.growSeconds}s ·{' '}
                    {tr('sells')} {crop.sellPrice} 🪙
                  </div>
                </div>

                {!isUnlocked && (
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                    🔒 {tr('level')} {crop.unlockLevel}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
