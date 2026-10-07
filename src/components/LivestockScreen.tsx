import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { AnimalCategory, Animal } from '../types';
import {
  Beef,
  Egg,
  Heart,
  Calendar,
  CheckCircle2,
  Circle,
  Plus,
  ArrowLeft,
  Activity,
  FileText,
  ShieldCheck,
  ChevronRight,
  Trash2,
  Edit2,
  X,
} from 'lucide-react';

export const LivestockScreen: React.FC = () => {
  const {
    t,
    formatNum,
    animals,
    addAnimal,
    deleteAnimal,
    herdSummary,
    feedingSchedule,
    toggleFeeding,
    selectedAnimal,
    selectedAnimalDetail,
    selectAnimalByTag,
    animalNotes,
    addAnimalNote,
    addVaccinationRecord,
    setScreen,
    screen,
  } = useFarm();

  const [selectedCategory, setSelectedCategory] = useState<AnimalCategory | 'all'>('all');
  const [isAddAnimalOpen, setIsAddAnimalOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [isAddVaccineOpen, setIsAddVaccineOpen] = useState(false);
  const [vaccineName, setVaccineName] = useState('Annual Booster');

  // New Animal Form state
  const [newAnimalName, setNewAnimalName] = useState('');
  const [newAnimalTag, setNewAnimalTag] = useState('');
  const [newAnimalBreed, setNewAnimalBreed] = useState('');
  const [newAnimalCategory, setNewAnimalCategory] = useState<AnimalCategory>('cows');
  const [newAnimalAge, setNewAnimalAge] = useState(24);
  const [newAnimalHealth, setNewAnimalHealth] = useState(92);

  const filteredAnimals =
    selectedCategory === 'all'
      ? animals
      : animals.filter((a) => a.category === selectedCategory);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNoteText.trim() && selectedAnimal) {
      addAnimalNote(selectedAnimal.tag, newNoteText.trim());
      setNewNoteText('');
      setIsAddNoteOpen(false);
    }
  };

  const handleSaveVaccine = (e: React.FormEvent) => {
    e.preventDefault();
    if (vaccineName.trim() && selectedAnimal) {
      addVaccinationRecord(selectedAnimal.tag, {
        date: new Date().toISOString().split('T')[0],
        vaccineKey: 'boosterVaccine',
        vaccineName: vaccineName.trim(),
      });
      setIsAddVaccineOpen(false);
    }
  };

  const handleCreateAnimal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAnimalName.trim() && newAnimalTag.trim()) {
      addAnimal({
        tag: newAnimalTag.trim().toUpperCase(),
        name: newAnimalName.trim(),
        breed: newAnimalBreed.trim() || 'Heritage Cross',
        category: newAnimalCategory,
        ageMonths: Number(newAnimalAge),
        healthPercent: Number(newAnimalHealth),
        birthDate: new Date().toISOString().split('T')[0],
      });
      setNewAnimalName('');
      setNewAnimalTag('');
      setNewAnimalBreed('');
      setIsAddAnimalOpen(false);
    }
  };

  // If viewing animal detail
  if (screen === 'animal-detail' && selectedAnimal) {
    const notes = animalNotes[selectedAnimal.tag] || [];

    return (
      <div className="space-y-5 pb-14">
        {/* Back Button Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setScreen('livestock')}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-[#1E2A22] shadow-xs hover:bg-[#F6F4EA] dark:bg-[#243128] dark:border dark:border-[#354239] dark:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('back')}
          </button>
          <button
            onClick={() => {
              deleteAnimal(selectedAnimal.tag);
              setScreen('livestock');
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#D6533E]/30 bg-white px-3 py-1.5 text-xs font-bold text-[#D6533E] hover:bg-[#D6533E]/10 dark:bg-[#243128]"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {t('deleteAnimal')}
          </button>
        </div>

        {/* Animal Header Card */}
        <div className="rounded-3xl border border-[#E8EBE5] bg-white p-6 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
          <div className="flex items-start justify-between">
            <div>
              <span className="rounded-full bg-[#E8F3E9] px-3 py-1 font-mono text-xs font-bold text-[#2F7D4E] dark:bg-[#2F7D4E]/20 dark:text-[#9FCB88]">
                {selectedAnimal.tag}
              </span>
              <h1 className="mt-2 text-2xl font-black text-[#1E2A22] dark:text-white">
                {selectedAnimal.nameKey ? t(selectedAnimal.nameKey) : selectedAnimal.name}
              </h1>
              <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">
                {selectedAnimal.breedKey ? t(selectedAnimal.breedKey) : selectedAnimal.breed} ·{' '}
                {formatNum(Math.round(selectedAnimal.ageMonths / 12))} {t('years')}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="flex items-center gap-1 rounded-full bg-[#2F7D4E]/10 px-3 py-1 text-xs font-bold text-[#2F7D4E] dark:bg-[#9FCB88]/20 dark:text-[#9FCB88]">
                <Heart className="h-3.5 w-3.5 fill-[#2F7D4E]" />
                {formatNum(selectedAnimal.healthPercent)}%
              </span>
              <span className="mt-1 text-[11px] font-semibold text-[#7B857E]">
                {t('healthy')}
              </span>
            </div>
          </div>
        </div>

        {/* Weight History Card */}
        <div className="rounded-3xl border border-[#E8EBE5] bg-white p-5 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#1E2A22] dark:text-white">
              {t('weightHistory')}
            </h2>
            <span className="text-xs font-bold text-[#2F7D4E]">
              {formatNum(selectedAnimalDetail?.weightHistoryKg.slice(-1)[0] || 430)} {t('yieldUnit')}
            </span>
          </div>
          <div className="mt-4 flex items-end gap-2 h-24 pt-4 border-b border-[#E8EBE5] dark:border-[#354239] pb-2">
            {selectedAnimalDetail?.weightHistoryKg.map((weight, idx) => {
              const max = Math.max(...selectedAnimalDetail.weightHistoryKg);
              const heightPct = Math.max(25, (weight / max) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-lg bg-[#2F7D4E]/80 hover:bg-[#2F7D4E] transition"
                    style={{ height: `${heightPct}%` }}
                    title={`${weight} kg`}
                  ></div>
                  <span className="text-[10px] text-[#7B857E]">{formatNum(weight)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vaccination History Card */}
        <div className="rounded-3xl border border-[#E8EBE5] bg-white p-5 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#1E2A22] dark:text-white">
              {t('vaccinationHistory')}
            </h2>
            <button
              onClick={() => setIsAddVaccineOpen(true)}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#2F7D4E] hover:underline"
            >
              <Plus className="h-3.5 w-3.5" />
              {t('rabiesVaccine')}
            </button>
          </div>
          <div className="divide-y divide-[#E8EBE5] dark:divide-[#354239]">
            {selectedAnimalDetail?.vaccinations.map((vac) => (
              <div key={vac.id} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-xs font-bold text-[#1E2A22] dark:text-white">
                    {vac.vaccineName || t(vac.vaccineKey)}
                  </p>
                  <p className="text-[11px] text-[#7B857E]">{vac.date}</p>
                </div>
                <span className="rounded-full bg-[#E8F3E9] px-2 py-0.5 text-[10px] font-bold text-[#2F7D4E]">
                  {t('done')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes Card */}
        <div className="rounded-3xl border border-[#E8EBE5] bg-white p-5 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#1E2A22] dark:text-white">
              {t('addNote')}
            </h2>
            <button
              onClick={() => setIsAddNoteOpen(true)}
              className="inline-flex items-center gap-1 rounded-full bg-[#2F7D4E] px-3 py-1 text-xs font-bold text-white hover:bg-[#25633E]"
            >
              <Plus className="h-3.5 w-3.5" />
              {t('addNote')}
            </button>
          </div>
          {notes.length === 0 ? (
            <p className="py-4 text-center text-xs text-[#7B857E]">{t('noteHint')}</p>
          ) : (
            <div className="space-y-2">
              {notes.map((note, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-[#F6F4EA] p-3 text-xs text-[#1E2A22] dark:bg-[#1E2A22] dark:text-white"
                >
                  <p>{note}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Note Modal */}
        {isAddNoteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#243128] dark:border dark:border-[#354239]">
              <h3 className="text-base font-bold text-[#1E2A22] dark:text-white">
                {t('noteTitle')}
              </h3>
              <form onSubmit={handleSaveNote} className="mt-4 space-y-4">
                <textarea
                  rows={3}
                  autoFocus
                  placeholder={t('noteHint')}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="w-full rounded-xl border border-[#E8EBE5] bg-[#F6F4EA] p-3 text-xs text-[#1E2A22] placeholder:text-[#7B857E] focus:border-[#2F7D4E] focus:outline-hidden dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddNoteOpen(false)}
                    className="rounded-xl px-4 py-2 text-xs font-semibold text-[#7B857E]"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#2F7D4E] px-4 py-2 text-xs font-bold text-white hover:bg-[#25633E]"
                  >
                    {t('saveNote')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Vaccine Modal */}
        {isAddVaccineOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#243128] dark:border dark:border-[#354239]">
              <h3 className="text-base font-bold text-[#1E2A22] dark:text-white">
                {t('vaccinationHistory')}
              </h3>
              <form onSubmit={handleSaveVaccine} className="mt-4 space-y-4">
                <input
                  type="text"
                  autoFocus
                  placeholder="Vaccine Name"
                  value={vaccineName}
                  onChange={(e) => setVaccineName(e.target.value)}
                  className="w-full rounded-xl border border-[#E8EBE5] bg-[#F6F4EA] p-3 text-xs text-[#1E2A22] dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddVaccineOpen(false)}
                    className="rounded-xl px-4 py-2 text-xs font-semibold text-[#7B857E]"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#2F7D4E] px-4 py-2 text-xs font-bold text-white hover:bg-[#25633E]"
                  >
                    {t('done')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Livestock Overview List View
  return (
    <div className="space-y-5 pb-14">
      {/* Header & Add Animal Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-[#1E2A22] dark:text-white">
            {t('livestockTitle')}
          </h1>
          <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">
            {t('livestockSubtitle')}
          </p>
        </div>
        <button
          onClick={() => setIsAddAnimalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#2F7D4E] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#25633E] active:scale-95"
        >
          <Plus className="h-4 w-4" />
          {t('addAnimal')}
        </button>
      </div>

      {/* Herd Summary Card with Animated Progress Rings */}
      <div className="rounded-3xl border border-[#E8EBE5] bg-white p-5 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#7B857E] dark:text-[#A8B3AA]">
              {t('totalHerd')}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-[#1E2A22] dark:text-white">
                {formatNum(herdSummary.total)}
              </span>
              <span className="text-xs font-bold text-[#7B857E]">{t('animals')}</span>
            </div>
          </div>
          <span className="rounded-full bg-[#E8F3E9] px-3 py-1 text-xs font-bold text-[#2F7D4E] dark:bg-[#2F7D4E]/20 dark:text-[#9FCB88]">
            {t('allHealthy')}
          </span>
        </div>

        {/* 3 Animated Rings with Captions */}
        <div className="mt-5 grid grid-cols-3 gap-3 text-center">
          {/* Health Ring */}
          <div className="flex flex-col items-center rounded-2xl bg-[#E8F3E9] p-3.5 dark:bg-[#1E2A22]">
            <div className="relative flex h-14 w-14 items-center justify-center">
              <svg className="h-14 w-14 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#2F7D4E]/20"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#2F7D4E]"
                  strokeDasharray="93, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-[#2F7D4E] dark:text-[#9FCB88]">
                {formatNum(herdSummary.healthPercent)}%
              </span>
            </div>
            <p className="mt-2 text-xs font-bold text-[#1E2A22] dark:text-white">{t('health')}</p>
            <span className="text-[10px] text-[#7B857E]">{t('excellent')}</span>
          </div>

          {/* Feed Ring */}
          <div className="flex flex-col items-center rounded-2xl bg-[#FFF2DF] p-3.5 dark:bg-[#1E2A22]">
            <div className="relative flex h-14 w-14 items-center justify-center">
              <svg className="h-14 w-14 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#D78A32]/20"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#D78A32]"
                  strokeDasharray="78, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-[#D78A32]">
                {formatNum(78)}%
              </span>
            </div>
            <p className="mt-2 text-xs font-bold text-[#1E2A22] dark:text-white">{t('feed')}</p>
            <span className="text-[10px] text-[#7B857E]">{t('twelveDaysStock')}</span>
          </div>

          {/* Production Ring */}
          <div className="flex flex-col items-center rounded-2xl bg-[#EAF5F7] p-3.5 dark:bg-[#1E2A22]">
            <div className="relative flex h-14 w-14 items-center justify-center">
              <svg className="h-14 w-14 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#4A91C5]/20"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#4A91C5]"
                  strokeDasharray="84, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-[#4A91C5]">
                {formatNum(84)}%
              </span>
            </div>
            <p className="mt-2 text-xs font-bold text-[#1E2A22] dark:text-white">{t('production')}</p>
            <span className="text-[10px] text-[#7B857E]">{t('onTarget')}</span>
          </div>
        </div>
      </div>

      {/* Feeding Schedule Card */}
      <div className="rounded-3xl border border-[#E8EBE5] bg-white p-5 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#1E2A22] dark:text-white">
              {t('todaysFeeding')}
            </h2>
            <p className="text-xs text-[#7B857E]">
              {t('completedFeedingCount', {
                done: formatNum(feedingSchedule.filter((f) => f.isComplete).length),
                total: formatNum(feedingSchedule.length),
              })}
            </p>
          </div>
        </div>

        <div className="mt-3 divide-y divide-[#E8EBE5] dark:divide-[#354239]">
          {feedingSchedule.map((feed) => (
            <div
              key={feed.id}
              onClick={() => toggleFeeding(feed.id)}
              className="flex cursor-pointer items-center justify-between py-2.5 transition hover:bg-[#F2F4F0] px-2 rounded-xl dark:hover:bg-[#1E2A22]/50"
            >
              <div className="flex items-center gap-3">
                {feed.isComplete ? (
                  <CheckCircle2 className="h-5 w-5 text-[#2F7D4E] shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-[#7B857E] shrink-0" />
                )}
                <div>
                  <p className={`text-xs font-bold ${feed.isComplete ? 'line-through text-[#7B857E]' : 'text-[#1E2A22] dark:text-white'}`}>
                    {t(feed.type)}
                  </p>
                  <p className="text-[10px] text-[#7B857E]">{feed.time}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#7B857E]">
                {feed.isComplete ? t('done') : t('upcoming')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter Cards */}
      <div>
        <p className="mb-2 text-xs font-bold text-[#7B857E] dark:text-[#A8B3AA]">
          {t('categories')} · {t('tapGroup')}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { cat: 'cows', count: herdSummary.cows, label: t('cows') },
            { cat: 'chickens', count: herdSummary.chickens, label: t('chickens') },
            { cat: 'sheep', count: herdSummary.sheep, label: t('sheep') },
            { cat: 'goats', count: herdSummary.goats, label: t('goats') },
          ].map((item) => (
            <div
              key={item.cat}
              onClick={() => setSelectedCategory(selectedCategory === item.cat ? 'all' : (item.cat as AnimalCategory))}
              className={`cursor-pointer rounded-2xl border p-4 transition text-center ${
                selectedCategory === item.cat
                  ? 'border-[#2F7D4E] bg-[#E8F3E9] shadow-sm dark:bg-[#2F7D4E]/20'
                  : 'border-[#E8EBE5] bg-white hover:border-[#2F7D4E] dark:border-[#354239] dark:bg-[#243128]'
              }`}
            >
              <p className="text-xl font-black text-[#1E2A22] dark:text-white">
                {formatNum(item.count)}
              </p>
              <p className="text-xs font-bold text-[#2F7D4E] mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Animal Rows */}
      <div className="space-y-2.5">
        <p className="text-xs font-semibold text-[#7B857E] dark:text-[#A8B3AA]">
          {t('herdTapDetails', { count: formatNum(filteredAnimals.length) })}
        </p>

        {filteredAnimals.map((animal) => (
          <div
            key={animal.tag}
            onClick={() => selectAnimalByTag(animal.tag)}
            className="group flex cursor-pointer items-center justify-between rounded-2xl border border-[#E8EBE5] bg-white p-4 shadow-sm transition hover:border-[#2F7D4E] hover:shadow-md dark:border-[#354239] dark:bg-[#243128]"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8F3E9] text-[#2F7D4E] dark:bg-[#2F7D4E]/20 dark:text-[#9FCB88]">
                {animal.category === 'chickens' ? (
                  <Egg className="h-5 w-5" />
                ) : (
                  <Beef className="h-5 w-5" />
                )}
              </div>
              <div>
                <span className="font-mono text-[10px] font-bold text-[#7B857E]">
                  {animal.tag}
                </span>
                <h3 className="text-sm font-bold text-[#1E2A22] dark:text-white">
                  {animal.nameKey ? t(animal.nameKey) : animal.name}
                </h3>
                <p className="text-[11px] text-[#7B857E] dark:text-[#A8B3AA]">
                  {animal.breedKey ? t(animal.breedKey) : animal.breed} · {formatNum(animal.ageMonths)}m
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                  animal.healthPercent >= 80
                    ? 'bg-[#2F7D4E]/10 text-[#2F7D4E] dark:bg-[#9FCB88]/20 dark:text-[#9FCB88]'
                    : 'bg-[#D78A32]/15 text-[#D78A32]'
                }`}
              >
                {formatNum(animal.healthPercent)}%
              </span>
              <ChevronRight className="h-4 w-4 text-[#7B857E] transition group-hover:translate-x-1" />
            </div>
          </div>
        ))}
      </div>

      {/* Add Animal Modal */}
      {isAddAnimalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#243128] dark:border dark:border-[#354239]">
            <h3 className="text-lg font-bold text-[#1E2A22] dark:text-white">
              {t('addAnimal')}
            </h3>
            <form onSubmit={handleCreateAnimal} className="mt-4 space-y-3.5">
              <div>
                <label className="text-xs font-bold text-[#1E2A22] dark:text-white">
                  {t('name')}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Luna"
                  value={newAnimalName}
                  onChange={(e) => setNewAnimalName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E8EBE5] bg-[#F6F4EA] px-3.5 py-2 text-xs text-[#1E2A22] dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1E2A22] dark:text-white">
                  {t('tag')}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. COW-004"
                  value={newAnimalTag}
                  onChange={(e) => setNewAnimalTag(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E8EBE5] bg-[#F6F4EA] px-3.5 py-2 text-xs text-[#1E2A22] dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#1E2A22] dark:text-white">
                    {t('category')}
                  </label>
                  <select
                    value={newAnimalCategory}
                    onChange={(e) => setNewAnimalCategory(e.target.value as AnimalCategory)}
                    className="mt-1 w-full rounded-xl border border-[#E8EBE5] bg-[#F6F4EA] px-3 py-2 text-xs text-[#1E2A22] dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
                  >
                    <option value="cows">{t('cows')}</option>
                    <option value="chickens">{t('chickens')}</option>
                    <option value="sheep">{t('sheep')}</option>
                    <option value="goats">{t('goats')}</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1E2A22] dark:text-white">
                    {t('age')}
                  </label>
                  <input
                    type="number"
                    value={newAnimalAge}
                    onChange={(e) => setNewAnimalAge(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-[#E8EBE5] bg-[#F6F4EA] px-3 py-2 text-xs text-[#1E2A22] dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1E2A22] dark:text-white">
                  {t('breed')}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Angus, Boer"
                  value={newAnimalBreed}
                  onChange={(e) => setNewAnimalBreed(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E8EBE5] bg-[#F6F4EA] px-3.5 py-2 text-xs text-[#1E2A22] dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddAnimalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-[#7B857E]"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#2F7D4E] px-4 py-2 text-xs font-bold text-white hover:bg-[#25633E]"
                >
                  {t('addAnimal')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
