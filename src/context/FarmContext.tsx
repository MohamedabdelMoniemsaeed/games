import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  AppLocale,
  AppTheme,
  ActiveScreen,
  AuthSession,
  FarmZone,
  FarmTask,
  FarmField,
  HarvestItem,
  FeedingEvent,
  WeatherSnapshot,
  WeatherCondition,
  Animal,
  AnimalDetail,
  HerdSummary,
  AnalyticsPeriod,
  AnalyticsData,
  Farm,
  UserRole,
  ChatMessage,
  VaccinationRecord,
  WaterLogEntry,
  FieldState,
  IrrigationResult,
  IrrCode,
} from '../types';
import { t, toArabicIndic } from '../locales/strings';

interface Toast {
  id: string;
  message: string;
  undoAction?: () => void;
  undoLabel?: string;
}

interface FarmContextType {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  toggleLocale: () => void;
  theme: AppTheme;
  toggleTheme: () => void;
  useIndicNumerals: boolean;
  setUseIndicNumerals: (val: boolean) => void;
  screen: ActiveScreen;
  setScreen: (screen: ActiveScreen) => void;
  session: AuthSession;
  login: (email: string) => void;
  continueAsGuest: () => void;
  completeOnboarding: () => void;
  logout: () => void;
  farms: Farm[];
  activeFarm: Farm;
  switchFarm: (farmId: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  selectedZone: FarmZone;
  setSelectedZone: (zone: FarmZone) => void;
  // Field CRUD
  fields: FarmField[];
  addField: (field: Omit<FarmField, 'id'>) => void;
  updateField: (id: string, updates: Partial<FarmField>) => void;
  deleteField: (id: string) => void;
  // Tasks CRUD
  tasks: FarmTask[];
  toggleTask: (id: string) => void;
  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  // Harvest CRUD
  harvests: HarvestItem[];
  markHarvested: (id: string, actualYieldKg?: number) => void;
  addHarvestPlan: (plan: Omit<HarvestItem, 'id' | 'isHarvested'>) => void;
  // Livestock CRUD & details
  animals: Animal[];
  herdSummary: HerdSummary;
  addAnimal: (animal: Animal) => void;
  updateAnimal: (tag: string, updates: Partial<Animal>) => void;
  deleteAnimal: (tag: string) => void;
  selectedAnimal: Animal | null;
  selectedAnimalDetail: AnimalDetail | null;
  selectAnimalByTag: (tag: string) => void;
  animalNotes: Record<string, string[]>;
  addAnimalNote: (tag: string, note: string) => void;
  addVaccinationRecord: (tag: string, record: Omit<VaccinationRecord, 'id'>) => void;
  // Feedings
  feedingSchedule: FeedingEvent[];
  toggleFeeding: (id: string) => void;
  // Weather
  weather: WeatherSnapshot;
  isLiveWeather: boolean;
  toggleLiveWeather: () => void;
  cycleWeather: () => void;
  scheduleWatering: () => void;
  skipIrrigation: () => void;
  plantCrop: () => void;
  // Smart Watering & FarmModel
  applySmartWatering: (fieldId: string, liters: number) => void;
  waterLogs: WaterLogEntry[];
  tank: number;
  usedToday: number;
  rainLikely: boolean;
  setRain: (v: boolean) => void;
  fieldMoisture: Record<'tomato' | 'veg' | 'corn', FieldState>;
  needFor: (kind: 'tomato' | 'veg' | 'corn') => number;
  irrigateField: (kind: 'tomato' | 'veg' | 'corn', force?: boolean) => IrrigationResult;
  smartWater: () => { results: Record<string, IrrigationResult>; doneCount: number; totalLiters: number };
  irrigationLog: string[];
  irrMessage: (name: string, r: IrrigationResult) => string;
  // Analytics
  analyticsPeriod: AnalyticsPeriod;
  setAnalyticsPeriod: (period: AnalyticsPeriod) => void;
  analyticsData: AnalyticsData;
  // Farm Assistant (AI)
  chatMessages: ChatMessage[];
  sendMessageToAssistant: (text: string) => void;
  isAssistantTyping: boolean;
  // Toasts
  toasts: Toast[];
  showToast: (message: string, undoAction?: () => void, undoLabel?: string) => void;
  t: (key: string, placeholders?: Record<string, string | number>) => string;
  formatNum: (val: number | string) => string;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

const initialFarms: Farm[] = [
  {
    id: 'farm-1',
    name: 'Green Valley Farm',
    ownerName: 'Alex Morgan',
    location: 'Green Valley · 12.5 ha',
    areaHectares: 12.5,
    role: 'owner',
  },
  {
    id: 'farm-2',
    name: 'Highland Orchard',
    ownerName: 'Alex Morgan',
    location: 'North Ridge · 8.2 ha',
    areaHectares: 8.2,
    role: 'owner',
  },
];

const initialAnimals: Animal[] = [
  {
    tag: 'COW-001',
    name: 'Bella',
    breed: 'Holstein-Friesian',
    nameKey: 'nameBella',
    breedKey: 'breedHolstein',
    ageMonths: 36,
    category: 'cows',
    healthPercent: 94,
    birthDate: '2023-04-10',
  },
  {
    tag: 'COW-002',
    name: 'Daisy',
    breed: 'Jersey',
    nameKey: 'nameDaisy',
    breedKey: 'breedJersey',
    ageMonths: 48,
    category: 'cows',
    healthPercent: 91,
    birthDate: '2022-04-12',
  },
  {
    tag: 'COW-003',
    name: 'Moose',
    breed: 'Angus',
    nameKey: 'nameMoose',
    breedKey: 'breedAngus',
    ageMonths: 24,
    category: 'cows',
    healthPercent: 84,
    birthDate: '2024-04-01',
  },
  {
    tag: 'HEN-001',
    name: 'Clucky',
    breed: 'Rhode Island Red',
    nameKey: 'nameClucky',
    breedKey: 'breedRhodeIsland',
    ageMonths: 18,
    category: 'chickens',
    healthPercent: 96,
    birthDate: '2024-10-15',
  },
  {
    tag: 'HEN-002',
    name: 'Pepper',
    breed: 'Leghorn',
    nameKey: 'namePepper',
    breedKey: 'breedLeghorn',
    ageMonths: 12,
    category: 'chickens',
    healthPercent: 91,
    birthDate: '2025-04-15',
  },
  {
    tag: 'SHP-001',
    name: 'Fluffy',
    breed: 'Merino',
    nameKey: 'nameFluffy',
    breedKey: 'breedMerino',
    ageMonths: 24,
    category: 'sheep',
    healthPercent: 89,
    birthDate: '2024-04-11',
  },
  {
    tag: 'GOT-001',
    name: 'Billy',
    breed: 'Boer',
    nameKey: 'nameBilly',
    breedKey: 'breedBoer',
    ageMonths: 24,
    category: 'goats',
    healthPercent: 93,
    birthDate: '2024-04-18',
  },
];

const initialFields: FarmField[] = [
  {
    id: 'field-tomato',
    name: 'Tomato Field',
    type: 'tomato',
    cropName: 'Tomatoes',
    growthPercent: 54,
    isHealthy: false,
    areaHectares: 2.4,
    plantingDate: '2026-08-15',
    lastWateredDate: '2026-10-04',
  },
  {
    id: 'field-veg',
    name: 'Vegetable Field',
    type: 'vegetables',
    cropName: 'Lettuce + Carrots',
    growthPercent: 88,
    isHealthy: true,
    areaHectares: 3.1,
    plantingDate: '2026-08-01',
    lastWateredDate: '2026-10-06',
  },
  {
    id: 'field-corn',
    name: 'Corn Field',
    type: 'corn',
    cropName: 'Sweet corn',
    growthPercent: 18,
    isHealthy: true,
    areaHectares: 4.8,
    plantingDate: '2026-09-10',
    lastWateredDate: '2026-10-05',
  },
];

const initialHarvests: HarvestItem[] = [
  {
    id: 'harvest-1',
    crop: 'tomatoes',
    cropKey: 'tomatoes',
    cropName: 'Tomatoes',
    fieldNameKey: 'tomatoField',
    fieldName: 'Tomato Field',
    expectedDate: '2026-10-11',
    expectedYieldKg: 460,
    daysUntilHarvest: 4,
    isHarvested: false,
  },
  {
    id: 'harvest-2',
    crop: 'lettuce',
    cropKey: 'lettuce',
    cropName: 'Lettuce',
    fieldNameKey: 'vegetableField',
    fieldName: 'Vegetable Field',
    expectedDate: '2026-10-16',
    expectedYieldKg: 320,
    daysUntilHarvest: 9,
    isHarvested: false,
  },
  {
    id: 'harvest-3',
    crop: 'corn',
    cropKey: 'corn',
    cropName: 'Sweet Corn',
    fieldNameKey: 'cornField',
    fieldName: 'Corn Field',
    expectedDate: '2026-10-25',
    expectedYieldKg: 500,
    daysUntilHarvest: 18,
    isHarvested: false,
  },
];

const weatherConditionsList: WeatherCondition[] = [
  'sunny',
  'clouds',
  'wind',
  'rainshower',
  'clearingUp',
];

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<AppLocale>(() => {
    const saved = localStorage.getItem('gv_locale') as AppLocale;
    if (saved) return saved;
    // Default to Arabic when requested in Arabic or Arabic browser locale
    return 'ar';
  });

  const [theme, setThemeState] = useState<AppTheme>(() => {
    return (localStorage.getItem('gv_theme') as AppTheme) || 'light';
  });

  const [useIndicNumerals, setUseIndicNumeralsState] = useState<boolean>(() => {
    return localStorage.getItem('gv_indic_numerals') === 'true';
  });

  const [farms] = useState<Farm[]>(initialFarms);
  const [activeFarmId, setActiveFarmId] = useState<string>('farm-1');
  const [userRole, setUserRole] = useState<UserRole>('owner');

  const [session, setSession] = useState<AuthSession>(() => {
    try {
      const saved = localStorage.getItem('gv_session');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      onboardingSeen: true,
      user: { email: 'farmer@greenvalley.farm', name: 'Alex Morgan', role: 'owner' },
      isGuest: false,
      activeFarmId: 'farm-1',
    };
  });

  const [screen, setScreen] = useState<ActiveScreen>('home');
  const [selectedZone, setSelectedZone] = useState<FarmZone>('overview');

  // Fields CRUD state
  const [fields, setFields] = useState<FarmField[]>(() => {
    try {
      const saved = localStorage.getItem('gv_fields');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return initialFields;
  });

  // Tasks state
  const [tasks, setTasks] = useState<FarmTask[]>(() => {
    try {
      const saved = localStorage.getItem('gv_tasks');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [
      { id: 'water-tomatoes', type: 'waterTomatoes', isCompleted: false },
      { id: 'check-corn', type: 'checkCorn', isCompleted: false },
      { id: 'feed-livestock', type: 'feedLivestock', isCompleted: true },
      { id: 'prepare-harvest', type: 'prepareHarvest', isCompleted: false },
    ];
  });

  // Harvests state
  const [harvests, setHarvests] = useState<HarvestItem[]>(() => {
    try {
      const saved = localStorage.getItem('gv_harvests');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return initialHarvests;
  });

  // Animals state
  const [animals, setAnimals] = useState<Animal[]>(() => {
    try {
      const saved = localStorage.getItem('gv_animals');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return initialAnimals;
  });

  const [vaccinationsMap, setVaccinationsMap] = useState<Record<string, VaccinationRecord[]>>(() => {
    try {
      const saved = localStorage.getItem('gv_vaccinations');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      'COW-001': [
        { id: 'v1', date: '2026-05-12', vaccineKey: 'rabiesVaccine' },
        { id: 'v2', date: '2026-02-03', vaccineKey: 'clostridialVaccine' },
        { id: 'v3', date: '2025-10-18', vaccineKey: 'boosterVaccine' },
      ],
      'HEN-001': [
        { id: 'v4', date: '2026-03-10', vaccineKey: 'boosterVaccine' },
      ],
    };
  });

  const [animalNotes, setAnimalNotes] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem('gv_animal_notes');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      'COW-001': ['Regular health checkup passed with high vitality.', 'Vaccinated on schedule.'],
      'HEN-001': ['High egg yield, feather quality excellent.'],
    };
  });

  // Water logs
  const [waterLogs, setWaterLogs] = useState<WaterLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem('gv_water_logs');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [
      { id: 'wl-1', date: '2026-10-06', fieldId: 'field-veg', litersUsed: 620, reason: 'Evening moisture cycle' },
      { id: 'wl-2', date: '2026-10-05', fieldId: 'field-corn', litersUsed: 620, reason: 'Early root soak' },
    ];
  });

