import { CropType, AnimalType, CropDef, AnimalDef } from './models';

export const kCrops: Record<CropType, CropDef> = {
  lettuce: { emoji: '🥬', seedCost: 4, growSeconds: 20, sellPrice: 14, unlockLevel: 1, seasons: [0, 2] },
  carrot: { emoji: '🥕', seedCost: 5, growSeconds: 25, sellPrice: 16, unlockLevel: 1, seasons: [2, 3] },
  tomato: { emoji: '🍅', seedCost: 6, growSeconds: 30, sellPrice: 20, unlockLevel: 1, seasons: [1] },
  corn: { emoji: '🌽', seedCost: 8, growSeconds: 45, sellPrice: 28, unlockLevel: 2, seasons: [1, 2] },
  strawberry: { emoji: '🍓', seedCost: 12, growSeconds: 55, sellPrice: 40, unlockLevel: 4, seasons: [0, 1] },
};

export const kAnimals: Record<AnimalType, AnimalDef> = {
  chicken: { emoji: '🐔', product: 'egg', cost: 50, period: 20, feedCost: 2, unlockLevel: 1 },
  cow: { emoji: '🐄', product: 'milk', cost: 160, period: 40, feedCost: 5, unlockLevel: 3 },
  sheep: { emoji: '🐑', product: 'wool', cost: 260, period: 55, feedCost: 7, unlockLevel: 5 },
};

export const kEmoji: Record<string, string> = {
  tomato: '🍅',
  lettuce: '🥬',
  corn: '🌽',
  carrot: '🥕',
  strawberry: '🍓',
  egg: '🥚',
  milk: '🥛',
  wool: '🧶',
};

export const kPrice: Record<string, number> = {
  tomato: 20,
  lettuce: 14,
  corn: 28,
  carrot: 16,
  strawberry: 40,
  egg: 10,
  milk: 24,
  wool: 36,
};

export const kSpoil: Record<string, number> = {
  tomato: 0.3,
  lettuce: 0.5,
  corn: 0.1,
  carrot: 0.1,
  strawberry: 0.5,
  egg: 0.2,
  milk: 0.4,
  wool: 0.0,
};

export const kCropIndices: Record<CropType, number> = {
  tomato: 0,
  lettuce: 1,
  corn: 2,
  carrot: 3,
  strawberry: 4,
};

export const kIndexToCrop: Record<number, CropType> = {
  0: 'tomato',
  1: 'lettuce',
  2: 'corn',
  3: 'carrot',
  4: 'strawberry',
};
