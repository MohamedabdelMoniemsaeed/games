import { CropType, AnimalType, CropDef, AnimalDef } from './models';

export const kCrops: Record<CropType, CropDef> = {
  lettuce: { emoji: '🥬', seedCost: 4, growSeconds: 20, sellPrice: 12, unlockLevel: 1 },
  carrot: { emoji: '🥕', seedCost: 5, growSeconds: 25, sellPrice: 14, unlockLevel: 1 },
  tomato: { emoji: '🍅', seedCost: 6, growSeconds: 30, sellPrice: 18, unlockLevel: 1 },
  corn: { emoji: '🌽', seedCost: 9, growSeconds: 45, sellPrice: 25, unlockLevel: 2 },
};

export const kAnimals: Record<AnimalType, AnimalDef> = {
  chicken: { emoji: '🐔', product: 'egg', cost: 50, period: 20, feedCost: 2, unlockLevel: 1 },
  cow: { emoji: '🐄', product: 'milk', cost: 160, period: 40, feedCost: 5, unlockLevel: 3 },
};

export const kEmoji: Record<string, string> = {
  tomato: '🍅',
  lettuce: '🥬',
  corn: '🌽',
  carrot: '🥕',
  egg: '🥚',
  milk: '🥛',
};

export const kPrice: Record<string, intNumber> = {
  tomato: 18,
  lettuce: 12,
  corn: 25,
  carrot: 14,
  egg: 8,
  milk: 20,
};

type intNumber = number;
