import React from 'react';
import { useFarm } from '../context/FarmContext';
import { AnalyticsPeriod } from '../types';
import { BarChart3, TrendingUp, Droplets, Award, PieChart } from 'lucide-react';

export const AnalyticsScreen: React.FC = () => {
  const { t, formatNum, analyticsPeriod, setAnalyticsPeriod, analyticsData } = useFarm();

  const periods: { id: AnalyticsPeriod; labelKey: string }[] = [
    { id: 'week', labelKey: 'analyticsPeriodWeek' },
    { id: 'month', labelKey: 'analyticsPeriodMonth' },
    { id: 'season', labelKey: 'analyticsPeriodSeason' },
  ];

  return (
    <div className="space-y-5 pb-14">
      {/* Header & Period Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-[#1E2A22] dark:text-white">
            {t('farmAnalytics')}
          </h1>
          <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">
            {t('analyticsSubtitle')}
          </p>
        </div>

        {/* Period selector pill */}
        <div className="flex rounded-full bg-[#E8EBE5] p-1 dark:bg-[#354239]">
          {periods.map((p) => (
            <button
              key={p.id}
              onClick={() => setAnalyticsPeriod(p.id)}
              className={`rounded-full px-3.5 py-1 text-xs font-bold transition ${
                analyticsPeriod === p.id
                  ? 'bg-white text-[#1E2A22] shadow-xs dark:bg-[#243128] dark:text-white'
                  : 'text-[#7B857E] hover:text-[#1E2A22] dark:text-[#A8B3AA]'
              }`}
            >
              {t(p.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* Total Yield */}
        <div className="rounded-2xl border border-[#E8EBE5] bg-white p-4 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
          <span className="text-xs font-bold text-[#7B857E] dark:text-[#A8B3AA]">
            {t('avgYield')}
          </span>
          <p className="mt-2 text-2xl font-black text-[#1E2A22] dark:text-white">
            {formatNum(analyticsData.totalYield)}{' '}
            <span className="text-xs font-normal">kg</span>
          </p>
          <span className="inline-flex items-center text-xs font-bold text-[#2F7D4E]">
            <TrendingUp className="h-3 w-3 mr-1" />+{formatNum(analyticsData.yieldChangePercent)}%
          </span>
        </div>

        {/* Water Efficiency */}
        <div className="rounded-2xl border border-[#E8EBE5] bg-white p-4 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
          <span className="text-xs font-bold text-[#7B857E] dark:text-[#A8B3AA]">
            {t('waterEfficiency')}
          </span>
          <p className="mt-2 text-2xl font-black text-[#4A91C5]">
            {formatNum(analyticsData.waterEfficiency)}%
          </p>
          <span className="text-xs font-medium text-[#7B857E]">{t('onTarget')}</span>
        </div>

        {/* Farm Score */}
        <div className="rounded-2xl border border-[#E8EBE5] bg-white p-4 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
          <span className="text-xs font-bold text-[#7B857E] dark:text-[#A8B3AA]">
            {t('farmScore')}
          </span>
          <p className="mt-2 text-2xl font-black text-[#2F7D4E] dark:text-[#9FCB88]">
            {formatNum(analyticsData.farmScore)} <span className="text-xs font-normal">/100</span>
          </p>
          <span className="text-xs font-medium text-[#2F7D4E]">{t('excellentStatus')}</span>
        </div>

        {/* Stock / Health */}
        <div className="rounded-2xl border border-[#E8EBE5] bg-white p-4 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
          <span className="text-xs font-bold text-[#7B857E] dark:text-[#A8B3AA]">
            {t('health')}
          </span>
          <p className="mt-2 text-2xl font-black text-[#D78A32]">
            {formatNum(93)}%
          </p>
          <span className="text-xs font-medium text-[#7B857E]">{t('twelveDaysStock')}</span>
        </div>
      </div>

      {/* Production Overview Bar Chart */}
      <div className="rounded-3xl border border-[#E8EBE5] bg-white p-5 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#1E2A22] dark:text-white">
            {t('productionOverview')}
          </h2>
          <BarChart3 className="h-4 w-4 text-[#7B857E]" />
        </div>

        {/* Chart Bars */}
        <div className="mt-6 flex items-end gap-3 h-44 pt-4 border-b border-[#E8EBE5] pb-2 dark:border-[#354239]">
          {analyticsData.productionValues.map((val, idx) => {
            const maxVal = Math.max(...analyticsData.productionValues);
            const heightPct = Math.max(15, (val / maxVal) * 100);
            const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-[#2F7D4E] hover:bg-[#3D8D43] transition-all duration-300"
                  style={{ height: `${heightPct}%` }}
                  title={`${val} kg`}
                ></div>
                <span className="text-[10px] font-semibold text-[#7B857E]">{dayLabels[idx]}</span>
              </div>
            );
          })}
        </div>
        <p className="mt-2 text-right text-[11px] text-[#7B857E]">
          {t('analyticsYield')} ({t('yieldUnit')})
        </p>
      </div>

      {/* Crop Comparison */}
      <div className="rounded-3xl border border-[#E8EBE5] bg-white p-5 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
        <h2 className="mb-4 text-sm font-bold text-[#1E2A22] dark:text-white">
          {t('cropComparison')}
        </h2>

        <div className="space-y-4">
          {analyticsData.cropYields.map((crop) => (
            <div key={crop.crop}>
              <div className="flex justify-between text-xs font-semibold text-[#1E2A22] dark:text-white">
                <span>{crop.crop}</span>
                <span>{formatNum(crop.yield)} kg</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#E8EBE5] dark:bg-[#354239]">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: crop.color,
                    width: `${(crop.yield / (analyticsData.totalYield || 1)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
