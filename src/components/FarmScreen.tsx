import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { FarmMap } from './FarmMap';
import { SmartWateringModal } from './SmartWateringModal';
import { FarmZone } from '../types';
import {
  Maximize2,
  Minimize2,
  Droplets,
  Beef,
  Home,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export const FarmScreen: React.FC = () => {
  const {
    t,
    formatNum,
    selectedZone,
    setSelectedZone,
    setScreen,
    herdSummary,
    weather,
  } = useFarm();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSmartWateringOpen, setIsSmartWateringOpen] = useState(false);

  const zones: { id: FarmZone; labelKey: string }[] = [
    { id: 'overview', labelKey: 'overview' },
    { id: 'farmHouse', labelKey: 'farmHouse' },
    { id: 'tomatoField', labelKey: 'tomatoField' },
    { id: 'vegetableField', labelKey: 'vegetableField' },
    { id: 'cornField', labelKey: 'cornField' },
    { id: 'animalArea', labelKey: 'animalArea' },
    { id: 'waterTank', labelKey: 'waterTank' },
  ];

  const renderZoneDetail = () => {
    switch (selectedZone) {
      case 'farmHouse':
        return (
          <div className="rounded-3xl border border-[#E8EBE5] bg-white p-5 shadow-sm transition-all animate-fade-in dark:border-[#354239] dark:bg-[#243128]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="rounded-2xl bg-[#8FC67D]/20 p-2.5 text-[#2F7D4E]">
                  <Home className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1E2A22] dark:text-white">{t('farmHouse')}</h3>
                  <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">{t('houseSubtitle')}</p>
                </div>
              </div>
              <span className="rounded-full bg-[#E8F3E9] px-2.5 py-1 text-xs font-semibold text-[#2F7D4E] dark:bg-[#2F7D4E]/20 dark:text-[#9FCB88]">
                {t('residential')}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-2xl bg-[#F6F4EA] p-3 dark:bg-[#1E2A22]">
                <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">{t('size')}</p>
                <p className="text-sm font-bold text-[#1E2A22] dark:text-white">{t('houseSize')}</p>
              </div>
              <div className="rounded-2xl bg-[#F6F4EA] p-3 dark:bg-[#1E2A22]">
                <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">{t('rooms')}</p>
                <p className="text-sm font-bold text-[#1E2A22] dark:text-white">{formatNum(5)}</p>
              </div>
            </div>
          </div>
        );

      case 'tomatoField':
        return (
          <div className="rounded-3xl border border-[#D6533E]/30 bg-white p-5 shadow-sm transition-all animate-fade-in dark:border-[#D6533E]/30 dark:bg-[#243128]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D6533E]">
                  {t('needsWater')}
                </span>
                <h3 className="text-lg font-bold text-[#1E2A22] dark:text-white">{t('tomatoField')}</h3>
                <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">{t('cropTomatoes')}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#D6533E]">{formatNum(54)}%</span>
                <p className="text-xs text-[#7B857E]">{t('growth')}</p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setIsSmartWateringOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2F7D4E] py-3 text-xs font-bold text-white transition hover:bg-[#25633E] active:scale-98"
              >
                <Droplets className="h-4 w-4" />
                {t('smartWatering')} →
              </button>
            </div>
          </div>
        );

      case 'vegetableField':
        return (
          <div className="rounded-3xl border border-[#E8EBE5] bg-white p-5 shadow-sm transition-all animate-fade-in dark:border-[#354239] dark:bg-[#243128]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#3D8D43]">
                  {t('good')}
                </span>
                <h3 className="text-lg font-bold text-[#1E2A22] dark:text-white">{t('vegetableField')}</h3>
                <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">{t('cropLettuce')}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#3D8D43]">{formatNum(88)}%</span>
                <p className="text-xs text-[#7B857E]">{t('growth')}</p>
              </div>
            </div>
          </div>
        );

      case 'cornField':
        return (
          <div className="rounded-3xl border border-[#E8EBE5] bg-white p-5 shadow-sm transition-all animate-fade-in dark:border-[#354239] dark:bg-[#243128]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#719A42]">
                  {t('healthy')}
                </span>
                <h3 className="text-lg font-bold text-[#1E2A22] dark:text-white">{t('cornField')}</h3>
                <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">{t('cropCorn')}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#719A42]">{formatNum(18)}%</span>
                <p className="text-xs text-[#7B857E]">{t('growth')}</p>
              </div>
            </div>
          </div>
        );

      case 'animalArea':
        return (
          <div className="rounded-3xl border border-[#E8EBE5] bg-white p-5 shadow-sm transition-all animate-fade-in dark:border-[#354239] dark:bg-[#243128]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2F7D4E]">
                  {t('allHealthy')}
                </span>
                <h3 className="text-lg font-bold text-[#1E2A22] dark:text-white">{t('animalArea')}</h3>
                <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">{t('animalsSubtitle')}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#2F7D4E]">{formatNum(herdSummary.total)}</span>
                <p className="text-xs text-[#7B857E]">{t('animalCount')}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-2xl bg-[#F6F4EA] p-2.5 dark:bg-[#1E2A22]">
                <p className="text-[#7B857E]">{t('animals')}</p>
                <p className="font-bold text-[#1E2A22] dark:text-white">{formatNum(herdSummary.total)}</p>
              </div>
              <div className="rounded-2xl bg-[#F6F4EA] p-2.5 dark:bg-[#1E2A22]">
                <p className="text-[#7B857E]">{t('health')}</p>
                <p className="font-bold text-[#2F7D4E]">{formatNum(herdSummary.healthPercent)}%</p>
              </div>
              <div className="rounded-2xl bg-[#F6F4EA] p-2.5 dark:bg-[#1E2A22]">
                <p className="text-[#7B857E]">{t('nextFeed')}</p>
                <p className="font-bold text-[#1E2A22] dark:text-white">12:00</p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setScreen('livestock')}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2F7D4E] py-3 text-xs font-bold text-white transition hover:bg-[#25633E] active:scale-98"
              >
                <Beef className="h-4 w-4" />
                {t('openLivestock')}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        );

      case 'waterTank':
        return (
          <div className="rounded-3xl border border-[#E8EBE5] bg-white p-5 shadow-sm transition-all animate-fade-in dark:border-[#354239] dark:bg-[#243128]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#4A91C5]">
                  {t('waterSubtitle')}
                </span>
                <h3 className="text-lg font-bold text-[#1E2A22] dark:text-white">{t('waterTank')}</h3>
                <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">
                  {t('storedLitersValue', { value: formatNum(weather.waterStoredLiters) })}
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#4A91C5]">{formatNum(weather.waterTankPercent)}%</span>
                <p className="text-xs text-[#7B857E]">{t('level')}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-2xl bg-[#EAF5F7] p-3 dark:bg-[#1E2A22]">
                <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">{t('stored')}</p>
                <p className="text-sm font-bold text-[#1E2A22] dark:text-white">{formatNum(weather.waterStoredLiters)} L</p>
              </div>
              <div className="rounded-2xl bg-[#EAF5F7] p-3 dark:bg-[#1E2A22]">
                <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">{t('usedToday')}</p>
                <p className="text-sm font-bold text-[#1E2A22] dark:text-white">{formatNum(1240)} L</p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setIsSmartWateringOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2F7D4E] py-3 text-xs font-bold text-white transition hover:bg-[#25633E] active:scale-98"
              >
                <Droplets className="h-4 w-4" />
                {t('smartWatering')} →
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="rounded-3xl border border-[#E8EBE5] bg-[#E7F1DF] p-5 text-center transition-all animate-fade-in dark:border-[#354239] dark:bg-[#243128]">
            <p className="text-xs font-bold text-[#2F7D4E] dark:text-[#9FCB88]">
              {t('tapExplore')}
            </p>
            <p className="text-[11px] text-[#7B857E] mt-1 dark:text-[#A8B3AA]">
              {t('farmSummaryValues', {
                zones: formatNum(7),
                crops: formatNum(4),
                animals: formatNum(herdSummary.total),
              })}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4 pb-14">
      {/* Top Header & Overview Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white p-4 shadow-sm dark:bg-[#243128] dark:border dark:border-[#354239]">
        <div>
          <h1 className="text-lg font-black text-[#1E2A22] dark:text-white">{t('myFarm')}</h1>
          <p className="text-xs font-medium text-[#7B857E] dark:text-[#A8B3AA]">
            {t('farmLocation')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#E8F3E9] px-3 py-1 text-xs font-bold text-[#2F7D4E] dark:bg-[#2F7D4E]/20 dark:text-[#9FCB88]">
            {t('farmSummary')}
          </span>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={t('fullscreenMap')}
            className="rounded-xl border border-[#E8EBE5] p-2 text-[#7B857E] hover:bg-[#F6F4EA] dark:border-[#354239] dark:hover:bg-[#1E2A22]"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Zone Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {zones.map((z) => (
          <button
            key={z.id}
            onClick={() => setSelectedZone(z.id)}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              selectedZone === z.id
                ? 'bg-[#2F7D4E] text-white shadow-sm'
                : 'bg-white text-[#7B857E] border border-[#E8EBE5] hover:bg-gray-50 dark:bg-[#243128] dark:border-[#354239] dark:text-[#A8B3AA]'
            }`}
          >
            {t(z.labelKey)}
          </button>
        ))}
      </div>

      {/* Top-Down Farm Map with Animated Zoom */}
      <div className={isFullscreen ? 'fixed inset-0 z-50 bg-black/85 p-4 flex flex-col justify-center' : ''}>
        {isFullscreen && (
          <div className="mb-2 flex justify-end">
            <button
              onClick={() => setIsFullscreen(false)}
              className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-[#1E2A22]"
            >
              {t('close')}
            </button>
          </div>
        )}
        <FarmMap />
      </div>

      {/* Zone Detail Card */}
      <div>{renderZoneDetail()}</div>

      {/* Smart Watering Modal */}
      <SmartWateringModal
        isOpen={isSmartWateringOpen}
        onClose={() => setIsSmartWateringOpen(false)}
      />
    </div>
  );
};
