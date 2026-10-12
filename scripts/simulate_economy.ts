// Headless 20-day economic simulation of a sensible player
import { kCrops, kAnimals, kPrice } from '../src/game/constants';

interface DayReport {
  day: number;
  season: string;
  income: number;
  expenses: number;
  profit: number;
  profitMargin: string;
  coins: number;
  waterRemaining: number;
  cropsHarvested: number;
}

export function runSimulation(): DayReport[] {
  let coins = 30; // starting coins
  let tank = 200;
  const capacity = 200;
  const plotCount = 6;
  let chickens = 0;

  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
  const reports: DayReport[] = [];

  for (let day = 1; day <= 20; day++) {
    const seasonIndex = Math.floor((day - 1) / 6) % 4;
    const seasonName = seasons[seasonIndex];

    let dayIncome = 0;
    let dayExpenses = 0;
    let cropsHarvested = 0;

    // Daily upkeep: 2 per plot + 4 per animal
    const upkeep = plotCount * 2 + chickens * 4;
    dayExpenses += upkeep;
    coins -= upkeep;

    // Windmill pumps passive water: average 0.65 L/s * 48s = ~31.2 L per day
    // Rain occurs ~25% of days adding ~40 L
    const isRainDay = day % 4 === 0;
    const pumpedWater = 31 + (isRainDay ? 40 : 0);
    tank = Math.min(capacity, tank + pumpedWater);

    // Sensible crop selection for each season
    const chosenCrop = seasonIndex === 0 ? 'lettuce' :
                       seasonIndex === 1 ? 'tomato' :
                       seasonIndex === 2 ? 'carrot' : 'carrot';

    const def = kCrops[chosenCrop];
    const seedCost = def.seedCost;
    const basePrice = kPrice[chosenCrop] || def.sellPrice;
    const unitPrice = Math.round(basePrice * 0.85);

    // Sensible farming: plant as many plots as affordable and waterable
    for (let p = 0; p < plotCount; p++) {
      if (coins >= seedCost && tank >= 40) { // Keep 20L animal reserve
        coins -= seedCost;
        dayExpenses += seedCost;
        if (!isRainDay) {
          tank -= 20; // 20L per watering
        }

        // Harvest (with ~20% double-harvest chance from fertility)
        const yieldQty = Math.random() < 0.2 ? 2 : 1;
        const revenue = yieldQty * unitPrice;
        coins += revenue;
        dayIncome += revenue;
        cropsHarvested += yieldQty;
      }
    }

    // Buy a chicken when coins >= 90
    if (day === 4 && coins >= 90 && chickens === 0) {
      const chickenCost = 50;
      const feedCost = 12; // 10 units sack
      coins -= (chickenCost + feedCost);
      dayExpenses += (chickenCost + feedCost);
      chickens = 1;
    }

    if (chickens > 0) {
      // Produces eggs: 2 eggs per day sold at market (each 8 coins)
      const eggRev = 2 * Math.round((kPrice.egg || 10) * 0.85);
      coins += eggRev;
      dayIncome += eggRev;
    }

    const profit = dayIncome - dayExpenses;
    const margin = dayExpenses > 0 ? ((profit / dayExpenses) * 100).toFixed(1) + '%' : '100%';

    reports.push({
      day,
      season: seasonName,
      income: dayIncome,
      expenses: dayExpenses,
      profit,
      profitMargin: margin,
      coins,
      waterRemaining: Math.round(tank),
      cropsHarvested,
    });
  }

  return reports;
}

const results = runSimulation();
console.table(results);