  // Feeding state
  const [feedingSchedule, setFeedingSchedule] = useState<FeedingEvent[]>(() => {
    try {
      const saved = localStorage.getItem('gv_feeding');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [
      { id: 'feed-1', time: '06:00', type: 'haySilage', isComplete: true },
      { id: 'feed-2', time: '12:00', type: 'grainMix', isComplete: false },
      { id: 'feed-3', time: '18:00', type: 'eveningFeed', isComplete: false },
    ];
  });

  // Weather state
  const [weatherCondition, setWeatherCondition] = useState<WeatherCondition>('sunny');
  const [isLiveWeather, setIsLiveWeather] = useState(false);
  const [liveWeatherSnapshot, setLiveWeatherSnapshot] = useState<WeatherSnapshot | null>(null);

  // FarmModel Irrigation states
  const [tank, setTank] = useState<number>(() => {
    const s = localStorage.getItem('gv_tank');
    return s ? parseFloat(s) : 8200;
  });
  const [usedToday, setUsedToday] = useState<number>(() => {
    const s = localStorage.getItem('gv_used_today');
    return s ? parseFloat(s) : 1240;
  });
  const [rainLikely, setRainLikely] = useState<boolean>(() => {
    return localStorage.getItem('gv_rain_likely') === 'true';
  });
  const [irrigationLog, setIrrigationLog] = useState<string[]>(() => {
    try {
      const s = localStorage.getItem('gv_irr_log');
      if (s) return JSON.parse(s);
    } catch (_) {}
    return ['Tomato Field: 620 L', 'Vegetable Field: 620 L'];
  });
  const [fieldMoisture, setFieldMoisture] = useState<Record<'tomato' | 'veg' | 'corn', FieldState>>(() => {
    try {
      const s = localStorage.getItem('gv_field_moisture');
      if (s) return JSON.parse(s);
    } catch (_) {}
    return {
      tomato: { name: 'Tomato Field', areaHa: 2.5, target: 0.70, moisture: 0.45 },
      veg: { name: 'Vegetable Field', areaHa: 3.0, target: 0.75, moisture: 0.72 },
      corn: { name: 'Corn Field', areaHa: 4.0, target: 0.60, moisture: 0.38 },
    };
  });

  const [selectedAnimalTag, setSelectedAnimalTag] = useState<string | null>(null);
  const [analyticsPeriod, setAnalyticsPeriod] = useState<AnalyticsPeriod>('week');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // AI Assistant Chat Messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'm1',
      sender: 'assistant',
      text:
        locale === 'ar'
          ? 'مرحبًا بك في مساعد المزرعة الذكي! أنا هنا لمساعدتك في فحص المحاصيل، صحة القطيع، خطط الري، وتوصيات الطقس. كيف يمكنني خدمتك اليوم؟'
          : 'Welcome to your Farm Assistant! I can help you with crop health, livestock status, smart irrigation schedules, and weather forecasts. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);

  // Sync HTML Attributes
  useEffect(() => {
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    localStorage.setItem('gv_locale', locale);
  }, [locale]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('gv_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('gv_indic_numerals', String(useIndicNumerals));
  }, [useIndicNumerals]);

  // Sync Local Storage
  useEffect(() => {
    localStorage.setItem('gv_session', JSON.stringify(session));
  }, [session]);

  useEffect(() => {
    localStorage.setItem('gv_fields', JSON.stringify(fields));
  }, [fields]);

  useEffect(() => {
    localStorage.setItem('gv_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('gv_harvests', JSON.stringify(harvests));
  }, [harvests]);

  useEffect(() => {
    localStorage.setItem('gv_animals', JSON.stringify(animals));
  }, [animals]);

  useEffect(() => {
    localStorage.setItem('gv_vaccinations', JSON.stringify(vaccinationsMap));
  }, [vaccinationsMap]);

  useEffect(() => {
    localStorage.setItem('gv_animal_notes', JSON.stringify(animalNotes));
  }, [animalNotes]);

  useEffect(() => {
    localStorage.setItem('gv_water_logs', JSON.stringify(waterLogs));
  }, [waterLogs]);

  useEffect(() => {
    localStorage.setItem('gv_feeding', JSON.stringify(feedingSchedule));
  }, [feedingSchedule]);

  useEffect(() => {
    localStorage.setItem('gv_tank', String(tank));
  }, [tank]);

  useEffect(() => {
    localStorage.setItem('gv_used_today', String(usedToday));
  }, [usedToday]);

  useEffect(() => {
    localStorage.setItem('gv_rain_likely', String(rainLikely));
  }, [rainLikely]);

  useEffect(() => {
    localStorage.setItem('gv_irr_log', JSON.stringify(irrigationLog));
  }, [irrigationLog]);

  useEffect(() => {
    localStorage.setItem('gv_field_moisture', JSON.stringify(fieldMoisture));
  }, [fieldMoisture]);

  // Open-Meteo Live Weather Fetch
  const fetchLiveWeather = useCallback(async () => {
    try {
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=31.2&longitude=30.8&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_gusts_10m&hourly=temperature_2m&forecast_days=1'
      );
      if (res.ok) {
        const data = await res.json();
        const current = data.current;
        const code = current.weather_code;
        let cond: WeatherCondition = 'sunny';
        if (code === 0 || code === 1) cond = 'sunny';
        else if (code === 2 || code === 3) cond = 'clouds';
        else if (code >= 51 && code <= 67) cond = 'rainshower';
        else if (code >= 80 && code <= 99) cond = 'rainshower';
        else cond = 'wind';

        const snap: WeatherSnapshot = {
          condition: cond,
          temperature: Math.round(current.temperature_2m),
          humidity: Math.round(current.relative_humidity_2m),
          windSpeed: Math.round(current.wind_speed_10m),
          windDirectionDegrees: 240,
          gustSpeed: Math.round(current.wind_gusts_10m || 15),
          rainChance: cond === 'rainshower' ? 85 : 10,
          soilMoisture: cond === 'rainshower' ? 88 : 74,
          expectedRainMm: cond === 'rainshower' ? 12 : 0,
          waterTankPercent: 86,
          waterStoredLiters: 8600,
          soilStatusKey: cond === 'rainshower' ? 'wellWatered' : 'moistureGood',
          feelsLike: Math.round(current.temperature_2m + 1),
          temperatureHistory: [21, 23, 25, 27, 26, 28, Math.round(current.temperature_2m)],
          isLiveApi: true,
        };
        setLiveWeatherSnapshot(snap);
      }
    } catch (_) {
      // Fallback silently if offline or blocked
    }
  }, []);

  useEffect(() => {
    if (isLiveWeather) {
      fetchLiveWeather();
    }
  }, [isLiveWeather, fetchLiveWeather]);

  const setLocale = (l: AppLocale) => setLocaleState(l);
  const toggleLocale = () => setLocaleState((prev) => (prev === 'en' ? 'ar' : 'en'));
  const toggleTheme = () => setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  const setUseIndicNumerals = (v: boolean) => setUseIndicNumeralsState(v);

  const showToast = (message: string, undoAction?: () => void, undoLabel?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, undoAction, undoLabel }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 4500);
  };

  const login = (email: string) => {
    setSession({
      onboardingSeen: true,
      user: { email, name: email.split('@')[0], role: 'owner' },
      isGuest: false,
      activeFarmId: 'farm-1',
    });
    setScreen('home');
    showToast(t(locale, 'welcomeBack', {}, useIndicNumerals));
  };

  const continueAsGuest = () => {
    setSession({
      onboardingSeen: true,
      user: null,
      isGuest: true,
      activeFarmId: 'farm-1',
    });
    setScreen('home');
  };

  const completeOnboarding = () => {
    setSession((prev) => ({ ...prev, onboardingSeen: true }));
    setScreen('login');
  };

  const logout = () => {
    setSession({
      onboardingSeen: true,
      user: null,
      isGuest: false,
      activeFarmId: 'farm-1',
    });
    setScreen('login');
  };

  const switchFarm = (farmId: string) => {
    setActiveFarmId(farmId);
    showToast(locale === 'ar' ? 'تم التبديل إلى المزرعة المختارة' : 'Switched to selected farm');
  };

  // Field CRUD
  const addField = (field: Omit<FarmField, 'id'>) => {
    const newField: FarmField = {
      ...field,
      id: `field-${Date.now()}`,
    };
    setFields((prev) => [...prev, newField]);
    showToast(locale === 'ar' ? 'تمت إضافة الحقل بنجاح' : 'Field added successfully');
  };

  const updateField = (id: string, updates: Partial<FarmField>) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
    showToast(locale === 'ar' ? 'تم تحديث الحقل' : 'Field updated');
  };

  const deleteField = (id: string) => {
    const deleted = fields.find((f) => f.id === id);
    if (!deleted) return;
    setFields((prev) => prev.filter((f) => f.id !== id));
    showToast(
      locale === 'ar' ? 'تم حذف الحقل' : 'Field deleted',
      () => setFields((prev) => [...prev, deleted]),
      t(locale, 'undo')
    );
  };

  // Task CRUD
  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task))
    );
  };

  const addTask = (title: string) => {
    if (!title.trim()) return;
    const newTask: FarmTask = {
      id: `task-${Date.now()}`,
      type: 'custom',
      customTitle: title.trim(),
      isCompleted: false,
      assignedRole: userRole,
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast(t(locale, 'taskAddedMock', {}, useIndicNumerals));
  };

  const deleteTask = (id: string) => {
    const deleted = tasks.find((t) => t.id === id);
    if (!deleted) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast(
      locale === 'ar' ? 'تمت إزالة المهمة' : 'Task removed',
      () => setTasks((prev) => [deleted, ...prev]),
      t(locale, 'undo')
    );
  };

  // Harvest CRUD
  const markHarvested = (id: string, actualYieldKg?: number) => {
    setHarvests((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isHarvested: true,
              actualYieldKg: actualYieldKg || item.expectedYieldKg,
            }
          : item
      )
    );
    showToast(t(locale, 'harvested', {}, useIndicNumerals));
  };

  const addHarvestPlan = (plan: Omit<HarvestItem, 'id' | 'isHarvested'>) => {
    const newPlan: HarvestItem = {
      ...plan,
      id: `harvest-${Date.now()}`,
      isHarvested: false,
    };
    setHarvests((prev) => [...prev, newPlan]);
    showToast(locale === 'ar' ? 'تمت إضافة خطة الحصاد' : 'Harvest plan added');
  };

  // Animals CRUD
  const addAnimal = (animal: Animal) => {
    setAnimals((prev) => [animal, ...prev]);
    showToast(locale === 'ar' ? 'تمت إضافة الحيوان إلى القطيع' : 'Animal added to herd');
  };

  const updateAnimal = (tag: string, updates: Partial<Animal>) => {
    setAnimals((prev) => prev.map((a) => (a.tag === tag ? { ...a, ...updates } : a)));
    showToast(locale === 'ar' ? 'تم تحديث بيانات الحيوان' : 'Animal details updated');
  };

  const deleteAnimal = (tag: string) => {
    const deleted = animals.find((a) => a.tag === tag);
    if (!deleted) return;
    setAnimals((prev) => prev.filter((a) => a.tag !== tag));
    showToast(
      t(locale, 'animalDeleted', {}, useIndicNumerals),
      () => setAnimals((prev) => [deleted, ...prev]),
      t(locale, 'undo')
    );
  };

  const selectAnimalByTag = (tag: string) => {
    setSelectedAnimalTag(tag);
    setScreen('animal-detail');
  };

  const addAnimalNote = (tag: string, note: string) => {
    if (!note.trim()) return;
    setAnimalNotes((prev) => ({
      ...prev,
      [tag]: [note.trim(), ...(prev[tag] || [])],
    }));
    showToast(t(locale, 'noteSaved', {}, useIndicNumerals));
  };

  const addVaccinationRecord = (tag: string, record: Omit<VaccinationRecord, 'id'>) => {
    const newRecord: VaccinationRecord = {
      ...record,
      id: `vac-${Date.now()}`,
    };
    setVaccinationsMap((prev) => ({
      ...prev,
      [tag]: [newRecord, ...(prev[tag] || [])],
    }));
    showToast(locale === 'ar' ? 'تم تسجيل التطعيم' : 'Vaccination recorded');
  };

  const toggleFeeding = (id: string) => {
    setFeedingSchedule((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isComplete: !item.isComplete } : item))
    );
  };

  // Weather Actions
  const toggleLiveWeather = () => {
    const next = !isLiveWeather;
    setIsLiveWeather(next);
    if (next) {
      fetchLiveWeather();
      showToast(t(locale, 'liveForecast', {}, useIndicNumerals));
    } else {
      showToast(t(locale, 'demoCycle', {}, useIndicNumerals));
    }
  };

  const cycleWeather = () => {
    setIsLiveWeather(false);
    const currentIndex = weatherConditionsList.indexOf(weatherCondition);
    const nextIndex = (currentIndex + 1) % weatherConditionsList.length;
    const nextCond = weatherConditionsList[nextIndex];
    setWeatherCondition(nextCond);
    const key =
      nextCond === 'sunny'
        ? 'weatherSunny'
        : nextCond === 'clouds'
        ? 'weatherClouds'
        : nextCond === 'wind'
        ? 'weatherWind'
        : nextCond === 'rainshower'
        ? 'weatherRainshower'
        : 'weatherClearingUp';
    showToast(t(locale, key, {}, useIndicNumerals));
  };

  const scheduleWatering = () => {
    showToast(t(locale, 'wateringScheduled', {}, useIndicNumerals));
  };

  const skipIrrigation = () => {
    showToast(t(locale, 'irrigationSkipped', {}, useIndicNumerals));
  };

  const plantCrop = () => {
    showToast(t(locale, 'cropAddedToPlan', {}, useIndicNumerals));
  };

  // Smart Watering calculation & execution
  const applySmartWatering = (fieldId: string, liters: number) => {
    const targetField = fields.find((f) => f.id === fieldId) || fields[0];
    const log: WaterLogEntry = {
      id: `wl-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      fieldId: targetField.id,
      litersUsed: liters,
      reason: 'Smart irrigation cycle',
    };
    setWaterLogs((prev) => [log, ...prev]);

    // Mark field healthy and increase growth
    setFields((prev) =>
      prev.map((f) =>
        f.id === targetField.id
          ? {
              ...f,
              isHealthy: true,
              growthPercent: Math.min(100, f.growthPercent + 10),
              lastWateredDate: new Date().toISOString().split('T')[0],
            }
          : f
      )
    );

    showToast(
      t(
        locale,
        'irrigationApplied',
        {
          liters: useIndicNumerals && locale === 'ar' ? toArabicIndic(liters) : liters,
          field: targetField.name,
        },
        useIndicNumerals
      )
    );
  };

  // AI Farm Assistant Chat Handler
  const sendMessageToAssistant = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsAssistantTyping(true);

    // Simulate intelligent contextual agent response with live farm telemetry
    setTimeout(() => {
      let replyText = '';
      const textLower = userText.toLowerCase();

      if (textLower.includes('today') || textLower.includes('اليوم') || textLower.includes('مهام')) {
        replyText =
          locale === 'ar'
            ? `أهلاً بك! بناءً على حالة المزرعة اليوم:
1. يحتاج حقل الطماطم إلى الري (الرطوبة 54%).
2. لديك وجبة التغذية القادمة للقطيع الساعة 12:00 (خليط الحبوب).
3. الطقس مشمس ومناسب لمتابعة نمو حقل الذرة.`
            : `Hello farmer! Based on today's farm data:
1. The Tomato field needs watering (current growth 54%).
2. The next herd feeding is due at 12:00 (Grain mix).
3. The sunny forecast makes it a great day to inspect the corn crops.`;
      } else if (textLower.includes('herd') || textLower.includes('قطيع') || textLower.includes('حيوان') || textLower.includes('health')) {
        replyText =
          locale === 'ar'
            ? `القطيع بالكامل بصحة ممتازة (93%)! يضم 48 حيواناً (18 بقرة، 20 دجاجة، 6 أغنام، 4 ماعز). مخزون الأعلاف يكفي لـ 12 يوماً. نوصي باستكمال جرعة التطعيم السنوية المجدولة.`
            : `Your herd is in excellent health (93%)! Comprising 48 animals across 4 groups. Feed reserves will last 12 days. Remember to consult a licensed veterinarian for specific treatment plans.`;
      } else if (textLower.includes('water') || textLower.includes('ري') || textLower.includes('سقي') || textLower.includes('irrigate')) {
        replyText =
          locale === 'ar'
            ? `احتياطي خزان المياه الحالي 82% (8,200 لتر). استهلاك اليوم 1,240 لتر. يُوصى ببدء دورة الري الذكي لحقل الطماطم صباحاً لتوفير المياه وتفادي حرارة الظهيرة.`
            : `The water tank is at 82% capacity (8,200 L stored). Today's consumption is 1,240 L. Smart watering is recommended for the tomato field early before peak afternoon warmth.`;
      } else if (textLower.includes('harvest') || textLower.includes('حصاد')) {
        replyText =
          locale === 'ar'
            ? `أقرب موعد حصاد هو محصول الطماطم بعد 4 أيام بكمية متوقعة 460 كجم، يليه الخس بعد 9 أيام (320 كجم). تجهيزات المستودعات جاهزة!`
            : `The next harvest is tomatoes in 4 days with an estimated yield of 460 kg, followed by lettuce in 9 days (320 kg). Storage containers are prepped!`;
      } else {
        replyText =
          locale === 'ar'
            ? `مزرعة الوادي الأخضر تعمل بكفاءة إنتاجية 84% وتقييم 92/100. أنصحك بالتحقق من جدول التغذية وري حقل الطماطم اليوم.`
            : `Green Valley Farm is operating at 84% production efficiency with a 92/100 farm health score. I recommend reviewing today's feeding schedule and running smart watering for the tomato field.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatMessages((prev) => [...prev, botMsg]);
      setIsAssistantTyping(false);
    }, 900);
  };

  // Weather fallback
  const fallbackWeather: WeatherSnapshot = {
    condition: weatherCondition,
    temperature: weatherCondition === 'sunny' ? 28 : weatherCondition === 'clouds' ? 25 : weatherCondition === 'wind' ? 24 : weatherCondition === 'rainshower' ? 21 : 26,
    humidity: weatherCondition === 'rainshower' ? 84 : 52,
    windSpeed: weatherCondition === 'wind' ? 29 : 11,
    windDirectionDegrees: 240,
    gustSpeed: weatherCondition === 'wind' ? 42 : 18,
    rainChance: weatherCondition === 'rainshower' ? 86 : 5,
    soilMoisture: weatherCondition === 'rainshower' ? 88 : 72,
    expectedRainMm: weatherCondition === 'rainshower' ? 14.5 : 0,
    waterTankPercent: 82,
    waterStoredLiters: 8200,
    soilStatusKey: weatherCondition === 'rainshower' ? 'wellWatered' : 'moistureGood',
    feelsLike: weatherCondition === 'sunny' ? 29 : 25,
    temperatureHistory: [22, 24, 23, 27, 26, 29, 28],
    isLiveApi: false,
  };

  const weather = isLiveWeather && liveWeatherSnapshot ? liveWeatherSnapshot : fallbackWeather;

  // Herd Summary derived from animals state
  const cowsCount = animals.filter((a) => a.category === 'cows').length;
  const chickensCount = animals.filter((a) => a.category === 'chickens').length;
  const sheepCount = animals.filter((a) => a.category === 'sheep').length;
  const goatsCount = animals.filter((a) => a.category === 'goats').length;
  const totalAnimals = animals.length;

  const herdSummary: HerdSummary = {
    total: totalAnimals,
    cows: cowsCount,
    chickens: chickensCount,
    sheep: sheepCount,
    goats: goatsCount,
    healthPercent: Math.round(
      animals.reduce((acc, a) => acc + a.healthPercent, 0) / (totalAnimals || 1)
    ),
    feedPercent: 78,
    productionPercent: 84,
  };

  const selectedAnimal =
    animals.find((a) => a.tag === selectedAnimalTag) || animals[0] || initialAnimals[0];

  const baseWeight =
    selectedAnimal.category === 'cows'
      ? 430
      : selectedAnimal.category === 'chickens'
      ? 2
      : selectedAnimal.category === 'sheep'
      ? 62
      : 48;

  const selectedAnimalDetail: AnimalDetail = {
    tag: selectedAnimal.tag,
    weightHistoryKg: [
      baseWeight - 18,
      baseWeight - 12,
      baseWeight - 8,
      baseWeight - 3,
      baseWeight,
    ],
    vaccinations: vaccinationsMap[selectedAnimal.tag] || [
      { id: 'v1', date: '2026-05-12', vaccineKey: 'rabiesVaccine' },
      { id: 'v2', date: '2026-02-03', vaccineKey: 'clostridialVaccine' },
      { id: 'v3', date: '2025-10-18', vaccineKey: 'boosterVaccine' },
    ],
  };

  const multiplier = analyticsPeriod === 'week' ? 1 : analyticsPeriod === 'month' ? 4 : 12;

  const analyticsData: AnalyticsData = {
    totalYield: 1280 * multiplier,
    yieldChangePercent: analyticsPeriod === 'week' ? 12 : 16,
    waterEfficiency: 86,
    farmScore: 92,
    productionValues: [38, 46, 44, 58, 62, 57, 76].map((v) => v * multiplier),
    cropYields: [
      { crop: t(locale, 'tomatoes', {}, useIndicNumerals), yield: 76 * multiplier, color: '#D6533E' },
      { crop: t(locale, 'vegetables', {}, useIndicNumerals), yield: 54 * multiplier, color: '#3D8D43' },
      { crop: t(locale, 'sweetCorn', {}, useIndicNumerals), yield: 39 * multiplier, color: '#E2CB91' },
    ],
  };

  const activeFarm = farms.find((f) => f.id === activeFarmId) || farms[0];

  const needFor = (k: 'tomato' | 'veg' | 'corn') => {
    const f = fieldMoisture[k];
    const gap = (f.target - f.moisture) * 100;
    return gap <= 5 ? 0 : gap * f.areaHa * 40.0;
  };

  const irrigateField = (k: 'tomato' | 'veg' | 'corn', force = false): IrrigationResult => {
    const f = fieldMoisture[k];
    const need = needFor(k);
    if (need <= 0) return { code: 'noNeed', liters: 0 };
    if (rainLikely && !force) return { code: 'rain', liters: 0 };
    if (tank - 1000 <= 0) return { code: 'tankLow', liters: 0 };
    if (4000 - usedToday <= 0) return { code: 'dailyLimit', liters: 0 };

    const available = Math.max(0, Math.min(tank - 1000, 4000 - usedToday));
    const liters = Math.min(need, available);
    setTank((prev) => prev - liters);
    setUsedToday((prev) => prev + liters);
    setFieldMoisture((prev) => ({
      ...prev,
      [k]: {
        ...prev[k],
        moisture: Math.min(1.0, prev[k].moisture + liters / (prev[k].areaHa * 40.0) / 100),
      },
    }));
    const entry = `${f.name}: ${Math.round(liters).toLocaleString()} L`;
    setIrrigationLog((prev) => [entry, ...prev.slice(0, 19)]);
    return { code: liters < need ? 'partial' : 'done', liters };
  };

  const smartWater = () => {
    const order: ('tomato' | 'veg' | 'corn')[] = (['tomato', 'veg', 'corn'] as const).slice().sort(
      (a, b) => (fieldMoisture[a].moisture / fieldMoisture[a].target) - (fieldMoisture[b].moisture / fieldMoisture[b].target)
    );
    const results: Record<string, IrrigationResult> = {};
    let totalLiters = 0;
    let doneCount = 0;
    for (const k of order) {
      const res = irrigateField(k);
      results[k] = res;
      if (res.code === 'done' || res.code === 'partial') {
        doneCount++;
        totalLiters += res.liters;
      }
    }
    return { results, doneCount, totalLiters };
  };

  const irrMessage = (name: string, r: IrrigationResult) => {
    const formattedL = Math.round(r.liters).toLocaleString();
    if (locale === 'ar') {
      switch (r.code) {
        case 'done':
          return `تم ري ${name}: تم سحب ${formattedL} لتر من الخزان`;
        case 'partial':
          return `تم ري ${name} جزئياً: ${formattedL} لتر (بسبب احتياطي الخزان أو الحد اليومي)`;
        case 'noNeed':
          return `رطوبة تربة ${name} كافية، لا حاجة للري الآن`;
        case 'rain':
          return 'المطر متوقع، تم تخطي الري لتوفير المياه';
        case 'tankLow':
          return 'الخزان عند مستوى الاحتياطي (١٬٠٠٠ لتر محفوظة للماشية)';
        case 'dailyLimit':
          return 'تم الوصول إلى الحد الأقصى اليومي (٤٬٠٠٠ لتر)';
      }
    }
    switch (r.code) {
      case 'done':
        return `${name} irrigated: ${formattedL} L taken from the tank`;
      case 'partial':
        return `${name} partly irrigated: ${formattedL} L (limited by the tank reserve or daily limit)`;
      case 'noNeed':
        return `${name} has enough soil moisture, no irrigation needed`;
      case 'rain':
        return 'Rain is expected, irrigation skipped to save water';
      case 'tankLow':
        return 'Tank is at the reserve level (1,000 L kept for livestock)';
      case 'dailyLimit':
        return 'Daily limit of 4,000 L reached';
    }
  };

  const formatNum = (val: number | string) => {
    return useIndicNumerals && locale === 'ar' ? toArabicIndic(val) : String(val);
  };

  const translate = (key: string, placeholders?: Record<string, string | number>) =>
    t(locale, key, placeholders, useIndicNumerals);

  return (
    <FarmContext.Provider
      value={{
        locale,
        setLocale,
        toggleLocale,
        theme,
        toggleTheme,
        useIndicNumerals,
        setUseIndicNumerals,
        screen,
        setScreen,
        session,
        login,
        continueAsGuest,
        completeOnboarding,
        logout,
        farms,
        activeFarm,
        switchFarm,
        userRole,
        setUserRole,
        selectedZone,
        setSelectedZone,
        fields,
        addField,
        updateField,
        deleteField,
        tasks,
        toggleTask,
        addTask,
        deleteTask,
        harvests,
        markHarvested,
        addHarvestPlan,
        animals,
        herdSummary,
        addAnimal,
        updateAnimal,
        deleteAnimal,
        selectedAnimal,
        selectedAnimalDetail,
        selectAnimalByTag,
        animalNotes,
        addAnimalNote,
        addVaccinationRecord,
        feedingSchedule,
        toggleFeeding,
        weather,
        isLiveWeather,
        toggleLiveWeather,
        cycleWeather,
        scheduleWatering,
        skipIrrigation,
        plantCrop,
        applySmartWatering,
        waterLogs,
        tank,
        usedToday,
        rainLikely,
        setRain: setRainLikely,
        fieldMoisture,
        needFor,
        irrigateField,
        smartWater,
        irrigationLog,
        irrMessage,
        analyticsPeriod,
        setAnalyticsPeriod,
        analyticsData,
        chatMessages,
        sendMessageToAssistant,
        isAssistantTyping,
        toasts,
        showToast,
        t: translate,
        formatNum,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) throw new Error('useFarm must be used within a FarmProvider');
  return context;
};
