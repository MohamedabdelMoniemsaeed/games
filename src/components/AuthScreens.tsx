import React, { useState, useEffect } from 'react';
import { useFarm } from '../context/FarmContext';
import {
  Sprout,
  Beef,
  CloudSun,
  LineChart,
  Eye,
  EyeOff,
  ArrowRight,
  Globe,
  Loader2,
  Lock,
  Mail,
  ArrowLeft,
} from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { t, setScreen, locale, toggleLocale } = useFarm();

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('onboarding');
    }, 2400);
    return () => clearTimeout(timer);
  }, [setScreen]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-[#DDF0F1] via-[#E8F3E9] to-[#F6F4EA] p-6 text-center select-none overflow-hidden dark:from-[#17221A] dark:via-[#1E2A22] dark:to-[#243128]">
      {/* Top language toggle */}
      <div className="w-full flex justify-end z-10">
        <button
          onClick={toggleLocale}
          className="flex items-center gap-1.5 rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-bold text-[#2F7D4E] shadow-2xs backdrop-blur-xs hover:bg-white dark:bg-[#243128] dark:text-[#9FCB88]"
        >
          <Globe className="h-3.5 w-3.5" />
          {locale === 'en' ? 'العربية (AR)' : 'English (EN)'}
        </button>
      </div>

      {/* Main Animated Branding */}
      <div className="flex flex-col items-center my-auto z-10">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-[#2F7D4E] text-white shadow-2xl shadow-[#2F7D4E]/30 animate-pulse">
          <Sprout className="h-14 w-14 transition-transform duration-700 hover:scale-110" />
        </div>
        <h1 className="mt-5 text-4xl font-black tracking-tight text-[#1E2A22] dark:text-white">
          {t('farmly')}
        </h1>
        <p className="mt-1.5 text-sm font-semibold text-[#2F7D4E] dark:text-[#9FCB88]">
          {t('localName')}
        </p>
        <p className="mt-1 text-xs text-[#7B857E] dark:text-[#A8B3AA]">
          {t('smartFarmingSimplified')}
        </p>
      </div>

      {/* Illustrated rolling hills, barn and trees at bottom */}
      <div className="absolute -bottom-6 left-0 right-0 h-44 pointer-events-none">
        <svg viewBox="0 0 500 150" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          {/* Back hill */}
          <path d="M0,150 L0,70 Q250,20 500,70 L500,150 Z" fill="#A6CB88" opacity="0.6" />
          {/* Front hill */}
          <path d="M0,150 L0,100 Q150,50 350,110 Q450,120 500,90 L500,150 Z" fill="#6FAD68" />
          {/* Barn */}
          <g transform="translate(180, 55)">
            <rect x="0" y="10" width="36" height="24" rx="2" fill="#C95849" />
            <polygon points="-4,10 18,-2 40,10" fill="#8D3A32" />
            <rect x="12" y="20" width="12" height="14" fill="#F7F5E8" />
          </g>
          {/* Trees */}
          {[60, 110, 260, 390, 440].map((tx, idx) => (
            <g key={idx} transform={`translate(${tx}, 80)`}>
              <rect x="7" y="14" width="4" height="12" fill="#79583C" />
              <circle cx="9" cy="12" r="12" fill="#3D824A" />
              <circle cx="7" cy="9" r="8" fill="#62A85A" />
            </g>
          ))}
        </svg>
      </div>

      {/* Footer prompt */}
      <div className="pb-4 z-10">
        <button
          onClick={() => setScreen('onboarding')}
          className="text-xs font-bold text-[#1E2A22] hover:underline dark:text-white"
        >
          {t('getStarted')} →
        </button>
      </div>
    </div>
  );
};

