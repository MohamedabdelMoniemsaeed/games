import React, { useState, useRef, useEffect } from 'react';
import { useGame, SPRAY_COST, FERTILIZER_COST } from '../game/GameContext';
import { kCrops, kEmoji, kCropIndices } from '../game/constants';
import { CropType } from '../game/models';
import { Panel, Bar } from './Common';
import { GroundCanvas, CropCanvas, WeatherOverlay, DayNightOverlay } from './painters';
import {
  ElevatedWaterTank,
  GrainSilo,
  Windmill,
  FarmTractor,
  Scarecrow,
  SprinklerHead,
} from './FarmInfrastructure';
import { Droplets, X } from 'lucide-react';

function hhmm(h: number): string {
  const hh = Math.floor(h).toString().padStart(2, '0');
  const mm = Math.floor((h % 1) * 60).toString().padStart(2, '0');
  return `${hh}:${mm}`;
}

export const FarmView: React.FC = () => {
  const {
    season,
    dayCount,
    hour,
    temperature,
    weather,
    event,
    eventItem,
    spray,
    darkness,
    tr,
    plots,
    tank,
    capacity,
    tankLevel,
    silo,
    siloCap,
    siloLevel,
    sprinkler,
    waterAll,
    harvest,
    lang,
    showToast,
    villageGrantBanner,
    dismissGrantBanner,
  } = useGame();

  const [activePlotIndex, setActivePlotIndex] = useState<number | null>(null);
  const [infoPlotIndex, setInfoPlotIndex] = useState<number | null>(null);
  const [animTime, setAnimTime] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 360,
    height: 440,
  });

  const seasonEmoji = ['🌸', '☀️', '🍂', '❄️'][season] || '🌸';
  const seasonKeys = ['spring', 'summer', 'autumn', 'winter'];
  const weatherEmoji =
    weather === 'sunny' ? '☀️' : weather === 'cloudy' ? '☁️' : season === 3 ? '🌨️' : '🌧️';

  const rows = Math.ceil(plots.length / 3);
  const pad = 12;
  const gap = 10;
  // Clear vertical spacing:
  // Fence is at y=82. Plots start safely at topPad=104.
  // Dirt road is at bottom 38px. Plots end safely above at bottomPad=48.
  const topPad = 104;
  const bottomPad = 48;

  // 60fps animation loop
  useEffect(() => {
    let id: number;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setAnimTime((t) => t + dt);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        const tile = (w - 2 * pad - 2 * gap) / 3;
        const h = topPad + rows * tile + (rows - 1) * gap + bottomPad + 6;
        setDimensions({ width: w, height: h });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [rows]);

  const handleWaterAll = () => {
    const err = waterAll();
    showToast(err);
  };

  const readyPlots = plots.filter((p) => p.crop !== null && p.progress >= 1);

  const handleHarvestAll = () => {
    let harvested = 0;
    plots.forEach((p, idx) => {
      if (p.crop && p.progress >= 1) {
        const err = harvest(idx);
        if (!err) harvested++;
      }
    });
    if (harvested > 0) {
      showToast(lang === 'ar' ? `تم حصاد ${harvested} أحواض بنجاح!` : `Harvested ${harvested} plots!`);
    }
  };

  const handleSpray = () => {
    const err = spray();
    showToast(err);
  };

  // Tractor position exclusively along bottom dirt road
  const tractorCycle = (animTime % 16) / 16;
  const tractorX = -60 + tractorCycle * (dimensions.width + 120);
  const windMult = weather === 'rain' ? 2.6 : weather === 'cloudy' ? 1.8 : 1.0;

  return (
    <div className="w-full max-w-lg mx-auto p-4 space-y-3.5">
      {/* 1. Village Emergency Grant Banner (Safety net) */}
      {villageGrantBanner && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-[#1E2A22] flex items-center gap-3 animate-fade-in shadow-md">
          <span className="text-2xl select-none">🤝</span>
          <div className="flex-1 text-xs font-bold leading-tight text-emerald-950">
            {tr('villageGrantBanner')}
          </div>
          <button
            onClick={dismissGrantBanner}
            className="py-1 px-3 rounded-xl bg-[#2F7D4E] text-white font-extrabold text-xs hover:bg-[#286b43] transition cursor-pointer shadow-xs"
          >
            {tr('dismiss')}
          </button>
        </div>
      )}

      {/* 2. Season & Weather Status Panel */}
      <Panel className="space-y-1.5 bg-white/95 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl select-none">{seasonEmoji}</span>
          <div className="flex-1">
            <h2 className="text-base font-extrabold text-[#1E2A22]">
              {tr(seasonKeys[season])} · {tr('day')} <bdi dir="ltr">{dayCount + 1}</bdi>
            </h2>
            <div className="text-xs text-[#7B857E] font-medium mt-0.5 flex items-center gap-1.5 flex-wrap">
              <bdi dir="ltr">{hhmm(hour)}</bdi>
              <span>·</span>
              <span>🌡️</span>
              <bdi dir="ltr">{temperature}°C</bdi>
              <span>·</span>
              <span>{weatherEmoji}</span>
              <span>{tr(weather)}</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#7B857E] pt-1 leading-snug border-t border-gray-100 mt-2">
          {tr(`sHint${season}`)}
        </p>
      </Panel>

      {/* 3. Daily Risk Event Banner */}
      {event !== 'none' && (
        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-[#1E2A22] flex items-center gap-2.5 animate-fade-in shadow-xs">
          <span className="text-2xl">
            {event === 'pests' ? '🐛' : event === 'frost' ? '🥶' : '📈'}
          </span>
          <div className="flex-1 text-xs font-semibold leading-tight">
            {event === 'pests' && tr('evPests')}
            {event === 'frost' && tr('evFrost')}
            {event === 'boom' && `${tr('evBoom')} ${kEmoji[eventItem] || ''} ${tr(eventItem)}`}
          </div>
          {event === 'pests' && (
            <button
              onClick={handleSpray}
              className="py-1.5 px-3 rounded-xl bg-amber-600 text-white font-bold text-xs shadow-xs hover:bg-amber-700 active:scale-95 transition"
            >
              <span className="inline-flex items-center gap-1" dir="ltr">
                <span>{tr('spray')}</span>
                <span>{SPRAY_COST}</span>
                <span>🪙</span>
              </span>
            </button>
          )}
        </div>
      )}

      {/* 4. Visual Interactive Farm Map */}
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl overflow-hidden shadow-md select-none border border-[#8D6E4B]/40"
        style={{ height: `${dimensions.height}px` }}
      >
        {/* Layer 1: Ground Canvas (Grass, textured fence, dirt path) */}
        <GroundCanvas
          season={season}
          width={dimensions.width}
          height={dimensions.height}
        />

        {/* Layer 2: Farm Infrastructure Courtyard (Top) */}
        <div className="absolute top-0 left-0 right-0 h-[88px] z-5 pointer-events-none">
          {/* Elevated Steel Water Tank (Top Left) */}
          <div
            className="absolute top-1 left-2 w-14 h-19 pointer-events-auto cursor-pointer drop-shadow-md"
            title={`${tr('water')} (${Math.round(tank)}/${Math.round(capacity)} L)`}
          >
            <ElevatedWaterTank
              water={tank}
              capacity={capacity}
              tankLevel={tankLevel}
            />
          </div>

          {/* Rustic Spinning Windmill (Beside Water Tank - pumps water passively) */}
          <div
            className="absolute top-1 left-18 w-13 h-18 pointer-events-none drop-shadow-md"
            title={tr('windmillPumping')}
          >
            <Windmill
              animTime={animTime}
              windSpeedMultiplier={windMult}
            />
          </div>

          {/* Pipe running down from tank */}
          <svg className="absolute top-19 left-8 w-6 h-6 overflow-visible pointer-events-none">
            <path d="M 0 0 L 0 12 L 18 12" fill="none" stroke="#546E7A" strokeWidth="2.5" />
          </svg>

          {/* Rural Mailbox by fence */}
          <div className="absolute top-14 left-32 text-xs select-none">
            📬
          </div>

          {/* Scarecrow (Top Right edge) */}
          <div className="absolute top-9 right-20 w-8 h-12 pointer-events-none drop-shadow-sm">
            <Scarecrow />
          </div>

          {/* Grain Silo with Fill Gauge (Top Right) */}
          <div
            className="absolute top-1 right-2 w-16 h-19 pointer-events-auto cursor-pointer drop-shadow-md"
            title={`${tr('silo')} (${silo}/${siloCap})`}
          >
            <GrainSilo
              silo={silo}
              siloCap={siloCap}
              siloLevel={siloLevel}
            />
          </div>
        </div>

        {/* Layer 3: Plots Grid Tiles with generous spacing from fence and dirt path */}
        <div
          className="absolute inset-0 z-10"
          style={{
            paddingLeft: `${pad}px`,
            paddingRight: `${pad}px`,
            paddingTop: `${topPad}px`,
            paddingBottom: `${bottomPad}px`,
          }}
        >
          {/* Animated Sprinkler Heads (if sprinkler upgrade owned) */}
          {sprinkler && (
            <div className="absolute top-[88px] left-0 right-0 h-6 pointer-events-none z-15 flex justify-around px-8">
              <div className="w-10 h-8">
                <SprinklerHead animTime={animTime} active={true} />
              </div>
              <div className="w-10 h-8">
                <SprinklerHead animTime={animTime + 0.4} active={true} />
              </div>
              <div className="w-10 h-8">
                <SprinklerHead animTime={animTime + 0.8} active={true} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2.5 w-full h-full">
            {plots.map((_, i) => (
              <PlotTile
                key={i}
                index={i}
                onPickSeed={() => setActivePlotIndex(i)}
                onOpenInfo={() => setInfoPlotIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* Layer 4: Vintage Red Tractor Driving Strictly on Bottom Dirt Path */}
        <div
          className="absolute z-15 pointer-events-none transition-transform duration-75 drop-shadow-md"
          style={{
            bottom: '4px',
            left: `${tractorX}px`,
            width: '50px',
            height: '30px',
          }}
        >
          <FarmTractor animTime={animTime} />
        </div>

        {/* Layer 5: Weather Rain/Snow/Clouds Animation */}
        <WeatherOverlay
          weather={weather}
          season={season}
          width={dimensions.width}
          height={dimensions.height}
        />

        {/* Layer 6: Day/Night + Sunset + Stars Overlay */}
        <DayNightOverlay
          darkness={darkness}
          hour={hour}
          width={dimensions.width}
          height={dimensions.height}
        />
      </div>

      {/* 5. Action Buttons & Rotation Tip */}
      <div className="flex gap-2">
        {readyPlots.length > 0 && (
          <button
            onClick={handleHarvestAll}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-amber-500 text-white font-bold text-sm shadow-md hover:bg-amber-600 active:scale-[0.99] transition cursor-pointer animate-pulse"
          >
            <span>🌾</span>
            <span>{lang === 'ar' ? `حصاد الكل (${readyPlots.length})` : `Harvest All (${readyPlots.length})`}</span>
          </button>
        )}

        <button
          onClick={handleWaterAll}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#2F7D4E] text-white font-bold text-sm shadow-md hover:bg-[#286b43] active:scale-[0.99] transition cursor-pointer"
        >
          <Droplets className="w-4 h-4" />
          <span>{tr('waterAll')}</span>
        </button>
      </div>

      <p className="text-[11px] text-[#7B857E] text-center leading-relaxed">
        {tr('rotationTip')}
      </p>

      {/* Seed Picker Modal */}
      {activePlotIndex !== null && (
        <SeedPickerModal
          plotIndex={activePlotIndex}
          onClose={() => setActivePlotIndex(null)}
        />
      )}

      {/* Plot Soil Info & Fertilizer Modal */}
      {infoPlotIndex !== null && (
        <PlotInfoModal
          plotIndex={infoPlotIndex}
          onClose={() => setInfoPlotIndex(null)}
        />
      )}
    </div>
  );
};

// -------------------------------------------------------------
// Plot Tile Component with Rich Soil, Pulsing Harvest Hint & DPR Canvas
// -------------------------------------------------------------
const PlotTile: React.FC<{
  index: number;
  onPickSeed: () => void;
  onOpenInfo: () => void;
}> = ({ index, onPickSeed, onOpenInfo }) => {
  const { plots, tr, water, harvest, showToast } = useGame();
  const p = plots[index];
  const isReady = p.crop !== null && p.progress >= 1.0;
  const isWilted = p.crop !== null && p.water <= 0;

  const longPressTimerRef = useRef<number | null>(null);

  const getSoilBackground = () => {
    // Rich earthy soil texture with darker moist tones
    const darkMoist = p.water > 0.5;
    const baseColor = darkMoist ? '#4A3423' : p.water > 0.1 ? '#684B33' : '#8A6946';
    const infertile = p.fertility < 0.35;
    return infertile ? '#9A7D5C' : baseColor;
  };

  const handlePointerDown = () => {
    longPressTimerRef.current = setTimeout(() => {
      onOpenInfo();
    }, 550);
  };

  const handlePointerUp = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

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

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleTap}
      className={`relative aspect-square rounded-2xl p-1.5 flex flex-col justify-between cursor-pointer select-none transition-all duration-200 shadow-md active:scale-95 ${
        isReady
          ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-white animate-pulse shadow-xl'
          : 'border border-black/20'
      }`}
      style={{ backgroundColor: getSoilBackground() }}
    >
      {/* Furrow soil lines background with depth */}
      <div className="absolute inset-0 pointer-events-none opacity-25 flex flex-col justify-around py-1.5 px-1">
        <div className="border-b-2 border-black/60 shadow-2xs w-full" />
        <div className="border-b-2 border-black/60 shadow-2xs w-full" />
        <div className="border-b-2 border-black/60 shadow-2xs w-full" />
      </div>

      {/* Top badges: info button, sparkle or fertility warning */}
      <div className="flex items-center justify-between w-full relative z-5">
        {p.fertility < 0.35 ? (
          <span className="text-[11px]" title="Low fertility">
            ⚠️
          </span>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenInfo();
            }}
            className="text-[10px] text-white/80 hover:text-white px-1 rounded-sm bg-black/25"
          >
            ℹ️
          </button>
        )}

        {isReady && <span className="text-xs animate-spin-slow">✨</span>}
        {p.crop && !isReady && (
          <span className="text-[10px] font-black text-white drop-shadow-md">
            <bdi dir="ltr">{Math.round(p.progress * 100)}%</bdi>
          </span>
        )}
      </div>

      {/* Center Procedural High-DPI Crop Canvas */}
      <div className="flex-1 flex items-center justify-center relative z-5">
        {p.crop ? (
          <CropCanvas
            crop={p.crop}
            progress={p.progress}
            wilted={isWilted}
            size={76}
          />
        ) : (
          <span className="text-2xl text-white/50 font-black">➕</span>
        )}
      </div>

      {/* Clear Pulsing Harvest Hint Banner when ready */}
      {isReady && (
        <div className="absolute inset-x-1 bottom-4 z-20 flex justify-center pointer-events-none">
          <span className="bg-amber-400 text-amber-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-lg animate-bounce flex items-center gap-1 border border-amber-300">
            <span>🌾</span>
            <span>{tr('harvestReady')}</span>
          </span>
        </div>
      )}

      {/* Water Bar at Bottom */}
      <div className="w-full relative z-5">
        <Bar value={p.water} color="#3E8ED0" height={4} />
      </div>
    </div>
  );
};

const SeedPickerModal: React.FC<{
  plotIndex: number;
  onClose: () => void;
}> = ({ plotIndex, onClose }) => {
  const { tr, level, plant, inSeason, priceOf, showToast } = useGame();

  const handleSelectCrop = (crop: CropType) => {
    const err = plant(plotIndex, crop);
    onClose();
    showToast(err);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs animate-fade-in p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-gray-100 max-h-[85vh] overflow-y-auto text-[#1E2A22]">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-base font-extrabold">{tr('seed')}</h3>
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
            const inCurrSeason = inSeason(key);
            const currentSell = priceOf(key);

            return (
              <button
                key={key}
                disabled={!isUnlocked}
                onClick={() => handleSelectCrop(key)}
                className={`w-full py-3 px-2 flex items-center gap-3 text-start transition rounded-xl ${
                  isUnlocked
                    ? 'hover:bg-gray-50 active:bg-gray-100 cursor-pointer'
                    : 'opacity-40 cursor-not-allowed'
                }`}
              >
                <span className="text-3xl">{crop.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{tr(key)}</span>
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                        inCurrSeason
                          ? 'bg-green-100 text-[#2F7D4E]'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {inCurrSeason ? `✔ ${tr('inSeason')}` : `✖ ${tr('offSeason')}`}
                    </span>
                  </div>

                  <div className="text-xs text-[#7B857E] mt-0.5 flex items-center gap-1 flex-wrap">
                    <span>{tr('seed')}</span>
                    <bdi dir="ltr">{crop.seedCost} 🪙</bdi>
                    <span>·</span>
                    <bdi dir="ltr">{crop.growSeconds}s</bdi>
                    <span>·</span>
                    <span>{tr('sells')}</span>
                    <bdi dir="ltr">{currentSell} 🪙</bdi>
                  </div>
                </div>

                {!isUnlocked && (
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-md" dir="ltr">
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

const PlotInfoModal: React.FC<{
  plotIndex: number;
  onClose: () => void;
}> = ({ plotIndex, onClose }) => {
  const { plots, tr, inSeason, fertilize, removeCrop, showToast, lang } = useGame();
  const p = plots[plotIndex];
  const cropDef = p.crop ? kCrops[p.crop] : null;

  const handleFertilize = () => {
    const err = fertilize(plotIndex);
    showToast(err);
    onClose();
  };

  const handleRemove = () => {
    removeCrop(plotIndex);
    onClose();
  };

  // Agronomic calculations
  const moisturePct = Math.round(p.water * 100);
  const moistureStatus =
    p.water > 0.65
      ? { label: lang === 'ar' ? 'رطوبة مثالية 💧' : 'Optimal Moisture 💧', color: 'text-blue-600 bg-blue-50' }
      : p.water > 0.25
      ? { label: lang === 'ar' ? 'رطوبة معتدلة 🌱' : 'Moderate Moisture 🌱', color: 'text-amber-700 bg-amber-50' }
      : { label: lang === 'ar' ? 'تربة جافة 🏜️' : 'Dry Soil 🏜️', color: 'text-red-700 bg-red-50' };

  const stageInfo = (() => {
    if (!p.crop) {
      return {
        title: lang === 'ar' ? 'تربة محروثة جاهزة' : 'Tilled Fallow Soil',
        desc: lang === 'ar' ? 'التربة مهيأة وجاهزة لاستقبال البذور.' : 'Soil is prepared and aerated for planting.',
      };
    }
    if (p.progress < 0.15) {
      return {
        title: lang === 'ar' ? 'مرحلة الإنبات وبزوغ الجذور 🌱' : 'Germination & Radicle Stage 🌱',
        desc: lang === 'ar' ? 'البذرة امتصت الرطوبة وبدأت الجذور الأولى بالتشكل.' : 'Seed absorbed water and radicle root is anchoring.',
      };
    }
    if (p.progress < 0.5) {
      return {
        title: lang === 'ar' ? 'النمو الخضري وتفرع الأوراق 🌿' : 'Vegetative Foliage Stage 🌿',
        desc: lang === 'ar' ? 'تكوين السيقان والأوراق الخضراء والبناء الضوئي النشط.' : 'Vigorous stem and leaf canopy photosynthesis.',
      };
    }
    if (p.progress < 0.85) {
      return {
        title: lang === 'ar' ? 'مرحلة الإزهار وتكوين الثمار 🌼' : 'Flowering & Budding Stage 🌼',
        desc: lang === 'ar' ? 'تفتح الأزهار وبدء عقد المحصول.' : 'Blossoms opening and fruit setting.',
      };
    }
    return {
      title: lang === 'ar' ? 'النضج الكامل وجاهزية الحصاد 🍅' : 'Full Ripeness & Harvest Ready 🍅',
      desc: lang === 'ar' ? 'اكتملت القيمة الغذائية والحجم، المحصول جاهز للقطف.' : 'Optimal Brix sugar and firmness, ready to harvest.',
    };
  })();

  const estimatedYieldKg = (() => {
    if (!p.crop) return 0;
    const baseKg: Record<CropType, number> = {
      tomato: 2.2,
      lettuce: 1.1,
      corn: 3.4,
      carrot: 1.6,
      strawberry: 0.8,
    };
    const mult = p.fertility >= 0.8 ? 2 : 1;
    return (baseKg[p.crop] * mult).toFixed(1);
  })();

  const isRotated = p.lastCrop !== null && p.crop && p.lastCrop !== kCropIndices[p.crop];
  const isMonoculture = p.lastCrop !== null && p.crop && p.lastCrop === kCropIndices[p.crop];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/45 backdrop-blur-xs animate-fade-in p-0 sm:p-4">
      <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-gray-100 text-[#1E2A22] space-y-3.5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{cropDef ? cropDef.emoji : '🟫'}</span>
            <div>
              <h3 className="text-base font-extrabold leading-tight">
                {p.crop ? tr(p.crop) : tr('soil')}
              </h3>
              <p className="text-[10px] text-[#7B857E]">
                {lang === 'ar' ? `حوض زراعي رقم #${plotIndex + 1}` : `Field Plot #${plotIndex + 1}`}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Biological Stage */}
        <div className="rounded-2xl bg-gray-50/80 p-3 border border-gray-100 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1E2A22]">{stageInfo.title}</span>
            {p.crop && (
              <span className="text-xs font-black text-[#2F7D4E]" dir="ltr">
                {Math.round(p.progress * 100)}%
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#7B857E] leading-relaxed">{stageInfo.desc}</p>
          {p.crop && (
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1">
              <div
                className="bg-[#2F7D4E] h-full transition-all duration-300"
                style={{ width: `${Math.round(p.progress * 100)}%` }}
              />
            </div>
          )}
        </div>

        {/* Moisture & Soil Telemetry Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Soil Moisture */}
          <div className="rounded-2xl border border-gray-100 p-2.5 bg-white space-y-1">
            <div className="flex items-center justify-between text-[#7B857E] font-medium text-[11px]">
              <span>{lang === 'ar' ? 'رطوبة التربة' : 'Soil Moisture'}</span>
              <span className="font-bold text-[#1E2A22]" dir="ltr">{moisturePct}%</span>
            </div>
            <Bar value={p.water} color="#3E8ED0" height={6} />
            <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-md ${moistureStatus.color}`}>
              {moistureStatus.label}
            </span>
          </div>

          {/* Expected Yield */}
          <div className="rounded-2xl border border-gray-100 p-2.5 bg-white space-y-1">
            <span className="text-[#7B857E] font-medium text-[11px] block">
              {lang === 'ar' ? 'الإنتاج المتوقع' : 'Estimated Yield'}
            </span>
            <div className="text-sm font-black text-[#2F7D4E] mt-0.5" dir="ltr">
              {p.crop ? `${estimatedYieldKg} kg` : '--'}
            </div>
            <span className="text-[10px] text-[#7B857E]">
              {p.fertility >= 0.8
                ? (lang === 'ar' ? '🌟 مضاعف بالسماد' : '🌟 Doubled (Fertile)')
                : (lang === 'ar' ? 'إنتاج قياسي' : 'Standard Yield')}
            </span>
          </div>
        </div>

        {/* Fertility & Organic Compost */}
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-3 space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-[#2F7D4E]">
              {lang === 'ar' ? 'خصوبة النيتروجين والدبال' : 'NPK Organic Fertility'}
            </span>
            <span className="font-black text-[#2F7D4E]" dir="ltr">
              {Math.round(p.fertility * 100)}%
            </span>
          </div>
          <Bar value={p.fertility} color="#2F7D4E" height={7} />
          {p.fertility >= 0.8 ? (
            <p className="text-[10px] text-[#2F7D4E] font-bold">
              {lang === 'ar' ? '✨ تربة دبالية غنية: تمنح محصولاً مضاعفاً عند الحصاد!' : '✨ Rich humus soil: yields double harvest!'}
            </p>
          ) : (
            <p className="text-[10px] text-[#7B857E]">
              {lang === 'ar' ? 'أضف السماد العضوي لرفع الخصوبة لـ 100% ومضاعفة الناتج.' : 'Add compost to boost fertility to 100% for 2x yield.'}
            </p>
          )}
        </div>

        {/* Crop Rotation Status */}
        {p.crop && (
          <div className="text-[11px] rounded-xl p-2.5 bg-amber-50/60 border border-amber-200/50 text-amber-900 leading-relaxed">
            {isRotated ? (
              <span>
                {lang === 'ar'
                  ? '🌱 دورة زراعية متوازنة: تبديل المحصول حافظ على توازن معادن التربة ومنع انتشار الآفات.'
                  : '🌱 Balanced Crop Rotation: Rotating crops maintains soil nutrition balance.'}
              </span>
            ) : isMonoculture ? (
              <span>
                {lang === 'ar'
                  ? '⚠️ زراعة أحادية متكررة: زراعة نفس الصنف مرتين تستنزف معادن محددة. يفضل التبديل بعد الحصاد.'
                  : '⚠️ Monoculture: Re-planting the same crop exhausts specific soil minerals.'}
              </span>
            ) : (
              <span>
                {lang === 'ar'
                  ? '💡 نصيحة زراعية: تبديل المحاصيل دورياً بين البقوليات والخضار الجذرية يحافظ على توازن التربة.'
                  : '💡 Agronomic tip: Rotating between leafy greens and roots replenishes nitrogen naturally.'}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleFertilize}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#2F7D4E] text-white font-bold text-xs hover:bg-[#25633E] active:scale-95 transition cursor-pointer shadow-sm"
          >
            <span className="inline-flex items-center gap-1" dir="ltr">
              <span>{tr('fertilize')}</span>
              <span>({FERTILIZER_COST} 🪙)</span>
            </span>
          </button>

          {p.crop && (
            <button
              onClick={handleRemove}
              className="py-2.5 px-3 rounded-xl border border-red-200 text-red-600 font-bold text-xs hover:bg-red-50 active:scale-95 transition cursor-pointer"
            >
              {tr('removeCrop')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
