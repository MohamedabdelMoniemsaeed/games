import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  CropType,
  AnimalType,
  WeatherType,
  UpgradeType,
  GameEvent,
  Plot,
  Animal,
  Order,
  Quest,
} from './models';
import {
  kCrops,
  kAnimals,
  kPrice,
  kSpoil,
  kCropIndices,
} from './constants';
import { kText } from './l10n';
import { playSound } from './sound';

export const kFarmFacts: Record<'en' | 'ar', string[]> = {
  ar: [
    'هل تعلم؟ الأبقار تشرب ما يصل إلى 100 لتر ماء يومياً وتنام نحو 4 ساعات فقط!',
    'هل تعلم؟ الدجاج يستحم بالتراب الناعم لتنظيف ريشه والحفاظ على صحته!',
    'هل تعلم؟ الدورة الزراعية بين البقوليات والخضار تعيد النيتروجين الطبيعي للتربة.',
    'هل تعلم؟ الطماطم والذرة تزدهر في شمس الصيف المباشرة إذا رُويت بالصباح الباكر.',
    'هل تعلم؟ صوف الخراف عازل حراري طبيعي يحميها من البرد وحرارة الصيف معاً!',
    'هل تعلم؟ الدبال والمادة العضوية تحتفظ بالمياه 4 أضعاف وزنها لترطيب الجذور.',
  ],
  en: [
    'Did you know? Dairy cows can drink up to 100 L of water a day and sleep only 4 hours!',
    'Did you know? Chickens take dust baths to naturally clean their feathers and plumage.',
    'Did you know? Rotating crops restores nitrogen naturally without synthetic chemicals.',
    'Did you know? Tomatoes thrive in summer sun when watered early at dawn.',
    'Did you know? Sheep wool is a natural thermal insulator against both cold and heat!',
    'Did you know? Rich organic humus soil holds up to 4x its weight in moisture.',
  ],
};

export interface ToastMessage {
  id: string;
  key: string;
}

interface GameContextType {
  lang: 'en' | 'ar';
  toggleLang: () => void;
  soundOn: boolean;
  toggleSound: () => void;
  tr: (key: string) => string;
  ready: boolean;
  gameMode: 'realistic' | 'relaxed';
  toggleGameMode: () => void;
  farmFact: string;
  nextFarmFact: () => void;
  tutorialSeen: boolean;
  closeTutorial: () => void;
  pendingLevelUp: number;
  clearLevelUp: () => void;
  // Time and Season
  clock: number;
  dayCount: number;
  season: number;
  hour: number;
  darkness: number;
  temperature: number;
  // Economy & Stats
  coins: number;
  earned: number;
  level: number;
  incomeToday: number;
  expenseToday: number;
  lastIncome: number;
  lastExpense: number;
  feedExpenseToday: number;
  lastFeedExpense: number;
  upkeep: number;
  // Water, Silo & Upgrades
  tank: number;
  capacity: number;
  tankLevel: number;
  silo: number;
  siloCap: number;
  siloLevel: number;
  feedTrough: number;
  seasonFeedPrice: number;
  sprinkler: boolean;
  penSize: number;
  barnLevel: number;
  storageCap: number;
  storedCount: number;
  // Weather & Events
  weather: WeatherType;
  event: GameEvent;
  eventItem: string;
  spray: () => string | null;
  // Farm & Animals
  plots: Plot[];
  animals: Animal[];
  inventory: Record<string, number>;
  demand: Record<string, number>;
  orders: Order[];
  // Quests & Daily
  quests: Quest[];
  streak: number;
  dailyAvailable: boolean;
  dailyReward: number;
  claimDaily: () => string | null;
  claimQuest: (index: number) => string | null;
  // Actions
  inSeason: (crop: CropType) => boolean;
  priceOf: (item: string) => number;
  plant: (plotIndex: number, crop: CropType) => string | null;
  water: (plotIndex: number) => string | null;
  waterAll: () => string | null;
  harvest: (plotIndex: number) => string | null;
  fertilize: (plotIndex: number) => string | null;
  removeCrop: (plotIndex: number) => void;
  buyAnimal: (type: AnimalType) => string | null;
  buyFeed: (bulk: boolean) => string | null;
  feed: (animalIndex: number) => string | null;
  heal: (animalIndex: number) => string | null;
  collect: (animalIndex: number) => string | null;
  sell: (item: string, all?: boolean) => void;
  deliver: (orderIndex: number) => string | null;
  upgradeCost: (u: UpgradeType) => number;
  upgradeMaxed: (u: UpgradeType) => boolean;
  buyUpgrade: (u: UpgradeType) => string | null;
  rewardRefill: () => void;
  // UI Toasts
  toasts: ToastMessage[];
  showToast: (key: string | null) => void;
  villageGrantBanner: boolean;
  dismissGrantBanner: () => void;
}

export const RESERVE = 20.0;
export const WATER_COST = 25.0;
export const MAX_PLOTS = 12;
export const MAX_TANK_LEVEL = 5;
export const MAX_PEN = 8;
export const MAX_BARN = 4;
export const MAX_SILO = 4;
export const DAY_LENGTH = 48.0; // real seconds per game day
export const SEASON_DAYS = 6;
export const FERTILIZER_COST = 15;
export const HEAL_COST = 20;
export const SPRAY_COST = 40;

const GameContext = createContext<GameContextType | undefined>(undefined);

