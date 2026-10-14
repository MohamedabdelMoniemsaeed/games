import React, { useState, useEffect, useRef } from 'react';
import { useGame, HEAL_COST } from '../game/GameContext';
import { kAnimals, kEmoji } from '../game/constants';
import { AnimalType } from '../game/models';
import { playSound } from '../game/sound';
import { Panel, Bar } from './Common';
import { RealisticAnimal } from './AnimalSprites';
import {
  RedBarn,
  WoodenFeedTrough,
  AnimalWaterTrough,
} from './FarmInfrastructure';

export const AnimalsView: React.FC = () => {
  const {
    tr,
    animals,
    penSize,
    level,
    silo,
    siloCap,
    seasonFeedPrice,
    buyFeed,
    buyAnimal,
    feed,
    collect,
    soundOn,
    lang,
    showToast,
  } = useGame();

  const handleBuy = (t: AnimalType) => {
    const err = buyAnimal(t);
    showToast(err);
  };

  const handleBuyFeed = (bulk: boolean) => {
    const err = buyFeed(bulk);
    showToast(err);
  };

  const hasHungry = animals.some((a) => a.fullness < 0.9);
  const hasCollectable = animals.some((a) => a.stored > 0);

  const handleFeedAll = () => {
    let fedCount = 0;
    animals.forEach((a, i) => {
      if (a.fullness < 0.9) {
        const res = feed(i);
        if (res === 'fed') fedCount++;
      }
    });
    if (fedCount > 0) {
      playSound('feed', soundOn);
      showToast(lang === 'ar' ? `تم إطعام ${fedCount} من الحيوانات!` : `Fed ${fedCount} animals!`);
    } else {
      showToast(lang === 'ar' ? 'جميع الحيوانات شبعانة!' : 'All animals are fed!');
    }
  };

  const handleCollectAll = () => {
    let collectedCount = 0;
    animals.forEach((a, i) => {
      if (a.stored > 0) {
        const res = collect(i);
        if (!res) collectedCount += a.stored;
      }
    });
    if (collectedCount > 0) {
      playSound('collect', soundOn);
      showToast(lang === 'ar' ? `تم جمع الإنتاج بنجاح!` : `Collected products!`);
    }
  };

  const cost1 = seasonFeedPrice;
  const cost5 = Math.round(5 * seasonFeedPrice * 0.85);

  return (
    <div className="w-full max-w-lg mx-auto p-4 space-y-4">
      {/* 1. Feed Silo & Resource Bar */}
      <Panel className="p-3 bg-amber-50/50 border border-amber-200/60 shadow-2xs">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl select-none">🌾</span>
            <div>
              <div className="text-xs font-black text-[#1E2A22]">
                {tr('feedStock')}: <bdi dir="ltr">{silo} / {siloCap}</bdi>
              </div>
              <div className="w-24 mt-1">
                <Bar value={silo / siloCap} color="#D97706" height={6} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleBuyFeed(false)}
              className="py-1 px-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#1E2A22] hover:bg-amber-100/50 active:scale-95 transition cursor-pointer shadow-2xs"
            >
              <span className="inline-flex items-center gap-0.5" dir="ltr">
                <span>+10</span>
                <span>(</span>
                <span className="font-extrabold text-[#2F7D4E]">{cost1}</span>
                <span>🪙</span>
                <span>)</span>
              </span>
            </button>
            <button
              onClick={() => handleBuyFeed(true)}
              className="py-1 px-2.5 rounded-xl bg-[#2F7D4E] text-white text-xs font-bold hover:bg-[#286b43] active:scale-95 transition cursor-pointer shadow-2xs"
            >
              <span className="inline-flex items-center gap-0.5" dir="ltr">
                <span>+50</span>
                <span>(</span>
                <span className="font-extrabold text-amber-200">{cost5}</span>
                <span>🪙</span>
                <span>)</span>
              </span>
            </button>
          </div>
        </div>
      </Panel>

      {/* 2. Realistic Compact Pasture Scene with Barn & Troughs */}
      <RealisticPastureScene />

      {/* 3. Pen Capacity Header & Quick Actions for All Ages */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <h2 className="text-base font-extrabold text-[#1E2A22]">
          {tr('pen')} <bdi dir="ltr">{animals.length} / {penSize}</bdi>
        </h2>

        <div className="flex items-center gap-1.5">
          {hasHungry && (
            <button
              onClick={handleFeedAll}
              className="py-1 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-bold transition shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <span>🌾 {lang === 'ar' ? 'إطعام الكل' : 'Feed All'}</span>
            </button>
          )}

          {hasCollectable && (
            <button
              onClick={handleCollectAll}
              className="py-1 px-3 rounded-xl bg-[#2F7D4E] hover:bg-[#25633E] active:scale-95 text-white text-xs font-bold transition shadow-xs flex items-center gap-1 cursor-pointer animate-pulse"
            >
              <span>🧺 {lang === 'ar' ? 'جمع الكل' : 'Collect All'}</span>
            </button>
          )}
        </div>
      </div>

      {/* 4. Owned Animals List */}
      <div className="space-y-3">
        {animals.map((_, i) => (
          <AnimalCard key={i} index={i} />
        ))}
      </div>

      {/* 5. Buy Animals Market Section */}
      <div className="pt-2 space-y-2.5">
        {(Object.keys(kAnimals) as AnimalType[]).map((type) => {
          const def = kAnimals[type];
          const isUnlocked = level >= def.unlockLevel;

          return (
            <Panel key={type} className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <RealisticAnimal
                  type={type}
                  growth={1}
                  fullness={1}
                  health={1}
                  stored={0}
                  animTime={1}
                  isMoving={false}
                  facingRight={true}
                  isSleeping={false}
                />
              </div>

              <div className="flex-1">
                <div className="text-sm font-bold text-[#1E2A22]">{tr(type)}</div>
                <div className="text-xs text-[#7B857E] mt-0.5">
                  {kEmoji[def.product]} {tr(def.product)} · <bdi dir="ltr">{def.period}s</bdi>
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
                {!isUnlocked ? (
                  <span className="inline-flex items-center gap-1" dir="ltr">
                    <span>🔒</span>
                    <span>{tr('level')}</span>
                    <span>{def.unlockLevel}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1" dir="ltr">
                    <span>{tr('buy')}</span>
                    <span>{def.cost}</span>
                    <span>🪙</span>
                  </span>
                )}
              </button>
            </Panel>
          );
        })}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Realistic Compact Pasture Scene with Barn, Nearby Troughs & Real Sprites
// -------------------------------------------------------------
interface AnimalAgent {
  x: number; // 15..85 %
  y: number; // 40..85 %
  vx: number;
  vy: number;
  facingRight: boolean;
  state: 'idle' | 'walking' | 'eating' | 'drinking';
  stateTimer: number;
}

const RealisticPastureScene: React.FC = () => {
  const { animals, feedTrough, tank, darkness, weather, tr, soundOn } = useGame();
  const [animTime, setAnimTime] = useState(0);

  // Sleeping or sheltered condition: night or rain
  const isNight = darkness > 0.35;
  const isRain = weather === 'rain';
  const shouldShelter = isNight || isRain;

  const agentsRef = useRef<AnimalAgent[]>([]);

  useEffect(() => {
    if (agentsRef.current.length !== animals.length) {
      agentsRef.current = animals.map((_, i) => ({
        x: 22 + (i * 18) % 56,
        y: 52 + (i * 14) % 32,
        vx: 0,
        vy: 0,
        facingRight: Math.random() > 0.5,
        state: 'idle',
        stateTimer: Math.random() * 2,
      }));
    }
  }, [animals.length]);

  useEffect(() => {
    let animId: number;
    let lastStamp = performance.now();

    const loop = (stamp: number) => {
      const dt = Math.min(0.05, (stamp - lastStamp) / 1000);
      lastStamp = stamp;

      setAnimTime((t: number) => t + dt);

      // In clear daytime: natural wandering, grazing, and seeking troughs
      if (!shouldShelter) {
        const agents = agentsRef.current;
        for (let i = 0; i < agents.length; i++) {
          const a = agents[i];
          const animalData = animals[i];
          if (!animalData) continue;

          a.stateTimer -= dt;
          if (a.stateTimer <= 0) {
            const isHungry = animalData.fullness < 0.4;
            if (isHungry && Math.random() < 0.55) {
              // Wander towards feed trough (left side of barn: x: 18, y: 38)
              a.state = 'eating';
              a.stateTimer = 4 + Math.random() * 4;
              const targetX = 16 + Math.random() * 8;
              const targetY = 36 + Math.random() * 8;
              const dx = targetX - a.x;
              const dy = targetY - a.y;
              const dist = Math.hypot(dx, dy) || 1;
              const speed = 7;
              a.vx = (dx / dist) * speed;
              a.vy = (dy / dist) * speed;
            } else if (Math.random() < 0.25) {
              // Wander towards water trough (right side of barn: x: 80, y: 38)
              a.state = 'drinking';
              a.stateTimer = 3 + Math.random() * 3;
              const targetX = 76 + Math.random() * 8;
              const targetY = 36 + Math.random() * 8;
              const dx = targetX - a.x;
              const dy = targetY - a.y;
              const dist = Math.hypot(dx, dy) || 1;
              const speed = 6;
              a.vx = (dx / dist) * speed;
              a.vy = (dy / dist) * speed;
            } else if (Math.random() < 0.4) {
              // Casual walk in the grassy pasture
              a.state = 'walking';
              a.stateTimer = 2 + Math.random() * 3;
              const angle = Math.random() * Math.PI * 2;
              const speed = 6 + Math.random() * 4;
              a.vx = Math.cos(angle) * speed;
              a.vy = Math.sin(angle) * speed;
            } else {
              // Grazing / pecking idly
              a.state = 'idle';
              a.stateTimer = 2 + Math.random() * 4;
              a.vx = 0;
              a.vy = 0;
            }
          }

          // Gentle separation
          for (let j = 0; j < agents.length; j++) {
            if (i === j) continue;
            const other = agents[j];
            const dx = a.x - other.x;
            const dy = a.y - other.y;
            const dist = Math.hypot(dx, dy);
            if (dist > 0 && dist < 14) {
              const repel = (14 - dist) * 0.45;
              a.vx += (dx / dist) * repel;
              a.vy += (dy / dist) * repel;
            }
          }

          // Position update
          a.x += a.vx * dt;
          a.y += a.vy * dt;

          // Keep in bounds
          if (a.x < 12) { a.x = 12; a.vx = Math.abs(a.vx); }
          if (a.x > 88) { a.x = 88; a.vx = -Math.abs(a.vx); }
          if (a.y < 34) { a.y = 34; a.vy = Math.abs(a.vy); }
          if (a.y > 84) { a.y = 84; a.vy = -Math.abs(a.vy); }

          if (Math.abs(a.vx) > 0.4) {
            a.facingRight = a.vx > 0;
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [animals, shouldShelter]);

  return (
    <div className="relative w-full h-64 rounded-3xl overflow-hidden border-2 border-[#8D6E4B] shadow-md select-none bg-[#98C762]">
      {/* 1. Pasture Ground & Fence Textures */}
      <div className="absolute inset-0 bg-linear-to-b from-[#8EBE59] via-[#9DC864] to-[#88B854]" />

      {/* Wildflowers and Ambient Grass */}
      <div className="absolute inset-0 pointer-events-none opacity-45">
        <span className="absolute top-28 left-8 text-[10px]">🌼</span>
        <span className="absolute top-40 left-28 text-[10px]">🌸</span>
        <span className="absolute top-48 right-12 text-[10px]">🌼</span>
        <span className="absolute top-32 right-32 text-[10px]">🌱</span>
        <span className="absolute bottom-4 left-16 text-[10px]">🌿</span>
      </div>

      {/* Decorative Wooden Fence across top */}
      <div className="absolute top-12 left-0 right-0 h-4 border-b-2 border-dashed border-[#8D6E4B]/40 pointer-events-none" />

      {/* 2. Red Barn (Top Center) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-26 pointer-events-none z-10">
        <RedBarn isOpen={!shouldShelter} darkness={darkness} />
      </div>

      {/* 3. Wooden Feed Trough (Beside Barn - Top Left) */}
      <div className="absolute top-8 left-3 w-16 h-8 z-15">
        <WoodenFeedTrough feedTrough={feedTrough} />
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-extrabold text-[#4E342E] bg-white/85 px-1 rounded-sm shadow-2xs whitespace-nowrap">
          {tr('feedTrough')}
        </span>
      </div>

      {/* 4. Animal Water Trough (Beside Barn - Top Right) */}
      <div className="absolute top-8 right-3 w-16 h-8 z-15">
        <AnimalWaterTrough tankWater={tank} />
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-extrabold text-[#1E293B] bg-white/85 px-1 rounded-sm shadow-2xs whitespace-nowrap">
          {tr('waterTrough')}
        </span>
      </div>

      {/* 5. Animals: Wandering Outside (Daytime) OR Real Sprites Resting Inside (Night/Rain) */}
      {shouldShelter ? (
        /* Real animal sprites lying down peacefully inside or near the warm barn shelter */
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-3 bg-black/15 pointer-events-none">
          {/* Subtle status caption without any overlapping icons */}
          <div className="mb-2 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
            <span>{isNight ? '🌙' : '🌧️'}</span>
            <span>{isNight ? tr('barnSleeping') : tr('barnShelter')}</span>
          </div>

          {/* Golden straw bedding cutaway with real sleeping animals */}
          <div className="w-[92%] h-24 bg-[#E0AB48]/25 border-2 border-[#D97706]/40 rounded-2xl p-2 relative flex items-center justify-around overflow-visible">
            {/* Straw texture dots */}
            <div className="absolute inset-0 opacity-20 pointer-events-none text-[8px] flex flex-wrap gap-2 p-1 overflow-hidden">
              <span>🌾</span><span>🌾</span><span>🌾</span><span>🌾</span><span>🌾</span><span>🌾</span>
            </div>

            {animals.map((a, i) => {
              const isAdult = a.growth >= 0.85;
              const widthPx = a.type === 'cow' ? (isAdult ? 68 : 46) : a.type === 'sheep' ? (isAdult ? 52 : 36) : (isAdult ? 38 : 28);
              const heightPx = a.type === 'cow' ? (isAdult ? 52 : 36) : a.type === 'sheep' ? (isAdult ? 42 : 30) : (isAdult ? 34 : 26);

              return (
                <div key={i} className="relative flex flex-col items-center">
                  <div
                    style={{
                      width: `${widthPx}px`,
                      height: `${heightPx}px`,
                    }}
                  >
                    <RealisticAnimal
                      type={a.type}
                      growth={a.growth}
                      fullness={a.fullness}
                      health={a.health}
                      stored={a.stored}
                      animTime={animTime + i * 1.5}
                      isMoving={false}
                      facingRight={i % 2 === 0}
                      isSleeping={true}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Daytime clear weather: active wandering realistic animals */
        animals.map((a, i) => {
          const agent = agentsRef.current[i] || {
            x: 50,
            y: 55,
            vx: 0,
            vy: 0,
            facingRight: true,
            state: 'idle',
          };

          const isMoving = Math.abs(agent.vx) > 0.2 || Math.abs(agent.vy) > 0.2;
          const isAdult = a.growth >= 0.85;

          const widthPx = a.type === 'cow' ? (isAdult ? 78 : 52) : a.type === 'sheep' ? (isAdult ? 60 : 42) : (isAdult ? 44 : 32);
          const heightPx = a.type === 'cow' ? (isAdult ? 62 : 42) : a.type === 'sheep' ? (isAdult ? 50 : 36) : (isAdult ? 42 : 30);

          return (
            <div
              key={i}
              onClick={() =>
                playSound(
                  a.type === 'cow' ? 'moo' : a.type === 'chicken' ? 'cluck' : 'baa',
                  soundOn
                )
              }
              title={tr(a.type)}
              className="absolute pointer-events-auto cursor-pointer select-none transition-transform active:scale-125 hover:brightness-110"
              style={{
                left: `${agent.x}%`,
                top: `${agent.y}%`,
                width: `${widthPx}px`,
                height: `${heightPx}px`,
                transform: 'translate(-50%, -50%)',
                zIndex: Math.floor(agent.y),
              }}
            >
              <RealisticAnimal
                type={a.type}
                growth={a.growth}
                fullness={a.fullness}
                health={a.health}
                stored={a.stored}
                animTime={animTime + i * 1.3}
                isMoving={isMoving}
                facingRight={agent.facingRight}
                isSleeping={false}
                isEating={agent.state === 'eating'}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

// -------------------------------------------------------------
// Individual Animal Management Card
// -------------------------------------------------------------
const AnimalCard: React.FC<{ index: number }> = ({ index }) => {
  const { animals, tr, feed, heal, collect, showToast, soundOn, lang } = useGame();
  const a = animals[index];
  if (!a) return null;

  const def = kAnimals[a.type];
  const isAdult = a.growth >= 0.85;

  const displayName = (() => {
    if (isAdult) return tr(a.type);
    if (a.type === 'chicken') return tr('chick');
    if (a.type === 'cow') return tr('calf');
    return tr('lamb');
  })();

  const breedName = (() => {
    if (a.type === 'cow') return lang === 'ar' ? 'أبقار هولشتاين (حلوب)' : 'Holstein Dairy Cow';
    if (a.type === 'chicken') return lang === 'ar' ? 'دجاج بلدي بياض' : 'Free-Range Brown Layer';
    return lang === 'ar' ? 'خراف ميرينو (صوف)' : 'Merino Fine Wool';
  })();

  const earTag = `#${100 + index + 1}`;

  const weightKg = (() => {
    if (a.type === 'cow') return Math.round(160 + a.growth * 380);
    if (a.type === 'chicken') return (0.4 + a.growth * 2.2).toFixed(1);
    return Math.round(20 + a.growth * 50);
  })();

  const dailyOutput = (() => {
    if (a.type === 'cow') return lang === 'ar' ? '16 لتر حليب/يوم' : '16 L milk/day';
    if (a.type === 'chicken') return lang === 'ar' ? '1 بيضة طازجة/يوم' : '1 fresh egg/day';
    return lang === 'ar' ? '3 كجم صوف ناعم' : '3 kg wool/season';
  })();

  const handlePlayVoice = () => {
    playSound(a.type === 'cow' ? 'moo' : a.type === 'chicken' ? 'cluck' : 'baa', soundOn);
  };

  const handleFeed = () => {
    playSound(a.type === 'cow' ? 'moo' : a.type === 'chicken' ? 'cluck' : 'baa', soundOn);
    const res = feed(index);
    showToast(res);
  };

  const handleHeal = () => {
    const res = heal(index);
    showToast(res);
  };

  const handleCollect = () => {
    playSound('collect', soundOn);
    const res = collect(index);
    showToast(res);
  };

  const feedNeeded = a.type === 'chicken' ? 1 : 2;

  return (
    <Panel className="space-y-3 p-3.5 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition">
      {/* Top info and detailed realistic animal avatar */}
      <div className="flex items-center gap-3">
        {/* Clickable animal sprite that moos/clucks/baas */}
        <button
          onClick={handlePlayVoice}
          title={lang === 'ar' ? 'اضغط لسماع صوت الحيوان' : 'Tap to hear animal sound'}
          className="w-18 h-16 flex items-center justify-center bg-emerald-50/60 rounded-2xl p-1.5 border border-emerald-100/80 shadow-2xs cursor-pointer hover:bg-emerald-100/60 active:scale-95 transition relative group"
        >
          <RealisticAnimal
            type={a.type}
            growth={a.growth}
            fullness={a.fullness}
            health={a.health}
            stored={a.stored}
            animTime={0.5}
            isMoving={false}
            facingRight={true}
            isSleeping={false}
          />
          <span className="absolute -bottom-1 -right-1 text-xs bg-white rounded-full p-0.5 shadow-2xs border border-gray-200">
            🔊
          </span>
        </button>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-[#1E2A22]">{displayName}</span>
              <span className="text-[10px] text-gray-400 font-mono" dir="ltr">{earTag}</span>
            </div>
            {!isAdult ? (
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                🍼 {tr('young')}
              </span>
            ) : (
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                {dailyOutput}
              </span>
            )}
          </div>

          <p className="text-[11px] text-[#7B857E] font-medium leading-none">
            {breedName} · <span dir="ltr">{weightKg} kg</span>
          </p>

          {/* Progress / Status bars */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {/* Fullness bar */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-[10px] font-bold text-gray-600">
                <span>🍽️ {lang === 'ar' ? 'الشبع' : 'Feed'}</span>
                <span dir="ltr">{Math.round(a.fullness * 100)}%</span>
              </div>
              <Bar value={a.fullness} color="#E6A23C" height={5} />
            </div>

            {/* Health bar */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-[10px] font-bold text-gray-600">
                <span>❤️ {tr('health')}</span>
                <span dir="ltr">{Math.round(a.health * 100)}%</span>
              </div>
              <Bar value={a.health} color="#E53935" height={5} />
            </div>
          </div>

          {/* Growth or Production bar */}
          {!isAdult ? (
            <div className="space-y-0.5 pt-0.5">
              <div className="flex justify-between text-[10px] font-bold text-purple-700">
                <span>🍼 {lang === 'ar' ? 'معدل النمو' : 'Growth'}</span>
                <span dir="ltr">{Math.round(a.growth * 100)}%</span>
              </div>
              <Bar value={a.growth} color="#8E6BBF" height={5} />
            </div>
          ) : (
            <div className="space-y-0.5 pt-0.5">
              <div className="flex justify-between text-[10px] font-bold text-[#2F7D4E]">
                <span>{kEmoji[def.product]} {tr(def.product)}</span>
                <span dir="ltr">{a.stored > 0 ? (lang === 'ar' ? `جاهز (${a.stored})` : `Ready (${a.stored})`) : `${Math.round(a.progress * 100)}%`}</span>
              </div>
              <Bar value={a.stored > 0 ? 1 : a.progress} color="#2F7D4E" height={5} />
            </div>
          )}
        </div>
      </div>

      {/* Action buttons: Feed, Collect, Heal with large touch targets */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={handleFeed}
          className="flex-1 min-h-[42px] py-2 px-3 rounded-2xl border border-amber-300 bg-amber-50 hover:bg-amber-100 active:scale-98 text-xs font-bold text-[#1E2A22] transition cursor-pointer shadow-2xs flex items-center justify-center gap-1.5"
        >
          <span>🌾 {tr('feed')}</span>
          <span className="text-[11px] text-amber-800 font-semibold" dir="ltr">
            (<bdi>{feedNeeded}</bdi>)
          </span>
        </button>

        <button
          onClick={handleCollect}
          className={`flex-1 min-h-[42px] py-2 px-3 rounded-2xl text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center ${
            a.stored > 0
              ? 'bg-[#2F7D4E] text-white hover:bg-[#25633E] active:scale-98 animate-pulse'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          disabled={a.stored === 0}
        >
          <span className="inline-flex items-center gap-1.5" dir="ltr">
            <span>{tr('collect')}</span>
            <span>{kEmoji[def.product]}</span>
            {a.stored > 0 && <span className="font-black">×{a.stored}</span>}
          </span>
        </button>

        {a.health < 0.7 && (
          <button
            onClick={handleHeal}
            className="min-h-[42px] py-2 px-3 rounded-2xl bg-red-100 text-red-700 font-bold text-xs hover:bg-red-200 active:scale-95 transition cursor-pointer flex items-center gap-1"
          >
            <span>💊</span>
            <span dir="ltr">{HEAL_COST} 🪙</span>
          </button>
        )}
      </div>
    </Panel>
  );
};
