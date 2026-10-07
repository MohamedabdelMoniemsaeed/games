import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { ScreenTab } from '../types';
import { FarmAssistantModal } from './FarmAssistantModal';
import {
  Home,
  Map,
  BarChart3,
  PackageCheck,
  User,
  Globe,
  Sun,
  Moon,
  Sprout,
  CloudSun,
  Sparkles,
} from 'lucide-react';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    t,
    screen,
    setScreen,
    locale,
    toggleLocale,
    theme,
    toggleTheme,
    weather,
    toasts,
  } = useFarm();

  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const navItems: { tab: ScreenTab; labelKey: string; icon: React.ReactNode }[] = [
    { tab: 'home', labelKey: 'home', icon: <Home className="h-5 w-5" /> },
    { tab: 'farm', labelKey: 'farm', icon: <Map className="h-5 w-5" /> },
    { tab: 'analytics', labelKey: 'analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { tab: 'harvest', labelKey: 'harvest', icon: <PackageCheck className="h-5 w-5" /> },
    { tab: 'profile', labelKey: 'profile', icon: <User className="h-5 w-5" /> },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F6F4EA] text-[#1E2A22] antialiased transition-colors duration-200 dark:bg-[#17221A] dark:text-[#E8F3E9]">
      {/* Top Application Header */}
      <header className="sticky top-0 z-40 border-b border-[#E8EBE5] bg-white/90 backdrop-blur-md dark:border-[#354239] dark:bg-[#243128]/90">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          {/* Logo & Brand */}
          <div
            onClick={() => setScreen('home')}
            className="flex cursor-pointer items-center gap-2.5 transition active:scale-98"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2F7D4E] text-white shadow-xs">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-[#1E2A22] dark:text-white">
                {t('farmly')}
              </span>
              <span className="hidden text-[10px] text-[#7B857E] sm:block">
                {t('localName')}
              </span>
            </div>
          </div>

          {/* Header Quick Controls */}
          <div className="flex items-center gap-2">
            {/* AI Assistant Button */}
            <button
              onClick={() => setIsAssistantOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-[#E8F3E9] px-2.5 py-1.5 text-xs font-bold text-[#2F7D4E] hover:bg-[#d5ebd7] transition dark:bg-[#2F7D4E]/25 dark:text-[#9FCB88]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t('farmAssistant')}</span>
            </button>

            {/* Quick Weather shortcut */}
            <button
              onClick={() => setScreen('weather')}
              className="flex items-center gap-1.5 rounded-full bg-[#EAF5F7] px-3 py-1.5 text-xs font-bold text-[#4A91C5] hover:bg-[#d8eef3] transition dark:bg-[#1E2A22] dark:text-[#78C4D5]"
            >
              <CloudSun className="h-4 w-4" />
              <span>{weather.temperature}°C</span>
            </button>

            {/* Language Switcher Button (AR / EN) */}
            <button
              onClick={toggleLocale}
              title={locale === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
              className="flex items-center gap-1.5 rounded-full border border-[#E8EBE5] bg-white px-3 py-1.5 text-xs font-bold text-[#2F7D4E] shadow-2xs hover:bg-[#F6F4EA] transition active:scale-95 dark:border-[#354239] dark:bg-[#243128] dark:text-[#9FCB88]"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{locale === 'en' ? 'AR' : 'EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              className="rounded-full border border-[#E8EBE5] p-2 text-[#7B857E] hover:bg-[#F6F4EA] transition dark:border-[#354239] dark:hover:bg-[#1E2A22]"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-[#FFD36B]" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 pt-5 sm:px-6">
        {children}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E8EBE5] bg-white/95 backdrop-blur-md dark:border-[#354239] dark:bg-[#243128]/95">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
          {navItems.map((item) => {
            const isActive = screen === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => setScreen(item.tab)}
                className={`flex flex-col items-center justify-center py-1 px-3 transition-colors ${
                  isActive
                    ? 'text-[#2F7D4E] font-bold dark:text-[#9FCB88]'
                    : 'text-[#7B857E] hover:text-[#1E2A22] dark:text-[#A8B3AA] dark:hover:text-white'
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                    isActive
                      ? 'bg-[#E8F3E9] dark:bg-[#2F7D4E]/25'
                      : 'hover:bg-gray-100 dark:hover:bg-transparent'
                  }`}
                >
                  {item.icon}
                </div>
                <span className="text-[10px] tracking-tight">{t(item.labelKey)}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Toast Notifications Overlay with Undo */}
      <div className="fixed bottom-20 left-1/2 z-50 flex -translate-x-1/2 flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-3 rounded-full bg-[#1E2A22]/95 px-4 py-2.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md animate-fade-in"
          >
            <span>{toast.message}</span>
            {toast.undoAction && (
              <button
                onClick={toast.undoAction}
                className="font-bold text-[#9FCB88] underline hover:text-white"
              >
                {toast.undoLabel || 'Undo'}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* AI Assistant Modal */}
      <FarmAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
};