function getTodayStr(d = new Date()): string {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function createRandomOrder(level: number, dayCount: number): Order {
  const items: string[] = [];
  (Object.keys(kCrops) as CropType[]).forEach((key) => {
    if (level >= kCrops[key].unlockLevel) items.push(key);
  });
  (Object.keys(kAnimals) as AnimalType[]).forEach((key) => {
    if (level >= kAnimals[key].unlockLevel) items.push(kAnimals[key].product);
  });

  const chosen = items[Math.floor(Math.random() * items.length)] || 'lettuce';
  const qty = 2 + Math.floor(Math.random() * 3);
  const due = dayCount + 2 + Math.floor(Math.random() * 3);
  const reward = Math.round(qty * (kPrice[chosen] || 10) * 1.6);
  return { item: chosen, qty, reward, due };
}

function makeQuest(type: 'harvest' | 'sell' | 'water' | 'deliver'): Quest {
  switch (type) {
    case 'harvest': {
      const n = 4 + Math.floor(Math.random() * 5);
      return { type, target: n, reward: n * 8, progress: 0, claimed: false };
    }
    case 'sell': {
      const n = 6 + Math.floor(Math.random() * 7);
      return { type, target: n, reward: n * 5, progress: 0, claimed: false };
    }
    case 'water': {
      const n = 5 + Math.floor(Math.random() * 6);
      return { type, target: n, reward: n * 6, progress: 0, claimed: false };
    }
    case 'deliver': {
      const n = 1 + Math.floor(Math.random() * 2);
      return { type, target: n, reward: n * 40, progress: 0, claimed: false };
    }
  }
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<'en' | 'ar'>(() => {
    try {
      const saved = localStorage.getItem('save_v2');
      if (saved) {
        const j = JSON.parse(saved);
        if (j.lang === 'en' || j.lang === 'ar') return j.lang;
      }
    } catch (_) {}
    return 'ar'; // Default to Arabic for user request
  });

  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [ready, setReady] = useState<boolean>(false);
  const [tutorialSeen, setTutorialSeen] = useState<boolean>(false);
  const [pendingLevelUp, setPendingLevelUp] = useState<number>(0);

  // Difficulty & Experience mode: 'realistic' (detailed agronomy) or 'relaxed' (kid/family friendly)
  const [gameMode, setGameMode] = useState<'realistic' | 'relaxed'>(() => {
    try {
      const saved = localStorage.getItem('game_difficulty');
      if (saved === 'realistic' || saved === 'relaxed') return saved;
    } catch (_) {}
    return 'realistic';
  });

  const toggleGameMode = useCallback(() => {
    setGameMode((prev) => {
      const next = prev === 'realistic' ? 'relaxed' : 'realistic';
      try {
        localStorage.setItem('game_difficulty', next);
      } catch (_) {}
      return next;
    });
  }, []);

  const [factIndex, setFactIndex] = useState(0);
  const nextFarmFact = useCallback(() => {
    setFactIndex((prev) => (prev + 1) % (kFarmFacts[lang]?.length || 6));
  }, [lang]);

  const farmFact = kFarmFacts[lang]?.[factIndex] || kFarmFacts.en[0];

  // Time clock
  const [clock, setClock] = useState<number>(0);
  const lastDayRef = useRef<number>(0);

  // Money & stats
  const [coins, setCoins] = useState<number>(30);
  const [earned, setEarned] = useState<number>(0);
  const [incomeToday, setIncomeToday] = useState<number>(0);
  const [expenseToday, setExpenseToday] = useState<number>(0);
  const [lastIncome, setLastIncome] = useState<number>(0);
  const [lastExpense, setLastExpense] = useState<number>(0);
  const [feedExpenseToday, setFeedExpenseToday] = useState<number>(0);
  const [lastFeedExpense, setLastFeedExpense] = useState<number>(0);

  // Upgrades & Infrastructure
  const [tank, setTank] = useState<number>(120);
  const [tankLevel, setTankLevel] = useState<number>(0);
  const [silo, setSilo] = useState<number>(25);
  const [siloLevel, setSiloLevel] = useState<number>(0);
  const [feedTrough, setFeedTrough] = useState<number>(10);
  const [sprinkler, setSprinkler] = useState<boolean>(false);
  const [penSize, setPenSize] = useState<number>(3);
  const [barnLevel, setBarnLevel] = useState<number>(0);

  // Weather & Events
  const [weather, setWeather] = useState<WeatherType>('sunny');
  const weatherLeftRef = useRef<number>(45);
  const [event, setEvent] = useState<GameEvent>('none');
  const [eventItem, setEventItem] = useState<string>('');

  // Plots & Animals
  const [plots, setPlots] = useState<Plot[]>(() =>
    Array.from({ length: 6 }, () => ({
      crop: null,
      progress: 0,
      water: 0.3,
      fertility: 1.0,
      lastCrop: null,
    }))
  );
  const [animals, setAnimals] = useState<Animal[]>([
    { type: 'chicken', fullness: 0, progress: 0, stored: 0, growth: 1, health: 1 },
  ]);
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [demand, setDemand] = useState<Record<string, number>>(() => {
    const initD: Record<string, number> = {};
    Object.keys(kPrice).forEach((k) => (initD[k] = 1.0));
    return initD;
  });
  const [orders, setOrders] = useState<Order[]>([]);

  // Daily & Quests
  const [lastDaily, setLastDaily] = useState<string>('');
  const [streak, setStreak] = useState<number>(0);
  const [questDay, setQuestDay] = useState<string>('');
  const [quests, setQuests] = useState<Quest[]>([]);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const ticksRef = useRef<number>(0);

  // Derived values
  const capacity = 200.0 + 100.0 * tankLevel;
  const level = 1 + Math.floor(earned / 150);
  const dayCount = Math.floor(clock / DAY_LENGTH);
  const season = Math.floor(dayCount / SEASON_DAYS) % 4; // 0 spring, 1 summer, 2 autumn, 3 winter
  const hour = (6 + 24 * ((clock % DAY_LENGTH) / DAY_LENGTH)) % 24;

  const darkness = (() => {
    if (hour >= 7 && hour < 17) return 0;
    if (hour >= 17 && hour < 20) return ((hour - 17) / 3) * 0.55;
    if (hour >= 20 || hour < 4) return 0.55;
    return 0.55 * (1 - (hour - 4) / 3);
  })();

  const temperature = (() => {
    const base = [18, 30, 16, 5][season];
    let t = base;
    if (darkness > 0.4) t -= 5;
    if (weather === 'sunny') t += 2;
    if (weather === 'rain') t -= 3;
    return t;
  })();

  const storageCap = 40 + 30 * barnLevel;
  const siloCap = 40 + 30 * siloLevel;
  const seasonFeedPrice = [14, 10, 12, 16][season];
  const storedCount = Object.values(inventory).reduce((acc, v) => acc + (v || 0), 0);
  const upkeep = plots.length * 2 + animals.length * 4 + (sprinkler ? 6 : 0);

  const [villageGrantBanner, setVillageGrantBanner] = useState<boolean>(false);
  const lastGrantDayRef = useRef<number>(-1);

  const tr = useCallback(
    (key: string) => {
      return kText[lang]?.[key] ?? kText.en?.[key] ?? key;
    },
    [lang]
  );

  const showToast = useCallback((key: string | null) => {
    if (!key) return;
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, key }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  const toggleSound = useCallback(() => {
    setSoundOn((s) => !s);
  }, []);

  const inSeason = useCallback(
    (crop: CropType) => {
      return kCrops[crop]?.seasons.includes(season) ?? false;
    },
    [season]
  );

  const priceOf = useCallback(
    (item: string) => {
      let p = (kPrice[item] || 0) * (demand[item] ?? 1.0);
      const isCrop = Object.keys(kCrops).includes(item as CropType);
      if (isCrop) {
        p *= inSeason(item as CropType) ? 0.85 : 1.25;
      }
      return Math.max(1, Math.round(p));
    },
    [demand, inSeason]
  );

  // Sync HTML direction with language
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Quests generation
  const refreshQuests = useCallback(() => {
    const today = getTodayStr();
    if (questDay === today && quests.length > 0) return;
    setQuestDay(today);
    const types: ('harvest' | 'sell' | 'water' | 'deliver')[] = [
      'harvest',
      'sell',
      'water',
      'deliver',
    ];
    // Pick 3 random quest types
    types.sort(() => Math.random() - 0.5);
    setQuests(types.slice(0, 3).map((t) => makeQuest(t)));
  }, [questDay, quests.length]);

  const advanceQuest = useCallback((type: 'harvest' | 'sell' | 'water' | 'deliver', n = 1) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.type === type && !q.claimed) {
          return { ...q, progress: q.progress + n };
        }
        return q;
      })
    );
  }, []);

  // Save state helper
  const saveToStorage = useCallback(() => {
    try {
      const data = {
        ms: Date.now(),
        lang,
        sound: soundOn,
        tut: tutorialSeen,
        clock,
        coins,
        earned,
        inc: incomeToday,
        exp: expenseToday,
        linc: lastIncome,
        lexp: lastExpense,
        fexp: feedExpenseToday,
        lfexp: lastFeedExpense,
        tank,
        tankLevel,
        silo,
        siloLevel,
        feedTrough,
        sprinkler,
        penSize,
        barn: barnLevel,
        event,
        eventItem,
        plots,
        animals,
        inv: inventory,
        demand,
        orders,
        daily: lastDaily,
        streak,
        qday: questDay,
        quests,
      };
      localStorage.setItem('save_v2', JSON.stringify(data));
    } catch (_) {}
  }, [
    lang,
    soundOn,
    tutorialSeen,
    clock,
    coins,
    earned,
    incomeToday,
    expenseToday,
    lastIncome,
    lastExpense,
    feedExpenseToday,
    lastFeedExpense,
    tank,
    tankLevel,
    silo,
    siloLevel,
    feedTrough,
    sprinkler,
    penSize,
    barnLevel,
    event,
    eventItem,
    plots,
    animals,
    inventory,
    demand,
    orders,
    lastDaily,
    streak,
    questDay,
    quests,
  ]);

  // Money management
  const earnCoins = useCallback(
    (amt: number) => {
      const before = 1 + Math.floor(earned / 150);
      const nextEarned = earned + amt;
      const after = 1 + Math.floor(nextEarned / 150);
      setCoins((c) => c + amt);
      setEarned(nextEarned);
      setIncomeToday((i) => i + amt);
      if (after > before) {
        setPendingLevelUp(after);
        playSound('levelup', soundOn);
      } else {
        playSound('coin', soundOn);
      }
    },
    [earned, soundOn]
  );

  const spendCoins = useCallback((amt: number) => {
    setCoins((c) => c - amt);
    setExpenseToday((e) => e + amt);
  }, []);

  // New day triggers
  const onNewDay = useCallback(
    (curSeason: number, curDayCount: number) => {
      setLastIncome(incomeToday);
      setLastExpense(expenseToday);
      setLastFeedExpense(feedExpenseToday);
      setIncomeToday(0);
      setExpenseToday(0);
      setFeedExpenseToday(0);

      // Pay daily upkeep
      const paid = Math.min(coins, upkeep);
      setCoins((c) => c - paid);
      setExpenseToday((e) => e + paid);

      // Reset daily risk event
      let newEvent: GameEvent = 'none';
      let newEventItem = '';
      const r = Math.floor(Math.random() * 100);

      if (curSeason === 3 && r < 25) {
        // Winter frost
        newEvent = 'frost';
        setPlots((prev) =>
          prev.map((p) => {
            if (p.crop !== null && p.crop !== 'carrot' && p.progress < 1) {
              return { ...p, progress: p.progress * 0.75 };
            }
            return p;
          })
        );
      } else if ((curSeason === 0 || curSeason === 1) && r < 14) {
        // Pests
        newEvent = 'pests';
      } else if (r >= 85) {
        // Price boom
        newEvent = 'boom';
        const keys = Object.keys(kPrice);
        newEventItem = keys[Math.floor(Math.random() * keys.length)];
        setDemand((prev) => ({ ...prev, [newEventItem]: 1.5 }));
      }

      setEvent(newEvent);
      setEventItem(newEventItem);

      // Refresh overdue orders
      setOrders((prev) =>
        prev.map((o) => (o.due < curDayCount ? createRandomOrder(level, curDayCount) : o))
      );
    },
    [incomeToday, expenseToday, coins, upkeep, level]
  );

  // Weather generator
  const rollNewWeather = useCallback((curSeason: number) => {
    const r = Math.floor(Math.random() * 100);
    const limits = [
      [45, 75], // spring
      [70, 90], // summer
      [35, 70], // autumn
      [30, 70], // winter
    ][curSeason];
    const newW: WeatherType =
      r < limits[0] ? 'sunny' : r < limits[1] ? 'cloudy' : 'rain';
    setWeather(newW);
    weatherLeftRef.current = 40 + Math.floor(Math.random() * 31);
    return newW;
  }, []);

  // One second simulation step
  const stepSimulation = useCallback(
    (curWeather: WeatherType, curSeason: number, curDay: number) => {
      // 1. Clock increment
      setClock((prevClock) => {
        const nextClock = prevClock + 1;
        const newDayCount = Math.floor(nextClock / DAY_LENGTH);
        if (newDayCount !== lastDayRef.current) {
          lastDayRef.current = newDayCount;
          onNewDay(curSeason, newDayCount);
        }
        return nextClock;
      });

      // 2. Weather tick
      weatherLeftRef.current -= 1;
      let effectiveWeather = curWeather;
      if (weatherLeftRef.current <= 0) {
        effectiveWeather = rollNewWeather(curSeason);
      }

      // 3. Tank refill: Windmill passive water pumping + Rain precipitation
      const windmillPump =
        effectiveWeather === 'rain' ? 1.4 : effectiveWeather === 'cloudy' ? 0.8 : 0.4;
      setTank((prevTank) => {
        let t = prevTank + (gameMode === 'relaxed' ? windmillPump * 1.5 : windmillPump);
        if (effectiveWeather === 'rain') {
          t += (curSeason === 3 ? 3 : 6);
        }
        return Math.min(capacity, t);
      });

      const seasonDrain = [1.0, 1.5, 1.0, 0.6][curSeason];
      const baseDrain =
        effectiveWeather === 'sunny' ? 0.025 : effectiveWeather === 'cloudy' ? 0.015 : 0.0;
      // In relaxed mode, drain is much slower to make it friendly for young players
      const drain = (gameMode === 'relaxed' ? baseDrain * 0.4 : baseDrain) * seasonDrain;

      // 4. Plots simulation
      setPlots((prevPlots) => {
        let currentTank = tank;
        let tankDeduction = 0;

        const nextPlots = prevPlots.map((p) => {
          let w = p.water;
          let fertility = p.fertility;

          if (effectiveWeather === 'rain') {
            w = Math.min(1.0, w + 0.06);
          } else {
            w = Math.max(0.0, w - drain);
            if (
              sprinkler &&
              p.crop !== null &&
              w < 0.3 &&
              currentTank - tankDeduction - RESERVE >= WATER_COST / 2
            ) {
              tankDeduction += WATER_COST / 2;
              w = 1.0;
            }
          }

          let prog = p.progress;
          const c = p.crop;
          if (c === null) {
            fertility = Math.min(1.0, fertility + 0.004); // Fallow recovers
          } else if (prog < 1 && (w > 0 || gameMode === 'relaxed')) {
            const def = kCrops[c];
            const seasonF = def.seasons.includes(curSeason) ? 1.0 : (gameMode === 'relaxed' ? 0.7 : 0.3);
            const soilF = 0.5 + 0.5 * fertility;
            const waterF = w > 0.5 ? 1.0 : (w > 0 ? 0.5 : 0.3);
            // Crop rotation bonus in realistic mode:
            const isRotated = p.lastCrop !== null && p.lastCrop !== kCropIndices[c];
            const rotationBonus = (gameMode === 'realistic' && isRotated) ? 1.2 : 1.0;
            prog = Math.min(1.0, prog + (waterF * seasonF * soilF * rotationBonus) / def.growSeconds);
          }

          return { ...p, water: w, progress: prog, fertility };
        });

        if (tankDeduction > 0) {
          setTank((t) => Math.max(0, t - tankDeduction));
        }

        return nextPlots;
      });

      // Ambient sounds triggered during simulation (rain or birds)
      ticksRef.current = (ticksRef.current + 1) % 10000;
      if (soundOn) {
        if (effectiveWeather === 'rain' && ticksRef.current % 18 === 0) {
          playSound('rain_ambient', true);
        } else if (effectiveWeather === 'sunny' && darkness < 0.25 && ticksRef.current % 36 === 0) {
          playSound('birds', true);
        }
      }

      // 5. Pests event tick
      if (event === 'pests' && Math.random() < 0.02) {
        setPlots((prev) => {
          const growing = prev
            .map((p, idx) => ({ p, idx }))
            .filter(({ p }) => p.crop !== null && p.progress < 1);
          if (growing.length > 0) {
            const target = growing[Math.floor(Math.random() * growing.length)];
            const updated = [...prev];
            updated[target.idx] = {
              ...target.p,
              progress: Math.max(0.0, target.p.progress - 0.1),
            };
            return updated;
          }
          return prev;
        });
      }

      // 6. Animals simulation
      setAnimals((prevAnimals) =>
        prevAnimals.map((a) => {
          const def = kAnimals[a.type];
          let fullness = a.fullness;
          let health = a.health;
          let growth = a.growth;
          let progress = a.progress;
          let stored = a.stored;

          if (fullness > 0) {
            fullness = Math.max(0.0, fullness - 1 / 90);
            health = Math.min(1.0, health + 1 / 120);
            if (growth < 1) {
              growth = Math.min(1.0, growth + 1 / 60);
            } else if (health > 0.3 && stored < 3) {
              progress += 1 / def.period;
              if (progress >= 1) {
                progress = 0;
                stored += 1;
              }
            }
          } else {
            health = Math.max(0.0, health - 1 / 150);
          }

          return { ...a, fullness, health, growth, progress, stored };
        })
      );

      // 7. Demand drift toward 1.0
      setDemand((prevDemand) => {
        const next: Record<string, number> = {};
        Object.keys(prevDemand).forEach((k) => {
          const v = prevDemand[k];
          next[k] = Math.max(
            0.6,
            Math.min(1.5, v + (1 - v) * 0.01 + (Math.random() - 0.5) * 0.01)
          );
        });
        return next;
      });

      // 8. Spoilage check (every 30 seconds)
      if (clock > 0 && Math.floor(clock) % 30 === 0) {
        setInventory((prevInv) => {
          const next = { ...prevInv };
          let changed = false;
          Object.keys(next).forEach((item) => {
            const qty = next[item] || 0;
            const spoilChance = kSpoil[item] || 0;
            if (qty > 0 && Math.random() < spoilChance) {
              next[item] = qty - 1;
              changed = true;
            }
          });
          return changed ? next : prevInv;
        });
      }

      // 9. Safety Net: Village Grant if player is broke with no crops or inventory
      const curDayCount = Math.floor(clock / DAY_LENGTH);
      if (coins < 4 && lastGrantDayRef.current !== curDayCount) {
        setPlots((currentPlots) => {
          const hasCrops = currentPlots.some((p) => p.crop !== null);
          setInventory((currentInv) => {
            const hasInventory = Object.values(currentInv).some((v) => (v || 0) > 0);
            setAnimals((currentAnimals) => {
              const hasProducts = currentAnimals.some((a) => a.stored > 0);
              if (!hasCrops && !hasInventory && !hasProducts) {
                lastGrantDayRef.current = curDayCount;
                setCoins((c) => c + 20);
                setVillageGrantBanner(true);
                showToast('villageGrant');
              }
              return currentAnimals;
            });
            return currentInv;
          });
          return currentPlots;
        });
      }
    },
    [capacity, sprinkler, tank, event, clock, onNewDay, rollNewWeather, coins, showToast]
  );

  // Mount: load save_v2 & simulate offline progress
  useEffect(() => {
    try {
      const raw = localStorage.getItem('save_v2');
      if (raw) {
        const j = JSON.parse(raw);
        if (j.lang) setLang(j.lang);
        if (typeof j.sound === 'boolean') setSoundOn(j.sound);
        if (typeof j.tut === 'boolean') setTutorialSeen(j.tut);
        if (typeof j.clock === 'number') setClock(j.clock);
        if (typeof j.coins === 'number') setCoins(j.coins);
        if (typeof j.earned === 'number') setEarned(j.earned);
        if (typeof j.inc === 'number') setIncomeToday(j.inc);
        if (typeof j.exp === 'number') setExpenseToday(j.exp);
        if (typeof j.linc === 'number') setLastIncome(j.linc);
        if (typeof j.lexp === 'number') setLastExpense(j.lexp);
        if (typeof j.fexp === 'number') setFeedExpenseToday(j.fexp);
        if (typeof j.lfexp === 'number') setLastFeedExpense(j.lfexp);
        if (typeof j.tank === 'number') setTank(j.tank);
        if (typeof j.tankLevel === 'number') setTankLevel(j.tankLevel);
        if (typeof j.silo === 'number') setSilo(j.silo);
        if (typeof j.siloLevel === 'number') setSiloLevel(j.siloLevel);
        if (typeof j.feedTrough === 'number') setFeedTrough(j.feedTrough);
        if (typeof j.sprinkler === 'boolean') setSprinkler(j.sprinkler);
        if (typeof j.penSize === 'number') setPenSize(j.penSize);
        if (typeof j.barn === 'number') setBarnLevel(j.barn);
        if (j.event) setEvent(j.event);
        if (j.eventItem) setEventItem(j.eventItem);
        if (Array.isArray(j.plots)) setPlots(j.plots);
        if (Array.isArray(j.animals)) setAnimals(j.animals);
        if (j.inv && typeof j.inv === 'object') setInventory(j.inv);
        if (j.demand && typeof j.demand === 'object') setDemand(j.demand);
        if (Array.isArray(j.orders) && j.orders.length > 0) setOrders(j.orders);
        if (j.daily) setLastDaily(j.daily);
        if (typeof j.streak === 'number') setStreak(j.streak);
        if (j.qday) setQuestDay(j.qday);
        if (Array.isArray(j.quests)) setQuests(j.quests);

        // Offline catchup (up to 600s = 10 mins)
        if (j.ms) {
          const awaySec = Math.min(600, Math.max(0, Math.floor((Date.now() - j.ms) / 1000)));
          if (awaySec > 0) {
            setClock((c) => c + awaySec);
          }
        }
      } else {
        // Initial fresh start
        setOrders([createRandomOrder(1, 0), createRandomOrder(1, 0), createRandomOrder(1, 0)]);
      }
    } catch (_) {
      setOrders([createRandomOrder(1, 0), createRandomOrder(1, 0), createRandomOrder(1, 0)]);
    }

    refreshQuests();
    setReady(true);
  }, []);

  // Main 1-second game timer
  useEffect(() => {
    if (!ready) return;

    const timer = setInterval(() => {
      stepSimulation(weather, season, dayCount);
      ticksRef.current += 1;
      if (ticksRef.current % 5 === 0) {
        saveToStorage();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [ready, weather, season, dayCount, stepSimulation, saveToStorage]);

  // Actions
  const plant = useCallback(
    (i: number, t: CropType): string | null => {
      const def = kCrops[t];
      if (level < def.unlockLevel) {
        playSound('error', soundOn);
        return 'locked';
      }
      if (coins < def.seedCost) {
        playSound('error', soundOn);
        return 'noCoins';
      }

      spendCoins(def.seedCost);
      setPlots((prev) => {
        const next = [...prev];
        const p = next[i];
        next[i] = {
          crop: t,
          progress: 0,
          water: p.water,
          fertility: p.fertility,
          lastCrop: p.lastCrop,
        };
        return next;
      });
      playSound('plant', soundOn);
      return null;
    },
    [level, coins, spendCoins, soundOn]
  );

  const water = useCallback(
    (i: number): string | null => {
      const p = plots[i];
      if (weather === 'rain') {
        playSound('error', soundOn);
        return 'rainWater';
      }
      if (p.water >= 0.9) {
        playSound('error', soundOn);
        return 'plotWet';
      }
      if (tank - RESERVE < WATER_COST) {
        playSound('error', soundOn);
        return 'tankLow';
      }

      setTank((t) => t - WATER_COST);
      setPlots((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], water: 1.0 };
        return next;
      });
      advanceQuest('water', 1);
      playSound('water', soundOn);
      return null;
    },
    [plots, weather, tank, advanceQuest, soundOn]
  );

  const waterAll = useCallback((): string | null => {
    if (weather === 'rain') {
      playSound('error', soundOn);
      return 'rainWater';
    }

    let watered = 0;
    let lastErr: string | null = null;
    let curTank = tank;

    setPlots((prev) => {
      const next = [...prev];
      for (let i = 0; i < next.length; i++) {
        if (next[i].crop === null || next[i].progress >= 1) continue;
        if (next[i].water >= 0.9) continue;
        if (curTank - RESERVE < WATER_COST) {
          lastErr = 'tankLow';
          break;
        }
        curTank -= WATER_COST;
        next[i] = { ...next[i], water: 1.0 };
        watered++;
      }
      return next;
    });

    if (watered > 0) {
      setTank(curTank);
      advanceQuest('water', watered);
      playSound('water', soundOn);
      return null;
    }

    playSound('error', soundOn);
    return lastErr ?? 'nothingToWater';
  }, [weather, tank, advanceQuest, soundOn]);

  const harvest = useCallback(
    (i: number): string | null => {
      const p = plots[i];
      if (!p.crop || p.progress < 1) return null;

      const qty = p.fertility >= 0.8 ? 2 : 1; // Rich soil doubles harvest
      if (storedCount + qty > storageCap) {
        playSound('error', soundOn);
        return 'storageFull';
      }

      const crop = p.crop;
      setInventory((prev) => ({
        ...prev,
        [crop]: (prev[crop] || 0) + qty,
      }));

      let drain = crop === 'corn' ? 0.3 : 0.2;
      if (p.lastCrop === kCropIndices[crop]) drain *= 1.5; // Same crop in row

      setPlots((prev) => {
        const next = [...prev];
        next[i] = {
          crop: null,
          progress: 0,
          water: p.water,
          fertility: Math.max(0.1, p.fertility - drain),
          lastCrop: kCropIndices[crop],
        };
        return next;
      });

      advanceQuest('harvest', 1);
      playSound('harvest', soundOn);
      return null;
    },
    [plots, storedCount, storageCap, advanceQuest, soundOn]
  );

  const fertilize = useCallback(
    (i: number): string | null => {
      const p = plots[i];
      if (p.fertility >= 0.95) {
        playSound('error', soundOn);
        return 'soilGood';
      }
      if (coins < FERTILIZER_COST) {
        playSound('error', soundOn);
        return 'noCoins';
      }

      spendCoins(FERTILIZER_COST);
      setPlots((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], fertility: Math.min(1.0, next[i].fertility + 0.6) };
        return next;
      });
      playSound('plant', soundOn);
      return null;
    },
    [plots, coins, spendCoins, soundOn]
  );

  const removeCrop = useCallback((i: number) => {
    setPlots((prev) => {
      const next = [...prev];
      next[i] = {
        crop: null,
        progress: 0,
        water: next[i].water,
        fertility: next[i].fertility,
        lastCrop: next[i].lastCrop,
      };
      return next;
    });
  }, []);

  const spray = useCallback((): string | null => {
    if (event !== 'pests') {
      playSound('error', soundOn);
      return 'nothing';
    }
    if (coins < SPRAY_COST) {
      playSound('error', soundOn);
      return 'noCoins';
    }

    spendCoins(SPRAY_COST);
    setEvent('none');
    playSound('plant', soundOn);
    return null;
  }, [event, coins, spendCoins, soundOn]);

  const buyAnimal = useCallback(
    (t: AnimalType): string | null => {
      const def = kAnimals[t];
      if (level < def.unlockLevel) {
        playSound('error', soundOn);
        return 'locked';
      }
      if (animals.length >= penSize) {
        playSound('error', soundOn);
        return 'penFull';
      }
      if (coins < def.cost) {
        playSound('error', soundOn);
        return 'noCoins';
      }

      spendCoins(def.cost);
      setAnimals((prev) => [
        ...prev,
        { type: t, fullness: 0, progress: 0, stored: 0, growth: 0, health: 1 },
      ]);
      playSound('plant', soundOn);
      return null;
    },
    [level, animals.length, penSize, coins, spendCoins, soundOn]
  );

  const buyFeed = useCallback(
    (bulk: boolean): string | null => {
      const units = bulk ? 50 : 10;
      const cost = bulk ? Math.round(5 * seasonFeedPrice * 0.85) : seasonFeedPrice;
      if (silo + units > siloCap) {
        playSound('error', soundOn);
        return 'siloFull';
      }
      if (coins < cost) {
        playSound('error', soundOn);
        return 'noCoins';
      }

      spendCoins(cost);
      setSilo((s) => Math.min(siloCap, s + units));
      setFeedExpenseToday((f) => f + cost);
      playSound('coin', soundOn);
      return null;
    },
    [seasonFeedPrice, silo, siloCap, coins, spendCoins, soundOn]
  );

  const feed = useCallback(
    (i: number): string | null => {
      const a = animals[i];
      const feedUnits = a.type === 'chicken' ? 1 : 2;
      if (silo < feedUnits) {
        playSound('error', soundOn);
        return 'noFeed';
      }

      setSilo((s) => Math.max(0, s - feedUnits));
      setFeedTrough((t) => Math.min(20, t + 4));
      setAnimals((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], fullness: 1.0 };
        return next;
      });
      playSound('feed', soundOn);
      return 'fed';
    },
    [animals, silo, soundOn]
  );

  const heal = useCallback(
    (i: number): string | null => {
      const a = animals[i];
      if (a.health >= 0.95) {
        playSound('error', soundOn);
        return 'healthy';
      }
      if (coins < HEAL_COST) {
        playSound('error', soundOn);
        return 'noCoins';
      }

      spendCoins(HEAL_COST);
      setAnimals((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], health: 1.0 };
        return next;
      });
      playSound('plant', soundOn);
      return null;
    },
    [animals, coins, spendCoins, soundOn]
  );

  const collect = useCallback(
    (i: number): string | null => {
      const a = animals[i];
      if (a.stored === 0) {
        playSound('error', soundOn);
        return 'nothing';
      }
      if (storedCount + a.stored > storageCap) {
        playSound('error', soundOn);
        return 'storageFull';
      }

      const key = kAnimals[a.type].product;
      const count = a.stored;
      setInventory((prev) => ({
        ...prev,
        [key]: (prev[key] || 0) + count,
      }));
      setAnimals((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], stored: 0 };
        return next;
      });
      playSound('harvest', soundOn);
      return null;
    },
    [animals, storedCount, storageCap, soundOn]
  );

  const sell = useCallback(
    (item: string, all: boolean = false) => {
      const have = inventory[item] || 0;
      const n = all ? have : have > 0 ? 1 : 0;
      if (n === 0) return;

      const unitPrice = priceOf(item);
      const total = n * unitPrice;

      setInventory((prev) => ({
        ...prev,
        [item]: (prev[item] || 0) - n,
      }));

      // Selling lowers demand by 3% per unit
      setDemand((prev) => ({
        ...prev,
        [item]: Math.max(0.6, (prev[item] ?? 1.0) - 0.03 * n),
      }));

      earnCoins(total);
      advanceQuest('sell', n);
    },
    [inventory, priceOf, earnCoins, advanceQuest]
  );

  const deliver = useCallback(
    (idx: number): string | null => {
      const o = orders[idx];
      const have = inventory[o.item] || 0;
      if (have < o.qty) {
        playSound('error', soundOn);
        return 'notEnough';
      }

      setInventory((prev) => ({
        ...prev,
        [o.item]: prev[o.item] - o.qty,
      }));
      earnCoins(o.reward);
      advanceQuest('deliver', 1);

      setOrders((prev) => {
        const next = [...prev];
        next[idx] = createRandomOrder(level, dayCount);
        return next;
      });
      return null;
    },
    [orders, inventory, earnCoins, advanceQuest, level, dayCount, soundOn]
  );

  const upgradeCost = useCallback(
    (u: UpgradeType): number => {
      switch (u) {
        case 'tank':
          return 80 * (tankLevel + 1);
        case 'plot':
          return 40 * (plots.length - 4);
        case 'sprinkler':
          return 300;
        case 'pen':
          return 60 * (penSize - 1);
        case 'barn':
          return 120 * (barnLevel + 1);
        case 'silo':
          return 75 * (siloLevel + 1);
      }
    },
    [tankLevel, plots.length, penSize, barnLevel, siloLevel]
  );

  const upgradeMaxed = useCallback(
    (u: UpgradeType): boolean => {
      switch (u) {
        case 'tank':
          return tankLevel >= MAX_TANK_LEVEL;
        case 'plot':
          return plots.length >= MAX_PLOTS;
        case 'sprinkler':
          return sprinkler;
        case 'pen':
          return penSize >= MAX_PEN;
        case 'barn':
          return barnLevel >= MAX_BARN;
        case 'silo':
          return siloLevel >= MAX_SILO;
      }
    },
    [tankLevel, plots.length, sprinkler, penSize, barnLevel, siloLevel]
  );

  const buyUpgrade = useCallback(
    (u: UpgradeType): string | null => {
      if (upgradeMaxed(u)) {
        playSound('error', soundOn);
        return 'maxed';
      }
      const cost = upgradeCost(u);
      if (coins < cost) {
        playSound('error', soundOn);
        return 'noCoins';
      }

      spendCoins(cost);
      switch (u) {
        case 'tank':
          setTankLevel((l) => l + 1);
          break;
        case 'plot':
          setPlots((prev) => [
            ...prev,
            { crop: null, progress: 0, water: 0.3, fertility: 1.0, lastCrop: null },
          ]);
          break;
        case 'sprinkler':
          setSprinkler(true);
          break;
        case 'pen':
          setPenSize((p) => p + 1);
          break;
        case 'barn':
          setBarnLevel((b) => b + 1);
          break;
        case 'silo':
          setSiloLevel((s) => s + 1);
          break;
      }
      playSound('coin', soundOn);
      return null;
    },
    [upgradeMaxed, upgradeCost, coins, spendCoins, soundOn]
  );

  const rewardRefill = useCallback(() => {
    setTank(capacity);
    playSound('water', soundOn);
  }, [capacity, soundOn]);

  // Daily gift logic
  const dailyAvailable = lastDaily !== getTodayStr();
  const nextStreak = (() => {
    const y = new Date();
    y.setDate(y.getDate() - 1);
    return lastDaily === getTodayStr(y) ? streak + 1 : 1;
  })();
  const dailyReward = 20 + 10 * Math.min(nextStreak, 7);

  const claimDaily = useCallback((): string | null => {
    if (!dailyAvailable) return 'nothing';
    const reward = dailyReward;
    setStreak(nextStreak);
    setLastDaily(getTodayStr());
    earnCoins(reward);
    return null;
  }, [dailyAvailable, dailyReward, nextStreak, earnCoins]);

  const claimQuest = useCallback(
    (i: number): string | null => {
      const q = quests[i];
      if (!q || q.progress < q.target || q.claimed) return 'nothing';

      setQuests((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], claimed: true };
        return next;
      });
      earnCoins(q.reward);
      return null;
    },
    [quests, earnCoins]
  );

  const closeTutorial = useCallback(() => {
    setTutorialSeen(true);
  }, []);

  const clearLevelUp = useCallback(() => {
    setPendingLevelUp(0);
  }, []);

  return (
    <GameContext.Provider
      value={{
        lang,
        toggleLang,
        soundOn,
        toggleSound,
        tr,
        ready,
        gameMode,
        toggleGameMode,
        farmFact,
        nextFarmFact,
        tutorialSeen,
        closeTutorial,
        pendingLevelUp,
        clearLevelUp,
        clock,
        dayCount,
        season,
        hour,
        darkness,
        temperature,
        coins,
        earned,
        level,
        incomeToday,
        expenseToday,
        lastIncome,
        lastExpense,
        feedExpenseToday,
        lastFeedExpense,
        upkeep,
        tank,
        capacity,
        tankLevel,
        silo,
        siloCap,
        siloLevel,
        feedTrough,
        seasonFeedPrice,
        sprinkler,
        penSize,
        barnLevel,
        storageCap,
        storedCount,
        weather,
        event,
        eventItem,
        spray,
        plots,
        animals,
        inventory,
        demand,
        orders,
        quests,
        streak,
        dailyAvailable,
        dailyReward,
        claimDaily,
        claimQuest,
        inSeason,
        priceOf,
        plant,
        water,
        waterAll,
        harvest,
        fertilize,
        removeCrop,
        buyAnimal,
        buyFeed,
        feed,
        heal,
        collect,
        sell,
        deliver,
        upgradeCost,
        upgradeMaxed,
        buyUpgrade,
        rewardRefill,
        toasts,
        showToast,
        villageGrantBanner,
        dismissGrantBanner: () => setVillageGrantBanner(false),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};
