export type AppLocale = 'en' | 'ar';
export type AppTheme = 'light' | 'dark';

export type UserRole = 'owner' | 'worker' | 'viewer';

export type ScreenTab = 'home' | 'farm' | 'analytics' | 'harvest' | 'profile';

export type ActiveScreen =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'create-account'
  | ScreenTab
  | 'livestock'
  | 'animal-detail'
  | 'weather';

export interface AuthUser {
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthSession {
  onboardingSeen: boolean;
  user: AuthUser | null;
  isGuest: boolean;
  activeFarmId: string;
}

export interface Farm {
  id: string;
  name: string;
  ownerName: string;
  location: string;
  areaHectares: number;
  role: UserRole;
}

export type FarmZone =
  | 'overview'
  | 'farmHouse'
  | 'tomatoField'
  | 'vegetableField'
  | 'cornField'
  | 'animalArea'
  | 'waterTank';

export type FarmStatus = 'excellent' | 'good' | 'healthy';

export interface FarmZoneInfo {
  zone: FarmZone;
  nameKey: string;
  subtitleKey: string;
  status: FarmStatus;
  growthPercent?: number;
  size?: string;
  rooms?: string;
  animalCount?: number;
  waterLevel?: number;
  waterStored?: number;
  waterUsed?: number;
}

export interface DashboardMetricStat {
  crops: number;
  animals: number;
  soilMoisture: number;
  harvestKg: number;
}

export type FarmTaskType = 'waterTomatoes' | 'checkCorn' | 'feedLivestock' | 'prepareHarvest' | 'custom';

export interface FarmTask {
  id: string;
  type: FarmTaskType;
  customTitle?: string;
  isCompleted: boolean;
  assignedRole?: UserRole;
  createdAt?: string;
}

export type FarmFieldType = 'tomato' | 'corn' | 'vegetables' | 'custom';

export interface FarmField {
  id: string;
  name: string;
  type: FarmFieldType;
  cropName: string;
  growthPercent: number;
  isHealthy: boolean;
  areaHectares: number;
  plantingDate: string;
  lastWateredDate?: string;
}

export type AnimalCategory = 'cows' | 'chickens' | 'sheep' | 'goats';

export interface Animal {
  tag: string;
  name: string;
  breed: string;
  nameKey?: string;
  breedKey?: string;
  ageMonths: number;
  category: AnimalCategory;
  healthPercent: number;
  birthDate?: string;
  notes?: string[];
}

export interface VaccinationRecord {
  id: string;
  date: string;
  vaccineKey: string;
  vaccineName?: string;
}

export interface AnimalDetail {
  tag: string;
  weightHistoryKg: number[];
  vaccinations: VaccinationRecord[];
}

export interface HerdSummary {
  total: number;
  cows: number;
  chickens: number;
  sheep: number;
  goats: number;
  healthPercent: number;
  feedPercent: number;
  productionPercent: number;
}

export type FeedType = 'haySilage' | 'grainMix' | 'eveningFeed';

export interface FeedingEvent {
  id: string;
  time: string;
  type: FeedType;
  isComplete: boolean;
}

export type WeatherCondition = 'sunny' | 'clouds' | 'wind' | 'rainshower' | 'clearingUp';

export interface WeatherSnapshot {
  condition: WeatherCondition;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirectionDegrees: number;
  gustSpeed: number;
  rainChance: number;
  soilMoisture: number;
  expectedRainMm: number;
  waterTankPercent: number;
  waterStoredLiters: number;
  soilStatusKey: string;
  feelsLike: number;
  temperatureHistory: number[];
  isLiveApi?: boolean;
}

export interface WaterLogEntry {
  id: string;
  date: string;
  fieldId: string;
  litersUsed: number;
  reason: string;
}

export type HarvestCrop = 'tomatoes' | 'lettuce' | 'corn' | 'wheat' | 'carrots';

export interface HarvestItem {
  id: string;
  crop: HarvestCrop;
  cropKey: string;
  cropName?: string;
  fieldNameKey: string;
  fieldName?: string;
  expectedDate: string;
  expectedYieldKg: number;
  actualYieldKg?: number;
  daysUntilHarvest: number;
  isHarvested: boolean;
}

export type AnalyticsPeriod = 'week' | 'month' | 'season';

export interface AnalyticsData {
  totalYield: number;
  yieldChangePercent: number;
  waterEfficiency: number;
  farmScore: number;
  productionValues: number[];
  cropYields: { crop: string; yield: number; color: string }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export type IrrCode = 'done' | 'partial' | 'noNeed' | 'rain' | 'tankLow' | 'dailyLimit';

export interface IrrigationResult {
  code: IrrCode;
  liters: number;
}

export interface FieldState {
  name: string;
  areaHa: number;
  target: number;
  moisture: number;
}

