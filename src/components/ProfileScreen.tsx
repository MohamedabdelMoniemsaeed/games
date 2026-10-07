import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { UserRole } from '../types';
import {
  User,
  Moon,
  Sun,
  Globe,
  Bell,
  Info,
  LogOut,
  MapPin,
  Check,
  Building2,
  Shield,
  Hash,
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const {
    t,
    formatNum,
    theme,
    toggleTheme,
    locale,
    setLocale,
    useIndicNumerals,
    setUseIndicNumerals,
    logout,
    session,
    farms,
    activeFarm,
    switchFarm,
    userRole,
    setUserRole,
  } = useFarm();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [feedAlerts, setFeedAlerts] = useState(true);
  const [irrigationAlerts, setIrrigationAlerts] = useState(true);
  const [vaccineAlerts, setVaccineAlerts] = useState(true);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <div className="space-y-5 pb-14">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-[#1E2A22] dark:text-white">
          {t('profileTitle')}
        </h1>
        <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">
          {t('profileSubtitle')}
        </p>
      </div>

      {/* Active Farm & User Card */}
      <div className="rounded-3xl border border-[#E8EBE5] bg-white p-6 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2F7D4E] text-white shadow-sm">
            <User className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1E2A22] dark:text-white">
                {activeFarm.name}
              </h2>
              <span className="rounded-full bg-[#E8F3E9] px-2.5 py-0.5 text-[11px] font-bold text-[#2F7D4E] dark:bg-[#2F7D4E]/20 dark:text-[#9FCB88]">
                {t(userRole)}
              </span>
            </div>
            <p className="text-xs text-[#7B857E] dark:text-[#A8B3AA]">
              {activeFarm.ownerName} · {session.user?.email || 'farmer@greenvalley.farm'}
            </p>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-[#2F7D4E] dark:text-[#9FCB88]">
              <MapPin className="h-3 w-3" />
              <span>{t('farmAreaValue', { area: formatNum(activeFarm.areaHectares) })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Farm & Role Switcher Section (Stage 4) */}
      <div className="rounded-3xl border border-[#E8EBE5] bg-white p-5 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
        <h3 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-[#7B857E] dark:text-[#A8B3AA]">
          {t('multiFarm')} & {t('currentRole')}
        </h3>

        <div className="space-y-3">
          {/* Farm Switcher */}
          <div>
            <label className="text-xs font-bold text-[#1E2A22] dark:text-white flex items-center gap-1.5 mb-2">
              <Building2 className="h-3.5 w-3.5 text-[#2F7D4E]" />
              {t('multiFarm')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {farms.map((f) => (
                <button
                  key={f.id}
                  onClick={() => switchFarm(f.id)}
                  className={`rounded-2xl border p-3 text-left transition ${
                    activeFarm.id === f.id
                      ? 'border-[#2F7D4E] bg-[#E8F3E9] text-[#2F7D4E] font-bold dark:bg-[#2F7D4E]/20 dark:text-[#9FCB88]'
                      : 'border-[#E8EBE5] bg-white text-[#7B857E] hover:bg-gray-50 dark:border-[#354239] dark:bg-[#1E2A22]'
                  }`}
                >
                  <p className="text-xs truncate">{f.name}</p>
                  <p className="text-[10px] opacity-75">{f.location}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Role selector */}
          <div className="pt-2">
            <label className="text-xs font-bold text-[#1E2A22] dark:text-white flex items-center gap-1.5 mb-2">
              <Shield className="h-3.5 w-3.5 text-[#2F7D4E]" />
              {t('currentRole')}
            </label>
            <div className="flex rounded-full bg-[#E8EBE5] p-1 dark:bg-[#1E2A22]">
              {(['owner', 'worker', 'viewer'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setUserRole(r)}
                  className={`flex-1 rounded-full py-1 text-xs font-bold transition ${
                    userRole === r
                      ? 'bg-white text-[#2F7D4E] shadow-2xs dark:bg-[#243128] dark:text-[#9FCB88]'
                      : 'text-[#7B857E]'
                  }`}
                >
                  {t(r)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Farm Settings Section */}
      <div className="rounded-3xl border border-[#E8EBE5] bg-white p-5 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
        <h3 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-[#7B857E] dark:text-[#A8B3AA]">
          {t('profileSettings')}
        </h3>

        <div className="divide-y divide-[#E8EBE5] dark:divide-[#354239]">
          {/* Dark Mode */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#F6F4EA] p-2 text-[#1E2A22] dark:bg-[#1E2A22] dark:text-white">
                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-sm font-bold text-[#1E2A22] dark:text-white">
                  {t('darkMode')}
                </p>
                <p className="text-xs text-[#7B857E]">
                  {theme === 'dark' ? t('themeDark') : t('themeLight')}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative h-6 w-11 rounded-full transition duration-200 ${
                theme === 'dark' ? 'bg-[#2F7D4E]' : 'bg-[#E8EBE5]'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ${
                  theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Language Selection */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#F6F4EA] p-2 text-[#1E2A22] dark:bg-[#1E2A22] dark:text-white">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1E2A22] dark:text-white">
                  {t('language')}
                </p>
                <p className="text-xs text-[#7B857E]">
                  {locale === 'en' ? t('english') : t('arabic')}
                </p>
              </div>
            </div>
            <div className="flex rounded-full bg-[#E8EBE5] p-1 dark:bg-[#1E2A22]">
              <button
                onClick={() => setLocale('en')}
                className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                  locale === 'en'
                    ? 'bg-white text-[#2F7D4E] shadow-2xs dark:bg-[#243128] dark:text-white'
                    : 'text-[#7B857E]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLocale('ar')}
                className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                  locale === 'ar'
                    ? 'bg-white text-[#2F7D4E] shadow-2xs dark:bg-[#243128] dark:text-white'
                    : 'text-[#7B857E]'
                }`}
              >
                AR
              </button>
            </div>
          </div>

          {/* Arabic-Indic Numerals Toggle (Stage 6) */}
          {locale === 'ar' && (
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#F6F4EA] p-2 text-[#1E2A22] dark:bg-[#1E2A22] dark:text-white">
                  <Hash className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1E2A22] dark:text-white">
                    {t('arabicNumerals')}
                  </p>
                  <p className="text-xs text-[#7B857E]">
                    {useIndicNumerals ? '١، ٢، ٣، ٤' : '1, 2, 3, 4'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setUseIndicNumerals(!useIndicNumerals)}
                className={`relative h-6 w-11 rounded-full transition duration-200 ${
                  useIndicNumerals ? 'bg-[#2F7D4E]' : 'bg-[#E8EBE5]'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ${
                    useIndicNumerals ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          )}

          {/* Notifications Toggles (Stage 5) */}
          <div className="py-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#F6F4EA] p-2 text-[#1E2A22] dark:bg-[#1E2A22] dark:text-white">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1E2A22] dark:text-white">
                    {t('notifications')}
                  </p>
                  <p className="text-xs text-[#7B857E]">
                    {notificationsEnabled ? t('enabled') : t('disabled')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative h-6 w-11 rounded-full transition duration-200 ${
                  notificationsEnabled ? 'bg-[#2F7D4E]' : 'bg-[#E8EBE5]'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ${
                    notificationsEnabled ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {notificationsEnabled && (
              <div className="mt-2 space-y-1.5 pl-11">
                <label className="flex items-center justify-between text-xs text-[#7B857E] cursor-pointer">
                  <span>{t('todaysFeeding')}</span>
                  <input
                    type="checkbox"
                    checked={feedAlerts}
                    onChange={(e) => setFeedAlerts(e.target.checked)}
                    className="rounded text-[#2F7D4E]"
                  />
                </label>
                <label className="flex items-center justify-between text-xs text-[#7B857E] cursor-pointer">
                  <span>{t('smartWatering')}</span>
                  <input
                    type="checkbox"
                    checked={irrigationAlerts}
                    onChange={(e) => setIrrigationAlerts(e.target.checked)}
                    className="rounded text-[#2F7D4E]"
                  />
                </label>
                <label className="flex items-center justify-between text-xs text-[#7B857E] cursor-pointer">
                  <span>{t('vaccinationHistory')}</span>
                  <input
                    type="checkbox"
                    checked={vaccineAlerts}
                    onChange={(e) => setVaccineAlerts(e.target.checked)}
                    className="rounded text-[#2F7D4E]"
                  />
                </label>
              </div>
            )}
          </div>

          {/* About Farmly */}
          <div
            onClick={() => setIsAboutOpen(true)}
            className="flex cursor-pointer items-center justify-between py-3.5 hover:bg-gray-50 dark:hover:bg-[#1E2A22]/50 px-2 rounded-xl transition"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#F6F4EA] p-2 text-[#1E2A22] dark:bg-[#1E2A22] dark:text-white">
                <Info className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1E2A22] dark:text-white">
                  {t('aboutFarmly')}
                </p>
                <p className="text-xs text-[#7B857E]">
                  {t('versionLabel')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={logout}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#D6533E]/30 bg-white py-3.5 text-xs font-bold text-[#D6533E] shadow-sm transition hover:bg-[#D6533E]/10 active:scale-98 dark:bg-[#243128]"
      >
        <LogOut className="h-4 w-4" />
        {t('signOut')}
      </button>

      {/* About Modal */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#243128] dark:border dark:border-[#354239]">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F3E9] text-[#2F7D4E]">
                <Info className="h-7 w-7" />
              </div>
              <h3 className="mt-3 text-lg font-black text-[#1E2A22] dark:text-white">
                {t('farmly')}
              </h3>
              <p className="mt-1 text-xs text-[#7B857E]">
                {t('smartFarmingSimplified')}
              </p>
              <div className="mt-4 rounded-2xl bg-[#F6F4EA] p-4 text-xs text-[#1E2A22] dark:bg-[#1E2A22] dark:text-white">
                <p>{t('onboardingSubtitle')}</p>
                <p className="mt-2 font-mono text-[11px] text-[#7B857E]">
                  {t('versionLabel')}
                </p>
              </div>
              <button
                onClick={() => setIsAboutOpen(false)}
                className="mt-5 w-full rounded-xl bg-[#2F7D4E] py-2.5 text-xs font-bold text-white hover:bg-[#25633E]"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
