import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { HarvestCrop } from '../types';
import { PackageCheck, Clock, CheckCircle2, Sprout, Plus, X } from 'lucide-react';

export const HarvestScreen: React.FC = () => {
  const { t, formatNum, harvests, markHarvested, addHarvestPlan } = useFarm();
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false);

  // New Harvest Plan Form state
  const [crop, setCrop] = useState<HarvestCrop>('tomatoes');
  const [fieldName, setFieldName] = useState('South Field');
  const [expectedYield, setExpectedYield] = useState(400);
  const [daysLeft, setDaysLeft] = useState(14);

  const totalExpectedKg = harvests.reduce((acc, curr) => acc + curr.expectedYieldKg, 0);

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    addHarvestPlan({
      crop,
      cropKey: crop,
      cropName: crop.charAt(0).toUpperCase() + crop.slice(1),
      fieldNameKey: 'tomatoField',
      fieldName,
      expectedDate: new Date(Date.now() + daysLeft * 86400000).toISOString().split('T')[0],
      expectedYieldKg: Number(expectedYield),
      daysUntilHarvest: Number(daysLeft),
    });
    setIsAddPlanOpen(false);
  };

  return (
    <div className="space-y-5 pb-14">
      {/* Header & Add Plan Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-[#1E2A22] dark:text-white">
            {t('harvestTitle')}
          </h1>
          <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">
            {t('harvestSubtitle')}
          </p>
        </div>
        <button
          onClick={() => setIsAddPlanOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#2F7D4E] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#25633E] active:scale-95"
        >
          <Plus className="h-4 w-4" />
          {t('addHarvestPlan')}
        </button>
      </div>

      {/* Overview Stat Card */}
      <div className="rounded-3xl border border-[#E8EBE5] bg-gradient-to-r from-[#D2A643] to-[#E2CB91] p-6 text-white shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-white/80">
              {t('expectedHarvest')}
            </span>
            <p className="mt-1 text-3xl font-black">
              {formatNum(totalExpectedKg)}{' '}
              <span className="text-lg font-bold">{t('yieldUnit')}</span>
            </p>
          </div>
          <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-xs">
            <PackageCheck className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>

      {/* Harvest Schedule Timeline */}
      <div className="rounded-3xl border border-[#E8EBE5] bg-white p-5 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
        <h2 className="mb-4 text-sm font-bold text-[#1E2A22] dark:text-white">
          {t('harvestSchedule')}
        </h2>

        <div className="space-y-3">
          {harvests.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col gap-3 rounded-2xl border p-4 transition sm:flex-row sm:items-center sm:justify-between ${
                item.isHarvested
                  ? 'border-[#2F7D4E]/30 bg-[#E8F3E9]/40 dark:border-[#2F7D4E]/20 dark:bg-[#1E2A22]'
                  : 'border-[#E8EBE5] bg-white hover:border-[#D2A643] dark:border-[#354239] dark:bg-[#243128]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                    item.isHarvested
                      ? 'bg-[#2F7D4E] text-white'
                      : 'bg-[#FFF7DD] text-[#D2A643] dark:bg-[#D2A643]/20'
                  }`}
                >
                  <Sprout className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1E2A22] dark:text-white">
                    {item.cropName || (item.cropKey ? t(item.cropKey) : item.crop)}
                  </h3>
                  <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">
                    {item.fieldName || (item.fieldNameKey ? t(item.fieldNameKey) : 'Field')} ·{' '}
                    {formatNum(item.expectedYieldKg)} kg
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <span className="flex items-center gap-1 text-xs font-semibold text-[#7B857E]">
                  <Clock className="h-3.5 w-3.5" />
                  {item.isHarvested
                    ? t('harvested')
                    : t('daysToHarvest', { count: formatNum(item.daysUntilHarvest) })}
                </span>

                {item.isHarvested ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#2F7D4E]/10 px-3 py-1.5 text-xs font-bold text-[#2F7D4E] dark:bg-[#2F7D4E]/20 dark:text-[#9FCB88]">
                    <CheckCircle2 className="h-4 w-4" />
                    {t('harvested')}
                  </span>
                ) : (
                  <button
                    onClick={() => markHarvested(item.id)}
                    className="rounded-xl bg-[#2F7D4E] px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-[#25633E] active:scale-95"
                  >
                    {t('markHarvested')}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Harvest Plan Modal */}
      {isAddPlanOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#243128] dark:border dark:border-[#354239]">
            <h3 className="text-lg font-bold text-[#1E2A22] dark:text-white">
              {t('addHarvestPlan')}
            </h3>
            <form onSubmit={handleCreatePlan} className="mt-4 space-y-3.5">
              <div>
                <label className="text-xs font-bold text-[#1E2A22] dark:text-white">
                  {t('cropType')}
                </label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value as HarvestCrop)}
                  className="mt-1 w-full rounded-xl border border-[#E8EBE5] bg-[#F6F4EA] px-3 py-2 text-xs text-[#1E2A22] dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
                >
                  <option value="tomatoes">{t('tomatoes')}</option>
                  <option value="lettuce">{t('lettuce')}</option>
                  <option value="corn">{t('corn')}</option>
                  <option value="wheat">Wheat</option>
                  <option value="carrots">Carrots</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1E2A22] dark:text-white">
                  {t('fieldName')}
                </label>
                <input
                  type="text"
                  required
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E8EBE5] bg-[#F6F4EA] px-3.5 py-2 text-xs text-[#1E2A22] dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#1E2A22] dark:text-white">
                    {t('avgYield')} (kg)
                  </label>
                  <input
                    type="number"
                    value={expectedYield}
                    onChange={(e) => setExpectedYield(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-[#E8EBE5] bg-[#F6F4EA] px-3 py-2 text-xs text-[#1E2A22] dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1E2A22] dark:text-white">
                    Days left
                  </label>
                  <input
                    type="number"
                    value={daysLeft}
                    onChange={(e) => setDaysLeft(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-[#E8EBE5] bg-[#F6F4EA] px-3 py-2 text-xs text-[#1E2A22] dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPlanOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-[#7B857E]"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#2F7D4E] px-4 py-2 text-xs font-bold text-white hover:bg-[#25633E]"
                >
                  {t('addHarvestPlan')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
