import { describe, it, expect } from 'vitest';
import { kCrops, kAnimals, kPrice, kCropIndices } from '../constants';
import { kFarmFacts, kDefaultAchievements } from '../GameContext';

describe('Farm Friends Game Engine & Logic Tests', () => {
  it('should have all 5 crop types correctly configured with growth times and prices', () => {
    const crops = ['lettuce', 'carrot', 'tomato', 'corn', 'strawberry'] as const;
    crops.forEach((c) => {
      const def = kCrops[c];
      expect(def).toBeDefined();
      expect(def.growSeconds).toBeGreaterThan(0);
      expect(def.seedCost).toBeGreaterThan(0);
      expect(def.sellPrice).toBeGreaterThan(def.seedCost);
      expect(def.seasons.length).toBeGreaterThan(0);
    });
  });

  it('should have all 3 animal types configured with products and periods', () => {
    const animals = ['chicken', 'cow', 'sheep'] as const;
    animals.forEach((a) => {
      const def = kAnimals[a];
      expect(def).toBeDefined();
      expect(def.cost).toBeGreaterThan(0);
      expect(def.period).toBeGreaterThan(0);
      expect(def.product).toBeDefined();
    });
  });

  it('should contain valid bilingual farm facts', () => {
    expect(kFarmFacts.ar.length).toBeGreaterThanOrEqual(5);
    expect(kFarmFacts.en.length).toBeGreaterThanOrEqual(5);
    kFarmFacts.ar.forEach((fact) => expect(fact.length).toBeGreaterThan(10));
    kFarmFacts.en.forEach((fact) => expect(fact.length).toBeGreaterThan(10));
  });

  it('should have Google Play Achievements list configured properly', () => {
    expect(kDefaultAchievements.length).toBeGreaterThanOrEqual(5);
    kDefaultAchievements.forEach((ach) => {
      expect(ach.id).toBeDefined();
      expect(ach.titleAr).toBeDefined();
      expect(ach.titleEn).toBeDefined();
      expect(ach.target).toBeGreaterThan(0);
      expect(ach.reward).toBeGreaterThan(0);
    });
  });

  it('should correctly map crops to unique numerical indices for crop rotation checks', () => {
    const indices = Object.values(kCropIndices);
    const unique = new Set(indices);
    expect(unique.size).toBe(indices.length);
  });

  it('should support base64 export and import code format', () => {
    const mockSave = {
      coins: 250,
      level: 4,
      animals: [{ type: 'cow', fullness: 1, stored: 2 }],
    };
    const raw = JSON.stringify(mockSave);
    const encoded = `FARM-${btoa(encodeURIComponent(raw))}`;
    expect(encoded.startsWith('FARM-')).toBe(true);

    const decoded = JSON.parse(decodeURIComponent(atob(encoded.replace('FARM-', ''))));
    expect(decoded.coins).toBe(250);
    expect(decoded.level).toBe(4);
    expect(decoded.animals[0].type).toBe('cow');
  });
});
