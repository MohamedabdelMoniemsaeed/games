import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  CropType,
  AnimalType,
  WeatherType,
  UpgradeType,
  Plot,
  Animal,
  Order,
} from './models';
import { kCrops, kAnimals, kPrice } from './constants';
import { kText } from './l10n';
import { playSound } from './sound';

export interface ToastMessage {
  id: string;
  key: string;
}

interface GameContextType {
  lang: 'en' | 'ar';
  toggleLang: () => void;
  tr: (key: string) => string;
  coins: number;
  earned: number;
  level: number;
  tank: number;
  capacity: number;
  tankLevel: number;
  sprinkler: boolean;
  penSize: number;
  weather: WeatherType;
  plots: Plot[];
  animals: Animal[];
  inventory: Record<string, number>;
  orders: Order[];
  // Actions
  plant: (plotIndex: number, crop: CropType) => string | null;
  water: (plotIndex: number) => string | null;
  waterAll: () => string | null;
  harvest: (plotIndex: number) => string | null;
  buyAnimal: (type: AnimalType) => string | null;
  feed: (animalIndex: number) => string | null;
  collect: (animalIndex: number) => string | null;
  sell: (item: string, all?: boolean) => void;
  deliver: (orderIndex: number) => string | null;
  upgradeCost: (u: UpgradeType) => number;
  upgradeMaxed: (u: UpgradeType) => boolean;
  buyUpgrade: (u: UpgradeType) => string | null;
  rewardRefill: () => void;
  // UI Toast
  toasts: ToastMessage[];
  showToast: (key: string | null) => void;
}

const RESERVE = 20.0;
const WATER_COST = 25.0;
export const MAX_PLOTS = 12;
export const MAX_TANK_LEVEL = 5;
export const MAX_PEN = 8;

const GameContext = createContext<GameContextType | undefined>(undefined);

