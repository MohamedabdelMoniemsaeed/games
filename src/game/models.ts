export type CropType = 'lettuce' | 'carrot' | 'tomato' | 'corn';
export type AnimalType = 'chicken' | 'cow';
export type WeatherType = 'sunny' | 'cloudy' | 'rain';
export type UpgradeType = 'tank' | 'plot' | 'sprinkler' | 'pen';

export interface CropDef {
  emoji: string;
  seedCost: number;
  growSeconds: number;
  sellPrice: number;
  unlockLevel: number;
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
}

export interface Animal {
  type: AnimalType;
  fullness: number; // 0..1, drops over time
  progress: number; // 0..1 toward next product
  stored: number; // max 3
}

export interface Order {
  item: string;
  qty: number;
  reward: number;
}

export interface UpgradeInfo {
  icon: string;
  nameKey: string;
  descKey: string;
}
