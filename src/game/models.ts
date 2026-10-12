export type CropType = 'lettuce' | 'carrot' | 'tomato' | 'corn' | 'strawberry';
export type AnimalType = 'chicken' | 'cow' | 'sheep';
export type WeatherType = 'sunny' | 'cloudy' | 'rain';
export type UpgradeType = 'tank' | 'plot' | 'sprinkler' | 'pen' | 'barn' | 'silo';
export type GameEvent = 'none' | 'pests' | 'frost' | 'boom';

export interface CropDef {
  emoji: string;
  seedCost: number;
  growSeconds: number;
  sellPrice: number;
  unlockLevel: number;
  seasons: number[]; // 0 spring, 1 summer, 2 autumn, 3 winter
}

export interface AnimalDef {
  emoji: string;
  product: string;
  cost: number;
  period: number;
  feedCost: number;
  unlockLevel: number;
}

export interface Plot {
  crop: CropType | null;
  progress: number; // 0..1
  water: number; // 0..1
  fertility: number; // 0..1
  lastCrop?: number | null; // previous crop index for rotation
}

export interface Animal {
  type: AnimalType;
  fullness: number; // 0..1
  progress: number; // 0..1 toward product
  stored: number; // 0..3
  growth: number; // 0..1 (0 young, 1 adult)
  health: number; // 0..1
}

export interface Order {
  item: string;
  qty: number;
  reward: number;
  due: number; // day count due
}

export interface Quest {
  type: 'harvest' | 'sell' | 'water' | 'deliver';
  target: number;
  reward: number;
  progress: number;
  claimed: boolean;
}
