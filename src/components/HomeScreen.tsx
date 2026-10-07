import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { SmartWateringModal } from './SmartWateringModal';
import { FarmAssistantModal } from './FarmAssistantModal';
import { FarmField } from '../types';
import {
  Sprout,
  Beef,
  Droplets,
  PackageCheck,
  Sun,
  CheckCircle2,
  Circle,
  Plus,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Wallet,
  Boxes,
  Trash2,
  Sparkles,
  Heart,
  Calendar,
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    t,
    formatNum,
    tasks,
    toggleTask,
    addTask,
    deleteTask,
    fields,
    addField,
    weather,
    setScreen,
    herdSummary,
    harvests,
  } = useFarm();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [customTaskTitle, setCustomTaskTitle] = useState('');
  const [isSmartWateringOpen, setIsSmartWateringOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isAddFieldOpen, setIsAddFieldOpen] = useState(false);

  // New field form state
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldCrop, setNewFieldCrop] = useState('');
  const [newFieldArea, setNewFieldArea] = useState(2.0);

  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const totalTasks = tasks.length;
  const totalHarvestKg = harvests.reduce((acc, curr) => acc + curr.expectedYieldKg, 0);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTaskTitle.trim()) {
      addTask(customTaskTitle.trim());
      setCustomTaskTitle('');
      setIsTaskModalOpen(false);
    }
  };

  const handleCreateField = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFieldName.trim() && newFieldCrop.trim()) {
      addField({
        name: newFieldName.trim(),
        type: 'custom',
        cropName: newFieldCrop.trim(),
        growthPercent: 20,
        isHealthy: true,
        areaHectares: newFieldArea,
        plantingDate: new Date().toISOString().split('T')[0],
      });
      setNewFieldName('');
      setNewFieldCrop('');
      setIsAddFieldOpen(false);
    }
  };

  const getTaskTitle = (task: typeof tasks[0]) => {
    if (task.customTitle) return task.customTitle;
    switch (task.type) {
      case 'waterTomatoes':
        return t('waterTomatoField');
      case 'checkCorn':
        return t('checkCornGrowth');
      case 'feedLivestock':
        return t('feedLivestock');
      case 'prepareHarvest':
        return t('prepareHarvest');
      default:
        return task.id;
    }
  };

  return (
    <div className="space-y-6 pb-14">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2F7D4E] to-[#3D8D43] p-6 text-white shadow-md">
        <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-xs">
                <span className="h-2 w-2 rounded-full bg-[#9FCB88] animate-pulse"></span>
                {t('healthyAllAligned')}
              </span>
              <button
                onClick={() => setIsAssistantOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/25 px-3 py-1 text-xs font-extrabold text-white backdrop-blur-xs hover:bg-white/35 transition"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#FFD36B]" />
                {t('farmAssistant')}
              </button>
            </div>
            <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
              {t('welcome')}
            </h1>
            <p className="mt-1 text-xs text-white/90">
              {t('welcomeSubtitle')}
            </p>
          </div>

          {/* Farm Health Ring Indicator */}
          <div className="flex items-center gap-3 rounded-2xl bg-black/15 p-3.5 backdrop-blur-xs sm:self-center">
            <div className="relative flex h-14 w-14 items-center justify-center">
              <svg className="h-14 w-14 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#9FCB88]"
                  strokeDasharray="92, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-white">92%</span>
            </div>
            <div>
              <p className="text-[11px] font-bold text-white/80">{t('farmHealth')}</p>
              <p className="text-xs font-black text-white">{t('excellentStatus')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid (2x2) */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#1E2A22] dark:text-[#E8F3E9]">
            {t('farmStats')}
          </h2>
          <span className="text-xs font-medium text-[#7B857E] dark:text-[#A8B3AA]">
            {t('sampleUpdated')}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {/* Crops */}
          <div className="rounded-2xl border border-[#E8EBE5] bg-white p-4 shadow-sm transition hover:shadow-md dark:border-[#354239] dark:bg-[#243128]">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-[#E8F3E9] p-2 text-[#2F7D4E] dark:bg-[#2F7D4E]/20">
                <Sprout className="h-5 w-5" />
              </div>
              <span className="inline-flex items-center text-xs font-bold text-[#2F7D4E] dark:text-[#9FCB88]">
                <ArrowUpRight className="h-3 w-3" /> +{formatNum(8)}%
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-black text-[#1E2A22] dark:text-white">
                {formatNum(fields.length)}
              </p>
              <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">{t('crops')}</p>
            </div>
          </div>

          {/* Animals */}
          <div
            onClick={() => setScreen('livestock')}
            className="cursor-pointer rounded-2xl border border-[#E8EBE5] bg-white p-4 shadow-sm transition hover:shadow-md dark:border-[#354239] dark:bg-[#243128]"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-[#FFF2DF] p-2 text-[#D78A32] dark:bg-[#D78A32]/20">
                <Beef className="h-5 w-5" />
              </div>
              <span className="inline-flex items-center text-xs font-bold text-[#2F7D4E] dark:text-[#9FCB88]">
                <ArrowUpRight className="h-3 w-3" /> +{formatNum(4)}%
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-black text-[#1E2A22] dark:text-white">
                {formatNum(herdSummary.total)}
              </p>
              <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">{t('totalHerd')}</p>
            </div>
          </div>

          {/* Soil Moisture */}
          <div className="rounded-2xl border border-[#E8EBE5] bg-white p-4 shadow-sm transition hover:shadow-md dark:border-[#354239] dark:bg-[#243128]">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-[#EAF5F7] p-2 text-[#4A91C5] dark:bg-[#4A91C5]/20">
                <Droplets className="h-5 w-5" />
              </div>
              <span className="inline-flex items-center text-xs font-bold text-[#2F7D4E] dark:text-[#9FCB88]">
                <ArrowUpRight className="h-3 w-3" /> +{formatNum(3)}%
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-black text-[#1E2A22] dark:text-white">
                {formatNum(weather.soilMoisture)}%
              </p>
              <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">{t('soilMoisture')}</p>
            </div>
          </div>

          {/* Harvest */}
          <div
            onClick={() => setScreen('harvest')}
            className="cursor-pointer rounded-2xl border border-[#E8EBE5] bg-white p-4 shadow-sm transition hover:shadow-md dark:border-[#354239] dark:bg-[#243128]"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-[#FFF7DD] p-2 text-[#D2A643] dark:bg-[#D2A643]/20">
                <PackageCheck className="h-5 w-5" />
              </div>
              <span className="inline-flex items-center text-xs font-bold text-[#2F7D4E] dark:text-[#9FCB88]">
                <ArrowUpRight className="h-3 w-3" /> +{formatNum(12)}%
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-black text-[#1E2A22] dark:text-white">
                {formatNum(totalHarvestKg)} <span className="text-xs font-normal">kg</span>
              </p>
              <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">{t('harvest')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Tiles */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {/* Smart Watering Tile */}
        <div
          onClick={() => setIsSmartWateringOpen(true)}
          className="group cursor-pointer rounded-2xl border border-[#E8EBE5] bg-gradient-to-br from-white to-[#EAF5F7] p-4 shadow-sm transition hover:border-[#4A91C5] hover:shadow-md dark:border-[#354239] dark:from-[#243128] dark:to-[#17221A]"
        >
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-[#4A91C5]/10 p-2 text-[#4A91C5]">
              <Droplets className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-[#D6533E]/10 px-2 py-0.5 text-[10px] font-bold text-[#D6533E]">
              {t('tomatoNeedsWater')}
            </span>
          </div>
          <h3 className="mt-3 font-bold text-[#1E2A22] dark:text-white">
            {t('smartWatering')}
          </h3>
          <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">
            {t('smartWaterSubtitle')}
          </p>
        </div>

        {/* Feed Livestock Tile */}
        <div
          onClick={() => setScreen('livestock')}
          className="group cursor-pointer rounded-2xl border border-[#E8EBE5] bg-gradient-to-br from-white to-[#FFF2DF] p-4 shadow-sm transition hover:border-[#D78A32] hover:shadow-md dark:border-[#354239] dark:from-[#243128] dark:to-[#17221A]"
        >
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-[#D78A32]/10 p-2 text-[#D78A32]">
              <Beef className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-[#2F7D4E]/10 px-2 py-0.5 text-[10px] font-bold text-[#2F7D4E]">
              {t('allHealthy')}
            </span>
          </div>
          <h3 className="mt-3 font-bold text-[#1E2A22] dark:text-white">
            {t('feedLivestock')}
          </h3>
          <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">
            {t('nextFeedToday')}
          </p>
        </div>

        {/* AI Farm Assistant Tile */}
        <div
          onClick={() => setIsAssistantOpen(true)}
          className="group cursor-pointer rounded-2xl border border-[#E8EBE5] bg-gradient-to-br from-white to-[#E8F3E9] p-4 shadow-sm transition hover:border-[#2F7D4E] hover:shadow-md dark:border-[#354239] dark:from-[#243128] dark:to-[#17221A]"
        >
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-[#2F7D4E]/10 p-2 text-[#2F7D4E]">
              <Sparkles className="h-5 w-5 text-[#2F7D4E]" />
            </div>
            <span className="rounded-full bg-[#2F7D4E]/10 px-2 py-0.5 text-[10px] font-bold text-[#2F7D4E]">
              Gemini AI
            </span>
          </div>
          <h3 className="mt-3 font-bold text-[#1E2A22] dark:text-white">
            {t('farmAssistant')}
          </h3>
          <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">
            {t('askFarmAssistant')}
          </p>
        </div>
      </section>

      {/* Today's Tasks */}
      <section className="rounded-3xl border border-[#E8EBE5] bg-white p-5 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#1E2A22] dark:text-white">
              {t('todaysTasks')}
            </h2>
            <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">
              {t('completedTasks', {
                done: formatNum(completedCount),
                total: formatNum(totalTasks),
              })}
            </p>
          </div>
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#2F7D4E] px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-[#25633E] active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
            {t('addTask')}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#EAF0E9] dark:bg-[#1E2A22]">
          <div
            className="h-full rounded-full bg-[#2F7D4E] transition-all duration-300"
            style={{ width: `${totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0}%` }}
          ></div>
        </div>

        {/* Tasks List */}
        <div className="mt-4 divide-y divide-[#E8EBE5] dark:divide-[#354239]">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between py-3 transition hover:bg-[#F2F4F0] px-2 rounded-xl dark:hover:bg-[#1E2A22]/50 group"
            >
              <div
                onClick={() => toggleTask(task.id)}
                className="flex flex-1 cursor-pointer items-center gap-3"
              >
                {task.isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-[#2F7D4E] shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-[#7B857E] shrink-0" />
                )}
                <span
                  className={`text-sm font-medium ${
                    task.isCompleted
                      ? 'text-[#7B857E] line-through dark:text-[#7B857E]'
                      : 'text-[#1E2A22] dark:text-white'
                  }`}
                >
                  {getTaskTitle(task)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#7B857E]">
                  {task.isCompleted ? t('done') : t('upcoming')}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  title={t('deleteTask')}
                  className="opacity-0 group-hover:opacity-100 p-1 text-[#7B857E] hover:text-[#D6533E] transition"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* My Fields Section (with Add Field action) */}
      <section className="rounded-3xl border border-[#E8EBE5] bg-white p-5 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#1E2A22] dark:text-white">
              {t('myFields')}
            </h2>
            <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">
              {t('farmSummaryValues', {
                zones: formatNum(7),
                crops: formatNum(fields.length),
                animals: formatNum(herdSummary.total),
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddFieldOpen(true)}
              className="inline-flex items-center gap-1 rounded-full bg-[#E8F3E9] px-2.5 py-1 text-xs font-bold text-[#2F7D4E] hover:bg-[#d8ebd9] dark:bg-[#2F7D4E]/20 dark:text-[#9FCB88]"
            >
              <Plus className="h-3 w-3" />
              {t('addField')}
            </button>
            <button
              onClick={() => setScreen('farm')}
              className="text-xs font-bold text-[#2F7D4E] hover:underline dark:text-[#9FCB88]"
            >
              {t('viewMap')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {fields.map((field) => (
            <div
              key={field.id}
              onClick={() => setScreen('farm')}
              className="cursor-pointer rounded-2xl border border-[#E8EBE5] bg-[#F6F4EA] p-4 transition hover:border-[#2F7D4E] dark:border-[#354239] dark:bg-[#1E2A22]"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1E2A22] dark:text-white">{field.name}</span>
                {!field.isHealthy && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#D6533E]/10 px-2 py-0.5 text-[10px] font-bold text-[#D6533E]">
                    <AlertCircle className="h-3 w-3" />
                    {t('needsWater')}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#7B857E] mt-0.5">{field.cropName}</p>

              <div className="mt-3">
                <div className="flex justify-between text-xs font-medium text-[#7B857E] dark:text-[#A8B3AA]">
                  <span>{t('growth')}</span>
                  <span className="font-bold text-[#1E2A22] dark:text-white">
                    {formatNum(field.growthPercent)}%
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-[#E8EBE5] dark:bg-[#354239]">
                  <div
                    className={`h-full rounded-full ${
                      field.isHealthy ? 'bg-[#2F7D4E]' : 'bg-[#D6533E]'
                    }`}
                    style={{ width: `${field.growthPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Finance & Inventory Highlights */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-[#E8EBE5] bg-white p-4 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
          <div className="rounded-2xl bg-[#4A91C5]/10 p-3 text-[#4A91C5]">
            <Wallet className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-[#1E2A22] dark:text-white">
                ${formatNum('12,480')}
              </span>
              <span className="flex items-center text-xs font-bold text-[#2F7D4E]">
                <TrendingUp className="h-3 w-3" /> +{formatNum(8)}%
              </span>
            </div>
            <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">
              {t('revenue')} ({t('finance')})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-[#E8EBE5] bg-white p-4 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
          <div className="rounded-2xl bg-[#D78A32]/10 p-3 text-[#D78A32]">
            <Boxes className="h-6 w-6" />
          </div>
          <div>
            <span className="text-lg font-black text-[#1E2A22] dark:text-white">
              {formatNum(3)}
            </span>
            <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">
              {t('suppliesRunningLow', { count: formatNum(3) })}
            </p>
          </div>
        </div>
      </section>

      {/* Add Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#243128] dark:border dark:border-[#354239]">
            <h3 className="text-lg font-bold text-[#1E2A22] dark:text-white">
              {t('addTask')}
            </h3>
            <p className="mt-1 text-xs text-[#7B857E] dark:text-[#A8B3AA]">
              {t('planYourDay')}
            </p>
            <form onSubmit={handleCreateTask} className="mt-4 space-y-4">
              <input
                type="text"
                autoFocus
                placeholder={t('addTask')}
                value={customTaskTitle}
                onChange={(e) => setCustomTaskTitle(e.target.value)}
                className="w-full rounded-xl border border-[#E8EBE5] bg-[#F6F4EA] px-4 py-2.5 text-sm text-[#1E2A22] placeholder:text-[#7B857E] focus:border-[#2F7D4E] focus:outline-hidden dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-[#7B857E]"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#2F7D4E] px-4 py-2 text-xs font-bold text-white hover:bg-[#25633E]"
                >
                  {t('addTask')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Field Modal */}
      {isAddFieldOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#243128] dark:border dark:border-[#354239]">
            <h3 className="text-lg font-bold text-[#1E2A22] dark:text-white">
              {t('addField')}
            </h3>
            <form onSubmit={handleCreateField} className="mt-4 space-y-3.5">
              <div>
                <label className="text-xs font-bold text-[#1E2A22] dark:text-white">
                  {t('fieldName')}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. North Orchard"
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E8EBE5] bg-[#F6F4EA] px-3.5 py-2 text-xs text-[#1E2A22] dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#1E2A22] dark:text-white">
                  {t('cropType')}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunflowers, Barley"
                  value={newFieldCrop}
                  onChange={(e) => setNewFieldCrop(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E8EBE5] bg-[#F6F4EA] px-3.5 py-2 text-xs text-[#1E2A22] dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddFieldOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-[#7B857E]"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#2F7D4E] px-4 py-2 text-xs font-bold text-white hover:bg-[#25633E]"
                >
                  {t('addField')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modals */}
      <SmartWateringModal
        isOpen={isSmartWateringOpen}
        onClose={() => setIsSmartWateringOpen(false)}
      />
      <FarmAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
};