function createRandomOrder(level: number): Order {
  const items: string[] = [];
  (Object.keys(kCrops) as CropType[]).forEach((key) => {
    if (level >= kCrops[key].unlockLevel) {
      items.push(key);
    }
  });
  items.push('egg');
  if (level >= kAnimals.cow.unlockLevel) {
    items.push('milk');
  }

  const chosen = items[Math.floor(Math.random() * items.length)] || 'lettuce';
  const qty = 2 + Math.floor(Math.random() * 3);
  const reward = Math.round(qty * (kPrice[chosen] || 10) * 1.6);
  return { item: chosen, qty, reward };
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<'en' | 'ar'>(() => {
    try {
      const saved = localStorage.getItem('save_v1');
      if (saved) {
        const j = JSON.parse(saved);
        if (j.lang === 'en' || j.lang === 'ar') return j.lang;
      }
    } catch (_) {}
    return 'ar'; // Default to Arabic as requested by user
  });

  const [coins, setCoins] = useState<number>(30);
  const [earned, setEarned] = useState<number>(0);
  const [tank, setTank] = useState<number>(120);
  const [tankLevel, setTankLevel] = useState<number>(0);
  const [sprinkler, setSprinkler] = useState<boolean>(false);
  const [penSize, setPenSize] = useState<number>(3);
  const [weather, setWeather] = useState<WeatherType>('sunny');
  const weatherLeftRef = useRef<number>(45);

  const [plots, setPlots] = useState<Plot[]>(() =>
    Array.from({ length: 6 }, () => ({ crop: null, progress: 0, water: 0.3 }))
  );
  const [animals, setAnimals] = useState<Animal[]>([
    { type: 'chicken', fullness: 0, progress: 0, stored: 0 },
  ]);
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [orders, setOrders] = useState<Order[]>([]);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const ticksRef = useRef<number>(0);

  const capacity = 200.0 + 100.0 * tankLevel;
  const level = 1 + Math.floor(earned / 150);

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

  // Update HTML direction when lang changes
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Load saved state on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('save_v1');
      if (raw) {
        const j = JSON.parse(raw);
        if (j.lang) setLang(j.lang);
        if (typeof j.coins === 'number') setCoins(j.coins);
        if (typeof j.earned === 'number') setEarned(j.earned);
        if (typeof j.tank === 'number') setTank(j.tank);
        if (typeof j.tankLevel === 'number') setTankLevel(j.tankLevel);
        if (typeof j.sprinkler === 'boolean') setSprinkler(j.sprinkler);
        if (typeof j.penSize === 'number') setPenSize(j.penSize);
        if (Array.isArray(j.plots)) setPlots(j.plots);
        if (Array.isArray(j.animals)) setAnimals(j.animals);
        if (j.inv && typeof j.inv === 'object') setInventory(j.inv);
        if (Array.isArray(j.orders) && j.orders.length > 0) {
          setOrders(j.orders);
        } else {
          setOrders([createRandomOrder(1), createRandomOrder(1), createRandomOrder(1)]);
        }
      } else {
        setOrders([createRandomOrder(1), createRandomOrder(1), createRandomOrder(1)]);
      }
    } catch (_) {
      setOrders([createRandomOrder(1), createRandomOrder(1), createRandomOrder(1)]);
    }
  }, []);

  // Save state helper
  const saveToStorage = useCallback(
    (customState?: {
      coins?: number;
      earned?: number;
      tank?: number;
      tankLevel?: number;
      sprinkler?: boolean;
      penSize?: number;
      plots?: Plot[];
      animals?: Animal[];
      inventory?: Record<string, number>;
      orders?: Order[];
      lang?: 'en' | 'ar';
    }) => {
      try {
        const data = {
          lang: customState?.lang ?? lang,
          coins: customState?.coins ?? coins,
          earned: customState?.earned ?? earned,
          tank: customState?.tank ?? tank,
          tankLevel: customState?.tankLevel ?? tankLevel,
          sprinkler: customState?.sprinkler ?? sprinkler,
          penSize: customState?.penSize ?? penSize,
          plots: customState?.plots ?? plots,
          animals: customState?.animals ?? animals,
          inv: customState?.inventory ?? inventory,
          orders: customState?.orders ?? orders,
        };
        localStorage.setItem('save_v1', JSON.stringify(data));
      } catch (_) {}
    },
    [lang, coins, earned, tank, tankLevel, sprinkler, penSize, plots, animals, inventory, orders]
  );

  // Ticking loop (1 second)
  useEffect(() => {
    const timer = setInterval(() => {
      weatherLeftRef.current -= 1;

      // Weather transition
      let curWeather = weather;
      if (weatherLeftRef.current <= 0) {
        const r = Math.random() * 100;
        const newW: WeatherType = r < 50 ? 'sunny' : r < 80 ? 'cloudy' : 'rain';
        curWeather = newW;
        setWeather(newW);
        weatherLeftRef.current = 40 + Math.floor(Math.random() * 31);
      }

      // Rain tank fill & plot drain
      const drain = curWeather === 'sunny' ? 0.025 : curWeather === 'cloudy' ? 0.015 : 0.0;

      setTank((prevTank) => {
        let t = prevTank;
        if (curWeather === 'rain') {
          t = Math.min(capacity, t + 6);
        }
        return t;
      });

      // Update plots
      setPlots((prevPlots) => {
        let currentTank = tank;
        let tankDeduction = 0;

        const nextPlots = prevPlots.map((p) => {
          let w = p.water;
          if (curWeather === 'rain') {
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
          if (c !== null && prog < 1 && w > 0) {
            const speed = w > 0.5 ? 1.0 : 0.5;
            prog = Math.min(1.0, prog + speed / kCrops[c].growSeconds);
          }

          return { ...p, water: w, progress: prog };
        });

        if (tankDeduction > 0) {
          setTank((t) => Math.max(0, t - tankDeduction));
        }

        return nextPlots;
      });

      // Update animals
      setAnimals((prevAnimals) => {
        return prevAnimals.map((a) => {
          const d = kAnimals[a.type];
          let fullness = a.fullness;
          let progress = a.progress;
          let stored = a.stored;

          if (fullness > 0) {
            fullness = Math.max(0.0, fullness - 1 / 90);
            if (stored < 3) {
              progress += 1 / d.period;
              if (progress >= 1) {
                progress = 0;
                stored += 1;
              }
            }
          }

          return { ...a, fullness, progress, stored };
        });
      });

      ticksRef.current += 1;
      if (ticksRef.current % 5 === 0) {
        saveToStorage();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weather, capacity, sprinkler, tank, saveToStorage]);

  // Actions
  const plant = useCallback(
    (i: number, t: CropType): string | null => {
      const d = kCrops[t];
      if (level < d.unlockLevel) {
        playSound('error');
        return 'locked';
      }
      if (coins < d.seedCost) {
        playSound('error');
        return 'noCoins';
      }

      setCoins((c) => c - d.seedCost);
      setPlots((prev) => {
        const next = [...prev];
        next[i] = { crop: t, progress: 0, water: next[i].water };
        return next;
      });
      playSound('plant');
      return null;
    },
    [level, coins]
  );

  const water = useCallback(
    (i: number): string | null => {
      const p = plots[i];
      if (weather === 'rain') {
        playSound('error');
        return 'rainWater';
      }
      if (p.water >= 0.9) {
        playSound('error');
        return 'plotWet';
      }
      if (tank - RESERVE < WATER_COST) {
        playSound('error');
        return 'tankLow';
      }

      setTank((t) => t - WATER_COST);
      setPlots((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], water: 1.0 };
        return next;
      });
      playSound('water');
      return null;
    },
    [plots, weather, tank]
  );

  const waterAll = useCallback((): string | null => {
    if (weather === 'rain') {
      playSound('error');
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
      playSound('water');
      return null;
    }

    playSound('error');
    return lastErr ?? 'nothingToWater';
  }, [weather, tank]);

  const harvest = useCallback(
    (i: number): string | null => {
      const p = plots[i];
      if (p.crop === null || p.progress < 1) return null;

      const key = p.crop;
      setInventory((prev) => ({
        ...prev,
        [key]: (prev[key] || 0) + 1,
      }));
      setPlots((prev) => {
        const next = [...prev];
        next[i] = { crop: null, progress: 0, water: p.water };
        return next;
      });
      playSound('harvest');
      return null;
    },
    [plots]
  );

  const buyAnimal = useCallback(
    (t: AnimalType): string | null => {
      const d = kAnimals[t];
      if (level < d.unlockLevel) {
        playSound('error');
        return 'locked';
      }
      if (animals.length >= penSize) {
        playSound('error');
        return 'penFull';
      }
      if (coins < d.cost) {
        playSound('error');
        return 'noCoins';
      }

      setCoins((c) => c - d.cost);
      setAnimals((prev) => [...prev, { type: t, fullness: 0, progress: 0, stored: 0 }]);
      playSound('collect');
      return null;
    },
    [level, animals.length, penSize, coins]
  );

  const feed = useCallback(
    (i: number): string | null => {
      const a = animals[i];
      const cost = kAnimals[a.type].feedCost;
      if (coins < cost) {
        playSound('error');
        return 'noCoins';
      }

      setCoins((c) => c - cost);
      setAnimals((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], fullness: 1.0 };
        return next;
      });
      playSound('feed');
      return 'fed';
    },
    [animals, coins]
  );

  const collect = useCallback(
    (i: number): string | null => {
      const a = animals[i];
      if (a.stored === 0) {
        playSound('error');
        return 'nothing';
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
      playSound('collect');
      return null;
    },
    [animals]
  );

  const earnCoins = useCallback((amt: number) => {
    setCoins((c) => c + amt);
    setEarned((e) => e + amt);
    playSound('coin');
  }, []);

  const sell = useCallback(
    (item: string, all: boolean = false) => {
      const have = inventory[item] || 0;
      const count = all ? have : have > 0 ? 1 : 0;
      if (count === 0) return;

      setInventory((prev) => ({
        ...prev,
        [item]: (prev[item] || 0) - count,
      }));
      earnCoins(count * (kPrice[item] || 0));
    },
    [inventory, earnCoins]
  );

  const deliver = useCallback(
    (idx: number): string | null => {
      const o = orders[idx];
      const have = inventory[o.item] || 0;
      if (have < o.qty) {
        playSound('error');
        return 'notEnough';
      }

      setInventory((prev) => ({
        ...prev,
        [o.item]: prev[o.item] - o.qty,
      }));
      earnCoins(o.reward);
      setOrders((prev) => {
        const next = [...prev];
        next[idx] = createRandomOrder(level);
        return next;
      });
      return null;
    },
    [orders, inventory, earnCoins, level]
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
      }
    },
    [tankLevel, plots.length, penSize]
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
      }
    },
    [tankLevel, plots.length, sprinkler, penSize]
  );

  const buyUpgrade = useCallback(
    (u: UpgradeType): string | null => {
      if (upgradeMaxed(u)) {
        playSound('error');
        return 'maxed';
      }
      const cost = upgradeCost(u);
      if (coins < cost) {
        playSound('error');
        return 'noCoins';
      }

      setCoins((c) => c - cost);
      switch (u) {
        case 'tank':
          setTankLevel((l) => l + 1);
          break;
        case 'plot':
          setPlots((prev) => [...prev, { crop: null, progress: 0, water: 0.3 }]);
          break;
        case 'sprinkler':
          setSprinkler(true);
          break;
        case 'pen':
          setPenSize((p) => p + 1);
          break;
      }
      playSound('coin');
      return null;
    },
    [upgradeMaxed, upgradeCost, coins]
  );

  const rewardRefill = useCallback(() => {
    setTank(capacity);
    playSound('water');
  }, [capacity]);

  return (
    <GameContext.Provider
      value={{
        lang,
        toggleLang,
        tr,
        coins,
        earned,
        level,
        tank,
        capacity,
        tankLevel,
        sprinkler,
        penSize,
        weather,
        plots,
        animals,
        inventory,
        orders,
        plant,
        water,
        waterAll,
        harvest,
        buyAnimal,
        feed,
        collect,
        sell,
        deliver,
        upgradeCost,
        upgradeMaxed,
        buyUpgrade,
        rewardRefill,
        toasts,
        showToast,
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