export const OnboardingScreen: React.FC = () => {
  const { t, setScreen, continueAsGuest, locale, toggleLocale } = useFarm();

  const features = [
    { icon: <Sprout className="h-5 w-5 text-[#2F7D4E]" />, label: t('crops') },
    { icon: <Beef className="h-5 w-5 text-[#D78A32]" />, label: t('livestockTitle') },
    { icon: <CloudSun className="h-5 w-5 text-[#4A91C5]" />, label: t('weather') },
    { icon: <LineChart className="h-5 w-5 text-[#8168B4]" />, label: t('insights') },
  ];

  return (
    <div className="relative flex min-h-screen flex-col justify-between bg-[#F6F4EA] p-6 dark:bg-[#17221A] overflow-hidden">
      {/* Top Bar with Language Switcher */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2F7D4E] text-white shadow-xs">
            <Sprout className="h-5 w-5" />
          </div>
          <span className="font-black text-[#1E2A22] dark:text-white">{t('farmly')}</span>
        </div>

        <button
          onClick={toggleLocale}
          className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[#2F7D4E] shadow-2xs border border-[#E8EBE5] dark:border-[#354239] dark:bg-[#243128] dark:text-[#9FCB88]"
        >
          <Globe className="h-3.5 w-3.5" />
          {locale === 'en' ? 'AR' : 'EN'}
        </button>
      </div>

      {/* Illustrated Sky & Farm Scene with Wind Turbines & Drone */}
      <div className="my-auto py-6 z-10">
        <div className="mb-4">
          <span className="rounded-full bg-[#E8F3E9] px-3.5 py-1 text-xs font-bold text-[#2F7D4E] dark:bg-[#2F7D4E]/20 dark:text-[#9FCB88]">
            {t('localName')}
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-[#1E2A22] sm:text-4xl dark:text-white">
            {t('onboardingTitle')}
          </h1>
          <p className="mt-2 text-sm text-[#7B857E] dark:text-[#A8B3AA] max-w-md">
            {t('onboardingSubtitle')}
          </p>
        </div>

        {/* Illustrated Card Component */}
        <div className="relative w-full h-44 rounded-3xl bg-gradient-to-b from-[#DDF0F1] to-[#6FAD68] p-4 overflow-hidden shadow-inner">
          {/* Sun */}
          <circle cx="40" cy="35" r="16" fill="#FFD36B" />
          {/* Wind Turbines */}
          {[120, 220].map((wx, i) => (
            <g key={i} transform={`translate(${wx}, 40)`}>
              <line x1="0" y1="40" x2="0" y2="90" stroke="#FFFFFF" strokeWidth="2.5" />
              <circle cx="0" cy="40" r="3" fill="#FFFFFF" />
              <line x1="0" y1="40" x2="-18" y2="28" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="0" y1="40" x2="18" y2="28" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="0" y1="40" x2="0" y2="60" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          ))}
          {/* Mini Drone */}
          <g transform="translate(320, 30)">
            <rect x="-8" y="-4" width="16" height="8" rx="2" fill="#415A50" />
            <circle cx="-10" cy="-6" r="4" fill="#1E2A22" />
            <circle cx="10" cy="-6" r="4" fill="#1E2A22" />
          </g>
          {/* Barn */}
          <g transform="translate(40, 90)">
            <rect x="0" y="10" width="32" height="24" rx="2" fill="#C95849" />
            <polygon points="-3,10 16,0 35,10" fill="#8D3A32" />
          </g>
        </div>

        {/* Feature Badges Grid */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 rounded-2xl border border-[#E8EBE5] bg-white p-3.5 shadow-2xs dark:border-[#354239] dark:bg-[#243128]"
            >
              <div className="rounded-xl bg-[#F6F4EA] p-2 dark:bg-[#1E2A22]">
                {feat.icon}
              </div>
              <span className="text-xs font-bold text-[#1E2A22] dark:text-white">
                {feat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 z-10">
        <button
          onClick={() => setScreen('login')}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2F7D4E] py-4 text-sm font-bold text-white shadow-lg shadow-[#2F7D4E]/25 transition hover:bg-[#25633E] active:scale-98"
        >
          {t('getStarted')}
          <ArrowRight className="h-4 w-4" />
        </button>

        <button
          onClick={continueAsGuest}
          className="w-full text-center text-xs font-semibold text-[#7B857E] hover:underline dark:text-[#A8B3AA]"
        >
          {t('continueAsGuest')}
        </button>
      </div>
    </div>
  );
};

export const LoginScreen: React.FC = () => {
  const { t, login, continueAsGuest, setScreen } = useFarm();
  const [email, setEmail] = useState('farmer@greenvalley.farm');
  const [password, setPassword] = useState('farmly2026');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError(t('emailInvalid'));
      return;
    }
    if (password.length < 6) {
      setError(t('passwordInvalid'));
      return;
    }
    setError('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      login(email);
    }, 1100);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#F6F4EA] p-6 dark:bg-[#17221A]">
      <div className="mx-auto w-full max-w-sm">
        {/* Illustrated Header with Farmer in Straw Hat */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#2F7D4E] text-white shadow-md">
            <svg viewBox="0 0 64 64" className="w-10 h-10">
              {/* Straw hat */}
              <ellipse cx="32" cy="22" rx="26" ry="7" fill="#D6A84E" />
              <path d="M22,22 Q32,10 42,22 Z" fill="#B38936" />
              {/* Face */}
              <circle cx="32" cy="30" r="10" fill="#C6865B" />
              {/* Shirt */}
              <path d="M18,48 Q32,38 46,48 L46,60 L18,60 Z" fill="#547B5E" />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-black text-[#1E2A22] dark:text-white">
            {t('welcomeBack')}
          </h1>
          <p className="mt-1 text-xs text-[#7B857E] dark:text-[#A8B3AA]">
            {t('loginSubtitle')}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-6 rounded-3xl border border-[#E8EBE5] bg-white p-6 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
          {error && (
            <div className="mb-4 rounded-xl bg-[#D6533E]/10 p-3 text-xs font-semibold text-[#D6533E]">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1E2A22] dark:text-white">
                {t('email')}
              </label>
              <div className="relative mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailHint')}
                  className="w-full rounded-xl border border-[#E8EBE5] bg-[#F6F4EA] pl-9 pr-3.5 py-2.5 text-xs text-[#1E2A22] placeholder:text-[#7B857E] focus:border-[#2F7D4E] focus:outline-hidden dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
                />
                <Mail className="absolute left-3 top-3 h-4 w-4 text-[#7B857E]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E2A22] dark:text-white">
                {t('password')}
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('passwordHint')}
                  className="w-full rounded-xl border border-[#E8EBE5] bg-[#F6F4EA] pl-9 pr-10 py-2.5 text-xs text-[#1E2A22] placeholder:text-[#7B857E] focus:border-[#2F7D4E] focus:outline-hidden dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
                />
                <Lock className="absolute left-3 top-3 h-4 w-4 text-[#7B857E]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#7B857E]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  className="rounded border-[#E8EBE5] text-[#2F7D4E] focus:ring-0"
                />
                <span className="text-[#7B857E] dark:text-[#A8B3AA]">{t('keepSignedIn')}</span>
              </label>
              <button
                type="button"
                onClick={() => alert(t('resetPasswordMock'))}
                className="text-[#2F7D4E] hover:underline"
              >
                {t('forgotPassword')}
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F7D4E] py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#25633E] active:scale-98 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>{t('logIn')}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-5 space-y-2 text-center text-xs">
          <p className="text-[#7B857E] dark:text-[#A8B3AA]">
            {t('noAccountYet')}{' '}
            <button
              onClick={() => setScreen('create-account')}
              className="font-bold text-[#2F7D4E] hover:underline"
            >
              {t('createAccount')}
            </button>
          </p>

          <button
            onClick={continueAsGuest}
            className="text-[#7B857E] hover:underline dark:text-[#A8B3AA]"
          >
            {t('continueAsGuest')}
          </button>
        </div>
      </div>
    </div>
  );
};

export const CreateAccountScreen: React.FC = () => {
  const { t, login, setScreen } = useFarm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError(t('emailInvalid'));
      return;
    }
    if (password.length < 6) {
      setError(t('passwordInvalid'));
      return;
    }
    setError('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      login(email);
    }, 1100);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#F6F4EA] p-6 dark:bg-[#17221A]">
      <div className="mx-auto w-full max-w-sm">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#2F7D4E] text-white shadow-md">
            <Sprout className="h-9 w-9" />
          </div>
          <h1 className="mt-4 text-2xl font-black text-[#1E2A22] dark:text-white">
            {t('createAccount')}
          </h1>
          <p className="mt-1 text-xs text-[#7B857E] dark:text-[#A8B3AA]">
            {t('createAccountSubtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 rounded-3xl border border-[#E8EBE5] bg-white p-6 shadow-sm dark:border-[#354239] dark:bg-[#243128]">
          {error && (
            <div className="mb-4 rounded-xl bg-[#D6533E]/10 p-3 text-xs font-semibold text-[#D6533E]">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1E2A22] dark:text-white">
                {t('email')}
              </label>
              <div className="relative mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailHint')}
                  className="w-full rounded-xl border border-[#E8EBE5] bg-[#F6F4EA] pl-9 pr-3.5 py-2.5 text-xs text-[#1E2A22] placeholder:text-[#7B857E] focus:border-[#2F7D4E] focus:outline-hidden dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
                />
                <Mail className="absolute left-3 top-3 h-4 w-4 text-[#7B857E]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E2A22] dark:text-white">
                {t('password')}
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('passwordHint')}
                  className="w-full rounded-xl border border-[#E8EBE5] bg-[#F6F4EA] pl-9 pr-10 py-2.5 text-xs text-[#1E2A22] placeholder:text-[#7B857E] focus:border-[#2F7D4E] focus:outline-hidden dark:border-[#354239] dark:bg-[#1E2A22] dark:text-white"
                />
                <Lock className="absolute left-3 top-3 h-4 w-4 text-[#7B857E]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#7B857E]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F7D4E] py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#25633E] active:scale-98 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <span>{t('createAccount')}</span>
              )}
            </button>
          </div>
        </form>

        <div className="mt-5 text-center text-xs">
          <p className="text-[#7B857E] dark:text-[#A8B3AA]">
            {t('alreadyHaveAccount')}{' '}
            <button
              onClick={() => setScreen('login')}
              className="font-bold text-[#2F7D4E] hover:underline"
            >
              {t('logIn')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
